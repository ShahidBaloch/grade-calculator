import { EzGrader } from "@/components/calculators/EzGrader";
import { TestGradeCalculator } from "@/components/calculators/TestGradeCalculator";
import { WeightedGradeCalculator } from "@/components/calculators/WeightedGradeCalculator";
import { FinalGradeCalculator } from "@/components/calculators/FinalGradeCalculator";
import { GpaCalculator } from "@/components/calculators/GpaCalculator";
import { CumulativeGpaCalculator } from "@/components/calculators/CumulativeGpaCalculator";
import { WeightedGpaCalculator } from "@/components/calculators/WeightedGpaCalculator";
import { RaiseGpaCalculator } from "@/components/calculators/RaiseGpaCalculator";
import { HighSchoolGpaCalculator } from "@/components/calculators/HighSchoolGpaCalculator";
import { CollegeGpaCalculator } from "@/components/calculators/CollegeGpaCalculator";
import { PercentageToLetterCalculator } from "@/components/calculators/PercentageToLetterCalculator";
import { LetterGradeCalculator } from "@/components/calculators/LetterGradeCalculator";
import { CanvasGradeCalculator } from "@/components/calculators/CanvasGradeCalculator";
import { AverageGradeCalculator } from "@/components/calculators/AverageGradeCalculator";
import { GradeChartCalculator } from "@/components/calculators/GradeChartCalculator";
import { EocGradeCalculator } from "@/components/calculators/EocGradeCalculator";
import { DegreeClassificationCalculator } from "@/components/calculators/DegreeClassificationCalculator";
import { AtarCalculator } from "@/components/calculators/AtarCalculator";
import { GcseGradeCalculator } from "@/components/calculators/GcseGradeCalculator";
import { CgpaToPercentageCalculator } from "@/components/calculators/CgpaToPercentageCalculator";
import { PercentageToCgpaCalculator } from "@/components/calculators/PercentageToCgpaCalculator";
import { SgpaToCgpaCalculator } from "@/components/calculators/SgpaToCgpaCalculator";
import { CgpaCalculator } from "@/components/calculators/CgpaCalculator";
import { CgpaToGpaCalculator } from "@/components/calculators/CgpaToGpaCalculator";
import { McmasterGpaToUsCalculator } from "@/components/calculators/McmasterGpaToUsCalculator";
import { UkDegreeToUsGpaReferenceCalculator } from "@/components/calculators/UkDegreeToUsGpaReferenceCalculator";
import { UcCsuGpaCalculator } from "@/components/calculators/UcCsuGpaCalculator";
import { CsuGpaCalculator } from "@/components/calculators/CsuGpaCalculator";
import { MiddleSchoolGpaCalculator } from "@/components/calculators/MiddleSchoolGpaCalculator";
import { GradePercentageCalculator } from "@/components/calculators/GradePercentageCalculator";
import { CollegeGradeCalculator } from "@/components/calculators/CollegeGradeCalculator";
import { SemesterGradeCalculator } from "@/components/calculators/SemesterGradeCalculator";
import type { ComponentType } from "react";
import type { CalculatorSlug } from "@/types/calculator";

/**
 * Geo pages and guides pick a calculator by slug. Each calculator is its own island, so a page
 * only loads the chunk of the tool it renders.
 */
export const calculatorComponentBySlug: Record<CalculatorSlug, ComponentType> = {
  "ez-grader": EzGrader,
  "test-grade-calculator": TestGradeCalculator,
  "weighted-grade-calculator": WeightedGradeCalculator,
  "final-grade-calculator": FinalGradeCalculator,
  "gpa-calculator": GpaCalculator,
  "cumulative-gpa-calculator": CumulativeGpaCalculator,
  "weighted-gpa-calculator": WeightedGpaCalculator,
  "raise-gpa-calculator": RaiseGpaCalculator,
  "high-school-gpa-calculator": HighSchoolGpaCalculator,
  "college-gpa-calculator": CollegeGpaCalculator,
  "percentage-to-letter-grade": PercentageToLetterCalculator,
  "letter-grade-calculator": LetterGradeCalculator,
  "canvas-grade-calculator": CanvasGradeCalculator,
  "average-grade-calculator": AverageGradeCalculator,
  "grade-chart": GradeChartCalculator,
  "eoc-grade-calculator": EocGradeCalculator,
  "degree-classification-calculator": DegreeClassificationCalculator,
  "atar-calculator": AtarCalculator,
  "gcse-grade-calculator": GcseGradeCalculator,
  "cgpa-to-percentage": CgpaToPercentageCalculator,
  "percentage-to-cgpa": PercentageToCgpaCalculator,
  "sgpa-to-cgpa": SgpaToCgpaCalculator,
  "cgpa-calculator": CgpaCalculator,
  "cgpa-to-gpa": CgpaToGpaCalculator,
  "mcmaster-gpa-to-us-gpa": McmasterGpaToUsCalculator,
  "uk-degree-to-us-gpa-reference": UkDegreeToUsGpaReferenceCalculator,
  "uc-gpa-calculator": UcCsuGpaCalculator,
  "csu-gpa-calculator": CsuGpaCalculator,
  "middle-school-gpa-calculator": MiddleSchoolGpaCalculator,
  "grade-percentage-calculator": GradePercentageCalculator,
  "college-grade-calculator": CollegeGradeCalculator,
  "semester-grade-calculator": SemesterGradeCalculator,
};

export function CalculatorBySlug({ slug }: { slug: CalculatorSlug }) {
  const Component = calculatorComponentBySlug[slug];
  return <Component />;
}
