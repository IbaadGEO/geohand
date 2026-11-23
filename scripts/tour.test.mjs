import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildTour, caption, CHECK_WAIT } from '../src/tour.js';
import { LOOPS } from '../src/content/earth/learn.js';
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
      assert.ok(s.dur >= 6 && s.dur <= 16 + (s.check ? CHECK_WAIT : 0), `${s.title}: ${s.dur}`);
      assert.ok(s.text.length > 0, `${s.title} has no caption`);
      assert.ok(!s.text.includes('DRAFT'), `${s.title} shows draft text`);
    }
  });
}

test('a draft part is captioned with its cited values, not its draft text', () => {
  const part = { draft: true, short: 'DRAFT: x', numbers: [{ label: 'Depth', value: '35 km' }, { label: 'Density', value: '3.3 g cm^-3^' }] };
  assert.equal(caption(part), 'Depth: 35 km · Density: 3.3 g cm^-3^');
});

test('a tour step with a check question waits for it before explaining', () => {
  const checks = Object.fromEntries(Object.entries(LOOPS.alevel).map(([id, l]) => [id, l.check]));
  const crust = buildTour(EARTH.alevel.parts, 'Normal', checks).find((s) => s.id === 'crust');
  assert.equal(crust.check, LOOPS.alevel.crust.check);
  assert.ok(crust.dur > CHECK_WAIT + 5);
});

test('every learning-loop item has a valid answer, an explanation and a source', async () => {
  const { REFS } = await import('../src/content/references.js');
  for (const [level, loops] of Object.entries(LOOPS))
    for (const [id, loop] of Object.entries(loops)) {
      assert.ok(EARTH[level].parts.some((p) => p.id === id), `${level}/${id} is not a part`);
      for (const it of [loop.check, ...loop.tests]) {
        if (it.options) assert.ok(it.answer >= 0 && it.answer < it.options.length, it.q); // recall items have no options
        assert.ok(it.explain && it.where, it.q);
        for (const r of it.refs) assert.ok(REFS[r], `${it.q}: unknown reference ${r}`);
      }
    }
});
