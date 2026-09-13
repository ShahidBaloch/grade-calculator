import { describe, expect, it } from "vitest";
import { gradeToGpaPoints, normalizeLetter, scoreToPercent } from "@/lib/calculators/grade-utils";

describe("grade-utils", () => {
  it("parses percentage strings", () => {
    expect(scoreToPercent("92%", "us-standard")).toBe(92);
  });

  it("parses fraction strings", () => {
    expect(scoreToPercent("18/20", "us-standard")).toBe(90);
  });

  it("converts letter grades to GPA points", () => {
    expect(gradeToGpaPoints("A", "us-standard")).toBe(4);
  });

  it("returns null for invalid letters", () => {
    expect(scoreToPercent("ZZ", "us-standard")).toBeNull();
  });

  it("normalizes letter casing", () => {
    expect(normalizeLetter(" b+ ")).toBe("B+");
  });

  it("parses numeric strings as percentages", () => {
    expect(scoreToPercent("92", "us-standard")).toBe(92);
  });

  it("converts points with maxPoints option", () => {
    expect(scoreToPercent(18, "us-standard", { maxPoints: 20 })).toBe(90);
  });
});
