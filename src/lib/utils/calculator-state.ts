import { URL_STATE_PARAM } from "@/lib/constants";

export function encodeCalculatorState(state: unknown): string {
  const json = JSON.stringify(state);
  if (typeof window !== "undefined" && typeof window.btoa === "function") {
    return window.btoa(json);
  }
  return Buffer.from(json, "utf-8").toString("base64");
}

export function decodeCalculatorState<T>(encoded: string): T | null {
  try {
    const json =
      typeof window !== "undefined" && typeof window.atob === "function"
        ? window.atob(encoded)
        : Buffer.from(encoded, "base64").toString("utf-8");
    return JSON.parse(json) as T;
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
