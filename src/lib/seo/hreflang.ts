import { getCalculatorPath } from "@/config/calculators";
import { countryHubs } from "@/config/country-hubs";
import { absoluteUrl } from "@/config/site";
import type { CalculatorSlug } from "@/types/calculator";

export function calculatorHreflangLanguages(slug: CalculatorSlug): Record<string, string> {
  const worldwide = absoluteUrl(getCalculatorPath(slug));
  const languages: Record<string, string> = {
    "x-default": worldwide,
    en: worldwide,
  };

  for (const hub of countryHubs) {
    if (hub.featuredCalculators.includes(slug)) {
      languages[hub.hreflang] = absoluteUrl(`${hub.path}/${slug}`);
    }
  }

  return languages;
}

export function countryHubHreflangLanguages(): Record<string, string> {
  const languages: Record<string, string> = {
    "x-default": absoluteUrl("/"),
    en: absoluteUrl("/"),
  };

  for (const hub of countryHubs) {
    languages[hub.hreflang] = absoluteUrl(hub.path);
  }

  return languages;
}
