import { describe, expect, it } from "vitest";
import { calculateTestGrade } from "@/lib/calculators/test-grade";

describe("calculateTestGrade", () => {
  it("calculates from correct answers", () => {
    const result = calculateTestGrade({
      inputMode: "correct",
      totalQuestions: 20,
      correctAnswers: 18,
      bonusPoints: 0,
    });
    expect(result.data?.finalPercent).toBe(90);
    expect(result.data?.correctAnswers).toBe(18);
  });

  it("calculates from wrong answers", () => {
    const result = calculateTestGrade({
      inputMode: "wrong",
      totalQuestions: 10,
      wrongAnswers: 2,
      bonusPoints: 0,
    });
    expect(result.data?.finalPercent).toBe(80);
  });

  it("applies bonus points with cap warning", () => {
    const result = calculateTestGrade({
      inputMode: "correct",
      totalQuestions: 10,
      correctAnswers: 10,
      bonusPoints: 5,
    });
    expect(result.status).toBe("warning");
    expect(result.data?.finalPercent).toBe(100);
    expect(result.data?.cappedAt100).toBe(true);
  });

  it("errors when answers exceed total", () => {
    const result = calculateTestGrade({
      inputMode: "correct",
      totalQuestions: 10,
      correctAnswers: 11,
      bonusPoints: 0,
    });
    expect(result.status).toBe("error");
  });
});
