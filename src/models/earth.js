import { Cloud, P, I, ellipsoid, disc, ring, unitVec, rand, reseed, TAU } from './shapes.js';
import { EARTH } from '../content/earth/index.js';
import { labDepth, LAB_AGES, LAB_CRATON_KM } from '../content/earth/lab.js';

// Real depths in km. PREM = Dziewonski & Anderson (1981) Table I; ak135 = Kennett et al. (1995) Table 3.
// Crust: White et al. (1992) oceanic 7.1 km; continental drawn at ak135's 35 km (CRUST 5.1 averages 38 km). LLSVPs from Garnero et al. (2016); innermost inner core (radius ~300 km) from Ishii & Dziewoński (2002).
export const GEOMETRY = {
  crust: [0, 35], 'continental-crust': [0, 35], 'oceanic-crust': [0, 7], // ak135 Moho 35 km; White et al. 7.1 km
  lithosphere: [35, 80], 'lithospheric-mantle': [35, 80], // PREM lid base 80 km; under oceanic crust it starts at 7 km
  asthenosphere: [80, 220], // PREM low-velocity zone
  'upper-mantle': [220, 410], mantle: [220, 2891], // A-level mantle drawn from the asthenosphere down
  'transition-zone': [410, 660], 'lower-mantle': [660, 2891], 'd-double-prime': [2741, 2891], // ak135 410/660; PREM basal region
  'outer-core': [2891, 5149.5], 'inner-core': [5149.5, 6371], 'innermost-inner-core': [6071, 6371], // PREM CMB and ICB
  moho: [35, 35], lab: [80, 80], 'lab-measured': [55, 200], // Fischer et al. (2010): drawn by plate age, see the boundary loop
  d410: [410, 410], d520: [520, 520], // Frost (2008) p. 172
  d660: [660, 660], cmb: [2891, 2891], icb: [5149.5, 5149.5],
};

const R = 1.6; // display radius
const EARTH_KM = 6371;
// Near-surface thicknesses are exaggerated. Below 660 km, intervals are about 1% thicker and absolute depths are shifted. [real km, drawn km]
const STRETCH = [[0, 0], [7, 30], [35, 150], [100, 260], [410, 430], [660, 600], [EARTH_KM, EARTH_KM]];
export function drawnDepth(km) {
  for (let i = 1; i < STRETCH.length; i++) {
    const [a, da] = STRETCH[i - 1], [b, db] = STRETCH[i];
    if (km <= b) return da + ((km - a) / (b - a)) * (db - da);
  }
  return EARTH_KM;
}
/** Drawn radius at a real depth in km. */
export const KM = (depth) => R * (1 - drawnDepth(depth) / EARTH_KM);
/** Real depth in km at a drawn radius: the inverse of KM. */
export function depthAtRadius(r) {
  const dd = EARTH_KM * (1 - r / R);
  for (let i = 1; i < STRETCH.length; i++) {
    const [a, da] = STRETCH[i - 1], [b, db] = STRETCH[i];
    if (dd <= db) return a + ((dd - da) / (db - da)) * (b - a);
  }
  return EARTH_KM;
}

const COLORS = {
  crust: '#d9b38c', 'continental-crust': '#d9b38c', 'oceanic-crust': '#8fa8c8',
  lithosphere: '#c98b5a', 'lithospheric-mantle': '#c98b5a', asthenosphere: '#ffb347',
  mantle: '#f07a3a', 'upper-mantle': '#ffa04a', 'transition-zone': '#ff8c42', 'lower-mantle': '#e8553a', 'd-double-prime': '#b8333a', 'post-perovskite': '#e6b3ff', llsvp: '#7a1f4f',
  'outer-core': '#ffd23f', 'inner-core': '#fff3b0', 'innermost-inner-core': '#ffffff',
};
const BOUNDARY = '#cfe6ff';
const MEASURED = '#6dffa8'; // the measured LAB, kept apart from the pale PREM 80 km ring beside it

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

// Continental crust is one wedge (x > 0, z < 0) through both hemispheres, so the cross-section matches top and bottom.
const CONTINENTAL = [1, 3]; // octants drawn as continental crust; the rest are oceanic
const continental = (x, z) => x > 0 && z < 0;

/** Points in the continental wedge move from [rIn, rFrom] to [rIn, rTo], so a layer under oceanic crust starts lower there. */
function underContinents(c, rIn, rFrom, rTo) {
  const p = c.p;
  for (let i = 0; i < p.length; i += 3) {
    if (!continental(p[i], p[i + 2])) continue;
    const r = Math.hypot(p[i], p[i + 1], p[i + 2]);
    if (r <= rIn) continue;
    const k = (rIn + ((r - rIn) * (rTo - rIn)) / (rFrom - rIn)) / r;
    p[i] *= k; p[i + 1] *= k; p[i + 2] *= k;
  }
  return c;
}
const ALL = [0, 1, 2, 3, 4, 5, 6, 7];

// PREM row boundaries (depth km): a face samples both sides of each, so property jumps stay sharp
const PREM_STEPS = [24.4, 15, 220, 400, 600, 670, 771, 2741, 2891, 5149.5];
/** Solid cross-section face of a layer from topKm to baseKm, at height y: [[radius, depth km], ...] from outside in.
 *  a0..a1 limits it to a sector; propOnly faces show only in the property views (the crust's flies apart as plates). */
function face(topKm, baseKm, y, { a0 = 0, a1 = Math.PI * 2, propOnly = false } = {}) {
  const d = new Set();
  for (let k = 0; k <= 24; k++) d.add(topKm + ((baseKm - topKm) * k) / 24);
  for (const s of PREM_STEPS) if (s > topKm && s < baseKm) [s - 0.01, s + 0.01].forEach((v) => d.add(v));
  return { y, a0, a1, propOnly, rings: [...d].sort((a, b) => a - b).map((km) => [KM(km), km]) };
}

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
  const lifts = {};

  // the crust's cut face sits just above the layer faces below it; the continental wedge is a = -90°..0° (x > 0, z < 0)
  const withFace = (inst, f) => [{ ...inst[0], face: f }, ...inst.slice(1)];
  const CY = 0.006, Q = Math.PI / 2;
  if (ids.has('crust')) parts.push(make('crust', withFace(plates(KM(35), 9000, ALL), face(0, 35, CY, { propOnly: true }))));
  if (ids.has('continental-crust')) parts.push(make('continental-crust', withFace(plates(KM(35), 9000, CONTINENTAL), face(0, 35, CY, { a0: -Q, a1: 0, propOnly: true }))));
  if (ids.has('oceanic-crust')) parts.push(make('oceanic-crust', withFace(plates(KM(7), 9000, ALL.filter((k) => !CONTINENTAL.includes(k))), face(0, 7, CY, { a0: 0, a1: 3 * Q, propOnly: true }))));

  shells.forEach((id, n) => {
    let [top, base] = GEOMETRY[id];
    if (id === 'lower-mantle' && ids.has('d-double-prime')) base = GEOMETRY['d-double-prime'][0];
    // under oceanic crust the lithospheric mantle starts at the oceanic Moho (White et al. 7 km), not 35 km
    const oceanTop = id === 'lithospheric-mantle' && ids.has('oceanic-crust');
    if (oceanTop) top = GEOMETRY['oceanic-crust'][1];
    const rOut = KM(top), rIn = KM(base), vol = rOut ** 3 - rIn ** 3;
    const { top: t, bot: b } = halves(rIn, rOut, Math.round(1500 + vol * 900), Math.round(300 + (rOut ** 2 - rIn ** 2) * 220));
    if (oceanTop) [t, b].forEach((c) => underContinents(c, rIn, rOut, KM(GEOMETRY['continental-crust'][1])));
    const lift = 1.35 - (n / Math.max(1, shells.length - 1)) * 1.0;
    lifts[id] = lift;
    parts.push(make(id, [
      { ...I(t, [0, lift, 0], anchorAt((rIn + rOut) / 2, 20 + n * 47)), face: face(top, base, 0.004) },
      { ...I(b, [0, -lift, 0]), face: face(top, base, -0.004) },
    ]));
  });

  if (ids.has('llsvp')) {
    // Schematic cross-sections only: not the mapped shapes or locations. Garnero et al. (2016) p. 481: two antipodal provinces covering ~30% of the CMB (a cap ~45° in radius each),
    // reduced velocities up to 1,200 km above the CMB in places. Drawn on the cross-section, tallest at the centre.
    const rCmb = KM(GEOMETRY.cmb[0]), hMax = KM(GEOMETRY.cmb[0] - 1200) - rCmb, half = (45 * Math.PI) / 180;
    const blobs = [0, 180].map((deg) => {
      const c = new Cloud(), mid = (deg * Math.PI) / 180;
      for (let i = 0; i < 1400; i++) {
        const u = rand() * 2 - 1, a = mid + u * half;
        const r = rCmb + hMax * (1 - u * u) * rand();
        c.add(r * Math.cos(a), 0.006 + rand() * 0.02, r * Math.sin(a));
      }
      return c;
    });
    parts.push(make('llsvp', blobs.map((c, j) => I(c, [0, lifts['d-double-prime'] ?? lifts['lower-mantle'] ?? 0.6, 0], j ? undefined : anchorAt(rCmb + hMax / 2, 0)))));
  }

  if (ids.has('post-perovskite')) {
    // Murakami et al. (2004) p. 855: post-perovskite above 125 GPa and 2,500 K, about 2,700 km deep. Short streaks on the cut stand for
    // platy crystals lined up by flow (p. 858); spreading them evenly round the cut is schematic.
    const rTop = KM(2700), rCmb = KM(GEOMETRY.cmb[0]), c = new Cloud();
    for (let s = 0; s < 360; s++) {
      const r = rCmb + (rTop - rCmb) * rand(), a = rand() * TAU, y = 0.006 + rand() * 0.02;
      for (let k = 0; k < 8; k++) c.add(r * Math.cos(a + k * 0.012), y, r * Math.sin(a + k * 0.012));
    }
    parts.push(make('post-perovskite', [I(c, [0, lifts['d-double-prime'] ?? 0.6, 0], anchorAt((rTop + rCmb) / 2, 120))]));
  }

  const rIc = KM(GEOMETRY.icb[0]);
  if (ids.has('innermost-inner-core')) {
    const rIic = KM(6071);
    const { top, bot } = halves(rIic, rIc, 1800, 600);
    parts.push(make('inner-core', [
      { ...I(top, [0, 0.22, 0], anchorAt((rIc + rIic) / 2, 250)), face: face(GEOMETRY.icb[0], 6071, 0.004) },
      { ...I(bot, [0, -0.22, 0]), face: face(GEOMETRY.icb[0], 6071, -0.004) },
    ]));
    parts.push(make('innermost-inner-core', [{ ...I(ball(rIic, 500), [0, 0, 0], [0, rIic * 0.6, 0]), face: face(6071, 6371, 0) }]));
  } else if (ids.has('inner-core')) {
    parts.push(make('inner-core', [{ ...I(ball(rIc, 2600), [0, 0, 0], [0, rIc * 0.6, 0]), face: face(GEOMETRY.icb[0], 6371, 0) }]));
  }

  // boundaries: a sparse surface plus a bright ring on the cross-section; they stay put when the Earth opens
  for (const id of ids) {
    if (meta[id].kind !== 'boundary') continue;
    const r = KM(GEOMETRY[id][0]);
    const deg = 300 + parts.length * 9;
    // only the ring is pickable: the sparse surface would otherwise cover every part inside it on screen
    if (id === 'moho' && ids.has('oceanic-crust')) {
      // the Moho follows the crust drawn above it: 7 km under oceanic crust, 35 km under continental crust
      const rO = KM(GEOMETRY['oceanic-crust'][1]), rC = KM(GEOMETRY['continental-crust'][1]);
      const surf = ellipsoid(rO, rO, rO, Math.round(120 + rO * rO * 90));
      const rim = ring(rO, 0, Math.round(90 + rO * 70));
      [surf, rim].forEach((c) => underContinents(c, 0, rO, rC));
      for (const a of [0, -Math.PI / 2]) for (let k = 0; k <= 12; k++) { const rr = rC + ((rO - rC) * k) / 12; rim.add(rr * Math.cos(a), 0, rr * Math.sin(a)); }
      const ra = continental(Math.cos((deg * Math.PI) / 180), Math.sin((deg * Math.PI) / 180)) ? rC : rO;
      parts.push(make(id, [I(rim, [0, 0, 0], anchorAt(ra, deg)), { ...I(surf), pickable: false }], 'boundary', BOUNDARY));
      continue;
    }
    if (id === 'lab-measured') {
      // the measured LAB beside the PREM 80 km lid base: deeper under older ocean, ~200 km under the continent (Fischer et al. 2010)
      const rC = KM(LAB_CRATON_KM), span = (3 * Math.PI) / 2;
      const rAt = (x, z) => continental(x, z) ? rC
        : KM(labDepth(LAB_AGES[0] + ((((Math.atan2(z, x) % TAU) + TAU) % TAU) / span) * (LAB_AGES[1] - LAB_AGES[0])));
      const onto = (c) => { const q = c.p; for (let i = 0; i < c.n * 3; i += 3) { const k = rAt(q[i], q[i + 2]) / Math.hypot(q[i], q[i + 1], q[i + 2]); q[i] *= k; q[i + 1] *= k; q[i + 2] *= k; } return c; };
      const rim = onto(ring(r, 0, Math.round(2 * (90 + r * 70)))), surf = onto(ellipsoid(r, r, r, Math.round(120 + r * r * 90)));
      // radial joins at the two continental margins (young end at a = 0, old end at a = -90°)
      for (const [a, rO] of [[0, KM(labDepth(LAB_AGES[0]))], [-Math.PI / 2, KM(labDepth(LAB_AGES[1]))]])
        for (let k = 0; k <= 12; k++) { const rr = rC + ((rO - rC) * k) / 12; rim.add(rr * Math.cos(a), 0, rr * Math.sin(a)); }
      const ad = (deg * Math.PI) / 180;
      parts.push(make(id, [I(rim, [0, 0, 0], anchorAt(rAt(Math.cos(ad), Math.sin(ad)), deg)), { ...I(surf), pickable: false }], 'boundary', MEASURED));
      continue;
    }
    const surface = { ...I(ellipsoid(r, r, r, Math.round(120 + r * r * 90))), pickable: false };
    parts.push(make(id, [I(ring(r, 0, Math.round(90 + r * 70)), [0, 0, 0], anchorAt(r, deg)), surface], 'boundary', BOUNDARY));
  }
  return parts;
}
