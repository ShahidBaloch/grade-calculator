import { describe, expect, it } from "vitest";
import { curveScores, parseCurveScores } from "@/lib/calculators/grade-curve";

describe("grade curve", () => {
  const scores = [62, 71, 78, 85, 91];

  it("parses commas, spaces and new lines and drops junk", () => {
    expect(parseCurveScores("62, 71 78\n85;91, abc, -4")).toEqual(scores);
    expect(parseCurveScores("  ")).toEqual([]);
  });

  it("adds flat points to every score", () => {
    const result = curveScores(scores, "flat", { points: 5 })!;
    expect(result.curved).toEqual([67, 76, 83, 90, 96]);
    expect(result.shift).toBe(5);
    expect(result.rawAverage).toBeCloseTo(77.4);
    expect(result.curvedAverage).toBeCloseTo(82.4);
  });

  it("caps at 100 unless the cap is turned off", () => {
    expect(curveScores(scores, "flat", { points: 12 })!.curved[4]).toBe(100);
    expect(curveScores(scores, "flat", { points: 12, cap: false })!.curved[4]).toBe(103);
  });

  it("lifts the top score to 100 by adding the same points to everyone", () => {
    const result = curveScores(scores, "top-to-100")!;
    expect(result.shift).toBe(9);
    expect(result.curved).toEqual([71, 80, 87, 94, 100]);
  });

  it("scales every score against the top score", () => {
    const result = curveScores(scores, "scale-to-top")!;
    expect(result.curved[4]).toBe(100);
    expect(result.curved[0]).toBeCloseTo(68.13, 2);
    expect(result.shift).toBeNull();
  });

  it("applies the square root curve", () => {
    const result = curveScores([49, 64, 81, 100], "square-root")!;
    expect(result.curved).toEqual([70, 80, 90, 100]);
  });

  it("shifts the class to a target average", () => {
    const result = curveScores(scores, "target-average", { targetAverage: 80 })!;
    expect(result.shift).toBeCloseTo(2.6);
    expect(result.curvedAverage).toBeCloseTo(80);
  });

  it("returns null without scores or without the input a method needs", () => {
    expect(curveScores([], "flat", { points: 5 })).toBeNull();
    expect(curveScores(scores, "target-average")).toBeNull();
    expect(curveScores([0, 0], "scale-to-top")).toBeNull();
  });
});
