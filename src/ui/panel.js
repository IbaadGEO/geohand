// Info panel for the selected part or boundary. Top level is DOM-free so formatRef can be tested in node.
import { renderRich } from './richText.js';

/** APA-style reference line, as in docs/sources.md. Titles may carry rich markup (e.g. MgSiO~3~). */
export function formatRef(r) {
  const where = r.book
    ? `${r.container}.`
    : `${r.container}${r.volume != null ? `, ${r.volume}` : ''}${r.issue != null ? `(${r.issue})` : ''}${r.pages ? `, ${r.pages}` : ''}.`;
  const link = r.doi ? ` https://doi.org/${r.doi}` : r.url ? ` ${r.url}` : '';
  return `${r.authors} (${r.year}). ${r.title}. ${where}${link}`;
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
  const searchSlot = el('div', 'info-search');

  function show(part, refs, color = '#555a70') {
    if (part === current) return;
    current = part;
    if (!part) {
      root.replaceChildren(el('p', 'info-empty', 'Point at a part or a boundary, or click one.'), searchSlot);
      return;
    }
    // number references in order of first use
    const order = [];
    const num = (id) => (order.includes(id) ? order : (order.push(id), order)).indexOf(id) + 1;
    const cite = (ids) => (ids?.length ? `^${ids.map(num).join(',')}^` : '');

    const head = el('div', 'pc-name');
    const dot = el('i');
    dot.style.background = color;
    head.append(dot, el('b', '', part.title));
    if (part.kind === 'boundary') head.append(el('span', 'tag ghost', 'boundary'));

    const more = el('details', 'more');
    more.append(el('summary', '', 'More detail'), el('p', '', part.long));

    const parts = [head, el('p', 'short', part.short), more];

    if (part.numbers?.length) {
      const table = el('table', 'nums');
      for (const n of part.numbers) {
        const tr = el('tr');
        tr.append(el('td', '', n.label), el('td', '', `${n.value}${cite(n.refs)}`));
        table.append(tr);
      }
      parts.push(table);
    }
    if (part.simplification) parts.push(el('p', 'simp', `Simplified: ${part.simplification}`));

    if (part.questions?.length) {
      const qs = el('details', 'qs');
      qs.append(el('summary', '', `Common questions (${part.questions.length})`));
      for (const q of part.questions) {
        const d = el('details', 'q');
        d.append(el('summary', '', q.q), el('p', '', `${q.a}${cite(q.refs)}`));
        qs.append(d);
      }
      parts.push(qs);
    }
    parts.push(searchSlot);

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
  return { show, searchSlot };
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
  slot.append(el('h4', '', "Don't get something?"), input, list);

  input.addEventListener('input', () => {
    const query = input.value;
    const hits = find(query);
    const rows = hits.map((h) => {
      const d = el('details', 'q');
      const s = el('summary', '', h.q);
      if (h.level !== currentLevel()) s.append(el('span', 'tag ghost', levelLabel(h.level)));
      d.append(s, el('p', '', h.a));
      return d;
    });
    if (!hits.length && query.trim().length >= 5) {
      rows.push(el('p', 'info-empty', 'No answer yet.'));
      if (onAsk) {
        const b = el('button', 'ask-btn', 'Send this question');
        b.type = 'button';
        b.onclick = () => onAsk(query.trim());
        rows.push(b);
      }
    }
    list.replaceChildren(...rows);
  });
  return { input, list };
}
