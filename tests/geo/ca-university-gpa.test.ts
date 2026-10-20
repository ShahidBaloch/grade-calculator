import { describe, expect, it } from "vitest";
import { caUniversityBySlug } from "@/data/geo-sources/ca-universities";
import {
  calculateUniversityGpa,
  convertToOmsas,
  omsasScalesForUniversity,
  parseGrade,
  ubcEquivalency433,
} from "@/lib/calculators/ca-university-gpa";

function valid(outcome: ReturnType<typeof calculateUniversityGpa>) {
  if (outcome.status !== "valid") throw new Error(JSON.stringify(outcome));
  return outcome.data;
}

describe("Canadian university GPA", () => {
  it("parses percentages and letters", () => {
    expect(parseGrade("84")).toEqual({ percent: 84, letter: null });
    expect(parseGrade("84%")).toEqual({ percent: 84, letter: null });
    expect(parseGrade("a−")).toEqual({ percent: null, letter: "A-" });
    expect(parseGrade("F")).toEqual({ percent: null, letter: "E/F" });
    expect(parseGrade("101")).toBeNull();
    expect(parseGrade("Z")).toBeNull();
    expect(parseGrade("")).toBeNull();
  });

  it("U of T GPA uses the refined letter scale and course weights", () => {
    const data = valid(
      calculateUniversityGpa(
        [
          { grade: "85", weight: 0.5 },
          { grade: "78", weight: 0.5 },
          { grade: "72", weight: 1 },
          { grade: "A-", weight: 0.5 },
        ],
        caUniversityBySlug.uoft,
      ),
    );
    // (4.0×0.5 + 3.3×0.5 + 2.7×1 + 3.7×0.5) ÷ 2.5
    expect(data.native).toEqual({ kind: "gpa", value: expect.closeTo(3.28, 5) });
    // OMSAS Scale 3 gives 85% 3.9, not 4.0; letters use Scale 7.
    expect(data.omsasGpa).toBeCloseTo(3.26, 5);
  });

  it("UBC average, letter, 4.33 equivalent and OMSAS letter route", () => {
    const data = valid(
      calculateUniversityGpa(
        [
          { grade: "84", weight: 3 },
          { grade: "76", weight: 3 },
          { grade: "91", weight: 6 },
          { grade: "58", weight: 3 },
        ],
        caUniversityBySlug.ubc,
      ),
    );
    expect(data.native).toEqual({ kind: "percent-average", value: 80, letter: "A-" });
    expect(data.equivalency433).toBeCloseTo(52.98 / 15, 5);
    // 84 → A- 3.7, 76 → B+ 3.3, 91 → A+ 4.0, 58 → C- 1.7
    expect(data.omsasGpa).toBeCloseTo(3.34, 5);
    expect(data.courses[1].omsas.viaLetter).toBe("B+");
  });

  it("UBC rejects letter input because UBC reports percentages", () => {
    const outcome = calculateUniversityGpa([{ grade: "A", weight: 3 }], caUniversityBySlug.ubc);
    expect(outcome.status).toBe("error");
  });

  it("Waterloo matches the Science office worked example", () => {
    const data = valid(
      calculateUniversityGpa(
        [
          { grade: "85", weight: 0.5 },
          { grade: "78", weight: 0.5 },
          { grade: "91", weight: 0.5 },
          { grade: "74", weight: 0.5 },
          { grade: "68", weight: 0.5 },
          { grade: "75", weight: 0.25 },
        ],
        caUniversityBySlug.waterloo,
      ),
    );
    expect(data.native.kind).toBe("percent-average");
    expect(data.native.value.toFixed(2)).toBe("78.82");
    expect(data.omsasGpa).toBeCloseTo(18 / 5.5, 5);
  });

  it("Waterloo counts marks below 32 as 32", () => {
    const data = valid(
      calculateUniversityGpa(
        [
          { grade: "20", weight: 0.5 },
          { grade: "80", weight: 0.5 },
        ],
        caUniversityBySlug.waterloo,
      ),
    );
    expect(data.native.value).toBe(56);
    expect(data.formulaSteps.some((step) => step.includes("below 32"))).toBe(true);
  });

  it("OMSAS uses the university's scales", () => {
    const mcgill = omsasScalesForUniversity("McGill")!;
    const data = valid(
      calculateUniversityGpa(
        [
          { grade: "A", weight: 1 },
          { grade: "B+", weight: 2 },
        ],
        caUniversityBySlug.omsas,
        { omsasScales: mcgill },
      ),
    );
    expect(data.native).toEqual({ kind: "gpa", value: expect.closeTo((4 + 6.6) / 3, 5) });

    const york = omsasScalesForUniversity("York")!;
    expect(convertToOmsas({ percent: null, letter: "A" }, york)).toEqual({ points: 3.8, scale: 9 });
    expect(typeof convertToOmsas({ percent: null, letter: "A-" }, york)).toBe("string");
    expect(typeof convertToOmsas({ percent: 85, letter: null }, mcgill)).toBe("string");
  });

  it("OMSAS reads UBC percentages through UBC letters", () => {
    const data = valid(
      calculateUniversityGpa([{ grade: "76", weight: 1 }], caUniversityBySlug.omsas, {
        omsasScales: omsasScalesForUniversity("UBC")!,
        omsasUniversity: "UBC",
      }),
    );
    expect(data.omsasGpa).toBe(3.3);
  });

  it("compares raw marks, never rounding 84.9 up to 85", () => {
    expect(convertToOmsas({ percent: 84.9, letter: null }, [3])).toEqual({ points: 3.7, scale: 3 });
  });

  it("UBC Arts 4.33 equivalency covers the published range", () => {
    expect(ubcEquivalency433(95)).toBe(4.33);
    expect(ubcEquivalency433(85)).toBe(3.95);
    expect(ubcEquivalency433(50)).toBe(1);
    expect(ubcEquivalency433(42)).toBe(0);
  });

  it("returns idle with no grades and errors on bad weights", () => {
    expect(calculateUniversityGpa([{ grade: "", weight: 1 }], caUniversityBySlug.uoft).status).toBe("idle");
    expect(calculateUniversityGpa([{ grade: "80", weight: 0 }], caUniversityBySlug.uoft).status).toBe("error");
    expect(calculateUniversityGpa([{ grade: "?", weight: 1 }], caUniversityBySlug.uoft).status).toBe("error");
  });
});
