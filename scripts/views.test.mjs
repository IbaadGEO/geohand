import { test } from 'node:test';
import assert from 'node:assert/strict';
import { faceColors, VIEWS } from '../src/ui/propertyView.js';
import { EARTH } from '../src/content/earth/index.js';

test('every layer at every level gets a composition and a behaviour colour', () => {
  for (const level of Object.keys(EARTH))
    for (const p of EARTH[level].parts.filter((p) => p.kind === 'layer')) {
      const [comp, beh] = faceColors(p, 100);
      assert.ok(comp && beh, `${level}/${p.id}`);
    }
});

test('composition and behaviour disagree where the lesson says they do', () => {
  const colour = (id, view) => faceColors({ id }, 50)[view];
  // lithosphere mantle and asthenosphere are both mantle rock, but behave differently
  assert.equal(colour('lithospheric-mantle', 0), colour('asthenosphere', 0));
  assert.notEqual(colour('lithospheric-mantle', 1), colour('asthenosphere', 1));
  // crust and lithospheric mantle are different rock, but move together as one plate
  assert.notEqual(colour('crust', 0), colour('lithospheric-mantle', 0));
  assert.equal(colour('crust', 1), colour('lithospheric-mantle', 1));
  // outer and inner core are the same metal but liquid versus solid
  assert.equal(colour('outer-core', 0), colour('inner-core', 0));
  assert.notEqual(colour('outer-core', 1), colour('inner-core', 1));
});

test('views are in the order the scene reads them', () => {
  assert.deepEqual(VIEWS.map((v) => v.id), ['layers', 'composition', 'behaviour', 'density', 'vs', 'quake']);
});
