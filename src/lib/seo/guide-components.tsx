import { EzGrader } from "@/components/calculators/EzGrader";
import { TestGradeCalculator } from "@/components/calculators/TestGradeCalculator";
import { WeightedGradeCalculator } from "@/components/calculators/WeightedGradeCalculator";
import { FinalGradeCalculator } from "@/components/calculators/FinalGradeCalculator";
import { GpaCalculator } from "@/components/calculators/GpaCalculator";
import { CumulativeGpaCalculator } from "@/components/calculators/CumulativeGpaCalculator";
import type { CalculatorSlug } from "@/types/calculator";

const map: Partial<Record<CalculatorSlug, React.ComponentType>> = {
  "ez-grader": EzGrader,
  "test-grade-calculator": TestGradeCalculator,
  "weighted-grade-calculator": WeightedGradeCalculator,
  "final-grade-calculator": FinalGradeCalculator,
  "gpa-calculator": GpaCalculator,
  "cumulative-gpa-calculator": CumulativeGpaCalculator,
};

export function getEmbeddedCalculator(slug: CalculatorSlug) {
  const Component = map[slug];
  if (!Component) return null;
  return <Component />;
}
