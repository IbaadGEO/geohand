// Difficulty levels. Relative depth and detail only: no exam board or course is followed.
// The ids are kept from the first names (saved progress and sent questions use them); only the labels show.
export const LEVELS = [
  { id: 'alevel', label: 'Normal', who: 'Start here. The main layers, in everyday words.' },
  { id: 'undergrad', label: 'Intermediate', who: 'More layers, with the numbers and where they come from.' },
  { id: 'postgrad', label: 'Advanced', who: 'What scientists still argue about, with exact sources.' },
];
export const LEVEL_IDS = LEVELS.map((l) => l.id);
