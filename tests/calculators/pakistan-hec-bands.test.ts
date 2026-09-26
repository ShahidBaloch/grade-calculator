import { describe, expect, it } from "vitest";
import {
  findHecBandByCgpa,
  findHecBandByPercent,
  hecCgpaToBandMinimumPercent,
} from "@/lib/calculators/pakistan-hec-bands";

describe("Pakistan HEC §13.1 bands", () => {
  it("includes D+ at 54–57%", () => {
    const band = findHecBandByPercent(55);
    expect(band.letter).toBe("D+");
  });

  it("maps 3.00 CGPA to 71% band minimum (B)", () => {
    expect(hecCgpaToBandMinimumPercent(3)).toBe(71);
    expect(findHecBandByCgpa(3).letter).toBe("B");
  });

  it("maps 3.66 CGPA to A- band", () => {
    expect(findHecBandByCgpa(3.66).letter).toBe("A-");
  });
});
