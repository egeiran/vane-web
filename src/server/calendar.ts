import { addDays, startOfDay } from '../shared/time.ts';
import type { CalendarResponse, Config } from '../shared/types.ts';
import { eventsBetween } from './ical.ts';

const FRESH_MS = 10 * 60_000;

/** Henter kalenderen høyst hvert tiende minutt og husker siste svar hvis nettet er nede. */
export class Calendar {
  private log: (msg: string) => void;
  private cache: { url: string; text: string; fetchedAt: number } | null = null;
  private lastError: string | null = null;

  constructor(log: (msg: string) => void) {
    this.log = log;
  }

  async today(config: Config, now: Date): Promise<CalendarResponse> {
    const url = config.calendarUrl.replace(/^webcal:\/\//, 'https://');
    if (!url) return { configured: false, events: [], error: null };
    if (!this.cache || this.cache.url !== url || Date.now() - this.cache.fetchedAt > FRESH_MS) {
      await this.refresh(url);
    }
    if (!this.cache || this.cache.url !== url) {
      return { configured: true, events: [], error: this.lastError ?? 'Fikk ikke hentet kalenderen.' };
    }
    try {
      const from = startOfDay(now);
      const events = eventsBetween(this.cache.text, from, addDays(from, 2));
      return { configured: true, events, error: null };
    } catch (err) {
      this.log(`Kalender: kunne ikke lese filen (${(err as Error).message})`);
      return { configured: true, events: [], error: 'Kalenderfilen kunne ikke leses.' };
    }
  }

  private async refresh(url: string): Promise<void> {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(20_000) });
      if (!res.ok) throw new Error(`svarte ${res.status}`);
      this.cache = { url, text: await res.text(), fetchedAt: Date.now() };
      this.lastError = null;
    } catch (err) {
      this.log(`Kalender: ${(err as Error).message}`);
      this.lastError = 'Fikk ikke hentet kalenderen.';
      // Prøv igjen om et minutt, og vis det gamle svaret så lenge.
      if (this.cache?.url === url) this.cache = { ...this.cache, fetchedAt: Date.now() - FRESH_MS + 60_000 };
    }
  }
}
