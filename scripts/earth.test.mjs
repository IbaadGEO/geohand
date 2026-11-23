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
test('innermost inner core is postgrad only, 300 km radius (Ishii & Dziewoński)', () => {
  assert.ok(EARTH.postgrad.parts.some((p) => p.id === 'innermost-inner-core'));
  assert.ok(!EARTH.undergrad.parts.some((p) => p.id === 'innermost-inner-core'));
  assert.equal(6371 - GEOMETRY['innermost-inner-core'][0], 300);
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

test('no gap under oceanic crust: lithospheric mantle and Moho follow the crust above them', () => {
  const KM = (d) => 1.6 * (1 - drawnDepth(d) / 6371), tol = 0.004;
  const parts = buildEarth('undergrad');
  const pts = (id) => parts.find((p) => p.id === id).instances.flatMap((i) => [...Array(i.cloud.n)].map((_, k) => i.cloud.p.slice(k * 3, k * 3 + 3)));
  const r = ([x, y, z]) => Math.hypot(x, y, z), cont = ([x, , z]) => x > 0 && z < 0;
  const lm = pts('lithospheric-mantle');
  assert.ok(lm.some((p) => !cont(p) && Math.abs(r(p) - KM(7)) < tol), 'lithospheric mantle reaches the oceanic Moho');
  assert.ok(!lm.some((p) => cont(p) && r(p) > KM(35) + tol), 'none of it inside continental crust');
  const moho = pts('moho').filter((p) => Math.abs(p[1]) < 0.02 && Math.abs(p[0]) > 0.05 && Math.abs(p[2]) > 0.05);
  assert.ok(moho.every((p) => Math.abs(r(p) - (cont(p) ? KM(35) : KM(7))) < tol), 'Moho ring at 7 km under oceans, 35 km under continents');
});

import { KM } from '../src/models/earth.js';
import { LAB_CRATON_KM } from '../src/content/earth/lab.js';
for (const lv of ['undergrad', 'postgrad']) {
  test(`${lv}: the LAB ring follows plate age under oceans and ~200 km under the continent (Fischer et al. 2010)`, () => {
    const parts = buildEarth(lv), ring = parts.find((p) => p.id === 'lab-measured').instances[0].cloud;
    const prem = parts.find((p) => p.id === 'lab').instances[0].cloud; // PREM lid base stays at 80 km
    for (let i = 0; i < prem.n * 3; i += 3) assert.ok(Math.abs(Math.hypot(prem.p[i], prem.p[i + 2]) - KM(80)) < 1e-6);
    const p = ring.p, cont = [], ocean = [];
    for (let i = 0; i < ring.n * 3; i += 3) {
      const r = Math.hypot(p[i], p[i + 2]);
      const wedge = p[i] > 1e-6 && p[i + 2] < -1e-6;
      (wedge ? cont : ocean).push(r);
    }
    assert.ok(cont.length > 20 && ocean.length > 20);
    for (const r of cont) assert.ok(Math.abs(r - KM(LAB_CRATON_KM)) < 0.002, `continental point at ${r}`);
    // ocean points sit between 82 and 55 km, plus the radial joins at the two margins, which reach down to 200 km
    for (const r of ocean) assert.ok(r <= KM(55) + 0.002 && r >= KM(LAB_CRATON_KM) - 0.002, `ocean point at ${r}`);
    assert.ok(ocean.some((r) => Math.abs(r - KM(55)) < 0.003) && ocean.some((r) => Math.abs(r - KM(82)) < 0.003));
  });
}

test('520 km boundary: drawn at Advanced only, at the Frost (2008) depth', () => {
  assert.deepEqual(GEOMETRY.d520, [520, 520]);
  assert.ok(buildEarth('postgrad').some((p) => p.id === 'd520' && p.kind === 'boundary'));
  assert.ok(!buildEarth('undergrad').some((p) => p.id === 'd520'));
});
test('post-perovskite: Advanced only, between 2,700 km (Murakami et al. 2004) and the CMB', () => {
  const pp = buildEarth('postgrad').find((p) => p.id === 'post-perovskite');
  assert.ok(pp);
  for (const inst of pp.instances) {
    const q = inst.cloud.p;
    for (let i = 0; i < inst.cloud.n * 3; i += 3) {
      const r = Math.hypot(q[i], q[i + 2]); // radius on the cut; the dots sit just above it
      assert.ok(r >= KM(2891) - 1e-6 && r <= KM(2700) + 1e-6, `point at ${r}`);
    }
  }
  assert.ok(!buildEarth('undergrad').some((p) => p.id === 'post-perovskite'));
});
