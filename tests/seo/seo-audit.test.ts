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
  organizationJsonLd,
  webApplicationJsonLd,
  webSiteJsonLd,
} from "@/lib/seo/jsonld";
import sitemap from "@/app/sitemap";
import { getCalculatorPath } from "@/config/calculators";
import { footerNav, mainNav } from "@/config/navigation";
import { calculatorHreflangLanguages, countryHubHreflangLanguages } from "@/lib/seo/hreflang";
import { siteConfig } from "@/config/site";

describe("SEO audit", () => {
  it("sitemap includes all calculator routes", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls.some((url) => url === siteConfig.url || url === `${siteConfig.url}/`)).toBe(true);
    expect(urls).not.toContain(`${siteConfig.url}/ez-grader`);
    for (const calculator of calculators) {
      if (calculator.slug === "ez-grader") continue;
      expect(urls.some((url) => url.endsWith(calculator.path) || url.endsWith(`${calculator.path}/`))).toBe(
        true,
      );
    }
  });

  it("EZ Grader public path is the homepage", () => {
    expect(getCalculatorPath("ez-grader")).toBe("/");
  });

  it("worldwide GPA hreflang lists geo copies", () => {
    const languages = calculatorHreflangLanguages("gpa-calculator");
    expect(languages["x-default"]).toBe(`${siteConfig.url}/gpa-calculator`);
    expect(languages["en-US"]).toBe(`${siteConfig.url}/us/gpa-calculator`);
    expect(languages["en-CA"]).toBe(`${siteConfig.url}/ca/gpa-calculator`);
    expect(languages["en-AU"]).toBe(`${siteConfig.url}/au/gpa-calculator`);
    expect(languages["en-NZ"]).toBe(`${siteConfig.url}/nz/gpa-calculator`);
    expect(languages["en-GB"]).toBeUndefined();
  });

  it("country hubs share a reciprocal hreflang cluster", () => {
    const languages = countryHubHreflangLanguages();
    expect(languages["x-default"]).toBe(siteConfig.url);
    expect(languages["en-GB"]).toBe(`${siteConfig.url}/uk`);
    expect(languages["en-US"]).toBe(`${siteConfig.url}/us`);
  });

  it("emits Organization and WebSite JSON-LD", () => {
    expect(organizationJsonLd()["@type"]).toBe("Organization");
    expect(webSiteJsonLd()["@type"]).toBe("WebSite");
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

  it("nav and footer list every calculator", () => {
    const navHrefs = new Set(mainNav.flatMap((item) => item.children?.map((child) => child.href) ?? [item.href]));
    const footerHrefs = new Set(footerNav.calculators.map((item) => item.href));
    for (const calculator of calculators) {
      const href = getCalculatorPath(calculator.slug);
      expect(navHrefs.has(href), `nav missing ${calculator.slug}`).toBe(true);
      expect(footerHrefs.has(href), `footer missing ${calculator.slug}`).toBe(true);
    }
  });

  it("every guide embed points at a real calculator", () => {
    const slugs = new Set(calculators.map((calculator) => calculator.slug));
    for (const guide of guides) {
      if (!guide.embeddedCalculator) continue;
      expect(slugs.has(guide.embeddedCalculator), `unknown embed ${guide.embeddedCalculator}`).toBe(
        true,
      );
    }
  });

  it("sitemap priorities follow roadmap tiers", () => {
    const entries = sitemap();
    const home = entries.find((e) => e.priority === 1);
    expect(home).toBeDefined();
    const calc = entries.find((e) => e.url.includes("/gpa-calculator"));
    expect(calc?.priority).toBeGreaterThanOrEqual(0.9);
  });
});
