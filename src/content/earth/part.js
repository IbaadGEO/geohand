import { NUMBERS } from './numbers.js';

/** A finished part: text fields plus its cited numbers for that level. */
export const part = (level, id, kind, title, text, parent) => ({
  id, kind, title, ...(parent && { parent }), ...text, numbers: NUMBERS[level][id] || [],
});

/** A bank question with its reference ids. */
export const q = (question, a, ...refs) => ({ q: question, a, refs });
