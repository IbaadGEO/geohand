// Crust thickness view: dots evenly spread over the surface, each coloured by the CRUST1.0 thickness of its 1° cell.
// Real thickness, shown by colour only: the drawn crust keeps its schematic, exaggerated depth.
import * as THREE from 'three';
import { CRUST1, thicknessAt } from '../content/earth/crust1.js';
import { KM } from '../models/earth.js';
import { CAM_Z } from '../scene.js';

const N = 24000; // dots on a Fibonacci sphere: about one per 1.7° cell, even at the poles

// sized like the model's dots; dots on the far side of the globe are dropped so the near side reads as a map
const VERT = /* glsl */ `
attribute vec3 color;
uniform float uSize; uniform float uPR;
varying vec3 vC; varying float vFront;
void main() {
  vC = color;
  vFront = (normalMatrix * normalize(position)).z;
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

/** View is { min, max, lo, hi }: the legend's scale; uniforms: the scene's (dot size, pixel ratio).
 *  Returns a hidden object to add to the scene and show(on). */
export function buildCrustMap(view, uniforms) {
  const geo = new THREE.BufferGeometry();
  const points = new THREE.Points(geo, new THREE.ShaderMaterial({
    vertexShader: VERT, fragmentShader: FRAG, transparent: true, depthWrite: false,
    uniforms: { uSize: uniforms.uSize, uPR: uniforms.uPR },
  }));
  points.visible = false;
  points.renderOrder = 1;
  let loading = null;
  let wanted = false; // the view can be left while the data is still loading

  async function load() {
    const res = await fetch(import.meta.env.BASE_URL + CRUST1.file);
    if (!res.ok) throw new Error(`crust data: HTTP ${res.status}`);
    const bytes = new Uint8Array(await res.arrayBuffer());
    if (bytes.length !== CRUST1.cells) throw new Error('crust data: wrong size');
    const r = KM(0) * 1.004, pos = new Float32Array(N * 3), col = new Float32Array(N * 3);
    const lo = new THREE.Color(view.lo), hi = new THREE.Color(view.hi), c = new THREE.Color();
    for (let i = 0; i < N; i++) {
      const y = 1 - (2 * (i + 0.5)) / N, s = Math.sqrt(1 - y * y), a = i * Math.PI * (3 - Math.sqrt(5));
      const x = s * Math.cos(a), z = s * Math.sin(a);
      // y is north; longitude grows from +z towards +x, so the map is not mirrored when seen from outside
      const lat = (Math.asin(y) * 180) / Math.PI, lon = (Math.atan2(x, z) * 180) / Math.PI;
      const t = (thicknessAt(bytes, lat, lon) - view.min) / (view.max - view.min);
      c.copy(lo).lerp(hi, Math.min(1, Math.max(0, t))).toArray(col, i * 3);
      pos.set([x * r, y * r, z * r], i * 3);
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
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
