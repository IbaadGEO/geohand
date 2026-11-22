// Key numbers per part and level, each with its source and where in it. Owner checks every value against the paper.
// PREM values are computed from the polynomials in Table I (Dziewonski & Anderson 1981, p. 308) at the stated depths.
const PREM = (where = 'Table I, p. 308') => ({ refs: ['prem1981'], where });
const AK = { refs: ['ak1351995'], where: 'Table 3, pp. 122–123' };
const BOTH = { refs: ['prem1981', 'ak1351995'], where: 'PREM Table I, p. 308; ak135 Table 3, pp. 122–123' };
const HEAT = (where) => ({ refs: ['davies2010'], where });
const CM = (where = 'Abstract, p. 9761') => ({ refs: ['christensen1995'], where }); // Christensen & Mooney (1995)
const WH = (where = 'Abstract, p. 19,683') => ({ refs: ['white1992'], where }); // White, McKenzie & O'Nions (1992)
const CR = (where) => ({ refs: ['mooney1998'], where }); // CRUST 5.1, Mooney, Laske & Masters (1998)
const RG = (where = 'Table 11, p. 53') => ({ refs: ['rudnick2003'], where }); // Rudnick & Gao (2003)

const n = (label, value, src) => ({ label, value, ...src });

const heat = {
  alevel: [n('Heat flowing out of the whole Earth', 'about 47 TW', HEAT('Abstract, p. 5'))],
  undergrad: [
    n('Heat flowing out of the whole Earth', '47 ± 2 TW', HEAT('Abstract, p. 5')),
    n('Average heat flow, continents', '73 mW m^-2^', HEAT('Section 3, p. 16')),
  ],
  postgrad: [
    n('Heat flowing out of the whole Earth', '47 ± 2 TW (46.7 TW from 38,347 measurements)', HEAT('Abstract, p. 5; Table 3 notes, p. 15')),
    n('Continents / older oceans', '13.8 TW at 73 mW m^-2^ / 7.8 TW at 66 mW m^-2^', HEAT('Section 3, p. 16')),
    n('Young ocean floor', '23.1 TW at 128 mW m^-2^: about half of all heat loss', HEAT('Section 3, p. 16')),
  ],
};

export const NUMBERS = {
  alevel: {
    crust: [
      n('Thickness under oceans', 'about 7 km', WH()),
      n('Thickness under continents', 'about 40 km on average, up to 70 km under Tibet', CR('Plate 1 caption, p. 733')),
      n('Silica (SiO~2~)', 'about 61% of the continental crust', RG()),
      n('Density', '2.6–2.9 g/cm^3^', PREM()),
      ...heat.alevel,
    ],
    lithosphere: [n('Base', 'about 80 km deep', PREM()), n('Density below the crust', 'about 3.4 g/cm^3^', PREM())],
    asthenosphere: [n('Depth', 'about 80–220 km', PREM())],
    mantle: [n('Depth', 'about 35–2,890 km', BOTH), n('Density', '3.4 at the top to 5.6 g/cm^3^ at the bottom', PREM())],
    'outer-core': [n('Depth', 'about 2,890–5,150 km', PREM()), n('Shear (S) wave speed', '0: S waves cannot pass, so it is liquid', PREM()), n('Density', '9.9–12.2 g/cm^3^', PREM())],
    'inner-core': [n('Depth', 'about 5,150 km to the centre (6,371 km)', PREM()), n('Shear (S) wave speed', 'about 3.5 km/s: S waves pass, so it is solid', PREM()), n('Density at the centre', 'about 13 g/cm^3^', PREM())],
    moho: [n('Depth', 'about 7 km below the sea floor; about 40 km under continents', { refs: ['white1992', 'mooney1998'], where: 'White et al. abstract, p. 19,683; CRUST 5.1 Plate 1 caption, p. 733' })],
    cmb: [n('Depth', 'about 2,890 km', BOTH), n('Density jump', '5.6 → 9.9 g/cm^3^', PREM())],
  },
  undergrad: {
    'continental-crust': [
      n('Average thickness', '38 km (CRUST 5.1); 41.1 km (Christensen & Mooney)', { refs: ['mooney1998', 'christensen1995'], where: 'CRUST 5.1 p. 744; Christensen & Mooney abstract, p. 9761' }),
      n('Range', '20.5 km (stretched crust) to 70 km (Tibetan Plateau)', CR('Plate 1 caption, p. 733')),
      n('Average P-wave speed', '6.45 km/s', CM()),
      n('Silica (SiO~2~): upper / lower / whole crust', '66.6% / 53.4% / 60.6%', RG()),
      ...heat.undergrad,
    ],
    'oceanic-crust': [
      n('Thickness (igneous crust)', '7.1 ± 0.8 km', WH()),
      n('Layers', 'basalt lavas and dykes 2.1 km over gabbro 5.0 km', WH('Table 8, p. 19,698')),
      n('Thicker near mantle plumes', '10.3 ± 1.7 km', WH()),
    ],
    'lithospheric-mantle': [n('Depth (PREM lid)', '24.4–80 km', PREM()), n('Density', '3.38 g/cm^3^', PREM()), n('S-wave speed', '4.49–4.47 km/s', PREM())],
    asthenosphere: [
      n('Depth (PREM low-velocity zone)', '80–220 km', PREM()),
      n('S-wave speed', 'falls with depth, 4.47 → 4.42 km/s', PREM()),
      n('Shear quality factor Q~μ~', '80, against 600 in the lid above: it damps waves more', PREM()),
    ],
    'upper-mantle': [n('Depth', '220 km (base of PREM low-velocity zone) to 410 km (ak135)', BOTH), n('Density', '3.44–3.54 g/cm^3^', PREM())],
    'transition-zone': [n('Depth', '410–660 km (ak135); 400–670 km (PREM)', BOTH), n('Density', '3.72–3.99 g/cm^3^', PREM())],
    'lower-mantle': [n('Depth', '660–2,891 km', BOTH), n('Density', '4.38–5.57 g/cm^3^', PREM()), n('P-wave speed', '10.75–13.72 km/s', PREM())],
    'outer-core': [n('Depth', '2,891–5,149.5 km', PREM()), n('S-wave speed', '0 km/s (liquid)', PREM()), n('P-wave speed', '8.06–10.36 km/s', PREM()), n('Density', '9.90–12.17 g/cm^3^', PREM())],
    'inner-core': [n('Depth', '5,149.5–6,371 km', PREM()), n('S-wave speed', '3.50–3.67 km/s (solid)', PREM()), n('Density', '12.76–13.09 g/cm^3^', PREM())],
    moho: [
      n('Depth', '38 km under continents, 12.6 km below sea level under oceans (CRUST 5.1)', CR('Section 8, p. 735')),
      n('P-wave speed just below it (Pn)', '8.09 km/s on average under continents', CM()),
      n('P-wave speed jump in PREM', '6.80 → 8.11 km/s', PREM()),
    ],
    lab: [n('Depth (base of PREM lid)', '80 km', PREM())],
    d410: [n('Depth', '410 km (ak135); 400 km (PREM)', BOTH), n('Density jump', '3.54 → 3.72 g/cm^3^', PREM())],
    d660: [n('Depth', '660 km (ak135); 670 km (PREM)', BOTH), n('Density jump', '3.99 → 4.38 g/cm^3^', PREM())],
    cmb: [n('Depth', '2,891 km (PREM); 2,891.5 km (ak135)', BOTH), n('Density jump', '5.57 → 9.90 g/cm^3^', PREM()), n('S-wave speed', '7.27 → 0 km/s', PREM())],
    icb: [n('Depth', '5,149.5 km (PREM); 5,153.5 km (ak135)', BOTH), n('S-wave speed', '0 → 3.50 km/s', PREM()), n('Density jump', '12.17 → 12.76 g/cm^3^', PREM())],
  },
  postgrad: {
    'continental-crust': [
      n('Weighted average thickness', '41.1 km; extended crust 30.5 km, orogens 46.3 km', CM()),
      n('CRUST 5.1 averages', 'shield 40.8, platform 39.0, orogen 42.7, extended 30.5 km', CR('Figure 3a, p. 730')),
      n('Middle and lower crust (≈40 km crust)', 'middle 12–23 km, lower 23 km to the Moho', RG('Section 3.01.3.1, pp. 20–21')),
      n('Mean density, SiO~2~', '2,830 kg m^-3^, 61.8%', CM()),
      n('Upper / middle / lower crust SiO~2~, MgO, K~2~O (wt.%)', '66.6, 2.48, 2.80 / 63.5, 3.59, 2.30 / 53.4, 7.24, 0.61', RG()),
      n('ak135 crust', '0–20 km and 20–35 km layers; Moho at 35 km', AK),
      ...heat.postgrad,
    ],
    'oceanic-crust': [
      n('Igneous thickness, normal crust', '7.1 ± 0.8 km (bounds 5.0–8.5 km)', WH()),
      n('Layer 2 / Layer 3', '2.11 ± 0.55 km at 2.5–6.6 km/s / 4.97 ± 0.90 km at 6.6–7.6 km/s', WH('Table 8, p. 19,698')),
      n('From rare earth element inversions', '8.3 ± 1.5 km', WH()),
      n('Near plumes / aseismic ridges', '10.3 ± 1.7 km / about 20 km', WH()),
      n('CRUST 5.1 standard ocean', '6.5 km in three layers, v~P~ 5.0, 6.6, 7.1 km/s', CR('Section 6, p. 734')),
    ],
    'lithospheric-mantle': [n('PREM lid', '24.4–80 km, transversely isotropic (vertical symmetry axis), Q~μ~ = 600', PREM('Table I and footnote, p. 308'))],
    asthenosphere: [
      n('PREM low-velocity zone', '80–220 km, Q~μ~ = 80', PREM()),
      n('Isotropic-equivalent v~S~', '4.471 km/s at 80 km → 4.419 km/s at 220 km', PREM('Table I footnote, p. 308')),
    ],
    'upper-mantle': [n('Depth', '220–400 km (PREM); 210–410 km region in ak135', BOTH), n('PREM ρ, v~P~, v~S~ at 220 km', '3.436 g/cm^3^, 8.559, 4.644 km/s', PREM())],
    'transition-zone': [n('Depth', '400–670 km (PREM); 410–660 km (ak135)', BOTH), n('PREM internal boundary', '600 km (radius 5,771 km)', PREM())],
    'lower-mantle': [n('PREM ρ at 670 km / 2,741 km', '4.381 / 5.491 g/cm^3^', PREM()), n('PREM v~S~ at 670 km / 2,741 km', '5.945 / 7.266 km/s', PREM())],
    'd-double-prime': [n('PREM basal region', '2,741–2,891 km (radius 3,480–3,630 km), its own velocity polynomial', PREM())],
    'outer-core': [n('PREM ρ, v~P~ at top', '9.903 g/cm^3^, 8.065 km/s', PREM()), n('PREM ρ, v~P~ at bottom', '12.166 g/cm^3^, 10.356 km/s', PREM())],
    'inner-core': [n('PREM ρ, v~P~, v~S~ at top', '12.764 g/cm^3^, 11.028, 3.504 km/s', PREM()), n('PREM ρ at centre', '13.088 g/cm^3^', PREM())],
    moho: [
      n('Mean depth below sea level (CRUST 5.1)', '21.8 km global, 38.0 km continents, 12.6 km oceans (with 4.0 km of water)', CR('Section 8, p. 735')),
      n('Reference models', '24.4 km (PREM, global average with a 3 km ocean layer); 35 km (ak135)', BOTH),
      n('Pn speed', '8.09 km/s', CM()),
    ],
    lab: [n('PREM lid base', '80 km: Q~μ~ falls from 600 to 80', PREM())],
    d410: [n('Depth', '400 km (PREM); 410 km (ak135)', BOTH), n('PREM v~P~ jump', '8.905 → 9.134 km/s', PREM())],
    d660: [n('Depth', '670 km (PREM); 660 km (ak135)', BOTH), n('PREM v~P~ jump', '10.266 → 10.751 km/s', PREM())],
    cmb: [n('Depth', '2,891.0 km (PREM); 2,891.5 km (ak135)', BOTH), n('PREM v~P~ drop', '13.717 → 8.065 km/s', PREM())],
    icb: [n('Depth', '5,149.5 km (PREM); 5,153.5 km (ak135)', BOTH), n('PREM v~P~ jump', '10.356 → 11.028 km/s', PREM())],
  },
};
