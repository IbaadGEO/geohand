// Physical state of each part, shown by how its dots move. Each state rests on cited values already in the content.
// motion codes (read by the scene shader): 1 still solid, 2 slow creep, 3 convection shown as slabs and plumes, 4 liquid flow, 5 boundary pulse
export const STATES = {
  plate: { motion: 1, label: 'Solid. Moves with its tectonic plate', where: 'Garnero et al. (2016), p. 481', refs: ['garnero2016'] },
  creep: { motion: 2, label: 'Solid: shear waves pass, but more slowly and more damped than in the plate above', where: 'PREM, Table I and footnote, p. 308', refs: ['prem1981'] },
  convect: { motion: 3, label: 'Solid, yet convects slowly over geological time. Blue sheets: old plates sinking; most stall above 660 km or are trapped at 660–1,000 km, some sink deeper. Pale columns: plumes of hot rock rising from near the core, imaged up to about 1,000 km depth', where: 'PREM, Table I, p. 308; Garnero et al. (2016), p. 481; Fukao & Obayashi (2013), pp. 5920, 5932; French & Romanowicz (2015), pp. 95–96', refs: ['prem1981', 'garnero2016', 'fukao2013', 'french2015'], shown: 'The cut face shows this as a schematic; where the slabs and plumes sit is illustrative' },
  liquid: { motion: 4, label: 'Liquid: shear-wave speed is 0, so it flows', where: 'PREM, Table I, p. 308', refs: ['prem1981'] },
  solid: { motion: 1, label: 'Solid: shear waves pass through it', where: 'PREM, Table I, p. 308', refs: ['prem1981'] },
  gradient: { motion: 5, label: 'A gradual boundary: wave speeds rise over more than 10 km, and it is not seen everywhere', where: 'Frost (2008), p. 175', refs: ['frost2008'] },
  measured: { motion: 5, label: 'A boundary measured with converted seismic waves: deeper under older ocean, deeper still under old continents', where: 'Fischer et al. (2010), pp. 553, 565', refs: ['fischer2010'] },
  boundary: { motion: 5, label: 'A boundary where seismic wave speeds change', where: 'PREM, Table I, p. 308', refs: ['prem1981'] },
};

const BY_ID = {
  crust: 'plate', 'continental-crust': 'plate', 'oceanic-crust': 'plate', lithosphere: 'plate', 'lithospheric-mantle': 'plate',
  asthenosphere: 'creep',
  mantle: 'convect', 'upper-mantle': 'convect', 'transition-zone': 'convect', 'lower-mantle': 'convect', 'd-double-prime': 'convect', 'post-perovskite': 'convect', llsvp: 'convect',
  'outer-core': 'liquid',
  'inner-core': 'solid', 'innermost-inner-core': 'solid',
  d520: 'gradient', 'lab-measured': 'measured',
};

/** Name of a part's state ('plate', 'creep', ...), or null. */
export const stateKey = (id, kind) => BY_ID[id] || (kind === 'boundary' ? 'boundary' : null);

/** State of a part (by id and kind), or null if none is assigned. */
export function stateOf(id, kind) {
  return STATES[stateKey(id, kind)] || null;
}
