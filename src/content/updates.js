// README "Live updates": every answered visitor question, newest first, generated from the content files.
import { LEVELS } from './levels.js';

const START = '<!-- live-updates:start -->', END = '<!-- live-updates:end -->';
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

export function applyUpdates(readme, table) {
  const i = readme.indexOf(START), j = readme.indexOf(END);
  if (i < 0 || j < i) throw new Error('README is missing the live-updates markers');
  return `${readme.slice(0, i + START.length)}\n${table}\n${readme.slice(j)}`;
}
