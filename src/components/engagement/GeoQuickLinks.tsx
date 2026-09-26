"use client";

import Link from "next/link";
import { GEO_COOKIES } from "@/lib/constants";
import { quickToolsForCountry } from "@/lib/utils/geo-navigation";
import { getCookie } from "@/lib/utils/cookies";
import { useSyncExternalStore } from "react";

function readCountry(): string | null {
  return getCookie(GEO_COOKIES.country);
}

/** Three or four tool links under the homepage calculator. Destinations follow location. */
export function GeoQuickLinks() {
  const country = useSyncExternalStore(() => () => {}, readCountry, () => null);
  const links = quickToolsForCountry(country);

  return (
    <nav aria-label="Other calculators" className="no-print">
      <p className="text-sm font-medium text-[var(--color-text)]">Also calculate</p>
      <ul className="mt-2 flex flex-wrap gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="inline-flex min-h-11 items-center rounded-md border border-[var(--color-border)] px-3 text-sm font-medium hover:bg-[var(--color-bg-subtle)]"
            >
              {link.label}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href="/calculators"
            className="inline-flex min-h-11 items-center px-2 text-sm text-[var(--color-primary)] hover:underline"
          >
            All tools
          </Link>
        </li>
      </ul>
    </nav>
  );
}
