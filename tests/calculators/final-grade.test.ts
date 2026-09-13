import { describe, expect, it } from "vitest";
import { calculateFinalGradeRequired } from "@/lib/calculators/final-grade";

describe("calculateFinalGradeRequired", () => {
  it("returns 97.5% for standard case", () => {
    const result = calculateFinalGradeRequired({
      currentGrade: 85,
      desiredGrade: 90,
      finalWeight: 40,
    });
    expect(result.data?.status).toBe("achievable");
    expect(result.data?.requiredPercent).toBeCloseTo(97.5, 1);
  });

  it("detects already met target", () => {
    const result = calculateFinalGradeRequired({
      currentGrade: 90,
      desiredGrade: 85,
      finalWeight: 5,
    });
    expect(result.data?.status).toBe("already_met");
  });

  it("detects impossible target", () => {
    const result = calculateFinalGradeRequired({
      currentGrade: 60,
      desiredGrade: 95,
      finalWeight: 50,
    });
    expect(result.data?.status).toBe("impossible");
  });
});
