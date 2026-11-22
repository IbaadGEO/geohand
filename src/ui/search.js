// Word-overlap search over the question bank. No dependency, no index: the bank is a few hundred questions.
const STOP = new Set('a an the is are was be do does did what why how which who when where if it its of to in on at and or for by from than that this with can there i me my you your'.split(' '));

/** Lowercase words without accents, punctuation or stop words. */
export function normalise(s) {
  return String(s)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .replace(/['’]s\b/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .split(' ')
    .filter((w) => w && !STOP.has(w));
}

/** Best matches first (shared words / query words, at least half); ties go to the current level. At most 8. */
export function searchBank(query, content, level) {
  const words = normalise(query);
  if (!words.length) return [];
  const hits = [];
  for (const [lv, { parts }] of Object.entries(content)) {
    for (const p of parts) {
      for (const q of p.questions || []) {
        const have = new Set(normalise(q.q));
        const score = words.filter((w) => have.has(w)).length / words.length;
        if (score >= 0.5) hits.push({ partId: p.id, level: lv, q: q.q, a: q.a, refs: q.refs, score });
      }
    }
  }
  return hits.sort((x, y) => y.score - x.score || (y.level === level) - (x.level === level)).slice(0, 8);
}
