// Self-check for the gesture classifier using synthetic hands. Run: npm test
import assert from 'node:assert/strict';
import { GestureEngine } from '../src/gestureEngine.js';

const WRIST = { x: 0.5, y: 0.8 };
const MCP_X = [0.46, 0.5, 0.54, 0.58]; // index, middle, ring, pinky knuckles
const MCP_Y = 0.62;

/** ratios = fingertip-to-wrist / knuckle-to-wrist per finger; thumbGap = thumb-tip to index-tip in hand sizes */
function hand(ratios, thumbGap = 1) {
  const L = Array.from({ length: 21 }, () => ({ x: WRIST.x, y: WRIST.y, z: 0 }));
  const along = (mx, r) => ({ x: WRIST.x + (mx - WRIST.x) * r, y: WRIST.y + (MCP_Y - WRIST.y) * r, z: 0 });
  [5, 9, 13, 17].forEach((m, f) => {
    L[m] = along(MCP_X[f], 1);
    L[m + 1] = along(MCP_X[f], 1.2);
    L[m + 2] = along(MCP_X[f], (1.2 + ratios[f]) / 2);
    L[m + 3] = along(MCP_X[f], ratios[f]);
  });
  const size = Math.hypot(L[9].x - L[0].x, L[9].y - L[0].y);
  [1, 2, 3].forEach((i) => (L[i] = { x: 0.42 - i * 0.02, y: 0.74 - i * 0.03, z: 0 }));
  L[4] = { x: L[8].x - thumbGap * size, y: L[8].y, z: 0 };
  // flat hand: world (3D) landmarks match the image ones
  return { landmarks: L, world: L.map((p) => ({ ...p })), score: 0.9, label: 'Right' };
}

/** Index finger pointing at the camera: short in the image, long in 3D (z). Other fingers curled. */
function pointAtCamera() {
  const h = hand([DOWN, DOWN, DOWN, DOWN]);
  const k = h.world[5], d = Math.hypot(k.x - WRIST.x, k.y - WRIST.y);
  [6, 7, 8].forEach((i, n) => {
    h.landmarks[i] = { x: k.x, y: k.y - 0.01 * (n + 1), z: 0 }; // barely moves in the image
    h.world[i] = { x: k.x, y: k.y, z: -d * 0.5 * (n + 1) }; // reaches toward the camera (3D tip ratio ~1.8)
  });
  return h;
}

const identity = (p) => ({ x: p.x, y: p.y });
/** Same hand moved right by dx in the image (and in 3D). */
const shifted = (h, dx) => ({ ...h, landmarks: h.landmarks.map((p) => ({ ...p, x: p.x + dx })), world: h.world.map((p) => ({ ...p, x: p.x + dx })) });
const UP = 1.7, DOWN = 1.1;

/** Feeds frames (each an array of hands) and returns the stable gesture of the first hand per frame. */
function run(frames, engine = new GestureEngine()) {
  return frames.map((hands, k) => engine.update(hands, (k + 1) / 30, identity, 1).hands);
}
const gestures = (out) => out.map((hs) => hs[0]?.gesture);
const repeat = (n, h) => Array.from({ length: n }, () => [h]);
const firstAt = (seq, g) => seq.indexOf(g) + 1;

const results = [];
function check(name, fn) {
  try {
    fn();
    results.push(['ok  ', name]);
  } catch (e) {
    results.push(['FAIL', `${name}: ${e.message.split('\n')[0]}`]);
  }
}

check('open palm -> OPEN within 3 frames', () => {
  const seq = gestures(run(repeat(10, hand([UP, UP, UP, UP]))));
  assert.equal(seq.at(-1), 'OPEN');
  assert.ok(firstAt(seq, 'OPEN') <= 3);
});
check('fist -> FIST', () => assert.equal(gestures(run(repeat(10, hand([DOWN, DOWN, DOWN, DOWN])))).at(-1), 'FIST'));
check('index only -> POINT', () => assert.equal(gestures(run(repeat(10, hand([UP, DOWN, DOWN, DOWN])))).at(-1), 'POINT'));
check('index + middle -> PEACE within 10 frames', () => {
  const seq = gestures(run(repeat(12, hand([UP, UP, DOWN, DOWN]))));
  assert.equal(seq.at(-1), 'PEACE');
  assert.ok(firstAt(seq, 'PEACE') <= 10);
});
check('thumb on index tip with index up -> POINT (pinch is not a gesture)', () => {
  assert.equal(gestures(run(repeat(8, hand([UP, DOWN, DOWN, DOWN], 0.05)))).at(-1), 'POINT');
});

// Regressions seen in the live test (2026-11-22)
check('index pointing at the camera -> POINT (3D, not FIST)', () => {
  assert.equal(gestures(run(repeat(10, pointAtCamera()))).at(-1), 'POINT');
});
// Measured live (2026-11-22): pointing at the screen gave index 1.42, others ~0.8, thumb 0.25 from index tip
check('half-extended index with curled others and thumb at 0.25 -> POINT', () => {
  assert.equal(gestures(run(repeat(10, hand([1.42, 0.78, 0.69, 0.82], 0.25)))).at(-1), 'POINT');
});
check('open hand with one finger wobbling at 1.42-1.48 stays OPEN', () => {
  const frames = repeat(5, hand([UP, UP, UP, UP]));
  for (let k = 0; k < 20; k++) frames.push([hand([UP, k % 2 ? 1.42 : 1.48, UP, UP])]);
  const seq = gestures(run(frames)).slice(5);
  assert.ok(seq.every((g) => g === 'OPEN'), seq.join(','));
});
check('peace with loosely curled ring/pinky (1.38) -> PEACE', () => {
  assert.equal(gestures(run(repeat(12, hand([UP, UP, 1.38, 1.38])))).at(-1), 'PEACE');
});
check('second hand lost for one frame is still reported (held)', () => {
  const a = hand([UP, UP, UP, UP]), b = { ...shifted(hand([UP, UP, UP, UP]), 0.4), label: 'Left' };
  const out = run([[a, b], [a, b], [a, b], [a]]);
  assert.equal(out.at(-1).length, 2);
  assert.ok(out.at(-1).some((h) => h.held));
});

// MediaPipe often flips a hand's Left/Right label between frames; the hand must stay the same hand
const flip = (h, k) => ({ ...h, label: k % 2 ? 'Left' : 'Right' });
check('one hand whose label flips keeps its gesture (POINT)', () => {
  const out = run(Array.from({ length: 20 }, (_, k) => [flip(hand([UP, DOWN, DOWN, DOWN]), k)]));
  const seq = gestures(out).slice(4);
  assert.ok(seq.every((g) => g === 'POINT'), seq.join(','));
});
check('one hand whose label flips is never reported as two', () => {
  const out = run(Array.from({ length: 20 }, (_, k) => [flip(hand([UP, UP, UP, UP]), k)]));
  assert.ok(out.every((hs) => hs.length === 1), out.map((hs) => hs.length).join(','));
});
check('two hands keep their own ids when their labels swap', () => {
  const a = hand([UP, UP, UP, UP]), b = shifted(hand([DOWN, DOWN, DOWN, DOWN]), 0.4);
  const out = run(Array.from({ length: 12 }, (_, k) => [flip(a, k), flip(b, k + 1)]));
  const byPos = (hs) => [...hs].sort((p, q) => p.palm.x - q.palm.x).map((h) => h.id).join();
  assert.equal(byPos(out.at(-1)), byPos(out[3]));
  assert.deepEqual([...out.at(-1)].sort((p, q) => p.palm.x - q.palm.x).map((h) => h.gesture), ['OPEN', 'FIST']);
});

// Part selection: sticky hover
const { chooseSticky } = await import('../src/scene.js');
check('picks the nearest part within range', () => assert.equal(chooseSticky([40, 10, 30], 95), 1));
check('nothing within range -> -1', () => assert.equal(chooseSticky([120, 200], 95), -1));
check('keeps the highlighted part when another is only slightly closer', () => assert.equal(chooseSticky([20, 14], 95, 0), 0));
check('switches when another part is clearly closer', () => assert.equal(chooseSticky([40, 10], 95, 0), 1));
check('keeps the highlighted part just past the range edge', () => assert.equal(chooseSticky([105, 200], 95, 0), 0));
check('drops the highlighted part well outside range', () => assert.equal(chooseSticky([130, 50], 95, 0), 1));

for (const [s, n] of results) console.log(s, n);
const failed = results.filter(([s]) => s === 'FAIL').length;
console.log(`\n${results.length - failed}/${results.length} passed`);
process.exit(failed ? 1 : 0);
