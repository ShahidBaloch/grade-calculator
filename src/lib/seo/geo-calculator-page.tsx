import { notFound } from "next/navigation";
import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { getCalculatorElement } from "@/components/calculators/calculator-map";
import { calculatorBySlug } from "@/config/calculators";
import { countryHubs } from "@/config/country-hubs";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { countryHubHreflangLanguages } from "@/lib/seo/hreflang";
import { createPageMetadata } from "@/lib/seo/metadata";
import { isCountrySpecificSlug } from "@/lib/seo/intent-urls";
import { DISTINCT_PAGE_COPY } from "@/lib/seo/page-copy";
import type { CalculatorSlug } from "@/types/calculator";
import { isCalculatorSlug } from "@/types/calculator";

/** Dedicated folders already exist; omit them from `[slug]` static params. */
const DEDICATED_GEO_PAGES: Partial<Record<string, CalculatorSlug[]>> = {
  uk: ["degree-classification-calculator"],
  au: ["atar-calculator"],
};

export function getHubByCode(code: string) {
  return countryHubs.find((hub) => hub.code === code);
}

export function generateGeoStaticParams(code: string) {
  const hub = getHubByCode(code);
  if (!hub) return [];
  const skip = new Set(DEDICATED_GEO_PAGES[code] ?? []);
  return hub.featuredCalculators
    .filter((slug) => !skip.has(slug))
    .filter((slug) => isCountrySpecificSlug(hub.path, slug))
    .map((slug) => ({ slug }));
}

export function createGeoCalculatorMetadata(code: string, slug: string) {
  const hub = getHubByCode(code);
  if (!hub || !isCalculatorSlug(slug)) return {};
  const config = calculatorBySlug[slug];
  if (!config || !hub.featuredCalculators.includes(slug)) return {};

  const path = `${hub.path}/${slug}`;
  const distinct = DISTINCT_PAGE_COPY[path];
  return createPageMetadata({
    title: distinct?.title ?? `${config.name} — ${hub.name}`,
    description: distinct?.description ?? config.description,
    path,
    keywords: [...calculatorKeywords[slug], ...hub.keywords],
    languages: countryHubHreflangLanguages(path),
  });
}

export function GeoCalculatorPage({ country, slug }: { country: string; slug: string }) {
  const hub = getHubByCode(country);
  if (!hub || !isCalculatorSlug(slug) || !hub.featuredCalculators.includes(slug)) {
    notFound();
  }

  return (
    <CalculatorRoute
      slug={slug}
      path={`${hub.path}/${slug}`}
      calculator={getCalculatorElement(slug)}
    />
  );
}
