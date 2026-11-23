// "Not sure which level?" on the welcome screen: three questions, then a suggested level. Nothing is saved or sent.
import { PLACEMENT, suggestLevel } from '../content/earth/placement.js';
import { LEVELS } from '../content/levels.js';

/** "Suggested: Intermediate. You knew which layer is liquid and how deep the core starts." from right/wrong answers. */
export function summary(results) {
  const label = LEVELS.find((l) => l.id === suggestLevel(results.filter(Boolean).length)).label;
  const knew = PLACEMENT.filter((_, k) => results[k]).map((p) => p.knew);
  if (!knew.length) return `Suggested: ${label}. A good place to start.`;
  const list = knew.length > 1 ? `${knew.slice(0, -1).join(', ')} and ${knew.at(-1)}` : knew[0];
  return `Suggested: ${label}. You knew ${list}.`;
}

/** Runs the questions in `host`; onDone(levelId) selects the suggested level. */
export function mountPlacement(host, onDone) {
  const results = [];
  const el = (tag, cls, text) => Object.assign(document.createElement(tag), { className: cls, textContent: text ?? '' });
  const button = (text, cls, fn) => Object.assign(el('button', cls, text), { type: 'button', onclick: fn });

  function ask(k) {
    const p = PLACEMENT[k];
    const opts = el('div', 'place-opts');
    const after = el('div', 'place-after');
    opts.append(
      ...p.options.map((o, i) =>
        button(o, 'place-opt', () => {
          results[k] = i === p.answer;
          for (const b of opts.children) b.disabled = true;
          opts.children[p.answer].classList.add('right');
          if (i !== p.answer) opts.children[i].classList.add('wrong');
          after.append(
            el('p', 'place-explain', `${i === p.answer ? 'Right.' : 'Not quite.'} ${p.explain}`),
            el('p', 'place-src', `Source: ${p.where}`),
            button(k + 1 < PLACEMENT.length ? 'Next question' : 'See my level', 'place-next', () => (k + 1 < PLACEMENT.length ? ask(k + 1) : finish())),
          );
          after.lastChild.focus();
        }),
      ),
    );
    host.replaceChildren(el('p', 'place-count', `Question ${k + 1} of ${PLACEMENT.length}`), el('p', 'place-q', p.q), opts, after);
    opts.firstChild.focus();
  }

  function finish() {
    onDone(suggestLevel(results.filter(Boolean).length));
    host.replaceChildren(el('p', 'place-result', summary(results)), el('p', 'place-src', 'It is selected for you; you can still pick any level.'));
  }

  ask(0);
}
