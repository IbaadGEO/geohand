import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Lesson } from '../src/lesson.js';
import { LESSONS } from '../src/content/earth/lessons.js';
import { EARTH } from '../src/content/earth/index.js';
import { REFS } from '../src/content/references.js';
import { checkContent } from '../src/content/check.js';

test('next and back stop at the ends', () => {
  const L = new Lesson([{ focus: 'crust' }, { focus: 'mantle' }, { focus: 'cmb' }]);
  assert.equal(L.back(), false);
  assert.equal(L.i, 0);
  assert.equal(L.next(), true);
  assert.equal(L.step.focus, 'mantle');
  L.next();
  assert.equal(L.next(), false);
  assert.equal(L.i, 2);
});
test('jumpToPart goes to the first matching step, else the start', () => {
  const L = new Lesson([{ focus: 'crust' }, { focus: 'mantle' }, { focus: 'cmb' }]);
  L.jumpToPart('mantle');
  assert.equal(L.i, 1);
  L.jumpToPart('nope');
  assert.equal(L.i, 0);
});
test('empty lesson has no step', () => assert.equal(new Lesson([]).step, null));
test('every lesson step focuses on a part at its level', () => assert.deepEqual(checkContent(EARTH, REFS, {}, LESSONS).errors, []));
test('lesson check catches a missing part', () =>
  assert.match(checkContent(EARTH, REFS, {}, { alevel: [{ focus: 'd410', refs: [] }] }).errors[0], /focus "d410"/));
