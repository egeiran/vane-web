import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { describe, test } from 'node:test';

import { eventsOnDay, nextEventToday } from '../src/shared/calendar.ts';
import { DEFAULT_CONFIG, parseConfig, parseState } from '../src/shared/config.ts';
import { sky, sunriseProgress } from '../src/shared/sky.ts';
import {
  addDays,
  dateLabel,
  durationLabel,
  formatMinutes,
  hoursLabel,
  parseTime,
  showTime,
  weekday,
} from '../src/shared/time.ts';
import { type MetResponse, summarize, symbolKind, symbolText, windDirection } from '../src/shared/weather.ts';

describe('tid', () => {
  test('klokkeslett', () => {
    assert.equal(parseTime('06:30'), 390);
    assert.equal(parseTime('24:00'), null);
    assert.equal(parseTime('6:30'), null);
    assert.equal(formatMinutes(390 - 480), '22:30');
    assert.equal(formatMinutes(1440 + 5), '00:05');
  });

  test('datoer og varighet på norsk', () => {
    assert.equal(dateLabel(new Date('2026-11-06T12:00')), 'Fredag 6. november');
    assert.equal(weekday(new Date('2026-11-09T12:00')), 0);
    assert.equal(durationLabel(256 * 60_000), '4 t 16 min');
    assert.equal(durationLabel(45 * 60_000), '45 min');
    assert.equal(durationLabel(8 * 3_600_000), '8 timer');
    assert.equal(hoursLabel(7.5), '7,5 timer');
  });

  test('en dag senere er samme klokkeslett, også når sommertiden slutter', () => {
    assert.equal(showTime(addDays(new Date('2026-10-24T06:30'), 1)), '06:30');
  });
});

describe('innstillinger', () => {
  test('tomt objekt gir standardinnstillingene', () => {
    assert.deepEqual(parseConfig({}), { ok: true, config: DEFAULT_CONFIG });
  });

  test('delvise innstillinger fylles ut, og ukjente felt forsvinner', () => {
    const res = parseConfig({ sleepHours: 7.5, volume: { end: 70 }, ukjent: true });
    assert.ok(res.ok);
    assert.equal(res.config.sleepHours, 7.5);
    assert.deepEqual(res.config.volume, { ...DEFAULT_CONFIG.volume, end: 70 });
    assert.equal('ukjent' in res.config, false);
  });

  test('feil sies fra om på norsk', () => {
    assert.equal(parseConfig({ alarms: ['06:30'] }).ok, false);
    assert.equal(parseConfig({ eveningFrom: '25:00' }).ok, false);
    assert.equal(parseConfig({ radio: { name: 'P1', url: 'ftp://x' } }).ok, false);
    assert.equal(parseConfig({ calendarUrl: 'javascript:alert(1)' }).ok, false);
    assert.equal(parseConfig({ calendarUrl: 'webcal://example.com/basic.ics' }).ok, true);
    assert.equal(parseConfig({ sleepHours: Number.NaN }).ok, false);
  });

  test('ødelagt tilstand gir tom tilstand', () => {
    assert.deepEqual(parseState('tull'), { overrides: {}, night: null, dismissedAt: null, test: null });
    assert.deepEqual(parseState({ overrides: { '2026-11-06': '07:00', tull: 'x', '2026-11-07': '99:99' } }).overrides, {
      '2026-11-06': '07:00',
    });
  });
});

describe('soloppgang', () => {
  test('fra svart til varmt lys', () => {
    assert.equal(sky(0).center, 'rgb(0, 0, 0)');
    assert.equal(sky(1).center, 'rgb(255, 244, 230)');
    assert.equal(sky(-1).center, sky(0).center);
    assert.match(sky(0.2).ink, /^rgba\(255/);
    assert.match(sky(0.9).ink, /^rgba\(70/);
  });

  test('framdrift', () => {
    assert.equal(sunriseProgress(5, 0, 10), 0.5);
    assert.equal(sunriseProgress(20, 0, 10), 1);
    assert.equal(sunriseProgress(5, 10, 10), 1);
  });
});

describe('været', () => {
  const met = JSON.parse(readFileSync(new URL('./fixtures/met-trondheim.json', import.meta.url), 'utf8')) as MetResponse;

  test('symboler på norsk', () => {
    assert.equal(symbolText('lightrain'), 'Lett regn');
    assert.equal(symbolText('partlycloudy_night'), 'Delvis skyet');
    assert.equal(symbolText('lightrainshowersandthunder_day'), 'Lette regnbyger og torden');
    assert.equal(symbolKind('clearsky_night'), 'moon');
    assert.equal(symbolKind('heavysleetshowers_day'), 'sleet');
    assert.equal(symbolKind('rainandthunder'), 'thunder');
    assert.equal(windDirection(225), 'sørvest');
    assert.equal(windDirection(359), 'nord');
  });

  test('et ekte varsel fra MET for Trondheim', () => {
    const now = new Date('2026-11-08T06:42');
    const f = summarize(met, now, 'Trondheim');
    assert.ok(f);
    assert.equal(f.place, 'Trondheim');
    assert.equal(new Date(f.now.time).getHours(), 6);
    assert.ok(f.hours.length > 0 && f.hours.length <= 5);
    for (const h of f.hours) assert.ok([7, 9, 12, 15, 18, 21].includes(h.hour));
    assert.ok(f.max >= f.min);
    assert.equal(typeof f.now.windFrom, 'string');
  });
});

describe('kalenderen', () => {
  const events = [
    { start: '2026-11-06T08:00:00.000Z', end: '2026-11-06T08:30:00.000Z', title: 'Møte', allDay: false },
    { start: '2026-11-05T23:00:00.000Z', end: '2026-11-06T23:00:00.000Z', title: 'Bursdag', allDay: true },
    { start: '2026-11-06T16:30:00.000Z', end: '2026-11-06T17:30:00.000Z', title: 'Trening', allDay: false },
    { start: '2026-11-07T10:00:00.000Z', end: '2026-11-07T11:00:00.000Z', title: 'Brunsj', allDay: false },
  ];

  test('dagens avtaler, heldagsavtaler først', () => {
    assert.deepEqual(
      eventsOnDay(events, new Date('2026-11-06T12:00')).map((e) => e.title),
      ['Bursdag', 'Møte', 'Trening'],
    );
  });

  test('neste avtale i dag', () => {
    assert.equal(nextEventToday(events, new Date('2026-11-06T12:00'))?.title, 'Trening');
    assert.equal(nextEventToday(events, new Date('2026-11-06T18:00')), null);
  });
});
