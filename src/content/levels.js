// Difficulty levels. Relative depth and detail only: no exam board or course is followed.
// The ids are kept from the first names (saved progress and sent questions use them); only the labels show.
export const LEVELS = [
  { id: 'alevel', label: 'Normal', who: 'The main layers in plain words, with the key terms explained.' },
  { id: 'undergrad', label: 'Intermediate', who: 'More boundaries, the numbers behind them and where they come from.' },
  { id: 'postgrad', label: 'Advanced', who: 'Debated ideas, competing estimates and the exact pages to check.' },
];
export const LEVEL_IDS = LEVELS.map((l) => l.id);
