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
