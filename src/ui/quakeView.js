// Earthquake view: P and S ray paths traced through PREM, drawn on the equatorial cut, with the shadow zones
// marked on the surface. Wavefronts travel out along the rays; the clock is sped up, not to scale.
import * as THREE from 'three';
import { fan, QUAKE_FACTS } from '../content/earth/rays.js';
import { QUAKE_COLORS } from './propertyView.js';
import { KM } from '../models/earth.js';

const LOOP_S = 1500; // seismic seconds per loop: the slowest drawn waves arrive by about 1,300 s
const SPEED = 140; // seismic seconds per real second

const VERT = /* glsl */ `
attribute float aT; attribute vec3 aC;
uniform vec2 uPull;
varying float vT; varying vec3 vC;
void main() {
  vT = aT; vC = aC;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  gl_Position.xy += uPull * gl_Position.w;
}`;
const FRAG = /* glsl */ `
uniform float uClock; uniform float uScatter;
varying float vT; varying vec3 vC;
void main() {
  if (vT > uClock) discard;
  float head = exp(-(uClock - vT) / 45.0); // the wavefront glows, the path behind it stays faint
  gl_FragColor = vec4(vC * (0.8 + 0.7 * head), (0.6 + 0.4 * head) * (1.0 - uScatter));
}`;

/** A hidden group to add to the scene; show(on) toggles it, tick(dt, still) runs the clock. */
export function buildQuake(uniforms) {
  const SRC = -Math.PI / 2; // the earthquake sits at the top of the tilted cut
  const Y = 0.006; // just above the lower half's face
  const pos = [], ts = [], cs = [];
  const col = (h) => new THREE.Color(h).toArray();
  const seg = (a, b, ta, tb, c) => { pos.push(...a, ...b); ts.push(ta, tb); cs.push(...c, ...c); };
  const at = (r, ang, lift = 0) => { const rho = KM(6371 - r) + lift; return [rho * Math.cos(ang), Y, rho * Math.sin(ang)]; };

  for (const wave of ['P', 'S']) {
    const c = col(QUAKE_COLORS[wave]);
    for (const ray of fan(wave, wave === 'P' ? 34 : 26)) {
      const pts = ray.pts.filter((_, k) => k % 8 === 0 || k === ray.pts.length - 1);
      for (const side of [1, -1])
        for (let k = 1; k < pts.length; k++) {
          const [r0, a0, t0] = pts[k - 1], [r1, a1, t1] = pts[k];
          seg(at(r0, SRC + side * a0), at(r1, SRC + side * a1), t0, t1, c);
        }
    }
  }
  // shadow zones as arcs just outside the surface, both sides of the earthquake
  const f = QUAKE_FACTS;
  const arc = (from, to, lift, c) => {
    for (const side of [1, -1])
      for (let d = from; d < to; d += 1) {
        const a = (x) => SRC + side * (x * Math.PI) / 180;
        seg(at(6371, a(d), lift), at(6371, a(Math.min(d + 1, to)), lift), 0, 0, c);
      }
  };
  for (let w = 0; w < 4; w++) { // a few close arcs read as one thick band
    arc(f.p[0], f.p[1], 0.04 + w * 0.006, col(QUAKE_COLORS.pShadow));
    arc(f.s, 180, 0.09 + w * 0.006, col(QUAKE_COLORS.sShadow));
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('aT', new THREE.Float32BufferAttribute(ts, 1));
  geo.setAttribute('aC', new THREE.Float32BufferAttribute(cs, 3));
  const clock = { value: 0 };
  const lines = new THREE.LineSegments(geo, new THREE.ShaderMaterial({
    vertexShader: VERT, fragmentShader: FRAG, transparent: true, depthWrite: false,
    uniforms: { uClock: clock, uPull: uniforms.uPull, uScatter: uniforms.uScatter },
  }));
  lines.visible = false;
  lines.frustumCulled = false;
  lines.renderOrder = 1;
  let t = 0;
  return {
    object: lines,
    show(on) { lines.visible = on; t = 0; },
    tick(dt, still) {
      if (!lines.visible) return;
      t = (t + dt * SPEED) % (LOOP_S + 300); // a short pause with every path drawn before the next quake
      clock.value = still ? 1e9 : Math.min(t, LOOP_S);
    },
  };
}
