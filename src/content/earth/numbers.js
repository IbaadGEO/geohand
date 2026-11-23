// Key numbers per part and level, each with its source and where in it. Owner checks every value against the paper.
// PREM values are computed from the polynomials in Table I (Dziewonski & Anderson 1981, p. 308) at the stated depths.
const PREM = (where = 'Table I, p. 308') => ({ refs: ['prem1981'], where });
const AK = { refs: ['ak1351995'], where: 'Table 3, pp. 122–123' };
const BOTH = { refs: ['prem1981', 'ak1351995'], where: 'PREM Table I, p. 308; ak135 Table 3, pp. 122–123' };
const HEAT = (where) => ({ refs: ['davies2010'], where }); // Davies & Davies (2010)
const CM = (where = 'Abstract, p. 9761') => ({ refs: ['christensen1995'], where }); // Christensen & Mooney (1995)
const WH = (where = 'Abstract, p. 19,683') => ({ refs: ['white1992'], where }); // White, McKenzie & O'Nions (1992)
const CR = (where) => ({ refs: ['mooney1998'], where }); // CRUST 5.1, Mooney, Laske & Masters (1998)
const RG = (where = 'Table 11, p. 53') => ({ refs: ['rudnick2003'], where }); // Rudnick & Gao (2003)
const MS = (where = 'Table 4, p. 237') => ({ refs: ['mcdonough1995'], where }); // McDonough & Sun (1995), pyrolite model
const PE = (where = 'Abstract, p. 221') => ({ refs: ['pearson2014'], where }); // Pearson et al. (2014)
const FO = (where = 'Abstract, p. 5920') => ({ refs: ['fukao2013'], where }); // Fukao & Obayashi (2013)
const FR = (where) => ({ refs: ['french2015'], where }); // French & Romanowicz (2015)
const GA = (where) => ({ refs: ['garnero2016'], where }); // Garnero, McNamara & Shim (2016)
const LA = (where) => ({ refs: ['lay1998'], where }); // Lay, Williams & Garnero (1998)
const SR = (where = 'p. 221') => ({ refs: ['song1996'], where }); // Song & Richards (1996)
const YS = (where = 'Abstract, p. 182') => ({ refs: ['yang2023'], where }); // Yang & Song (2023)
const ID = (where = 'Abstract, p. 14026') => ({ refs: ['ishii2002'], where }); // Ishii & Dziewoński (2002)
const DE = (where = 'Abstract, p. 103') => ({ refs: ['deuss2014'], where }); // Deuss (2014), review

const FT = (where) => ({ refs: ['frost2008'], where }); // Frost (2008)
const FI = (where) => ({ refs: ['fischer2010'], where }); // Fischer et al. (2010)
const MU = (where) => ({ refs: ['murakami2004'], where }); // Murakami et al. (2004)
const HI = (where) => ({ refs: ['hirose2013'], where }); // Hirose, Labrosse & Hernlund (2013)
const AN = (where) => ({ refs: ['anzellini2013'], where }); // Anzellini et al. (2013)

const n = (label, value, src) => ({ label, value, ...src });

const heat = {
  alevel: [n('Heat flowing out of the whole Earth', 'about 47 TW', HEAT('Abstract, p. 5'))],
  undergrad: [
    n('Heat flowing out of the whole Earth', '47 ± 2 TW', HEAT('Abstract, p. 5')),
    n('Mean heat flow, continents', '70.9 mW m^-2^', HEAT('Table 7, p. 20')),
  ],
  postgrad: [
    n('Heat flowing out of the whole Earth', '47 ± 2 TW; preferred estimate 46.7 TW, from 38,347 measurements with modelled corrections for young ocean floor and hotspots', HEAT('Abstract, p. 5; Table 7, p. 20')),
    n('Section 3 components: continents / ocean floor older than 66.5 Ma', '13.8 TW at 73 mW m^-2^ / 7.8 TW at 66 mW m^-2^', HEAT('Section 3, p. 16')),
    n('Ocean floor younger than 66.5 Ma', '23.1 TW at 128 mW m^-2^: about half of all heat loss', HEAT('Section 3, p. 16')),
  ],
};

export const NUMBERS = {
  alevel: {
    crust: [
      n('Normal oceanic igneous crust', 'about 7 km thick', WH()),
      n('Continental crust in CRUST 5.1', 'about 40 km thick on average, reaching about 70 km under Tibet', CR('Plate 1 caption, p. 733')),
      n('Silica (SiO~2~) in continental crust', 'about 61% by weight (bulk composition, as oxides)', RG()),
      n('Density', '2.6–2.9 g/cm^3^', PREM()),
      ...heat.alevel,
    ],
    lithosphere: [n('PREM seismic lid base used in the drawing', '80 km deep', PREM()), n('Density below the crust', 'about 3.4 g/cm^3^', PREM())],
    asthenosphere: [n('PREM low-velocity zone used in the drawing', '80–220 km deep', PREM())],
    mantle: [
      n('Depth', 'from the Moho (24.4 km in PREM, 35 km in ak135) to about 2,890 km', BOTH),
      n('Density', '3.4 at the top to 5.6 g/cm^3^ at the bottom', PREM()),
      n('Pyrolite model bulk chemistry (wt% as oxides)', 'about 45% silica (SiO~2~) and 38% magnesium oxide (MgO) by weight', MS()),
      n('Plumes', 'broad columns of slow seismic waves rooted near the base of the mantle beneath Hawaii, Iceland and Samoa, interpreted as plumes of hot rock', FR('Abstract, p. 95')),
    ],
    'outer-core': [n('Made of', 'iron and nickel, with about 10% of lighter elements such as oxygen, sulfur or silicon', MS('Abstract, p. 223')), n('Depth', 'about 2,890–5,150 km', PREM()), n('Shear (S) wave speed', '0: S waves cannot pass, so it is liquid', PREM()), n('Density', '9.9–12.2 g/cm^3^', PREM()), n('Temperature at the top', 'about 4,000 K', HI('p. 658'))],
    'inner-core': [n('Depth', 'about 5,150 km to the centre (6,371 km)', PREM()), n('Shear (S) wave speed', 'about 3.5 km/s just inside the inner-core boundary: S waves pass, so it is solid', PREM()), n('Density at the centre', 'about 13 g/cm^3^', PREM()), n('Spin', 'Song & Richards inferred faster rotation relative to the mantle. Yang & Song inferred that relative rotation nearly stopped around 2009 and may have reversed slightly in the years they studied.', { refs: ['song1996', 'yang2023'], where: 'Song & Richards p. 221; Yang & Song pp. 182, 184–185' }), n('Temperature at the centre', 'about 5,000–6,000 K', HI('p. 658'))],
    moho: [n('Depth', 'about 7 km below the top of normal oceanic igneous crust; mean 38 km below sea level under continents (CRUST 5.1)', { refs: ['white1992', 'mooney1998'], where: 'White et al. pp. 19,683, 19,694; CRUST 5.1 §8, p. 735' })],
    cmb: [n('Depth', 'about 2,890 km', BOTH), n('Density jump', '5.6 → 9.9 g/cm^3^', PREM())],
  },
  undergrad: {
    'continental-crust': [
      n('Average thickness', '38 km (CRUST 5.1); 41.1 km (Christensen & Mooney)', { refs: ['mooney1998', 'christensen1995'], where: 'CRUST 5.1 p. 744; Christensen & Mooney abstract, p. 9761' }),
      n('Range in CRUST 5.1', '20.5 km (stretched crust) to 70 km (Tibetan Plateau)', CR('Plate 1 caption, p. 733')),
      n('Average P-wave speed', '6.45 km/s', CM()),
      n('Silica (SiO~2~, wt%): upper / lower / whole crust', '66.6 / 53.4 / 60.6', RG()),
      ...heat.undergrad,
    ],
    'oceanic-crust': [
      n('Thickness (igneous crust)', '7.1 ± 0.8 km', WH()),
      n('Layers', 'layer 2 (about 2.1 km), read as basaltic lavas and dykes, over layer 3 (about 5.0 km), probably mainly gabbro', WH('p. 19,683; Table 8, p. 19,698')),
      n('Where spreading centres cross plume-heated mantle', '10.3 ± 1.7 km', WH()),
    ],
    'lithospheric-mantle': [n('Depth (PREM lid)', '24.4–80 km', PREM()), n('Density', '3.38 g/cm^3^', PREM()), n('S-wave speed (effective isotropic)', '4.49–4.47 km/s', PREM('Table I and footnote, p. 308'))],
    asthenosphere: [
      n('Depth (PREM low-velocity zone)', '80–220 km', PREM()),
      n('S-wave speed (effective isotropic)', 'falls with depth, 4.47 at 80 km → 4.42 km/s just above 220 km', PREM('Table I and footnote, p. 308')),
      n('Shear quality factor Q~μ~', '80, against 600 in the lid above: it damps waves more', PREM()),
    ],
    'upper-mantle': [
      n('Depth', '220 km (base of PREM low-velocity zone) to 410 km (ak135)', BOTH),
      n('Density (PREM, 220–400 km)', '3.44–3.54 g/cm^3^', PREM()),
      n('Main mineral', 'olivine (Mg~2~SiO~4~), down to about 400 km', PE('p. 221')),
      n('Mantle composition (pyrolite model, wt% as oxides)', 'SiO~2~ 45.0, MgO 37.8, FeO 8.05, Al~2~O~3~ 4.45, CaO 3.55', MS()),
    ],
    'transition-zone': [
      n('Depth', '410–660 km (ak135); 400–670 km (PREM)', BOTH),
      n('Density', '3.72–3.99 g/cm^3^', PREM()),
      n('Main minerals', 'wadsleyite and ringwoodite, high-pressure forms of olivine thought to dominate the zone', PE()),
      n('Water', 'wadsleyite and ringwoodite can hold up to about 2.5% water by weight; the Brazilian ringwoodite inclusion implies about 1 wt% bulk water in the transition-zone mantle sampled locally', PE('pp. 221, 223')), n('Mineral changes (pyrolite)', 'olivine → wadsleyite at ~14 GPa (410 km); wadsleyite → ringwoodite at ~17.5 GPa (520 km); ringwoodite → perovskite-structured (Mg,Fe)SiO~3~ + ferropericlase at ~24 GPa (660 km)', FT('p. 172'))],
    'lower-mantle': [
      n('Depth', '660 km (ak135) to 2,891 km (PREM)', BOTH),
      n('Density (PREM, 670–2,891 km)', '4.38–5.57 g/cm^3^', PREM()),
      n('P-wave speed (PREM, 670–2,891 km)', '10.75–13.72 km/s', PREM()),
      n('Sinking slabs', 'in a survey around the Pacific, most imaged slabs were stagnant above the 660 or trapped at 660–1,000 km', FO()),
      n('Plumes', 'broad slow-wave conduits rise from near the core–mantle boundary to about 1,000 km depth; the one under Hawaii is about 800–1,000 km wide', FR('pp. 95–96')),
    ],
    'outer-core': [n('Make-up', 'iron–nickel alloy with 10 ± 5% of a light element (O, S or Si)', MS('Abstract, p. 223')), n('Whole core (outer and inner), share of Earth’s mass', 'about 32.5%', MS('Section 6, p. 244')), n('Depth', '2,891–5,149.5 km', PREM()), n('S-wave speed', '0 km/s (liquid)', PREM()), n('P-wave speed', '8.06–10.36 km/s', PREM()), n('Density', '9.90–12.17 g/cm^3^', PREM()), n('Temperature', 'about 4,000 K at the top (136 GPa)', HI('p. 658'))],
    'inner-core': [
      n('Depth', '5,149.5–6,371 km', PREM()),
      n('S-wave speed', '3.50–3.67 km/s (solid)', PREM()),
      n('Density', '12.76–13.09 g/cm^3^', PREM()),
      n('Size', 'radius about 1,220 km; less than 1% of Earth’s volume', { refs: ['song1996', 'ishii2002'], where: 'Song & Richards p. 221; Ishii & Dziewoński p. 14026' }),
      n('Rotation relative to the mantle', 'estimated in 1996 at about 1° per year faster; around 2009 the difference nearly stopped and may have reversed slightly, which Yang & Song read as part of a proposed seven-decade oscillation', { refs: ['song1996', 'yang2023'], where: 'Song & Richards p. 221; Yang & Song pp. 182, 184–185' }),
      n('Structure', 'seismic waves travel faster pole to pole than across the equator, and the western half differs from the eastern', DE()),
    ],
    moho: [
      n('Mean depth below sea level (CRUST 5.1)', '38 km under continents; 12.6 km under oceans', CR('Section 8, p. 735')),
      n('P-wave speed just below it (Pn)', '8.09 km/s on average under continents', CM()),
      n('P-wave speed jump in PREM', '6.80 → 8.11 km/s', PREM()),
    ],
    lab: [n('PREM seismic lid base used in the drawing', '80 km', PREM()), n('Real depth under oceans', 'deepens with plate age: about 55 km at 25 Ma and 76 km at 49 Ma (Philippine Sea Plate), 82 km at 129 Ma (Pacific)', FI('p. 565')), n('Under old continents (cratons)', 'depleted mantle reaches roughly 200 km', FI('p. 553'))],
    d410: [n('Depth', '410 km (ak135); 400 km (PREM)', BOTH), n('Density jump', '3.54 → 3.72 g/cm^3^', PREM()), n('Mineral change', 'olivine → wadsleyite, at about 14 GPa', FT('p. 172'))],
    d660: [n('Depth', '660 km (ak135); 670 km (PREM)', BOTH), n('Density jump', '3.99 → 4.38 g/cm^3^', PREM()), n('Sinking slabs', 'in a survey around the Pacific, most imaged slabs were stagnant above it or trapped just below it, at 660–1,000 km', FO()), n('Mineral change', 'ringwoodite → perovskite-structured (Mg,Fe)SiO~3~ + ferropericlase, at about 24 GPa: the start of the lower mantle', FT('p. 172'))],
    cmb: [
      n('Depth', '2,891 km (PREM); 2,891.5 km (ak135)', BOTH),
      n('Density jump', '5.57 → 9.90 g/cm^3^', PREM()),
      n('S-wave speed', '7.26 → 0 km/s', PREM()),
      n('Estimated temperature contrast across the thermal boundary layer at the base of the mantle', 'about 1,000 ± 500 K', LA('p. 461')),
      n('Above it', 'two continent-sized low-velocity zones cover about 30% of its area', GA('p. 481')), n('Temperature at the boundary', 'about 4,050 ± 500 K', AN('p. 466'))],
    icb: [n('Depth', '5,149.5 km (PREM); 5,153.5 km (ak135)', BOTH), n('S-wave speed', '0 → 3.50 km/s', PREM()), n('Density jump', '12.17 → 12.76 g/cm^3^', PREM()), n('Temperature', 'perhaps 5,200–5,700 K', HI('Summary points, p. 682'))],
  },
  postgrad: {
    'continental-crust': [
      n('Weighted average thickness', '41.1 km; extended crust 30.5 km, orogens 46.3 km', CM()),
      n('CRUST 5.1 averages', 'shield 40.8, platform 39.0, orogen 42.7, extended 30.5 km', CR('Figure 3a, p. 730')),
      n('Middle and lower crust (≈40 km crust)', 'middle 12–23 km, lower 23 km to the Moho', RG('Section 3.01.3.1, pp. 20–21')),
      n('Christensen & Mooney model means: density, SiO~2~', '2,830 kg m^-3^, 61.8 wt%', CM()),
      n('Upper / middle / lower crust SiO~2~, MgO, K~2~O (wt.%)', '66.6, 2.48, 2.80 / 63.5, 3.59, 2.30 / 53.4, 7.24, 0.61', RG()),
      n('ak135 crust', '0–20 km and 20–35 km layers; Moho at 35 km', AK),
      ...heat.postgrad,
    ],
    'oceanic-crust': [
      n('Igneous thickness, normal crust', '7.1 ± 0.8 km (bounds 5.0–8.5 km)', WH()),
      n('Seismic layer 2 / layer 3', '2.11 ± 0.55 km at 2.5–6.6 km/s / 4.97 ± 0.90 km at 6.6–7.6 km/s; layer 3 is probably mainly gabbro', WH('p. 19,683; Table 8, p. 19,698')),
      n('From rare earth element inversions', '8.3 ± 1.5 km', WH()),
      n('Spreading centres over plume-heated mantle / aseismic ridges above plume centres', '10.3 ± 1.7 km / about 20 km', WH()),
      n('CRUST 5.1 standard ocean', '6.5 km in three layers, v~P~ 5.0, 6.6, 7.1 km/s', CR('Section 6, p. 734')),
    ],
    'lithospheric-mantle': [n('PREM lid', '24.4–80 km, transversely isotropic (vertical symmetry axis), Q~μ~ = 600', PREM('Table I and footnote, p. 308'))],
    asthenosphere: [
      n('PREM low-velocity zone', '80–220 km, Q~μ~ = 80', PREM()),
      n('Isotropic-equivalent v~S~', '4.471 km/s at 80 km → 4.419 km/s at 220 km', PREM('Table I footnote, p. 308')),
    ],
    'upper-mantle': [
      n('Depth', '220–400 km (PREM); 210–410 km region in ak135', BOTH),
      n('PREM ρ, v~P~, v~S~ just below 220 km', '3.436 g/cm^3^, 8.559, 4.644 km/s', PREM()),
      n('Pyrolite silicate Earth (wt% as oxides)', 'SiO~2~ 45.0, MgO 37.8, FeO 8.05, Al~2~O~3~ 4.45, CaO 3.55, Na~2~O 0.36', MS()),
      n('Mg# = 100 Mg/(Mg + Fe)', '89.3', MS()),
    ],
    'transition-zone': [
      n('Depth', '400–670 km (PREM); 410–660 km (ak135)', BOTH),
      n('PREM internal boundary', '600 km (radius 5,771 km)', PREM()),
      n('Ringwoodite in Juína diamond JUc29', 'FTIR gives a minimum of 1.4–1.5 wt% H~2~O, with large uncertainty; to the authors’ knowledge, the first terrestrial find of a high-pressure olivine polymorph', PE('Abstract, p. 221; p. 222')),
      n('Water in the zone sampled', 'about 1.0 wt%, against a capacity of about 2.5 wt% in wadsleyite and ringwoodite', PE('pp. 221, 223')), n('Transformations and widths', 'olivine → wadsleyite (~14 GPa, 410 km, ~7 km wide when dry); wadsleyite → ringwoodite (~17.5 GPa, 520 km, ~25 km); ringwoodite → perovskite + ferropericlase (~24 GPa, 660 km, <4 km), plus garnet → perovskite over 30–40 km', FT('pp. 172, 175')), n('Water in wadsleyite', 'can hold the equivalent of 3 wt% H~2~O', FT('p. 175'))],
    'lower-mantle': [
      n('PREM ρ at 670 km / 2,741 km', '4.381 / 5.491 g/cm^3^', PREM()),
      n('PREM v~S~ at 670 km / 2,741 km', '5.945 / 7.266 km/s', PREM()),
      n('Slab stages (P-wave tomography, >10 million travel times)', 'I stagnant above the 660; II penetrating; III trapped at 660–1,000 km; IV sinking deeper. Most slab images in the circum-Pacific survey were at I or III', FO()),
      n('Plume conduits (SEMUCB-WM1)', 'v~S~ reduced by more than 1.5–2%; near-vertical from near the CMB to about 1,000 km depth; about 800–1,000 km wide under Hawaii', FR('pp. 95–96')),
      n('Plume temperature excess', '400–500 °C plausible for broad conduits; in the authors’ resolution test, a tail about 200 km wide would need an implausible 1,500–2,000 °C to match the imaged anomaly', FR('pp. 96–97')),
    ],
    'd-double-prime': [
      n('PREM basal region', '2,741–2,891 km (radius 3,480–3,630 km), its own velocity polynomial', PREM()),
      n('Plume roots', 'patches 500–800 km across of strongly reduced v~S~; under Hawaii, Iceland and Samoa they coincide in location with known ultralow-velocity zones', FR('Abstract, p. 95; p. 96')),
      n('Seismic definition', 'lowermost ~200 km; intermittent 1.5–3% P and S jumps 150–300 km above the CMB; laterally varying S-wave anisotropy', LA('p. 461')),
      n('Ultralow-velocity zones', '5–40 km thick, P and S speeds >10% low; beneath the central Pacific, Alaska, Iceland and Africa', LA('p. 462')), n('Post-perovskite', 'MgSiO~3~ perovskite transforms above 125 GPa and 2,500 K (~2,700 km), becoming 1.0–1.2% denser', MU('Abstract, p. 855')), n('Link to the D″ discontinuity', 'seen ~200–300 km above the CMB (119–125 GPa) with a ~3% velocity increase; the transition occurs at matching depths and may explain it', MU('p. 857')), n('Anisotropy', 'platy post-perovskite aligned by flow may cause V~SH~ > V~SV~, seen only below the discontinuity', MU('p. 858'))],
    llsvp: [
      n('What they are', 'two nearly antipodal provinces of low v~S~: one beneath the Pacific, one beneath the Atlantic and western and southern Africa', GA('p. 481')),
      n('Size', 'about 30% of the core–mantle boundary area; reduced velocities up to 1,200 km above the CMB in places', GA('p. 481')),
      n('Shape', 'Pacific roughly round; African elongated north–south, stretched eastward in the south', GA('p. 481')),
      n('Possible nature', 'one interpretation is thermochemical piles, denser than the surrounding mantle; in geodynamic models an intrinsic density excess of up to a few per cent forms piles of similar size', GA('Abstract, p. 481; p. 485')),
      n('ULVZs', 'commonly 5–20 km thick, within and near LLSVP margins', GA('p. 482')),
    ],
    'outer-core': [n('Light element', '5–15% (about 10 ± 5%) of O, S, Si or a mix; about 86% of Earth’s Fe is in the core', MS('Abstract, p. 223')), n('PREM ρ, v~P~ at top', '9.903 g/cm^3^, 8.065 km/s', PREM()), n('PREM ρ, v~P~ at bottom', '12.166 g/cm^3^, 10.356 km/s', PREM()), n('Light elements (Hirose et al.)', 'density deficit 5–10 wt% relative to pure iron; may be ~6 wt% Si, ~3 wt% O and 1–2 wt% S', HI('p. 658; Summary points, p. 682')), n('Layering', 'stratification at the bottom of the outer core is well established', HI('Summary points, p. 682'))],
    'inner-core': [
      n('PREM ρ, v~P~, v~S~ at top', '12.764 g/cm^3^, 11.028, 3.504 km/s', PREM()),
      n('PREM ρ at centre', '13.088 g/cm^3^', PREM()),
      n('Super-rotation (Song & Richards)', 'BC−DF travel-time residuals (relative to PREM) on South Sandwich Islands–Alaska (COL) paths rose about 0.3 s over 1967–95; best fit 1.1° per year faster than the mantle', SR('pp. 222–223')),
      n('Recent change (Yang & Song)', 'the authors infer that relative rotation nearly stopped in late 2009 (95% CI 2009.0–2011.0) and may have reversed slightly in the interval they studied, through 2021. They propose an approximately seven-decade oscillation, with another turning point in the early 1970s and a similar timescale to changes in length of day and the magnetic field', YS('pp. 182, 184–185')),
      n('Anisotropy above the proposed central region', 'in the Ishii & Dziewoński model, the slowest P-wave direction is equatorial (east–west)', ID()),
      n('Anisotropy (Deuss review)', 'polar direction fast, equatorial slow; some body-wave models give 3–4% in the deeper inner core. The review describes an isotropic upper layer about 60–80 km thick', DE('Abstract, p. 103; p. 108')),
      n('Hemispheres', 'west: up to 5% anisotropy below the isotropic layer and about 1.5% slower in the top 100 km; east: less than 0.7% anisotropy and more strongly attenuating', DE('Abstract, p. 103; pp. 112–113')),
      n('Rotation estimates over time', 'published body-wave estimates declined from 1–3° per year in 1996 to under 0.5° per year in some later studies. Other studies found no super-rotation. Assuming hemispheric differences were frozen in during growth, Waszek et al. estimated 0.1–1° per million years', DE('p. 115')), n('Crystal structure', 'likely an iron alloy with hexagonal close-packed (hcp) structure', HI('Summary points, p. 682'))],
    'innermost-inner-core': [
      n('Proposed radius', 'about 300 km (Ishii & Dziewoński 2002)', ID()),
      n('Anisotropy in their model', 'slowest direction about 45° from east–west, against east–west in the inner core above', ID()),
      n('Meaning', 'may be fossil evidence of an early stage of inner-core growth', ID()),
      n('Debate', 'Deuss (2014) found the evidence unconvincing. Two studies in the review found no reflection from a possible upper boundary. Another study suggested the region could be an artefact of averaging the two hemispheres', DE('p. 111')),
    ],
    moho: [
      n('Mean depth below sea level (CRUST 5.1)', '21.8 km global, 38.0 km continents, 12.6 km oceans (with 4.0 km of water)', CR('Section 8, p. 735')),
      n('Reference models', '24.4 km (PREM, global average with a 3 km ocean layer); 35 km (ak135)', BOTH),
      n('Pn speed', '8.09 km/s', CM()),
    ],
    lab: [n('PREM seismic lid base used in the drawing', '80 km: Q~μ~ falls from 600 to 80', PREM()), n('Oceanic LAB and plate age', '55 km at 25 Ma, 76 ± 1.8 km at 49 Ma, 82 ± 4.4 km at 129 Ma; fits a cooling plate with an asymptotic thickness of 104 km', FI('p. 565')), n('Under ocean islands', 'reported depths range from 40 to 140 km, much of it not correlated with plate age', FI('p. 565')), n('What makes it a boundary', 'oceanic lithosphere fits a dry, depleted layer over a hydrated, fertile asthenosphere; beneath cratons the asthenosphere is deeper', FI('Abstract, p. 551'))],
    d410: [n('Depth', '400 km (PREM); 410 km (ak135)', BOTH), n('PREM v~P~ jump', '8.905 → 9.134 km/s', PREM()), n('Average depth and temperature', 'actually 418 km on average, implying 1,480 °C with ±100 °C of global variation', FT('p. 174')), n('Above subducting slabs', 'raised by over 50 km in some subduction zones, consistent with mantle over 600 °C colder', FT('p. 175')), n('Sharpness', 'a ~7 km gradient ending in a sharp jump (1 Hz reflections)', FT('p. 175'))],
    d660: [n('Depth', '670 km (PREM); 660 km (ak135)', BOTH), n('PREM v~P~ jump', '10.266 → 10.751 km/s', PREM()), n('Sharpness', '≤2 km thick in 1 Hz reflections; ringwoodite breaks down over <4 km, garnet over 30–40 km', FT('p. 175'))],
    cmb: [
      n('Depth', '2,891.0 km (PREM); 2,891.5 km (ak135)', BOTH),
      n('PREM v~P~ drop', '13.717 → 8.065 km/s', PREM()),
      n('Thermal boundary layer at the base of the mantle', 'estimated temperature contrast 1,000 ± 500 K; ambient about 3,000 K; plumes may carry 10–15% of surface heat flux', LA('p. 461')), n('Temperature (from iron melting)', 'about 4,050 ± 500 K, implying a ~1,400 K boundary layer at the base of the mantle and ~10 TW of heat flow', AN('p. 466'))],
    icb: [n('Depth', '5,149.5 km (PREM); 5,153.5 km (ak135)', BOTH), n('PREM v~P~ jump', '10.356 → 11.028 km/s', PREM()), n('Pure iron melts at ICB pressure (330 GPa)', '6,230 ± 500 K', AN('Abstract, p. 464')), n('ICB temperature', 'perhaps 5,200–5,700 K; lower than pure iron because the alloy melts lower (expected ~700 K lower)', { refs: ['hirose2013', 'anzellini2013'], where: 'Hirose et al. Summary points, p. 682; Anzellini et al. p. 464' })],
  },
};
