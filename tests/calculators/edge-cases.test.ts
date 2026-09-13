import { describe, expect, it } from "vitest";
import { calculateCanvasGrade } from "@/lib/calculators/canvas-grade";
import { calculateEzGrader } from "@/lib/calculators/ez-grader";
import { calculateFinalGradeRequired } from "@/lib/calculators/final-grade";
import { calculateFinalGradeDroppedLowest } from "@/lib/calculators/final-grade-modes";
import { convertLetterToPercent, convertPercentToLetter } from "@/lib/calculators/grade-converter";
import { calculateRaiseGpa } from "@/lib/calculators/raise-gpa";
import { calculateWeightedGrade } from "@/lib/calculators/weighted-grade";

describe("calculator edge cases", () => {
  it("ez grader rejects zero questions", () => {
    expect(calculateEzGrader({ totalQuestions: 0, wrongAnswers: 0 }).status).toBe("error");
  });

  it("final grade rejects invalid weights", () => {
    expect(
      calculateFinalGradeRequired({ currentGrade: 80, desiredGrade: 90, finalWeight: 0 }).status,
    ).toBe("error");
    expect(
      calculateFinalGradeRequired({ currentGrade: 80, desiredGrade: 90, finalWeight: 101 }).status,
    ).toBe("error");
  });

  it("raise gpa handles already met target", () => {
    const result = calculateRaiseGpa({
      currentGpa: 3.8,
      currentCredits: 60,
      targetGpa: 3.0,
      futureCredits: 15,
    });
    expect(result.data?.status).toBe("already_met");
  });

  it("grade converter validates input", () => {
    expect(convertPercentToLetter(-5).status).toBe("error");
    expect(convertLetterToPercent("").status).toBe("error");
  });

  it("canvas grade handles empty weights", () => {
    const result = calculateCanvasGrade({
      groups: [{ name: "Test", score: 90, weight: 0 }],
    });
    expect(result.status).toBe("idle");
  });

  it("weighted grade errors on invalid input", () => {
    const result = calculateWeightedGrade({
      globalMode: "percentage",
      weightMode: "percent",
      items: [],
    });
    expect(result.status).toBe("error");
  });

  it("dropped lowest requires at least one test", () => {
    const result = calculateFinalGradeDroppedLowest({
      testScores: [],
      finalScore: 90,
      finalWeight: 30,
      dropLowest: false,
    });
    expect(result.status).toBe("error");
  });
});
