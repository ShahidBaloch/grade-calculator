"use client";

import { AppLink as Link } from "@/components/navigation/AppLink";
import { GEO_COOKIES } from "@/lib/constants";
import { quickToolsForCountry } from "@/lib/utils/geo-navigation";
import { getCookie } from "@/lib/utils/cookies";
import { subscribeGeo } from "@/lib/utils/geo-client";
import { useSyncExternalStore } from "react";

function readCountry(): string | null {
  return getCookie(GEO_COOKIES.country);
}

/** Three or four tool links under the homepage calculator. Destinations follow location. */
export function GeoQuickLinks() {
  const country = useSyncExternalStore(subscribeGeo, readCountry, () => null);
  const links = quickToolsForCountry(country);

  return (
    <nav aria-label="Other calculators" className="no-print">
      <p className="text-sm font-medium text-[var(--color-text)]">Popular next steps</p>
      <ul className="mt-2 flex flex-wrap gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              prefetch={false}
              className="inline-flex min-h-11 items-center rounded-md border border-[var(--color-btn-border)] bg-[var(--color-btn-bg)] px-3 text-sm font-medium text-[var(--color-text)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
            >
              {link.label}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href="/calculators"
            prefetch={false}
            className="inline-flex min-h-11 items-center px-2 text-sm text-[var(--color-primary)] hover:underline"
          >
            All tools
          </Link>
        </li>
      </ul>
    </nav>
  );
}
