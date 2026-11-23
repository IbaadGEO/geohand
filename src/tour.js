// The automatic tour: whole Earth, then every layer and boundary from the surface down, then the whole Earth again.
// Captions only use text already in the content: a part's short text, or, where that is still a draft, its cited values.

const READ_WPS = 2.6; // words per second a viewer can comfortably read
const MIN_S = 6, MAX_S = 16;
const plain = (s) => s.replace(/[~^]/g, '');
const words = (s) => plain(s).split(/\s+/).filter(Boolean).length;

/** One caption per part: its short text, or (draft text) up to three cited values. */
export function caption(part) {
  if (!part.draft && part.short) return part.short;
  return (part.numbers || []).slice(0, 3).map((n) => `${n.label}: ${n.value}`).join(' · ');
}

const readS = (text) => Math.min(MAX_S, Math.max(MIN_S, 2.5 + words(text) / READ_WPS));
export const CHECK_WAIT = 10; // seconds a tour question waits for an answer before showing it

/** parts: content parts in surface-down order; checks: part id -> check question (learn.js).
 *  Returns [{ id (null = whole Earth), title, text, dur, check? }]. A step with a check asks first, then explains. */
export function buildTour(parts, levelLabel, checks = {}) {
  const step = (id, title, text) => ({ id, title, text, dur: readS(text) });
  const withCheck = (p) => {
    const s = step(p.id, p.title, caption(p));
    const check = checks[p.id];
    return check ? { ...s, check, dur: CHECK_WAIT + readS(`${check.explain} ${check.where}`) } : s;
  };
  return [
    step(null, "Inside the Earth", `${levelLabel} tour: ${parts.length} parts, starting at the surface and moving towards the centre.`),
    ...parts.map(withCheck),
    step(null, "Inside the Earth", 'Back at the full Earth model. Select another layer to explore or restart the tour.'),
  ];
}
