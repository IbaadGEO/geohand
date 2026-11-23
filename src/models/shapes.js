// Point-cloud primitives. Every shape is built around the origin, axis = +Y unless noted.
import * as THREE from 'three';
import { rng } from '../utils.js';

const SEED = 20260111;
let next = rng(SEED);
const rnd = () => next();
/** Restart the random stream so a build gives the same points every time. */
export const reseed = (seed = SEED) => (next = rng(seed));
export const TAU = Math.PI * 2;
export const R = (a, b) => a + (b - a) * rnd();
export const rand = rnd;

export class Cloud {
  constructor() {
    this.p = [];
  }
  get n() {
    return this.p.length / 3;
  }
  add(x, y, z) {
    this.p.push(x, y, z);
    return this;
  }
  merge(...cs) {
    for (const c of cs) {
      const q = c.p;
      for (let i = 0; i < q.length; i++) this.p.push(q[i]);
    }
    return this;
  }
  move(x, y = 0, z = 0) {
    const p = this.p;
    for (let i = 0; i < p.length; i += 3) {
      p[i] += x;
      p[i + 1] += y;
      p[i + 2] += z;
    }
    return this;
  }
  scale(sx, sy = sx, sz = sx) {
    const p = this.p;
    for (let i = 0; i < p.length; i += 3) {
      p[i] *= sx;
      p[i + 1] *= sy;
      p[i + 2] *= sz;
    }
    return this;
  }
  rotate(ex, ey = 0, ez = 0) {
    const e = new THREE.Euler(ex, ey, ez);
    const v = new THREE.Vector3();
    const p = this.p;
    for (let i = 0; i < p.length; i += 3) {
      v.set(p[i], p[i + 1], p[i + 2]).applyEuler(e);
      p[i] = v.x;
      p[i + 1] = v.y;
      p[i + 2] = v.z;
    }
    return this;
  }
  /** rotate so that +Y points along dir */
  align(dir) {
    const d = new THREE.Vector3(...dir).normalize();
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d);
    const v = new THREE.Vector3();
    const p = this.p;
    for (let i = 0; i < p.length; i += 3) {
      v.set(p[i], p[i + 1], p[i + 2]).applyQuaternion(q);
      p[i] = v.x;
      p[i + 1] = v.y;
      p[i + 2] = v.z;
    }
    return this;
  }
  centroid() {
    const p = this.p;
    const n = Math.max(1, p.length / 3);
    let x = 0, y = 0, z = 0;
    for (let i = 0; i < p.length; i += 3) {
      x += p[i];
      y += p[i + 1];
      z += p[i + 2];
    }
    return [x / n, y / n, z / n];
  }
}

/** Part = one labelled component. Instance = one separately-exploding body of it. */
export const P = (id, name, desc, color, instances, kind = 'layer') => ({ id, name, desc, color, instances, kind });
export const I = (cloud, dir = [0, 0, 0], anchor) => ({ cloud, dir, anchor: anchor || cloud.centroid() });

// ---------------------------------------------------------------- primitives
export function disc(r0, r1, n, y = 0) {
  const c = new Cloud();
  for (let i = 0; i < n; i++) {
    const r = Math.sqrt(R(r0 * r0, r1 * r1));
    const a = rnd() * TAU;
    c.add(r * Math.cos(a), y, r * Math.sin(a));
  }
  return c;
}

export function ring(r, y, n) {
  const c = new Cloud();
  for (let i = 0; i < n; i++) {
    const a = rnd() * TAU;
    c.add(r * Math.cos(a), y, r * Math.sin(a));
  }
  return c;
}

export function unitVec() {
  for (;;) {
    const x = R(-1, 1), y = R(-1, 1), z = R(-1, 1);
    const l = x * x + y * y + z * z;
    if (l > 1 || l < 1e-4) continue;
    const s = Math.sqrt(l);
    return [x / s, y / s, z / s];
  }
}

export function ellipsoid(rx, ry, rz, n) {
  const c = new Cloud();
  for (let i = 0; i < n; i++) {
    const [x, y, z] = unitVec();
    c.add(x * rx, y * ry, z * rz);
  }
  return c;
}
