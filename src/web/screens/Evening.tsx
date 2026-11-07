import { MINUTE, atTime, dateLabel, durationLabel, fromDateKey, hoursLabel, showTime } from '../../shared/time.ts';
import type { View } from '../../shared/types.ts';
import { MoonIcon, SettingsButton } from '../components/Icons.tsx';

type Props = { now: Date; view: View; onGoodnight: () => void; onSettings: () => void };

/** Kvelden: varm og dempet, med leggetid regnet bakover fra alarmen. */
export function Evening({ now, view, onGoodnight, onSettings }: Props) {
  const { upcoming, config } = view;
  const bed = view.bedtime ? new Date(view.bedtime) : null;
  const autoNight = new Date(view.autoNightAt);

  let title: string;
  let sub: string;
  if (!bed || !upcoming.time) {
    title = 'Ingen alarm i morgen';
    sub = 'Sov så lenge du vil.';
  } else {
    const alarmAt = atTime(fromDateKey(upcoming.date), upcoming.time);
    const minutes = Math.ceil((bed.getTime() - now.getTime()) / MINUTE);
    const sleep = hoursLabel(config.sleepHours);
    if (minutes > 20) {
      title = `Leggetid ${showTime(bed)}`;
      sub = `Alarmen går ${upcoming.time}. Da får du ${sleep}.`;
    } else if (minutes > 0) {
      title = minutes === 1 ? 'Leggetid om ett minutt' : `Leggetid om ${minutes} minutter`;
      sub = `Alarmen går ${upcoming.time}. Legger du deg ${showTime(bed)}, får du ${sleep}.`;
    } else {
      title = 'Det er leggetid';
      sub = `Alarmen går ${upcoming.time}. Legger du deg nå, får du ${durationLabel(alarmAt.getTime() - now.getTime())}.`;
    }
  }

  return (
    <div className="screen evening">
      <div className="evening-top">
        <div>
          <h1 className="evening-time">{showTime(now)}</h1>
          <p className="evening-date">{dateLabel(now)}</p>
        </div>
        <SettingsButton onClick={onSettings} />
      </div>
      <div className="evening-bottom">
        <div>
          <h2 className="evening-title">{title}</h2>
          <p className="evening-sub">{sub}</p>
        </div>
        <div className="evening-actions">
          <button type="button" className="pill-dark" onClick={onGoodnight}>
            <MoonIcon />
            God natt
          </button>
          {now < autoNight && (
            <p className="evening-note">Trykker du ikke, starter natta av seg selv {showTime(autoNight)}.</p>
          )}
        </div>
      </div>
    </div>
  );
}
