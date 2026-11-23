// Dumps every piece of GeoHand's on-screen text into one Markdown document for editing.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

// Run with `npm run script`; writes docs/content-script.md.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'docs', 'content-script.md');
const imp = (p) => import(pathToFileURL(path.join(root, p)).href);
const { EARTH } = await imp('src/content/earth/index.js');
const { LESSONS } = await imp('src/content/earth/lessons.js');
const { LOOPS } = await imp('src/content/earth/learn.js');
const { STATES } = await imp('src/content/earth/states.js');
const { REFS } = await imp('src/content/references.js');
const { LEVELS } = await imp('src/content/levels.js');
const { VIEWS } = await imp('src/ui/propertyView.js');
const { QUAKE_FACTS } = await imp('src/content/earth/rays.js');
const { GLOSSARY } = await imp('src/content/earth/glossary.js');

const L = [];
const w = (...s) => L.push(...s);
const strOf = (v) => (typeof v === 'string' ? v : JSON.stringify(v));

w('# GeoHand: full script', '', 'Every piece of text the app shows, generated from the source files. Edit freely; mark what you changed and the edits will be carried back into the code.', '',
  'Formatting kept from the source: `~2~` = subscript, `^3^` = superscript, `**bold**`. ✔ marks the correct quiz option.', '');

// 1. screen text from index.html
w('## 1. Screens, buttons and labels (index.html)', '');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8').replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<svg[\s\S]*?<\/svg>/g, '');
const seen = new Set();
for (const m of html.matchAll(/(?:title|aria-label|placeholder)="([^"]+)"|>([^<>]+)</g)) {
  const t = (m[1] || m[2] || '').replace(/\s+/g, ' ').trim();
  if (t && /[A-Za-z]/.test(t) && !seen.has(t)) { seen.add(t); w(`- ${t}`); }
}
w('');

// 2. views
w('## 2. Views (top bar) and their legends', '');
for (const v of VIEWS) {
  w(`### ${v.label}`, '');
  for (const k of ['title', 'caption', 'more', 'note']) if (v[k]) w(`- **${k}:** ${v[k]}`);
  for (const [label] of v.items || []) w(`- legend: ${label}`);
  if (v.min != null) w(`- scale: ${v.min} to ${v.max}`);
  for (const [lv, note] of Object.entries(v.byLevel || {})) w(`- **note at ${LEVELS.find((l) => l.id === lv).label} only:** ${note}`);
  if (v.q) w(`- question: ${v.q.q}`, ...v.q.options.map((o, i) => `  - ${i === v.q.answer ? '✔ ' : ''}${o}`), `  - explanation: ${v.q.explain} (${v.q.where})`);
  w('');
}
w('### Earthquake facts used by the earthquake view', '', '```', JSON.stringify(QUAKE_FACTS, null, 2), '```', '');

// levels and glossary
w('## Levels (start screen)', '', ...LEVELS.map((l) => `- **${l.label}:** ${l.who}`), '');
w('## Words used here (glossary, Normal level)', '', 'Shown under a part, beside the text that uses the word.', '', ...GLOSSARY.map((g) => `- **${g.term}:** ${g.text}${g.refs.length ? ` [${g.refs.join(', ')}]` : ''}`), '');

// 3. states
w('## 3. How each part behaves (state labels)', '');
for (const [k, s] of Object.entries(STATES)) w(`- **${k}:** ${s.label} (${s.where})${s.shown ? `. Note: ${s.shown}` : ''}`);
w('');

// 4. fixed prompts inside the interface code
w('## 4. Fixed prompts in the interface code', '', 'Messages, buttons and prompts written directly in the code (one line each, as in the file).', '');
for (const f of ['src/main.js', 'src/tour.js', 'src/ui/learnLoop.js', 'src/ui/stuck.js', 'src/ui/crustActivity.js', 'src/ui/panel.js', 'src/ui/ask.js'].filter((f) => fs.existsSync(path.join(root, f)))) {
  const src = fs.readFileSync(path.join(root, f), 'utf8').split('\n').filter((l) => !/^\s*(\/\/|\*|\/\*\*)/.test(l)).join('\n');
  const found = new Set();
  for (const m of src.matchAll(/'((?:[^'\\\n]|\\.)*)'|"((?:[^"\\\n]|\\.)*)"|`((?:[^`\\]|\\.)*)`/g)) {
    const t = (m[1] ?? m[2] ?? m[3]).trim();
    if (t.length >= 12 && / /.test(t) && /[a-z]{3}/.test(t) && !/^[#.\[]|=>|querySelector|^\w+(\.\w+)+$|px|rgba|deg|translate|\$\{[^}]*\(|textarea|noopener|button, summary|\?$|^: |^\$\{r\./.test(t)) found.add(t);
  }
  if (found.size) w(`### ${f}`, '', ...[...found].map((t) => `- ${t}`), '');
}

// 5. per level
const levelLabel = (id) => LEVELS.find((l) => l.id === id).label;
for (const [lvl, model] of Object.entries(EARTH)) {
  w(`## ${levelLabel(lvl)}`, '');
  w(`### Guided lesson (${levelLabel(lvl)})`, '');
  (LESSONS[lvl] || []).forEach((s, i) => w(`${i + 1}. **[${s.focus}]** ${s.text}`, `   - Sources: ${s.where || s.refs.join(', ')}${s.activity ? ` · activity: ${s.activity}` : ''}`));
  w('');
  w(`### Tour (${levelLabel(lvl)})`, '', `- Opening: ${levelLabel(lvl)} tour: ${model.parts.length} parts, from the surface down to the centre.`, '- Each part: its Summary (below), plus the last question of its drill-in when that drill-in is multiple choice.', '- Closing: Back to the whole Earth. Pick a layer to look closer, or play the tour again.', '');
  for (const p of model.parts) {
    w(`### ${levelLabel(lvl)} · ${p.title}`, '', `*id: ${p.id} · ${p.kind}${p.parent ? ` · within ${p.parent}` : ''}*`, '');
    w(`**Summary:** ${p.short}`, '', `**More detail:** ${p.long}`, '');
    if (p.simplification) w(`**How it is drawn:** ${p.simplification}`, '');
    if (p.numbers?.length) {
      w('**Cited numbers:**', '');
      for (const n of p.numbers) w(`- ${n.label}: ${n.value} (${n.refs.join(', ')}: ${n.where})`);
      w('');
    }
    if (p.questions?.length) {
      w('**Common questions:**', '');
      p.questions.forEach((q, i) => w(`${i + 1}. Q: ${q.q}`, `   A: ${q.a}`, `   Source: ${q.where || ''} [${q.refs.join(', ')}]`));
      w('');
    }
    const loop = LOOPS[lvl]?.[p.id];
    if (loop) {
      w(`**Learn about this part (drill-in${loop.recall ? ', recall: built from the Common questions above' : ''}):**`, '');
      w(`- How it works: ${loop.see === 'compare' ? 'crust comparison activity' : `[${loop.see.view} view] ${loop.see.look}`}`);
      for (const [tag, it] of [['Opening question', loop.check], ...loop.tests.map((t, k) => [`Test ${k + 1}`, t])]) {
        if (it.options) w(`- ${tag}: ${it.q}`, ...it.options.map((o, i) => `  - ${i === it.answer ? '✔ ' : ''}${o}`), `  - Explanation: ${it.explain}`, `  - Source: ${it.where}`);
        else w(`- ${tag} (think, then reveal): ${it.q}`, `  - Answer: ${it.explain}`, `  - Source: ${it.where || ''}`);
      }
      w('');
    }
  }
}

// 6. references
w('## References', '');
for (const [id, r] of Object.entries(REFS)) w(`- **${id}**: ${r.authors} (${r.year}). ${r.title}. *${r.container}*${r.volume ? `, ${r.volume}` : ''}${r.issue ? `(${r.issue})` : ''}${r.pages ? `, ${r.pages}` : ''}. ${r.doi ? `https://doi.org/${r.doi}` : r.url || ""}`);
w('');
fs.writeFileSync(out, L.join('\n'), 'utf8');
console.log(`${L.length} lines, ${fs.statSync(out).size} bytes`);
