import { addDays, startOfDay } from './time.ts';

export type CalendarEvent = {
  start: string;
  end: string;
  title: string;
  allDay: boolean;
};

/** Avtalene som berører dagen `day`, heldagsavtaler først og så etter starttid. */
export function eventsOnDay(events: CalendarEvent[], day: Date): CalendarEvent[] {
  const from = startOfDay(day).getTime();
  const to = addDays(startOfDay(day), 1).getTime();
  return events
    .filter((e) => Date.parse(e.start) < to && Date.parse(e.end) > from)
    .sort((a, b) => Number(b.allDay) - Number(a.allDay) || Date.parse(a.start) - Date.parse(b.start));
}

/** Neste avtale i dag som ikke har startet, uten heldagsavtaler. */
export function nextEventToday(events: CalendarEvent[], now: Date): CalendarEvent | null {
  return (
    eventsOnDay(events, now).find((e) => !e.allDay && Date.parse(e.start) > now.getTime()) ?? null
  );
}
