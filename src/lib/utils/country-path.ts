import { calculators, getCalculatorPath } from "@/config/calculators";
import { countryHubs } from "@/config/country-hubs";
import type { CalculatorSlug } from "@/types/calculator";
import { isCalculatorSlug } from "@/types/calculator";

const SLUG_BY_WORLD_PATH = new Map(
  calculators.map((calculator) => [getCalculatorPath(calculator.slug), calculator.slug]),
);

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
  "/nz": {
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

/** Rewrite worldwide calculator hrefs to the active country hub where a geo route exists. */
export function resolveSiteHref(href: string, pathname?: string | null): string {
  const slug = SLUG_BY_WORLD_PATH.get(href);
  if (slug) {
    return resolveCalculatorPath(slug, pathname);
  }

  const prefix = getCountryPrefixFromPath(pathname);
  if (!prefix) return href;

  const hub = countryHubs.find((item) => item.path === prefix);
  if (!hub) return href;

  if (href === hub.gradingScalePath || href.startsWith(`${hub.gradingScalePath}/`)) {
    return href;
  }

  return href;
}

export function slugFromWorldPath(path: string): CalculatorSlug | null {
  const slug = SLUG_BY_WORLD_PATH.get(path);
  return slug && isCalculatorSlug(slug) ? slug : null;
}
