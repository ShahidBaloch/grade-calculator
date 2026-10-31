/**
 * Minimal next-themes replacement. The inline head script in the Astro layout applies the
 * stored theme before paint; this hook reads and updates it.
 */
import type { ComponentChildren } from "preact";
import { useCallback, useEffect, useState } from "preact/hooks";

export const THEME_STORAGE_KEY = "gc-theme";

type Theme = "light" | "dark" | "system";

export interface ThemeProviderProps {
  children?: ComponentChildren;
  attribute?: string;
  defaultTheme?: string;
  enableSystem?: boolean;
  storageKey?: string;
  disableTransitionOnChange?: boolean;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return <>{children}</>;
}

function readTheme(): Theme {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    if (value === "light" || value === "dark" || value === "system") return value;
  } catch {
    // storage blocked
  }
  return "system";
}

function systemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  const resolved = theme === "system" ? systemTheme() : theme;
  const root = document.documentElement;
  root.classList.toggle("dark", resolved === "dark");
  root.classList.toggle("light", resolved === "light");
  root.style.colorScheme = resolved;
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme | undefined>(undefined);

  useEffect(() => {
    setThemeState(readTheme());
    const onStorage = (event: StorageEvent) => {
      if (event.key === THEME_STORAGE_KEY) {
        const next = readTheme();
        setThemeState(next);
        applyTheme(next);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setTheme = useCallback((next: string) => {
    const value = (next === "light" || next === "dark" ? next : "system") as Theme;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, value);
    } catch {
      // storage blocked
    }
    setThemeState(value);
    applyTheme(value);
  }, []);

  const resolvedTheme =
    theme === undefined ? undefined : theme === "system" ? systemTheme() : theme;

  return {
    theme,
    setTheme,
    resolvedTheme,
    systemTheme: typeof window === "undefined" ? undefined : systemTheme(),
    themes: ["light", "dark", "system"],
  };
}
