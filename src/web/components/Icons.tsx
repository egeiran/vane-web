import type { WeatherKind } from '../../shared/weather.ts';

const CLOUD = 'M7 15.5a4 4 0 1 1 .7-7.94A5.5 5.5 0 0 1 18 9a3.25 3.25 0 0 1-.5 6.5H7z';

const PATHS: Record<WeatherKind, string[]> = {
  sun: [
    'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
    'M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4',
  ],
  moon: ['M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z'],
  partly: [
    'M9 11a3 3 0 1 1 4.6-2.5',
    'M9 2.5v1.2M3.5 8h1.2M5.1 4.1l.9.9M12.9 4.1l-.9.9',
    'M9 19.5a3.5 3.5 0 1 1 .6-6.95A4.8 4.8 0 0 1 18.5 13.5a3 3 0 0 1-.4 6H9z',
  ],
  cloud: [CLOUD],
  rain: [CLOUD, 'M9 18.5l-1 2M13 18.5l-1 2M17 18.5l-1 2'],
  sleet: [CLOUD, 'M9 18.5l-1 2M17 18.5l-1 2', 'M12.5 19.5h.01'],
  snow: [CLOUD, 'M8.5 19.5h.01M12.5 19.5h.01M16.5 19.5h.01'],
  fog: ['M4 9h16M6 13h12M4 17h16'],
  thunder: [CLOUD, 'M12.5 15.5l-2 3h3l-2 3'],
};

export function WeatherIcon({ kind, size }: { kind: WeatherKind; size: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={kind === 'snow' || kind === 'sleet' ? 1.6 : 1.3}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[kind].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

export function SettingsIcon() {
  return (
    <svg width="2.8rem" height="2.8rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <path d="M4 7h10M18 7h2M4 17h4M12 17h8" />
      <circle cx="16" cy="7" r="2" />
      <circle cx="10" cy="17" r="2" />
    </svg>
  );
}

export function MoonIcon() {
  return (
    <svg width="2.6rem" height="2.6rem" viewBox="0 0 24 24" fill="none" stroke="var(--ev-accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
    </svg>
  );
}

export function RadioIcon() {
  return (
    <svg width="2.4rem" height="2.4rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="8" width="18" height="12" rx="2.5" />
      <path d="M7 8l9-4" />
      <circle cx="15.5" cy="14" r="2.5" />
      <path d="M6.5 12.5h3M6.5 15.5h3" />
    </svg>
  );
}

export function PlusMinusIcon({ plus }: { plus: boolean }) {
  return (
    <svg width="2.8rem" height="2.8rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <path d={plus ? 'M5 12h14M12 5v14' : 'M5 12h14'} />
    </svg>
  );
}

export function SettingsButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" className="icon-button" aria-label="Innstillinger" onClick={onClick}>
      <SettingsIcon />
    </button>
  );
}
