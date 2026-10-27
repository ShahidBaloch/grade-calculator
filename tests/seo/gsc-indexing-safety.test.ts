import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { scorePairs, scorePath } from "@/config/score-pages";
import { siteConfig } from "@/config/site";
import { isRedirectOnlyPath } from "@/lib/seo/canonical";
import { seoRedirects } from "@/lib/seo/intent-urls";
import { isBulkProgrammaticSitemapPath } from "@/lib/seo/sitemap-policy";
import { isLowValueProgrammaticPath } from "@/lib/seo/programmatic-pages";

/**
 * Guardrails so SEO refactors do not accidentally shrink URLs that earn Search Console clicks.
 * Sitemap trimming and canonical cleanup are allowed; de-indexing or 404ing live paths is not.
 */
describe("GSC indexing safety", () => {
  it("curated score pages stay crawlable when omitted from the sitemap", () => {
    const highDemand = scorePairs.find((p) => p.total === 150 && p.score === 118);
    expect(highDemand).toBeDefined();
    const path = scorePath(highDemand!);
    expect(isLowValueProgrammaticPath(path)).toBe(false);
    expect(isBulkProgrammaticSitemapPath(path)).toBe(true);
    const sitemapPaths = sitemap().map((entry) => new URL(entry.url).pathname);
    expect(sitemapPaths).not.toContain(path);
    expect(sitemapPaths).toContain("/score");
  });

  it("sitemap never lists redirect-only URLs (Google should land on the target)", () => {
    for (const entry of sitemap()) {
      const pathname = new URL(entry.url).pathname;
      expect(isRedirectOnlyPath(pathname), pathname).toBe(false);
    }
  });

  it("known URL consolidations keep a permanent redirect from the old path", () => {
    const redirects = new Map(seoRedirects().map((r) => [r.source, r.destination]));
    const migrations: Array<[string, string]> = [
      ["/grade-calculator", "/"],
      ["/gcse-grade-calculator", "/uk/gcse-grade-calculator"],
      ["/cgpa-to-gpa", "/in/cgpa-to-gpa"],
      ["/ez-grader", "/"],
    ];
    for (const [from, to] of migrations) {
      expect(redirects.get(from), `missing redirect ${from}`).toBe(to);
    }
    const sitemapUrls = new Set(sitemap().map((entry) => new URL(entry.url).pathname));
    for (const [, to] of migrations) {
      if (to === "/") {
        expect(sitemapUrls.has("/")).toBe(true);
        continue;
      }
      expect(sitemapUrls.has(to), `sitemap missing redirect target ${to}`).toBe(true);
    }
  });

  it("sitemap uses the same origin as canonical metadata (no apex/www split)", () => {
    expect(new URL(siteConfig.url).host).toBe("www.gradcalc.com");
  });
});
