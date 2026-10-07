import type { MetadataRoute } from "next";
import { calculators, getCalculatorPath } from "@/config/calculators";
import { countryHubs } from "@/config/country-hubs";
import { gradingScalePages } from "@/config/grading-scale-pages";
import { guides } from "@/config/guides";
import { isRedirectOnlyPath } from "@/lib/seo/canonical";
import { indexableGeoCalculatorPaths } from "@/lib/seo/intent-urls";
import { siteConfig } from "@/config/site";

// Last content update — bump this date whenever calculator content, guides, or scales are edited.
const CONTENT_UPDATED = "2026-10-07";
// Trust pages rarely change; set once at creation.
const TRUST_PAGE_DATE = "2025-09-01";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const, lastModified: CONTENT_UPDATED },
    { path: "/calculators", priority: 0.9, changeFrequency: "weekly" as const, lastModified: CONTENT_UPDATED },
    { path: "/guides", priority: 0.7, changeFrequency: "monthly" as const, lastModified: CONTENT_UPDATED },
    { path: "/grading-scales", priority: 0.8, changeFrequency: "monthly" as const, lastModified: CONTENT_UPDATED },
    { path: "/faq", priority: 0.7, changeFrequency: "monthly" as const, lastModified: CONTENT_UPDATED },
    { path: "/about", priority: 0.4, changeFrequency: "yearly" as const, lastModified: CONTENT_UPDATED },
    { path: "/methodology", priority: 0.4, changeFrequency: "yearly" as const, lastModified: TRUST_PAGE_DATE },
    { path: "/contact", priority: 0.3, changeFrequency: "yearly" as const, lastModified: TRUST_PAGE_DATE },
    { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" as const, lastModified: TRUST_PAGE_DATE },
    { path: "/terms-of-service", priority: 0.3, changeFrequency: "yearly" as const, lastModified: TRUST_PAGE_DATE },
    { path: "/disclaimer", priority: 0.4, changeFrequency: "yearly" as const, lastModified: CONTENT_UPDATED },
    { path: "/cookie-policy", priority: 0.3, changeFrequency: "yearly" as const, lastModified: TRUST_PAGE_DATE },
  ];

  const calculatorPages = [
    ...calculators
      .filter((c) => c.slug !== "ez-grader")
      .map((c) => ({
        path: getCalculatorPath(c.slug),
        priority: 0.9,
        changeFrequency: "monthly" as const,
        lastModified: CONTENT_UPDATED,
      })),
    ...indexableGeoCalculatorPaths().map((path) => ({
      path,
      priority: 0.8,
      changeFrequency: "monthly" as const,
      lastModified: CONTENT_UPDATED,
    })),
  ];

  const guidePages = guides.map((g) => ({
    path: g.path,
    priority: 0.7,
    changeFrequency: "monthly" as const,
    lastModified: CONTENT_UPDATED,
  }));

  const scalePages = gradingScalePages.map((p) => ({
    path: p.path,
    priority: 0.8,
    changeFrequency: "monthly" as const,
    lastModified: CONTENT_UPDATED,
  }));

  const hubPages = countryHubs.map((hub) => ({
    path: hub.path,
    priority: 0.85,
    changeFrequency: "monthly" as const,
    lastModified: CONTENT_UPDATED,
  }));

  const all = [...staticPages, ...calculatorPages, ...guidePages, ...scalePages, ...hubPages];

  const ogImageUrl = `${siteConfig.url}/opengraph-image`;

  const seen = new Set<string>();
  const entries: MetadataRoute.Sitemap = [];

  for (const { path, priority, changeFrequency, lastModified } of all) {
    const pathname = path === "/" ? "/" : path;
    if (isRedirectOnlyPath(pathname)) {
      continue;
    }
    const url = `${siteConfig.url}${path === "/" ? "" : path}`;
    if (seen.has(url)) continue;
    seen.add(url);
    entries.push({
      url,
      lastModified,
      changeFrequency,
      priority,
      images: [ogImageUrl],
    });
  }

  return entries;
}
