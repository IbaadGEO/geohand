import test from 'node:test';
import assert from 'node:assert/strict';
import { MISSION, predictionNote } from '../src/content/earth/mission.js';
import { EARTH } from '../src/content/earth/index.js';
import { REFS } from '../src/content/references.js';

test('the mission finds a part that exists at every level and cites known sources', () => {
  for (const [level, { parts }] of Object.entries(EARTH)) {
    for (const id of [MISSION.target, MISSION.below]) assert.ok(parts.some((p) => p.id === id), `${level} has ${id}`);
  }
  const ex = MISSION.steps.explain;
  assert.ok(ex.answer >= 0 && ex.answer < ex.options.length);
  for (const r of ex.refs) assert.ok(REFS[r], r);
});

test('the prediction note says whether the guess matched the evidence', () => {
  const names = Object.fromEntries(MISSION.steps.predict.options);
  assert.equal(predictionNote('outer-core', names), 'You predicted the outer core: right.');
  assert.equal(predictionNote('mantle', names), 'You predicted the mantle; the evidence points to the outer core.');
});
