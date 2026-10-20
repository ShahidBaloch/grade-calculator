import { describe, expect, it } from "vitest";
import { calculateGradeChart } from "@/lib/calculators/grade-chart";

describe("calculateGradeChart", () => {
  it("lists every whole score from the total down to 0", () => {
    const result = calculateGradeChart(20);
    expect(result.data?.rows).toHaveLength(21);
    expect(result.data?.rows[0]).toMatchObject({ points: 20, percent: 100, letterGrade: "A+" });
    expect(result.data?.rows[2]).toMatchObject({ points: 18, percent: 90, letterGrade: "A-" });
    expect(result.data?.rows[20]).toMatchObject({ points: 0, percent: 0, letterGrade: "F" });
  });

  it("finds the minimum points for each letter", () => {
    const bands = calculateGradeChart(150).data!.bands;
    const a = bands.find((b) => b.letter === "A")!;
    const f = bands.find((b) => b.letter === "F")!;
    // 93% of 150 = 139.5 → 140 points
    expect(a.minPoints).toBe(140);
    expect(a.maxPoints).toBe(145);
    expect(f.minPoints).toBe(0);
    expect(f.maxPoints).toBe(89);
  });

  it("does not round a band minimum up past an exact hit", () => {
    // 90% of 50 = 45 exactly
    const aMinus = calculateGradeChart(50).data!.bands.find((b) => b.letter === "A-")!;
    expect(aMinus.minPoints).toBe(45);
  });

  it("marks bands with no whole-point score", () => {
    const bands = calculateGradeChart(10).data!.bands;
    expect(bands.find((b) => b.letter === "A")).toMatchObject({ minPoints: null, maxPoints: null });
    expect(bands.find((b) => b.letter === "A+")).toMatchObject({ minPoints: 10, maxPoints: 10 });
  });

  it("looks up a score", () => {
    expect(calculateGradeChart(150, "us-standard", 118).data?.lookup).toMatchObject({ letterGrade: "C+" });
    expect(calculateGradeChart(200, "us-standard", 176).data?.lookup?.percent).toBe(88);
    expect(calculateGradeChart(10, "us-standard", 12).status).toBe("warning");
  });

  it("rejects bad totals and negative scores", () => {
    expect(calculateGradeChart(0).status).toBe("error");
    expect(calculateGradeChart(12.5).status).toBe("error");
    expect(calculateGradeChart(501).status).toBe("error");
    expect(calculateGradeChart(10, "us-standard", -1).status).toBe("error");
  });
});
