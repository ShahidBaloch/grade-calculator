"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GEO_COOKIES } from "@/lib/constants";
import { geoPageHint } from "@/lib/utils/geo-navigation";
import { getCookie } from "@/lib/utils/cookies";
import { useSyncExternalStore } from "react";

function readCountry(): string | null {
  return getCookie(GEO_COOKIES.country);
}

/** Single line when this page is the wrong tool for the visitor's country. */
export function GeoPageHint() {
  const pathname = usePathname();
  const country = useSyncExternalStore(() => () => {}, readCountry, () => null);
  const hint = geoPageHint(pathname, country);
  if (!hint) return null;

  return (
    <p className="no-print mt-3 text-sm text-[var(--color-text-muted)]">
      {hint.message}{" "}
      <Link href={hint.href} className="font-medium text-[var(--color-primary)] hover:underline">
        {hint.linkLabel}
      </Link>
    </p>
  );
}
