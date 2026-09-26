import { describe, expect, it } from "vitest";
import { defaultCoursesForScale } from "@/lib/calculators/gpa-defaults";
import { calculateSemesterGpa } from "@/lib/calculators/gpa";

describe("defaultCoursesForScale", () => {
  it("uses HD/D/C grades for the Australian 7-point scale", () => {
    const courses = defaultCoursesForScale("au-seven-point");
    const result = calculateSemesterGpa({ courses }, "au-seven-point");
    expect(result.status).toBe("valid");
    expect(result.errors).toBeUndefined();
    expect(result.data?.gpa).toBeGreaterThan(0);
  });

  it("uses UK classification labels for the UK degree scale", () => {
    const courses = defaultCoursesForScale("uk-degree");
    const result = calculateSemesterGpa({ courses }, "uk-degree");
    expect(result.status).toBe("valid");
    expect(result.errors).toBeUndefined();
  });
});
