"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { getScale } from "@/lib/grading-scales";
import {
  getLockedScaleFromPath,
  isValidScaleId,
  resolveDefaultScaleId,
} from "@/lib/grading-scales/resolve-scale";
import { GEO_COOKIES, STORAGE_KEYS } from "@/lib/constants";
import { useStorageItem } from "@/hooks/useStorageItem";
import { getCookie } from "@/lib/utils/cookies";
import { setStorageItem } from "@/lib/utils/storage";
import type { GradingScale, ScaleId } from "@/types/grading-scale";

interface GradingScaleContextValue {
  scaleId: ScaleId;
  scale: GradingScale;
  setScaleId: (scaleId: ScaleId) => void;
  /** True on `/uk/`, `/au/`, etc. — scale follows the page, not user preference. */
  isScaleLocked: boolean;
  /** Scale inferred from IP geo cookie (middleware). */
  geoScaleId: ScaleId | null;
}

const GradingScaleContext = React.createContext<GradingScaleContextValue | null>(null);

function readGeoScaleFromCookie(): ScaleId | null {
  const value = getCookie(GEO_COOKIES.scale);
  return isValidScaleId(value) ? value : null;
}

export function GradingScaleProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lockedScaleId = getLockedScaleFromPath(pathname);
  const isScaleLocked = lockedScaleId !== null;

  const userScaleRaw = useStorageItem(STORAGE_KEYS.scale);
  const geoScaleId = React.useSyncExternalStore(
    () => () => {},
    readGeoScaleFromCookie,
    () => null,
  );

  const autoScaleId = React.useMemo(
    () =>
      resolveDefaultScaleId({
        pathname,
        userScaleId: isScaleLocked ? null : isValidScaleId(userScaleRaw) ? userScaleRaw : null,
        geoScaleId: isScaleLocked ? null : geoScaleId,
        useLocaleHint: !userScaleRaw && !geoScaleId && !isScaleLocked,
      }),
    [pathname, isScaleLocked, userScaleRaw, geoScaleId],
  );

  const [userPick, setUserPick] = React.useState<{ pathname: string; scaleId: ScaleId } | null>(
    null,
  );

  const scaleId =
    userPick && userPick.pathname === pathname && !isScaleLocked ? userPick.scaleId : autoScaleId;

  const setScaleId = React.useCallback(
    (next: ScaleId) => {
      if (isScaleLocked) return;
      setUserPick({ pathname, scaleId: next });
      setStorageItem(STORAGE_KEYS.scale, next);
    },
    [isScaleLocked, pathname],
  );

  const activeScaleId = lockedScaleId ?? scaleId;

  const value = React.useMemo(
    () => ({
      scaleId: activeScaleId,
      scale: getScale(activeScaleId),
      setScaleId,
      isScaleLocked,
      geoScaleId,
    }),
    [activeScaleId, setScaleId, isScaleLocked, geoScaleId],
  );

  return <GradingScaleContext.Provider value={value}>{children}</GradingScaleContext.Provider>;
}

export function useGradingScaleContext() {
  const context = React.useContext(GradingScaleContext);
  if (!context) {
    throw new Error("useGradingScaleContext must be used within GradingScaleProvider");
  }
  return context;
}
