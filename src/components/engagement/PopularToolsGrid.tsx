"use client";

import { CountryAwareLink } from "@/components/navigation/CountryAwareLink";
import { getCalculatorPath, mvpCalculators } from "@/config/calculators";

export function PopularToolsGrid() {
  return (
    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {mvpCalculators.map((calculator) => (
        <li key={calculator.slug}>
          <CountryAwareLink
            href={getCalculatorPath(calculator.slug)}
            className="flex min-h-11 flex-col justify-center rounded-md border border-[var(--color-border)] px-3 py-2 text-sm hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-primary)]"
          >
            <span className="font-medium">{calculator.name}</span>
            <span className="text-xs text-[var(--color-text-muted)] line-clamp-1">
              {calculator.description}
            </span>
          </CountryAwareLink>
        </li>
      ))}
    </ul>
  );
}
