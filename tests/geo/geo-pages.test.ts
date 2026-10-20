import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { siteConfig } from "@/config/site";
import { caUniversityProfiles } from "@/data/geo-sources/ca-universities";
import { usEocStateRules } from "@/data/geo-sources/us-eoc-states";
import { getLockedScaleFromPath } from "@/lib/grading-scales/resolve-scale";
import { buildCaUniversityCopy, buildUsEocStateCopy, geoCopyText, type GeoPageCopy } from "@/lib/content/geo-page-copy";
import { isRedirectOnlyPath } from "@/lib/seo/canonical";
import {
  caUniversityPath,
  geoProgrammaticPaths,
  hubGeoLinkGroups,
  standaloneGeoHreflang,
  usEocStatePath,
} from "@/lib/seo/geo-programmatic";
import { isLowValueProgrammaticPath } from "@/lib/seo/programmatic-pages";

const pages: Array<{ path: string; copy: GeoPageCopy }> = [
  ...caUniversityProfiles.map((p) => ({ path: caUniversityPath(p.slug), copy: buildCaUniversityCopy(p) })),
  ...usEocStateRules.map((r) => ({ path: usEocStatePath(r.slug), copy: buildUsEocStateCopy(r) })),
];

const words = (text: string) => text.split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length;

describe("geo programmatic pages", () => {
  it.each(pages)("$path has at least 500 words of its own copy", ({ copy }) => {
    expect(words(geoCopyText(copy))).toBeGreaterThanOrEqual(500);
  });

  it("titles and descriptions are unique and fit search snippets", () => {
    const titles = pages.map((p) => p.copy.title);
    const descriptions = pages.map((p) => p.copy.description);
    expect(new Set(titles).size).toBe(titles.length);
    expect(new Set(descriptions).size).toBe(descriptions.length);
    for (const { copy } of pages) {
      expect(copy.title.length).toBeLessThanOrEqual(60);
      expect(copy.description.length).toBeLessThanOrEqual(175);
    }
  });

  it("no two pages share a paragraph", () => {
    const seen = new Map<string, string>();
    for (const { path, copy } of pages) {
      const blocks = [...copy.intro, ...copy.sections.flatMap((s) => s.paragraphs ?? [])];
      for (const block of blocks) {
        // The state comparison table note is deliberately shared across state pages.
        if (block.startsWith("We only publish a state")) continue;
        expect(seen.get(block), `${path} repeats ${seen.get(block)}`).toBeUndefined();
        seen.set(block, path);
      }
    }
  });

  it("every page is in the sitemap, indexable, and not a redirect or thin pattern", () => {
    const urls = new Set(sitemap().map((entry) => entry.url));
    for (const path of geoProgrammaticPaths()) {
      expect(urls.has(`${siteConfig.url}${path}`)).toBe(true);
      expect(isRedirectOnlyPath(path)).toBe(false);
      expect(isLowValueProgrammaticPath(path)).toBe(false);
    }
  });

  it("standalone hreflang names the market and self as x-default", () => {
    const path = caUniversityPath("uoft");
    expect(standaloneGeoHreflang(path, "en-CA")).toEqual({
      "x-default": `${siteConfig.url}${path}`,
      "en-CA": `${siteConfig.url}${path}`,
    });
  });

  it("hubs link every page in their market", () => {
    const ca = hubGeoLinkGroups("/ca").flatMap((g) => g.links.map((l) => l.href));
    const us = hubGeoLinkGroups("/us").flatMap((g) => g.links.map((l) => l.href));
    expect(ca).toEqual(caUniversityProfiles.map((p) => caUniversityPath(p.slug)));
    expect(us).toEqual(usEocStateRules.map((r) => usEocStatePath(r.slug)));
  });

  it("state EOC pages lock the US scale", () => {
    expect(getLockedScaleFromPath("/eoc-grade-calculator/florida")).toBe("us-standard");
  });
});
