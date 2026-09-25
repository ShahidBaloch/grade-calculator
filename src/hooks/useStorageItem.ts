"use client";

import * as React from "react";
import { getStorageItem } from "@/lib/utils/storage";

function subscribeStorageKey(key: string, onStoreChange: () => void): () => void {
  const handler = (event: StorageEvent) => {
    if (event.key === key || event.key === null) onStoreChange();
  };
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
}

/** Client localStorage value with SSR-safe null snapshot. */
export function useStorageItem(key: string): string | null {
  return React.useSyncExternalStore(
    (onStoreChange) => subscribeStorageKey(key, onStoreChange),
    () => getStorageItem(key),
    () => null,
  );
}
