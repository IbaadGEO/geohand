import { test } from 'node:test';
import assert from 'node:assert/strict';
import { labDepth, LAB_AGES, LAB_CRATON_KM } from '../src/content/earth/lab.js';

test('LAB depth follows Fischer et al. (2010, p. 565) at the measured ages', () => {
  assert.equal(labDepth(25), 55);
  assert.equal(labDepth(49), 76);
  assert.equal(labDepth(129), 82);
});
test('LAB depth is clamped outside the measured ages, so nothing is guessed', () => {
  assert.equal(labDepth(10), 55);
  assert.equal(labDepth(200), 82);
  const mid = labDepth(37);
  assert.ok(mid > 55 && mid < 76);
});
test('drawn range and craton depth', () => {
  assert.deepEqual(LAB_AGES, [25, 129]);
  assert.equal(LAB_CRATON_KM, 200);
});
