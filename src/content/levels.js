// Difficulty levels. Relative depth and detail only: no exam board or course is followed.
// The ids are kept from the first names (saved progress and sent questions use them); only the labels show.
export const LEVELS = [
  { id: 'alevel', label: 'Normal' },
  { id: 'undergrad', label: 'Intermediate' },
  { id: 'postgrad', label: 'Advanced' },
];
export const LEVEL_IDS = LEVELS.map((l) => l.id);
