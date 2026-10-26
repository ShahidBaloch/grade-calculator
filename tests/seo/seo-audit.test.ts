import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { CalculatorSlug } from "@/types/calculator";
import { describe, expect, it } from "vitest";
import { calculatorBySlug, calculators } from "@/config/calculators";
import { indexableGeoCalculatorPaths, seoRedirects } from "@/lib/seo/intent-urls";
import { calculatorContent } from "@/config/calculator-content";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { countryHubs } from "@/config/country-hubs";
import { gradingScalePages } from "@/config/grading-scale-pages";
import { guides } from "@/config/guides";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqPageJsonLd,
  howToJsonLd,
  organizationJsonLd,
  webApplicationJsonLd,
  webSiteJsonLd,
} from "@/lib/seo/jsonld";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { getCalculatorPath } from "@/config/calculators";
import { calculatorResourceLinks, intentMismatchLink } from "@/config/calculator-links";
import { footerNav, mainNav } from "@/config/navigation";
import { calculatorHreflangLanguages, countryHubHreflangLanguages } from "@/lib/seo/hreflang";
import { pageUpdated } from "@/config/page-updated";
import { siteConfig } from "@/config/site";
import { siteFaqs } from "@/config/site-faq";
import { assertSameOrigin, canonicalUrlForPath, isRedirectOnlyPath } from "@/lib/seo/canonical";
import { createPageMetadata } from "@/lib/seo/metadata";
import { DISTINCT_PAGE_COPY } from "@/lib/seo/page-copy";
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

  it("calculators with country versions share one reciprocal hreflang group", () => {
    const languages = calculatorHreflangLanguages("gpa-calculator");
    expect(languages["x-default"]).toBe(`${siteConfig.url}/gpa-calculator`);
    expect(languages.en).toBe(`${siteConfig.url}/gpa-calculator`);
    expect(languages["en-US"]).toBe(`${siteConfig.url}/gpa-calculator`);
    expect(languages["en-CA"]).toBe(`${siteConfig.url}/ca/gpa-calculator`);
    expect(languages["en-AU"]).toBe(`${siteConfig.url}/au/gpa-calculator`);
    // Every alternate must be an indexable page in the sitemap.
    const sitemapUrls = new Set(sitemap().map((entry) => entry.url));
    for (const url of Object.values(languages)) expect(sitemapUrls.has(url)).toBe(true);
    // Tools without country versions stay self-referencing.
    expect(Object.keys(calculatorHreflangLanguages("grade-chart"))).toEqual(["x-default", "en"]);
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
    const org = organizationJsonLd();
    expect(org["@type"]).toBe("Organization");
    expect(org.contactPoint?.[0]?.email).toBe(siteConfig.email);
    expect(org.contactPoint?.[0]?.url).toBe(`${siteConfig.url}/contact`);
    expect(webSiteJsonLd()["@type"]).toBe("WebSite");
    expect(webSiteJsonLd().inLanguage).toBe("en-US");
    expect(webSiteJsonLd().name).toBe("GradCalc");
    expect(webSiteJsonLd().alternateName).toContain("gradcalc.com");
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

  it("includes the GPA glossary guide", () => {
    expect(guides.some((guide) => guide.path === "/guides/gpa-glossary")).toBe(true);
  });

  it("sitemap includes country hubs and guides", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls.some((url) => url.endsWith("/methodology"))).toBe(true);
    expect(urls.some((url) => url.endsWith("/disclaimer"))).toBe(true);
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

    const article = articleJsonLd({
      headline: "Guide title",
      description: "Desc",
      path: "/guides/example",
      dateModified: "2026-09-01",
    });
    expect(article["@type"]).toBe("Article");
    expect(article.author.name).toBeTruthy();
  });

  it("nav lists every calculator; footer is a curated US-first subset that links the hubs", () => {
    const navHrefs = new Set(mainNav.flatMap((item) => item.children?.map((child) => child.href) ?? [item.href]));
    const calculatorHrefs = new Set(calculators.map((calculator) => getCalculatorPath(calculator.slug)));
    for (const href of calculatorHrefs) {
      expect(navHrefs.has(href), `nav missing ${href}`).toBe(true);
    }
    const footerCalculatorHrefs = footerNav.calculators.map((item) => item.href);
    for (const href of footerCalculatorHrefs) {
      expect(calculatorHrefs.has(href) || href === "/calculators", `footer links unknown calculator ${href}`).toBe(true);
    }
    expect(footerCalculatorHrefs).toContain("/");
    expect(footerCalculatorHrefs).toContain("/calculators");
    expect(footerCalculatorHrefs).toContain("/eoc-grade-calculator");
    // Keep the footer small: it is the only sitewide link block in the server HTML.
    const total =
      footerNav.calculators.length + footerNav.guides.length + footerNav.reference.length +
      footerNav.countries.length + footerNav.company.length;
    expect(total).toBeLessThanOrEqual(55);
  });

  it("footer links resolve to real guides, scale pages, and every country hub", () => {
    const guidePaths = new Set(guides.map((guide) => guide.path));
    for (const link of footerNav.guides) {
      expect(guidePaths.has(link.href) || link.href === "/guides", `footer links unknown guide ${link.href}`).toBe(true);
    }
    expect(footerNav.guides.some((link) => link.href === "/guides")).toBe(true);
    const scalePaths = new Set([...gradingScalePages.map((page) => page.path), "/grading-scales", "/score"]);
    for (const link of footerNav.reference) {
      expect(scalePaths.has(link.href), `footer links unknown reference ${link.href}`).toBe(true);
    }
    expect(footerNav.reference.some((link) => link.href === "/grading-scales/us")).toBe(true);
    expect(footerNav.reference.some((link) => link.href === "/grading-scales")).toBe(true);
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

  it("resource link titles match guide and grading scale page titles", () => {
    const guideTitleByPath = new Map(guides.map((guide) => [guide.path, guide.title]));
    const scaleTitleByPath = new Map<string, string>([
      ...gradingScalePages.map((page): [string, string] => [page.path, page.title]),
      ["/grading-scales", "Grading Scales by Country"],
    ]);
    for (const calculator of calculators) {
      const links = calculatorResourceLinks[calculator.slug];
      if (links.guide) {
        expect(links.guide.title).toBe(guideTitleByPath.get(links.guide.path));
      }
      if (links.gradingScale) {
        expect(links.gradingScale.title).toBe(scaleTitleByPath.get(links.gradingScale.path));
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
      expect(typeof href).toBe("string");
      expect(assertSameOrigin(href as string)).toBe(true);
    }
  });

  it("EZ Grader hreflang does not emit geo duplicate URLs", () => {
    const languages = calculatorHreflangLanguages("ez-grader");
    expect(Object.keys(languages)).toEqual(["x-default", "en"]);
    expect(languages["x-default"]).toBe(siteConfig.url);
    expect(Object.values(languages).some((url) => url.includes("/us/"))).toBe(false);
  });

  it("country calculator pages join their tool's hreflang group", () => {
    expect(calculatorHreflangLanguages("cumulative-gpa-calculator")["en-CA"]).toBe(
      `${siteConfig.url}/ca/cumulative-gpa-calculator`,
    );
    expect(calculatorHreflangLanguages("sgpa-to-cgpa")["en-PK"]).toBe(`${siteConfig.url}/pk/sgpa-to-cgpa`);
    expect(calculatorHreflangLanguages("sgpa-to-cgpa")["en-IN"]).toBe(`${siteConfig.url}/sgpa-to-cgpa`);
    expect(calculatorHreflangLanguages("sgpa-to-cgpa")["en-US"]).toBeUndefined();
  });

  it("sitemap lastModified stamps are real dates, not in the future", () => {
    for (const entry of sitemap()) {
      if (entry.lastModified === undefined) continue;
      const time = new Date(entry.lastModified).getTime();
      expect(Number.isNaN(time)).toBe(false);
      expect(time).toBeLessThanOrEqual(Date.now());
    }
  });

  it("every sitemap URL has its own lastmod entry, and pages don't all share one date", () => {
    const paths = sitemap().map((entry) => new URL(entry.url).pathname);
    for (const path of paths) {
      expect(pageUpdated[path], `add ${path} to src/config/page-updated.ts`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
    const stale = Object.keys(pageUpdated).filter((path) => !paths.includes(path));
    expect(stale, "pageUpdated lists URLs that are not in the sitemap").toEqual([]);
    expect(new Set(paths.map((path) => pageUpdated[path])).size).toBeGreaterThan(1);
  });

  it("robots.txt allows Google, Bing, and Yandex with no crawl delay; blocks SEO scrapers", () => {
    const config = robots();
    expect(config.sitemap).toBe(`${siteConfig.url}/sitemap.xml`);
    expect(config.host).toBe(new URL(siteConfig.url).host);

    const rules = Array.isArray(config.rules) ? config.rules : [config.rules];
    const agentsOnly = (rule: (typeof rules)[number]) =>
      Array.isArray(rule.userAgent) ? rule.userAgent : [rule.userAgent];

    const googleRule = rules.find((rule) => {
      const agents = agentsOnly(rule);
      return agents.includes("Googlebot") && !agents.includes("Bingbot");
    });
    expect(googleRule?.allow).toContain("/");
    // Junk URL patterns must stay crawlable so Google sees the 404 + noindex.
    expect(googleRule?.disallow).not.toContain("/*as-a-percent*");
    expect(googleRule?.disallow).not.toContain("/*out-of-*");
    expect(googleRule?.crawlDelay).toBeUndefined();

    const bingRule = rules.find((rule) => {
      const agents = agentsOnly(rule);
      return agents.includes("Bingbot") && agents.length <= 4;
    });
    expect(bingRule?.allow).toContain("/");
    expect(bingRule?.crawlDelay).toBeUndefined();

    const yandexRule = rules.find((rule) => agentsOnly(rule).includes("YandexBot"));
    expect(yandexRule?.allow).toContain("/");
    expect(yandexRule?.crawlDelay).toBeUndefined();

    const blockedRule = rules.find((rule) => {
      const agents = agentsOnly(rule);
      return agents.includes("AhrefsBot") && agents.includes("SemrushBot");
    });
    expect(blockedRule?.disallow).toContain("/");
    expect(blockedRule?.allow).toBeUndefined();

    const adsRule = rules.find((rule) => {
      const agents = agentsOnly(rule);
      return agents.includes("AdsBot-Google") && agents.includes("Mediapartners-Google");
    });
    expect(adsRule?.allow).toContain("/");

    const wildcardRule = rules.find((rule) => agentsOnly(rule).includes("*"));
    expect(wildcardRule?.crawlDelay).toBeUndefined();
    expect(wildcardRule?.allow).toContain("/");
  });

  it("sitemap excludes low-value programmatic URL patterns", () => {
    const paths = sitemap().map((entry) => new URL(entry.url).pathname);
    for (const path of paths) {
      expect(isLowValueProgrammaticPath(path), `low-value path in sitemap: ${path}`).toBe(false);
    }
    expect(isLowValueProgrammaticPath("/3/4-as-a-percent")).toBe(true);
    expect(isLowValueProgrammaticPath("/80-out-of-20-as-a-percent")).toBe(true);
  });

  it("does not ship a crawler-visible loading fallback", () => {
    expect(existsSync(resolve("src/app/loading.tsx"))).toBe(false);
    expect(existsSync(resolve("src/app/(calculators)/layout.tsx"))).toBe(false);
    const appSource = readFileSync(resolve("src/app/layout.tsx"), "utf8");
    expect(appSource).not.toMatch(/Loading calculator/i);
    expect(appSource).not.toMatch(/sr-only">Loading/);
  });

  it("keeps US A–F letter tools and India/Pakistan CGPA tools in separate related lists", () => {
    const letter = new Set<CalculatorSlug>(["letter-grade-calculator", "percentage-to-letter-grade"]);
    const cgpa = new Set<CalculatorSlug>([
      "cgpa-calculator",
      "cgpa-to-percentage",
      "percentage-to-cgpa",
      "sgpa-to-cgpa",
      "cgpa-to-gpa",
    ]);
    for (const slug of letter) {
      for (const related of calculatorBySlug[slug].relatedSlugs) {
        expect(cgpa.has(related), `${slug} related ${related}`).toBe(false);
      }
      expect(intentMismatchLink(slug)?.path).toMatch(/cgpa/);
    }
    for (const slug of cgpa) {
      for (const related of calculatorBySlug[slug].relatedSlugs) {
        expect(letter.has(related), `${slug} related ${related}`).toBe(false);
        expect(related === "gpa-calculator" || related === "cumulative-gpa-calculator", related).toBe(false);
      }
      expect(intentMismatchLink(slug)?.path.startsWith("/")).toBe(true);
    }
    expect(intentMismatchLink("gpa-calculator", "/in/gpa-calculator")?.path).toBe("/letter-grade-calculator");
    expect(intentMismatchLink("gpa-calculator", "/au/gpa-calculator")).toBeUndefined();
    expect(DISTINCT_PAGE_COPY["/percentage-to-letter-grade"].title).toMatch(/US|A–F/);
    expect(DISTINCT_PAGE_COPY["/percentage-to-letter-grade"].description).not.toMatch(/other grading scales/i);
    expect(DISTINCT_PAGE_COPY["/percentage-to-cgpa"].title).toMatch(/India|Pakistan/);
    expect(DISTINCT_PAGE_COPY["/letter-grade-calculator"].description).toMatch(/India|Pakistan|HEC/);
    expect(DISTINCT_PAGE_COPY["/cgpa-calculator"].description).toMatch(/India|HEC|Pakistan/);
  });

  it("weighted-grade copy is consistent about 100% weights", () => {
    const content = calculatorContent["weighted-grade-calculator"];
    const blobs = [
      content.formula,
      ...content.howItWorks,
      ...content.faqs.map((faq) => `${faq.question} ${faq.answer}`),
    ].join("\n");
    expect(blobs).not.toMatch(/does(?:n't| not) have to total 100%/i);
    expect(blobs).not.toMatch(/should total 100%/i);
    expect(blobs).not.toMatch(/100% total not required/i);
    expect(blobs).toMatch(/not by 100/);
    expect(blobs).toMatch(/syllabus requires it/);
    const guide = guides.find((item) => item.slug === "how-to-calculate-weighted-grades");
    const guideBody = guide?.sections.map((section) => section.body).join("\n") ?? "";
    expect(guideBody).not.toMatch(/Percent weights should add to 100/);
    expect(guideBody).toMatch(/Percent weights often add to 100/);
  });
});
