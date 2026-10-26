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
  "cgpa-to-gpa": "en-IN",
};

/** Country pages that are regional versions of this tool (excludes the worldwide URL). */
export function calculatorRegionalVersions(slug: CalculatorSlug) {
  const rootPath = getCalculatorPath(slug);
  return countryHubs
    .filter((hub) => hub.featuredCalculators.includes(slug) && isCountrySpecificSlug(hub.path, slug))
    .map((hub) => ({ hub, hreflang: hub.hreflang, path: `${hub.path}/${slug}` }))
    .filter(({ path }) => path !== rootPath);
}

export function calculatorHreflangLanguages(slug: CalculatorSlug): Record<string, string> {
  const rootUrl = absoluteUrl(getCalculatorPath(slug));
  const regional = calculatorRegionalVersions(slug);

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

/**
 * USA is the main market. x-default and generic `en` point at the US hub.
 * Each hub keeps its own canonical URL, and its regional tag points at itself,
 * so a UK or Pakistan query can still land on that hub.
 * Unknown paths stay self-referencing so a typo cannot join the group.
 */
export function countryHubHreflangLanguages(hubPath: string): Record<string, string> {
  const current = countryHubs.find((hub) => hub.path === hubPath);
  if (!current) {
    const url = absoluteUrl(hubPath);
    return { "x-default": url, en: url };
  }

  const primary = countryHubs.find((hub) => hub.hreflang === "en-US") ?? countryHubs[0];
  const primaryUrl = absoluteUrl(primary.path);
  return {
    "x-default": primaryUrl,
    en: primaryUrl,
    ...Object.fromEntries(countryHubs.map((hub) => [hub.hreflang, absoluteUrl(hub.path)])),
  };
}
