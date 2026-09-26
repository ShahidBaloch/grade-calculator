import { getCalculatorPath } from "@/config/calculators";
import { absoluteUrl, siteConfig } from "@/config/site";
import { seoRedirects } from "@/lib/seo/intent-urls";
import type { CalculatorSlug } from "@/types/calculator";

const REDIRECT_SOURCES = new Set(seoRedirects().map((redirect) => redirect.source));

export function canonicalUrlForPath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return absoluteUrl(normalized === "/" ? "/" : normalized.replace(/\/$/, ""));
}

export function isRedirectOnlyPath(pathname: string): boolean {
  const path = pathname.split("?")[0]?.replace(/\/$/, "") || "/";
  return REDIRECT_SOURCES.has(path);
}

/** Geo calculator URLs that should not exist (canonical lives elsewhere). */
export function isDisallowedGeoCalculatorPath(pathname: string): boolean {
  return isRedirectOnlyPath(pathname);
}

export function worldwideCalculatorCanonical(slug: CalculatorSlug): string {
  return canonicalUrlForPath(getCalculatorPath(slug));
}

export function assertSameOrigin(url: string): boolean {
  try {
    return new URL(url).origin === new URL(siteConfig.url).origin;
  } catch {
    return false;
  }
}
