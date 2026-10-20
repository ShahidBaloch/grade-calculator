import { describe, expect, it } from "vitest";
import { calculateAverageGrade, parseScoreList } from "@/lib/calculators/average-grade";

describe("calculateAverageGrade", () => {
  it("averages percentages equally", () => {
    const result = calculateAverageGrade({
      scoreMode: "percentage",
      items: [{ score: 90 }, { score: 80 }, { score: 70 }],
    });
    expect(result.status).toBe("valid");
    expect(result.data?.average).toBe(80);
    expect(result.data?.median).toBe(80);
    expect(result.data?.highest).toBe(90);
    expect(result.data?.lowest).toBe(70);
    expect(result.data?.count).toBe(3);
    expect(result.data?.letterGrade).toBe("B-");
    expect(result.data?.totalPointsAverage).toBeNull();
  });

  it("uses the middle two scores for an even-count median", () => {
    const result = calculateAverageGrade({
      scoreMode: "percentage",
      items: [{ score: 60 }, { score: 100 }, { score: 70 }, { score: 90 }],
    });
    expect(result.data?.median).toBe(80);
  });

  it("separates the mean of percentages from the total-points average", () => {
    const result = calculateAverageGrade({
      scoreMode: "points",
      items: [
        { score: 9, maxPoints: 10 },
        { score: 60, maxPoints: 100 },
      ],
    });
    expect(result.data?.average).toBe(75);
    expect(result.data?.totalPointsAverage).toBeCloseTo(62.73, 2);
  });

  it("converts letter grades through the scale", () => {
    const result = calculateAverageGrade({
      scoreMode: "letter",
      items: [{ score: "A" }, { score: "B" }],
    });
    expect(result.status).toBe("valid");
    expect(result.data?.count).toBe(2);
  });

  it("skips blank rows and rejects bad input", () => {
    expect(
      calculateAverageGrade({ scoreMode: "letter", items: [{ score: "" }, { score: "A" }] }).data?.count,
    ).toBe(1);
    expect(calculateAverageGrade({ scoreMode: "letter", items: [{ score: "" }] }).status).toBe("error");
    expect(
      calculateAverageGrade({ scoreMode: "points", items: [{ score: 5, maxPoints: 0 }] }).status,
    ).toBe("error");
  });

  it("warns on scores above 100%", () => {
    const result = calculateAverageGrade({ scoreMode: "percentage", items: [{ score: 105 }] });
    expect(result.status).toBe("warning");
  });
});

describe("parseScoreList", () => {
  it("splits on commas, spaces, semicolons, and newlines", () => {
    expect(parseScoreList("85, 92 78;\n64\n\n18/20 B+")).toEqual(["85", "92", "78", "64", "18/20", "B+"]);
  });
});
