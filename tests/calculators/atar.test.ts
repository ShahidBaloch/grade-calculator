import { describe, expect, it } from "vitest";
import { calculateAtar } from "@/lib/calculators/atar";

const subjects = [
  { scaledScore: 90 },
  { scaledScore: 88 },
  { scaledScore: 86 },
  { scaledScore: 84 },
  { scaledScore: 70 },
];

describe("calculateAtar authority models", () => {
  it("uses a QTAC-style best-five average", () => {
    const result = calculateAtar({ subjects, authority: "qtac" });
    expect(result.data?.countedAverage).toBeCloseTo(83.6, 1);
  });

  it("uses a VTAC-style primary-four aggregate when more than four scores exist", () => {
    const result = calculateAtar({ subjects, authority: "vtac" });
    expect(result.data?.countedAverage).toBeGreaterThan(80);
    expect(result.data?.formulaSteps[0]).toContain("Victoria");
  });
});
