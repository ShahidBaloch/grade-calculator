import { describe, expect, it } from "vitest";
import { calculateAtar } from "@/lib/calculators/atar";

const subjects = [
  { scaledScore: 90 },
  { scaledScore: 88 },
  { scaledScore: 86 },
  { scaledScore: 84 },
  { scaledScore: 70 },
];

describe("calculateAtar authority models", () => {
  it("warns that ATAR must not be converted to GPA or UK classifications", () => {
    const result = calculateAtar({ subjects: [{ scaledScore: 80 }], authority: "generic" });
    expect(result.warnings?.some((w) => w.includes("Do not convert ATAR"))).toBe(true);
  });

  it("uses a QTAC-style best-five average when all subjects are General", () => {
    const result = calculateAtar({ subjects, authority: "qtac" });
    expect(result.data?.countedAverage).toBeCloseTo(83.6, 1);
  });

  it("warns when QTAC English eligibility is missing or below minimum C", () => {
    const withoutEnglish = calculateAtar({
      authority: "qtac",
      subjects: [{ name: "Chemistry", scaledScore: 80, qceType: "general" }],
    });
    expect(withoutEnglish.warnings?.some((w) => w.includes("eligible English"))).toBe(true);

    const ineligibleEnglish = calculateAtar({
      authority: "qtac",
      subjects: [
        { name: "English", scaledScore: 70, qceType: "general", qceEnglishEligible: false },
        { scaledScore: 80, qceType: "general" },
        { scaledScore: 78, qceType: "general" },
        { scaledScore: 76, qceType: "general" },
        { scaledScore: 74, qceType: "general" },
      ],
    });
    expect(ineligibleEnglish.warnings?.some((w) => w.includes("minimum C eligibility"))).toBe(true);
  });

  it("prefers four General plus one Applied for QTAC when it raises the aggregate", () => {
    const result = calculateAtar({
      authority: "qtac",
      subjects: [
        { scaledScore: 90, qceType: "general" },
        { scaledScore: 88, qceType: "general" },
        { scaledScore: 86, qceType: "general" },
        { scaledScore: 84, qceType: "general" },
        { scaledScore: 95, qceType: "applied" },
        { scaledScore: 70, qceType: "general" },
      ],
    });
    expect(result.data?.countedScores).toContain(95);
    expect(result.data?.countedAverage).toBeCloseTo(88.6, 1);
  });

  it("models UAC best-two English plus best-eight others", () => {
    const result = calculateAtar({
      authority: "uac",
      subjects: [
        { name: "English Advanced", scaledScore: 82, hscEnglish: true },
        { name: "English Extension 1", scaledScore: 78, hscEnglish: true, hscUnits: 1 },
        { name: "Mathematics", scaledScore: 90 },
        { name: "Physics", scaledScore: 88 },
        { name: "Chemistry", scaledScore: 86 },
        { name: "Modern History", scaledScore: 84 },
        { name: "Visual Arts", scaledScore: 70 },
      ],
    });
    // Units, not courses: English Advanced (2 units of 82) + best 8 remaining units (90, 88, 86, 84 × 2)
    expect(result.data?.countedAverage).toBeCloseTo((82 * 2 + (90 + 88 + 86 + 84) * 2) / 10, 5);
    expect(result.data?.formulaSteps[1]).toMatch(/best two units of English/i);
  });

  it("UAC lets a second English course fill the remaining eight units", () => {
    const result = calculateAtar({
      authority: "uac",
      subjects: [
        { name: "English Advanced", scaledScore: 80 },
        { name: "English Extension 1", scaledScore: 95, hscUnits: 1 },
        { name: "Mathematics", scaledScore: 90 },
        { name: "Physics", scaledScore: 85 },
        { name: "Chemistry", scaledScore: 75 },
        { name: "Economics", scaledScore: 70 },
      ],
    });
    // Best 2 English units: 95 (Ext, 1 unit) + 80 (one unit of Advanced); best 8 remaining:
    // 90×2, 85×2, 80 (other Advanced unit), 75×2, 70 — UAC counts the best units wherever they sit.
    expect(result.data?.countedAverage).toBeCloseTo((95 + 80 + 90 * 2 + 85 * 2 + 80 + 75 * 2 + 70) / 10, 5);
  });

  it("UAC: unticking English overrides an English subject name", () => {
    const tagged = calculateAtar({
      authority: "uac",
      subjects: [
        { name: "English Studies", scaledScore: 60, hscEnglish: false },
        { name: "Mathematics", scaledScore: 90 },
      ],
    });
    // No English units counted at all; both courses compete for the remaining units.
    expect(tagged.data?.countedScores.slice(0, 2)).toEqual([90, 90]);
  });

  it("models SATAC 90-credit aggregate (three TAS + flexible 30)", () => {
    const result = calculateAtar({ subjects, authority: "satac" });
    expect(result.data?.countedAverage).toBeCloseTo(84.33, 1);
    expect(result.data?.formulaSteps[1]).toMatch(/90 credits/i);
    expect(result.data?.planningAtarRounded).toBeNull();
  });

  it("rounds planning ATAR to a whole number for non-SATAC authorities", () => {
    const result = calculateAtar({ subjects: [{ scaledScore: 80 }], authority: "generic" });
    expect(result.data?.planningAtarRounded).toBe(Math.round(result.data!.estimatedAtar));
  });

  it("adds TISC WACE bonuses for LOTE, Methods, and Specialist", () => {
    const result = calculateAtar({
      authority: "tisc",
      subjects: [
        { scaledScore: 80, waceBonus: "none" },
        { scaledScore: 78, waceBonus: "none" },
        { scaledScore: 76, waceBonus: "none" },
        { scaledScore: 74, waceBonus: "none" },
        { scaledScore: 90, waceBonus: "lote" },
        { scaledScore: 88, waceBonus: "maths-methods" },
        { scaledScore: 86, waceBonus: "maths-specialist" },
      ],
    });
    // TISC: best four of ALL scaled scores (90, 88, 86, 80) + 10% bonuses (9 + 8.8 + 8.6),
    // even though the bonus courses are also in the best four: 370.4 ÷ 4.3
    expect(result.data?.countedAverage).toBeCloseTo(370.4 / 4.3, 5);
    expect(result.data?.formulaSteps[1]).toMatch(/Mathematics Specialist/i);
  });

  it("VTAC primary four always includes the best English-group study", () => {
    const result = calculateAtar({
      authority: "vtac",
      subjects: [
        { name: "Specialist Mathematics", scaledScore: 90 },
        { name: "Chemistry", scaledScore: 88 },
        { name: "Physics", scaledScore: 86 },
        { name: "Methods", scaledScore: 84 },
        { name: "English", scaledScore: 60 },
      ],
    });
    // English (60) + next best three (90, 88, 86) in full, then 10% of the fifth (84)
    expect(result.data?.countedScores.slice(0, 4)).toEqual([60, 90, 88, 86]);
    expect(result.data?.countedScores[4]).toBeCloseTo(8.4, 5);
    expect(result.warnings?.some((w) => w.includes("English-group study"))).toBe(false);

    const noEnglish = calculateAtar({ authority: "vtac", subjects });
    expect(noEnglish.warnings?.some((w) => w.includes("English-group study"))).toBe(true);
  });

  it("uses a VTAC-style primary-four aggregate with up to two 10% increments", () => {
    const result = calculateAtar({
      subjects: [...subjects, { scaledScore: 60 }],
      authority: "vtac",
    });
    expect(result.data?.countedAverage).toBeGreaterThan(80);
    expect(result.data?.formulaSteps[1]).toMatch(/up to two 10% increments/i);
    expect(result.data?.countedScores).toHaveLength(6);
    expect(result.data?.countedScores[4]).toBeCloseTo(7, 1);
    expect(result.data?.countedScores[5]).toBeCloseTo(6, 1);
  });
});
