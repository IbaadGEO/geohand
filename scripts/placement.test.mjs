import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PLACEMENT, suggestLevel } from '../src/content/earth/placement.js';
import { REFS } from '../src/content/references.js';
import { LEVEL_IDS } from '../src/content/levels.js';
import { summary } from '../src/ui/placement.js';

test('three questions with a valid answer and known sources', () => {
  assert.equal(PLACEMENT.length, 3);
  for (const p of PLACEMENT) {
    assert.ok(p.answer >= 0 && p.answer < p.options.length, p.q);
    for (const r of p.refs) assert.ok(REFS[r], r);
  }
});
test('0–1 right is Normal, 2 is Intermediate, 3 is Advanced', () => {
  assert.deepEqual([0, 1, 2, 3].map(suggestLevel), ['alevel', 'alevel', 'undergrad', 'postgrad']);
  for (const n of [0, 1, 2, 3]) assert.ok(LEVEL_IDS.includes(suggestLevel(n)));
});
test('the summary names the level and what was known', () => {
  assert.equal(summary([true, true, false]), 'Suggested: Intermediate. You knew which layer is liquid and how deep the core starts.');
  assert.equal(summary([false, false, false]), 'Suggested: Normal. A good place to start.');
  assert.equal(summary([true, true, true]), 'Suggested: Advanced. You knew which layer is liquid, how deep the core starts and that inner-core rotation is still debated.');
});
