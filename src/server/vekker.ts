/**
 * Hjertet i serveren. Regner ut fasen hvert sekund og gjør det Macen må gjøre når den endrer seg:
 * slukker skjermen om natta, vekker den til soloppgangen, skrur opp lyden når alarmen går og setter
 * volumet tilbake når den er skrudd av.
 */
import { buildView, evaluate, pruneOverrides, upcomingMorning } from '../shared/schedule.ts';
import { MINUTE, SECOND, dateKey } from '../shared/time.ts';
import type { Config, Phase, Power, State, View } from '../shared/types.ts';
import type { Mac } from './mac.ts';
import type { Store } from './store.ts';

type Deps = {
  store: Store;
  mac: Mac;
  now: () => Date;
  log: (msg: string) => void;
  /** Reservelyden serveren spiller hvis nettleseren ikke får spilt noe. */
  chimeFile: string;
};

type Sound = {
  ramp: ReturnType<typeof setInterval> | null;
  fallback: ReturnType<typeof setTimeout> | null;
  saved: number | null;
  confirmed: boolean;
};

/** Hvor lenge nettleseren får på seg til å si at lyden spiller, før serveren spiller reservelyden. */
const FALLBACK_AFTER_MS = 20 * SECOND;

export class Vekker {
  config: Config;
  state: State;
  private deps: Deps;
  private phase: Phase | null = null;
  private listeners = new Set<(view: View) => void>();
  private lastBroadcast = 0;
  private power: Power | null = null;
  private lastPowerCheck = 0;
  private sound: Sound | null = null;
  private sleepTimer: ReturnType<typeof setTimeout> | null = null;
  private timer: ReturnType<typeof setInterval> | null = null;

  constructor(deps: Deps) {
    this.deps = deps;
    this.config = deps.store.loadConfig();
    this.state = pruneOverrides(deps.store.loadState(), deps.now());
  }

  start(): void {
    this.tick();
    this.timer = setInterval(() => this.tick(), SECOND);
  }

  stop(): void {
    if (this.timer) clearInterval(this.timer);
    this.stopSound();
    this.deps.mac.close();
  }

  view(): View {
    const now = this.deps.now();
    return { ...buildView(now, this.config, this.state, evaluate(now, this.config, this.state)), power: this.power };
  }

  subscribe(fn: (view: View) => void): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  get currentPhase(): Phase | null {
    return this.phase;
  }

  tick(force = false): void {
    const now = this.deps.now();
    let ev = evaluate(now, this.config, this.state);

    const night = this.state.night;
    if (ev.nightEnded && night && !night.endedAt) {
      this.setState({
        ...this.state,
        night: { ...night, endedAt: ev.nightEnded.at.toISOString(), endedBy: ev.nightEnded.by },
      });
    }
    if (ev.autoNightDue) {
      this.deps.log('Natta starter av seg selv');
      this.setState({ ...this.state, night: { from: now.toISOString(), endedAt: null, endedBy: null } });
      ev = evaluate(now, this.config, this.state);
    }
    const test = this.state.test;
    if (test && Date.parse(test.at) + this.config.maxRingMinutes * MINUTE < now.getTime()) {
      this.setState({ ...this.state, test: null });
    }

    if (ev.phase !== this.phase) {
      const prev = this.phase;
      this.phase = ev.phase;
      this.deps.log(`Fase: ${prev ?? 'start'} → ${ev.phase}`);
      this.enter(ev.phase, prev);
      force = true;
    }
    if (Date.now() - this.lastPowerCheck >= MINUTE) {
      this.lastPowerCheck = Date.now();
      void this.checkPower();
    }
    if (force || Date.now() - this.lastBroadcast >= 30 * SECOND) {
      const view = { ...buildView(now, this.config, this.state, ev), power: this.power };
      for (const fn of this.listeners) fn(view);
      this.lastBroadcast = Date.now();
    }
  }

  // Det nettsiden kan be om.

  startNight(): void {
    if (this.phase === 'night') return;
    this.setState({ ...this.state, night: { from: this.deps.now().toISOString(), endedAt: null, endedBy: null } });
    this.tick(true);
  }

  cancelNight(): void {
    const night = this.state.night;
    if (night && !night.endedAt) {
      this.setState({
        ...this.state,
        night: { ...night, endedAt: this.deps.now().toISOString(), endedBy: 'cancel' },
      });
    }
    this.tick(true);
  }

  /** Etter glimtet om natta slukkes skjermen igjen. */
  sleepDisplay(): void {
    if (this.phase === 'night') this.deps.mac.sleepDisplay();
  }

  /** Alarmtiden for morgenen som kommer. `default` tar bort endringen. */
  setUpcoming(time: string | null | 'default'): void {
    const key = dateKey(upcomingMorning(this.deps.now()));
    const overrides = { ...this.state.overrides };
    if (time === 'default') delete overrides[key];
    else overrides[key] = time;
    this.setState({ ...this.state, overrides });
    this.tick(true);
  }

  dismiss(): boolean {
    if (this.phase !== 'alarm' && this.phase !== 'sunrise') return false;
    const now = this.deps.now();
    // En prøvealarm tas bare bort. Da kommer du tilbake dit du var, uten morgenskjerm.
    if (evaluate(now, this.config, this.state).alarm?.test) {
      this.setState({ ...this.state, test: null });
      this.deps.log('Prøvealarmen er skrudd av');
      this.tick(true);
      return true;
    }
    const night = this.state.night;
    this.setState({
      ...pruneOverrides(this.state, now),
      dismissedAt: now.toISOString(),
      test: null,
      night: night && !night.endedAt ? { ...night, endedAt: now.toISOString(), endedBy: 'alarm' } : night,
    });
    this.deps.log('Alarmen er skrudd av');
    this.tick(true);
    return true;
  }

  /** Nettleseren sier at radioen (eller reservelyden der) spiller. */
  confirmPlaying(): void {
    if (!this.sound) return;
    this.sound.confirmed = true;
    this.deps.mac.playFallback(null);
  }

  /** En prøvealarm om ett minutt, med en kort soloppgang først. */
  testAlarm(): void {
    const at = new Date(this.deps.now().getTime() + MINUTE);
    this.setState({ ...this.state, test: { at: at.toISOString(), sunriseSeconds: 50 } });
    this.tick(true);
  }

  updateConfig(config: Config): void {
    this.config = config;
    this.deps.store.saveConfig(config);
    this.tick(true);
  }

  /** Sjekker laderen hvert minutt, så kvelden kan si fra hvis Macen går på batteri. */
  private async checkPower(): Promise<void> {
    const power = await this.deps.mac.power();
    const was = this.power;
    this.power = power;
    if (power?.onBattery !== was?.onBattery || power?.percent !== was?.percent) {
      if (power && power.onBattery !== was?.onBattery) {
        this.deps.log(power.onBattery ? `Macen går på batteri (${power.percent ?? '?'} %)` : 'Macen er koblet til lader');
      }
      this.tick(true);
    }
  }

  private setState(state: State): void {
    this.state = state;
    this.deps.store.saveState(state);
  }

  private enter(phase: Phase, prev: Phase | null): void {
    const { mac } = this.deps;
    if (prev === 'alarm') this.stopSound();
    if (this.sleepTimer) {
      clearTimeout(this.sleepTimer);
      this.sleepTimer = null;
    }
    switch (phase) {
      case 'night':
        mac.keepDisplayOn(false);
        // La nettsiden rekke å bli svart før skjermen slukkes.
        this.sleepTimer = setTimeout(() => {
          if (this.phase === 'night') mac.sleepDisplay();
        }, 3 * SECOND);
        break;
      case 'sunrise':
        mac.keepDisplayOn(true);
        mac.wakeDisplay();
        break;
      case 'alarm':
        mac.keepDisplayOn(true);
        mac.wakeDisplay();
        void this.startSound();
        break;
      default:
        // Klokka står hele dagen.
        mac.keepDisplayOn(true);
        if (prev === 'night') mac.wakeDisplay();
    }
  }

  private async startSound(): Promise<void> {
    const { mac, log, chimeFile } = this.deps;
    const sound: Sound = { ramp: null, fallback: null, saved: null, confirmed: false };
    this.sound = sound;
    sound.saved = await mac.getVolume();
    if (this.sound !== sound) return;

    const { start, end, rampSeconds } = this.config.volume;
    const began = Date.now();
    const step = () => {
      const p = rampSeconds > 0 ? Math.min(1, (Date.now() - began) / (rampSeconds * SECOND)) : 1;
      mac.setVolume(start + (end - start) * p);
      if (p >= 1 && sound.ramp) {
        clearInterval(sound.ramp);
        sound.ramp = null;
      }
    };
    step();
    sound.ramp = setInterval(step, 3 * SECOND);

    // Er ingen nettleser åpen, eller får den ikke spilt, spiller serveren reservelyden selv.
    const wait = this.listeners.size === 0 ? 0 : FALLBACK_AFTER_MS;
    sound.fallback = setTimeout(() => {
      if (this.sound === sound && !sound.confirmed) {
        log('Ingen lyd fra nettleseren. Spiller reservelyden.');
        mac.playFallback(chimeFile);
      }
    }, wait);
  }

  private stopSound(): void {
    const sound = this.sound;
    if (!sound) return;
    this.sound = null;
    if (sound.ramp) clearInterval(sound.ramp);
    if (sound.fallback) clearTimeout(sound.fallback);
    this.deps.mac.playFallback(null);
    // Vent til nettleseren har tonet ut lyden før volumet settes tilbake.
    const saved = sound.saved;
    if (saved !== null) setTimeout(() => this.deps.mac.setVolume(saved), 1500);
  }
}
