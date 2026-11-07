import { useCallback, useEffect, useState } from 'react';

import type { CalendarResponse, WeatherResponse } from '../shared/types.ts';
import { useAlarmSound, useIdleCursor, useNow, usePolling, useServer } from './hooks.ts';
import { AlarmScreen } from './screens/Alarm.tsx';
import { Day } from './screens/Day.tsx';
import { Evening } from './screens/Evening.tsx';
import { GoodNight } from './screens/GoodNight.tsx';
import { Morning } from './screens/Morning.tsx';
import { Night } from './screens/Night.tsx';
import { Settings } from './screens/Settings.tsx';
import { Sunrise } from './screens/Sunrise.tsx';

type Overlay = 'none' | 'goodnight' | 'settings';

export function App() {
  const { view, offset, connected, act } = useServer();
  const now = useNow(offset);
  const [overlay, setOverlay] = useState<Overlay>('none');
  const phase = view?.phase ?? null;

  const sound = useAlarmSound(phase === 'alarm', view?.config.radio.url ?? '');
  useIdleCursor(phase === 'night' || phase === 'sunrise');

  const place = view ? `${view.config.place.lat},${view.config.place.lon}` : '';
  const weather = usePolling<WeatherResponse>('/api/weather', 10 * 60_000, place);
  const calendar = usePolling<CalendarResponse>('/api/calendar', 10 * 60_000, view?.config.calendarUrl ?? '');

  useEffect(() => {
    document.body.dataset.phase = overlay === 'goodnight' ? 'night' : (phase ?? 'night');
  }, [phase, overlay]);

  // Ny fase lukker God natt og Innstillinger.
  useEffect(() => {
    setOverlay('none');
  }, [phase]);

  const dismiss = useCallback(() => void act('/api/dismiss'), [act]);
  const close = useCallback(() => setOverlay('none'), []);

  if (!view) return <div className="screen waiting">Kobler til …</div>;

  const offline = !connected && (phase === 'day' || phase === 'morning' || phase === 'evening') && (
    <p className="offline">Mistet kontakten med serveren</p>
  );

  if (overlay === 'settings' && phase !== 'night' && phase !== 'sunrise' && phase !== 'alarm') {
    return <Settings view={view} act={act} onClose={close} />;
  }

  switch (view.phase) {
    case 'night':
      return <Night now={now} view={view} />;
    case 'sunrise':
      return <Sunrise now={now} view={view} onDismiss={dismiss} />;
    case 'alarm':
      return <AlarmScreen now={now} view={view} sound={sound} onDismiss={dismiss} />;
    case 'morning':
      return (
        <>
          <Morning now={now} weather={weather} calendar={calendar} />
          {offline}
        </>
      );
    case 'day':
      return (
        <>
          <Day now={now} weather={weather} calendar={calendar} onSettings={() => setOverlay('settings')} />
          {offline}
        </>
      );
    case 'evening':
      return overlay === 'goodnight' ? (
        <GoodNight now={now} view={view} act={act} onBack={close} />
      ) : (
        <>
          <Evening
            now={now}
            view={view}
            onGoodnight={() => setOverlay('goodnight')}
            onSettings={() => setOverlay('settings')}
          />
          {offline}
        </>
      );
  }
}
