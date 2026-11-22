import { Cloud, P, I, ellipsoid, disc, ring, unitVec, rand, reseed } from './shapes.js';
import { EARTH } from '../content/earth/index.js';

// Real depths in km. PREM = Dziewonski & Anderson (1981) Table I; ak135 = Kennett et al. (1995) Table 3.
// shortcut: oceanic crust (7 km) has no source in hand yet (White et al. 1992); innermost inner core and LLSVPs await theirs.
export const GEOMETRY = {
  crust: [0, 35], 'continental-crust': [0, 35], 'oceanic-crust': [0, 7], // ak135 Moho 35 km
  lithosphere: [35, 80], 'lithospheric-mantle': [35, 80], // PREM lid base 80 km
  asthenosphere: [80, 220], // PREM low-velocity zone
  'upper-mantle': [220, 410], mantle: [220, 2891], // A-level mantle drawn from the asthenosphere down
  'transition-zone': [410, 660], 'lower-mantle': [660, 2891], 'd-double-prime': [2741, 2891], // ak135 410/660; PREM basal region
  'outer-core': [2891, 5149.5], 'inner-core': [5149.5, 6371], 'innermost-inner-core': [6071, 6371], // PREM CMB and ICB
  moho: [35, 35], lab: [80, 80], d410: [410, 410], d660: [660, 660], cmb: [2891, 2891], icb: [5149.5, 5149.5],
};

const R = 1.6; // display radius
const EARTH_KM = 6371;
// The top 660 km is stretched so thin layers are visible; below that the scale is true. [real km, drawn km]
const STRETCH = [[0, 0], [7, 30], [35, 150], [100, 260], [410, 430], [660, 600], [EARTH_KM, EARTH_KM]];
export function drawnDepth(km) {
  for (let i = 1; i < STRETCH.length; i++) {
    const [a, da] = STRETCH[i - 1], [b, db] = STRETCH[i];
    if (km <= b) return da + ((km - a) / (b - a)) * (db - da);
  }
  return EARTH_KM;
}
const KM = (depth) => R * (1 - drawnDepth(depth) / EARTH_KM);

const COLORS = {
  crust: '#d9b38c', 'continental-crust': '#d9b38c', 'oceanic-crust': '#8fa8c8',
  lithosphere: '#c98b5a', 'lithospheric-mantle': '#c98b5a', asthenosphere: '#ffb347',
  mantle: '#f07a3a', 'upper-mantle': '#ffa04a', 'transition-zone': '#ff8c42', 'lower-mantle': '#e8553a', 'd-double-prime': '#b8333a', llsvp: '#7a1f4f',
  'outer-core': '#ffd23f', 'inner-core': '#fff3b0', 'innermost-inner-core': '#ffffff',
};
const BOUNDARY = '#cfe6ff';

/** Shell between rIn and rOut split into top and bottom halves, each with its equatorial cross-section filled in. */
function halves(rIn, rOut, nShell, nFace) {
  const top = new Cloud(), bot = new Cloud();
  const s = ellipsoid(rOut, rOut, rOut, nShell).p;
  for (let i = 0; i < s.length; i += 3) (s[i + 1] >= 0 ? top : bot).add(s[i], s[i + 1], s[i + 2]);
  top.merge(disc(rIn, rOut, nFace / 2, 0.005));
  bot.merge(disc(rIn, rOut, nFace / 2, -0.005));
  return { top, bot };
}

const anchorAt = (r, deg, y = 0.01) => {
  const a = (deg * Math.PI) / 180;
  return [r * Math.cos(a), y, r * Math.sin(a)];
};

/** Solid ball (filled volume) of radius r. */
function ball(r, n) {
  const c = new Cloud();
  for (let i = 0; i < n; i++) {
    const [x, y, z] = unitVec();
    const rr = r * (i % 3 ? 1 : Math.cbrt(rand()));
    c.add(x * rr, y * rr, z * rr);
  }
  return c;
}

/** Crust as 8 octant pieces that fly outward, a simplified stand-in for plates. `which` picks the octants. */
function plates(rIn, n, which) {
  const out = which.map(() => new Cloud());
  for (let i = 0; i < n; i++) {
    const [x, y, z] = unitVec();
    const k = (x > 0 ? 1 : 0) + (y > 0 ? 2 : 0) + (z > 0 ? 4 : 0);
    const j = which.indexOf(k);
    if (j < 0) continue;
    const r = rIn + (R - rIn) * (i % 5 === 0 ? rand() : 1);
    out[j].add(x * r, y * r, z * r);
  }
  const dir = (k) => [k & 1 ? 1 : -1, k & 2 ? 1 : -1, k & 4 ? 1 : -1].map((c) => c * 1.33);
  return out.map((c, j) => I(c, dir(which[j])));
}

const CONTINENTAL = [0, 3, 5]; // octants drawn as continental crust; the rest are oceanic
const ALL = [0, 1, 2, 3, 4, 5, 6, 7];

export function buildEarth(level = 'alevel') {
  reseed();
  const content = EARTH[level] || EARTH.alevel;
  const ids = new Set(content.parts.map((p) => p.id));
  const meta = Object.fromEntries(content.parts.map((p) => [p.id, p]));
  const make = (id, instances, kind = 'layer', color = COLORS[id]) => P(id, meta[id].title, meta[id].short, color, instances, kind);

  // layers ordered outside-in; each opens by a lift that shrinks with depth
  const shells = [...ids].filter((id) => meta[id].kind === 'layer' && GEOMETRY[id] && !/crust|inner-core/.test(id));
  shells.sort((a, b) => GEOMETRY[a][0] - GEOMETRY[b][0]);
  const parts = [];

  if (ids.has('crust')) parts.push(make('crust', plates(KM(35), 9000, ALL)));
  if (ids.has('continental-crust')) parts.push(make('continental-crust', plates(KM(35), 9000, CONTINENTAL)));
  if (ids.has('oceanic-crust')) parts.push(make('oceanic-crust', plates(KM(7), 9000, ALL.filter((k) => !CONTINENTAL.includes(k)))));

  shells.forEach((id, n) => {
    let [top, base] = GEOMETRY[id];
    if (id === 'lower-mantle' && ids.has('d-double-prime')) base = GEOMETRY['d-double-prime'][0];
    const rOut = KM(top), rIn = KM(base), vol = rOut ** 3 - rIn ** 3;
    const { top: t, bot: b } = halves(rIn, rOut, Math.round(1500 + vol * 900), Math.round(300 + (rOut ** 2 - rIn ** 2) * 220));
    const lift = 1.35 - (n / Math.max(1, shells.length - 1)) * 1.0;
    parts.push(make(id, [I(t, [0, lift, 0], anchorAt((rIn + rOut) / 2, 20 + n * 47)), I(b, [0, -lift, 0])]));
  });

  if (ids.has('llsvp')) {
    // two antipodal blobs at the base of the mantle (African and Pacific provinces), on the cross-section
    const r = KM(2750), blobs = [new Cloud(), new Cloud()];
    [0, 180].forEach((deg, j) => {
      const [cx, , cz] = anchorAt(r, deg, 0);
      for (const [x, y, z] of Array.from({ length: 700 }, unitVec)) {
        const s = Math.cbrt(rand());
        blobs[j].add(cx + x * 0.16 * s, Math.abs(y) * 0.12 * s, cz + z * 0.1 * s);
      }
    });
    parts.push(make('llsvp', blobs.map((c) => I(c, [0, 0.6, 0]))));
  }

  const rIc = KM(GEOMETRY.icb[0]);
  if (ids.has('innermost-inner-core')) {
    const rIic = KM(6071);
    const { top, bot } = halves(rIic, rIc, 1800, 600);
    parts.push(make('inner-core', [I(top, [0, 0.22, 0], anchorAt((rIc + rIic) / 2, 250)), I(bot, [0, -0.22, 0])]));
    parts.push(make('innermost-inner-core', [I(ball(rIic, 500), [0, 0, 0], [0, rIic * 0.6, 0])]));
  } else if (ids.has('inner-core')) {
    parts.push(make('inner-core', [I(ball(rIc, 2600), [0, 0, 0], [0, rIc * 0.6, 0])]));
  }

  // boundaries: a sparse surface plus a bright ring on the cross-section; they stay put when the Earth opens
  for (const id of ids) {
    if (meta[id].kind !== 'boundary') continue;
    const r = KM(GEOMETRY[id][0]);
    const c = ellipsoid(r, r, r, Math.round(120 + r * r * 90)).merge(ring(r, 0, Math.round(90 + r * 70)));
    parts.push(make(id, [I(c, [0, 0, 0], anchorAt(r, 300 + parts.length * 9))], 'boundary', BOUNDARY));
  }
  return parts;
}
