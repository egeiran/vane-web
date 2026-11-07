/**
 * Lager `public/chime.wav`: den innebygde alarmlyden, som spilles når radioen ikke virker.
 * Tre myke klokketoner (C, E, G) og litt stillhet, laget for å gå i loop.
 * Kjør på nytt med `node scripts/make-chime.ts` hvis du vil endre den.
 */
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

const RATE = 22_050;
const SECONDS = 5;
const NOTES = [
  { at: 0, freq: 523.25 },
  { at: 0.55, freq: 659.25 },
  { at: 1.1, freq: 783.99 },
];

const samples = new Float32Array(RATE * SECONDS);
for (const note of NOTES) {
  const start = Math.round(note.at * RATE);
  for (let i = start; i < samples.length; i++) {
    const t = (i - start) / RATE;
    const attack = Math.min(1, t / 0.012);
    const decay = Math.exp(-t * 1.6);
    const tone =
      Math.sin(2 * Math.PI * note.freq * t) +
      0.35 * Math.sin(2 * Math.PI * note.freq * 2 * t) * Math.exp(-t * 2.5) +
      0.12 * Math.sin(2 * Math.PI * note.freq * 3.01 * t) * Math.exp(-t * 4);
    samples[i] += 0.22 * attack * decay * tone;
  }
}
// Ton helt ut mot slutten, så loopen ikke klikker.
const fade = Math.round(0.4 * RATE);
for (let i = 0; i < fade; i++) samples[samples.length - 1 - i] *= i / fade;

const data = Buffer.alloc(samples.length * 2);
samples.forEach((s, i) => data.writeInt16LE(Math.round(Math.max(-1, Math.min(1, s)) * 32_767), i * 2));
const header = Buffer.alloc(44);
header.write('RIFF', 0);
header.writeUInt32LE(36 + data.length, 4);
header.write('WAVE', 8);
header.write('fmt ', 12);
header.writeUInt32LE(16, 16);
header.writeUInt16LE(1, 20);
header.writeUInt16LE(1, 22);
header.writeUInt32LE(RATE, 24);
header.writeUInt32LE(RATE * 2, 28);
header.writeUInt16LE(2, 32);
header.writeUInt16LE(16, 34);
header.write('data', 36);
header.writeUInt32LE(data.length, 40);

const out = join(import.meta.dirname, '..', 'public', 'chime.wav');
writeFileSync(out, Buffer.concat([header, data]));
console.log(`Skrev ${out}`);
