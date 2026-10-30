import { after, before, test } from 'node:test';
import assert from 'node:assert/strict';
import { server } from './server.js';

let base;

before(async () => {
  await new Promise((done) => server.listen(0, done));
  base = `http://localhost:${server.address().port}`;
});

after(() => server.close());

test('serves the index page at /', async () => {
  const res = await fetch(base);
  assert.equal(res.status, 200);
  assert.match(res.headers.get('content-type'), /text\/html/);
  assert.match(await res.text(), /<h1>/);
});

test('serves static files with the right content type', async () => {
  const res = await fetch(`${base}/index.html`);
  assert.equal(res.status, 200);
  assert.match(res.headers.get('content-type'), /text\/html/);
});

test('returns 404 for unknown paths', async () => {
  const res = await fetch(`${base}/nope`);
  assert.equal(res.status, 404);
});

test('rejects path traversal', async () => {
  for (const path of ['/../package.json', '/%2e%2e/package.json', '/..%2fpackage.json']) {
    const res = await fetch(`${base}${path}`);
    assert.equal(res.status, 404, path);
  }
});
