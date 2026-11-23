import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { CRUST1, cellIndex, thicknessAt } from '../src/content/earth/crust1.js';

const bytes = new Uint8Array(fs.readFileSync('public/data/' + CRUST1.file.split('/').pop()));
const near = (a, b) => assert.ok(Math.abs(a - b) <= 0.5 / CRUST1.scale, `${a} vs ${b}`);

test('CRUST1.0 grid covers every 1° cell', () => assert.equal(bytes.length, CRUST1.cells));

test('cell index follows the packed order: rows from 89.5°N, columns from 179.5°W', () => {
  assert.equal(cellIndex(89.5, -179.5), 0);
  assert.equal(cellIndex(89.5, 179.5), 359);
  assert.equal(cellIndex(-89.5, 179.5), CRUST1.cells - 1);
  assert.equal(cellIndex(10.2, 180), cellIndex(10.2, -180), 'longitude wraps');
  assert.equal(cellIndex(90, 0), cellIndex(89.9, 0), 'the pole stays in the top row');
});

test('packed thickness matches crsthk.xyz at known cells', () => {
  near(thicknessAt(bytes, 32.5, 90.5), 74.0); // Tibetan Plateau
  near(thicknessAt(bytes, 0.5, -150.5), 6.84); // central Pacific
  near(thicknessAt(bytes, 64.5, -18.5), 33.3); // Iceland
  near(thicknessAt(bytes, 89.5, -179.5), 8.06); // first row of the file
});
