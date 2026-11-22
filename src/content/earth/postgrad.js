import { draft } from './_draft.js';
import undergrad from './undergrad.js';

export default {
  level: 'postgrad',
  parts: [
    ...undergrad.parts.map((p) => draft('postgrad', p.id, p.kind, p.title, p.parent)),
    draft('postgrad', 'd-double-prime', 'layer', 'D″ layer', 'lower-mantle'),
    // large low-velocity provinces and the innermost inner core return when their papers are in hand
  ],
};
