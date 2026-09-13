import { describe, expect, it } from "vitest";
import { calculateRaiseGpa } from "@/lib/calculators/raise-gpa";

describe("calculateRaiseGpa", () => {
  it("calculates required GPA to reach target", () => {
    const result = calculateRaiseGpa({
      currentGpa: 3.0,
      currentCredits: 30,
      targetGpa: 3.5,
      futureCredits: 30,
    });
    expect(result.data?.status).toBe("achievable");
    expect(result.data?.requiredGpa).toBeCloseTo(4.0, 1);
  });

  it("flags impossible targets above the scale ceiling", () => {
    const result = calculateRaiseGpa({
      currentGpa: 2.5,
      currentCredits: 60,
      targetGpa: 4.0,
      futureCredits: 15,
    });
    expect(result.data?.status).toBe("impossible");
  });

  it("treats 4.70 as achievable on a 5.0 or 7.0 ceiling", () => {
    const result = calculateRaiseGpa({
      currentGpa: 3.2,
      currentCredits: 60,
      targetGpa: 3.5,
      futureCredits: 15,
      maxGpa: 7,
    });
    expect(result.data?.requiredGpa).toBeCloseTo(4.7, 5);
    expect(result.data?.status).toBe("achievable");
  });

  it("uses 4.70 for the classic 3.2 / 60 / 3.5 / 15 example", () => {
    const result = calculateRaiseGpa({
      currentGpa: 3.2,
      currentCredits: 60,
      targetGpa: 3.5,
      futureCredits: 15,
      maxGpa: 4,
    });
    expect(result.data?.requiredGpa).toBeCloseTo(4.7, 5);
    expect(result.data?.status).toBe("impossible");
  });
});
