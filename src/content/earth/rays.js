// Seismic ray paths through PREM (src/content/earth/prem.js), traced with Snell's law for a sphere:
// along a ray, r·sin(i)/v stays constant (the ray parameter p). This is this tool's own calculation from
// PREM's wave speeds; the shadow zones come out of it rather than being typed in.
import { premAt } from './prem.js';

const A = 6371;
const CMB = 3480;
const ICB = 1221.5;
const DR = 2; // km per integration step

/**
 * One ray leaving a surface source at takeoff angle i0 (radians from straight down), for 'P' or 'S'.
 * Returns { pts: [[r km, angle rad, time s], ...], dist (deg, 0-180), turn (km), stopped (S at the liquid core) }.
 */
export function traceRay(i0, wave = 'P') {
  const v = (r) => premAt(A - r)[wave === 'P' ? 'vp' : 'vs'];
  const p = (A * Math.sin(i0)) / v(A - 0.01);
  const down = [[A, 0, 0]];
  let r = A, th = 0, t = 0, stopped = false;
  // Each step integrates 1/sqrt(f), f = (r/v)^2 - p^2, exactly for f varying linearly across the step,
  // so the contribution stays finite near the turning point.
  const f = (rr) => (rr / v(rr)) ** 2 - p * p;
  let f1 = f(r);
  for (;;) {
    const r2 = r - DR, v2 = v(r2 + 1e-6);
    if (v2 <= 0) { stopped = true; break; } // S waves cannot travel in the liquid outer core
    const f2 = r2 > 0 ? f(r2 + 1e-6) : -1;
    const rm = r - DR / 2, eta = rm / v(rm);
    const turns = f2 <= 0;
    // integral of dr / sqrt(f) over the step (or down to the turning point)
    const I = turns ? (2 * Math.sqrt(Math.max(f1, 0)) * DR) / Math.max(f1 - f2, 1e-9)
      : Math.abs(f1 - f2) < 1e-9 ? DR / Math.sqrt(f1) : (2 * (Math.sqrt(f1) - Math.sqrt(f2)) * DR) / (f1 - f2);
    th += (p / rm) * I;
    t += ((eta * eta) / rm) * I;
    if (turns) break;
    r = r2;
    f1 = f2;
    down.push([r, th, t]);
  }
  let pts = down;
  if (!stopped) {
    const [, thT, tT] = down[down.length - 1];
    pts = down.concat(down.slice(0, -1).reverse().map(([rr, a, tt]) => [rr, 2 * thT - a, 2 * tT - tt]));
  }
  const end = pts[pts.length - 1][1];
  const deg = ((end * 180) / Math.PI) % 360;
  return { pts, dist: deg > 180 ? 360 - deg : deg, turn: r, stopped };
}

/** A fan of n rays from just off vertical to near-horizontal takeoff. */
export function fan(wave, n = 60) {
  return Array.from({ length: n }, (_, k) => traceRay((0.4 + (89 * k) / (n - 1)) * (Math.PI / 180), wave));
}

/**
 * Farthest a direct (mantle) wave reaches: the ray that only just misses the core. A coarse scan up from steep
 * takeoff finds where rays stop reaching the core, then a fine scan just above that angle finds the farthest.
 */
function farthestMantle(wave) {
  const deg = Math.PI / 180;
  const inCore = (r) => r.stopped || r.turn <= CMB;
  let a = 1;
  while (inCore(traceRay(a * deg, wave))) a += 0.1;
  let best = 0;
  for (let x = a - 0.1; x <= a + 0.1; x += 0.002) {
    const r = traceRay(x * deg, wave);
    if (!inCore(r)) best = Math.max(best, r.dist);
  }
  return best;
}

/** Shadow zones (degrees from the earthquake) read off traced rays. */
export function shadowZones(n = 120) {
  const P = fan('P', n);
  const outerCoreP = P.filter((x) => x.turn <= CMB && x.turn > ICB);
  return {
    p: [farthestMantle('P'), Math.min(...outerCoreP.map((x) => x.dist))], // no direct P between these
    s: farthestMantle('S'), // no direct S beyond this
    innerCoreP: P.filter((x) => x.turn <= ICB).map((x) => x.dist), // P through the inner core
  };
}

/** Rounded facts for the legend: P shadow [from, to], S shadow from, inner-core P landing from (degrees). */
export function quakeFacts() {
  const z = shadowZones(120);
  return { p: z.p.map(Math.round), s: Math.round(z.s), innerFrom: Math.round(Math.min(...z.innerCoreP)) };
}

// quakeFacts() takes about a second, so the page uses these; scripts/rays.test.mjs checks they still match it.
export const QUAKE_FACTS = { p: [98, 141], s: 102, innerFrom: 133 };

export const RAY_SOURCE = { refs: ['prem1981'], where: 'Calculated here from PREM, Table I, p. 308' };
