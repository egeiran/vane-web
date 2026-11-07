import type { View } from '../shared/types.ts';

/** Sender en handling til serveren og får den nye visningen tilbake. */
export async function post(path: string, body: unknown = {}): Promise<View | null> {
  try {
    const res = await fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return res.ok ? ((await res.json()) as View) : null;
  } catch {
    return null;
  }
}

export async function getJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(path, { cache: 'no-store' });
    return res.ok ? ((await res.json()) as T) : null;
  } catch {
    return null;
  }
}
