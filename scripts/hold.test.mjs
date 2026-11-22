import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { Hold, HOLD_S } from '../src/hold.js';

const DT = 1 / 60;
/** Runs `secs` of frames: shape(k) gives the gesture, palm(k) the palm; camera images every 2nd frame. Returns fired shapes. */
function feed(hold, secs, shape, palm = () => ({ x: 0.5, y: 0.5 }), t0 = 0) {
  const fired = [];
  const n = Math.round(secs / DT);
  for (let k = 0; k < n; k++) {
    const f = hold.update(shape(k), palm(k), t0 + k * DT, DT, k % 2 === 0);
    if (f) fired.push(f);
  }
  return fired;
}
const still = (g) => () => g;

/** Replays a recorded run (rows [t, gesture, palmX, palmY], one per camera image). */
async function replay(name) {
  const { rows } = JSON.parse(await readFile(new URL(`./fixtures/${name}`, import.meta.url)));
  const h = new Hold(), fired = [];
  rows.forEach(([t, g, x, y], k) => {
    const f = h.update(g, { x, y }, t, k ? t - rows[k - 1][0] : DT, true);
    if (f) fired.push(f);
  });
  return fired;
}

test('a peace sign held still fires once, after its hold time', () => {
  const h = new Hold();
  assert.deepEqual(feed(h, HOLD_S.PEACE - 0.1, still('PEACE')), []);
  assert.deepEqual(feed(h, 2, still('PEACE'), undefined, HOLD_S.PEACE), ['PEACE']);
});

test('a moving peace sign never fires', () => {
  assert.deepEqual(feed(new Hold(), 3, still('PEACE'), (k) => ({ x: 0.2 + 0.005 * k, y: 0.5 })), []);
});

test('fist, point, pinch, open or loose hands never fire', () => {
  for (const g of ['FIST', 'POINT', 'PINCH', 'OPEN', 'NONE']) assert.deepEqual(feed(new Hold(), 3, still(g)), [], g);
});

test('a one-frame misread does not restart the hold', () => {
  assert.deepEqual(feed(new Hold(), HOLD_S.PEACE + 0.2, (k) => (k === 20 ? 'NONE' : 'PEACE')), ['PEACE']);
});

test('drop the peace sign and make it again: fires again', () => {
  const shape = (k) => (k * DT < 1 ? 'PEACE' : k * DT < 1.5 ? 'FIST' : 'PEACE');
  assert.deepEqual(feed(new Hold(), 2.5, shape), ['PEACE', 'PEACE']);
});

test('live run: four peace signs dropped into fists fire four peaces', async () => {
  assert.deepEqual(await replay('hold-peace-drop-2026-11-22.json'), ['PEACE', 'PEACE', 'PEACE', 'PEACE']);
});

test('live run: pointing, pinching and curling into a fist fire nothing', async () => {
  assert.deepEqual(await replay('hold-point-to-fist-2026-11-22.json'), []);
});
