import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { CalculatorSlug } from "@/types/calculator";

/**
 * Geo pages and guides pick a calculator by slug. Dynamic imports keep each route's bundle to
 * the one tool it renders (static imports shipped all 30 to every geo page). SSR is unchanged.
 */
export const calculatorComponentBySlug: Record<CalculatorSlug, ComponentType> = {
  "ez-grader": dynamic(() => import("@/components/calculators/EzGrader").then((m) => m.EzGrader)),
  "test-grade-calculator": dynamic(() => import("@/components/calculators/TestGradeCalculator").then((m) => m.TestGradeCalculator)),
  "weighted-grade-calculator": dynamic(() => import("@/components/calculators/WeightedGradeCalculator").then((m) => m.WeightedGradeCalculator)),
  "final-grade-calculator": dynamic(() => import("@/components/calculators/FinalGradeCalculator").then((m) => m.FinalGradeCalculator)),
  "gpa-calculator": dynamic(() => import("@/components/calculators/GpaCalculator").then((m) => m.GpaCalculator)),
  "cumulative-gpa-calculator": dynamic(() => import("@/components/calculators/CumulativeGpaCalculator").then((m) => m.CumulativeGpaCalculator)),
  "weighted-gpa-calculator": dynamic(() => import("@/components/calculators/WeightedGpaCalculator").then((m) => m.WeightedGpaCalculator)),
  "raise-gpa-calculator": dynamic(() => import("@/components/calculators/RaiseGpaCalculator").then((m) => m.RaiseGpaCalculator)),
  "high-school-gpa-calculator": dynamic(() => import("@/components/calculators/HighSchoolGpaCalculator").then((m) => m.HighSchoolGpaCalculator)),
  "college-gpa-calculator": dynamic(() => import("@/components/calculators/CollegeGpaCalculator").then((m) => m.CollegeGpaCalculator)),
  "percentage-to-letter-grade": dynamic(() => import("@/components/calculators/PercentageToLetterCalculator").then((m) => m.PercentageToLetterCalculator)),
  "letter-grade-calculator": dynamic(() => import("@/components/calculators/LetterGradeCalculator").then((m) => m.LetterGradeCalculator)),
  "canvas-grade-calculator": dynamic(() => import("@/components/calculators/CanvasGradeCalculator").then((m) => m.CanvasGradeCalculator)),
  "average-grade-calculator": dynamic(() => import("@/components/calculators/AverageGradeCalculator").then((m) => m.AverageGradeCalculator)),
  "grade-chart": dynamic(() => import("@/components/calculators/GradeChartCalculator").then((m) => m.GradeChartCalculator)),
  "eoc-grade-calculator": dynamic(() => import("@/components/calculators/EocGradeCalculator").then((m) => m.EocGradeCalculator)),
  "degree-classification-calculator": dynamic(() => import("@/components/calculators/DegreeClassificationCalculator").then((m) => m.DegreeClassificationCalculator)),
  "atar-calculator": dynamic(() => import("@/components/calculators/AtarCalculator").then((m) => m.AtarCalculator)),
  "gcse-grade-calculator": dynamic(() => import("@/components/calculators/GcseGradeCalculator").then((m) => m.GcseGradeCalculator)),
  "cgpa-to-percentage": dynamic(() => import("@/components/calculators/CgpaToPercentageCalculator").then((m) => m.CgpaToPercentageCalculator)),
  "percentage-to-cgpa": dynamic(() => import("@/components/calculators/PercentageToCgpaCalculator").then((m) => m.PercentageToCgpaCalculator)),
  "sgpa-to-cgpa": dynamic(() => import("@/components/calculators/SgpaToCgpaCalculator").then((m) => m.SgpaToCgpaCalculator)),
  "cgpa-calculator": dynamic(() => import("@/components/calculators/CgpaCalculator").then((m) => m.CgpaCalculator)),
  "cgpa-to-gpa": dynamic(() => import("@/components/calculators/CgpaToGpaCalculator").then((m) => m.CgpaToGpaCalculator)),
  "mcmaster-gpa-to-us-gpa": dynamic(() => import("@/components/calculators/McmasterGpaToUsCalculator").then((m) => m.McmasterGpaToUsCalculator)),
  "uk-degree-to-us-gpa-reference": dynamic(() => import("@/components/calculators/UkDegreeToUsGpaReferenceCalculator").then((m) => m.UkDegreeToUsGpaReferenceCalculator)),
  "uc-gpa-calculator": dynamic(() => import("@/components/calculators/UcCsuGpaCalculator").then((m) => m.UcCsuGpaCalculator)),
  "csu-gpa-calculator": dynamic(() => import("@/components/calculators/CsuGpaCalculator").then((m) => m.CsuGpaCalculator)),
  "middle-school-gpa-calculator": dynamic(() => import("@/components/calculators/MiddleSchoolGpaCalculator").then((m) => m.MiddleSchoolGpaCalculator)),
  "grade-percentage-calculator": dynamic(() => import("@/components/calculators/GradePercentageCalculator").then((m) => m.GradePercentageCalculator)),
  "college-grade-calculator": dynamic(() => import("@/components/calculators/CollegeGradeCalculator").then((m) => m.CollegeGradeCalculator)),
};

export function getCalculatorElement(slug: CalculatorSlug) {
  const Component = calculatorComponentBySlug[slug];
  return <Component />;
}
