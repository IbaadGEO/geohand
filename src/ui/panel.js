// Info panel for the selected part or boundary. Top level is DOM-free so formatRef can be tested in node.
import { renderRich } from './richText.js';
import { stateOf } from '../content/earth/states.js';
import { termsIn } from '../content/earth/glossary.js';

/** APA-style reference line, as in docs/sources.md. Titles may carry rich markup (e.g. MgSiO~3~). */
export function formatRef(r) {
  const where = r.book
    ? `${r.container}.`
    : `${r.container}${r.volume != null ? `, ${r.volume}` : ''}${r.issue != null ? `(${r.issue})` : ''}${r.pages ? `, ${r.pages}` : ''}.`;
  const link = r.doi ? ` https://doi.org/${r.doi}` : r.url ? ` ${r.url}` : '';
  return `${r.authors} (${r.year}). ${r.title}. ${where}${link}`;
}

/** Short in-text citation: "Deuss 2014", "Song & Richards 1996", "Garnero et al. 2016". */
export function shortRef(r) {
  const names = [...r.authors.matchAll(/([^,&]+), (?:[A-Z]\.[\s-]?)+/g)].map((m) => m[1].trim());
  const who = names.length > 2 ? `${names[0]} et al.` : names.join(' & ');
  return `${who} ${r.year}`;
}

const el = (tag, cls, text) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) renderRich(n, text);
  return n;
};

/**
 * Info panel in `root`. show(part, refs, color) renders a content part (or null for the empty state).
 * Re-showing the same part object is a no-op, so hover can call it every frame.
 */
export function mountPanel(root) {
  let current;

  /** plain (the Normal level): no page locators under the text, and a list of the terms it uses with their meanings. */
  function show(part, refs, color = '#555a70', plain = false) {
    if (part === current) return;
    current = part;
    if (!part) {
      root.replaceChildren(el('p', 'info-prompt', 'What do you want to learn about?'),
        el('p', 'info-empty only-hands', 'Hold a peace sign to highlight a layer, or point at one and hold still.'),
        el('p', 'info-empty only-mouse', 'Click a layer, or choose one from the list above.'));
      return;
    }
    // number references in order of first use
    const order = [];
    const num = (id) => (order.includes(id) ? order : (order.push(id), order)).indexOf(id) + 1;
    // bracketed so a citation can't read as a power (g/cm³ then citation 1 is not cm³¹)
    const cite = (ids) => (ids?.length ? `^[${ids.map(num).join(',')}]^` : '');

    const head = el('div', 'pc-name');
    const dot = el('i');
    dot.style.background = color;
    head.append(dot, el('b', '', part.title));
    if (part.kind === 'boundary') head.append(el('span', 'tag ghost', 'boundary'));

    const parts = [head];
    // what the part is comes first; then what the moving dots on the model mean for it
    const more = !part.draft && el('details', 'more');
    if (more) {
      more.append(el('summary', '', 'More detail'), el('p', '', part.long));
      parts.push(el('p', 'short', part.short));
    }
    const state = stateOf(part.id, part.kind);
    if (state) {
      const st = el('p', 'state', `${state.label}${cite(state.refs)}`);
      const note = `${state.shown || 'The dots’ motion shows this'}; speeds are not to scale.`;
      st.append(el('span', 'where', plain ? note : `${state.where}. ${note}`));
      parts.push(st);
    }
    if (more) parts.push(more);

    if (part.numbers?.length) {
      const table = el('table', 'nums');
      for (const n of part.numbers) {
        const tr = el('tr');
        const val = el('td', '', `${n.value}${cite(n.refs)}`);
        if (n.where && !plain) val.append(el('div', 'where', n.where));
        tr.append(el('td', '', n.label), val);
        table.append(tr);
      }
      parts.push(table);
    }
    if (part.simplification) parts.push(el('p', 'simp', `Simplified: ${part.simplification}`));

    if (!part.draft && part.questions?.length) {
      const qs = el('details', 'qs');
      qs.append(el('summary', '', `Common questions (${part.questions.length})`));
      for (const q of part.questions) {
        const d = el('details', 'q');
        d.append(el('summary', '', q.q), el('p', '', `${q.a}${cite(q.refs)}`));
        if (q.where) d.append(el('p', 'where', q.where));
        qs.append(d);
      }
      parts.push(qs);
    }

    if (plain) {
      // each term is defined beside the text that uses it: words only in "More detail" are explained inside it
      const words = (terms) => {
        const ul = el('ul', 'terms');
        for (const g of terms) {
          const li = el('li');
          li.append(el('b', '', `${g.term}: `), el('span', '', `${g.text}${cite(g.refs)}`));
          ul.append(li);
        }
        return [el('h4', '', 'Words used here'), ul];
      };
      const shown = termsIn([part.short, state?.label, part.simplification, ...(part.numbers || []).flatMap((n) => [n.label, n.value])].join(' '));
      const inMore = termsIn(part.long || '').filter((g) => !shown.includes(g));
      if (shown.length) parts.push(...words(shown));
      if (more && inMore.length) more.append(...words(inMore));
    }

    if (order.length) {
      const ol = el('ol', 'refs');
      for (const id of order) {
        const r = refs[id];
        const li = el('li', '', formatRef({ ...r, doi: null, url: null }));
        const href = r.doi ? `https://doi.org/${r.doi}` : r.url;
        if (href && /^https:\/\//.test(href)) {
          const a = el('a');
          a.textContent = ' ' + href;
          a.href = href;
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          li.append(a);
        }
        ol.append(li);
      }
      parts.push(el('h4', '', 'References'), ol);
    }
    root.replaceChildren(...parts);
  }

  show(null);
  return { show };
}

/**
 * Search box in `slot`. find(query) returns searchBank results; levelLabel(id) names a level;
 * onAsk(query) is offered when nothing matches (omit to hide it).
 */
export function mountSearch(slot, { find, levelLabel, currentLevel, onAsk }) {
  const input = el('input', 'search-in');
  input.type = 'search';
  input.placeholder = 'Search the questions…';
  input.setAttribute('aria-label', 'Search the questions');
  input.maxLength = 500;
  const list = el('div', 'search-out');
  const askHost = el('div', 'ask-host'); // separate from the results, so more typing in search keeps a half-written question
  slot.append(input, list, askHost);

  input.addEventListener('input', () => {
    const query = input.value;
    const hits = find(query);
    const rows = hits.map((h) => {
      const d = el('details', 'q');
      const s = el('summary', '', h.q);
      if (h.level !== currentLevel()) s.append(el('span', 'tag ghost', levelLabel(h.level)));
      d.append(s, el('p', '', h.a));
      if (h.where) d.append(el('p', 'where', h.where));
      return d;
    });
    if (!hits.length && query.trim().length >= 5) {
      rows.push(el('p', 'info-empty', 'No answer is available yet.'));
      if (onAsk) {
        const b = el('button', 'ask-btn', 'Send this question');
        b.type = 'button';
        b.onclick = () => onAsk(query.trim());
        rows.push(b);
      }
    }
    list.replaceChildren(...rows);
  });
  return { input, list, askHost };
}
