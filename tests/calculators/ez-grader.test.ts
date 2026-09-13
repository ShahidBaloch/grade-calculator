import { describe, expect, it } from "vitest";
import { calculateEzGrader } from "@/lib/calculators/ez-grader";

describe("calculateEzGrader", () => {
  it("returns 100% for perfect score", () => {
    const result = calculateEzGrader({ totalQuestions: 10, wrongAnswers: 0 });
    expect(result.status).toBe("valid");
    expect(result.data?.scorePercent).toBe(100);
    expect(result.data?.correctAnswers).toBe(10);
  });

  it("returns 90% for 1 wrong out of 10", () => {
    const result = calculateEzGrader({ totalQuestions: 10, wrongAnswers: 1 });
    expect(result.data?.scorePercent).toBe(90);
  });

  it("returns 0% when all wrong", () => {
    const result = calculateEzGrader({ totalQuestions: 10, wrongAnswers: 10 });
    expect(result.data?.scorePercent).toBe(0);
  });

  it("errors when wrong exceeds total", () => {
    const result = calculateEzGrader({ totalQuestions: 10, wrongAnswers: 11 });
    expect(result.status).toBe("error");
  });

  it("builds chart with totalQuestions + 1 rows", () => {
    const result = calculateEzGrader({ totalQuestions: 5, wrongAnswers: 2 });
    expect(result.data?.chart).toHaveLength(6);
  });
});
