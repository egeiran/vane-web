import { useCallback, useEffect, useRef, useState } from 'react';

import type { View } from '../shared/types.ts';
import { getJson, post } from './api.ts';

/** Visningen fra serveren, oppdatert over Server-Sent Events. */
export function useServer() {
  const [view, setView] = useState<View | null>(null);
  const [offset, setOffset] = useState(0);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const events = new EventSource('/api/events');
    events.onmessage = (e) => {
      const next = JSON.parse(e.data as string) as View;
      // Serverens klokke gjelder (den kan være satt med VANE_NOW). Små avvik ignoreres.
      const o = Date.parse(next.now) - Date.now();
      setOffset((prev) => (Math.abs(prev - o) > 1000 ? o : prev));
      setView(next);
      setConnected(true);
    };
    events.onerror = () => setConnected(false);
    return () => events.close();
  }, []);

  const act = useCallback(async (path: string, body: unknown = {}) => {
    const next = await post(path, body);
    if (next) setView(next);
  }, []);

  return { view, offset, connected, act, setView };
}

/** Klokka, oppdatert hvert sekund rett etter sekundskiftet. */
export function useNow(offset: number): Date {
  const [now, setNow] = useState(() => new Date(Date.now() + offset));
  useEffect(() => {
    let timer = 0;
    const tick = () => {
      const t = Date.now() + offset;
      setNow(new Date(t));
      timer = window.setTimeout(tick, 1000 - (t % 1000) + 10);
    };
    tick();
    return () => window.clearTimeout(timer);
  }, [offset]);
  return now;
}

/** Henter JSON nå og så hvert `intervalMs`. */
export function usePolling<T>(path: string, intervalMs: number, key = ''): T | null {
  const [data, setData] = useState<T | null>(null);
  useEffect(() => {
    let alive = true;
    const load = async () => {
      const next = await getJson<T>(path);
      if (alive && next) setData(next);
    };
    void load();
    const timer = window.setInterval(load, intervalMs);
    return () => {
      alive = false;
      window.clearInterval(timer);
    };
  }, [path, intervalMs, key]);
  return data;
}

/**
 * Hold inne en knapp eller mellomromstasten i `ms` millisekunder. Slipper du før, starter den på
 * nytt. `progress` går fra 0 til 1.
 */
export function useHold(enabled: boolean, onDone: () => void, ms = 3000) {
  const [progress, setProgress] = useState(0);
  const started = useRef<number | null>(null);
  const frame = useRef(0);
  const done = useRef(onDone);
  useEffect(() => {
    done.current = onDone;
  }, [onDone]);

  const stop = useCallback(() => {
    if (started.current === null) return;
    started.current = null;
    cancelAnimationFrame(frame.current);
    setProgress(0);
  }, []);

  const start = useCallback(() => {
    if (!enabled || started.current !== null) return;
    started.current = performance.now();
    const step = () => {
      if (started.current === null) return;
      const p = Math.min(1, (performance.now() - started.current) / ms);
      setProgress(p);
      if (p >= 1) {
        started.current = null;
        done.current();
      } else {
        frame.current = requestAnimationFrame(step);
      }
    };
    frame.current = requestAnimationFrame(step);
  }, [enabled, ms]);

  useEffect(() => {
    if (!enabled) return;
    const down = (e: KeyboardEvent) => {
      if (e.code !== 'Space') return;
      e.preventDefault();
      if (!e.repeat) start();
    };
    const up = (e: KeyboardEvent) => {
      if (e.code === 'Space') stop();
    };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    window.addEventListener('blur', stop);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
      window.removeEventListener('blur', stop);
      stop();
    };
  }, [enabled, start, stop]);

  return {
    progress,
    bind: { onPointerDown: start, onPointerUp: stop, onPointerLeave: stop, onPointerCancel: stop },
  };
}

/** Skjuler musepekeren når den ikke har vært brukt på tre sekunder (og alltid om natta). */
export function useIdleCursor(alwaysHidden: boolean) {
  useEffect(() => {
    const body = document.body;
    let timer = 0;
    const hide = () => body.classList.add('idle');
    const show = () => {
      if (alwaysHidden) return;
      body.classList.remove('idle');
      window.clearTimeout(timer);
      timer = window.setTimeout(hide, 3000);
    };
    if (alwaysHidden) hide();
    else show();
    window.addEventListener('mousemove', show);
    return () => {
      window.removeEventListener('mousemove', show);
      window.clearTimeout(timer);
    };
  }, [alwaysHidden]);
}

export type SoundState = 'off' | 'starting' | 'radio' | 'chime' | 'silent';

/**
 * Spiller radioen når alarmen går. Kommer det ikke lyd innen 15 sekunder, eller faller strømmen ut,
 * spilles den innebygde alarmlyden i stedet. Serveren skrur opp systemvolumet gradvis.
 */
export function useAlarmSound(active: boolean, url: string): SoundState {
  const [state, setState] = useState<SoundState>('off');

  useEffect(() => {
    if (!active) return;
    let stopped = false;
    let audio: HTMLAudioElement | null = null;
    let watchdog = 0;

    const confirm = () => void post('/api/playing');
    const release = (a: HTMLAudioElement | null, fade: boolean) => {
      if (!a) return;
      const end = () => {
        a.pause();
        a.removeAttribute('src');
        a.load();
      };
      if (!fade) return end();
      const timer = window.setInterval(() => {
        a.volume = Math.max(0, a.volume - 0.1);
        if (a.volume <= 0.01) {
          window.clearInterval(timer);
          end();
        }
      }, 80);
    };

    const chime = () => {
      if (stopped || audio?.dataset.kind === 'chime') return;
      window.clearTimeout(watchdog);
      release(audio, false);
      const a = new Audio('/chime.wav');
      a.dataset.kind = 'chime';
      a.loop = true;
      a.addEventListener('playing', () => {
        setState('chime');
        confirm();
      });
      audio = a;
      a.play().catch(() => setState('silent'));
    };

    const arm = () => {
      window.clearTimeout(watchdog);
      watchdog = window.setTimeout(chime, 15_000);
    };

    setState('starting');
    const a = new Audio(url);
    a.dataset.kind = 'radio';
    a.addEventListener('playing', () => {
      window.clearTimeout(watchdog);
      setState('radio');
      confirm();
    });
    a.addEventListener('waiting', arm);
    a.addEventListener('stalled', arm);
    a.addEventListener('error', chime);
    a.addEventListener('ended', chime);
    audio = a;
    arm();
    a.play().catch(chime);

    return () => {
      stopped = true;
      window.clearTimeout(watchdog);
      release(audio, true);
      audio = null;
      setState('off');
    };
  }, [active, url]);

  return active ? state : 'off';
}
