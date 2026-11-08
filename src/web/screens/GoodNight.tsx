import { useEffect, useState } from 'react';

import { dateKey, formatMinutes, hoursLabel, parseTime } from '../../shared/time.ts';
import type { View } from '../../shared/types.ts';
import { PlusMinusIcon } from '../components/Icons.tsx';
import { PowerWarning } from '../components/PowerWarning.tsx';

type Props = {
  now: Date;
  view: View;
  act: (path: string, body?: unknown) => Promise<void>;
  onBack: () => void;
};

const COUNTDOWN = 30;

/** Bekreft alarmen for morgenen som kommer, så slukkes skjermen. */
export function GoodNight({ now, view, act, onBack }: Props) {
  const { upcoming, config } = view;
  const [lastTime, setLastTime] = useState(upcoming.time ?? upcoming.defaultTime ?? '06:30');
  const [left, setLeft] = useState(COUNTDOWN);
  const on = upcoming.time !== null;
  const time = upcoming.time ?? lastTime;

  useEffect(() => {
    const timer = window.setInterval(() => setLeft((s) => s - 1), 1000);
    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => {
    if (left === 0) void act('/api/night');
  }, [left, act]);

  // Lagres som endring bare når tiden er en annen enn den faste.
  const save = (t: string | null) => act('/api/upcoming', { time: t === upcoming.defaultTime ? 'default' : t });

  const shift = (minutes: number) => {
    setLeft(COUNTDOWN);
    const next = formatMinutes((parseTime(time) ?? 0) + minutes);
    setLastTime(next);
    void save(next);
  };
  const toggle = () => {
    setLeft(COUNTDOWN);
    if (on) {
      setLastTime(upcoming.time ?? lastTime);
      void save(null);
    } else {
      void save(lastTime);
    }
  };

  const minutes = parseTime(time) ?? 0;
  const day = upcoming.date === dateKey(now) ? upcoming.weekday : `i morgen, ${upcoming.weekday}`;

  return (
    <div className="screen goodnight" onPointerDown={() => setLeft(COUNTDOWN)}>
      <div>
        <h1 className="goodnight-title">God natt</h1>
        <p className="goodnight-sub">Alarmen {day}</p>
      </div>
      <div className="goodnight-middle">
        <div className="goodnight-row">
          <button type="button" className="round" aria-label="Fem minutter tidligere" onClick={() => shift(-5)}>
            <PlusMinusIcon plus={false} />
          </button>
          <p className={on ? 'goodnight-time' : 'goodnight-time off'}>{time}</p>
          <button type="button" className="round" aria-label="Fem minutter senere" onClick={() => shift(5)}>
            <PlusMinusIcon plus />
          </button>
        </div>
        <p className="goodnight-info">
          {on
            ? `Soloppgang fra ${formatMinutes(minutes - config.sunriseMinutes)} · ${config.radio.name} · leggetid for ${hoursLabel(config.sleepHours)}: ${formatMinutes(minutes - config.sleepHours * 60)}`
            : 'Ingen alarm. Sov så lenge du vil.'}
        </p>
        <PowerWarning power={view.power} />
      </div>
      <div className="goodnight-bottom">
        <div className="goodnight-buttons">
          <button type="button" className="pill-light" onClick={() => void act('/api/night')}>
            Slukk skjermen
          </button>
          <button type="button" className="pill-outline" onClick={toggle}>
            {on ? `Ingen alarm ${upcoming.weekday}` : `Sett alarm ${upcoming.weekday}`}
          </button>
        </div>
        <p className="goodnight-note">Skjermen slukker av seg selv om {Math.max(0, left)} sekunder.</p>
        <button type="button" className="link-dark" onClick={onBack}>
          Tilbake
        </button>
      </div>
    </div>
  );
}
