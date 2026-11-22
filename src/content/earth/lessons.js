// Guided lessons, one per level. A step: { focus: partId, explode: 0..1, view: { x, y, z } radians, text, refs }.
// shortcut: DRAFT skeleton steps until the real cited lesson text is written (plan Task 11).
const step = (focus, explode, y, text) => ({ focus, explode, view: { x: 0.35, y, z: 0 }, text: `DRAFT: ${text}`, refs: ['prem1981'] });
const say = (focus, explode, y, text, ...refs) => ({ focus, explode, view: { x: 0.35, y, z: 0 }, text, refs });

export const LESSONS = {
  alevel: [
    say('crust', 0, 0.6, 'Start at the surface. Normal ocean crust is about 7 km thick; continental crust averages about 40 km.', 'white1992', 'mooney1998'),
    say('moho', 0.5, 0.9, 'At the Moho, seismic waves speed up as they pass from crust into denser mantle rock.', 'prem1981'),
    say('lithosphere', 0.6, 1.0, 'The crust and the top of the mantle together make the tectonic plates. This model takes their base from PREM’s seismic lid, at 80 km.', 'prem1981', 'garnero2016'),
    say('mantle', 0.85, 1.2, 'Shear waves pass through the mantle, so it responds as a solid. Over geological time it convects, heated by the core below and by radioactive decay.', 'prem1981', 'garnero2016'),
    say('outer-core', 1, 1.5, 'At about 2,890 km, shear waves stop. The outer core is liquid iron, and its movement makes the magnetic field.', 'prem1981', 'song1996'),
    say('inner-core', 1, 1.8, 'At the centre is a solid iron ball about 1,220 km in radius, still growing as the liquid around it freezes.', 'song1996'),
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
