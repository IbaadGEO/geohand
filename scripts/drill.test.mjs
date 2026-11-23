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
