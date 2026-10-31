"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { syncPreferredCountryHubFromPath } from "@/lib/utils/country-path";
import { enablePreferredCountryHub } from "@/lib/utils/preferred-country-hub";

/** Keeps the visitor's country hub in sessionStorage while they switch calculators. */
export function PreferredCountryHubSync() {
  const pathname = usePathname();
  useEffect(() => {
    // Islands hydrate independently, so this can run before the header has enabled hub reads.
    // Without it, a worldwide page would see "no hub" and clear the one the visitor picked.
    enablePreferredCountryHub();
    syncPreferredCountryHubFromPath(pathname);
  }, [pathname]);
  return null;
}
