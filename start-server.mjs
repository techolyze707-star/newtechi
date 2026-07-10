import { createServer } from 'node:http';
import { parse } from 'node:url';
import next from 'next';

const dev = false;
const hostname = 'localhost';
const port = Number(process.env.PORT || 3000);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

function pad(num, length = 2) {
  return String(num).padStart(length, '0');
}

function formatTimestamp(date = new Date()) {
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const month = months[date.getMonth()];
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const mins = pad(date.getMinutes());
  const secs = pad(date.getSeconds());
  const ms = pad(Math.floor(date.getMilliseconds() / 10));
  return `${month} ${day} ${hours}:${mins}:${secs}.${ms}`;
}

function colorStatus(statusCode) {
  if (statusCode >= 500) return `\x1b[31m${statusCode}\x1b[0m`;
  if (statusCode >= 400) return `\x1b[33m${statusCode}\x1b[0m`;
  if (statusCode >= 300) return `\x1b[36m${statusCode}\x1b[0m`;
  if (statusCode >= 200) return `\x1b[32m${statusCode}\x1b[0m`;
  return String(statusCode);
}

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const startedAt = process.hrtime.bigint();

    res.on('finish', () => {
      const end = process.hrtime.bigint();
      const durationMs = Number(end - startedAt) / 1_000_000;
      const statusCode = res.statusCode || 0;
      const method = req.method || 'GET';
      const host = req.headers.host || 'localhost';
      const path = req.url || '/';

      const line = [
        formatTimestamp(),
        method,
        colorStatus(statusCode),
        host,
        path,
        `${durationMs.toFixed(1)}ms`,
      ].join('  ');

      console.log(line);
    });

    const parsedUrl = parse(req.url || '/', true);
    handle(req, res, parsedUrl);
  });

  server.listen(port, () => {
    console.log(`> Local production logger running at http://${hostname}:${port}`);
  });
});
