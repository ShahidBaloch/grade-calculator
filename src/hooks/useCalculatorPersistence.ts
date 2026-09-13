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
import { calculatorBySlug } from "@/config/calculators";
import { serializeRecentCalculator } from "@/lib/utils/recent-calculator";
import { getStorageItem, setStorageItem } from "@/lib/utils/storage";
import { isCalculatorSlug } from "@/types/calculator";

export function useCalculatorPersistence<T>(slug: string, initialState: T) {
  const pathname = usePathname();
  const storageKey = STORAGE_KEYS.calculatorState(slug);
  const [state, setState] = React.useState<T>(initialState);
  const [hydrated, setHydrated] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!isCalculatorSlug(slug)) return;
    // Homepage EZ Grader is the default landing page, not a "resume" target.
    if (pathname === "/") return;
    setStorageItem(
      STORAGE_KEYS.recentCalculator,
      serializeRecentCalculator({ slug, path: pathname || calculatorBySlug[slug].path }),
    );
  }, [slug, pathname]);

  React.useEffect(() => {
    const fromUrl = readStateFromSearchParams<T>(window.location.search);
    if (fromUrl) {
      setState(fromUrl);
      setHydrated(true);
      return;
    }

    const stored = getStorageItem(storageKey);
    if (stored) {
      const parsed = decodeCalculatorState<T>(stored);
      if (parsed) setState(parsed);
    }
    setHydrated(true);
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
