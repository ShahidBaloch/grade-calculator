import { describe, expect, it } from "vitest";
import {
  calculateFinalGradeDroppedLowest,
  calculateFinalGradePoints,
  calculateFinalGradeReverse,
} from "@/lib/calculators/final-grade-modes";

describe("final grade modes", () => {
  it("calculates reverse final grade", () => {
    const result = calculateFinalGradeReverse({
      currentGrade: 85,
      finalScore: 90,
      finalWeight: 40,
    });
    expect(result.data?.overallGrade).toBeCloseTo(87, 0);
  });

  it("drops lowest test when enabled", () => {
    const result = calculateFinalGradeDroppedLowest({
      testScores: [60, 90, 80],
      finalScore: 85,
      finalWeight: 40,
      dropLowest: true,
    });
    expect(result.data?.overallGrade).toBeGreaterThan(80);
  });

  it("calculates point-based overall grade", () => {
    const result = calculateFinalGradePoints({
      currentPoints: 340,
      currentMaxPoints: 400,
      finalPoints: 85,
      finalMaxPoints: 100,
      finalWeight: 40,
    });
    expect(result.data?.overallGrade).toBeCloseTo(85, 0);
  });

  it("errors on invalid final weight", () => {
    const result = calculateFinalGradeReverse({
      currentGrade: 85,
      finalScore: 90,
      finalWeight: 0,
    });
    expect(result.status).toBe("error");
  });
});
