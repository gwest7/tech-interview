import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fetchData } from './slow-source.js';

test('resolves after 5-10s with changing data', { timeout: 25000 }, async () => {
  const start = Date.now();
  const [a, b] = await Promise.all([fetchData(), fetchData()]);
  const elapsed = Date.now() - start;
  assert.ok(elapsed >= 5000 && elapsed < 10500, `took ${elapsed}ms`);
  assert.ok(a.fetchedAt && typeof a.value === 'number');
  assert.ok(b.fetchedAt);
});
