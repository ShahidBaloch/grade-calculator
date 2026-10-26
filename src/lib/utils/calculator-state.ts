import { URL_STATE_PARAM } from "@/lib/constants";

/**
 * UTF-8 → base64 with btoa/atob (browser and Node 16+). Avoids `Buffer`, which pulled a ~9 KB
 * polyfill into every calculator page, and lets names like "Español" survive (raw btoa throws).
 * ASCII-only links made by the old encoder decode the same way.
 */
export function encodeCalculatorState(state: unknown): string {
  const bytes = new TextEncoder().encode(JSON.stringify(state));
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

export function decodeCalculatorState<T>(encoded: string): T | null {
  try {
    const bytes = Uint8Array.from(atob(encoded), (char) => char.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes)) as T;
  } catch {
    return null;
  }
}

export function buildShareUrl(pathname: string, state: unknown): string {
  const encoded = encodeCalculatorState(state);
  const params = new URLSearchParams();
  params.set(URL_STATE_PARAM, encoded);
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  return `${origin}${pathname}?${params.toString()}`;
}

export function readStateFromSearchParams<T>(search: string): T | null {
  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const encoded = params.get(URL_STATE_PARAM);
  if (!encoded) return null;
  return decodeCalculatorState<T>(encoded);
}
