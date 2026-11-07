/**
 * Været fra Meteorologisk institutt (Locationforecast 2.0, «compact»), gjort om til det
 * morgen- og dagskjermen viser. Dokumentasjon: https://api.met.no/weatherapi/locationforecast/2.0/documentation
 */
import { addDays, startOfDay } from './time.ts';

type Details = Record<string, number | undefined>;
type Period = { summary?: { symbol_code?: string }; details?: Details };

export type MetResponse = {
  properties: {
    meta: { updated_at: string };
    timeseries: {
      time: string;
      data: {
        instant: { details: Details };
        next_1_hours?: Period;
        next_6_hours?: Period;
        next_12_hours?: Period;
      };
    }[];
  };
};

export type WeatherKind = 'sun' | 'moon' | 'partly' | 'cloud' | 'rain' | 'sleet' | 'snow' | 'fog' | 'thunder';

export type Hour = {
  time: string;
  hour: number;
  temp: number;
  text: string;
  kind: WeatherKind;
  /** Nedbør neste time i mm, når det er meldt. */
  precipitation: number | null;
};

export type Forecast = {
  place: string;
  updatedAt: string;
  now: Hour & { wind: number | null; windFrom: string | null };
  max: number;
  min: number;
  hours: Hour[];
};

const TEXT: Record<string, string> = {
  clearsky: 'Klarvær',
  fair: 'Lettskyet',
  partlycloudy: 'Delvis skyet',
  cloudy: 'Skyet',
  fog: 'Tåke',
  lightrainshowers: 'Lette regnbyger',
  rainshowers: 'Regnbyger',
  heavyrainshowers: 'Kraftige regnbyger',
  lightrain: 'Lett regn',
  rain: 'Regn',
  heavyrain: 'Kraftig regn',
  lightsleetshowers: 'Lette sluddbyger',
  sleetshowers: 'Sluddbyger',
  heavysleetshowers: 'Kraftige sluddbyger',
  lightsleet: 'Lett sludd',
  sleet: 'Sludd',
  heavysleet: 'Kraftig sludd',
  lightsnowshowers: 'Lette snøbyger',
  snowshowers: 'Snøbyger',
  heavysnowshowers: 'Kraftige snøbyger',
  lightsnow: 'Lett snø',
  snow: 'Snø',
  heavysnow: 'Kraftig snø',
};

/** `lightrain_day` → `lightrain`. */
function base(code: string): string {
  return code.replace(/_(day|night|polartwilight)$/, '');
}

export function symbolText(code: string): string {
  const b = base(code);
  if (b.includes('andthunder')) {
    const without = b.replace('andthunder', '');
    return `${TEXT[without] ?? 'Byger'} og torden`;
  }
  return TEXT[b] ?? 'Ukjent vær';
}

export function symbolKind(code: string): WeatherKind {
  const b = base(code);
  if (b.includes('thunder')) return 'thunder';
  if (b.includes('sleet')) return 'sleet';
  if (b.includes('snow')) return 'snow';
  if (b.includes('rain')) return 'rain';
  if (b === 'fog') return 'fog';
  if (b === 'cloudy') return 'cloud';
  if (b === 'fair' || b === 'partlycloudy') return 'partly';
  return code.endsWith('_night') ? 'moon' : 'sun';
}

const DIRECTIONS = ['nord', 'nordøst', 'øst', 'sørøst', 'sør', 'sørvest', 'vest', 'nordvest'];

/** Vindretningen (hvor vinden kommer fra) i grader → «sørvest». */
export function windDirection(degrees: number): string {
  return DIRECTIONS[Math.round((((degrees % 360) + 360) % 360) / 45) % 8];
}

/** Timene morgenkortet viser. */
const SHOW_HOURS = [7, 9, 12, 15, 18, 21];

export function summarize(met: MetResponse, now: Date, place: string): Forecast | null {
  const series = met.properties.timeseries;
  if (series.length === 0) return null;
  const hourStart = new Date(now);
  hourStart.setMinutes(0, 0, 0);

  const toHour = (entry: (typeof series)[number]): Hour => {
    const d = entry.data;
    const period = d.next_1_hours ?? d.next_6_hours ?? d.next_12_hours;
    const code = period?.summary?.symbol_code ?? 'cloudy';
    const time = new Date(entry.time);
    return {
      time: entry.time,
      hour: time.getHours(),
      temp: Math.round(d.instant.details.air_temperature ?? 0),
      text: symbolText(code),
      kind: symbolKind(code),
      precipitation: d.next_1_hours?.details?.precipitation_amount ?? null,
    };
  };

  const current = series.find((e) => Date.parse(e.time) >= hourStart.getTime()) ?? series[series.length - 1];
  const details = current.data.instant.details;

  // Høyeste og laveste resten av dagen (og minst med timen nå).
  const endOfDay = addDays(startOfDay(now), 1).getTime();
  const rest = series.filter((e) => {
    const t = Date.parse(e.time);
    return t >= hourStart.getTime() && t < endOfDay;
  });
  const temps = (rest.length > 0 ? rest : [current]).map((e) => e.data.instant.details.air_temperature ?? 0);

  const hours = series
    .filter((e) => Date.parse(e.time) > hourStart.getTime() && SHOW_HOURS.includes(new Date(e.time).getHours()))
    .slice(0, 5)
    .map(toHour);

  return {
    place,
    updatedAt: met.properties.meta.updated_at,
    now: {
      ...toHour(current),
      wind: details.wind_speed ?? null,
      windFrom: details.wind_from_direction !== undefined ? windDirection(details.wind_from_direction) : null,
    },
    max: Math.round(Math.max(...temps)),
    min: Math.round(Math.min(...temps)),
    hours,
  };
}
