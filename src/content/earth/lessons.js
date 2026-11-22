// Guided lessons, one per level. A step: { focus: partId, explode: 0..1, view: { x, y, z } radians, text, refs, where? }.
// shortcut: DRAFT skeleton steps until the real cited lesson text is written (plan Task 11).
const step = (focus, explode, y, text) => ({ focus, explode, view: { x: 0.35, y, z: 0 }, text: `DRAFT: ${text}`, refs: ['prem1981'] });
const say = (focus, explode, y, text, where, ...refs) => ({ focus, explode, view: { x: 0.35, y, z: 0 }, text, where, refs });

export const LESSONS = {
  alevel: [
    {
      ...say('crust', 0.35, 0.6, 'The crust is separated from the other layers. In the two sections below, choose the line where crust meets mantle in each column.',
        'White et al. (1992), p. 19,683; Mooney et al. (1998), Plate 1, p. 733', 'white1992', 'mooney1998'),
      activity: 'compare',
    },
    {
      ...say('moho', 0.5, 0.9, 'In a new cross-section, compressional waves speed up where crust gives way to mantle. What would you call that boundary?',
        'PREM, Table I and footnote, p. 308; Garnero et al. (2016), p. 481', 'prem1981', 'garnero2016'),
      activity: 'transfer',
    },
    say('lithosphere', 0.6, 1.0, 'The crust and the top of the mantle together make the tectonic plates. This model uses PREM’s seismic lid base at 80 km as a proxy for the base of the plates.', 'Garnero et al. (2016), p. 481; PREM, pp. 300, 308', 'prem1981', 'garnero2016'),
    say('mantle', 0.85, 1.2, 'Shear waves pass through the mantle, so it responds as a solid. Over geological time it convects, heated by the core below and by radioactive decay.', 'PREM, Table I, p. 308; Garnero et al. (2016), p. 481', 'prem1981', 'garnero2016'),
    say('outer-core', 1, 1.5, 'At about 2,890 km, shear waves stop. The outer core is liquid iron, and its movement makes the magnetic field.', 'PREM, Table I, p. 308; Song & Richards (1996), p. 221', 'prem1981', 'song1996'),
    say('inner-core', 1, 1.8, 'At the centre is a solid iron ball about 1,220 km in radius, still growing as the liquid around it freezes.', 'Song & Richards (1996), p. 221', 'song1996'),
  ],
  undergrad: [
    step('oceanic-crust', 0, 0.6, 'Thin, dense crust under the oceans.'),
    step('lab', 0.5, 0.9, 'The base of PREM’s seismic lid, used as a proxy for the base of the plates.'),
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
