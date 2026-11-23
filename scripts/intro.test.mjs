import test from 'node:test';
import assert from 'node:assert/strict';
import { createIntro, labelsOpen } from '../src/ui/intro.js';

test('the intro waits for each control in turn: turn, pull apart, point', () => {
  const intro = createIntro();
  assert.equal(intro.step, 'turn');
  // opening or picking early does not skip the turn step
  assert.equal(intro.tick({ explode: 1, sel: 2, t: 0 }), false);
  intro.tick({ dRot: 0.5 });
  assert.equal(intro.step, 'turn');
  assert.equal(intro.tick({ dRot: -0.4 }), true); // either direction counts
  assert.equal(intro.step, 'pull');
  // fully open, but it must stay open long enough to read the labels
  intro.tick({ explode: 0.9, t: 10 });
  intro.tick({ explode: 0.5, t: 11 }); // closed again: the wait restarts
  intro.tick({ explode: 0.9, t: 12 });
  intro.tick({ explode: 0.9, t: 13 });
  assert.equal(intro.step, 'pull');
  intro.tick({ explode: 0.9, t: 13.6 });
  assert.equal(intro.step, 'point');
  intro.tick({ sel: -1 });
  assert.equal(intro.step, 'point');
  intro.tick({ sel: 3 });
  assert.equal(intro.step, 'done');
});

test('skipping ends the intro at once', () => {
  const intro = createIntro();
  intro.skip();
  assert.equal(intro.step, 'done');
  assert.equal(intro.tick({ dRot: 5, explode: 1, sel: 1, t: 9 }), false);
});

test('labels appear surface first as the Earth opens, all of them by 80% open', () => {
  assert.equal(labelsOpen(8, 0), 0);
  assert.equal(labelsOpen(8, 0.1), 1);
  assert.equal(labelsOpen(8, 0.4), 4);
  assert.equal(labelsOpen(8, 0.8), 8);
  assert.equal(labelsOpen(8, 1), 8);
});
