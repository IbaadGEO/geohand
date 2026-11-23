// README "Live updates": every answered visitor question, newest first, generated from the content files.
import { LEVELS } from './levels.js';

const cell = (s) => String(s).replace(/\|/g, '\\|').replace(/\s+/g, ' ');

export function renderUpdates(content) {
  const rows = [];
  for (const { id, label } of LEVELS)
    for (const p of content[id]?.parts || [])
      for (const q of p.questions || []) if (q.fromVisitor) rows.push([q.added, label, p.title, q.q]);
  if (!rows.length) return '_No visitor questions answered yet._';
  rows.sort((a, b) => (b[0] || '').localeCompare(a[0] || ''));
  return ['| Date | Level | Part | Question |', '|---|---|---|---|', ...rows.map((r) => `| ${r.map(cell).join(' | ')} |`)].join('\n');
}

/** Replaces the text between <!-- name:start --> and <!-- name:end --> in the README. */
export function applyBlock(readme, name, text) {
  const start = `<!-- ${name}:start -->`, end = `<!-- ${name}:end -->`;
  const i = readme.indexOf(start), j = readme.indexOf(end);
  if (i < 0 || j < i) throw new Error(`README is missing the ${name} markers`);
  return `${readme.slice(0, i + start.length)}\n${text}\n${readme.slice(j)}`;
}
export const applyUpdates = (readme, table) => applyBlock(readme, 'live-updates', table);

// "Dziewonski, A. M., & Anderson, D. L." -> "Dziewonski, A.M. and Anderson, D.L."
function harvardAuthors(list) {
  const people = list.replace(/,?\s*&\s*/, ', ').match(/[^,]+, (?:[A-Za-z]\.[\s-]?)+|et al\./g) || [list];
  const names = people.map((p) => p.trim().replace(/\.\s+(?=[A-Z])/g, '.'));
  if (names.at(-1) === 'et al.') return `${names.slice(0, -1).join(', ')} et al.`;
  return names.length > 1 ? `${names.slice(0, -1).join(', ')} and ${names.at(-1)}` : names[0];
}

/** One reference in Harvard (Cite Them Right) style, in Markdown. */
export function harvard(r) {
  const pages = r.pages ? `, ${/^\d/.test(r.pages) ? `pp. ${r.pages}` : r.pages}` : '';
  const where = r.book ? `*${r.container}*` : `*${r.container}*${r.volume != null ? `, ${r.volume}` : ''}${r.issue != null ? `(${r.issue})` : ''}${pages}`;
  const link = r.doi ? ` Available at: https://doi.org/${r.doi}` : r.url ? ` Available at: ${r.url}` : '';
  return `${harvardAuthors(r.authors)} (${r.year}) '${r.title}', ${where}.${link}`;
}

/** Every reference as a Markdown list, alphabetical by first author then year. */
export const renderReferences = (refs) =>
  Object.values(refs).map(harvard).sort((a, b) => a.localeCompare(b)).map((h) => `- ${h}`).join('\n');
