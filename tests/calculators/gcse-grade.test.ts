import { describe, expect, it } from "vitest";
import { calculateGcseGrade } from "@/lib/calculators/gcse-grade";

describe("calculateGcseGrade", () => {
  it("maps 72% to grade 7 and a standard pass", () => {
    const result = calculateGcseGrade(72);
    expect(result.data?.grade).toBe("7");
    expect(result.data?.isStandardPass).toBe(true);
    expect(result.data?.legacyLetter).toContain("A");
  });

  it("treats 35% as below a standard pass", () => {
    const result = calculateGcseGrade(35);
    expect(result.data?.grade).toBe("3");
    expect(result.data?.isStandardPass).toBe(false);
  });

  it("rejects percentages outside 0–100", () => {
    expect(calculateGcseGrade(140).status).toBe("error");
  });
});
