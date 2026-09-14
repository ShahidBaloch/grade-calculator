import { AtarCalculator } from "@/components/calculators/AtarCalculator";
import { CanvasGradeCalculator } from "@/components/calculators/CanvasGradeCalculator";
import { CgpaToPercentageCalculator } from "@/components/calculators/CgpaToPercentageCalculator";
import { CollegeGpaCalculator } from "@/components/calculators/CollegeGpaCalculator";
import { CumulativeGpaCalculator } from "@/components/calculators/CumulativeGpaCalculator";
import { DegreeClassificationCalculator } from "@/components/calculators/DegreeClassificationCalculator";
import { EocGradeCalculator } from "@/components/calculators/EocGradeCalculator";
import { EzGrader } from "@/components/calculators/EzGrader";
import { FinalGradeCalculator } from "@/components/calculators/FinalGradeCalculator";
import { GcseGradeCalculator } from "@/components/calculators/GcseGradeCalculator";
import { GpaCalculator } from "@/components/calculators/GpaCalculator";
import { HighSchoolGpaCalculator } from "@/components/calculators/HighSchoolGpaCalculator";
import { LetterGradeCalculator } from "@/components/calculators/LetterGradeCalculator";
import { PercentageToLetterCalculator } from "@/components/calculators/PercentageToLetterCalculator";
import { RaiseGpaCalculator } from "@/components/calculators/RaiseGpaCalculator";
import { TestGradeCalculator } from "@/components/calculators/TestGradeCalculator";
import { WeightedGradeCalculator } from "@/components/calculators/WeightedGradeCalculator";
import { WeightedGpaCalculator } from "@/components/calculators/WeightedGpaCalculator";
import type { CalculatorSlug } from "@/types/calculator";

export const calculatorComponentBySlug: Record<CalculatorSlug, React.ComponentType> = {
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
  "eoc-grade-calculator": EocGradeCalculator,
  "degree-classification-calculator": DegreeClassificationCalculator,
  "atar-calculator": AtarCalculator,
  "gcse-grade-calculator": GcseGradeCalculator,
  "cgpa-to-percentage": CgpaToPercentageCalculator,
};

export function getCalculatorElement(slug: CalculatorSlug) {
  const Component = calculatorComponentBySlug[slug];
  return <Component />;
}
