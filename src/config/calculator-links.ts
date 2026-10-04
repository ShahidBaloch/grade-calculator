import type { CalculatorSlug } from "@/types/calculator";
import { guideBySlug } from "@/config/guides";
import { gradingScaleBySlug } from "@/config/grading-scale-pages";

export interface CalculatorResourceLinks {
  guide?: { path: string; title: string };
  gradingScale?: { path: string; title: string };
}

function guide(slug: keyof typeof guideBySlug) {
  const g = guideBySlug[slug];
  return { path: g.path, title: g.title };
}

function scale(slug: keyof typeof gradingScaleBySlug) {
  const p = gradingScaleBySlug[slug];
  return { path: p.path, title: p.title };
}

const gradingScalesHub = { path: "/grading-scales", title: "Grading Scales by Country" };

export const calculatorResourceLinks: Record<CalculatorSlug, CalculatorResourceLinks> = {
  "ez-grader": {
    guide: guide("understanding-letter-grades"),
    gradingScale: gradingScalesHub,
  },
  "test-grade-calculator": {
    guide: guide("understanding-letter-grades"),
    gradingScale: gradingScalesHub,
  },
  "weighted-grade-calculator": {
    guide: guide("how-to-calculate-weighted-grades"),
    gradingScale: gradingScalesHub,
  },
  "final-grade-calculator": {
    guide: guide("what-grade-do-i-need-on-my-final"),
    gradingScale: gradingScalesHub,
  },
  "gpa-calculator": {
    guide: guide("how-to-calculate-gpa"),
    gradingScale: gradingScalesHub,
  },
  "cumulative-gpa-calculator": {
    guide: guide("how-to-calculate-gpa"),
    gradingScale: gradingScalesHub,
  },
  "weighted-gpa-calculator": {
    guide: guide("weighted-vs-unweighted-gpa"),
    gradingScale: gradingScalesHub,
  },
  "raise-gpa-calculator": {
    guide: guide("how-to-raise-your-gpa"),
    gradingScale: gradingScalesHub,
  },
  "high-school-gpa-calculator": {
    guide: guide("how-to-calculate-gpa"),
    gradingScale: scale("us"),
  },
  "college-gpa-calculator": {
    guide: guide("how-to-calculate-gpa"),
    gradingScale: gradingScalesHub,
  },
  "percentage-to-letter-grade": {
    guide: guide("understanding-letter-grades"),
    gradingScale: gradingScalesHub,
  },
  "letter-grade-calculator": {
    guide: guide("understanding-letter-grades"),
    gradingScale: gradingScalesHub,
  },
  "canvas-grade-calculator": {
    guide: guide("lms-course-grades-explained"),
    gradingScale: gradingScalesHub,
  },
  "eoc-grade-calculator": {
    guide: guide("what-grade-do-i-need-on-my-final"),
    gradingScale: scale("us"),
  },
  "degree-classification-calculator": {
    guide: guide("gpa-scale-explained"),
    gradingScale: scale("uk"),
  },
  "atar-calculator": {
    guide: guide("gpa-scale-explained"),
    gradingScale: scale("australia-uq"),
  },
  "gcse-grade-calculator": {
    guide: guide("gcse-9-1-grades"),
    gradingScale: scale("gcse"),
  },
  "cgpa-to-percentage": {
    guide: guide("cgpa-to-percentage"),
    gradingScale: scale("india"),
  },
  "percentage-to-cgpa": {
    guide: guide("cgpa-to-percentage"),
    gradingScale: scale("india"),
  },
  "sgpa-to-cgpa": {
    guide: guide("cgpa-to-percentage"),
    gradingScale: scale("india"),
  },
  "cgpa-calculator": {
    guide: guide("cgpa-to-percentage"),
    gradingScale: scale("india"),
  },
  "cgpa-to-gpa": {
    guide: guide("cgpa-to-percentage"),
    gradingScale: scale("india"),
  },
  "mcmaster-gpa-to-us-gpa": {
    guide: guide("gpa-scale-explained"),
    gradingScale: scale("canada"),
  },
  "uk-degree-to-us-gpa-reference": {
    guide: guide("gpa-scale-explained"),
    gradingScale: scale("uk"),
  },
  "uc-gpa-calculator": {
    guide: guide("how-to-calculate-gpa"),
    gradingScale: scale("us"),
  },
  "middle-school-gpa-calculator": {
    guide: guide("how-to-calculate-gpa"),
    gradingScale: scale("us"),
  },
};
