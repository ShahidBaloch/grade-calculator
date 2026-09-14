import { describe, expect, it } from "vitest";
import { calculateWeightedGrade } from "@/lib/calculators/weighted-grade";

describe("calculateWeightedGrade", () => {
  it("calculates weighted average", () => {
    const result = calculateWeightedGrade({
      globalMode: "percentage",
      weightMode: "percent",
      items: [
        { score: 90, weight: 30 },
        { score: 80, weight: 30 },
        { score: 70, weight: 40 },
      ],
    });
    expect(result.data?.weightedAverage).toBe(79);
  });

  it("warns when weights do not sum to 100", () => {
    const result = calculateWeightedGrade({
      globalMode: "percentage",
      weightMode: "percent",
      items: [{ score: 100, weight: 50 }],
    });
    expect(result.status).toBe("warning");
  });

  it("normalizes weights that total 130%", () => {
    const result = calculateWeightedGrade({
      globalMode: "percentage",
      weightMode: "percent",
      items: [
        { name: "Homework", score: 92, weight: 41 },
        { name: "Midterm", score: 85, weight: 89 },
      ],
    });
    expect(result.status).toBe("warning");
    expect(result.warnings?.[0]).toContain("130%");
    expect(result.data?.weightedAverage).toBeCloseTo(87.21, 2);
    expect(result.data?.letterGrade).toBe("B+");
    expect(result.data?.gpa).toBe(3.3);
  });

  it("converts letter grades before weighting", () => {
    const result = calculateWeightedGrade({
      globalMode: "letter",
      weightMode: "percent",
      items: [
        { score: "A", weight: 50 },
        { score: "B", weight: 50 },
      ],
    });
    expect(result.status).toBe("valid");
    expect(result.data?.weightedAverage).toBeGreaterThan(88);
    expect(result.data?.weightedAverage).toBeLessThan(94);
  });

  it("uses points earned over max points", () => {
    const result = calculateWeightedGrade({
      globalMode: "points",
      weightMode: "percent",
      items: [
        { score: 45, weight: 50, maxPoints: 50 },
        { score: 40, weight: 50, maxPoints: 50 },
      ],
    });
    expect(result.data?.weightedAverage).toBe(85);
  });
});

describe("calculateRemainingWorkRequired", () => {
  it("solves required average on remaining weight", async () => {
    const { calculateRemainingWorkRequired } = await import("@/lib/calculators/weighted-grade");
    const result = calculateRemainingWorkRequired(
      [
        { percent: 90, weight: 30 },
        { percent: 80, weight: 30 },
      ],
      40,
      85,
    );
    // (85*100 - (90*30+80*30)) / 40 = (8500 - 5100) / 40 = 85
    expect(result.data?.requiredPercent).toBe(85);
    expect(result.data?.status).toBe("achievable");
  });

  it("marks impossible targets over 100%", async () => {
    const { calculateRemainingWorkRequired } = await import("@/lib/calculators/weighted-grade");
    const result = calculateRemainingWorkRequired([{ percent: 70, weight: 80 }], 20, 95);
    expect(result.data?.status).toBe("impossible");
    expect(result.data!.requiredPercent).toBeGreaterThan(100);
  });
});
