import { notFound } from "next/navigation";
import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { getCalculatorElement } from "@/components/calculators/calculator-map";
import { calculatorBySlug } from "@/config/calculators";
import { countryHubs } from "@/config/country-hubs";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { calculatorHreflangLanguages } from "@/lib/seo/hreflang";
import { createPageMetadata } from "@/lib/seo/metadata";
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
  return hub.featuredCalculators.filter((slug) => !skip.has(slug)).map((slug) => ({ slug }));
}

export function createGeoCalculatorMetadata(code: string, slug: string) {
  const hub = getHubByCode(code);
  if (!hub || !isCalculatorSlug(slug)) return {};
  const config = calculatorBySlug[slug];
  if (!config || !hub.featuredCalculators.includes(slug)) return {};

  const path = `${hub.path}/${slug}`;
  return createPageMetadata({
    title: `${config.name} — ${hub.name}`,
    description: `${config.description} Locked to the ${hub.name} grading scale on this page.`,
    path,
    keywords: [...calculatorKeywords[slug], ...hub.keywords],
    languages: calculatorHreflangLanguages(slug),
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
