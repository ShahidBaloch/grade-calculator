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
});
