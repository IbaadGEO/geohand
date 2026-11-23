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

// README references, in Harvard style, generated from the app's reference list
const { harvard, renderReferences, applyBlock } = await import('../src/content/updates.js');
const art = { authors: 'Dziewonski, A. M., & Anderson, D. L.', year: 1981, title: 'Preliminary reference Earth model', container: 'Physics of the Earth and Planetary Interiors', volume: 25, issue: 4, pages: '297–356', doi: '10.1016/0031-9201(81)90046-7' };
test('Harvard: two authors, journal, volume(issue), pages, DOI', () =>
  assert.equal(harvard(art), "Dziewonski, A.M. and Anderson, D.L. (1981) 'Preliminary reference Earth model', *Physics of the Earth and Planetary Interiors*, 25(4), pp. 297–356. Available at: https://doi.org/10.1016/0031-9201(81)90046-7"));
test('Harvard: three or more authors joined with commas and "and"', () =>
  assert.match(harvard({ ...art, authors: 'Hirose, K., Labrosse, S., & Hernlund, J.' }), /^Hirose, K., Labrosse, S. and Hernlund, J\. \(1981\)/));
test('Harvard: et al. and a single author', () => {
  assert.match(harvard({ ...art, authors: 'Pearson, D. G., et al.' }), /^Pearson, D\.G\. et al\. \(1981\)/);
  assert.match(harvard({ ...art, authors: 'Frost, D. J.' }), /^Frost, D\.J\. \(1981\)/);
});
test('Harvard: article numbers are not pages, web links are kept', () => {
  assert.match(harvard({ ...art, pages: 'e2021JB023562' }), /, 25\(4\), e2021JB023562\. /);
  assert.match(harvard({ ...art, doi: undefined, url: 'https://example.org/x' }), /Available at: https:\/\/example\.org\/x$/);
});
test('reference list is alphabetical and numbered by nothing', () => {
  const list = renderReferences({ b: { ...art, authors: 'Zeta, A.' }, a: art });
  assert.ok(list.indexOf('Dziewonski') < list.indexOf('Zeta'));
  assert.ok(list.split('\n').every((l) => l.startsWith('- ')));
});
test('blocks replace only their own markers', () =>
  assert.equal(applyBlock('x<!-- references:start -->old<!-- references:end -->y', 'references', 'NEW'), 'x<!-- references:start -->\nNEW\n<!-- references:end -->y'));
test('Harvard: hyphenated initials survive', () =>
  assert.match(harvard({ ...art, authors: 'McDonough, W. F., & Sun, S.-s.' }), /^McDonough, W\.F\. and Sun, S\.-s\. \(1981\)/));
