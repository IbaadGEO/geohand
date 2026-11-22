import { draft } from './_draft.js';
import undergrad from './undergrad.js';

export default {
  level: 'postgrad',
  parts: [
    ...undergrad.parts.map((p) => draft('postgrad', p.id, p.kind, p.title, p.parent, p.simplification)),
    draft('postgrad', 'd-double-prime', 'layer', 'D″ layer', 'lower-mantle'),
    draft('postgrad', 'llsvp', 'layer', 'Large low-shear-velocity provinces', 'lower-mantle',
      'The two cross-sections are schematic, with illustrative shapes and positions. The ~30% footprint is an estimate for the real provinces (Garnero et al. 2016, p. 481).'),
    draft('postgrad', 'innermost-inner-core', 'layer', 'Innermost inner core (proposed)', 'inner-core'),
  ],
};
