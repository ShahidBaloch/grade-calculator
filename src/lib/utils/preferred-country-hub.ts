import { countryHubRoutes } from "@/config/country-hub-routes";
import { mainCountryPath } from "@/config/country-hub-routes";

const STORAGE_KEY = "gc-preferred-hub";

/**
 * Server HTML is rendered without a session hub. Reads stay null until hydration finishes,
 * otherwise /calculators after a /pk visit hydrates "Pakistan" over the server's "Countries".
 */
let readable = false;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

export function subscribePreferredCountryHub(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Call after hydration; components using usePreferredCountryHub re-render with the session hub. */
export function enablePreferredCountryHub(): void {
  if (readable) return;
  readable = true;
  notify();
}

function isPersistedHub(path: string | null): path is string {
  return Boolean(path && path !== mainCountryPath && countryHubRoutes.some((hub) => hub.path === path));
}

/** Hub chosen this session (non-US). Survives calculator switches until refresh or US hub visit. */
export function getPreferredCountryHub(): string | null {
  if (!readable || typeof sessionStorage === "undefined") return null;
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return isPersistedHub(stored) ? stored : null;
  } catch {
    return null;
  }
}

export function setPreferredCountryHub(hubPath: string | null): void {
  if (typeof sessionStorage === "undefined") return;
  try {
    if (isPersistedHub(hubPath)) {
      sessionStorage.setItem(STORAGE_KEY, hubPath);
    } else {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    /* private mode */
  }
  notify();
}
