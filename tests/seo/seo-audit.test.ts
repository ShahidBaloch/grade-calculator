import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { calculators } from "@/config/calculators";
import { indexableGeoCalculatorPaths, seoRedirects } from "@/lib/seo/intent-urls";
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
import { calculatorResourceLinks } from "@/config/calculator-links";
import { footerNav, mainNav } from "@/config/navigation";
import { calculatorHreflangLanguages, countryHubHreflangLanguages } from "@/lib/seo/hreflang";
import { siteConfig } from "@/config/site";
import { siteFaqs } from "@/config/site-faq";
import { assertSameOrigin, canonicalUrlForPath, isRedirectOnlyPath } from "@/lib/seo/canonical";
import { createPageMetadata } from "@/lib/seo/metadata";
import { isLowValueProgrammaticPath } from "@/lib/seo/programmatic-pages";

describe("SEO audit", () => {
  it("sitemap includes all calculator routes", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls.some((url) => url === siteConfig.url || url === `${siteConfig.url}/`)).toBe(true);
    expect(urls).not.toContain(`${siteConfig.url}/ez-grader`);
    for (const calculator of calculators) {
      if (calculator.slug === "ez-grader") continue;
      const path = getCalculatorPath(calculator.slug);
      expect(urls.some((url) => new URL(url).pathname === path)).toBe(true);
    }
  });

  it("EZ Grader public path is the homepage", () => {
    expect(getCalculatorPath("ez-grader")).toBe("/");
  });

  it("each calculator hreflang points only at its own canonical URL", () => {
    const languages = calculatorHreflangLanguages("gpa-calculator");
    expect(languages["x-default"]).toBe(`${siteConfig.url}/gpa-calculator`);
    expect(languages.en).toBe(`${siteConfig.url}/gpa-calculator`);
    expect(languages["en-US"]).toBeUndefined();
    expect(languages["en-AU"]).toBeUndefined();
    expect(calculatorHreflangLanguages("atar-calculator")["x-default"]).toBe(
      `${siteConfig.url}/au/atar-calculator`,
    );
    expect(calculatorHreflangLanguages("degree-classification-calculator")["x-default"]).toBe(
      `${siteConfig.url}/uk/degree-classification-calculator`,
    );
  });

  it("country hubs do not claim to be alternates of the homepage or each other", () => {
    const languages = countryHubHreflangLanguages("/uk");
    expect(languages["x-default"]).toBe(`${siteConfig.url}/uk`);
    expect(languages.en).toBe(`${siteConfig.url}/uk`);
    expect(Object.values(languages).some((url) => url === siteConfig.url)).toBe(false);
  });

  it("emits Organization and WebSite JSON-LD", () => {
    expect(organizationJsonLd()["@type"]).toBe("Organization");
    expect(webSiteJsonLd()["@type"]).toBe("WebSite");
  });

  it("sitemap lists country-specific tools and omits duplicate copies", () => {
    const paths = sitemap().map((entry) => new URL(entry.url).pathname);
    for (const path of indexableGeoCalculatorPaths()) {
      expect(paths).toContain(path);
    }
    for (const redirect of seoRedirects()) {
      expect(paths, redirect.source).not.toContain(redirect.source);
    }
    expect(paths).not.toContain("/us/gpa-calculator");
    expect(paths).not.toContain("/atar-calculator");
    expect(paths).toContain("/au/atar-calculator");
    expect(paths).toContain("/au/gpa-calculator");
    expect(paths).toContain("/ca/gpa-calculator");
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

  it("footer lists every guide, scale page, and country hub", () => {
    const guideHrefs = new Set(footerNav.guides.map((item) => item.href));
    const referenceHrefs = new Set(footerNav.reference.map((item) => item.href));
    for (const guide of guides) {
      expect(guideHrefs.has(guide.path), `footer missing guide ${guide.slug}`).toBe(true);
    }
    for (const page of gradingScalePages) {
      expect(referenceHrefs.has(page.path), `footer missing scale ${page.slug}`).toBe(true);
    }
    for (const hub of countryHubs) {
      expect(footerNav.countries.some((l) => l.href === hub.path), `footer missing hub ${hub.code}`).toBe(
        true,
      );
    }
  });

  it("every calculator resource link points at a real guide or scale page", () => {
    const guidePaths = new Set(guides.map((guide) => guide.path));
    const scalePaths = new Set([...gradingScalePages.map((page) => page.path), "/grading-scales"]);
    for (const calculator of calculators) {
      const links = calculatorResourceLinks[calculator.slug];
      expect(links, `missing resource links for ${calculator.slug}`).toBeDefined();
      if (links.guide) {
        expect(guidePaths.has(links.guide.path), `unknown guide ${links.guide.path}`).toBe(true);
      }
      if (links.gradingScale) {
        expect(scalePaths.has(links.gradingScale.path), `unknown scale ${links.gradingScale.path}`).toBe(
          true,
        );
      }
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

  it("404 metadata is noindex and does not set a homepage canonical", () => {
    const source = readFileSync(resolve("src/app/not-found.tsx"), "utf8");
    expect(source).toContain("index: false");
    expect(source).toContain("follow: false");
    expect(source).not.toContain('canonical: "/"');
    const layout = readFileSync(resolve("src/app/layout.tsx"), "utf8");
    expect(layout).not.toContain('canonical: "/"');
  });

  it("legal and FAQ copy mention calculator state storage", () => {
    const privacy = readFileSync(resolve("src/app/privacy-policy/page.tsx"), "utf8");
    const cookies = readFileSync(resolve("src/app/cookie-policy/page.tsx"), "utf8");
    expect(privacy).toContain("gc-state-*");
    expect(privacy).toContain("gc-scale");
    expect(privacy).toMatch(/Cloudflare|CDN/i);
    expect(cookies).toContain("gc-state-*");
    expect(cookies).toContain("gc-scale");
    const faq = siteFaqs.find((item) => item.question.includes("private"));
    expect(faq?.answer).toMatch(/last inputs/i);
  });

  it("sitemap URLs are unique and omit redirect-only paths", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(new Set(urls).size).toBe(urls.length);
    expect(urls.some((url) => url.endsWith("/ez-grader"))).toBe(false);
    expect(urls.some((url) => url.endsWith("/us/ez-grader"))).toBe(false);
    expect(isRedirectOnlyPath("/ez-grader")).toBe(true);
  });

  it("createPageMetadata aligns canonical, openGraph.url, and hreflang origins", () => {
    const meta = createPageMetadata({
      title: "GPA Calculator",
      description: "Test",
      path: "/gpa-calculator",
      languages: calculatorHreflangLanguages("gpa-calculator"),
    });
    const canonical = meta.alternates?.canonical;
    expect(canonical).toBe(canonicalUrlForPath("/gpa-calculator"));
    expect(meta.openGraph?.url).toBe(canonical);
    for (const href of Object.values(meta.alternates?.languages ?? {})) {
      expect(assertSameOrigin(href)).toBe(true);
    }
  });

  it("EZ Grader hreflang does not emit geo duplicate URLs", () => {
    const languages = calculatorHreflangLanguages("ez-grader");
    expect(Object.keys(languages)).toEqual(["x-default", "en"]);
    expect(languages["x-default"]).toBe(siteConfig.url);
    expect(Object.values(languages).some((url) => url.includes("/us/"))).toBe(false);
  });

  it("a country calculator hreflang stays on that country URL", () => {
    const languages = countryHubHreflangLanguages("/au/gpa-calculator");
    expect(languages["x-default"]).toBe(`${siteConfig.url}/au/gpa-calculator`);
    expect(languages.en).toBe(`${siteConfig.url}/au/gpa-calculator`);
  });

  it("sitemap omits inaccurate lastModified stamps", () => {
    for (const entry of sitemap()) {
      expect(entry.lastModified).toBeUndefined();
    }
  });

  it("sitemap excludes low-value programmatic URL patterns", () => {
    const paths = sitemap().map((entry) => new URL(entry.url).pathname);
    for (const path of paths) {
      expect(isLowValueProgrammaticPath(path), `low-value path in sitemap: ${path}`).toBe(false);
    }
    expect(isLowValueProgrammaticPath("/3/4-as-a-percent")).toBe(true);
    expect(isLowValueProgrammaticPath("/80-out-of-20-as-a-percent")).toBe(true);
  });
});
