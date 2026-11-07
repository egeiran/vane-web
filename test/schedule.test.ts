import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

import { DEFAULT_CONFIG, EMPTY_STATE } from '../src/shared/config.ts';
import {
  alarmTimeFor,
  autoNightAt,
  buildView,
  evaluate,
  nextAlarm,
  pruneOverrides,
  upcomingMorning,
} from '../src/shared/schedule.ts';
import { showTime } from '../src/shared/time.ts';
import type { Config, State } from '../src/shared/types.ts';

// Torsdag 5. og fredag 6. november 2026. Standard: alarm 06:30 mandag–fredag, ingen i helga.
const at = (s: string) => new Date(s);
const config: Config = DEFAULT_CONFIG;
const night = (from: string): State => ({ ...EMPTY_STATE, night: { from: at(from).toISOString(), endedAt: null, endedBy: null } });
const phase = (now: string, state: State = EMPTY_STATE, c: Config = config) => evaluate(at(now), c, state).phase;

describe('alarmtider', () => {
  test('faste tider per ukedag, og endringer fra God natt går foran', () => {
    assert.equal(alarmTimeFor(at('2026-11-06T12:00'), config, EMPTY_STATE), '06:30');
    assert.equal(alarmTimeFor(at('2026-11-07T12:00'), config, EMPTY_STATE), null);
    const state = { ...EMPTY_STATE, overrides: { '2026-11-06': '07:15', '2026-11-07': '09:00' } };
    assert.equal(alarmTimeFor(at('2026-11-06T12:00'), config, state), '07:15');
    assert.equal(alarmTimeFor(at('2026-11-07T12:00'), config, state), '09:00');
    const off = { ...EMPTY_STATE, overrides: { '2026-11-06': null } };
    assert.equal(alarmTimeFor(at('2026-11-06T12:00'), config, off), null);
  });

  test('neste alarm hopper over helga', () => {
    const a = nextAlarm(at('2026-11-06T20:00'), config, EMPTY_STATE);
    assert.equal(a?.at.toString(), at('2026-11-09T06:30').toString());
    assert.equal(a?.sunriseFrom.toString(), at('2026-11-09T06:00').toString());
  });

  test('en alarm som ringer, er fortsatt den neste til den er skrudd av eller gir seg', () => {
    assert.equal(nextAlarm(at('2026-11-06T07:00'), config, EMPTY_STATE)?.at.toString(), at('2026-11-06T06:30').toString());
    assert.equal(nextAlarm(at('2026-11-06T07:31'), config, EMPTY_STATE)?.at.toString(), at('2026-11-09T06:30').toString());
    const dismissed = { ...EMPTY_STATE, dismissedAt: at('2026-11-06T06:31').toISOString() };
    assert.equal(nextAlarm(at('2026-11-06T06:40'), config, dismissed)?.at.toString(), at('2026-11-09T06:30').toString());
  });

  test('morgenen som kommer, er i morgen fra kl. 12', () => {
    assert.equal(upcomingMorning(at('2026-11-05T22:00')).getDate(), 6);
    assert.equal(upcomingMorning(at('2026-11-06T01:00')).getDate(), 6);
    assert.equal(upcomingMorning(at('2026-11-06T11:59')).getDate(), 6);
    assert.equal(upcomingMorning(at('2026-11-06T12:00')).getDate(), 7);
  });

  test('gamle endringer ryddes bort', () => {
    const state = { ...EMPTY_STATE, overrides: { '2026-11-04': '07:00', '2026-11-06': '07:15' } };
    assert.deepEqual(pruneOverrides(state, at('2026-11-05T08:00')).overrides, { '2026-11-06': '07:15' });
  });
});

describe('døgnet', () => {
  test('dag og kveld', () => {
    assert.equal(phase('2026-11-05T15:00'), 'day');
    assert.equal(phase('2026-11-05T21:29'), 'day');
    assert.equal(phase('2026-11-05T21:30'), 'evening');
  });

  test('leggetid er alarmen minus søvnen, og natta starter av seg selv en time etter', () => {
    const ev = evaluate(at('2026-11-05T22:00'), config, EMPTY_STATE);
    assert.equal(showTime(ev.bedtime!), '22:30');
    assert.equal(showTime(ev.autoNightAt), '23:30');
    assert.equal(ev.autoNightDue, false);
    assert.equal(evaluate(at('2026-11-05T23:30'), config, EMPTY_STATE).autoNightDue, true);
  });

  test('tidlig alarm gir tidligere kveld', () => {
    const early = { ...EMPTY_STATE, overrides: { '2026-11-06': '05:00' } };
    assert.equal(phase('2026-11-05T19:59', early), 'day');
    assert.equal(phase('2026-11-05T20:00', early), 'evening');
  });

  test('uten alarm i morgen brukes den sene leggetiden', () => {
    const ev = evaluate(at('2026-11-06T22:00'), config, EMPTY_STATE);
    assert.equal(ev.bedtime, null);
    assert.equal(ev.autoNightAt.toString(), at('2026-11-07T00:30').toString());
    assert.equal(evaluate(at('2026-11-07T00:30'), config, EMPTY_STATE).autoNightDue, true);
  });

  test('en natt med alarm: natt, soloppgang, alarm, morgen og dag', () => {
    const s = night('2026-11-05T22:40');
    assert.equal(phase('2026-11-05T22:39', s), 'evening');
    assert.equal(phase('2026-11-05T22:40', s), 'night');
    assert.equal(phase('2026-11-06T03:00', s), 'night');
    assert.equal(phase('2026-11-06T05:59', s), 'night');

    const sunrise = evaluate(at('2026-11-06T06:00'), config, s);
    assert.equal(sunrise.phase, 'sunrise');
    assert.deepEqual(sunrise.nightEnded, { at: at('2026-11-06T06:00'), by: 'alarm' });

    assert.equal(phase('2026-11-06T06:30', s), 'alarm');
    assert.equal(phase('2026-11-06T07:29', s), 'alarm');
    assert.equal(phase('2026-11-06T07:30', s), 'day');

    const dismissed = { ...s, dismissedAt: at('2026-11-06T06:31').toISOString() };
    assert.equal(phase('2026-11-06T06:31', dismissed), 'morning');
    assert.equal(phase('2026-11-06T07:15', dismissed), 'morning');
    assert.equal(phase('2026-11-06T07:16', dismissed), 'day');
  });

  test('alarmen kan skrus av under soloppgangen', () => {
    const s = { ...night('2026-11-05T22:40'), dismissedAt: at('2026-11-06T06:10').toISOString() };
    assert.equal(phase('2026-11-06T06:10', s), 'morning');
    assert.equal(phase('2026-11-06T06:30', s), 'morning');
    assert.equal(phase('2026-11-06T07:00', s), 'day');
  });

  test('en natt uten alarm slutter om morgenen, med morgenskjerm', () => {
    const s = night('2026-11-06T23:00');
    assert.equal(phase('2026-11-07T08:59', s), 'night');
    const ev = evaluate(at('2026-11-07T09:00'), config, s);
    assert.equal(ev.phase, 'morning');
    assert.deepEqual(ev.nightEnded, { at: at('2026-11-07T09:00'), by: 'morning' });
    assert.equal(phase('2026-11-07T09:45', s), 'day');
  });

  test('avbrutt natt er varm kveld til morgenen, og starter ikke av seg selv igjen', () => {
    const s: State = {
      ...EMPTY_STATE,
      night: { from: at('2026-11-05T22:40').toISOString(), endedAt: at('2026-11-06T01:00').toISOString(), endedBy: 'cancel' },
    };
    const ev = evaluate(at('2026-11-06T01:05'), config, s);
    assert.equal(ev.phase, 'evening');
    assert.equal(ev.autoNightDue, false);
    assert.equal(phase('2026-11-06T06:00', s), 'sunrise');
  });

  test('har ingen trykket God natt, er det kveld hele natta og natta starter av seg selv', () => {
    const ev = evaluate(at('2026-11-06T03:00'), config, EMPTY_STATE);
    assert.equal(ev.phase, 'evening');
    assert.equal(ev.autoNightDue, true);
  });

  test('en natt fra i går teller ikke i kveld', () => {
    const old: State = {
      ...EMPTY_STATE,
      night: { from: at('2026-11-04T22:30').toISOString(), endedAt: at('2026-11-05T06:00').toISOString(), endedBy: 'alarm' },
    };
    assert.equal(evaluate(at('2026-11-05T23:30'), config, old).autoNightDue, true);
  });

  test('prøvealarm: kort soloppgang og så alarm', () => {
    const s: State = { ...EMPTY_STATE, test: { at: at('2026-11-05T15:01').toISOString(), sunriseSeconds: 50 } };
    assert.equal(phase('2026-11-05T15:00:00', s), 'day');
    assert.equal(phase('2026-11-05T15:00:10', s), 'sunrise');
    assert.equal(phase('2026-11-05T15:01:00', s), 'alarm');
  });

  test('sommertid: alarmen går på riktig lokal tid', () => {
    // Sommertiden starter natt til søndag 28. mars 2027.
    const s = night('2027-03-28T22:30');
    assert.equal(phase('2027-03-29T05:59', s), 'night');
    assert.equal(phase('2027-03-29T06:00', s), 'sunrise');
    assert.equal(autoNightAt(at('2027-03-28T20:00'), config, EMPTY_STATE).toString(), at('2027-03-28T23:30').toString());
  });
});

describe('visningen', () => {
  test('viser morgenen som kommer og den faste tiden', () => {
    const state = { ...EMPTY_STATE, overrides: { '2026-11-06': '07:00' } };
    const now = at('2026-11-05T22:00');
    const view = buildView(now, config, state, evaluate(now, config, state));
    assert.deepEqual(view.upcoming, { date: '2026-11-06', weekday: 'fredag', time: '07:00', defaultTime: '06:30' });
    assert.equal(view.phase, 'evening');
    assert.equal(view.alarm?.at, at('2026-11-06T07:00').toISOString());
  });
});
