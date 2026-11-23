import test from 'node:test';
import assert from 'node:assert/strict';
import { Dwell, DWELL_S } from '../src/ui/pointer.js';

const run = (d, target, secs, step = 0.05) => {
  let fired = null;
  for (let t = 0; t < secs - 1e-9; t += step) fired = d.update(target, step) || fired;
  return fired;
};

test('pointer dwell fires once after holding on one target', () => {
  const d = new Dwell(), a = {};
  assert.equal(run(d, a, DWELL_S - 0.1), null);
  assert.equal(run(d, a, 0.15), a);
  assert.equal(run(d, a, 2), null, 'stays fired while held');
});

test('pointer dwell restarts when the target changes and re-arms after leaving', () => {
  const d = new Dwell(), a = {}, b = {};
  run(d, a, DWELL_S - 0.1);
  assert.equal(run(d, b, DWELL_S - 0.1), null, 'moving to b restarted the timer');
  assert.equal(run(d, b, 0.15), b);
  run(d, null, 0.1);
  assert.equal(run(d, b, DWELL_S + 0.05), b, 'fires again after leaving');
});
