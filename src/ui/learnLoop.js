// The drill-in for one layer: question -> where it is -> why it happens -> your turn -> the evidence -> tests -> recap.
// Each stage keeps a picture of the model, so the Stuck? menu can go back, replay a stage or jump to one.
// Progress is a per-viewer convenience kept in this browser only.
import { renderRich } from './richText.js';
import { showCrustActivity } from './crustActivity.js';

const KEY = 'geohand-progress';
export function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {};
  } catch {
    return {};
  }
}
function saveProgress(level, id, result) {
  try {
    const all = loadProgress();
    (all[level] ||= {})[id] = result;
    localStorage.setItem(KEY, JSON.stringify(all));
  } catch {
    // private window or blocked storage: the loop still works, it just isn't remembered
  }
}

const el = (parent, tag, cls, text) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) renderRich(n, text);
  parent.append(n);
  return n;
};

/** Stage names for a loop, in order (shown in the Stuck? menu). */
export const stageNames = (loop) => ['Question', 'Where it is', 'How it works', 'Your turn', 'Supporting evidence', ...loop.tests.map((_, k) => `Test ${k + 1}`)];

/**
 * Runs the drill-in in `host`. part = content part (title, short, simplification, numbers), loop = LOOPS entry.
 * model: { whole(), where(), why(viewId), capture(), restore(picture) } sets up and saves the 3D model.
 * Returns the controls the Stuck? menu uses: { names, current(), back(), replay(), jump(k) }.
 */
export function runLoop(host, { level, part, loop, model, onClose }) {
  const names = stageNames(loop);
  const pictures = [];
  const results = []; // per test: answered right?
  let before = null;
  let at = 0;
  host.hidden = false;

  const frame = () => {
    host.replaceChildren();
    const head = el(host, 'div', 'learn-head');
    el(head, 'b', '', `${names[at]}: ${part.title}`);
    el(head, 'span', '', `${at + 1} of ${names.length}`);
    const close = el(head, 'button', 'learn-close', '✕');
    close.type = 'button';
    close.setAttribute('aria-label', 'Close');
    close.onclick = onClose;
    return el(host, 'div', 'learn-body');
  };
  const button = (parent, text, cls) => {
    const b = el(parent, 'button', cls, text);
    b.type = 'button';
    return b;
  };
  const next = (body, text = 'Next') => (button(body, text, 'primary').onclick = () => go(at + 1));

  /** One multiple-choice question; then(correct) runs after the learner has seen the feedback. */
  function ask(body, it, then, { checkOnly = false } = {}) {
    el(body, 'p', 'learn-q', it.q);
    const opts = el(body, 'div', 'learn-options');
    const fb = el(body, 'div', 'learn-feedback');
    fb.setAttribute('aria-live', 'polite');
    it.options.forEach((o, i) => {
      const b = button(opts, o, 'learn-option');
      b.onclick = () => {
        const right = i === it.answer;
        opts.querySelectorAll('button').forEach((x, k) => {
          x.disabled = true;
          if (k === it.answer) x.classList.add('right');
          else if (x === b) x.classList.add('wrong');
        });
        fb.replaceChildren();
        el(fb, 'p', right ? 'ok' : 'no', checkOnly ? (right ? 'Correct.' : 'Not quite. The next steps explain the answer.') : right ? 'Correct.' : 'Not quite.');
        el(fb, 'p', '', it.explain);
        el(fb, 'p', 'where', `Source: ${it.where}`);
        const row = el(fb, 'div', 'learn-row');
        if (!right && !checkOnly) button(row, 'Review the explanation', 'ghost').onclick = () => go(2);
        button(row, 'Next', 'primary').onclick = () => then(right);
      };
    });
  }

  // what each stage shows in the panel; setup runs the first time a stage is shown, then its picture is reused
  const STAGES = [
    { setup: () => model.whole(), show: (body) => ask(body, loop.check, (right) => { before = right; go(1); }, { checkOnly: true }) },
    {
      setup: () => model.where(),
      show: (body) => {
        el(body, 'p', 'learn-q', `This is the ${part.title.toLowerCase()}, highlighted in the model.`);
        if (part.simplification) el(body, 'p', 'where', `How it is drawn: ${part.simplification}`);
        next(body, 'Show me why');
      },
    },
    {
      setup: () => model.why(loop.see === 'compare' ? 'layers' : loop.see.view),
      show: (body) => {
        if (loop.see === 'compare') {
          el(body, 'p', 'learn-q', 'Compare the two cross-sections.');
          showCrustActivity(el(body, 'div', 'learn-activity'), 'compare');
        } else renderRich(el(body, 'p', 'learn-q'), loop.see.look);
        next(body);
      },
    },
    {
      show: (body) => {
        el(body, 'p', 'learn-q', 'Now try it yourself. Use an open hand to rotate the Earth, two hands to zoom, or point at a view at the top and hold to switch.');
        if (loop.see !== 'compare') renderRich(el(body, 'p', ''), `What to look for: ${loop.see.look}`);
        next(body, 'View the evidence');
      },
    },
    {
      show: (body) => {
        renderRich(el(body, 'p', ''), part.short);
        const list = el(body, 'ul', 'learn-evidence');
        for (const n of part.numbers || []) renderRich(el(list, 'li'), `**${n.label}:** ${n.value} (${n.where})`);
        next(body, 'Test yourself');
      },
    },
    ...loop.tests.map((it, k) => ({ show: (body) => ask(body, it, (right) => { results[k] = right; go(at + 1); } ) })),
  ];

  function go(k, replay = false) {
    if (k >= STAGES.length) return recap();
    at = Math.max(0, k);
    const s = STAGES[at];
    if (pictures[at]) model.restore(pictures[at], replay);
    else {
      s.setup?.();
      pictures[at] = model.capture();
    }
    s.show(frame());
  }

  function recap() {
    const score = results.filter(Boolean).length;
    saveProgress(level, part.id, { before, score, total: loop.tests.length, at: new Date().toISOString().slice(0, 10) });
    at = names.length; // past the last stage
    host.replaceChildren();
    const head = el(host, 'div', 'learn-head');
    el(head, 'b', '', `${part.title}: done`);
    const body = el(host, 'div', 'learn-body');
    el(body, 'p', 'learn-score', `Before: ${before ? 'you already knew the opening answer' : 'the opening answer was new to you'}. Now: ${score} of ${loop.tests.length} correct.`);
    el(body, 'p', '', score === loop.tests.length ? 'You’ve completed this layer.' : 'Try the questions you missed again.');
    const row = el(body, 'div', 'learn-row');
    button(row, 'Try again', 'ghost').onclick = () => { results.length = 0; go(0); };
    button(row, 'Return to the layer', 'primary').onclick = onClose;
  }

  go(0);
  return {
    names,
    current: () => Math.min(at, names.length - 1),
    back: () => go(Math.min(at, names.length) - 1),
    replay: () => go(Math.min(at, names.length - 1), true),
    jump: (k) => go(k),
  };
}
