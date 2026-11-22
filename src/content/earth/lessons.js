// Guided lessons, one per level. A step: { focus: partId, explode: 0..1, view: { x, y, z } radians, text, refs }.
// shortcut: DRAFT skeleton steps until the real cited lesson text is written (plan Task 11).
const step = (focus, explode, y, text) => ({ focus, explode, view: { x: 0.35, y, z: 0 }, text: `DRAFT: ${text}`, refs: ['prem1981'] });

export const LESSONS = {
  alevel: [
    step('crust', 0, 0.6, 'The thin rocky outer layer we live on.'),
    step('moho', 0.5, 0.9, 'Where the crust ends and the mantle begins.'),
    step('mantle', 0.85, 1.2, 'Hot solid rock that slowly flows.'),
    step('outer-core', 1, 1.5, 'Liquid iron that makes the magnetic field.'),
    step('inner-core', 1, 1.8, 'A solid iron ball at the centre.'),
  ],
  undergrad: [
    step('oceanic-crust', 0, 0.6, 'Thin, dense crust under the oceans.'),
    step('lab', 0.5, 0.9, 'The base of the rigid plates.'),
    step('transition-zone', 0.85, 1.2, 'Minerals change structure between 410 and 660 km.'),
    step('cmb', 1, 1.5, 'The sharpest boundary inside the Earth.'),
    step('icb', 1, 1.8, 'Where the liquid outer core freezes onto the inner core.'),
  ],
  postgrad: [
    step('d660', 0.6, 0.6, 'Slabs stall or sink through 660 km.'),
    step('d-double-prime', 0.9, 0.9, 'A complex layer above the core.'),
    step('cmb', 1, 1.3, 'Seismic speeds drop sharply into the liquid core.'),
    step('icb', 1, 1.6, 'Shear waves reappear in the solid inner core.'),
  ],
};
