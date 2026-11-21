import http from 'node:http';
import { stat } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const project = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const root = path.resolve(project, process.argv[2] || '.');
const port = Number(process.argv[3] || process.env.PORT || 5173);
const types = {
  '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8',
  '.css':'text/css; charset=utf-8', '.json':'application/json; charset=utf-8',
  '.svg':'image/svg+xml', '.webp':'image/webp', '.png':'image/png',
  '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.gif':'image/gif',
  '.mp4':'video/mp4', '.webm':'video/webm', '.txt':'text/plain; charset=utf-8',
  '.ico':'image/x-icon', '.woff2':'font/woff2'
};

http.createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const file = path.resolve(root, '.' + pathname, pathname.endsWith('/') ? 'index.html' : '');
    if (file !== root && !file.startsWith(root + path.sep)) {
      res.writeHead(403); return res.end('Forbidden');
    }
    const info = await stat(file);
    if (!info.isFile()) { res.writeHead(404); return res.end('Not found'); }
    const type = types[path.extname(file).toLowerCase()] || 'application/octet-stream';
    const range = req.headers.range;
    if (range) {
      const match = /^bytes=(\d*)-(\d*)$/.exec(range);
      if (!match) { res.writeHead(416, { 'Content-Range': `bytes */${info.size}` }); return res.end(); }
      const start = match[1] === '' ? Math.max(info.size - Number(match[2] || 0), 0) : Number(match[1]);
      const end = match[1] === '' ? info.size - 1 : match[2] ? Math.min(Number(match[2]), info.size - 1) : info.size - 1;
      if (start > end || start >= info.size) { res.writeHead(416, { 'Content-Range': `bytes */${info.size}` }); return res.end(); }
      res.writeHead(206, {
        'Content-Type': type, 'Content-Length': end - start + 1,
        'Content-Range': `bytes ${start}-${end}/${info.size}`,
        'Accept-Ranges': 'bytes', 'Cache-Control': 'no-cache'
      });
      if (req.method === 'HEAD') return res.end();
      return createReadStream(file, { start, end }).pipe(res);
    }
    res.writeHead(200, {
      'Content-Type': type, 'Content-Length': info.size,
      'Accept-Ranges': 'bytes', 'Cache-Control': 'no-cache'
    });
    if (req.method === 'HEAD') return res.end();
    createReadStream(file).pipe(res);
  } catch (e) {
    res.writeHead(e.code === 'ENOENT' ? 404 : 500);
    res.end(e.code === 'ENOENT' ? 'Not found' : 'Internal server error');
  }
}).listen(port, '127.0.0.1', () => {
  console.log(`ASCII Field portfolio: http://localhost:${port}/`);
  console.log(`Serving ${root}`);
});
