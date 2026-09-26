import { describe, expect, it } from "vitest";
import { calculateCanvasGrade } from "@/lib/calculators/canvas-grade";
import { calculateEzGrader } from "@/lib/calculators/ez-grader";
import { calculateFinalGradeRequired } from "@/lib/calculators/final-grade";
import { calculateFinalGradeDroppedLowest } from "@/lib/calculators/final-grade-modes";
import { convertLetterToPercent, convertPercentToLetter } from "@/lib/calculators/grade-converter";
import { calculateRaiseGpa } from "@/lib/calculators/raise-gpa";
import { calculateWeightedGrade } from "@/lib/calculators/weighted-grade";
import { percentToLetter } from "@/lib/grading-scales";
import { calculateSemesterGpa } from "@/lib/calculators/gpa";
import { calculateEocGrade } from "@/lib/calculators/eoc-grade";

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

  it("maps US letter boundaries from the raw percentage", () => {
    expect(percentToLetter(89.99).letter).toBe("B+");
    expect(percentToLetter(90).letter).toBe("A-");
    expect(percentToLetter(92.99).letter).toBe("A-");
    expect(percentToLetter(93).letter).toBe("A");
    expect(percentToLetter(Number.NaN).letter).toBe("F");
  });

  it("rejects zero weight, zero credits, and zero exam weight", () => {
    const weighted = calculateWeightedGrade({
      globalMode: "percentage",
      weightMode: "percent",
      items: [{ score: 90, weight: 0 }],
    });
    expect(weighted.status).toBe("error");
    expect(JSON.stringify(weighted)).not.toMatch(/NaN|Infinity/);

    const gpa = calculateSemesterGpa({ courses: [{ grade: "A", credits: 0 }] });
    expect(gpa.data?.gpa).toBeUndefined();
    expect(JSON.stringify(gpa)).not.toMatch(/NaN|Infinity/);

    expect(calculateEocGrade({ currentGrade: 80, eocWeight: 0, targetGrade: 90 }).status).toBe("error");
    const impossible = calculateFinalGradeRequired({
      currentGrade: 70,
      desiredGrade: 95,
      finalWeight: 10,
    });
    expect(impossible.data?.status).toBe("impossible");
    expect(Number.isFinite(impossible.data?.requiredPercent)).toBe(true);
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
