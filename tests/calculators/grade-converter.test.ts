import { describe, expect, it } from "vitest";
import { convertLetterToPercent, convertPercentToLetter } from "@/lib/calculators/grade-converter";

describe("grade converter", () => {
  it("converts percent to letter", () => {
    const result = convertPercentToLetter(93);
    expect(result.data?.letter).toMatch(/^A/);
  });

  it("converts letter to percent", () => {
    const result = convertLetterToPercent("A");
    expect(result.data?.midpointPercent).toBeGreaterThan(90);
  });
});
