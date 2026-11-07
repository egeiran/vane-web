import { nextEventToday } from '../../shared/calendar.ts';
import { dateLabel, showTime } from '../../shared/time.ts';
import type { CalendarResponse, WeatherResponse } from '../../shared/types.ts';
import { SettingsButton } from '../components/Icons.tsx';

type Props = {
  now: Date;
  weather: WeatherResponse | null;
  calendar: CalendarResponse | null;
  onSettings: () => void;
};

/** Dempet klokke hele dagen, med været og neste avtale. */
export function Day({ now, weather, calendar, onSettings }: Props) {
  const f = weather?.forecast;
  const next = calendar ? nextEventToday(calendar.events, now) : null;
  return (
    <div className="screen day">
      <div style={{ height: '4rem' }} />
      <div className="day-center">
        <h1 className="day-time">{showTime(now)}</h1>
        <p className="day-date">{dateLabel(now)}</p>
      </div>
      <div className="day-bottom">
        <span>{f ? `${f.place} · ${f.now.temp}° og ${f.now.text.toLowerCase()}` : ''}</span>
        <SettingsButton onClick={onSettings} />
        <span>{next ? `Neste: ${showTime(new Date(next.start))} ${next.title}` : ''}</span>
      </div>
    </div>
  );
}
