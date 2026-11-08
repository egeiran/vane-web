import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { after, describe, test } from 'node:test';

import { eventsBetween } from '../src/server/ical.ts';
import type { Mac } from '../src/server/mac.ts';
import { Store } from '../src/server/store.ts';
import { Vekker } from '../src/server/vekker.ts';
import { showTime } from '../src/shared/time.ts';

describe('iCal', () => {
  const ics = readFileSync(new URL('./fixtures/calendar.ics', import.meta.url), 'utf8');
  const day = (d: string) => {
    const from = new Date(`${d}T00:00`);
    return eventsBetween(ics, from, new Date(from.getTime() + 24 * 3_600_000));
  };

  test('gjentakende, flyttet, heldags, avlyst og UTC', () => {
    const events = day('2026-11-06');
    assert.deepEqual(
      events.map((e) => [e.allDay ? 'hele dagen' : showTime(new Date(e.start)), e.title]),
      [
        ['hele dagen', 'Bursdag til Kari'],
        ['10:00', 'Møte med teamet (flyttet)'],
        ['17:30', 'Trening'],
      ],
    );
  });

  test('vanlig forekomst, og dager som er tatt ut', () => {
    assert.deepEqual(
      day('2026-11-04').map((e) => [showTime(new Date(e.start)), e.title]),
      [['09:00', 'Møte med teamet']],
    );
    assert.deepEqual(day('2026-11-05'), []);
  });
});

type Call = [string, ...unknown[]];

function recordingMac(calls: Call[]): Mac {
  return {
    sleepDisplay: () => calls.push(['sleepDisplay']),
    wakeDisplay: () => calls.push(['wakeDisplay']),
    keepDisplayOn: (on) => calls.push(['keepDisplayOn', on]),
    getVolume: async () => 25,
    setVolume: (v) => calls.push(['setVolume', Math.round(v)]),
    playFallback: (f) => calls.push(['playFallback', f]),
    close: () => {},
  };
}

describe('vekkeren', () => {
  const dir = mkdtempSync(join(tmpdir(), 'vane-web-'));
  after(() => rmSync(dir, { recursive: true, force: true }));

  test('gjør det Macen skal gjennom en natt, og husker det etter omstart', async () => {
    const calls: Call[] = [];
    let now = new Date('2026-11-05T22:00');
    const store = new Store(join(dir, 'a'), () => {});
    const vekker = new Vekker({ store, mac: recordingMac(calls), now: () => now, log: () => {}, chimeFile: 'chime.wav' });

    vekker.tick();
    assert.equal(vekker.currentPhase, 'evening');
    assert.deepEqual(calls.at(-1), ['keepDisplayOn', true]);

    vekker.setUpcoming('07:00');
    assert.equal(vekker.view().upcoming.time, '07:00');
    vekker.setUpcoming('default');
    assert.equal(vekker.view().upcoming.time, '06:30');

    now = new Date('2026-11-05T22:40');
    vekker.startNight();
    assert.equal(vekker.currentPhase, 'night');
    assert.deepEqual(calls.at(-1), ['keepDisplayOn', false]);

    // Etter en omstart er det fortsatt natt.
    const again = new Vekker({ store, mac: recordingMac([]), now: () => now, log: () => {}, chimeFile: 'chime.wav' });
    again.tick();
    assert.equal(again.currentPhase, 'night');

    now = new Date('2026-11-06T06:00');
    vekker.tick();
    assert.equal(vekker.currentPhase, 'sunrise');
    assert.deepEqual(calls.slice(-2), [['keepDisplayOn', true], ['wakeDisplay']]);
    assert.equal(vekker.state.night?.endedBy, 'alarm');

    now = new Date('2026-11-06T06:30');
    try {
      vekker.tick();
      assert.equal(vekker.currentPhase, 'alarm');
      // Volumet starter lavt. Ingen nettleser er koblet til, så reservelyden spilles med en gang.
      await new Promise((r) => setTimeout(r, 5));
      assert.ok(calls.some((c) => c[0] === 'setVolume' && c[1] === 8));
      assert.deepEqual(calls.at(-1), ['playFallback', 'chime.wav']);

      now = new Date('2026-11-06T06:31');
      assert.equal(vekker.dismiss(), true);
      assert.equal(vekker.currentPhase, 'morning');
      assert.ok(calls.slice(-2).some((c) => c[0] === 'playFallback' && c[1] === null));
      assert.equal(vekker.dismiss(), false);

      // Volumet settes tilbake til det det var før alarmen.
      await new Promise((r) => setTimeout(r, 1600));
      assert.deepEqual(calls.at(-1), ['setVolume', 25]);
    } finally {
      vekker.stop();
    }
  });

  test('prøvealarmen ringer om ett minutt', () => {
    let now = new Date('2026-11-05T15:00');
    const vekker = new Vekker({ store: new Store(join(dir, 'b'), () => {}), mac: recordingMac([]), now: () => now, log: () => {}, chimeFile: 'x' });
    try {
      vekker.tick();
      assert.equal(vekker.currentPhase, 'day');
      vekker.testAlarm();
      now = new Date('2026-11-05T15:00:30');
      vekker.tick();
      assert.equal(vekker.currentPhase, 'sunrise');
      now = new Date('2026-11-05T15:01:00');
      vekker.tick();
      assert.equal(vekker.currentPhase, 'alarm');
      assert.equal(vekker.dismiss(), true);
      assert.equal(vekker.state.test, null);
      // Rett tilbake til dagen, ikke morgenskjermen.
      assert.equal(vekker.currentPhase, 'day');
      assert.equal(vekker.state.dismissedAt, null);
    } finally {
      vekker.stop();
    }
  });
});
