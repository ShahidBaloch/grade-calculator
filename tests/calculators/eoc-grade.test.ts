import { describe, expect, it } from "vitest";
import { calculateEocGrade } from "@/lib/calculators/eoc-grade";

describe("calculateEocGrade", () => {
  it("delegates to final grade formula", () => {
    const result = calculateEocGrade({
      currentGrade: 82,
      eocWeight: 25,
      targetGrade: 85,
    });
    expect(result.data?.status).toBe("achievable");
    expect(result.data?.requiredPercent).toBeGreaterThan(90);
  });

  it("errors on invalid EOC weight", () => {
    const result = calculateEocGrade({
      currentGrade: 80,
      eocWeight: 0,
      targetGrade: 85,
    });
    expect(result.status).toBe("error");
  });
});
