/**
 * Det serveren gjør med Macen: slår skjermen av og på, holder maskinen våken, styrer volumet og
 * spiller en reservelyd. På andre systemer enn macOS skrives det bare til loggen, så appen kan
 * utvikles og testes på hvilken som helst maskin.
 */
import { type ChildProcess, execFile, spawn } from 'node:child_process';

import type { Power } from '../shared/types.ts';

export type Mac = {
  sleepDisplay(): void;
  wakeDisplay(): void;
  /** Hindrer at skjermen sovner av seg selv (om dagen og under alarmen). */
  keepDisplayOn(on: boolean): void;
  getVolume(): Promise<number | null>;
  /** Går Macen på lader eller batteri? */
  power(): Promise<Power | null>;
  setVolume(percent: number): void;
  /** Spiller `file` om og om igjen, til den slås av. */
  playFallback(file: string | null): void;
  close(): void;
};

function run(cmd: string, args: string[], log: (msg: string) => void): Promise<string> {
  return new Promise((resolve) => {
    execFile(cmd, args, { timeout: 10_000 }, (err, stdout) => {
      if (err) log(`${cmd} feilet: ${err.message}`);
      resolve(String(stdout).trim());
    });
  });
}

export function createMac(log: (msg: string) => void): Mac {
  if (process.platform !== 'darwin') return fakeMac(log);

  // Macen skal ikke sove så lenge serveren kjører (`-s`: heller ikke med lokket åpent på lader).
  const awake = spawn('caffeinate', ['-i', '-s', '-w', String(process.pid)], { stdio: 'ignore' });
  let display: ChildProcess | null = null;
  let fallback: ChildProcess | null = null;
  let fallbackFile: string | null = null;

  const loop = () => {
    if (!fallbackFile) return;
    fallback = spawn('afplay', [fallbackFile], { stdio: 'ignore' });
    fallback.on('exit', () => {
      fallback = null;
      if (fallbackFile) setTimeout(loop, 400);
    });
  };

  return {
    sleepDisplay() {
      void run('pmset', ['displaysleepnow'], log);
    },
    wakeDisplay() {
      // «Brukeren er aktiv» i to sekunder vekker skjermen.
      void run('caffeinate', ['-u', '-t', '2'], log);
    },
    keepDisplayOn(on) {
      if (on && !display) {
        display = spawn('caffeinate', ['-d', '-w', String(process.pid)], { stdio: 'ignore' });
      } else if (!on && display) {
        display.kill();
        display = null;
      }
    },
    async power() {
      return parsePower(await run('pmset', ['-g', 'batt'], log));
    },
    async getVolume() {
      const out = await run('osascript', ['-e', 'output volume of (get volume settings)'], log);
      const n = Number(out);
      return Number.isFinite(n) && out !== '' ? n : null;
    },
    setVolume(percent) {
      const v = Math.round(Math.min(100, Math.max(0, percent)));
      void run('osascript', ['-e', `set volume output volume ${v} without output muted`], log);
    },
    playFallback(file) {
      fallbackFile = file;
      if (file && !fallback) loop();
      if (!file && fallback) {
        fallback.kill();
        fallback = null;
      }
    },
    close() {
      awake.kill();
      display?.kill();
      fallbackFile = null;
      fallback?.kill();
    },
  };
}

/**
 * Leser `pmset -g batt`, for eksempel:
 *   Now drawing from 'Battery Power'
 *    -InternalBattery-0 (id=1234)	73%; discharging; 5:12 remaining present: true
 */
export function parsePower(text: string): Power | null {
  const onBattery = text.includes("'Battery Power'");
  if (!onBattery && !text.includes("'AC Power'")) return null;
  const m = /(\d+)%/.exec(text);
  return { onBattery, percent: m ? Number(m[1]) : null };
}

/** Utenfor macOS. `VANE_FAKE_POWER=battery:73` later som om Macen går på batteri. */
function fakeMac(log: (msg: string) => void): Mac {
  const fake = process.env.VANE_FAKE_POWER;
  let displayOn = false;
  let volume = 30;
  let playing: string | null = null;
  return {
    sleepDisplay: () => log('[mac] skjermen av'),
    wakeDisplay: () => log('[mac] skjermen på'),
    keepDisplayOn(on) {
      if (on !== displayOn) log(`[mac] hold skjermen på: ${on ? 'ja' : 'nei'}`);
      displayOn = on;
    },
    getVolume: async () => volume,
    power: async () =>
      fake ? { onBattery: fake.startsWith('battery'), percent: Number(fake.split(':')[1]) || null } : null,
    setVolume(percent) {
      volume = Math.round(percent);
      log(`[mac] volum ${volume} %`);
    },
    playFallback(file) {
      if (file !== playing) log(file ? `[mac] reservelyd: ${file}` : '[mac] reservelyd av');
      playing = file;
    },
    close() {},
  };
}
