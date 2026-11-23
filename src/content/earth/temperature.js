// Temperature with depth (K). Mantle: the adiabat of Katsura (2022), Table 3, pp. 6–7 (CC BY 4.0), 50–2,800 km.
// Below it, joined straight between cited points: 4,050 ± 500 K at the core–mantle boundary (Anzellini et al. 2013, p. 466);
// 5,440 K at the inner-core boundary, the preferred value in Table 2 (range 5,200–5,700 K), and 5,500 K at the centre, the middle of 5,000–6,000 K
// (Hirose et al. 2013, p. 675; p. 658). Above 50 km, the lithosphere's steeper gradient is not in the table, so nothing is given.
// Repeated depths are the jumps at 410, 520 and 660 km: the first value is above the boundary, the second below.
const T = [
  [50, 1646], [70, 1657], [90, 1667], [100, 1672], [120, 1682], [140, 1691], [160, 1700], [180, 1709], [200, 1718],
  [220, 1726], [240, 1735], [260, 1743], [280, 1751], [300, 1759], [320, 1766], [340, 1774], [360, 1781], [380, 1788],
  [400, 1796], [410, 1799], [410, 1860], [420, 1863], [440, 1871], [460, 1878], [480, 1885], [500, 1892], [520, 1899],
  [520, 1942], [540, 1950], [560, 1957], [580, 1965], [600, 1972], [620, 1980], [640, 1987], [660, 1994], [660, 1960],
  [700, 1976], [800, 2015], [900, 2053], [1000, 2090], [1200, 2158], [1400, 2223], [1600, 2283], [1800, 2340],
  [2000, 2394], [2200, 2445], [2400, 2494], [2600, 2541], [2800, 2587],
  [2891, 4050], [5149.5, 5440], [6371, 5500],
];

export function tempAt(km) {
  if (km < T[0][0] || km > 6371) return null;
  for (let i = 1; i < T.length; i++) {
    const [d0, t0] = T[i - 1], [d1, t1] = T[i];
    if (km <= d1 && d1 > d0) return t0 + ((km - d0) / (d1 - d0)) * (t1 - t0);
  }
  return T[T.length - 1][1];
}
