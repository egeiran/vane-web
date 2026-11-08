import type { CalendarEvent } from './calendar.ts';
import type { DateKey } from './time.ts';
import type { Forecast } from './weather.ts';

export type Config = {
  /** Faste alarmtider per ukedag, mandag først (7 stykker). `null` er ingen alarm den dagen. */
  alarms: (string | null)[];
  /** Hvor mange timer søvn leggetiden regnes ut fra. */
  sleepHours: number;
  /** Hvor mange minutter soloppgangen varer før alarmen. */
  sunriseMinutes: number;
  /** Når kvelden (varm og dempet) begynner. Kommer tidligere hvis leggetiden er tidlig. */
  eveningFrom: string;
  /** Leggetiden når det ikke er alarm neste morgen. */
  lateBedtime: string;
  /** Natta starter av seg selv så mange minutter etter leggetid. */
  autoNightAfterMinutes: number;
  /** Uten alarm slutter natta på dette klokkeslettet. */
  noAlarmMorning: string;
  /** Hvor mange minutter morgenskjermen står etter alarmen. */
  morningMinutes: number;
  /** Alarmen gir seg etter så mange minutter. */
  maxRingMinutes: number;
  /** Systemvolumet i prosent: starter lavt og øker over `rampSeconds`. */
  volume: { start: number; end: number; rampSeconds: number };
  radio: { name: string; url: string };
  place: { name: string; lat: number; lon: number };
  /** Den hemmelige iCal-adressen fra Google Kalender. Tom tekst betyr ingen kalender. */
  calendarUrl: string;
  /** Hvor mange sekunder klokka vises når du rører Macen om natta. */
  glimtSeconds: number;
};

export type NightEnd = 'alarm' | 'morning' | 'cancel';

export type NightState = {
  from: string;
  endedAt: string | null;
  endedBy: NightEnd | null;
};

export type State = {
  /** Alarmtid for én bestemt dato, satt på God natt. `null` er ingen alarm den dagen. */
  overrides: Record<DateKey, string | null>;
  night: NightState | null;
  /** Sist alarmen ble skrudd av. */
  dismissedAt: string | null;
  /** En prøvealarm fra Innstillinger. */
  test: { at: string; sunriseSeconds: number } | null;
};

/** Strømmen på Macen. `percent` er `null` på en Mac uten batteri. */
export type Power = { onBattery: boolean; percent: number | null };

export type Phase = 'evening' | 'night' | 'sunrise' | 'alarm' | 'morning' | 'day';

/** Det nettsiden trenger for å vise riktig skjerm. Tidspunkter som ISO-tekst. */
export type View = {
  now: string;
  phase: Phase;
  /** Alarmen som ringer nå, eller den neste. */
  alarm: { at: string; sunriseFrom: string; test: boolean } | null;
  /** Morgenen som kommer (i morgen etter kl. 12, ellers i dag). */
  upcoming: { date: DateKey; weekday: string; time: string | null; defaultTime: string | null };
  bedtime: string | null;
  autoNightAt: string;
  /** `null` når serveren ikke vet (utenfor macOS, eller før første måling). */
  power: Power | null;
  config: Config;
};

export type WeatherResponse = { forecast: Forecast | null };

export type CalendarResponse = { configured: boolean; events: CalendarEvent[]; error: string | null };
