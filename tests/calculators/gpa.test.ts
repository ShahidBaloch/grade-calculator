import { describe, expect, it } from "vitest";
import { calculateCollegeTermGpa, calculateSemesterGpa, getWeightedGpaBump } from "@/lib/calculators/gpa";

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

describe("calculateCollegeTermGpa", () => {
  it("excludes pass/fail courses from term GPA", () => {
    const result = calculateCollegeTermGpa([
      { name: "Biology", grade: "A", credits: 3, countsTowardGpa: true },
      { name: "PE", grade: "P", credits: 1, countsTowardGpa: false },
    ]);
    expect(result.status).toBe("valid");
    expect(result.data?.totalCredits).toBe(3);
    expect(result.data?.gpa).toBe(4);
    expect(result.data?.courses).toHaveLength(1);
  });

  it("errors when every course is excluded", () => {
    const result = calculateCollegeTermGpa([
      { name: "Audit", grade: "P", credits: 3, countsTowardGpa: false },
    ]);
    expect(result.status).toBe("error");
    expect(result.errors?.[0]).toMatch(/letter-graded/i);
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