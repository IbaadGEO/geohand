import * as THREE from 'three';
import { clamp, damp } from './utils.js';

const MAXP = 24; // maximum parts in the scene
const CAM_Z = 9.5;
const FOV = 38;
const FIT = 2.7; // exploded radius in world units

const VERT = /* glsl */ `
attribute vec3 aDir;
attribute vec3 aColor;
attribute float aPart;
attribute vec3 aRand;
attribute float aSeed;
attribute float aMotion;
uniform float uMotion;
uniform float uProp;
uniform float uExplode;
uniform float uTime;
uniform float uSize;
uniform float uPR;
uniform float uScatter;
uniform float uHi;
uniform float uSel;
uniform float uIsolate;
uniform vec2 uPull;
varying vec3 vColor;
varying float vA;
vec3 rotY(vec3 v, float a) { float c = cos(a), s = sin(a); return vec3(c * v.x + s * v.z, v.y, -s * v.x + c * v.z); }
void main() {
  // motion shows physical state (src/content/earth/states.js); speeds are schematic, not to scale
  vec3 q = position;
  float m = uMotion > 0.5 ? aMotion : 1.0;
  if (m > 1.5 && m < 2.5) q = rotY(q, 0.05 * sin(uTime * 0.35 + aSeed * 6.283)); // creep: slow drift back and forth
  else if (m > 3.5 && m < 4.5) q = rotY(q, uTime * (0.32 + 0.22 * sin(q.y * 7.0 + aSeed * 2.0))); // liquid: flowing swirl
  vec3 p = q + aDir * uExplode;
  // a faint shimmer on layers without a still-solid state; solids stay still
  if (m < 0.5 || m > 1.5) p += 0.006 * vec3(sin(uTime * 1.3 + aSeed * 40.0), cos(uTime * 1.1 + aSeed * 31.0), sin(uTime * 0.9 + aSeed * 23.0));
  p += aRand * uScatter * 4.0;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  float hi = abs(aPart - uHi) < 0.5 ? 1.0 : 0.0;
  float sel = abs(aPart - uSel) < 0.5 ? 1.0 : 0.0;
  float tw = 0.82 + 0.18 * sin(uTime * 2.0 + aSeed * 60.0);
  float boost = max(hi, sel);
  gl_PointSize = uSize * uPR * (0.8 + 0.5 * fract(aSeed * 7.13)) * (1.0 + 0.7 * boost) * (${CAM_Z.toFixed(1)} / -mv.z);
  // boundaries: a slow pulse travels round the ring
  float pulse = m > 4.5 ? 0.55 + 0.9 * pow(0.5 + 0.5 * cos(atan(q.z, q.x) * 2.0 - uTime * 1.4), 6.0) : 1.0;
  vColor = mix(aColor * tw * pulse, vec3(1.0), 0.45 * boost);
  float visiblePart = uIsolate < 0.0 || abs(aPart - uIsolate) < 0.5 ? 1.0 : 0.0;
  // with a layer highlighted, the others fade back so it reads clearly
  float dim = uSel >= 0.0 && sel < 0.5 ? 0.3 : 1.0;
  // in a property view the coloured faces carry the data, so the dots step back
  // property views cut the Earth at the equator: everything above is hidden, so the coloured face lies open
  float cut = uProp > 0.5 && position.y + aDir.y > 0.012 ? 0.0 : 1.0;
  vA = (0.9 - 0.9 * uScatter) * (1.0 + 0.2 * boost) * visiblePart * dim * cut * (uProp > 0.5 ? 0.3 : 1.0);
  gl_Position = projectionMatrix * mv;
  gl_Position.xy += uPull * gl_Position.w;
}`;

// Solid cross-section faces: coloured by layer (uProp 0) or by view n (attribute cn, from faceColors)
const FACE_VERT = /* glsl */ `
attribute vec3 c0; attribute vec3 c1; attribute vec3 c2; attribute vec3 c3; attribute vec3 c4;
uniform float uExplode; uniform float uProp; uniform vec3 uDir; uniform vec2 uPull;
varying vec3 vC;
varying float vTop;
varying vec2 vXZ;
void main() {
  vTop = uDir.y > 0.0 ? 1.0 : 0.0;
  vXZ = position.xz;
  vC = uProp < 0.5 ? c0 : uProp < 1.5 ? c1 : uProp < 2.5 ? c2 : uProp < 3.5 ? c3 : uProp < 4.5 ? c4 : c0 * 0.25; // 5: earthquake view, layers dimmed under the rays
  vec4 mv = modelViewMatrix * vec4(position + uDir * uExplode, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_Position.xy += uPull * gl_Position.w;
}`;
const FACE_FRAG = /* glsl */ `
uniform float uProp; uniform float uScatter; uniform float uIsolate; uniform float uSel; uniform float uPart; uniform float uPropOnly;
varying vec3 vC;
varying float vTop;
varying vec2 vXZ;
uniform vec4 uFlow; // radii of the mantle top, 660 km, 1,000 km and the core-mantle boundary
uniform float uTime; uniform float uMotion; uniform float uConvect;
const float TAU = 6.2831853;
float gap(float a, float b) { return abs(mod(a - b + 3.14159265, TAU) - 3.14159265); }
float wave(float s) { return 0.7 + 0.5 * pow(0.5 + 0.5 * cos(TAU * s * 3.0), 2.0); }
// A sinking slab on the cut: a band at longitude lonS down to radius rFloor, then lying flat along it.
// Returns (strength, distance along the path from the top).
vec2 slab(float lon, float r, float lonS, float rFloor) {
  float down = smoothstep(0.075, 0.04, gap(lon, lonS)) * step(rFloor, r);
  float along = mod(lon - lonS, TAU);
  float lie = smoothstep(0.04, 0.02, abs(r - rFloor - 0.03)) * smoothstep(0.55, 0.4, along) * step(along, 1.0);
  return vec2(max(down, lie), down >= lie ? uFlow.x - r : uFlow.x - rFloor + along * r);
}
// A plume: a broad column rising from the core-mantle boundary, fading out at about 1,000 km depth.
vec2 plume(float lon, float r, float lonP) {
  return vec2(smoothstep(0.16, 0.09, gap(lon, lonP)) * (1.0 - smoothstep(uFlow.z - 0.04, uFlow.z + 0.04, r)), r - uFlow.w);
}
void main() {
  if (uPropOnly > 0.5 && uProp < 0.5) discard;
  if (uIsolate >= 0.0 && abs(uPart - uIsolate) > 0.5) discard;
  if (uProp > 0.5 && vTop > 0.5) discard; // the upper half's faces go with the cut
  float dim = uProp < 0.5 && uSel >= 0.0 && abs(uPart - uSel) > 0.5 ? 0.3 : 1.0; // property views show every face fully
  vec3 c = vC;
  float a = uProp < 0.5 ? 0.42 : 0.95;
  if (uConvect > 0.5 && uProp < 0.5) {
    // mantle, schematic: cold slabs sinking (Fukao & Obayashi 2013) and hot plumes rising (French & Romanowicz 2015).
    // Brightness travels down the slabs and up the plumes; speeds are not to scale.
    float r = length(vXZ), lon = atan(vXZ.y, vXZ.x), ft = uTime * uMotion * 0.05;
    vec2 k, sl = slab(lon, r, 0.4, uFlow.y);                        // stagnant above the 660
    k = slab(lon, r, 3.3, uFlow.y); if (k.x > sl.x) sl = k;          // stagnant above the 660
    k = slab(lon, r, 1.9, uFlow.z); if (k.x > sl.x) sl = k;          // trapped at 660-1,000 km
    k = slab(lon, r, 4.9, uFlow.w + 0.03); if (k.x > sl.x) sl = k;   // sinks into the deep lower mantle
    vec2 pl = plume(lon, r, 1.2);
    k = plume(lon, r, 2.7); if (k.x > pl.x) pl = k;
    k = plume(lon, r, 4.2); if (k.x > pl.x) pl = k;
    c = mix(c, vec3(0.42, 0.66, 1.0) * wave(sl.y - ft), sl.x);
    c = mix(c, vec3(1.0, 0.9, 0.55) * wave(pl.y - ft), pl.x);
    a = mix(a, 0.95, max(sl.x, pl.x));
  }
  gl_FragColor = vec4(c, a * (1.0 - uScatter) * dim);
}`;

const FRAG = /* glsl */ `
varying vec3 vColor;
varying float vA;
void main() {
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5 || vA <= 0.0) discard;
  float a = smoothstep(0.5, 0.05, d);
  gl_FragColor = vec4(vColor, a * vA);
}`;

/**
 * dists[i] = screen distance (px) from the cursor to part i. Returns the nearest part within maxDist,
 * except that `prefer` is kept while it stays within 1.25 x maxDist and no other part is clearly closer.
 */
export function chooseSticky(dists, maxDist, prefer = -1) {
  let w = -1;
  for (let i = 0; i < dists.length; i++) if (dists[i] < maxDist && (w < 0 || dists[i] < dists[w])) w = i;
  if (prefer < 0 || prefer === w || !(dists[prefer] < maxDist * 1.25)) return w;
  // shortcut: fixed 12 px / 30% switch margin, tuned on one webcam; revisit if hover feels sluggish
  if (w >= 0 && dists[prefer] - dists[w] > Math.max(12, dists[prefer] * 0.3)) return w;
  return prefer;
}

function hexRgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

export class HoloScene {
  /** motionOf(part) -> motion code for its dots (0 = default shimmer).
   *  faceColors(part, depthKm) -> ['#rrggbb' | null, ...]: the face colour in views 1..4 (null = the layer's colour). */
  constructor(canvas, models, buildArg, motionOf = () => 0, faceColors = () => ({})) {
    this.models = models;
    this.motionOf = motionOf;
    this.faceColors = faceColors;
    this.buildArg = buildArg; // passed to every model's build(), e.g. the level
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setClearColor(0x000000, 0);
    this.camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100);
    this.camera.position.set(0, 0, CAM_Z);
    this.scene = new THREE.Scene();
    this.group = new THREE.Group();
    this.scene.add(this.group);

    this.uniforms = {
      uExplode: { value: 0 },
      uTime: { value: 0 },
      uSize: { value: 2.7 },
      uPR: { value: 1 },
      uScatter: { value: 1 },
      uHi: { value: -1 },
      uSel: { value: -1 },
      uIsolate: { value: -1 },
      uPull: { value: new THREE.Vector2() },
      // reduced-motion settings switch the state animation off
      uMotion: { value: matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 0 : 1 },
      uFlow: { value: new THREE.Vector4() }, // set by the model (main.js)
      uProp: { value: 0 }, // 0 layers, 1..4 the property views (ui/propertyView.js)
    };
    this.material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms: this.uniforms,
      transparent: true,
      depthWrite: false,
      depthTest: true, // dots behind a solid face are hidden
      blending: THREE.AdditiveBlending,
    });

    // live state
    this.explode = 0;
    this.explodeTarget = 0;
    this.intensity = 1;
    this.rot = { x: 0, y: 0, z: 0 };
    this.vel = { x: 0, y: 0 };
    this.scale = 1;
    this.scaleTarget = 1;
    this.holdVel = false; // true while a hand / mouse is steering the rotation
    this.autoSpin = true;
    this.idle = 0; // seconds since last interaction
    this.scatterTarget = 0;
    this.pending = -1;
    this.index = -1;
    this.hover = -1;
    this.sel = -1;
    this.shift = 0;
    this.pullTarget = new THREE.Vector2();
    this.cache = new Map();
    this.onModel = null;

    this.resize();
    addEventListener('resize', () => this.resize());
    this._load(0);
  }

  get partCount() {
    return this.parts.length;
  }
  get shownExplode() {
    return this.explode * this.intensity;
  }

  resize() {
    const W = innerWidth, H = innerHeight;
    this.W = W;
    this.H = H;
    this.renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    this.renderer.setSize(W, H, false);
    this.camera.aspect = W / H;
    this.camera.updateProjectionMatrix();
    this.uniforms.uPR.value = this.renderer.getPixelRatio();
    const unitsPerPx = (2 * Math.tan((FOV * Math.PI) / 360) * CAM_Z) / H;
    const panel = W > 900 ? 300 : 0;
    this.shift = (panel / 2) * unitsPerPx;
  }

  // ------------------------------------------------------------------ models
  _geometry(i) {
    if (this.cache.has(i)) return this.cache.get(i);
    const def = this.models[i];
    const parts = def.build(this.buildArg);
    if (parts.length > MAXP) throw new Error(`${def.name} has ${parts.length} parts; the scene supports at most ${MAXP}`);
    let total = 0;
    for (const p of parts) for (const inst of p.instances) total += inst.cloud.n;

    // centre on the middle of (assembled + exploded) bounds
    const mn = [1e9, 1e9, 1e9], mx = [-1e9, -1e9, -1e9];
    const mn2 = [1e9, 1e9, 1e9], mx2 = [-1e9, -1e9, -1e9];
    for (const p of parts)
      for (const inst of p.instances) {
        const q = inst.cloud.p;
        for (let k = 0; k < q.length; k += 3)
          for (let a = 0; a < 3; a++) {
            const v = q[k + a];
            const w = v + inst.dir[a];
            if (v < mn[a]) mn[a] = v;
            if (v > mx[a]) mx[a] = v;
            if (w < mn2[a]) mn2[a] = w;
            if (w > mx2[a]) mx2[a] = w;
          }
      }
    const c = [0, 1, 2].map((a) => (mn[a] + mx[a] + mn2[a] + mx2[a]) / 4);

    const pos = new Float32Array(total * 3);
    const dir = new Float32Array(total * 3);
    const col = new Float32Array(total * 3);
    const part = new Float32Array(total);
    const rnd = new Float32Array(total * 3);
    const seed = new Float32Array(total);
    const motion = new Float32Array(total);
    let maxR = 0;
    let k = 0;
    const meta = [];
    parts.forEach((p, pi) => {
      const rgb = hexRgb(p.color);
      const mo = this.motionOf(p);
      const anchors = [];
      const samples = [];
      p.instances.forEach((inst) => {
        anchors.push({ a: [inst.anchor[0] - c[0], inst.anchor[1] - c[1], inst.anchor[2] - c[2]], d: inst.dir });
        const q = inst.cloud.p;
        const n = q.length / 3;
        for (let i = 0; i < n; i++, k++) {
          const x = q[i * 3] - c[0], y = q[i * 3 + 1] - c[1], z = q[i * 3 + 2] - c[2];
          pos.set([x, y, z], k * 3);
          dir.set(inst.dir, k * 3);
          const br = 0.78 + 0.32 * Math.random();
          col.set([rgb[0] * br, rgb[1] * br, rgb[2] * br], k * 3);
          part[k] = pi;
          const rr = Math.random(), tt = Math.random() * Math.PI * 2, uu = Math.random() * 2 - 1;
          const s = Math.sqrt(1 - uu * uu);
          rnd.set([s * Math.cos(tt) * rr, uu * rr, s * Math.sin(tt) * rr], k * 3);
          seed[k] = Math.random();
          motion[k] = mo;
          maxR = Math.max(maxR, Math.hypot(x + inst.dir[0], y + inst.dir[1], z + inst.dir[2]));
          if (inst.pickable !== false && Math.random() < 160 / Math.max(160, n)) samples.push(x, y, z, inst.dir[0], inst.dir[1], inst.dir[2]);
        }
      });
      meta.push({ id: p.id, kind: p.kind, name: p.name, desc: p.desc, color: p.color, anchors, samples: new Float32Array(samples) });
    });

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('aDir', new THREE.BufferAttribute(dir, 3));
    geo.setAttribute('aColor', new THREE.BufferAttribute(col, 3));
    geo.setAttribute('aPart', new THREE.BufferAttribute(part, 1));
    geo.setAttribute('aRand', new THREE.BufferAttribute(rnd, 3));
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
    geo.setAttribute('aMotion', new THREE.BufferAttribute(motion, 1));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 50);
    const faces = [];
    parts.forEach((p, pi) => p.instances.forEach((inst) => inst.face && faces.push(this._face(p, pi, inst, c))));
    const entry = { geo, meta, faces, fit: FIT / Math.max(0.5, maxR), count: total };
    this.cache.set(i, entry);
    return entry;
  }

  /** A flat annulus mesh through the layer's samples, one colour set per view, moving with its instance. */
  _face(p, pi, inst, c) {
    const { rings, y, a0 = 0, a1 = Math.PI * 2, propOnly = false } = inst.face;
    const SEG = Math.max(8, Math.round((128 * (a1 - a0)) / (Math.PI * 2)));
    const pos = [], cols = [[], [], [], [], []], idx = [];
    const layer = hexRgb(p.color);
    for (const [r, km] of rings) {
      const fc = [null, ...this.faceColors(p, km)].map((h) => (h ? hexRgb(h) : layer));
      for (let k = 0; k <= SEG; k++) {
        const a = a0 + ((a1 - a0) * k) / SEG;
        pos.push(r * Math.cos(a) - c[0], y - c[1], r * Math.sin(a) - c[2]);
        cols.forEach((list, v) => list.push(...fc[v]));
      }
    }
    for (let j = 0; j < rings.length - 1; j++)
      for (let k = 0; k < SEG; k++) {
        const a = j * (SEG + 1) + k, b = a + SEG + 1;
        idx.push(a, b, a + 1, a + 1, b, b + 1);
      }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    cols.forEach((v, k) => geo.setAttribute(`c${k}`, new THREE.Float32BufferAttribute(v, 3)));
    geo.setIndex(idx);
    const u = this.uniforms;
    const mat = new THREE.ShaderMaterial({
      vertexShader: FACE_VERT,
      fragmentShader: FACE_FRAG,
      uniforms: { uExplode: u.uExplode, uProp: u.uProp, uPull: u.uPull, uScatter: u.uScatter, uIsolate: u.uIsolate, uSel: u.uSel, uDir: { value: new THREE.Vector3(...inst.dir) }, uPart: { value: pi }, uPropOnly: { value: propOnly ? 1 : 0 }, uTime: u.uTime, uMotion: u.uMotion, uFlow: u.uFlow, uConvect: { value: this.motionOf(p) === 3 ? 1 : 0 } },
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: true,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.frustumCulled = false;
    mesh.renderOrder = -1; // faces first, so the dots in front blend over them
    return mesh;
  }

  _load(i) {
    const g = this._geometry(i);
    if (this.points) this.group.remove(this.points);
    if (this.faces) this.group.remove(...this.faces);
    this.faces = g.faces;
    if (g.faces.length) this.group.add(...g.faces);
    this.points = new THREE.Points(g.geo, this.material);
    this.points.frustumCulled = false;
    this.group.add(this.points);
    this.parts = g.meta;
    this.fit = g.fit;
    this.count = g.count;
    this.index = i;
    this.hover = -1;
    this.sel = -1;
    this.uniforms.uHi.value = -1;
    this.uniforms.uSel.value = -1;
    this.isolate();
    if (!this.keepView) {
      const v = this.models[i].view;
      this.rot.x = v.x;
      this.rot.y = v.y;
      this.rot.z = v.z;
      this.vel.x = this.vel.y = 0;
    }
    this.keepView = false;
    this.scatterTarget = 0;
    if (this.onModel) this.onModel(i, this.models[i], g);
  }

  setModel(i) {
    const n = this.models.length;
    i = ((i % n) + n) % n;
    if (i === this.index && this.pending < 0) return;
    this.pending = i;
    this.scatterTarget = 1;
  }
  /** Rebuild model i with a new build argument (e.g. level), keeping view, zoom and explode. onModel fires when done. */
  reload(i, buildArg) {
    this.isolate();
    this.buildArg = buildArg;
    this.cache.clear();
    this.keepView = true;
    this.pending = i;
    this.scatterTarget = 1;
  }
  next(d = 1) {
    this.setModel((this.pending >= 0 ? this.pending : this.index) + d);
  }

  // ------------------------------------------------------------------ interaction API
  setHover(i) {
    this.hover = i;
    this.uniforms.uHi.value = i;
  }
  setSel(i) {
    this.sel = i;
    this.uniforms.uSel.value = i;
  }
  isolate(i = -1) {
    if (i === this.isolatedPart) return;
    this.uniforms.uIsolate.value = i;
    this.uniforms.uPull.value.set(0, 0);
    this.pullTarget.set(0, 0);
  }
  get isolatedPart() {
    return this.uniforms.uIsolate.value;
  }
  rotateBy(dyaw, dpitch, dt = 1 / 60) {
    this.rot.y += dyaw;
    this.rot.x = clamp(this.rot.x + dpitch, -1.4, 1.4);
    this.vel.y += (dyaw / Math.max(dt, 0.008) - this.vel.y) * 0.3;
    this.vel.x += (dpitch / Math.max(dt, 0.008) - this.vel.x) * 0.3;
    this.idle = 0;
  }
  rollBy(d) {
    this.rot.z = clamp(this.rot.z + d, -1.2, 1.2);
    this.idle = 0;
  }
  zoomBy(f) {
    this.scaleTarget = clamp(this.scaleTarget * f, 0.5, 2.6);
  }
  resetView() {
    const v = this.models[this.index].view;
    this.rot.x = v.x;
    this.rot.y = v.y;
    this.rot.z = v.z;
    this.vel.x = this.vel.y = 0;
    this.scaleTarget = 1;
    this.isolate();
    this.setSel(-1);
  }
  /** Screen-space movement remains stable while turning or zooming the isolated part. */
  dragPart(dx, dy) {
    if (this.isolatedPart < 0) return;
    this.pullTarget.x = clamp(this.pullTarget.x + 2 * dx / this.W, -0.4, 0.4);
    this.pullTarget.y = clamp(this.pullTarget.y - 2 * dy / this.H, -0.42, 0.42);
    this.idle = 0;
  }
  pullAside() {
    this.pullTarget.set(this.W > 600 ? 0.2 : 0, this.W > 600 ? 0 : 0.32);
  }

  // ------------------------------------------------------------------ projection
  _toScreen(local, out) {
    out.set(local[0], local[1], local[2]).applyMatrix4(this.group.matrixWorld).project(this.camera);
    const pull = this.uniforms.uPull.value;
    return { x: ((out.x + pull.x) * 0.5 + 0.5) * this.W, y: (-(out.y + pull.y) * 0.5 + 0.5) * this.H, z: out.z };
  }

  /** Nearest part to a screen point (px), or -1. With `prefer`, that part is kept until another is clearly closer. */
  pick(px, py, maxDist = 100, prefer = -1) {
    const e = this.shownExplode;
    const v = new THREE.Vector3();
    const dists = this.parts.map(() => Infinity);
    const isolated = this.isolatedPart;
    this.group.updateMatrixWorld(true);
    this.parts.forEach((p, i) => {
      if (isolated >= 0 && i !== isolated) return;
      const s = p.samples;
      for (let k = 0; k < s.length; k += 6) {
        const sp = this._toScreen([s[k] + s[k + 3] * e, s[k + 1] + s[k + 4] * e, s[k + 2] + s[k + 5] * e], v);
        dists[i] = Math.min(dists[i], Math.hypot(sp.x - px, sp.y - py));
      }
    });
    return chooseSticky(dists, maxDist, prefer);
  }

  /** Screen position of each part's label anchor. */
  labelPoints() {
    const e = this.shownExplode;
    const v = new THREE.Vector3();
    this.group.updateMatrixWorld(true);
    const isolated = this.isolatedPart;
    return this.parts.map((p, i) => {
      const { a, d } = p.anchors[0];
      const s = this._toScreen([a[0] + d[0] * e, a[1] + d[1] * e, a[2] + d[2] * e], v);
      return { i, x: s.x, y: s.y, name: p.name, color: p.color };
    }).filter((p) => isolated < 0 || p.i === isolated);
  }
  centerScreen() {
    const v = new THREE.Vector3();
    this.group.updateMatrixWorld(true);
    return this._toScreen([0, 0, 0], v);
  }

  // ------------------------------------------------------------------ frame
  update(dt, t) {
    this.idle += dt;
    this.explode = damp(this.explode, this.explodeTarget, 5, dt);
    this.scale = damp(this.scale, this.scaleTarget, 6, dt);

    // scatter transition between models
    this.uniforms.uScatter.value = damp(this.uniforms.uScatter.value, this.scatterTarget, this.scatterTarget ? 7 : 3.2, dt);
    if (this.pending >= 0 && this.uniforms.uScatter.value > 0.97) {
      const i = this.pending;
      this.pending = -1;
      this._load(i);
      this.scatterTarget = 0;
      this.uniforms.uScatter.value = 1;
    }

    if (!this.holdVel) {
      this.rot.y += this.vel.y * dt;
      this.rot.x = clamp(this.rot.x + this.vel.x * dt, -1.4, 1.4);
      const k = Math.exp(-2.6 * dt);
      this.vel.x *= k;
      this.vel.y *= k;
      if (this.autoSpin && this.idle > 2.0 && Math.hypot(this.vel.x, this.vel.y) < 0.05) this.rot.y += 0.14 * dt;
    }

    this.uniforms.uPull.value.lerp(this.pullTarget, 1 - Math.exp(-12 * dt));

    this.uniforms.uExplode.value = this.explode * this.intensity;
    this.uniforms.uTime.value = t;
    this.group.rotation.set(this.rot.x, this.rot.y, this.rot.z, 'YXZ');
    this.group.scale.setScalar(this.fit * this.scale);
    this.group.position.x = this.shift;
    this.group.updateMatrixWorld(true);
    this.renderer.render(this.scene, this.camera);
  }
}
