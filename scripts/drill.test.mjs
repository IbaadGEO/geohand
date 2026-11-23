import test from 'node:test';
import assert from 'node:assert/strict';
import { stageNames } from '../src/ui/learnLoop.js';
import { LOOPS } from '../src/content/earth/learn.js';

test('every drill-in has its stages in order, then one stage per test', () => {
  for (const loops of Object.values(LOOPS))
    for (const loop of Object.values(loops)) {
      const names = stageNames(loop);
      assert.deepEqual(names.slice(0, 5), ['Question', 'Where it is', 'How it works', 'Your turn', 'Supporting evidence']);
      assert.equal(names.length, 5 + loop.tests.length);
    }
});

test('every part at every level has a drill-in; recall ones restate the part’s own cited questions', async () => {
  const { EARTH } = await import('../src/content/earth/index.js');
  for (const [level, { parts }] of Object.entries(EARTH))
    for (const p of parts) {
      const loop = LOOPS[level][p.id];
      assert.ok(loop, `${level}/${p.id} has no drill-in`);
      if (!loop.recall) continue;
      const qs = p.questions.slice(1, 4);
      assert.deepEqual(loop.tests.map((t) => [t.explain, t.where]), qs.map((q) => [q.a, q.where]));
      assert.equal(loop.check.explain, p.questions[0].a);
    }
});
