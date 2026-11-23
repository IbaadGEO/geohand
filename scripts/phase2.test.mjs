import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { tempAt } from '../src/content/earth/temperature.js';
import { SEAFLOOR, ageAt } from '../src/content/earth/seafloor.js';
import { SEMUCB, dvsAt } from '../src/content/earth/semucb.js';
import { KM, depthAtRadius } from '../src/models/earth.js';

test('temperature follows Katsura (2022) Table 3, then the cited core values', () => {
  assert.equal(tempAt(50), 1646);
  assert.equal(tempAt(1000), 2090);
  assert.equal(tempAt(2800), 2587);
  assert.equal(tempAt(2891), 4050); // Anzellini et al. (2013) p. 466
  assert.equal(tempAt(5149.5), 5450); // middle of Hirose et al. (2013) 5,200–5,700 K
  assert.equal(tempAt(6371), 5500); // middle of 5,000–6,000 K
  assert.equal(tempAt(30), null); // the lithosphere's steep gradient is not in the table
  assert.ok(tempAt(415) > 1860 && tempAt(405) < 1800); // the jump at 410 km
});

const age = new Uint8Array(fs.readFileSync('public/data/' + SEAFLOOR.file.split('/').pop()));
test('seafloor age grid: Seton et al. (2020), packed to 1° cells', () => {
  assert.equal(age.length, SEAFLOOR.cells);
  assert.ok(ageAt(age, 30.5, 150.5) > 120); // old Pacific floor east of Japan
  assert.ok(ageAt(age, -0.5, -13.5) < 20); // near the Mid-Atlantic Ridge
  assert.equal(ageAt(age, 32.5, 90.5), null); // Tibet: not ocean
});

const tomo = new Int8Array(fs.readFileSync('public/data/' + SEMUCB.file.split('/').pop()).buffer);
test('SEMUCB-WM1 equator slice: slow under the Pacific and Africa at the base of the mantle', () => {
  assert.equal(tomo.length, SEMUCB.depths.length * 360);
  assert.ok(dvsAt(tomo, 2841, -150.5) < -1.5);
  assert.ok(dvsAt(tomo, 2841, 15.5) < -1.5);
  assert.ok(dvsAt(tomo, 80, 15.5) > 3); // cold, fast continental root under Africa
  assert.equal(dvsAt(tomo, 50, 0), null); // above 80 km: not used
});

test('depthAtRadius inverts KM', () => {
  for (const d of [0, 7, 35, 100, 410, 660, 2891, 5149.5, 6371]) assert.ok(Math.abs(depthAtRadius(KM(d)) - d) < 1e-6, String(d));
});
