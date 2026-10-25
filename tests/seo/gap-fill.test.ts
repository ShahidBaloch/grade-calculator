import { describe, expect, it } from "vitest";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { guides } from "@/config/guides";
import { gradingScalePages } from "@/config/grading-scale-pages";
import { scoreKeywords, scorePairs, scorePairBySlug, scorePath, isScorePagePath } from "@/config/score-pages";
import { popularScoreSlugs } from "@/components/content/PopularScoreLinks";
import { isLowValueProgrammaticPath } from "@/lib/seo/programmatic-pages";
import { footerNav } from "@/config/navigation";
import sitemap from "@/app/sitemap";

describe("USA competitor gap fill", () => {
  it("one URL per keyword across calculators, guides, scale pages, and score pages", () => {
    const owners = new Map<string, string>();
    const claim = (kw: string, owner: string) => {
      const k = kw.toLowerCase();
      const prev = owners.get(k);
      expect(prev === undefined || prev === owner, `"${k}" owned by ${prev} and ${owner}`).toBe(true);
      owners.set(k, owner);
    };
    for (const [slug, kws] of Object.entries(calculatorKeywords)) for (const k of new Set(kws)) claim(k, slug);
    for (const g of guides) for (const k of g.keywords) claim(k, g.path);
    for (const p of gradingScalePages) for (const k of p.keywords) claim(k, p.path);
    for (const pair of scorePairs) for (const k of scoreKeywords(pair)) claim(k, scorePath(pair));
  });

  it("head terms land on the intended page", () => {
    expect(calculatorKeywords["ez-grader"][0]).toBe("easy grader");
    expect(calculatorKeywords["ez-grader"]).toContain("grade calculator");
    expect(calculatorKeywords["test-grade-calculator"][0]).toBe("test grade calculator");
    expect(calculatorKeywords["test-grade-calculator"].some((k) => /\d+\s*(out of|\/)\s*\d+/.test(k))).toBe(false);
    expect(calculatorKeywords["grade-percentage-calculator"][0]).toBe("grade percentage calculator");
    expect(calculatorKeywords["percentage-to-letter-grade"]).not.toContain("grade percentage calculator");
    expect(calculatorKeywords["college-grade-calculator"].some((k) => k.includes("gpa"))).toBe(false);
    expect(calculatorKeywords["college-gpa-calculator"][0]).toBe("college gpa calculator");
  });

  it("score pages are a capped, curated, indexable set with a linked hub", () => {
    expect(scorePairs.length).toBeGreaterThan(100);
    expect(scorePairs.length).toBeLessThanOrEqual(250);
    for (const p of scorePairs) {
      expect(p.score / p.total).toBeGreaterThanOrEqual(0.5);
      expect(isLowValueProgrammaticPath(scorePath(p))).toBe(false);
    }
    expect(isScorePagePath("/score/3-out-of-20")).toBe(false);
    expect(isLowValueProgrammaticPath("/score/3-out-of-20")).toBe(true);
    for (const slug of popularScoreSlugs) expect(scorePairBySlug[slug], slug).toBeDefined();
    const paths = sitemap().map((e) => new URL(e.url).pathname);
    expect(paths).toContain("/score");
    expect(paths).toContain("/powerschool-grade-calculator");
    expect(paths).toContain("/grade-percentage-calculator");
    expect(paths).toContain("/college-grade-calculator");
    expect(footerNav.reference.some((l) => l.href === "/score")).toBe(true);
  });
});
