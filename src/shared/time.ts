/**
 * Tid og datoer. Klokkeslett lagres som `HH:MM` (24 timer), datoer som lokale `YYYY-MM-DD`.
 * Alt regnes i Macens lokale tid.
 */

export type DateKey = string;

export const SECOND = 1000;
export const MINUTE = 60 * SECOND;
export const HOUR = 60 * MINUTE;

const DAYS = ['mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag', 'søndag'];
const MONTHS = [
  'januar',
  'februar',
  'mars',
  'april',
  'mai',
  'juni',
  'juli',
  'august',
  'september',
  'oktober',
  'november',
  'desember',
];

/** Minutter etter midnatt, eller `null` hvis teksten ikke er `HH:MM`. */
export function parseTime(time: string): number | null {
  const m = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(time);
  return m ? Number(m[1]) * 60 + Number(m[2]) : null;
}

export function isTime(value: unknown): value is string {
  return typeof value === 'string' && parseTime(value) !== null;
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

/** `HH:MM` fra minutter etter midnatt. Går rundt døgnet (−30 blir 23:30). */
export function formatMinutes(minutes: number): string {
  const m = ((Math.round(minutes) % 1440) + 1440) % 1440;
  return `${pad(Math.floor(m / 60))}:${pad(m % 60)}`;
}

/** Klokkeslettet til et tidspunkt, `HH:MM`. */
export function showTime(d: Date): string {
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function dateKey(d: Date): DateKey {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function fromDateKey(key: DateKey): Date {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/** Samme klokkeslett `n` dager senere (riktig også over sommertid). */
export function addDays(d: Date, n: number): Date {
  return new Date(
    d.getFullYear(),
    d.getMonth(),
    d.getDate() + n,
    d.getHours(),
    d.getMinutes(),
    d.getSeconds(),
    d.getMilliseconds(),
  );
}

export function addMinutes(d: Date, minutes: number): Date {
  return new Date(d.getTime() + minutes * MINUTE);
}

/** Datoen til `day`, på klokkeslettet `time`. */
export function atTime(day: Date, time: string): Date {
  const m = parseTime(time) ?? 0;
  return new Date(day.getFullYear(), day.getMonth(), day.getDate(), Math.floor(m / 60), m % 60);
}

/** Ukedag med mandag = 0. */
export function weekday(d: Date): number {
  return (d.getDay() + 6) % 7;
}

export function weekdayName(d: Date): string {
  return DAYS[weekday(d)];
}

export const WEEKDAY_NAMES = DAYS;

/** «Fredag 6. november» */
export function dateLabel(d: Date): string {
  const day = weekdayName(d);
  return `${day[0].toUpperCase()}${day.slice(1)} ${d.getDate()}. ${MONTHS[d.getMonth()]}`;
}

/** «4 t 16 min», «45 min», «8 timer». */
export function durationLabel(ms: number): string {
  const total = Math.max(0, Math.round(ms / MINUTE));
  const h = Math.floor(total / 60);
  const m = total % 60;
  if (h === 0) return `${m} min`;
  if (m === 0) return h === 1 ? '1 time' : `${h} timer`;
  return `${h} t ${m} min`;
}

/** «8 timer», «7,5 timer». */
export function hoursLabel(hours: number): string {
  const text = String(hours).replace('.', ',');
  return hours === 1 ? '1 time' : `${text} timer`;
}
