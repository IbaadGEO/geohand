import { draft } from './_draft.js';
import undergrad from './undergrad.js';

export default {
  level: 'postgrad',
  parts: [
    ...undergrad.parts.map((p) => draft(p.id, p.kind, p.title, p.parent)),
    draft('d-double-prime', 'layer', 'D″ layer', 'lower-mantle'),
    draft('llsvp', 'layer', 'Large low-velocity provinces', 'lower-mantle'),
    draft('innermost-inner-core', 'layer', 'Innermost inner core', 'inner-core'),
  ],
};
