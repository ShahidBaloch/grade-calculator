"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { syncPreferredCountryHubFromPath } from "@/lib/utils/country-path";

/** Keeps the visitor's country hub in sessionStorage while they switch calculators. */
export function PreferredCountryHubSync() {
  const pathname = usePathname();
  useEffect(() => {
    syncPreferredCountryHubFromPath(pathname);
  }, [pathname]);
  return null;
}
