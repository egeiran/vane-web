import { summarize, type Forecast, type MetResponse } from '../shared/weather.ts';
import type { Config } from '../shared/types.ts';
import type { Store } from './store.ts';

/**
 * MET krever at klienten sier hvem den er, og at vi respekterer `Expires`.
 * Se https://api.met.no/doc/TermsOfService.
 */
const USER_AGENT = 'vane-web/0.1 github.com/egeiran/vane-web';
const CACHE_FILE = 'weather-cache.json';

type Cache = { key: string; body: MetResponse; expires: number; lastModified: string | null };

export class Weather {
  private store: Store;
  private log: (msg: string) => void;
  private cache: Cache | null;
  private pending: Promise<void> | null = null;

  constructor(store: Store, log: (msg: string) => void) {
    this.store = store;
    this.log = log;
    this.cache = (store.readJson(CACHE_FILE) as Cache | undefined) ?? null;
  }

  async forecast(config: Config, now: Date): Promise<Forecast | null> {
    // MET vil ha maks fire desimaler.
    const lat = config.place.lat.toFixed(4);
    const lon = config.place.lon.toFixed(4);
    const key = `${lat},${lon}`;
    if (!this.cache || this.cache.key !== key || Date.now() >= this.cache.expires) {
      this.pending ??= this.refresh(key, lat, lon).finally(() => {
        this.pending = null;
      });
      await this.pending;
    }
    if (!this.cache || this.cache.key !== key) return null;
    return summarize(this.cache.body, now, config.place.name);
  }

  private async refresh(key: string, lat: string, lon: string): Promise<void> {
    const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`;
    const headers: Record<string, string> = { 'User-Agent': USER_AGENT };
    if (this.cache?.key === key && this.cache.lastModified) headers['If-Modified-Since'] = this.cache.lastModified;
    try {
      const res = await fetch(url, { headers, signal: AbortSignal.timeout(15_000) });
      const expiresHeader = res.headers.get('expires');
      const expires = expiresHeader ? Date.parse(expiresHeader) : Date.now() + 30 * 60_000;
      if (res.status === 304 && this.cache) {
        this.cache = { ...this.cache, expires };
      } else if (res.ok) {
        const body = (await res.json()) as MetResponse;
        this.cache = { key, body, expires, lastModified: res.headers.get('last-modified') };
      } else {
        this.log(`Været: MET svarte ${res.status}`);
        this.backOff();
        return;
      }
      this.store.writeJson(CACHE_FILE, this.cache);
    } catch (err) {
      this.log(`Været: fikk ikke kontakt med MET (${(err as Error).message})`);
      this.backOff();
    }
  }

  /** Prøv igjen om fem minutter, og vis det gamle varselet så lenge. */
  private backOff(): void {
    if (this.cache) this.cache = { ...this.cache, expires: Date.now() + 5 * 60_000 };
  }
}
