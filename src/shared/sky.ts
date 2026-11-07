/**
 * Fargene i soloppgangen: fra helt svart, via dyp rød og oransje, til varmt lys når alarmen går.
 * `progress` går fra 0 (soloppgangen starter) til 1 (alarmen).
 */

type Stop = { at: number; center: string; middle: string; edge: string };

const STOPS: Stop[] = [
  { at: 0, center: '#000000', middle: '#000000', edge: '#000000' },
  { at: 0.3, center: '#4A1006', middle: '#1A0503', edge: '#030101' },
  { at: 0.6, center: '#D0612A', middle: '#6B2414', edge: '#1C0B07' },
  { at: 0.85, center: '#FFD2A0', middle: '#F2A46B', edge: '#C98A66' },
  { at: 1, center: '#FFF4E6', middle: '#FCE3CB', edge: '#FBEFE3' },
];

function rgb(hex: string): [number, number, number] {
  return [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)) as [number, number, number];
}

export function mix(a: string, b: string, t: number): string {
  const x = rgb(a);
  const y = rgb(b);
  const c = x.map((v, i) => Math.round(v + (y[i] - v) * t));
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}

export type Sky = { center: string; middle: string; edge: string; background: string; ink: string };

export function sky(progress: number): Sky {
  const p = Math.min(1, Math.max(0, progress));
  let i = 0;
  while (i < STOPS.length - 2 && p > STOPS[i + 1].at) i++;
  const a = STOPS[i];
  const b = STOPS[i + 1];
  const t = (p - a.at) / (b.at - a.at);
  const center = mix(a.center, b.center, t);
  const middle = mix(a.middle, b.middle, t);
  const edge = mix(a.edge, b.edge, t);
  // Lys tekst mens det er mørkt, mørk tekst når det har blitt lyst.
  const ink = p < 0.8 ? `rgba(255, 226, 196, ${(0.14 + 0.5 * p).toFixed(2)})` : 'rgba(70, 34, 18, 0.8)';
  return {
    center,
    middle,
    edge,
    background: `radial-gradient(ellipse 130% 95% at 50% 118%, ${center} 0%, ${middle} 48%, ${edge} 100%)`,
    ink,
  };
}

/** Hvor langt soloppgangen har kommet, fra 0 til 1. */
export function sunriseProgress(now: number, from: number, to: number): number {
  if (to <= from) return 1;
  return Math.min(1, Math.max(0, (now - from) / (to - from)));
}
