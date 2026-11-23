// Guided lessons, one per level. A step: { focus: partId, explode: 0..1, view: { x, y, z } radians, text, refs, where? }.
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
    say('oceanic-crust', 0, 0.6, 'New ocean crust is made at mid-ocean ridges: rising mantle partly melts as the pressure drops. Normal crust is 7.1 ± 0.8 km thick; over plume-heated mantle it reaches 10.3 ± 1.7 km.',
      'White et al. (1992), pp. 19,683–19,684', 'white1992'),
    say('lab', 0.5, 0.9, 'At 80 km PREM’s shear quality factor drops from 600 to 80, so shear waves are damped more strongly below. This model uses that lid base as a proxy for the base of the plates.',
      'PREM, Table I and footnote, pp. 300, 308', 'prem1981'),
    say('transition-zone', 0.85, 1.2, 'Between 410 and 660 km, olivine gives way to its high-pressure forms wadsleyite and ringwoodite, which can hold up to about 2.5% water by weight.',
      'Pearson et al. (2014), p. 221', 'pearson2014'),
    say('d660', 0.9, 1.35, 'Sinking plates often stall here. Around the Pacific, most imaged slabs were stagnant above 660 km or trapped at 660–1,000 km.',
      'Fukao & Obayashi (2013), p. 5920', 'fukao2013'),
    say('cmb', 1, 1.5, 'At 2,891 km density jumps from 5.57 to 9.90 g/cm^3^ and shear waves stop. An estimated 5–13 TW of heat crosses from the core into the mantle.',
      'PREM, Table I, p. 308; Davies & Davies (2010), §4.8, p. 22', 'prem1981', 'davies2010'),
    say('icb', 1, 1.8, 'Shear waves return at 3.50 km/s: the inner core is solid, and it grows as the liquid outer core freezes onto it.',
      'PREM, Table I, p. 308; Song & Richards (1996), p. 221', 'prem1981', 'song1996'),
  ],
  postgrad: [
    say('transition-zone', 0.6, 0.45, 'How do we know the transition zone holds water? A ringwoodite inclusion in a Brazilian diamond carries at least 1.4–1.5 wt% H~2~O, implying about 1 wt% where it came from.',
      'Pearson et al. (2014), pp. 221–223', 'pearson2014'),
    say('d660', 0.6, 0.6, 'More than 10 million P-wave travel times show slabs at four stages: stalled above 660 km, penetrating, trapped at 660–1,000 km, or sinking deeper.',
      'Fukao & Obayashi (2013), p. 5920', 'fukao2013'),
    say('lower-mantle', 0.8, 0.75, 'Broad conduits of slow shear waves rise from near the core. A thin plume would need an implausible 1,500–2,000 °C excess to match them.',
      'French & Romanowicz (2015), pp. 95–97', 'french2015'),
    say('d-double-prime', 0.9, 0.9, 'The lowermost ~200 km is complex: intermittent 1.5–3% speed jumps, laterally varying anisotropy and patches where speeds fall by more than 10%.',
      'Lay et al. (1998), pp. 461–462', 'lay1998'),
    say('llsvp', 0.9, 1.05, 'Two provinces of slow shear waves cover about 30% of the core–mantle boundary. One interpretation is dense thermochemical piles.',
      'Garnero et al. (2016), pp. 481, 485', 'garnero2016'),
    say('cmb', 1, 1.3, 'P-wave speed drops from 13.717 to 8.065 km/s into the liquid core. The thermal boundary layer above has an estimated contrast of 1,000 ± 500 K.',
      'PREM, Table I, p. 308; Lay et al. (1998), p. 461', 'prem1981', 'lay1998'),
    say('inner-core', 1, 1.6, 'Does the inner core spin faster than the mantle? Estimates have fallen from about 1° per year to near zero, and Yang & Song propose a seven-decade oscillation.',
      'Song & Richards (1996), pp. 222–223; Deuss (2014), p. 115; Yang & Song (2023), pp. 182, 184–185', 'song1996', 'deuss2014', 'yang2023'),
    say('innermost-inner-core', 1, 1.8, 'A central region about 300 km in radius with different anisotropy has been proposed. Deuss finds the evidence not compelling.',
      'Ishii & Dziewoński (2002), p. 14026; Deuss (2014), p. 111', 'ishii2002', 'deuss2014'),
  ],
};
