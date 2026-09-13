import { describe, expect, it } from "vitest";
import { calculateCumulativeGpa } from "@/lib/calculators/cumulative-gpa";

describe("calculateCumulativeGpa", () => {
  it("combines previous GPA with current semester", () => {
    const result = calculateCumulativeGpa({
      previousGpa: 3.5,
      previousCredits: 30,
      courses: [
        { grade: "A", credits: 3 },
        { grade: "B", credits: 3 },
      ],
    });
    expect(result.status).toBe("valid");
    expect(result.data?.cumulativeGpa).toBeGreaterThan(3.4);
    expect(result.data?.totalCredits).toBe(36);
  });

  it("returns semester GPA when no previous credits", () => {
    const result = calculateCumulativeGpa({
      courses: [{ grade: "A", credits: 3 }],
    });
    expect(result.data?.cumulativeGpa).toBe(4);
    expect(result.data?.previousCredits).toBe(0);
  });

  it("errors without courses", () => {
    const result = calculateCumulativeGpa({ courses: [] });
    expect(result.status).toBe("error");
  });
});
