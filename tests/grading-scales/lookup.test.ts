import { describe, expect, it } from "vitest";
import { letterToPercent, percentToLetter } from "@/lib/grading-scales";

describe("grading scale lookup", () => {
  it("maps 90% to A- on US standard", () => {
    const result = percentToLetter(90, "us-standard");
    expect(result.letter).toBe("A-");
    expect(result.gpa).toBe(3.7);
  });

  it("maps 80% to B- on US standard", () => {
    const result = percentToLetter(80, "us-standard");
    expect(result.letter).toBe("B-");
  });

  it("converts letter to midpoint percent", () => {
    expect(letterToPercent("A", "us-standard")).toBe(94.5);
  });

  it("uses UK degree bands", () => {
    const result = percentToLetter(65, "uk-degree");
    expect(result.letter).toBe("Upper Second (2:1)");
  });
});
