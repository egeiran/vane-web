import { readFile, stat } from 'node:fs/promises';
import { type IncomingMessage, type ServerResponse, createServer } from 'node:http';
import { extname, join, resolve, sep } from 'node:path';

import { parseConfig } from '../shared/config.ts';
import { isTime } from '../shared/time.ts';
import type { CalendarResponse, WeatherResponse } from '../shared/types.ts';
import type { Calendar } from './calendar.ts';
import type { Vekker } from './vekker.ts';
import type { Weather } from './weather.ts';

type Deps = {
  vekker: Vekker;
  weather: Weather;
  calendar: Calendar;
  distDir: string;
  now: () => Date;
  log: (msg: string) => void;
};

const TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.wav': 'audio/wav',
  '.woff2': 'font/woff2',
};

/** Bare sider fra denne maskinen får snakke med serveren. */
const LOCAL_HOSTS = new Set(['127.0.0.1', 'localhost', '[::1]']);

function json(res: ServerResponse, status: number, body: unknown): void {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(body));
}

async function readBody(req: IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of req) {
    size += (chunk as Buffer).length;
    if (size > 64 * 1024) throw new Error('For stor forespørsel');
    chunks.push(chunk as Buffer);
  }
  const text = Buffer.concat(chunks).toString('utf8');
  return text ? JSON.parse(text) : {};
}

export function createHttp(deps: Deps) {
  const { vekker, weather, calendar, log } = deps;
  const dist = resolve(deps.distDir);

  async function api(req: IncomingMessage, res: ServerResponse, path: string): Promise<void> {
    const method = req.method ?? 'GET';

    if (method === 'GET') {
      switch (path) {
        case '/api/view':
          return json(res, 200, vekker.view());
        case '/api/events':
          return events(req, res);
        case '/api/config':
          return json(res, 200, vekker.config);
        case '/api/weather': {
          const body: WeatherResponse = { forecast: await weather.forecast(vekker.config, deps.now()) };
          return json(res, 200, body);
        }
        case '/api/calendar': {
          const body: CalendarResponse = await calendar.today(vekker.config, deps.now());
          return json(res, 200, body);
        }
      }
      return json(res, 404, { error: 'Finnes ikke' });
    }

    // Alt som endrer noe, må sendes som JSON. Da kan ikke et vanlig skjema på en annen side gjøre det.
    if (!String(req.headers['content-type'] ?? '').startsWith('application/json')) {
      return json(res, 415, { error: 'Send JSON' });
    }
    const body = (await readBody(req)) as Record<string, unknown>;

    if (method === 'PUT' && path === '/api/config') {
      const result = parseConfig(body);
      if (!result.ok) return json(res, 400, { error: result.error });
      vekker.updateConfig(result.config);
      return json(res, 200, result.config);
    }
    if (method !== 'POST') return json(res, 405, { error: 'Ikke tillatt' });

    switch (path) {
      case '/api/night':
        vekker.startNight();
        break;
      case '/api/wake':
        vekker.cancelNight();
        break;
      case '/api/display/sleep':
        vekker.sleepDisplay();
        break;
      case '/api/dismiss':
        if (!vekker.dismiss()) return json(res, 409, { error: 'Ingen alarm å skru av' });
        break;
      case '/api/playing':
        vekker.confirmPlaying();
        break;
      case '/api/test':
        vekker.testAlarm();
        break;
      case '/api/upcoming': {
        const time = body.time;
        if (time !== null && time !== 'default' && !isTime(time)) {
          return json(res, 400, { error: 'Tiden må være HH:MM, null eller "default"' });
        }
        vekker.setUpcoming(time as string | null);
        break;
      }
      default:
        return json(res, 404, { error: 'Finnes ikke' });
    }
    return json(res, 200, vekker.view());
  }

  /** Server-Sent Events: nettsiden får ny visning hver gang noe endrer seg, og minst hvert 30. sekund. */
  function events(req: IncomingMessage, res: ServerResponse): void {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-store',
      Connection: 'keep-alive',
    });
    const send = (view: unknown) => res.write(`data: ${JSON.stringify(view)}\n\n`);
    send(vekker.view());
    const unsubscribe = vekker.subscribe(send);
    const ping = setInterval(() => res.write(': ping\n\n'), 25_000);
    req.on('close', () => {
      unsubscribe();
      clearInterval(ping);
    });
  }

  async function staticFile(res: ServerResponse, path: string): Promise<void> {
    let file = resolve(join(dist, path === '/' ? 'index.html' : path));
    if (file !== dist && !file.startsWith(dist + sep)) return json(res, 403, { error: 'Nei' });
    try {
      if (!(await stat(file)).isFile()) throw new Error('mappe');
    } catch {
      file = join(dist, 'index.html');
    }
    try {
      const data = await readFile(file);
      const isIndex = file.endsWith('index.html');
      res.writeHead(200, {
        'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream',
        'Cache-Control': isIndex ? 'no-cache' : file.includes(`${sep}assets${sep}`) ? 'public, max-age=31536000, immutable' : 'public, max-age=3600',
      });
      res.end(data);
    } catch {
      res.writeHead(503, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Nettsiden er ikke bygget ennå. Kjør «npm run build».');
    }
  }

  return createServer((req, res) => {
    const host = String(req.headers.host ?? '').replace(/:\d+$/, '');
    if (!LOCAL_HOSTS.has(host)) {
      res.writeHead(403);
      res.end();
      return;
    }
    const url = new URL(req.url ?? '/', 'http://localhost');
    let path: string;
    try {
      path = decodeURIComponent(url.pathname);
    } catch {
      return json(res, 400, { error: 'Ugyldig adresse' });
    }
    const handler = path.startsWith('/api/') ? api(req, res, path) : staticFile(res, path);
    handler.catch((err: Error) => {
      log(`Feil på ${req.method} ${path}: ${err.message}`);
      if (!res.headersSent) json(res, 500, { error: 'Noe gikk galt' });
      else res.end();
    });
  });
}
