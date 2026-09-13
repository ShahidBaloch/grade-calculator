import { describe, expect, it } from "vitest";
import { calculateSemesterGpa, getWeightedGpaBump } from "@/lib/calculators/gpa";

describe("calculateSemesterGpa", () => {
  it("calculates semester GPA from letter grades", () => {
    const result = calculateSemesterGpa({
      courses: [
        { grade: "A", credits: 3 },
        { grade: "B", credits: 3 },
      ],
    });
    expect(result.data?.gpa).toBeGreaterThan(0);
    expect(result.data?.totalCredits).toBe(6);
  });

  it("accepts numeric percentage grades", () => {
    const result = calculateSemesterGpa({
      courses: [{ grade: 95, credits: 3 }],
    });
    expect(result.data?.gpa).toBe(4);
  });

  it("errors on zero credits", () => {
    const result = calculateSemesterGpa({
      courses: [{ grade: "A", credits: 0 }],
    });
    expect(result.status).toBe("error");
  });

  it("returns idle without courses", () => {
    const result = calculateSemesterGpa({ courses: [] });
    expect(result.status).toBe("error");
  });
});

describe("getWeightedGpaBump", () => {
  it("returns correct bumps per course type", () => {
    expect(getWeightedGpaBump("regular")).toBe(0);
    expect(getWeightedGpaBump("honors")).toBe(0.5);
    expect(getWeightedGpaBump("ap")).toBe(1);
    expect(getWeightedGpaBump("ib")).toBe(1);
  });
});