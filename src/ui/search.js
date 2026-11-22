// Word-overlap search over the question bank. No dependency, no index: the bank is a few hundred questions.
const STOP = new Set('a an the is are was be do does did what why how which who when where if it its of to in on at and or for by from than that this with can there i me my you your'.split(' '));

/** Lowercase words without accents, punctuation or stop words. */
export function normalise(s) {
  return String(s)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .replace(/['’]s\b/g, '')
    .replace(/\b(?:s|shear)[\s-]+waves?\b/g, 'shear wave')
    .replace(/\bliquids\b/g, 'liquid')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .split(' ')
    .filter((w) => w && !STOP.has(w));
}

/** Rank question matches first, using the answer text for searches phrased differently. */
export function searchBank(query, content, level) {
  const words = normalise(query);
  if (!words.length) return [];
  const hits = [];
  for (const [lv, { parts }] of Object.entries(content)) {
    for (const p of parts) {
      if (p.draft) continue;
      for (const q of p.questions || []) {
        const questionWords = normalise(q.q);
        const title = new Set(questionWords);
        const terms = new Set([...title, ...normalise(q.a)]);
        const titleMatches = words.filter((w) => title.has(w)).length;
        const contentMatches = words.filter((w) => terms.has(w)).length;
        const exact = questionWords.join(' ') === words.join(' ');
        const score = exact ? 2 : Math.max(titleMatches, contentMatches * 0.75) / words.length;
        if (score >= 0.5) hits.push({ partId: p.id, level: lv, q: q.q, a: q.a, refs: q.refs, where: q.where, score });
      }
    }
  }
  return hits.sort((x, y) => y.score - x.score || (y.level === level) - (x.level === level)).slice(0, 8);
}
