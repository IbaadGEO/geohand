// shortcut: skeleton content until the real cited text is written (plan Task 11); delete this file then.
import { NUMBERS } from './numbers.js';

export const draft = (level, id, kind, title, parent) => ({
  id, kind, title, ...(parent && { parent }),
  short: `DRAFT: ${title}.`,
  long: `DRAFT: longer explanation of the ${title.toLowerCase()}.`,
  numbers: NUMBERS[level][id] || [],
  questions: [{ q: `DRAFT: What is the ${title.toLowerCase()}?`, a: 'DRAFT answer.', refs: ['prem1981'] }],
});
