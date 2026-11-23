import test from 'node:test';
import assert from 'node:assert/strict';
import { GLOSSARY, termsIn } from '../src/content/earth/glossary.js';
import { REFS } from '../src/content/references.js';

test('every glossary meaning cites a known reference', () => {
  for (const g of GLOSSARY) for (const r of g.refs) assert.ok(REFS[r], `${g.term}: ${r}`);
});

test('terms are found in the text a Normal learner reads', () => {
  assert.deepEqual(termsIn('from the Moho (24.4 km in PREM, 35 km in ak135)').map((g) => g.term), ['PREM', 'ak135']);
  assert.deepEqual(termsIn('Shear (S) wave speed = 0: S waves cannot pass').map((g) => g.term), ['S waves']);
  assert.deepEqual(termsIn('What it is made of (pyrolite model)').map((g) => g.term), ['Pyrolite']);
  assert.deepEqual(termsIn('The crust is thin'), []);
});
