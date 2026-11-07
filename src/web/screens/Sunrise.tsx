import { sky, sunriseProgress } from '../../shared/sky.ts';
import { MINUTE, showTime } from '../../shared/time.ts';
import type { View } from '../../shared/types.ts';
import { useHold } from '../hooks.ts';

type Props = { now: Date; view: View; onDismiss: () => void };

/** Skjermen går fra svart til varmt lys før alarmen. Mellomromstasten holdt inne skrur av alarmen. */
export function Sunrise({ now, view, onDismiss }: Props) {
  useHold(true, onDismiss);
  const alarm = view.alarm;
  if (!alarm) return <div className="screen night" />;
  const at = Date.parse(alarm.at);
  const s = sky(sunriseProgress(now.getTime(), Date.parse(alarm.sunriseFrom), at));
  const minutes = Math.max(1, Math.ceil((at - now.getTime()) / MINUTE));
  return (
    <div className="screen sunrise" style={{ background: s.background }}>
      <p className="sunrise-time" style={{ color: s.ink }}>
        {showTime(now)}
      </p>
      <p className="sunrise-sub" style={{ color: s.ink }}>
        Alarm {showTime(new Date(at))} · om {minutes} min
      </p>
    </div>
  );
}
