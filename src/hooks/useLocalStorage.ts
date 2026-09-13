"use client";

import * as React from "react";
import { getStorageItem, setStorageItem } from "@/lib/utils/storage";

export function useLocalStorage<T extends string>(key: string, initialValue: T) {
  const [value, setValue] = React.useState<T>(initialValue);

  React.useEffect(() => {
    const stored = getStorageItem(key);
    if (stored) setValue(stored as T);
  }, [key]);

  const update = React.useCallback(
    (next: T) => {
      setValue(next);
      setStorageItem(key, next);
    },
    [key],
  );

  return [value, update] as const;
}
