// Data overlays drawn as dots: on the surface like a globe (crust thickness, LAB depth), or on the equatorial cut (temperature, tomography).
// Each colours a dot from its data and the view's scale; colorAt returning false leaves the dot out.
import * as THREE from 'three';
import { KM, depthAtRadius } from '../models/earth.js';
import { CAM_Z } from '../scene.js';

// sized like the model's dots; on the globe, dots on the far side are dropped so the near side reads as a map
const VERT = /* glsl */ `
attribute vec3 color;
uniform float uSize; uniform float uPR; uniform float uCull;
varying vec3 vC; varying float vFront;
void main() {
  vC = color;
  vFront = uCull > 0.5 ? (normalMatrix * normalize(position)).z : 1.0;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * uPR * 1.5 * (${CAM_Z.toFixed(1)} / -mv.z);
}`;
const FRAG = /* glsl */ `
varying vec3 vC; varying float vFront;
void main() {
  if (vFront < 0.05 || length(gl_PointCoord - 0.5) > 0.5) discard;
  gl_FragColor = vec4(vC, 0.95);
}`;

const GOLDEN = Math.PI * (3 - Math.sqrt(5));

/** Points on the globe's surface: [x, y, z, lat, lon] for a Fibonacci sphere of n dots. */
function* globe(n) {
  const r = KM(0) * 1.004;
  for (let i = 0; i < n; i++) {
    const y = 1 - (2 * (i + 0.5)) / n, s = Math.sqrt(1 - y * y), a = i * GOLDEN;
    const x = s * Math.cos(a), z = s * Math.sin(a);
    // y is north; longitude grows from +z towards +x, so the map is not mirrored when seen from outside
    yield [x * r, y * r, z * r, (Math.asin(y) * 180) / Math.PI, (Math.atan2(x, z) * 180) / Math.PI];
  }
}
/** Points spread evenly over the equatorial cut between depths topKm and baseKm: [x, y, z, depth, lon]. */
function* cut(n, topKm, baseKm) {
  const r0 = KM(baseKm), r1 = KM(topKm);
  for (let i = 0; i < n; i++) {
    const r = Math.sqrt(r0 * r0 + ((i + 0.5) / n) * (r1 * r1 - r0 * r0)), a = i * GOLDEN; // even per area
    const x = r * Math.sin(a), z = r * Math.cos(a); // same longitude convention as the globe
    yield [x, 0.008, z, depthAtRadius(r), (Math.atan2(x, z) * 180) / Math.PI];
  }
}

/** source: { file?: path under public/, bytes?: expected length, array?: typed array to read it as (default Uint8Array), kind: 'globe' | 'cut', n, top?, base?, colorAt(data, a, b, color, view) -> boolean }
 *  (a, b) are (lat, lon) on the globe and (depth km, lon) on the cut. Returns { object, show(on) -> Promise<boolean> }. */
export function buildDataMap(view, uniforms, source) {
  const geo = new THREE.BufferGeometry();
  const points = new THREE.Points(geo, new THREE.ShaderMaterial({
    vertexShader: VERT, fragmentShader: FRAG, transparent: true, depthWrite: false,
    uniforms: { uSize: uniforms.uSize, uPR: uniforms.uPR, uCull: { value: source.kind === 'globe' ? 1 : 0 } },
  }));
  points.visible = false;
  points.renderOrder = 1;
  let loading = null;
  let wanted = false; // the view can be left while the data is still loading

  async function load() {
    let data = null;
    if (source.file) {
      const res = await fetch(import.meta.env.BASE_URL + source.file);
      if (!res.ok) throw new Error(`${source.file}: HTTP ${res.status}`);
      data = new (source.array || Uint8Array)(await res.arrayBuffer());
      if (source.bytes && data.length !== source.bytes) throw new Error(`${source.file}: wrong size`);
    }
    const pos = [], col = [], c = new THREE.Color();
    const dots = source.kind === 'globe' ? globe(source.n) : cut(source.n, source.top, source.base);
    for (const [x, y, z, a, b] of dots) {
      if (!source.colorAt(data, a, b, c, view)) continue;
      pos.push(x, y, z);
      col.push(c.r, c.g, c.b);
    }
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  }

  return {
    object: points,
    /** Resolves false if the data could not be loaded (the view then shows nothing extra). */
    async show(on) {
      wanted = on;
      points.visible = false;
      if (!on) return true;
      try {
        await (loading ||= load());
        points.visible = wanted;
        return true;
      } catch (e) {
        loading = null; // allow a retry next time
        console.warn(e);
        return false;
      }
    },
  };
}

/** Colour along the view's lo → hi scale for value v. */
export const scale = (view, v, c) => c.set(view.lo).lerp(new THREE.Color(view.hi), Math.min(1, Math.max(0, (v - view.min) / (view.max - view.min))));
