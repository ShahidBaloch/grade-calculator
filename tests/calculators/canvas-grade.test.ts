import { describe, expect, it } from "vitest";
import { calculateCanvasGrade } from "@/lib/calculators/canvas-grade";

describe("calculateCanvasGrade", () => {
  it("calculates weighted course grade from groups", () => {
    const result = calculateCanvasGrade({
      groups: [
        { name: "Assignments", score: 90, weight: 50 },
        { name: "Final", score: 80, weight: 50 },
      ],
    });
    expect(result.data?.courseGrade).toBe(85);
  });
});
