import type { Power } from '../../shared/types.ts';

/** Sier fra om kvelden hvis Macen går på batteri, så du kan sjekke laderen før du legger deg. */
export function PowerWarning({ power }: { power: Power | null }) {
  if (!power?.onBattery) return null;
  const percent = power.percent !== null ? ` (${power.percent} %)` : '';
  return <p className="power-warning">Macen går på batteri{percent}. Sjekk at laderen sitter.</p>;
}
