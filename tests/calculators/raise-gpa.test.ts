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

  it("flags impossible targets above 4.0", () => {
    const result = calculateRaiseGpa({
      currentGpa: 2.5,
      currentCredits: 60,
      targetGpa: 4.0,
      futureCredits: 15,
    });
    expect(result.data?.status).toBe("impossible");
  });
});
