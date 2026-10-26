import { getCalculatorPath } from "@/config/calculator-paths";
import { countryHubRoutes } from "@/config/country-hub-routes";
import type { CalculatorSlug } from "@/types/calculator";
import { CALCULATOR_SLUGS, isCalculatorSlug } from "@/types/calculator";
import { canonicalPathForSlug } from "@/lib/seo/canonical-path";
import { getPreferredCountryHub, setPreferredCountryHub } from "@/lib/utils/preferred-country-hub";
import { mainCountryPath } from "@/config/country-hub-routes";

const SLUG_BY_WORLD_PATH = new Map(CALCULATOR_SLUGS.map((slug) => [getCalculatorPath(slug), slug]));

/** e.g. `/au/gpa-calculator` → `/au` */
export function getCountryPrefixFromPath(pathname: string | null | undefined): string | null {
  if (!pathname) return null;
  for (const hub of countryHubRoutes) {
    if (pathname === hub.path || pathname.startsWith(`${hub.path}/`)) {
      return hub.path;
    }
  }
  return null;
}

/**
 * Hub for the current route. A grading-scale page counts (`/grading-scales/uk` → `/uk`)
 * so country menus link into that hub. Saved calculator state stays on the URL prefix only.
 */
export function activeCountryHub(pathname: string | null | undefined): string | null {
  const prefix = getCountryPrefixFromPath(pathname);
  if (prefix || !pathname) return prefix;
  const hub = countryHubRoutes.find(
    (route) => pathname === route.gradingScalePath || pathname.startsWith(`${route.gradingScalePath}/`),
  );
  return hub?.path ?? null;
}

/** URL hub first, then session choice — used for calculator menu links. */
export function navigationCountryHub(pathname: string | null | undefined): string | null {
  return activeCountryHub(pathname) ?? getPreferredCountryHub();
}

/** Persist non-US hub visits for the session (client only). */
export function syncPreferredCountryHubFromPath(pathname: string | null | undefined): void {
  if (!pathname) return;
  const hub = activeCountryHub(pathname);
  if (hub === mainCountryPath) {
    setPreferredCountryHub(null);
    return;
  }
  if (hub) {
    setPreferredCountryHub(hub);
  }
}

/**
 * One public URL per tool. Country context only changes the URL when that
 * country has its own grading system (see canonicalPathForSlug).
 */
export function resolveCalculatorPath(
  slug: CalculatorSlug,
  pathname?: string | null,
): string {
  return canonicalPathForSlug(slug, navigationCountryHub(pathname));
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

  const hub = countryHubRoutes.find((item) => item.path === prefix);
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
