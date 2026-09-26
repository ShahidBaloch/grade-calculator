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
        { name: "English Extension", scaledScore: 78, hscEnglish: true },
        { name: "Mathematics", scaledScore: 90 },
        { name: "Physics", scaledScore: 88 },
        { name: "Chemistry", scaledScore: 86 },
        { name: "Modern History", scaledScore: 84 },
        { name: "Visual Arts", scaledScore: 70 },
      ],
    });
    expect(result.data?.countedAverage).toBeCloseTo(82.57, 1);
    expect(result.data?.formulaSteps[1]).toMatch(/best two units of English/i);
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
    expect(result.data?.countedAverage).toBeCloseTo(77.77, 1);
    expect(result.data?.formulaSteps[1]).toMatch(/Mathematics Specialist/i);
  });

  it("uses a VTAC-style primary-four aggregate with up to two 10% increments", () => {
    const result = calculateAtar({
      subjects: [...subjects, { scaledScore: 60 }],
      authority: "vtac",
    });
    expect(result.data?.countedAverage).toBeGreaterThan(80);
    expect(result.data?.formulaSteps[1]).toMatch(/two permitted 10% increments/i);
    expect(result.data?.countedScores).toHaveLength(6);
    expect(result.data?.countedScores[4]).toBeCloseTo(7, 1);
    expect(result.data?.countedScores[5]).toBeCloseTo(6, 1);
  });
});
