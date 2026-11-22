import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseRich } from '../src/ui/richText.js';

test('subscript', () => assert.deepEqual(parseRich('MgSiO~3~'), [{ t: 'text', s: 'MgSiO' }, { t: 'sub', s: '3' }]));
test('superscripts', () =>
  assert.deepEqual(parseRich('10^3^ kg m^-3^'), [
    { t: 'text', s: '10' }, { t: 'sup', s: '3' }, { t: 'text', s: ' kg m' }, { t: 'sup', s: '-3' },
  ]));
test('italic', () => assert.deepEqual(parseRich('_et al._'), [{ t: 'i', s: 'et al.' }]));
test('html stays literal text', () =>
  assert.deepEqual(parseRich('<img src=x onerror=alert(1)>'), [{ t: 'text', s: '<img src=x onerror=alert(1)>' }]));
test('unmatched marker stays literal', () => assert.deepEqual(parseRich('a_b'), [{ t: 'text', s: 'a_b' }]));
test('empty string', () => assert.deepEqual(parseRich(''), []));
