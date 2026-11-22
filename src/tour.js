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

/** parts: content parts in surface-down order. Returns [{ id (null = whole Earth), title, text, dur }]. */
export function buildTour(parts, levelLabel) {
  const step = (id, title, text) => ({ id, title, text, dur: Math.min(MAX_S, Math.max(MIN_S, 2.5 + words(text) / READ_WPS)) });
  return [
    step(null, "Earth's interior", `${levelLabel} tour: ${parts.length} parts, from the surface down to the centre.`),
    ...parts.map((p) => step(p.id, p.title, caption(p))),
    step(null, "Earth's interior", 'Back to the whole Earth. Pick a layer to look closer, or play the tour again.'),
  ];
}
