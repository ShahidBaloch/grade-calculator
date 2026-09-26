import { calculators, getCalculatorPath } from "@/config/calculators";
import { countryHubs } from "@/config/country-hubs";
import type { CalculatorSlug } from "@/types/calculator";
import { isCalculatorSlug } from "@/types/calculator";
import { canonicalPathForSlug } from "@/lib/seo/intent-urls";

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

/**
 * One public URL per tool. Country context only changes the URL when that
 * country has its own grading system (see canonicalPathForSlug).
 */
export function resolveCalculatorPath(
  slug: CalculatorSlug,
  pathname?: string | null,
): string {
  return canonicalPathForSlug(slug, getCountryPrefixFromPath(pathname));
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
