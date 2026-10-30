import { test } from 'node:test';
import assert from 'node:assert/strict';
import { search } from './search.js';

test('matches case-insensitively on substrings', () => {
  assert.deepEqual(search('BERRY'), ['blackberry', 'blueberry', 'cranberry', 'raspberry', 'strawberry']);
});

test('returns nothing for a blank query', () => {
  assert.deepEqual(search('  '), []);
});
