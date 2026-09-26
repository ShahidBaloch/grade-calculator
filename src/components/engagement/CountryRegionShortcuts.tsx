"use client";

import Link from "next/link";
import { countryHubs } from "@/config/country-hubs";

/** Quick jump to a country hub so users land on the right grading context. */
export function CountryRegionShortcuts({ activePath }: { activePath?: string }) {
  const active = activePath?.replace(/\/$/, "");

  return (
    <nav aria-label="Grading region" className="space-y-2">
      <p className="text-sm font-medium text-[var(--color-text)]">Grading region</p>
      <ul className="flex flex-wrap gap-2">
        {countryHubs.map((hub) => {
          const isActive = active === hub.path;
          return (
            <li key={hub.path}>
              <Link
                href={hub.path}
                className={`inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm ${
                  isActive
                    ? "border-[var(--color-primary)] bg-[var(--color-primary-subtle)] font-medium"
                    : "border-[var(--color-border)] hover:bg-[var(--color-bg-subtle)]"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <span aria-hidden>{hub.flag}</span>
                {hub.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
