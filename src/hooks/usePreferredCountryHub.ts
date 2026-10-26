"use client";

import * as React from "react";
import {
  enablePreferredCountryHub,
  getPreferredCountryHub,
  subscribePreferredCountryHub,
} from "@/lib/utils/preferred-country-hub";

/**
 * Session hub for render-time nav (labels, ticks, hub-aware hrefs). Null during SSR and
 * hydration so server and client HTML match; the component re-renders once it is readable.
 */
export function usePreferredCountryHub(): string | null {
  React.useEffect(enablePreferredCountryHub, []);
  return React.useSyncExternalStore(subscribePreferredCountryHub, getPreferredCountryHub, () => null);
}
