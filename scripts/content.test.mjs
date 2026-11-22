import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkContent } from '../src/content/check.js';

const refs = { prem1981: { authors: 'Dziewonski', year: 1981, title: 'PREM', checked: '2026-11-22' } };
const uncheckedRefs = { prem1981: { ...refs.prem1981, checked: null } };

const part = (id, extra = {}) => ({
  id, kind: 'layer', title: id, short: 'Short.', long: 'Long.',
  numbers: [{ label: 'Depth', value: '35 km', refs: ['prem1981'], where: 'Table 1' }],
  questions: [{ q: 'What?', a: 'This.', refs: ['prem1981'] }],
  ...extra,
});
const model = (alevel, undergrad = [], postgrad = []) => ({
  alevel: { level: 'alevel', parts: alevel },
  undergrad: { level: 'undergrad', parts: undergrad },
  postgrad: { level: 'postgrad', parts: postgrad },
});

const ok = model([part('crust')], [part('continental-crust', { parent: 'crust' })]);
const withRef = (id) => model([part('crust', { questions: [{ q: 'Q?', a: 'A.', refs: [id] }] })]);
const badQ = model([part('crust', { questions: [{ q: 'Q?', a: '', refs: [] }] })]);
const parts = (n) => model(Array.from({ length: n }, (_, i) => part('p' + i)));
const dup = model([part('crust'), part('crust')]);
const orphan = model([part('crust')], [part('y', { parent: 'x' })]);
const noLong = model([part('crust', { long: '' })]);

test('passes a valid fixture', () => assert.deepEqual(checkContent(ok, refs, {}).errors, []));
test('unknown ref id', () => assert.match(checkContent(withRef('nope'), refs, {}).errors[0], /unknown reference "nope"/));
test('unchecked ref is a warning, release error', () => {
  assert.equal(checkContent(ok, uncheckedRefs, {}).errors.length, 0);
  assert.ok(checkContent(ok, uncheckedRefs, {}).warnings.length > 0);
  assert.match(checkContent(ok, uncheckedRefs, { release: true }).errors[0], /not checked/);
});
test('question without answer or refs', () => assert.equal(checkContent(badQ, refs, {}).errors.length, 2));
test('more than 24 parts', () => assert.match(checkContent(parts(25), refs, {}).errors[0], /25 parts/));
test('duplicate id in a level', () => assert.match(checkContent(dup, refs, {}).errors[0], /duplicate/));
test('parent must exist at a lower level', () => assert.match(checkContent(orphan, refs, {}).errors[0], /parent "x"/));
test('missing short or long text', () => assert.match(checkContent(noLong, refs, {}).errors[0], /long/));
test('number without refs', () =>
  assert.match(checkContent(model([part('crust', { numbers: [{ label: 'D', value: '1', refs: [], where: '' }] })]), refs, {}).errors[0], /number "D"/));

import { formatRef } from '../src/ui/panel.js';
import { REFS } from '../src/content/references.js';
test('formats a journal reference', () =>
  assert.equal(formatRef(REFS.prem1981), 'Dziewonski, A. M., & Anderson, D. L. (1981). Preliminary reference Earth model. Physics of the Earth and Planetary Interiors, 25(4), 297–356. https://doi.org/10.1016/0031-9201(81)90046-7'));
test('formats a book', () =>
  assert.equal(formatRef(REFS.lowrie2020), 'Lowrie, W., & Fichtner, A. (2020). Fundamentals of Geophysics (3rd ed.). Cambridge University Press. https://doi.org/10.1017/9781108685917'));
test('formats a reference with no issue', () =>
  assert.equal(formatRef(REFS.fischer2010), 'Fischer, K. M., Ford, H. A., Abt, D. L., & Rychert, C. A. (2010). The lithosphere–asthenosphere boundary. Annual Review of Earth and Planetary Sciences, 38, 551–575. https://doi.org/10.1146/annurev-earth-040809-152438'));
