// PREM depth profile: density and isotropic wave speeds from the polynomial coefficients in
// Dziewonski & Anderson (1981), Table I, p. 308 (1 s reference period). x = r / 6371 km.
// Between 24.4 and 220 km PREM is anisotropic; there the Table I footnote's effective isotropic speeds are used.
const A = 6371;
// [inner radius km, density coeffs, vP coeffs, vS coeffs]; each coeffs list is [c0, c1, c2, c3] in powers of x
const ROWS = [
  [0, [13.0885, 0, -8.8381], [11.2622, 0, -6.364], [3.6678, 0, -4.4475]], // inner core
  [1221.5, [12.5815, -1.2638, -3.6426, -5.5281], [11.0487, -4.0362, 4.8023, -13.5732], [0]], // outer core
  [3480, [7.9565, -6.4761, 5.5283, -3.0807], [15.3891, -5.3181, 5.5242, -2.5514], [6.9254, 1.4672, -2.0834, 0.9783]], // lowermost mantle
  [3630, [7.9565, -6.4761, 5.5283, -3.0807], [24.952, -40.4673, 51.4832, -26.6419], [11.1671, -13.7818, 17.4575, -9.2777]], // lower mantle
  [5600, [7.9565, -6.4761, 5.5283, -3.0807], [29.2766, -23.6027, 5.5242, -2.5514], [22.3459, -17.2473, -2.0834, 0.9783]], // lower mantle, top
  [5701, [5.3197, -1.4836], [19.0957, -9.8672], [9.9839, -4.9324]], // transition zone
  [5771, [11.2494, -8.0298], [39.7027, -32.6166], [22.3512, -18.5856]],
  [5971, [7.1089, -3.8045], [20.3926, -12.2569], [8.9496, -4.4597]],
  [6151, [2.691, 0.6924], [4.1875, 3.9382], [2.1519, 2.3481]], // LVZ and LID: effective isotropic speeds (footnote)
  [6346.6, [2.9], [6.8], [3.9]], // lower crust
  [6356, [2.6], [5.8], [3.2]], // upper crust
];
// PREM's top 3 km is ocean water; the drawn model has no ocean, so depths above 3 km use the upper crust row.
const poly = (c, x) => c.reduce((s, k, i) => s + k * x ** i, 0);

/** { density (g/cm³), vp, vs (km/s) } at a depth in km. At a boundary the deeper row is used. */
export function premAt(depthKm) {
  const r = Math.min(A - Math.max(depthKm, 0), A - 3) - 1e-9;
  let row = ROWS[0];
  for (const rw of ROWS) if (r >= rw[0]) row = rw;
  const x = r / A;
  return { density: poly(row[1], x), vp: poly(row[2], x), vs: poly(row[3], x) };
}

export const PREM_SOURCE = { refs: ['prem1981'], where: 'PREM, Table I, p. 308' };
