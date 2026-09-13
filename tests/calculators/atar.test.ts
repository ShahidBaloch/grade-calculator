import { describe, expect, it } from "vitest";
import { calculateAtar, estimateAtarFromAverage, requiredAverageForAtar } from "@/lib/calculators/atar";

describe("estimateAtarFromAverage", () => {
  it("maps mid and high averages", () => {
    expect(estimateAtarFromAverage(80)).toBe(90);
    expect(estimateAtarFromAverage(100)).toBe(99.95);
    expect(estimateAtarFromAverage(0)).toBe(0);
  });
});

describe("requiredAverageForAtar", () => {
  it("inverts the educational curve", () => {
    expect(requiredAverageForAtar(90)).toBeCloseTo(80, 1);
  });
});

describe("calculateAtar", () => {
  it("averages four scaled scores", () => {
    const result = calculateAtar({
      subjects: [
        { name: "English", scaledScore: 80 },
        { name: "Maths", scaledScore: 80 },
        { name: "Chemistry", scaledScore: 80 },
        { name: "History", scaledScore: 80 },
      ],
    });
    expect(result.data?.countedAverage).toBe(80);
    expect(result.data?.estimatedAtar).toBe(90);
    expect(result.status).toBe("warning");
  });

  it("counts a fifth subject at 10%", () => {
    const result = calculateAtar({
      subjects: [
        { scaledScore: 90 },
        { scaledScore: 90 },
        { scaledScore: 90 },
        { scaledScore: 90 },
        { scaledScore: 50 },
      ],
    });
    expect(result.data?.countedScores).toHaveLength(5);
    expect(result.data?.countedScores[4]).toBe(5);
    expect(result.data?.countedAverage).toBeCloseTo(365 / 4.1, 5);
  });

  it("computes required average for a target ATAR", () => {
    const result = calculateAtar({
      subjects: [{ scaledScore: 70 }],
      targetAtar: 90,
    });
    expect(result.data?.requiredAverage).toBeCloseTo(80, 1);
  });

  it("rejects out-of-range scores", () => {
    const result = calculateAtar({ subjects: [{ scaledScore: 120 }] });
    expect(result.status).toBe("error");
  });
});
