import { type CalendarEvent, eventsOnDay } from '../../shared/calendar.ts';
import { dateLabel, showTime } from '../../shared/time.ts';
import type { CalendarResponse, WeatherResponse } from '../../shared/types.ts';
import { WeatherIcon } from '../components/Icons.tsx';

type Props = { now: Date; weather: WeatherResponse | null; calendar: CalendarResponse | null };

const DOTS = ['var(--himmel)', 'var(--lavendel)', 'var(--salvie)', 'var(--fersken)', 'var(--sand)', 'var(--rose)'];
const MAX_EVENTS = 4;

/** Morgenen etter alarmen: klokka, dagens avtaler og været. */
export function Morning({ now, weather, calendar }: Props) {
  return (
    <div className="screen morning">
      <div className="morning-left">
        <div className="morning-clock">
          <p className="label">God morgen</p>
          <h1 className="morning-time">{showTime(now)}</h1>
          <p className="morning-date">{dateLabel(now)}</p>
        </div>
        <CalendarCard now={now} calendar={calendar} />
      </div>
      <WeatherCard weather={weather} />
    </div>
  );
}

function CalendarCard({ now, calendar }: { now: Date; calendar: CalendarResponse | null }) {
  if (!calendar) return null;
  let body: React.ReactNode;
  if (!calendar.configured) {
    body = <p className="card-note">Legg inn kalenderen under Innstillinger, så ser du dagens avtaler her.</p>;
  } else if (calendar.error && calendar.events.length === 0) {
    body = <p className="card-note">{calendar.error}</p>;
  } else {
    const today = eventsOnDay(calendar.events, now);
    if (today.length === 0) {
      body = <p className="card-note">Ingen avtaler i dag.</p>;
    } else {
      const shown = today.slice(0, MAX_EVENTS);
      body = (
        <>
          {shown.map((e, i) => (
            <EventRow key={`${e.start}-${e.title}`} event={e} color={DOTS[i % DOTS.length]} first={i === 0} />
          ))}
          {today.length > MAX_EVENTS && <p className="card-note">+ {today.length - MAX_EVENTS} til</p>}
        </>
      );
    }
  }
  return (
    <section className="card">
      <h2 className="label">I dag</h2>
      {body}
    </section>
  );
}

function EventRow({ event, color, first }: { event: CalendarEvent; color: string; first: boolean }) {
  return (
    <>
      {!first && <div className="hair" />}
      <div className="event">
        <span className="event-dot" style={{ background: color }} />
        <span className="event-time">{event.allDay ? 'Hele dagen' : showTime(new Date(event.start))}</span>
        <span className="event-title">{event.title}</span>
      </div>
    </>
  );
}

function WeatherCard({ weather }: { weather: WeatherResponse | null }) {
  const f = weather?.forecast ?? null;
  if (!f) {
    return (
      <section className="card weather">
        <p className="card-note">{weather ? 'Fikk ikke hentet været.' : 'Henter været …'}</p>
      </section>
    );
  }
  return (
    <section className="card weather">
      <div className="card-head">
        <h2 className="label">{f.place}</h2>
        <span className="source">MET Norge</span>
      </div>
      <div className="weather-now">
        <WeatherIcon kind={f.now.kind} size="8.8rem" />
        <div>
          <p className="weather-temp">{f.now.temp}°</p>
          <p className="weather-text">
            {f.now.text} · maks {f.max}°
          </p>
        </div>
      </div>
      <div className="hours">
        {f.hours.map((h) => (
          <div className="hour" key={h.time}>
            <span className="hour-time">{String(h.hour).padStart(2, '0')}</span>
            <span className="hour-text">{h.text}</span>
            <span className="hour-rain">
              {h.precipitation && h.precipitation > 0 ? `${String(h.precipitation).replace('.', ',')} mm` : ''}
            </span>
            <span className="hour-temp">{h.temp}°</span>
          </div>
        ))}
      </div>
      {f.now.wind !== null && (
        <p className="weather-foot">
          Vind {Math.round(f.now.wind)} m/s{f.now.windFrom ? ` fra ${f.now.windFrom}` : ''}
        </p>
      )}
    </section>
  );
}
