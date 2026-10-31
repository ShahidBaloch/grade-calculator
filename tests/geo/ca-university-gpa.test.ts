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
    expect(data.courses[1].omsas!.viaLetter).toBe("B+");
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

  it("Guelph credit-weighted average, letter and OMSAS Scale 3", () => {
    const data = valid(
      calculateUniversityGpa(
        [
          { grade: "84", weight: 0.5 },
          { grade: "77", weight: 0.5 },
          { grade: "91", weight: 0.5 },
          { grade: "72", weight: 0.5 },
          { grade: "88", weight: 0.25 },
        ],
        caUniversityBySlug.guelph,
      ),
    );
    // (84 + 77 + 91 + 72) × 0.5 + 88 × 0.25 = 184 ÷ 2.25
    expect(data.native).toEqual({ kind: "percent-average", value: expect.closeTo(81.78, 2), letter: "A-" });
    // 3.7 + 3.3 + 4.0 + 2.7 at OMSAS weight 1, 3.9 at 0.5
    expect(data.omsasGpa).toBeCloseTo(15.65 / 4.5, 5);
  });

  it("Guelph does not floor failing marks and rejects letters", () => {
    const data = valid(
      calculateUniversityGpa(
        [
          { grade: "20", weight: 0.5 },
          { grade: "80", weight: 0.5 },
        ],
        caUniversityBySlug.guelph,
      ),
    );
    expect(data.native.value).toBe(50);
    expect(calculateUniversityGpa([{ grade: "A", weight: 0.5 }], caUniversityBySlug.guelph).status).toBe("error");
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

  it("York GPA uses the 9-point scale and credit weights", () => {
    const data = valid(
      calculateUniversityGpa(
        [
          { grade: "84", weight: 3 },
          { grade: "77", weight: 3 },
          { grade: "B", weight: 6 },
          { grade: "68", weight: 3 },
        ],
        caUniversityBySlug.york,
      ),
    );
    // (8×3 + 7×3 + 6×6 + 5×3) ÷ 15
    expect(data.native).toEqual({ kind: "gpa", value: expect.closeTo(6.4, 5) });
    // OMSAS Scale 9 by letter (percentages bridged through York's table): (3.8 + 3.3 + 3.0×2 + 2.3) ÷ 5
    expect(data.omsasGpa).toBeCloseTo(3.08, 5);
    expect(data.courses[0].omsas!.viaLetter).toBe("A");
  });

  it("York keeps E (1 point) and F (0 points) apart; OMSAS gives both 0", () => {
    const e = valid(calculateUniversityGpa([{ grade: "E", weight: 3 }], caUniversityBySlug.york));
    const f = valid(calculateUniversityGpa([{ grade: "F", weight: 3 }], caUniversityBySlug.york));
    const e45 = valid(calculateUniversityGpa([{ grade: "45", weight: 3 }], caUniversityBySlug.york));
    expect(e.native.value).toBe(1);
    expect(f.native.value).toBe(0);
    expect(e45.native.value).toBe(1);
    expect(e.omsasGpa).toBe(0);
    expect(f.omsasGpa).toBe(0);
  });

  it("York has no minus grades", () => {
    expect(calculateUniversityGpa([{ grade: "A-", weight: 3 }], caUniversityBySlug.york).status).toBe("error");
  });

  it("U of T still reads a typed E as F", () => {
    const data = valid(calculateUniversityGpa([{ grade: "E", weight: 0.5 }], caUniversityBySlug.uoft));
    expect(data.native.value).toBe(0);
  });

  it("McMaster and Laurier use the 12-point table", () => {
    const mac = valid(
      calculateUniversityGpa(
        [
          { grade: "84", weight: 3 },
          { grade: "77", weight: 3 },
          { grade: "A", weight: 3 },
          { grade: "68", weight: 3 },
        ],
        caUniversityBySlug.mcmaster,
      ),
    );
    // (10 + 9 + 11 + 6) ÷ 4
    expect(mac.native.value).toBeCloseTo(9, 5);
    const laurier = valid(calculateUniversityGpa([{ grade: "90", weight: 0.5 }, { grade: "49", weight: 1 }], caUniversityBySlug.laurier));
    expect(laurier.native.value).toBeCloseTo((12 * 0.5) / 1.5, 5);
  });

  it("Queen's one-decimal bands: 84.9 is an A-, 85 an A", () => {
    expect(valid(calculateUniversityGpa([{ grade: "84.9", weight: 1 }], caUniversityBySlug.queens)).native.value).toBe(3.7);
    expect(valid(calculateUniversityGpa([{ grade: "85", weight: 1 }], caUniversityBySlug.queens)).native.value).toBe(4.0);
    expect(valid(calculateUniversityGpa([{ grade: "90", weight: 1 }], caUniversityBySlug.queens)).native.value).toBe(4.3);
  });

  it("uOttawa rounds the mark first and keeps E and F apart", () => {
    // 84.5 rounds to 85 → A (9); 84.4 stays 84 → A- (8)
    expect(valid(calculateUniversityGpa([{ grade: "84.5", weight: 3 }], caUniversityBySlug.uottawa)).native.value).toBe(9);
    expect(valid(calculateUniversityGpa([{ grade: "84.4", weight: 3 }], caUniversityBySlug.uottawa)).native.value).toBe(8);
    expect(valid(calculateUniversityGpa([{ grade: "E", weight: 3 }], caUniversityBySlug.uottawa)).native.value).toBe(1);
    expect(valid(calculateUniversityGpa([{ grade: "F", weight: 3 }], caUniversityBySlug.uottawa)).native.value).toBe(0);
    expect(calculateUniversityGpa([{ grade: "B-", weight: 3 }], caUniversityBySlug.uottawa).status).toBe("error");
  });

  it("Western counts marks below 40 as 40 in its average", () => {
    const data = valid(
      calculateUniversityGpa(
        [
          { grade: "84", weight: 0.5 },
          { grade: "76", weight: 0.5 },
          { grade: "91", weight: 0.5 },
          { grade: "68", weight: 0.5 },
          { grade: "35", weight: 0.5 },
        ],
        caUniversityBySlug.western,
      ),
    );
    expect(data.native).toEqual({ kind: "percent-average", value: expect.closeTo(71.8, 5), letter: "B" });
  });

  it("TMU rounds the percentage before the letter and has no OMSAS figure", () => {
    const pass = valid(calculateUniversityGpa([{ grade: "49.5", weight: 1 }], caUniversityBySlug.tmu));
    const fail = valid(calculateUniversityGpa([{ grade: "49.4", weight: 1 }], caUniversityBySlug.tmu));
    expect(pass.native.value).toBe(0.67);
    expect(fail.native.value).toBe(0);
    expect(pass.omsasGpa).toBeNull();
    expect(pass.courses[0].omsas).toBeNull();
  });

  it("SFU takes letter grades only", () => {
    const data = valid(
      calculateUniversityGpa(
        [
          { grade: "A-", weight: 3 },
          { grade: "B+", weight: 3 },
          { grade: "A", weight: 3 },
          { grade: "C+", weight: 4 },
        ],
        caUniversityBySlug.sfu,
      ),
    );
    // (3.67×3 + 3.33×3 + 4×3 + 2.33×4) ÷ 13
    expect(data.native.value).toBeCloseTo(42.32 / 13, 5);
    expect(calculateUniversityGpa([{ grade: "84", weight: 3 }], caUniversityBySlug.sfu).status).toBe("error");
    expect(calculateUniversityGpa([{ grade: "D+", weight: 3 }], caUniversityBySlug.sfu).status).toBe("error");
  });

  it("McGill truncates the GPA instead of rounding", () => {
    // (4.0×3 + 4.0×3 + 3.3×3) ÷ 9 = 3.7666… → 3.76 (rounding would give 3.77)
    const data = valid(
      calculateUniversityGpa(
        [
          { grade: "A", weight: 3 },
          { grade: "A", weight: 3 },
          { grade: "B+", weight: 3 },
        ],
        caUniversityBySlug.mcgill,
      ),
    );
    expect(data.native.value).toBe(3.76);
  });
});
