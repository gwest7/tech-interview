import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, resolve, sep } from 'node:path';
import { search } from './search.js';

const PUBLIC_DIR = resolve(import.meta.dirname, 'public');

const CONTENT_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
};

export const server = createServer(async (req, res) => {
  try {
    const { pathname } = new URL(req.url, 'http://localhost');
    if (pathname === '/api/search') {
      // Simulates a real backend: variable latency and the odd failure.
      await new Promise((done) => setTimeout(done, 100 + Math.random() * 1400));
      if (Math.random() < 0.15) throw new Error('search backend unavailable');
      const q = new URL(req.url, 'http://localhost').searchParams.get('q') ?? '';
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify(search(q)));
      return;
    }
    const relative = decodeURIComponent(pathname === '/' ? '/index.html' : pathname);
    const file = join(PUBLIC_DIR, relative);

    if (!file.startsWith(PUBLIC_DIR + sep)) throw Object.assign(new Error(), { code: 'ENOENT' });

    const body = await readFile(file);
    res.writeHead(200, { 'Content-Type': CONTENT_TYPES[extname(file)] ?? 'application/octet-stream' });
    res.end(body);
  } catch (err) {
    const notFound = err.code === 'ENOENT' || err.code === 'EISDIR' || err instanceof URIError;
    res.writeHead(notFound ? 404 : 500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(notFound ? 'Not found' : 'Internal server error');
  }
});

if (import.meta.main) {
  const port = process.env.PORT ?? 3000;
  server.listen(port, () => console.log(`Listening on http://localhost:${port}`));
}
