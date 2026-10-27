import { describe, expect, it } from "vitest";
import { calculateGcseGrade } from "@/lib/calculators/gcse-grade";

describe("calculateGcseGrade", () => {
  it("maps decimal percentages below integer band tops correctly", () => {
    expect(calculateGcseGrade(39.9).data?.grade).toBe("3");
    expect(calculateGcseGrade(69.9).data?.grade).toBe("6");
    expect(calculateGcseGrade(89.9).data?.grade).toBe("8");
  });

  it("maps 72% to grade 7 and a standard pass", () => {
    const result = calculateGcseGrade(72);
    expect(result.data?.grade).toBe("7");
    expect(result.data?.isStandardPass).toBe(true);
    expect(result.data?.legacyLetter).toContain("A");
  });

  it("maps 0% to U (unclassified)", () => {
    const result = calculateGcseGrade(0);
    expect(result.data?.grade).toBe("U");
    expect(result.data?.isStandardPass).toBe(false);
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
