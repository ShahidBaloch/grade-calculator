import { GEO_COOKIES } from "@/lib/constants";
import { getCookie } from "@/lib/utils/cookies";

const MAX_AGE = 60 * 60 * 24 * 30;
const listeners = new Set<() => void>();
let requested = false;

function setCookie(name: string, value: string) {
  const secure = location.protocol === "https:" ? "; secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${MAX_AGE}; path=/; samesite=lax${secure}`;
}

/** Fetch /api/geo once when the geo cookies are missing; the scale cookie (empty if unsupported) marks "checked". */
function ensureGeo() {
  if (requested || getCookie(GEO_COOKIES.scale) !== null) return;
  requested = true;
  fetch("/api/geo")
    .then((res) => (res.ok ? res.json() : null))
    .then((data: { country: string | null; scale: string | null } | null) => {
      if (!data) return;
      setCookie(GEO_COOKIES.scale, data.scale ?? "");
      if (data.country) setCookie(GEO_COOKIES.country, data.country);
      listeners.forEach((listener) => listener());
    })
    .catch(() => {});
}

/** `useSyncExternalStore` subscribe for the geo cookies; triggers the one-time lookup. */
export function subscribeGeo(listener: () => void) {
  listeners.add(listener);
  ensureGeo();
  return () => {
    listeners.delete(listener);
  };
}
