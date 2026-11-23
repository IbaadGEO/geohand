// SEMUCB-WM1 (French & Romanowicz 2014), EarthScope EMC file semucb-2014-ucb-vs-viz-only.r0.1-n4c.nc (doi:10.17611/dp/emc.2023.semucbwm1.1).
// Packed by scripts/pack_phase2.py: the equator, one row of 360 1° columns (179.5°W first) per depth, Vs anomaly in 0.1% against
// the global mean at that depth. From 80 km down: the authors say the model's crust values are not interpretable.
export const SEMUCB = {
  file: 'data/semucb-equator.bin',
  depths: [80, 90, 100, 110, 130, 150, 170, 190, 210, 230, 250, 270, 290, 310, 330, 350, 370, 390, 410, 441, 491, 541, 591, 641, 691,
    741, 791, 841, 891, 941, 991, 1041, 1091, 1141, 1191, 1241, 1291, 1341, 1391, 1441, 1491, 1541, 1591, 1641, 1691, 1741, 1791, 1841,
    1891, 1941, 1991, 2041, 2091, 2141, 2191, 2241, 2291, 2341, 2391, 2441, 2491, 2541, 2591, 2641, 2691, 2741, 2791, 2841, 2891],
};
/** Vs anomaly (%) on the equator at depth km and longitude lonDeg: nearest depth, 1° column; null above 80 km. */
export function dvsAt(values, km, lonDeg) {
  const d = SEMUCB.depths;
  if (km < d[0] || km > d[d.length - 1]) return null;
  let k = 0;
  for (let i = 1; i < d.length; i++) if (Math.abs(d[i] - km) < Math.abs(d[k] - km)) k = i;
  const col = ((Math.floor(lonDeg + 180) % 360) + 360) % 360;
  return values[k * 360 + col] / 10;
}
