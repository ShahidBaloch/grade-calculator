"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { INPUT_DEBOUNCE_MS, STORAGE_KEYS } from "@/lib/constants";
import {
  buildShareUrl,
  decodeCalculatorState,
  encodeCalculatorState,
  readStateFromSearchParams,
} from "@/lib/utils/calculator-state";
import { getCalculatorPath } from "@/config/calculators";
import { serializeRecentCalculator } from "@/lib/utils/recent-calculator";
import { calculatorStorageScope } from "@/lib/utils/country-path";
import { getStorageItem, setStorageItem, takeCalculatorHandoff } from "@/lib/utils/storage";
import { isCalculatorSlug } from "@/types/calculator";

export function useCalculatorPersistence<T>(slug: string, initialState: T) {
  const pathname = usePathname();
  const storageScope = calculatorStorageScope(pathname);
  const storageKey = `${STORAGE_KEYS.calculatorState(slug)}:${storageScope}`;
  const [state, setState] = React.useState<T>(initialState);
  const [hydrated, setHydrated] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!isCalculatorSlug(slug)) return;
    // Homepage EZ Grader is the default landing page, not a "resume" target.
    // Guide embeds should not overwrite recent with a /guides/... URL.
    if (pathname === "/" || pathname.startsWith("/guides/")) return;
    setStorageItem(
      STORAGE_KEYS.recentCalculator,
      serializeRecentCalculator({ slug, path: pathname || getCalculatorPath(slug) }),
    );
  }, [slug, pathname]);

  React.useEffect(() => {
    let cancelled = false;
    // Apply the URL or saved snapshot in a callback so the server HTML hydrates
    // first. A direct setState here re-renders in the same effect flush.
    queueMicrotask(() => {
      if (cancelled) return;
      const fromUrl = readStateFromSearchParams<T>(window.location.search);
      if (fromUrl) {
        setState({ ...initialState, ...fromUrl });
        setHydrated(true);
        return;
      }

      const stored = getStorageItem(storageKey);
      const parsed = stored ? decodeCalculatorState<Partial<T>>(stored) : null;
      // Inputs handed over by the previous calculator's "Continue" link win over saved ones.
      const handoff = takeCalculatorHandoff<T>(slug);
      // Merge so newly added fields keep their defaults after schema upgrades.
      if (parsed || handoff) setState({ ...initialState, ...parsed, ...handoff });
      setHydrated(true);
    });
    return () => {
      cancelled = true;
    };
    // initialState is only used for first hydrate / schema upgrades — omit from deps
    // eslint-disable-next-line react-hooks/exhaustive-deps -- avoid re-hydrate loops from inline defaults
  }, [storageKey]);

  React.useEffect(() => {
    if (!hydrated) return;
    const timer = window.setTimeout(() => {
      setStorageItem(storageKey, encodeCalculatorState(state));
    }, INPUT_DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [state, hydrated, storageKey]);

  const updateState = React.useCallback((patch: Partial<T> | ((prev: T) => T)) => {
    setState((prev) => (typeof patch === "function" ? patch(prev) : { ...prev, ...patch }));
  }, []);

  const resetState = React.useCallback(() => {
    setState(initialState);
  }, [initialState]);

  const shareUrl = React.useCallback(async () => {
    const url = buildShareUrl(window.location.pathname, state);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link:", url);
    }
  }, [state]);

  return { state, setState, updateState, resetState, shareUrl, copied, hydrated };
}
