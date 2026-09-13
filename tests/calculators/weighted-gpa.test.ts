import { describe, expect, it } from "vitest";
import { calculateWeightedGpa } from "@/lib/calculators/weighted-gpa";

describe("calculateWeightedGpa", () => {
  it("adds AP bonus to GPA points", () => {
    const result = calculateWeightedGpa({
      courses: [{ grade: "A", credits: 3, courseType: "ap" }],
    });
    expect(result.data?.gpa).toBe(5.0);
  });

  it("adds honors bonus", () => {
    const result = calculateWeightedGpa({
      courses: [{ grade: "B", credits: 3, courseType: "honors" }],
    });
    expect(result.data?.gpa).toBe(3.5);
  });
});
