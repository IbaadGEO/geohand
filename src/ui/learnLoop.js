// The learning loop for one layer: check -> see and understand -> test (with feedback) -> recap.
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

/**
 * Runs the loop in `host`. part = content part (title, short), loop = LOOPS entry.
 * onSeeAgain() re-highlights the layer on the model; onClose() returns to the part card.
 */
export function runLoop(host, { level, part, loop, onSeeAgain, onView, onClose }) {
  let before = null;
  let score = 0;
  host.hidden = false;

  const frame = (stage, total) => {
    host.replaceChildren();
    const head = el(host, 'div', 'learn-head');
    el(head, 'b', '', `Learn: ${part.title}`);
    el(head, 'span', '', `${stage} of ${total}`);
    const close = el(head, 'button', 'learn-close', '✕');
    close.type = 'button';
    close.setAttribute('aria-label', 'Close the lesson');
    close.onclick = onClose;
    return el(host, 'div', 'learn-body');
  };
  const button = (parent, text, cls) => {
    const b = el(parent, 'button', cls, text);
    b.type = 'button';
    return b;
  };
  const total = 3 + loop.tests.length;

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
        el(fb, 'p', right ? 'ok' : 'no', checkOnly ? (right ? 'You knew this.' : 'Not quite, and that’s fine: this is what the next step shows.') : right ? 'Correct.' : 'Not quite.');
        el(fb, 'p', '', it.explain);
        el(fb, 'p', 'where', `Source: ${it.where}`);
        const row = el(fb, 'div', 'learn-row');
        if (!right && !checkOnly) button(row, 'See it again', 'ghost').onclick = onSeeAgain;
        button(row, 'Next', 'primary').onclick = () => then(right);
      };
    });
  }

  function check() {
    const body = frame(1, total);
    ask(body, loop.check, (right) => {
      before = right;
      see();
    }, { checkOnly: true });
  }

  function see() {
    const body = frame(2, total);
    if (loop.see === 'compare') {
      el(body, 'p', 'learn-q', 'Look at the model, then try this.');
      showCrustActivity(el(body, 'div', 'learn-activity'), 'compare');
    } else {
      // switch the model to the view that shows this layer best, with the layer highlighted
      onView?.(loop.see.view);
      el(body, 'p', 'learn-q', 'Look at the model.');
      renderRich(el(body, 'p', ''), loop.see.look);
    }
    button(body, 'Next', 'primary').onclick = understand;
  }

  function understand() {
    const body = frame(3, total);
    el(body, 'p', '', part.short);
    button(body, 'Test yourself', 'primary').onclick = () => test(0);
  }

  function test(k) {
    if (k >= loop.tests.length) return recap();
    const body = frame(4 + k, total);
    ask(body, loop.tests[k], (right) => {
      if (right) score++;
      test(k + 1);
    });
  }

  function recap() {
    saveProgress(level, part.id, { before, score, total: loop.tests.length, at: new Date().toISOString().slice(0, 10) });
    host.replaceChildren();
    const head = el(host, 'div', 'learn-head');
    el(head, 'b', '', `${part.title}: done`);
    const body = el(host, 'div', 'learn-body');
    el(body, 'p', 'learn-score', `Before: ${before ? 'you already knew the opening answer' : 'the opening answer was new to you'}. Now: ${score} of ${loop.tests.length} correct.`);
    el(body, 'p', '', score === loop.tests.length ? 'You have this layer.' : 'Try again to go over the ones you missed.');
    const row = el(body, 'div', 'learn-row');
    button(row, 'Try again', 'ghost').onclick = check;
    button(row, 'Back to the layer', 'primary').onclick = onClose;
  }

  check();
}
