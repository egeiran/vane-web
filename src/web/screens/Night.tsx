import { useEffect, useRef, useState } from 'react';

import { durationLabel, showTime } from '../../shared/time.ts';
import type { View } from '../../shared/types.ts';
import { post } from '../api.ts';

type Props = { now: Date; view: View };

const ACTIVITY = ['mousemove', 'mousedown', 'keydown', 'wheel', 'touchstart'] as const;

/**
 * Natta. Serveren har slått av skjermen. Rører du musa eller tastaturet, våkner skjermen, og et svakt
 * rødlig glimt av klokka vises noen sekunder før skjermen slukkes igjen. Esc i glimtet avbryter natta.
 */
export function Night({ now, view }: Props) {
  const [glimt, setGlimt] = useState(false);
  const showing = useRef(false);
  const seconds = view.config.glimtSeconds;

  useEffect(() => {
    let timer = 0;
    // Ikke vis glimtet av klikket eller tastetrykket som startet natta.
    const armedAt = Date.now() + 1500;
    const hide = () => {
      showing.current = false;
      setGlimt(false);
      void post('/api/display/sleep');
    };
    const onActivity = (e: Event) => {
      if (Date.now() < armedAt) return;
      if (e instanceof KeyboardEvent && e.key === 'Escape' && showing.current) {
        void post('/api/wake');
        return;
      }
      showing.current = true;
      setGlimt(true);
      window.clearTimeout(timer);
      timer = window.setTimeout(hide, seconds * 1000);
    };
    for (const name of ACTIVITY) window.addEventListener(name, onActivity);
    return () => {
      for (const name of ACTIVITY) window.removeEventListener(name, onActivity);
      window.clearTimeout(timer);
    };
  }, [seconds]);

  const alarm = view.alarm ? new Date(view.alarm.at) : null;
  return (
    <div className="screen night">
      {glimt && (
        <>
          <p className="glimt-time">{showTime(now)}</p>
          <p className="glimt-sub">
            {alarm
              ? `Alarm ${showTime(alarm)} · ${durationLabel(alarm.getTime() - now.getTime())} igjen`
              : 'Ingen alarm'}
          </p>
          <p className="glimt-hint">Esc avbryter natta</p>
        </>
      )}
    </div>
  );
}
