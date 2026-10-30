import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createStore } from './data-store.js';

test('serves prefetched data', async () => {
  let n = 0;
  const store = createStore(async () => ({ value: ++n }), 1000);
  store.start();
  assert.deepEqual(await store.get(), { value: 1 });
});
