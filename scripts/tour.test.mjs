import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildTour, caption } from '../src/tour.js';
import { EARTH } from '../src/content/earth/index.js';
import { LEVELS } from '../src/content/levels.js';

for (const { id, label } of LEVELS) {
  test(`${label} tour: whole Earth, every part once, whole Earth`, () => {
    const parts = EARTH[id].parts;
    const steps = buildTour(parts, label);
    assert.equal(steps[0].id, null);
    assert.equal(steps.at(-1).id, null);
    assert.deepEqual(steps.slice(1, -1).map((s) => s.id), parts.map((p) => p.id));
    for (const s of steps) {
      assert.ok(s.dur >= 6 && s.dur <= 16, `${s.title}: ${s.dur}`);
      assert.ok(s.text.length > 0, `${s.title} has no caption`);
      assert.ok(!s.text.includes('DRAFT'), `${s.title} shows draft text`);
    }
  });
}

test('a draft part is captioned with its cited values, not its draft text', () => {
  const part = { draft: true, short: 'DRAFT: x', numbers: [{ label: 'Depth', value: '35 km' }, { label: 'Density', value: '3.3 g cm^-3^' }] };
  assert.equal(caption(part), 'Depth: 35 km · Density: 3.3 g cm^-3^');
});
