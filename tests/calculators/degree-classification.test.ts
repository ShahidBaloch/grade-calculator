import { describe, expect, it } from "vitest";
import {
  calculateDegreeClassification,
  classifyUkMark,
} from "@/lib/calculators/degree-classification";

describe("classifyUkMark", () => {
  it("maps standard UK bands", () => {
    expect(classifyUkMark(70)).toBe("First (1st)");
    expect(classifyUkMark(60)).toBe("Upper Second (2:1)");
    expect(classifyUkMark(50)).toBe("Lower Second (2:2)");
    expect(classifyUkMark(40)).toBe("Third");
    expect(classifyUkMark(39)).toBe("Fail");
  });
});

describe("calculateDegreeClassification", () => {
  it("credit-weights a single year", () => {
    const result = calculateDegreeClassification({
      modules: [
        { name: "Law", mark: 72, credits: 30, year: 3 },
        { name: "Torts", mark: 64, credits: 30, year: 3 },
      ],
      year2Weight: 40,
      year3Weight: 60,
    });
    expect(result.data?.average).toBe(68);
    expect(result.data?.classification).toBe("Upper Second (2:1)");
    expect(result.data?.usedYearWeighting).toBe(false);
    expect(result.data?.borderline).toBe(true);
  });

  it("applies year 2 / year 3 weighting", () => {
    const result = calculateDegreeClassification({
      modules: [
        { mark: 60, credits: 120, year: 2 },
        { mark: 80, credits: 120, year: 3 },
      ],
      year2Weight: 40,
      year3Weight: 60,
    });
    expect(result.data?.usedYearWeighting).toBe(true);
    expect(result.data?.average).toBeCloseTo(72, 5);
    expect(result.data?.classification).toBe("First (1st)");
  });

  it("flags a borderline 2:1", () => {
    const result = calculateDegreeClassification({
      modules: [{ mark: 68.5, credits: 20, year: 3 }],
      year2Weight: 40,
      year3Weight: 60,
    });
    expect(result.data?.borderline).toBe(true);
    expect(result.data?.nextClassification).toBe("First (1st)");
    expect(result.status).toBe("warning");
  });

  it("rejects empty modules", () => {
    const result = calculateDegreeClassification({
      modules: [],
      year2Weight: 40,
      year3Weight: 60,
    });
    expect(result.status).toBe("error");
  });
});
