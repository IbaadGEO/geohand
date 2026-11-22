import { draft } from './_draft.js';
import undergrad from './undergrad.js';

export default {
  level: 'postgrad',
  parts: [
    ...undergrad.parts.map((p) => draft('postgrad', p.id, p.kind, p.title, p.parent)),
    draft('postgrad', 'd-double-prime', 'layer', 'D″ layer', 'lower-mantle'),
    draft('postgrad', 'llsvp', 'layer', 'Large low-shear-velocity provinces', 'lower-mantle'),
    draft('postgrad', 'innermost-inner-core', 'layer', 'Innermost inner core (proposed)', 'inner-core'),
  ],
};
