import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildEarth } from '../src/models/earth.js';
import { EARTH } from '../src/content/earth/index.js';

for (const lv of ['alevel', 'undergrad', 'postgrad']) {
  test(`${lv}: model parts match the content`, () => {
    const parts = buildEarth(lv);
    assert.deepEqual(parts.map((p) => p.id).sort(), EARTH[lv].parts.map((p) => p.id).sort());
    assert.ok(parts.length <= 24);
  });
  test(`${lv}: boundaries never fly apart`, () => {
    for (const p of buildEarth(lv).filter((p) => p.kind === 'boundary')) assert.ok(p.instances.every((i) => i.dir.every((v) => v === 0)), p.id);
  });
  test(`${lv}: every part has points`, () => {
    for (const p of buildEarth(lv)) assert.ok(p.instances.reduce((n, i) => n + i.cloud.n, 0) > 0, p.id + ' has no points');
  });
  test(`${lv}: names come from the content`, () => {
    const titles = Object.fromEntries(EARTH[lv].parts.map((p) => [p.id, p.title]));
    for (const p of buildEarth(lv)) assert.equal(p.name, titles[p.id]);
  });
}
test('same level builds the same points every time', () => {
  const a = buildEarth('undergrad')[0].instances[0].cloud.p, b = buildEarth('undergrad')[0].instances[0].cloud.p;
  assert.deepEqual(Array.from(a.slice(0, 30)), Array.from(b.slice(0, 30)));
});

import { GEOMETRY, drawnDepth } from '../src/models/earth.js';
import { NUMBERS } from '../src/content/earth/numbers.js';
test('geometry follows the cited depths (PREM Table I, ak135 Table 3)', () => {
  assert.deepEqual(GEOMETRY.lab, [80, 80]);
  assert.deepEqual(GEOMETRY.asthenosphere, [80, 220]);
  assert.deepEqual(GEOMETRY['upper-mantle'], [220, 410]);
  assert.deepEqual(GEOMETRY['d-double-prime'], [2741, 2891]);
  assert.deepEqual(GEOMETRY.icb, [5149.5, 5149.5]);
  assert.deepEqual(GEOMETRY['outer-core'], [2891, 5149.5]);
});
test('every part at every level has its numbers entry', () => {
  for (const lv of ['alevel', 'undergrad', 'postgrad'])
    for (const p of EARTH[lv].parts) assert.ok(Array.isArray(NUMBERS[lv][p.id]), `${lv}/${p.id}`);
});
test('parts with no source in hand are not shown', () => {
  for (const lv of ['alevel', 'undergrad', 'postgrad']) assert.ok(!EARTH[lv].parts.some((p) => p.id === 'innermost-inner-core'), lv);
});
test('LLSVPs are postgrad only, with cited numbers', () => {
  assert.ok(EARTH.postgrad.parts.some((p) => p.id === 'llsvp'));
  assert.ok(!EARTH.undergrad.parts.some((p) => p.id === 'llsvp'));
  assert.ok(NUMBERS.postgrad.llsvp.length > 0);
});
test('every crust part and the Moho show cited numbers at every level', () => {
  for (const lv of ['alevel', 'undergrad', 'postgrad'])
    for (const p of EARTH[lv].parts.filter((p) => /crust|moho/.test(p.id))) assert.ok(NUMBERS[lv][p.id].length > 0, `${lv}/${p.id}`);
});
test('oceanic crust drawn at White et al. thickness', () => assert.deepEqual(GEOMETRY['oceanic-crust'], [0, 7]));
test('LLSVPs drawn at Garnero et al. size: ±45° caps on the CMB, at most 1,200 km tall', () => {
  const llsvp = buildEarth('postgrad').find((p) => p.id === 'llsvp');
  const KM = (d) => 1.6 * (1 - drawnDepth(d) / 6371), rCmb = KM(2891), top = KM(2891 - 1200);
  for (const inst of llsvp.instances) {
    const p = inst.cloud.p;
    for (let i = 0; i < p.length; i += 3) {
      const r = Math.hypot(p[i], p[i + 2]);
      assert.ok(r >= rCmb - 1e-9 && r <= top + 1e-9, `radius ${r}`);
    }
  }
  assert.equal(llsvp.instances.length, 2);
});
test('boundaries are picked only by their cross-section ring', () => {
  for (const lv of ['alevel', 'undergrad', 'postgrad'])
    for (const p of buildEarth(lv).filter((p) => p.kind === 'boundary')) {
      const pickable = p.instances.filter((i) => i.pickable !== false);
      assert.equal(pickable.length, 1, p.id);
      const q = pickable[0].cloud.p;
      for (let i = 1; i < q.length; i += 3) assert.ok(Math.abs(q[i]) < 0.02, `${lv}/${p.id} y=${q[i]}`);
    }
});
