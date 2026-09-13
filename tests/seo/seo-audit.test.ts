import { describe, expect, it } from "vitest";
import { calculators } from "@/config/calculators";
import { countryCalculatorPaths } from "@/config/country-hubs";
import { calculatorContent } from "@/config/calculator-content";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { countryHubs } from "@/config/country-hubs";
import { gradingScalePages } from "@/config/grading-scale-pages";
import { guides } from "@/config/guides";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  howToJsonLd,
  webApplicationJsonLd,
} from "@/lib/seo/jsonld";
import sitemap from "@/app/sitemap";

describe("SEO audit", () => {
  it("sitemap includes all calculator routes", () => {
    const urls = sitemap().map((entry) => entry.url);
    for (const calculator of calculators) {
      expect(urls.some((url) => url.endsWith(calculator.path) || url.endsWith(`${calculator.path}/`))).toBe(
        true,
      );
    }
  });

  it("sitemap includes geo copies of worldwide tools", () => {
    const urls = sitemap().map((entry) => entry.url);
    for (const path of countryCalculatorPaths) {
      expect(urls.some((url) => url.endsWith(path))).toBe(true);
    }
  });

  it("does not use the competitor domain as the default site URL", async () => {
    const { siteConfig } = await import("@/config/site");
    expect(siteConfig.url).not.toContain("gradecalculator.com");
    expect(new URL(siteConfig.url).pathname).toBe("/");
  });

  it("includes the GCSE 9-1 guide", () => {
    expect(guides.some((guide) => guide.path === "/guides/gcse-9-1-grades")).toBe(true);
  });

  it("sitemap includes country hubs and guides", () => {
    const urls = sitemap().map((entry) => entry.url);
    for (const hub of countryHubs) {
      expect(urls.some((url) => url.endsWith(hub.path))).toBe(true);
    }
    for (const guide of guides) {
      expect(urls.some((url) => url.endsWith(guide.path))).toBe(true);
    }
  });

  it("every calculator has content, keywords, and FAQs", () => {
    for (const calculator of calculators) {
      const content = calculatorContent[calculator.slug];
      const keywords = calculatorKeywords[calculator.slug];
      expect(content.howItWorks.length).toBeGreaterThanOrEqual(3);
      expect(content.formula.length).toBeGreaterThan(0);
      expect(content.faqs.length).toBeGreaterThanOrEqual(1);
      expect(keywords.length).toBeGreaterThanOrEqual(1);
      expect(calculator.description.length).toBeGreaterThan(10);
    }
  });

  it("grading scale pages have required metadata", () => {
    for (const page of gradingScalePages) {
      expect(page.title.length).toBeGreaterThan(5);
      expect(page.keywords.length).toBeGreaterThan(0);
      expect(page.intro.length).toBeGreaterThan(20);
    }
  });

  it("JSON-LD generators produce schema.org types", () => {
    const webApp = webApplicationJsonLd({
      name: "Test",
      description: "Desc",
      path: "/test",
    });
    expect(webApp["@type"]).toBe("WebApplication");

    const breadcrumb = breadcrumbJsonLd([{ name: "Home", href: "/" }]);
    expect(breadcrumb["@type"]).toBe("BreadcrumbList");

    const faq = faqPageJsonLd([{ question: "Q?", answer: "A." }]);
    expect(faq["@type"]).toBe("FAQPage");

    const howTo = howToJsonLd({
      name: "How",
      description: "Desc",
      steps: ["Step 1", "Step 2"],
    });
    expect(howTo["@type"]).toBe("HowTo");
    expect(howTo.step).toHaveLength(2);
  });

  it("sitemap priorities follow roadmap tiers", () => {
    const entries = sitemap();
    const home = entries.find((e) => e.priority === 1);
    expect(home).toBeDefined();
    const calc = entries.find((e) => e.url.includes("/gpa-calculator"));
    expect(calc?.priority).toBeGreaterThanOrEqual(0.9);
  });
});
