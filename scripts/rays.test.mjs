import { test } from 'node:test';
import assert from 'node:assert/strict';
import { traceRay, shadowZones, quakeFacts, QUAKE_FACTS } from '../src/content/earth/rays.js';

const z = shadowZones();

test('P shadow zone comes out of PREM between roughly 98 and 142 degrees', () => {
  assert.ok(z.p[0] > 95 && z.p[0] < 105, `mantle P reaches ${z.p[0]}`);
  assert.ok(z.p[1] > 135 && z.p[1] < 148, `core P lands from ${z.p[1]}`);
});

test('S waves stop at the liquid outer core, so none arrive far beyond 100 degrees', () => {
  assert.ok(z.s > 95 && z.s < 110, `S reaches ${z.s}`);
  const steep = traceRay(0.2, 'S');
  assert.ok(steep.stopped && Math.abs(steep.pts.at(-1)[0] - 3480) < 5, 'a steep S ray ends at the core-mantle boundary');
});

test('a P wave reaches 74 degrees in about 11.5 minutes', () => {
  const r = traceRay(0.3, 'P');
  assert.ok(Math.abs(r.dist - 74.4) < 1);
  assert.ok(Math.abs(r.pts.at(-1)[2] - 690) < 30, `${r.pts.at(-1)[2]} s`);
});

test('the shadow-zone numbers shown on the page match the calculation', () => {
  assert.deepEqual(quakeFacts(), QUAKE_FACTS);
});

test('P travel times match: 90 degrees in about 13 minutes', () => {
  let best = null;
  for (let a = 14; a < 18; a += 0.01) {
    const r = traceRay((a * Math.PI) / 180, 'P');
    if (!best || Math.abs(r.dist - 90) < Math.abs(best.dist - 90)) best = r;
  }
  assert.ok(Math.abs(best.pts.at(-1)[2] - 780) < 15, `${best.pts.at(-1)[2]} s`);
});
