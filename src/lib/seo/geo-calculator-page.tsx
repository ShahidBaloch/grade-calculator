import { notFound } from "next/navigation";
import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { getCalculatorElement } from "@/components/calculators/calculator-map";
import { calculatorBySlug } from "@/config/calculators";
import { countryHubs } from "@/config/country-hubs";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { calculatorHreflangLanguages } from "@/lib/seo/hreflang";
import { createPageMetadata } from "@/lib/seo/metadata";
import { canonicalPathForSlug } from "@/lib/seo/intent-urls";
import { DISTINCT_PAGE_COPY } from "@/lib/seo/page-copy";
import { GeoLinkList } from "@/components/content/GeoProgrammaticPage";
import { caUniversityLinkGroup } from "@/lib/seo/geo-programmatic";
import type { CalculatorSlug } from "@/types/calculator";
import { CALCULATOR_SLUGS, isCalculatorSlug } from "@/types/calculator";

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
  return CALCULATOR_SLUGS.filter((slug) => !skip.has(slug))
    .filter((slug) => canonicalPathForSlug(slug, hub.path) === `${hub.path}/${slug}`)
    .map((slug) => ({ slug }));
}

export function createGeoCalculatorMetadata(code: string, slug: string) {
  const hub = getHubByCode(code);
  if (!hub || !isCalculatorSlug(slug)) return {};
  const config = calculatorBySlug[slug];
  if (!config) return {};

  const path = canonicalPathForSlug(slug, hub.path);
  if (path !== `${hub.path}/${slug}`) return {};
  const distinct = DISTINCT_PAGE_COPY[path];
  return createPageMetadata({
    title: distinct?.title ?? `${config.name} — ${hub.name}`,
    description: distinct?.description ?? config.description,
    path,
    keywords: [...calculatorKeywords[slug], ...hub.keywords],
    languages: calculatorHreflangLanguages(slug),
  });
}

export function GeoCalculatorPage({ country, slug }: { country: string; slug: string }) {
  const hub = getHubByCode(country);
  if (!hub || !isCalculatorSlug(slug)) {
    notFound();
  }

  const path = canonicalPathForSlug(slug, hub.path);
  if (path !== `${hub.path}/${slug}`) {
    notFound();
  }

  return (
    <CalculatorRoute
      slug={slug}
      path={path}
      calculator={getCalculatorElement(slug)}
      below={
        country === "ca" && slug === "gpa-calculator" ? <GeoLinkList group={caUniversityLinkGroup()} /> : undefined
      }
    />
  );
}
