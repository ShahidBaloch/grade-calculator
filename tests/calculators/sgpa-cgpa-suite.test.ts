import { describe, expect, it } from "vitest";
import { calculateSgpaToCgpa } from "@/lib/calculators/sgpa-to-cgpa";
import { convertCgpa10ToGpa4 } from "@/lib/calculators/cgpa-to-gpa";
import { defaultCoursesForScale } from "@/lib/calculators/gpa-defaults";
import { calculateSemesterGpa } from "@/lib/calculators/gpa";

describe("calculateSgpaToCgpa", () => {
  it("computes credit-weighted CGPA", () => {
    const result = calculateSgpaToCgpa([
      { label: "S1", sgpa: 8.2, credits: 22 },
      { label: "S2", sgpa: 7.8, credits: 24 },
      { label: "S3", sgpa: 8.5, credits: 23 },
    ]);
    expect(result.status).toBe("valid");
    expect(result.data?.cgpa).toBeCloseTo(8.16086956521739, 5);
    expect(result.data?.totalCredits).toBe(69);
  });

  it("rejects empty terms", () => {
    const result = calculateSgpaToCgpa([]);
    expect(result.status).toBe("error");
  });
});

describe("convertCgpa10ToGpa4", () => {
  it("uses linear ×0.4", () => {
    const result = convertCgpa10ToGpa4({ cgpa: 8.2, methodId: "linear-0.4" });
    expect(result.status).toBe("valid");
    expect(result.data?.gpa4).toBeCloseTo(3.28, 5);
  });

  it("uses percentage bridge", () => {
    const result = convertCgpa10ToGpa4({ cgpa: 8.2, methodId: "percent-bridge" });
    expect(result.status).toBe("valid");
    expect(result.data?.gpa4).toBeCloseTo((8.2 * 9.5) / 25, 5);
  });
});

describe("India GPA defaults", () => {
  it("produces a valid SGPA on India 10-point scale", () => {
    const courses = defaultCoursesForScale("in-ten-point");
    const result = calculateSemesterGpa({ courses }, "in-ten-point");
    expect(result.status).toBe("valid");
    expect(result.data?.gpa).toBeGreaterThan(0);
  });
});
