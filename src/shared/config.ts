import { isTime } from './time.ts';
import type { Config, State } from './types.ts';

export const DEFAULT_CONFIG: Config = {
  alarms: ['06:30', '06:30', '06:30', '06:30', '06:30', null, null],
  sleepHours: 8,
  sunriseMinutes: 30,
  eveningFrom: '21:30',
  lateBedtime: '23:30',
  autoNightAfterMinutes: 60,
  noAlarmMorning: '09:00',
  morningMinutes: 45,
  maxRingMinutes: 60,
  volume: { start: 8, end: 50, rampSeconds: 180 },
  radio: { name: 'NRK P1 Trøndelag', url: 'https://lyd.nrk.no/nrk_radio_p1_trondelag_mp3_h' },
  place: { name: 'Trondheim', lat: 63.4305, lon: 10.3951 },
  calendarUrl: '',
  glimtSeconds: 10,
};

export const EMPTY_STATE: State = { overrides: {}, night: null, dismissedAt: null, test: null };

type Result = { ok: true; config: Config } | { ok: false; error: string };

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function num(v: unknown, min: number, max: number): v is number {
  return typeof v === 'number' && Number.isFinite(v) && v >= min && v <= max;
}

/**
 * Legger `input` oppå standardinnstillingene og sjekker alt. Felt som mangler, får standardverdien,
 * så en eldre fil virker etter at nye innstillinger er lagt til.
 */
export function parseConfig(input: unknown): Result {
  if (!isRecord(input)) return { ok: false, error: 'Innstillingene må være et objekt.' };
  const c: Config = {
    ...DEFAULT_CONFIG,
    ...input,
    volume: { ...DEFAULT_CONFIG.volume, ...(isRecord(input.volume) ? input.volume : {}) },
    radio: { ...DEFAULT_CONFIG.radio, ...(isRecord(input.radio) ? input.radio : {}) },
    place: { ...DEFAULT_CONFIG.place, ...(isRecord(input.place) ? input.place : {}) },
  } as Config;

  if (!Array.isArray(c.alarms) || c.alarms.length !== 7 || !c.alarms.every((a) => a === null || isTime(a))) {
    return { ok: false, error: 'Alarmtidene må være sju klokkeslett (HH:MM) eller tomme.' };
  }
  for (const key of ['eveningFrom', 'lateBedtime', 'noAlarmMorning'] as const) {
    if (!isTime(c[key])) return { ok: false, error: `${key} må være et klokkeslett (HH:MM).` };
  }
  if (!num(c.sleepHours, 4, 12)) return { ok: false, error: 'Søvn må være mellom 4 og 12 timer.' };
  if (!num(c.sunriseMinutes, 0, 90)) return { ok: false, error: 'Soloppgangen må være 0–90 minutter.' };
  if (!num(c.autoNightAfterMinutes, 0, 360)) return { ok: false, error: 'Automatisk natt må være 0–360 minutter.' };
  if (!num(c.morningMinutes, 1, 240)) return { ok: false, error: 'Morgenskjermen må stå 1–240 minutter.' };
  if (!num(c.maxRingMinutes, 1, 180)) return { ok: false, error: 'Alarmen må ringe 1–180 minutter.' };
  if (!num(c.glimtSeconds, 2, 60)) return { ok: false, error: 'Glimtet må vare 2–60 sekunder.' };
  const v = c.volume;
  if (!num(v.start, 0, 100) || !num(v.end, 0, 100) || !num(v.rampSeconds, 0, 1800)) {
    return { ok: false, error: 'Volumet må være 0–100 %, og økningen 0–1800 sekunder.' };
  }
  if (typeof c.radio.name !== 'string' || typeof c.radio.url !== 'string' || !/^https?:\/\//.test(c.radio.url)) {
    return { ok: false, error: 'Radioen trenger et navn og en adresse som starter med http.' };
  }
  const p = c.place;
  if (typeof p.name !== 'string' || !num(p.lat, -90, 90) || !num(p.lon, -180, 180)) {
    return { ok: false, error: 'Stedet trenger navn, breddegrad og lengdegrad.' };
  }
  if (typeof c.calendarUrl !== 'string' || (c.calendarUrl !== '' && !/^(https?|webcal):\/\//.test(c.calendarUrl))) {
    return { ok: false, error: 'Kalenderadressen må starte med https:// eller webcal://.' };
  }

  // Bare kjente felt lagres.
  const clean: Config = {
    alarms: c.alarms,
    sleepHours: c.sleepHours,
    sunriseMinutes: c.sunriseMinutes,
    eveningFrom: c.eveningFrom,
    lateBedtime: c.lateBedtime,
    autoNightAfterMinutes: c.autoNightAfterMinutes,
    noAlarmMorning: c.noAlarmMorning,
    morningMinutes: c.morningMinutes,
    maxRingMinutes: c.maxRingMinutes,
    volume: { start: v.start, end: v.end, rampSeconds: v.rampSeconds },
    radio: { name: c.radio.name.trim() || 'Radio', url: c.radio.url.trim() },
    place: { name: p.name.trim(), lat: p.lat, lon: p.lon },
    calendarUrl: c.calendarUrl.trim(),
    glimtSeconds: c.glimtSeconds,
  };
  return { ok: true, config: clean };
}

/** Leser lagret tilstand og fyller inn det som mangler. */
export function parseState(input: unknown): State {
  if (!isRecord(input)) return { ...EMPTY_STATE };
  const overrides: State['overrides'] = {};
  if (isRecord(input.overrides)) {
    for (const [k, v] of Object.entries(input.overrides)) {
      if (/^\d{4}-\d{2}-\d{2}$/.test(k) && (v === null || isTime(v))) overrides[k] = v;
    }
  }
  const n = input.night;
  const night: State['night'] =
    isRecord(n) && typeof n.from === 'string'
      ? {
          from: n.from,
          endedAt: typeof n.endedAt === 'string' ? n.endedAt : null,
          endedBy: n.endedBy === 'alarm' || n.endedBy === 'morning' || n.endedBy === 'cancel' ? n.endedBy : null,
        }
      : null;
  const t = input.test;
  return {
    overrides,
    night,
    dismissedAt: typeof input.dismissedAt === 'string' ? input.dismissedAt : null,
    test:
      isRecord(t) && typeof t.at === 'string' && typeof t.sunriseSeconds === 'number'
        ? { at: t.at, sunriseSeconds: t.sunriseSeconds }
        : null,
  };
}
