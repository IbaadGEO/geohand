// Checks a model's content (all three levels) against the reference list. Pure: no DOM, no imports.
const ORDER = ['alevel', 'undergrad', 'postgrad'];
export const MAX_PARTS = 24; // scene shader limit (MAXP)

export function checkContent(model, refs, { release = false } = {}, lessons) {
  const errors = [], warnings = [];
  const seenRefs = new Set();
  const useRefs = (where, ids) => {
    for (const id of ids || []) {
      if (!refs[id]) errors.push(`${where}: unknown reference "${id}"`);
      else seenRefs.add(id);
    }
  };
  const lower = new Set();

  for (const level of ORDER) {
    const parts = model[level]?.parts || [];
    if (parts.length > MAX_PARTS) errors.push(`${level}: ${parts.length} parts, the limit is ${MAX_PARTS}`);
    const ids = new Set();
    for (const p of parts) {
      const at = `${level}/${p.id}`;
      if (ids.has(p.id)) errors.push(`${at}: duplicate id`);
      ids.add(p.id);
      if (p.parent && !lower.has(p.parent)) errors.push(`${at}: parent "${p.parent}" is not a part at a lower level`);
      for (const f of ['title', 'short', 'long']) if (!p[f]?.trim()) errors.push(`${at}: missing ${f} text`);
      for (const n of p.numbers || []) {
        if (!n.refs?.length) errors.push(`${at}: number "${n.label}" has no reference`);
        useRefs(`${at} number "${n.label}"`, n.refs);
      }
      for (const q of p.questions || []) {
        if (!q.a?.trim()) errors.push(`${at}: question "${q.q}" has no answer`);
        if (!q.refs?.length) errors.push(`${at}: question "${q.q}" has no reference`);
        useRefs(`${at} question "${q.q}"`, q.refs);
      }
    }
    ids.forEach((id) => lower.add(id));
  }

  if (lessons) {
    for (const level of ORDER) {
      const ids = new Set((model[level]?.parts || []).map((p) => p.id));
      (lessons[level] || []).forEach((s, i) => {
        if (!ids.has(s.focus)) errors.push(`lesson ${level} step ${i + 1}: focus "${s.focus}" is not a part at this level`);
        useRefs(`lesson ${level} step ${i + 1}`, s.refs);
      });
    }
  }

  // placeholder text must not ship
  for (const level of ORDER) {
    const drafts = (model[level]?.parts || []).filter((p) => JSON.stringify(p).includes('DRAFT')).length
      + (lessons?.[level] || []).filter((s) => s.text?.includes('DRAFT')).length;
    if (drafts) (release ? errors : warnings).push(`${level}: ${drafts} part(s) or lesson step(s) still have DRAFT text`);
  }

  for (const id of seenRefs) {
    if (!refs[id].checked) (release ? errors : warnings).push(`reference "${id}" is not checked against the paper yet`);
  }
  return { errors, warnings };
}
