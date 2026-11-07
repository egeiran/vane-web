import { useState } from 'react';

import { WEEKDAY_NAMES } from '../../shared/time.ts';
import type { Config, View } from '../../shared/types.ts';

type Props = {
  view: View;
  act: (path: string, body?: unknown) => Promise<void>;
  onClose: () => void;
};

const capital = (s: string) => s[0].toUpperCase() + s.slice(1);

export function Settings({ view, act, onClose }: Props) {
  const [draft, setDraft] = useState<Config>(view.config);
  // Husker tiden for dager som slås av, så den kommer tilbake når de slås på igjen.
  const [times, setTimes] = useState<string[]>(() => view.config.alarms.map((a) => a ?? '06:30'));
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof Config>(key: K, value: Config[K]) => setDraft((d) => ({ ...d, [key]: value }));
  const setAlarm = (i: number, on: boolean, time: string) => {
    setTimes((t) => t.map((x, j) => (j === i ? time : x)));
    setDraft((d) => ({ ...d, alarms: d.alarms.map((a, j) => (j === i ? (on ? time : null) : a)) }));
  };

  const save = async () => {
    try {
      const res = await fetch('/api/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(draft),
      });
      const body = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(body.error ?? 'Kunne ikke lagre.');
        return;
      }
      onClose();
    } catch {
      setError('Fikk ikke kontakt med serveren.');
    }
  };

  const test = async () => {
    await act('/api/test');
    onClose();
  };

  const number = (value: string) => (value === '' ? NaN : Number(value));

  return (
    <div className="screen settings">
      <div className="settings-head">
        <h1>Innstillinger</h1>
        <div className="settings-actions">
          {error && <p className="error">{error}</p>}
          <button type="button" className="pill secondary" onClick={onClose}>
            Avbryt
          </button>
          <button type="button" className="pill primary" onClick={() => void save()}>
            Lagre
          </button>
        </div>
      </div>
      <div className="settings-body">
        <section className="card">
          <h2 className="label">Faste alarmtider</h2>
          <p className="help">Kvelden før kan du endre tiden for neste morgen på God natt.</p>
          {WEEKDAY_NAMES.map((name, i) => {
            const on = draft.alarms[i] !== null;
            return (
              <div className="day-row" key={name}>
                <label>
                  <input type="checkbox" checked={on} onChange={(e) => setAlarm(i, e.target.checked, times[i])} />
                  {capital(name)}
                </label>
                <div className="field">
                  <input
                    type="time"
                    aria-label={`Alarm ${name}`}
                    value={times[i]}
                    disabled={!on}
                    onChange={(e) => e.target.value && setAlarm(i, true, e.target.value)}
                  />
                </div>
              </div>
            );
          })}
          <button type="button" className="pill secondary" onClick={() => void test()}>
            Prøv alarmen om ett minutt
          </button>
        </section>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.4rem' }}>
          <section className="card">
            <h2 className="label">Søvn og kveld</h2>
            <label className="field">
              Søvn (timer)
              <input type="number" min={4} max={12} step={0.5} value={draft.sleepHours} onChange={(e) => set('sleepHours', number(e.target.value))} />
            </label>
            <label className="field">
              Soloppgang før alarmen (min)
              <input type="number" min={0} max={90} step={5} value={draft.sunriseMinutes} onChange={(e) => set('sunriseMinutes', number(e.target.value))} />
            </label>
            <label className="field">
              Kvelden begynner
              <input type="time" value={draft.eveningFrom} onChange={(e) => set('eveningFrom', e.target.value)} />
            </label>
            <label className="field">
              Natta starter av seg selv (min etter leggetid)
              <input type="number" min={0} max={360} step={15} value={draft.autoNightAfterMinutes} onChange={(e) => set('autoNightAfterMinutes', number(e.target.value))} />
            </label>
            <label className="field">
              Leggetid uten alarm neste dag
              <input type="time" value={draft.lateBedtime} onChange={(e) => set('lateBedtime', e.target.value)} />
            </label>
            <label className="field">
              Morgen uten alarm
              <input type="time" value={draft.noAlarmMorning} onChange={(e) => set('noAlarmMorning', e.target.value)} />
            </label>
            <label className="field">
              Morgenskjermen står (min)
              <input type="number" min={1} max={240} step={5} value={draft.morningMinutes} onChange={(e) => set('morningMinutes', number(e.target.value))} />
            </label>
          </section>

          <section className="card">
            <h2 className="label">Lyd</h2>
            <label className="field">
              Radio
              <input type="text" value={draft.radio.name} onChange={(e) => set('radio', { ...draft.radio, name: e.target.value })} />
            </label>
            <label className="field stack">
              Adresse til strømmen
              <input type="url" value={draft.radio.url} onChange={(e) => set('radio', { ...draft.radio, url: e.target.value })} />
            </label>
            <label className="field">
              Volum fra (%)
              <input type="number" min={0} max={100} value={draft.volume.start} onChange={(e) => set('volume', { ...draft.volume, start: number(e.target.value) })} />
            </label>
            <label className="field">
              Volum til (%)
              <input type="number" min={0} max={100} value={draft.volume.end} onChange={(e) => set('volume', { ...draft.volume, end: number(e.target.value) })} />
            </label>
            <label className="field">
              Lyden øker over (sek)
              <input type="number" min={0} max={1800} step={30} value={draft.volume.rampSeconds} onChange={(e) => set('volume', { ...draft.volume, rampSeconds: number(e.target.value) })} />
            </label>
          </section>

          <section className="card">
            <h2 className="label">Vær og kalender</h2>
            <label className="field">
              Sted
              <input type="text" value={draft.place.name} onChange={(e) => set('place', { ...draft.place, name: e.target.value })} />
            </label>
            <label className="field">
              Breddegrad
              <input type="number" step={0.0001} value={draft.place.lat} onChange={(e) => set('place', { ...draft.place, lat: number(e.target.value) })} />
            </label>
            <label className="field">
              Lengdegrad
              <input type="number" step={0.0001} value={draft.place.lon} onChange={(e) => set('place', { ...draft.place, lon: number(e.target.value) })} />
            </label>
            <label className="field stack">
              Hemmelig iCal-adresse
              <input type="url" autoComplete="off" spellCheck={false} placeholder="https://calendar.google.com/calendar/ical/…/basic.ics" value={draft.calendarUrl} onChange={(e) => set('calendarUrl', e.target.value)} />
            </label>
            <p className="help">
              Google Kalender på nett → Innstillinger → velg kalenderen → «Hemmelig adresse i iCal-format». Adressen lagres
              bare på denne Macen.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
