import { getCalculatorPath } from "@/config/calculators";
import { countryHubs } from "@/config/country-hubs";
import type { CalculatorSlug } from "@/types/calculator";

/** e.g. `/au/gpa-calculator` → `/au` */
export function getCountryPrefixFromPath(pathname: string | null | undefined): string | null {
  if (!pathname) return null;
  for (const hub of countryHubs) {
    if (pathname === hub.path || pathname.startsWith(`${hub.path}/`)) {
      return hub.path;
    }
  }
  return null;
}

const GEO_SLUG_ALIASES: Partial<
  Record<string, Partial<Record<CalculatorSlug, CalculatorSlug>>>
> = {
  "/uk": {
    "percentage-to-letter-grade": "degree-classification-calculator",
  },
  "/au": {
    "percentage-to-letter-grade": "letter-grade-calculator",
  },
  "/ca": {
    "percentage-to-letter-grade": "letter-grade-calculator",
  },
};

/**
 * Keep users on country hub routes when navigating between related tools.
 */
export function resolveCalculatorPath(
  slug: CalculatorSlug,
  pathname?: string | null,
): string {
  const prefix = getCountryPrefixFromPath(pathname);
  if (!prefix) {
    return getCalculatorPath(slug);
  }

  const hub = countryHubs.find((item) => item.path === prefix);
  if (!hub) return getCalculatorPath(slug);

  const resolvedSlug = GEO_SLUG_ALIASES[prefix]?.[slug] ?? slug;

  if (slug === "ez-grader") {
    return hub.featuredCalculators.includes("ez-grader") ? `${prefix}/ez-grader` : "/";
  }

  if (hub.featuredCalculators.includes(resolvedSlug)) {
    return `${prefix}/${resolvedSlug}`;
  }

  return getCalculatorPath(resolvedSlug);
}

/** Scope localStorage so US saved grades do not hydrate on /au/... pages. */
export function calculatorStorageScope(pathname: string | null | undefined): string {
  return getCountryPrefixFromPath(pathname) ?? "world";
}
