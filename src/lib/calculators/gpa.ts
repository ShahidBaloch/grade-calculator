import { percentToLetter } from "@/lib/grading-scales";
import { gradeToGpaPoints, scoreToPercent } from "./grade-utils";
import type { ScaleId } from "@/types/grading-scale";
import type { CalculatorResult } from "./types";
import {
  gpaInputSchema,
  type CourseWeightType,
  type GpaInput,
} from "./schemas/gpa.schema";

const WEIGHTED_GPA_CAP = 5.0;

export function getWeightedGpaBump(courseType: CourseWeightType = "regular"): number {
  switch (courseType) {
    case "honors":
      return 0.5;
    case "ap":
    case "ib":
      return 1.0;
    default:
      return 0;
  }
}

export interface GpaCourseResult {
  name?: string;
  credits: number;
  grade: string | number;
  gpaPoints: number;
  qualityPoints: number;
}

export interface GpaResult {
  gpa: number;
  totalCredits: number;
  totalQualityPoints: number;
  courses: GpaCourseResult[];
}

export function calculateSemesterGpa(
  input: GpaInput,
  scaleId: ScaleId = "us-standard",
  options?: { useWeightedScale?: boolean },
): CalculatorResult<GpaResult> {
  const parsed = gpaInputSchema.safeParse(input);
  if (!parsed.success) {
    return { status: "error", errors: ["Invalid input"] };
  }

  const courses: GpaCourseResult[] = [];
  let totalCredits = 0;
  let totalQualityPoints = 0;
  const errors: string[] = [];

  for (const [index, course] of parsed.data.courses.entries()) {
    if (course.credits <= 0) {
      errors.push(`Course ${index + 1}: credits must be greater than 0`);
      continue;
    }

    let basePoints: number | null = null;
    if (typeof course.grade === "number") {
      basePoints = percentToLetter(course.grade, scaleId).gpa;
    } else {
      const percent = scoreToPercent(course.grade, scaleId);
      basePoints =
        percent != null ? percentToLetter(percent, scaleId).gpa : gradeToGpaPoints(course.grade, scaleId);
    }
    if (basePoints == null) {
      errors.push(`Course ${index + 1}: invalid grade`);
      continue;
    }

    let gpaPoints = basePoints;
    if (options?.useWeightedScale) {
      const bump = getWeightedGpaBump(course.courseType ?? "regular");
      gpaPoints = Math.min(basePoints + bump, WEIGHTED_GPA_CAP);
    }

    const qualityPoints = gpaPoints * course.credits;
    totalCredits += course.credits;
    totalQualityPoints += qualityPoints;

    courses.push({
      name: course.name,
      credits: course.credits,
      grade: course.grade,
      gpaPoints,
      qualityPoints,
    });
  }

  if (errors.length) {
    return { status: "error", errors };
  }

  if (totalCredits <= 0) {
    return { status: "idle", errors: ["Add at least one course with credits"] };
  }

  return {
    status: "valid",
    data: {
      gpa: totalQualityPoints / totalCredits,
      totalCredits,
      totalQualityPoints,
      courses,
    },
  };
}

export interface CollegeCourseInput {
  name?: string;
  grade: string | number;
  credits: number;
  countsTowardGpa?: boolean;
}

/** Letter-graded college term GPA — pass/fail and audits are excluded. */
export function calculateCollegeTermGpa(
  courses: CollegeCourseInput[],
  scaleId: ScaleId = "us-standard",
): CalculatorResult<GpaResult> {
  const letterGraded = courses.filter((course) => course.countsTowardGpa !== false);
  if (letterGraded.length === 0) {
    return { status: "error", errors: ["Add at least one letter-graded course"] };
  }
  return calculateSemesterGpa({ courses: letterGraded }, scaleId);
}
