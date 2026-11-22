import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadLevel, saveLevel, mapPart } from '../src/levels.js';

const throwing = { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('blocked'); } };
const fakeStore = (init = {}) => {
  const m = new Map(Object.entries(init));
  return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)) };
};

test('blocked storage: load gives null, save does not throw', () => {
  assert.equal(loadLevel(throwing), null);
  assert.doesNotThrow(() => saveLevel('postgrad', throwing));
});
test('no storage at all', () => assert.equal(loadLevel(undefined), null));
test('unknown stored value ignored', () => assert.equal(loadLevel(fakeStore({ 'geohand.level': 'banana' })), null));
test('save then load', () => {
  const s = fakeStore();
  saveLevel('undergrad', s);
  assert.equal(loadLevel(s), 'undergrad');
});
test('maps to parent going down a level', () => assert.equal(mapPart('transition-zone', 'undergrad', 'alevel'), 'mantle'));
test('maps to first child going up a level', () => assert.equal(mapPart('mantle', 'alevel', 'undergrad'), 'upper-mantle'));
test('postgrad-only part maps to its parent', () => assert.equal(mapPart('d-double-prime', 'postgrad', 'undergrad'), 'lower-mantle'));
test('same id kept', () => assert.equal(mapPart('cmb', 'alevel', 'postgrad'), 'cmb'));
test('walks the parent chain', () => assert.equal(mapPart('d-double-prime', 'postgrad', 'alevel'), 'mantle'));
test('boundary with no match gives null', () => assert.equal(mapPart('d410', 'undergrad', 'alevel'), null));
test('nothing selected stays nothing', () => assert.equal(mapPart(null, 'alevel', 'postgrad'), null));
