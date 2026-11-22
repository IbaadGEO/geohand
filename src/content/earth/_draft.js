// shortcut: skeleton content until the real cited text is written (plan Task 11); delete this file then.
import { NUMBERS } from './numbers.js';

export const draft = (level, id, kind, title, parent, simplification) => ({
  id, kind, title, ...(parent && { parent }),
  draft: true,
  short: `DRAFT: ${title}.`,
  long: `DRAFT: longer explanation of the ${title.toLowerCase()}.`,
  ...(simplification && { simplification }),
  numbers: NUMBERS[level][id] || [],
  questions: [{ q: `DRAFT: What is the ${title.toLowerCase()}?`, a: 'DRAFT answer.', refs: ['prem1981'] }],
});
