export function getStorageItem(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function setStorageItem(key: string, value: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Ignore quota / privacy errors
  }
}

export function removeStorageItem(key: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Ignore
  }
}

const handoffKey = (slug: string) => `gc-handoff-${slug}`;

/** Inputs carried to the next calculator by a "Continue" link (this tab only, read once). */
export function setCalculatorHandoff(slug: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(handoffKey(slug), JSON.stringify(value));
  } catch {
    // Ignore quota / privacy errors
  }
}

export function takeCalculatorHandoff<T>(slug: string): Partial<T> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(handoffKey(slug));
    if (raw === null) return null;
    window.sessionStorage.removeItem(handoffKey(slug));
    return JSON.parse(raw) as Partial<T>;
  } catch {
    return null;
  }
}
