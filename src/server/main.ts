/**
 * Starter vekkerklokka: `node src/server/main.ts` (eller `npm start`, som bygger nettsiden først).
 *
 * Miljøvariabler:
 * - `PORT`: standard 4545. Serveren lytter bare på 127.0.0.1.
 * - `VANE_DATA`: mappen for innstillinger og tilstand, standard `data/` i repoet.
 * - `VANE_NOW`: start klokka på et annet tidspunkt, f.eks. `2026-11-06T06:20`, for å se døgnet uten
 *   å vente. Klokka går videre derfra.
 */
import { join, resolve } from 'node:path';

import { Calendar } from './calendar.ts';
import { createHttp } from './http.ts';
import { createMac } from './mac.ts';
import { Store } from './store.ts';
import { Vekker } from './vekker.ts';
import { Weather } from './weather.ts';

const root = resolve(import.meta.dirname, '../..');
const port = Number(process.env.PORT ?? 4545);
const log = (msg: string) => console.log(`${new Date().toLocaleString('nb-NO')}  ${msg}`);

const fakeStart = process.env.VANE_NOW ? Date.parse(process.env.VANE_NOW) : NaN;
const offset = Number.isFinite(fakeStart) ? fakeStart - Date.now() : 0;
const now = () => new Date(Date.now() + offset);
if (offset !== 0) log(`Klokka er satt til ${now().toLocaleString('nb-NO')} (VANE_NOW)`);

const store = new Store(process.env.VANE_DATA ?? join(root, 'data'), log);
const mac = createMac(log);
const vekker = new Vekker({ store, mac, now, log, chimeFile: join(root, 'public', 'chime.wav') });
const server = createHttp({
  vekker,
  weather: new Weather(store, log),
  calendar: new Calendar(log),
  distDir: join(root, 'dist'),
  now,
  log,
});

server.listen(port, '127.0.0.1', () => log(`Vane vekkerklokke kjører på http://127.0.0.1:${port}`));
vekker.start();

function shutdown() {
  vekker.stop();
  server.close();
  process.exit(0);
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
