import type { CalculatorSlug } from "@/types/calculator";

export interface CalculatorResourceLinks {
  guide?: { path: string; title: string };
  gradingScale?: { path: string; title: string };
}

export const calculatorResourceLinks: Record<CalculatorSlug, CalculatorResourceLinks> = {
  "ez-grader": {
    gradingScale: { path: "/grading-scales/us", title: "US grading scale chart" },
  },
  "test-grade-calculator": {
    gradingScale: { path: "/grading-scales/us", title: "Letter grade chart" },
  },
  "weighted-grade-calculator": {
    guide: { path: "/guides/how-to-calculate-weighted-grades", title: "How to calculate weighted grades" },
    gradingScale: { path: "/grading-scales/us", title: "US grading scale" },
  },
  "final-grade-calculator": {
    guide: { path: "/guides/what-grade-do-i-need-on-my-final", title: "What grade do I need on my final?" },
    gradingScale: { path: "/grading-scales/us", title: "US grading scale" },
  },
  "gpa-calculator": {
    guide: { path: "/guides/how-to-calculate-gpa", title: "How to calculate GPA" },
    gradingScale: { path: "/grading-scales/us", title: "4.0 GPA scale" },
  },
  "cumulative-gpa-calculator": {
    guide: { path: "/guides/how-to-calculate-gpa", title: "How to calculate GPA" },
    gradingScale: { path: "/grading-scales/us", title: "4.0 GPA scale" },
  },
  "weighted-gpa-calculator": {
    guide: { path: "/guides/how-to-calculate-gpa", title: "How to calculate GPA" },
    gradingScale: { path: "/grading-scales/us", title: "4.0 GPA scale" },
  },
  "raise-gpa-calculator": {
    guide: { path: "/guides/how-to-calculate-gpa", title: "How to calculate GPA" },
    gradingScale: { path: "/grading-scales/us", title: "4.0 GPA scale" },
  },
  "high-school-gpa-calculator": {
    guide: { path: "/guides/how-to-calculate-gpa", title: "How to calculate GPA" },
    gradingScale: { path: "/grading-scales/us", title: "US grading scale" },
  },
  "college-gpa-calculator": {
    guide: { path: "/guides/how-to-calculate-gpa", title: "How to calculate GPA" },
    gradingScale: { path: "/grading-scales/us", title: "4.0 GPA scale" },
  },
  "percentage-to-letter-grade": {
    gradingScale: { path: "/grading-scales/us", title: "Letter grade chart" },
  },
  "letter-grade-calculator": {
    gradingScale: { path: "/grading-scales/us", title: "Letter grade chart" },
  },
  "canvas-grade-calculator": {
    guide: { path: "/guides/how-to-calculate-weighted-grades", title: "How weighted grades work" },
    gradingScale: { path: "/grading-scales/us", title: "US grading scale" },
  },
  "eoc-grade-calculator": {
    guide: { path: "/guides/what-grade-do-i-need-on-my-final", title: "Final exam planning" },
    gradingScale: { path: "/grading-scales/us", title: "US grading scale" },
  },
};
