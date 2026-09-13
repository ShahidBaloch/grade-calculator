import type { MetadataRoute } from "next";
import { calculators } from "@/config/calculators";
import { countryCalculatorPaths, countryHubs } from "@/config/country-hubs";
import { gradingScalePages } from "@/config/grading-scale-pages";
import { guides } from "@/config/guides";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/calculators", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/guides", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/grading-scales", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/faq", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/contact", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms-of-service", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/cookie-policy", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  const calculatorPages = [
    ...calculators
      .filter((c) => c.slug !== "ez-grader")
      .map((c) => ({
        path: c.path,
        priority: 0.9,
        changeFrequency: "monthly" as const,
      })),
    ...countryCalculatorPaths.map((path) => ({
      path,
      priority: 0.8,
      changeFrequency: "monthly" as const,
    })),
  ];

  const guidePages = guides.map((g) => ({
    path: g.path,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  const scalePages = gradingScalePages.map((p) => ({
    path: p.path,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  }));

  const hubPages = countryHubs.map((hub) => ({
    path: hub.path,
    priority: 0.85,
    changeFrequency: "monthly" as const,
  }));

  const all = [...staticPages, ...calculatorPages, ...guidePages, ...scalePages, ...hubPages];

  return all.map(({ path, priority, changeFrequency }) => ({
    url: `${siteConfig.url}${path === "/" ? "" : path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
