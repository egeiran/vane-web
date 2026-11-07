/**
 * Leser en iCal-fil (for eksempel den hemmelige adressen fra Google Kalender) og finner avtalene
 * i et tidsrom, også gjentakende avtaler, flyttede forekomster og heldagsavtaler.
 */
import ICAL from 'ical.js';

import type { CalendarEvent } from '../shared/calendar.ts';

/** Stopper gjentakelser som aldri slutter. Daglige avtaler i over 100 år går fortsatt. */
const MAX_OCCURRENCES = 50_000;

export function eventsBetween(ics: string, from: Date, to: Date): CalendarEvent[] {
  const root = new ICAL.Component(ICAL.parse(ics));
  for (const tz of root.getAllSubcomponents('vtimezone')) {
    ICAL.TimezoneService.register(new ICAL.Timezone(tz));
  }

  const masters = new Map<string, InstanceType<typeof ICAL.Event>>();
  const exceptions: InstanceType<typeof ICAL.Event>[] = [];
  for (const vevent of root.getAllSubcomponents('vevent')) {
    const event = new ICAL.Event(vevent);
    if (event.isRecurrenceException()) exceptions.push(event);
    else masters.set(event.uid, event);
  }
  const lonely: InstanceType<typeof ICAL.Event>[] = [];
  for (const ex of exceptions) {
    const master = masters.get(ex.uid);
    if (master) master.relateException(ex);
    else lonely.push(ex);
  }

  const out: CalendarEvent[] = [];
  const add = (
    item: InstanceType<typeof ICAL.Event>,
    start: InstanceType<typeof ICAL.Time>,
    end: InstanceType<typeof ICAL.Time>,
  ) => {
    const status = String(item.component.getFirstPropertyValue('status') ?? '').toUpperCase();
    if (status === 'CANCELLED') return;
    const s = start.toJSDate();
    const e = end ? end.toJSDate() : s;
    // En avtale uten varighet varer et øyeblikk, men skal likevel telle.
    const effectiveEnd = e.getTime() > s.getTime() ? e : new Date(s.getTime() + 1);
    if (s < to && effectiveEnd > from) {
      out.push({
        start: s.toISOString(),
        end: effectiveEnd.toISOString(),
        title: item.summary?.trim() || 'Uten tittel',
        allDay: start.isDate,
      });
    }
  };

  for (const event of [...masters.values(), ...lonely]) {
    if (!event.startDate) continue;
    if (event.isRecurring()) {
      const it = event.iterator();
      for (let i = 0, next = it.next(); next && i < MAX_OCCURRENCES; i++, next = it.next()) {
        const details = event.getOccurrenceDetails(next);
        if (details.startDate.toJSDate() >= to) break;
        add(details.item, details.startDate, details.endDate);
      }
    } else {
      add(event, event.startDate, event.endDate);
    }
  }

  return out.sort((a, b) => Date.parse(a.start) - Date.parse(b.start));
}
