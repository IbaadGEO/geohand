import { test } from 'node:test';
import assert from 'node:assert/strict';
import { searchBank, normalise } from '../src/ui/search.js';
import { EARTH } from '../src/content/earth/index.js';

const q = (q, a = 'Answer.') => ({ q, a, refs: ['prem1981'] });
const bank = {
  alevel: { parts: [
    { id: 'inner-core', questions: [q('Why is the inner core solid if it is the hottest part?'), q('How big is the inner core?')] },
    { id: 'cmb', questions: [q("What's at the core-mantle boundary?")] },
  ] },
  undergrad: { parts: [{ id: 'crust', questions: [q('Why is oceanic crust thinner than continental crust?')] }] },
  postgrad: { parts: [
    { id: 'd-double-prime', questions: [q('What causes the D″ layer?')] },
    { id: 'inner-core', questions: [q('Does the inner core rotation differ from the mantle?')] },
  ] },
};

test('best match first', () => assert.equal(searchBank('Why is the inner core solid?', bank, 'alevel')[0].q, 'Why is the inner core solid if it is the hottest part?'));
test('case, apostrophes and hyphens', () => assert.equal(searchBank("WHAT'S the core-mantle boundary", bank, 'alevel')[0].partId, 'cmb'));
test('double prime symbol', () => assert.equal(searchBank('D″ layer', bank, 'postgrad')[0].partId, 'd-double-prime'));
test('falls back to another level, labelled', () => assert.equal(searchBank('inner core rotation', bank, 'alevel')[0].level, 'postgrad'));
test('current level ranks before other levels', () => {
  const r = searchBank('inner core', bank, 'postgrad');
  assert.equal(r[0].level, 'postgrad');
  assert.ok(r.some((x) => x.level === 'alevel'));
});
test('blank query', () => assert.deepEqual(searchBank('   ', bank, 'alevel'), []));
test('unrelated query', () => assert.deepEqual(searchBank('pizza recipe', bank, 'alevel'), []));
test('at most 8 results', () => {
  const big = { alevel: { parts: [{ id: 'x', questions: Array.from({ length: 20 }, (_, i) => q(`core question ${i}`)) }] }, undergrad: { parts: [] }, postgrad: { parts: [] } };
  assert.equal(searchBank('core question', big, 'alevel').length, 8);
});
test('normalise drops stop words and accents', () => assert.deepEqual(normalise('Why is the Mohorovičić boundary?'), ['mohorovicic', 'boundary']));
test('finds a cited answer when the learner searches for S waves in liquid', () => {
  const [hit] = searchBank('Why do S waves stop in liquid?', EARTH, 'alevel');
  assert.match(hit.a, /liquid/);
  assert.match(hit.where, /308/);
});
test('exact question leads over a similar phrase and draft questions are excluded', () => {
  const results = searchBank('what is the lithosphere made of', EARTH, 'undergrad');
  assert.equal(results[0].q, 'What is the lithosphere made of?');
  assert.ok(results.every((result) => !result.q.includes('DRAFT')));
});
