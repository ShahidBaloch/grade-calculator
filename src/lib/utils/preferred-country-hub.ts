import { countryHubRoutes } from "@/config/country-hub-routes";
import { mainCountryPath } from "@/config/country-hub-routes";

const STORAGE_KEY = "gc-preferred-hub";

function isPersistedHub(path: string | null): path is string {
  return Boolean(path && path !== mainCountryPath && countryHubRoutes.some((hub) => hub.path === path));
}

/** Hub chosen this session (non-US). Survives calculator switches until refresh or US hub visit. */
export function getPreferredCountryHub(): string | null {
  if (typeof sessionStorage === "undefined") return null;
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
}
