import { describe, expect, it } from "vitest";
import { percentToLetter } from "@/lib/grading-scales";
import { resolveGradeToGpaPoints } from "@/lib/grading-scales/grade-points";
import { calculateSemesterGpa } from "@/lib/calculators/gpa";

describe("UQ 7-point grade points", () => {
  it("maps marginal fail grade 3 to GPA 3, not 0", () => {
    expect(resolveGradeToGpaPoints("3", "au-uq-seven-point")).toBe(3);
    expect(resolveGradeToGpaPoints(3, "au-uq-seven-point")).toBe(3);
  });

  it("maps illustrative 47% to grade 3 on UQ preset", () => {
    const result = percentToLetter(47, "au-uq-seven-point");
    expect(result.gpa).toBe(3);
  });

  it("includes grade 3 in semester GPA average", () => {
    const result = calculateSemesterGpa(
      { courses: [{ grade: "7", credits: 3 }, { grade: "3", credits: 3 }] },
      "au-uq-seven-point",
    );
    expect(result.data?.gpa).toBe(5);
  });
});

describe("Monash 4-point grade points", () => {
  it("maps near pass and fail codes to official point values", () => {
    expect(resolveGradeToGpaPoints("NP", "au-monash-four-point")).toBe(0.7);
    expect(resolveGradeToGpaPoints("F", "au-monash-four-point")).toBe(0.3);
    expect(resolveGradeToGpaPoints("HF", "au-monash-four-point")).toBe(0.3);
    expect(resolveGradeToGpaPoints("WF", "au-monash-four-point")).toBe(0);
  });

  it("does not map a fail percentage to GPA 0", () => {
    const result = percentToLetter(35, "au-monash-four-point");
    expect(result.gpa).toBe(0.3);
  });
});
