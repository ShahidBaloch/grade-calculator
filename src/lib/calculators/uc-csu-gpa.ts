import type { CalculatorResult } from "@/types/calculator";

export type UcCsuSystem = "uc" | "csu";
export type UcResidency = "resident" | "nonresident";
export type AgYear = "10" | "11" | "12";
export type AgCourseKind = "regular" | "honors" | "ap-ib" | "college";

export interface AgCourseInput {
  name?: string;
  grade: string;
  year: AgYear;
  kind: AgCourseKind;
}

export interface UcCsuGpaInput {
  system: UcCsuSystem;
  /** Used for UC only. CSU uses the same honors types for California applicants. */
  residency?: UcResidency;
  courses: AgCourseInput[];
}

interface ParsedGrade {
  base: number;
  ucHonors: boolean;
  csuHonors: boolean;
}

const GRADES: Record<string, ParsedGrade> = {
  "A+": { base: 4, ucHonors: true, csuHonors: true },
  A: { base: 4, ucHonors: true, csuHonors: true },
  "A-": { base: 4, ucHonors: true, csuHonors: true },
  "B+": { base: 3, ucHonors: true, csuHonors: true },
  B: { base: 3, ucHonors: true, csuHonors: true },
  "B-": { base: 3, ucHonors: true, csuHonors: true },
  "C+": { base: 2, ucHonors: true, csuHonors: true },
  C: { base: 2, ucHonors: true, csuHonors: true },
  "C-": { base: 2, ucHonors: false, csuHonors: true },
  "D+": { base: 1, ucHonors: false, csuHonors: false },
  D: { base: 1, ucHonors: false, csuHonors: false },
  "D-": { base: 1, ucHonors: false, csuHonors: false },
  F: { base: 0, ucHonors: false, csuHonors: false },
};

export interface UcCsuGpaResult {
  gpa: number;
  unweightedGpa: number;
  gradePoints: number;
  honorsPoints: number;
  totalPoints: number;
  courseCount: number;
  honorsEligible: number;
  grade10Cap: number;
  totalCap: number;
}

function parseGrade(grade: string): ParsedGrade | null {
  const key = grade.trim().toUpperCase();
  return GRADES[key] ?? null;
}

function yearCounts(system: UcCsuSystem, year: AgYear): boolean {
  if (system === "uc") return year === "10" || year === "11";
  return year === "10" || year === "11" || year === "12";
}

function kindCanEarnHonors(
  system: UcCsuSystem,
  residency: UcResidency,
  kind: AgCourseKind,
): boolean {
  if (kind === "regular") return false;
  if (system === "uc" && residency === "nonresident") return kind === "ap-ib";
  return kind === "honors" || kind === "ap-ib" || kind === "college";
}

export function calculateUcCsuGpa(input: UcCsuGpaInput): CalculatorResult<UcCsuGpaResult> {
  const system: UcCsuSystem = input.system === "csu" ? "csu" : "uc";
  const residency: UcResidency = input.residency === "nonresident" ? "nonresident" : "resident";
  const warnings: string[] = [];

  if (!Array.isArray(input.courses) || input.courses.length === 0) {
    return { status: "idle" };
  }

  let skippedTwelfth = 0;
  let skippedNonresidentHonors = 0;
  let invalid = 0;
  let blank = 0;

  const counted: Array<{ year: AgYear; base: number; honors: boolean }> = [];

  for (const course of input.courses) {
    const gradeText = course.grade?.trim() ?? "";
    if (!gradeText) {
      blank += 1;
      continue;
    }
    const parsed = parseGrade(gradeText);
    if (!parsed) {
      invalid += 1;
      continue;
    }
    if (!yearCounts(system, course.year)) {
      skippedTwelfth += 1;
      continue;
    }

    const gradeAllows = system === "uc" ? parsed.ucHonors : parsed.csuHonors;
    const kindAllows = kindCanEarnHonors(system, residency, course.kind);
    if (
      system === "uc" &&
      residency === "nonresident" &&
      (course.kind === "honors" || course.kind === "college") &&
      gradeAllows
    ) {
      skippedNonresidentHonors += 1;
    }

    counted.push({
      year: course.year,
      base: parsed.base,
      honors: gradeAllows && kindAllows,
    });
  }

  if (invalid > 0 && counted.length === 0) {
    return { status: "error", errors: ["Use a letter grade from A+ through F."] };
  }

  if (counted.length === 0) {
    return { status: "idle" };
  }

  const grade10Cap = system === "uc" ? 4 : 2;
  const totalCap = 8;
  const eligible10 = counted.filter((course) => course.honors && course.year === "10").length;
  const eligibleLater = counted.filter((course) => course.honors && course.year !== "10").length;
  const awarded10 = Math.min(eligible10, grade10Cap, totalCap);
  const awardedLater = Math.min(eligibleLater, totalCap - awarded10);
  const honorsPoints = awarded10 + awardedLater;
  const honorsEligible = eligible10 + eligibleLater;

  const gradePoints = counted.reduce((sum, course) => sum + course.base, 0);
  const totalPoints = gradePoints + honorsPoints;
  const courseCount = counted.length;

  if (skippedTwelfth > 0) {
    warnings.push(
      "12th-grade rows are left out of the UC GPA. UC uses a-g grades from the summer after 9th grade through the summer after 11th.",
    );
  }
  if (honorsEligible > honorsPoints) {
    warnings.push(
      `Honors points are capped at ${honorsPoints} of ${honorsEligible} eligible semesters (${grade10Cap} from 10th grade, ${totalCap} total).`,
    );
  }
  if (skippedNonresidentHonors > 0) {
    warnings.push(
      "For the nonresident UC minimum, only AP and IB courses get an extra point. School honors and college courses stay at regular points.",
    );
  }
  if (blank > 0 && counted.length > 0) {
    warnings.push("Blank rows are ignored.");
  }

  return {
    status: warnings.length ? "warning" : "valid",
    warnings,
    data: {
      gpa: totalPoints / courseCount,
      unweightedGpa: gradePoints / courseCount,
      gradePoints,
      honorsPoints,
      totalPoints,
      courseCount,
      honorsEligible,
      grade10Cap,
      totalCap,
    },
  };
}
