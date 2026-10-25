import { describe, expect, it } from "vitest";
import { guides, guideBySlug } from "@/config/guides";
import { gapGuides } from "@/config/gap-guides";
import { calculatorKeywords } from "@/lib/seo/keywords";

describe("gap guides", () => {
  it("adds 12 guides with unique slugs", () => {
    expect(gapGuides).toHaveLength(12);
    expect(new Set(guides.map((g) => g.slug)).size).toBe(guides.length);
  });
  it("primaries do not collide with calculator primaries or other guide primaries", () => {
    const calcPrimaries = new Set(Object.values(calculatorKeywords).map((k) => k[0]));
    const allCalcKw = new Set(Object.values(calculatorKeywords).flat());
    for (const g of gapGuides) {
      expect(calcPrimaries.has(g.keywords[0])).toBe(false);
      expect(allCalcKw.has(g.keywords[0]), g.keywords[0]).toBe(false);
      expect(guides.filter((o) => o.keywords[0] === g.keywords[0])).toHaveLength(1);
    }
  });
  it("related guides resolve and content meets the bar", () => {
    for (const g of gapGuides) {
      expect(g.path).toBe(`/guides/${g.slug}`);
      expect(g.sections.length).toBeGreaterThanOrEqual(6);
      expect(g.faqs.length).toBeGreaterThanOrEqual(2);
      expect(g.relatedCalculators.length).toBeGreaterThan(0);
      for (const r of g.relatedGuides) expect(guideBySlug[r], `${g.slug} -> ${r}`).toBeDefined();
    }
  });
});
