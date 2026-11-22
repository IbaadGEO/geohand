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

import { GEOMETRY } from '../src/models/earth.js';
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
  for (const lv of ['alevel', 'undergrad', 'postgrad'])
    for (const id of ['llsvp', 'innermost-inner-core']) assert.ok(!EARTH[lv].parts.some((p) => p.id === id), `${lv}/${id}`);
});
