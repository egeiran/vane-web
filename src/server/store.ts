import { mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { DEFAULT_CONFIG, parseConfig, parseState } from '../shared/config.ts';
import type { Config, State } from '../shared/types.ts';

/** Innstillinger og tilstand som JSON-filer i `data/` (ikke i git). */
export class Store {
  readonly dir: string;
  private log: (msg: string) => void;

  constructor(dir: string, log: (msg: string) => void) {
    this.dir = dir;
    this.log = log;
    mkdirSync(dir, { recursive: true });
  }

  readJson(name: string): unknown {
    try {
      return JSON.parse(readFileSync(join(this.dir, name), 'utf8'));
    } catch {
      return undefined;
    }
  }

  /** Skriver til en midlertidig fil først, så en strømstans ikke etterlater en halv fil. */
  writeJson(name: string, value: unknown): void {
    const file = join(this.dir, name);
    const tmp = `${file}.tmp`;
    writeFileSync(tmp, `${JSON.stringify(value, null, 2)}\n`);
    renameSync(tmp, file);
  }

  loadConfig(): Config {
    const raw = this.readJson('config.json');
    if (raw === undefined) {
      this.writeJson('config.json', DEFAULT_CONFIG);
      return DEFAULT_CONFIG;
    }
    const res = parseConfig(raw);
    if (res.ok) return res.config;
    this.log(`Innstillingene i config.json brukes ikke: ${res.error}`);
    return DEFAULT_CONFIG;
  }

  saveConfig(config: Config): void {
    this.writeJson('config.json', config);
  }

  loadState(): State {
    return parseState(this.readJson('state.json'));
  }

  saveState(state: State): void {
    this.writeJson('state.json', state);
  }
}
