import { test } from 'node:test';
import assert from 'node:assert/strict';
import { premAt } from '../src/content/earth/prem.js';

const near = (a, b, tol, what) => assert.ok(Math.abs(a - b) <= tol, `${what}: ${a.toFixed(3)} vs ${b}`);

// Values already cited in numbers.js (PREM, Table I, p. 308) must come out of the coefficients.
test('outer core top and bottom match the cited PREM values', () => {
  const top = premAt(2891.01), bot = premAt(5149.49);
  near(top.density, 9.903, 0.002, 'density at top');
  near(top.vp, 8.065, 0.002, 'vP at top');
  near(bot.density, 12.166, 0.002, 'density at bottom');
  near(bot.vp, 10.356, 0.002, 'vP at bottom');
  assert.equal(top.vs, 0);
  assert.equal(bot.vs, 0);
});

test('inner core: S waves pass (about 3.5 km/s), about 13 g/cm³ at the centre', () => {
  near(premAt(5150).vs, 3.5, 0.06, 'vS just inside the ICB');
  near(premAt(6371).density, 13.09, 0.01, 'density at the centre');
});

test('crust and uppermost mantle densities', () => {
  near(premAt(5).density, 2.6, 1e-9, 'upper crust');
  near(premAt(20).density, 2.9, 1e-9, 'lower crust');
  near(premAt(30).density, 3.38, 0.005, 'top of the mantle');
});

test('mantle S-wave speed is above zero everywhere', () => {
  for (let d = 25; d < 2891; d += 25) assert.ok(premAt(d).vs > 4, `vS at ${d} km`);
});
