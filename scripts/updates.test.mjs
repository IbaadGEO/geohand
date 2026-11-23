import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderUpdates, applyUpdates } from '../src/content/updates.js';

const empty = { alevel: { parts: [] }, undergrad: { parts: [] }, postgrad: { parts: [] } };
const qv = (q, added) => ({ q, a: 'A.', refs: ['prem1981'], added, fromVisitor: true });
const two = {
  alevel: { parts: [{ id: 'crust', title: 'Crust', questions: [qv('Old one?', '2026-12-01'), { q: 'Written by us', a: 'A.', refs: [] }] }] },
  undergrad: { parts: [] },
  postgrad: { parts: [{ id: 'cmb', title: 'Core–mantle boundary', questions: [qv('New | one?', '2026-12-05')] }] },
};

test('no visitor questions yet', () => assert.match(renderUpdates(empty), /No visitor questions/));
test('newest first, only visitor questions', () => {
  const t = renderUpdates(two);
  assert.ok(t.indexOf('2026-12-05') < t.indexOf('2026-12-01'));
  assert.ok(!t.includes('Written by us'));
  assert.match(t, /\| 2026-12-05 \| Advanced \| Core–mantle boundary \|/);
});
test('pipes in a question cannot break the table', () => assert.match(renderUpdates(two), /New \\\| one\?/));
test('missing markers throw', () => assert.throws(() => applyUpdates('no markers', 'T'), /markers/));
test('replaces between markers', () =>
  assert.equal(
    applyUpdates('a<!-- live-updates:start -->old<!-- live-updates:end -->b', 'NEW'),
    'a<!-- live-updates:start -->\nNEW\n<!-- live-updates:end -->b',
  ));
