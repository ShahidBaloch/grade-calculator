export type CalculatorStatus = "idle" | "valid" | "warning" | "error";

export type FinalGradeStatus = "achievable" | "impossible" | "already_met";

export interface CalculatorResult<T> {
  status: CalculatorStatus;
  data?: T;
  warnings?: string[];
  errors?: string[];
}

export type CalculatorSlug =
  | "ez-grader"
  | "test-grade-calculator"
  | "weighted-grade-calculator"
  | "final-grade-calculator"
  | "gpa-calculator"
  | "cumulative-gpa-calculator"
  | "weighted-gpa-calculator"
  | "raise-gpa-calculator"
  | "high-school-gpa-calculator"
  | "college-gpa-calculator"
  | "percentage-to-letter-grade"
  | "letter-grade-calculator"
  | "canvas-grade-calculator"
  | "eoc-grade-calculator"
  | "degree-classification-calculator"
  | "atar-calculator"
  | "gcse-grade-calculator"
  | "cgpa-to-percentage"
  | "percentage-to-cgpa"
  | "sgpa-to-cgpa"
  | "cgpa-calculator"
  | "cgpa-to-gpa"
  | "mcmaster-gpa-to-us-gpa"
  | "uk-degree-to-us-gpa-reference"
  | "uc-gpa-calculator"
  | "middle-school-gpa-calculator";

const CALCULATOR_SLUGS: CalculatorSlug[] = [
  "ez-grader",
  "test-grade-calculator",
  "weighted-grade-calculator",
  "final-grade-calculator",
  "gpa-calculator",
  "cumulative-gpa-calculator",
  "weighted-gpa-calculator",
  "raise-gpa-calculator",
  "high-school-gpa-calculator",
  "college-gpa-calculator",
  "percentage-to-letter-grade",
  "letter-grade-calculator",
  "canvas-grade-calculator",
  "eoc-grade-calculator",
  "degree-classification-calculator",
  "atar-calculator",
  "gcse-grade-calculator",
  "cgpa-to-percentage",
  "percentage-to-cgpa",
  "sgpa-to-cgpa",
  "cgpa-calculator",
  "cgpa-to-gpa",
  "mcmaster-gpa-to-us-gpa",
  "uk-degree-to-us-gpa-reference",
  "uc-gpa-calculator",
  "middle-school-gpa-calculator",
];

export function isCalculatorSlug(value: string): value is CalculatorSlug {
  return (CALCULATOR_SLUGS as string[]).includes(value);
}

export type CourseWeightType = "regular" | "honors" | "ap" | "ib";

export type FinalGradeMode =
  | "required"
  | "reverse"
  | "points"
  | "dropped-lowest";

export interface ExampleScenario {
  label: string;
  values: Record<string, unknown>;
}
