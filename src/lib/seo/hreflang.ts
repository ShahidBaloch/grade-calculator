import { getCalculatorPath } from "@/config/calculators";
import { countryHubs } from "@/config/country-hubs";
import { absoluteUrl } from "@/config/site";
import { isCountrySpecificSlug } from "@/lib/seo/intent-urls";
import type { CalculatorSlug } from "@/types/calculator";

/**
 * Country GPA pages are regional versions of one tool (same job, local grading scale).
 * Every version lists the whole group — reciprocal hreflang — so Google shows /ca/… to Canada,
 * /au/… to Australia, and the worldwide URL (US scale) to the US and everyone else.
 * Without the group, each country page claimed x-default and competed for US queries.
 *
 * The group is derived from COUNTRY_SPECIFIC_SLUGS, so a new country page joins automatically.
 */
/** Region the worldwide URL is written for — US 4.0 by default; the CGPA tools default to India's 10-point scale. */
const ROOT_REGION: Partial<Record<CalculatorSlug, string>> = {
  "cgpa-to-percentage": "en-IN",
  "percentage-to-cgpa": "en-IN",
  "sgpa-to-cgpa": "en-IN",
  "cgpa-calculator": "en-IN",
};

export function calculatorHreflangLanguages(slug: CalculatorSlug): Record<string, string> {
  const rootPath = getCalculatorPath(slug);
  const rootUrl = absoluteUrl(rootPath);
  const regional = countryHubs
    .filter((hub) => hub.featuredCalculators.includes(slug) && isCountrySpecificSlug(hub.path, slug))
    .map((hub) => ({ hreflang: hub.hreflang, path: `${hub.path}/${slug}` }))
    .filter(({ path }) => path !== rootPath);

  if (regional.length === 0) {
    return { "x-default": rootUrl, en: rootUrl };
  }

  return {
    "x-default": rootUrl,
    en: rootUrl,
    [ROOT_REGION[slug] ?? "en-US"]: rootUrl,
    ...Object.fromEntries(regional.map(({ hreflang, path }) => [hreflang, absoluteUrl(path)])),
  };
}

/** Country hubs index different grading systems, so each hub stands alone. */
export function countryHubHreflangLanguages(hubPath: string): Record<string, string> {
  const url = absoluteUrl(hubPath);
  return { "x-default": url, en: url };
}
