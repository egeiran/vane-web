import { dateLabel, showTime } from '../../shared/time.ts';
import type { View } from '../../shared/types.ts';
import { RadioIcon } from '../components/Icons.tsx';
import { type SoundState, useHold } from '../hooks.ts';

type Props = { now: Date; view: View; sound: SoundState; onDismiss: () => void };

/** Alarmen: radioen spiller og lyden øker. Hold inne i 3 sekunder for å skru av. */
export function AlarmScreen({ now, view, sound, onDismiss }: Props) {
  const { progress, bind } = useHold(true, onDismiss);
  const radio = view.config.radio.name;
  const fallback = sound === 'chime' || sound === 'silent';
  const note = sound === 'starting' ? 'kobler til' : fallback ? `fikk ikke spilt ${radio}` : 'lyden øker';
  const left = Math.max(1, Math.ceil(3 * (1 - progress)));

  return (
    <div className="screen alarm">
      <div className="alarm-top">
        <div className="radio-pill">
          <RadioIcon />
          <span className="radio-name">{fallback ? 'Alarmlyd' : radio}</span>
          <span className={sound === 'starting' ? 'bars still' : 'bars'} aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </span>
          <span className="radio-note">{note}</span>
        </div>
        <p className="alarm-date">{dateLabel(now)}</p>
      </div>
      <div className="alarm-center">
        <p className="alarm-greeting">God morgen</p>
        <h1 className="alarm-time">{showTime(now)}</h1>
      </div>
      <div className="alarm-bottom">
        <button type="button" className="hold" {...bind}>
          <span className="hold-fill" style={{ width: `${progress * 100}%` }} />
          <span className="hold-label">
            {progress >= 1 ? 'Alarmen er av' : progress > 0 ? `Hold … ${left}` : 'Hold for å skru av'}
          </span>
        </button>
        <p className="hold-hint">Hold inne knappen eller mellomromstasten i 3 sekunder</p>
      </div>
    </div>
  );
}
