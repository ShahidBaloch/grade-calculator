import { getCalculatorPath } from "@/config/calculators";
import { absoluteUrl } from "@/config/site";
import type { CalculatorSlug } from "@/types/calculator";

/**
 * Hreflang is only for the same page in another language or region.
 * Country GPA pages are different grading systems, so each URL stands alone.
 * Cross-linking them as alternates makes Google swap the wrong country into results.
 */
export function calculatorHreflangLanguages(slug: CalculatorSlug): Record<string, string> {
  const url = absoluteUrl(getCalculatorPath(slug));
  return { "x-default": url, en: url };
}

export function countryHubHreflangLanguages(path: string): Record<string, string> {
  const url = absoluteUrl(path);
  return { "x-default": url, en: url };
}
