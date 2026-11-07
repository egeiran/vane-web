/**
 * Døgnet til vekkerklokka, som ren logikk: når alarmen går, når det er kveld, natt, soloppgang,
 * alarm, morgen og dag. Serveren kaller `evaluate` hvert sekund og gjør det som trengs når fasen
 * endrer seg.
 */
import {
  HOUR,
  MINUTE,
  SECOND,
  addDays,
  addMinutes,
  atTime,
  dateKey,
  parseTime,
  startOfDay,
  weekday,
  weekdayName,
} from './time.ts';
import type { Config, NightEnd, Phase, State, View } from './types.ts';

export type Alarm = { at: Date; sunriseFrom: Date; test: boolean };

/** Alarmtiden en bestemt dag: endringen fra God natt hvis den finnes, ellers den faste tiden. */
export function alarmTimeFor(day: Date, config: Config, state: State): string | null {
  const key = dateKey(day);
  if (Object.hasOwn(state.overrides, key)) return state.overrides[key];
  return config.alarms[weekday(day)] ?? null;
}

function alarmOn(day: Date, time: string, config: Config): Alarm {
  const at = atTime(day, time);
  return { at, sunriseFrom: addMinutes(at, -config.sunriseMinutes), test: false };
}

/** En alarm er ferdig når den er skrudd av etter at soloppgangen startet. */
function isDismissed(alarm: Alarm, state: State): boolean {
  return state.dismissedAt !== null && Date.parse(state.dismissedAt) >= alarm.sunriseFrom.getTime();
}

/** Alarmen som ringer nå, eller den neste. Alarmer som er skrudd av eller har gitt seg, telles ikke. */
export function nextAlarm(now: Date, config: Config, state: State): Alarm | null {
  const candidates: Alarm[] = [];
  if (state.test) {
    const at = new Date(state.test.at);
    candidates.push({ at, sunriseFrom: new Date(at.getTime() - state.test.sunriseSeconds * SECOND), test: true });
  }
  const today = startOfDay(now);
  for (let i = -1; i <= 7; i++) {
    const day = addDays(today, i);
    const time = alarmTimeFor(day, config, state);
    if (time) candidates.push(alarmOn(day, time, config));
  }
  const stillLive = (a: Alarm) =>
    a.at.getTime() + config.maxRingMinutes * MINUTE > now.getTime() && !isDismissed(a, state);
  return candidates.filter(stillLive).sort((a, b) => a.at.getTime() - b.at.getTime())[0] ?? null;
}

/** Morgenen som kommer: i morgen fra kl. 12, ellers i dag. Det er den God natt viser. */
export function upcomingMorning(now: Date): Date {
  const today = startOfDay(now);
  return now.getHours() >= 12 ? addDays(today, 1) : today;
}

/** Når morgenen `day` begynner: soloppgangen hvis det er alarm, ellers `noAlarmMorning`. */
function morningStart(day: Date, config: Config, state: State): { at: Date; by: NightEnd } {
  const time = alarmTimeFor(day, config, state);
  if (time) return { at: alarmOn(day, time, config).sunriseFrom, by: 'alarm' };
  return { at: atTime(day, config.noAlarmMorning), by: 'morning' };
}

/** Når natta som startet `from` slutter, og hvorfor. */
export function nightUntil(from: Date, config: Config, state: State): { at: Date; by: NightEnd } {
  return morningStart(upcomingMorning(from), config, state);
}

/** Leggetiden før morgenen `day`, eller `null` når det ikke er alarm. */
function bedtimeBefore(day: Date, config: Config, state: State): Date | null {
  const time = alarmTimeFor(day, config, state);
  return time ? addMinutes(atTime(day, time), -config.sleepHours * 60) : null;
}

/** Når natta starter av seg selv hvis ingen trykker God natt. */
export function autoNightAt(now: Date, config: Config, state: State): Date {
  const morning = upcomingMorning(now);
  const bed = bedtimeBefore(morning, config, state);
  if (bed) return addMinutes(bed, config.autoNightAfterMinutes);
  const evening = addDays(morning, -1);
  const late = parseTime(config.lateBedtime) ?? 0;
  // En sen leggetid som 00:30 hører til natta etter kvelden.
  const lateAt = atTime(late < 12 * 60 ? morning : evening, config.lateBedtime);
  return addMinutes(lateAt, config.autoNightAfterMinutes);
}

/**
 * Kveld er fra `eveningFrom` (eller en time før leggetid, hvis det er tidligere) og helt til
 * morgenen begynner. Uten natt er det altså varmt og dempet hele natta.
 */
function isEvening(now: Date, config: Config, state: State): boolean {
  const today = startOfDay(now);
  if (now < morningStart(today, config, state).at) return true;
  let start = atTime(today, config.eveningFrom);
  const bed = bedtimeBefore(addDays(today, 1), config, state);
  if (bed) {
    const early = addMinutes(bed, -60);
    if (early < start) start = early;
  }
  return now >= start;
}

export type Evaluation = {
  phase: Phase;
  alarm: Alarm | null;
  bedtime: Date | null;
  autoNightAt: Date;
  /** Natta har nådd slutten sin, men det er ikke lagret ennå. */
  nightEnded: { at: Date; by: NightEnd } | null;
  /** Det er på tide å starte natta av seg selv. */
  autoNightDue: boolean;
};

export function evaluate(now: Date, config: Config, state: State): Evaluation {
  const t = now.getTime();
  const alarm = nextAlarm(now, config, state);
  const bedtime = bedtimeBefore(upcomingMorning(now), config, state);
  const autoNight = autoNightAt(now, config, state);
  const dismissed = state.dismissedAt ? Date.parse(state.dismissedAt) : null;
  const morningMs = config.morningMinutes * MINUTE;

  // Natta: lagret slutt, eller slutten den har nådd nå.
  const night = state.night;
  let nightOn = false;
  let nightEnded: Evaluation['nightEnded'] = null;
  let end: { at: number; by: NightEnd } | null = null;
  if (night) {
    const from = Date.parse(night.from);
    if (night.endedAt) {
      end = { at: Date.parse(night.endedAt), by: night.endedBy ?? 'cancel' };
    } else if (dismissed !== null && dismissed > from) {
      end = { at: dismissed, by: 'alarm' };
      nightEnded = { at: new Date(dismissed), by: 'alarm' };
    } else {
      const until = nightUntil(new Date(from), config, state);
      if (t >= until.at.getTime()) {
        end = { at: until.at.getTime(), by: until.by };
        nightEnded = until;
      } else {
        nightOn = t >= from;
      }
    }
  }

  let phase: Phase;
  if (alarm && t >= alarm.at.getTime()) phase = 'alarm';
  else if (alarm && t >= alarm.sunriseFrom.getTime()) phase = 'sunrise';
  else if (dismissed !== null && t >= dismissed && t - dismissed < morningMs) phase = 'morning';
  else if (nightOn) phase = 'night';
  else if (end && end.by === 'morning' && t - end.at < morningMs) phase = 'morning';
  else if (isEvening(now, config, state)) phase = 'evening';
  else phase = 'day';

  // Ikke start natta av seg selv igjen hvis den allerede er startet (og kanskje avbrutt) i kveld.
  const startedTonight = night !== null && Date.parse(night.from) > autoNight.getTime() - 12 * HOUR;
  const autoNightDue = phase === 'evening' && t >= autoNight.getTime() && !startedTonight;

  return { phase, alarm, bedtime, autoNightAt: autoNight, nightEnded, autoNightDue };
}

/** Det nettsiden får, med tidspunkter som tekst. */
export function buildView(now: Date, config: Config, state: State, ev: Evaluation): View {
  const morning = upcomingMorning(now);
  return {
    now: now.toISOString(),
    phase: ev.phase,
    alarm: ev.alarm
      ? { at: ev.alarm.at.toISOString(), sunriseFrom: ev.alarm.sunriseFrom.toISOString(), test: ev.alarm.test }
      : null,
    upcoming: {
      date: dateKey(morning),
      weekday: weekdayName(morning),
      time: alarmTimeFor(morning, config, state),
      defaultTime: config.alarms[weekday(morning)] ?? null,
    },
    bedtime: ev.bedtime ? ev.bedtime.toISOString() : null,
    autoNightAt: ev.autoNightAt.toISOString(),
    config,
  };
}

/** Fjerner endringer for dager som er over. */
export function pruneOverrides(state: State, now: Date): State {
  const today = dateKey(startOfDay(now));
  const overrides = Object.fromEntries(Object.entries(state.overrides).filter(([k]) => k >= today));
  return { ...state, overrides };
}
