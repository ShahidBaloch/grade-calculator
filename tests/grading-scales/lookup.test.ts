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

  it("maps 89.2% to B+ on US standard (no gap between integer bands)", () => {
    const result = percentToLetter(89.2, "us-standard");
    expect(result.letter).toBe("B+");
    expect(result.gpa).toBe(3.3);
  });

  it("maps 89.2% to A+ on India 10-point (not F)", () => {
    const result = percentToLetter(89.2, "in-ten-point");
    expect(result.letter).toBe("A+");
    expect(result.gpa).toBe(9);
  });

  it("maps 89.2% to A on Canada Standard", () => {
    const result = percentToLetter(89.2, "ca-standard");
    expect(result.letter).toBe("A");
    expect(result.gpa).toBe(4);
  });

  it("maps 92% to A+ with 4.33 on Canada 4.33 scale", () => {
    const result = percentToLetter(92, "ca-four-three-three");
    expect(result.letter).toBe("A+");
    expect(result.gpa).toBe(4.33);
  });

  it("converts letter to midpoint percent", () => {
    expect(letterToPercent("A", "us-standard")).toBe(94.5);
  });

  it("uses UK degree bands", () => {
    const result = percentToLetter(65, "uk-degree");
    expect(result.letter).toBe("Upper Second (2:1)");
  });

  it("maps Pakistan HEC §13.1 percentage bands", () => {
    expect(percentToLetter(85, "pk-hec").letter).toBe("A");
    expect(percentToLetter(72, "pk-hec").letter).toBe("B");
    expect(percentToLetter(70, "pk-hec").letter).toBe("B-");
    expect(percentToLetter(55, "pk-hec").letter).toBe("D+");
    expect(percentToLetter(52, "pk-hec").letter).toBe("D");
    expect(percentToLetter(49, "pk-hec").letter).toBe("F");
    expect(percentToLetter(80, "pk-hec").band.gpaLabel).toBe("3.34–3.66");
    expect(percentToLetter(72, "pk-hec").band.gpaLabel).toBe("2.67–3.00");
    expect(percentToLetter(50, "pk-hec").band.gpaLabel).toBe("0.10–1.00");
  });
});
