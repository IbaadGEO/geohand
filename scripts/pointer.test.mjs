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

test('a brief tracking dropout pauses the dwell; a longer one cancels it', () => {
  const d = new Dwell(), a = {};
  run(d, a, DWELL_S - 0.2);
  run(d, null, 0.2); // hand lost for a moment
  assert.equal(run(d, a, 0.25), a, 'carried on from where it was');
  const e = new Dwell(), b = {};
  run(e, b, DWELL_S - 0.2);
  run(e, null, 0.6); // gone for longer: start again
  assert.equal(run(e, b, 0.25), null);
});
