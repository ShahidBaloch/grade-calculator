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

  it("maps default example average 89.2% to B+ on US standard", () => {
    const result = calculateCanvasGrade({
      groups: [
        { name: "Assignments", score: 92, weight: 30 },
        { name: "Quizzes", score: 88, weight: 20 },
        { name: "Midterm", score: 85, weight: 20 },
        { name: "Final", score: 90, weight: 30 },
      ],
    });
    expect(result.data?.courseGrade).toBeCloseTo(89.2, 5);
    expect(result.data?.letter).toBe("B+");
    expect(result.data?.gpa).toBe(3.3);
  });
});
