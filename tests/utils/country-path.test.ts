import { describe, expect, it } from "vitest";
import {
  calculatorStorageScope,
  getCountryPrefixFromPath,
  resolveCalculatorPath,
  resolveSiteHref,
} from "@/lib/utils/country-path";

describe("country-path", () => {
  it("detects country hub prefixes", () => {
    expect(getCountryPrefixFromPath("/au/gpa-calculator")).toBe("/au");
    expect(getCountryPrefixFromPath("/gpa-calculator")).toBeNull();
  });

  it("keeps country context for related calculators", () => {
    expect(resolveCalculatorPath("gpa-calculator", "/au/weighted-grade-calculator")).toBe(
      "/au/gpa-calculator",
    );
    expect(resolveCalculatorPath("cumulative-gpa-calculator", "/au/gpa-calculator")).toBe(
      "/au/cumulative-gpa-calculator",
    );
    expect(resolveCalculatorPath("percentage-to-letter-grade", "/uk/letter-grade-calculator")).toBe(
      "/uk/percentage-to-letter-grade",
    );
    expect(resolveCalculatorPath("gpa-calculator", "/uk/degree-classification-calculator")).toBe(
      "/uk/degree-classification-calculator",
    );
    expect(resolveSiteHref("/gpa-calculator", "/uk")).toBe("/uk/degree-classification-calculator");
    expect(resolveCalculatorPath("letter-grade-calculator", "/uk/gcse-grade-calculator")).toBe(
      "/uk/letter-grade-calculator",
    );
    expect(resolveCalculatorPath("weighted-grade-calculator", "/uk/gcse-grade-calculator")).toBe(
      "/uk/weighted-grade-calculator",
    );
    expect(resolveCalculatorPath("cgpa-to-gpa", "/uk/degree-classification-calculator")).toBe(
      "/cgpa-to-gpa",
    );
    expect(resolveSiteHref("/cgpa-to-gpa", "/uk/gcse-grade-calculator")).toBe("/cgpa-to-gpa");
    expect(resolveCalculatorPath("high-school-gpa-calculator", "/ca/gpa-calculator")).toBe(
      "/ca/gpa-calculator",
    );
    expect(resolveCalculatorPath("weighted-grade-calculator", "/nz/gpa-calculator")).toBe(
      "/nz/weighted-grade-calculator",
    );
    expect(resolveSiteHref("/final-grade-calculator", "/nz/gpa-calculator")).toBe(
      "/nz/final-grade-calculator",
    );
    expect(resolveSiteHref("/final-grade-calculator", "/nz")).toBe("/nz/final-grade-calculator");
  });

  it("keeps Canada on the URL through several calculator hops", () => {
    let ctx = "/ca/gpa-calculator";
    ctx = resolveSiteHref("/weighted-grade-calculator", ctx);
    expect(ctx).toBe("/ca/weighted-grade-calculator");
    ctx = resolveSiteHref("/final-grade-calculator", ctx);
    expect(ctx).toBe("/ca/final-grade-calculator");
    ctx = resolveSiteHref("/cumulative-gpa-calculator", ctx);
    expect(ctx).toBe("/ca/cumulative-gpa-calculator");
    ctx = resolveSiteHref("/test-grade-calculator", ctx);
    expect(ctx).toBe("/ca/test-grade-calculator");
    expect(getCountryPrefixFromPath(ctx)).toBe("/ca");
  });

  it("rewrites footer calculator links on country pages", () => {
    expect(resolveSiteHref("/percentage-to-letter-grade", "/au/gpa-calculator")).toBe(
      "/au/percentage-to-letter-grade",
    );
    expect(resolveSiteHref("/cumulative-gpa-calculator", "/au/gpa-calculator")).toBe(
      "/au/cumulative-gpa-calculator",
    );
  });

  it("keeps grading-scale pages in the country when a local tool exists", () => {
    expect(resolveSiteHref("/gpa-calculator", "/grading-scales/pakistan")).toBe("/pk/gpa-calculator");
    expect(resolveSiteHref("/cgpa-calculator", "/grading-scales/pakistan")).toBe("/pk/cgpa-calculator");
    expect(resolveSiteHref("/gpa-calculator", "/grading-scales/australia-uq")).toBe("/au/gpa-calculator");
    expect(resolveSiteHref("/gpa-calculator", "/grading-scales/uk")).toBe(
      "/uk/degree-classification-calculator",
    );
    expect(resolveCalculatorPath("gpa-calculator", "/grading-scales/us")).toBe("/gpa-calculator");
    expect(calculatorStorageScope("/grading-scales/pakistan")).toBe("world");
  });
});
