import type { CalculatorSlug } from "@/types/calculator";

export interface CalculatorResourceLinks {
  guide?: { path: string; title: string };
  gradingScale?: { path: string; title: string };
}

export const calculatorResourceLinks: Record<CalculatorSlug, CalculatorResourceLinks> = {
  "ez-grader": {
    guide: { path: "/guides/understanding-letter-grades", title: "Understanding letter grades" },
    gradingScale: { path: "/grading-scales", title: "Grading scales" },
  },
  "test-grade-calculator": {
    guide: { path: "/guides/understanding-letter-grades", title: "Understanding letter grades" },
    gradingScale: { path: "/grading-scales", title: "Letter grade charts" },
  },
  "weighted-grade-calculator": {
    guide: { path: "/guides/how-to-calculate-weighted-grades", title: "How to calculate weighted grades" },
    gradingScale: { path: "/grading-scales", title: "Grading scales" },
  },
  "final-grade-calculator": {
    guide: { path: "/guides/what-grade-do-i-need-on-my-final", title: "What grade do I need on my final?" },
    gradingScale: { path: "/grading-scales", title: "Grading scales" },
  },
  "gpa-calculator": {
    guide: { path: "/guides/how-to-calculate-gpa", title: "How to calculate GPA" },
    gradingScale: { path: "/grading-scales", title: "GPA scales" },
  },
  "cumulative-gpa-calculator": {
    guide: { path: "/guides/how-to-calculate-gpa", title: "How to calculate GPA" },
    gradingScale: { path: "/grading-scales", title: "GPA scales" },
  },
  "weighted-gpa-calculator": {
    guide: { path: "/guides/weighted-vs-unweighted-gpa", title: "Weighted vs unweighted GPA" },
    gradingScale: { path: "/grading-scales", title: "GPA scales" },
  },
  "raise-gpa-calculator": {
    guide: { path: "/guides/how-to-raise-your-gpa", title: "How to raise your GPA" },
    gradingScale: { path: "/grading-scales", title: "GPA scales" },
  },
  "high-school-gpa-calculator": {
    guide: { path: "/guides/how-to-calculate-gpa", title: "How to calculate GPA" },
    gradingScale: { path: "/grading-scales/us", title: "US grading scale" },
  },
  "college-gpa-calculator": {
    guide: { path: "/guides/how-to-calculate-gpa", title: "How to calculate GPA" },
    gradingScale: { path: "/grading-scales", title: "GPA scales" },
  },
  "percentage-to-letter-grade": {
    guide: { path: "/guides/understanding-letter-grades", title: "Understanding letter grades" },
    gradingScale: { path: "/grading-scales", title: "Letter grade charts" },
  },
  "letter-grade-calculator": {
    guide: { path: "/guides/understanding-letter-grades", title: "Understanding letter grades" },
    gradingScale: { path: "/grading-scales", title: "Letter grade charts" },
  },
  "canvas-grade-calculator": {
    guide: { path: "/guides/how-to-calculate-weighted-grades", title: "How weighted grades work" },
    gradingScale: { path: "/grading-scales", title: "Grading scales" },
  },
  "eoc-grade-calculator": {
    guide: { path: "/guides/what-grade-do-i-need-on-my-final", title: "Final exam planning" },
    gradingScale: { path: "/grading-scales/us", title: "US grading scale" },
  },
  "degree-classification-calculator": {
    guide: { path: "/guides/gpa-scale-explained", title: "GPA scale explained" },
    gradingScale: { path: "/grading-scales/uk", title: "UK degree classification scale" },
  },
  "atar-calculator": {
    guide: { path: "/guides/gpa-scale-explained", title: "GPA and rank scales" },
    gradingScale: { path: "/grading-scales/australia", title: "Australian grading scale" },
  },
  "gcse-grade-calculator": {
    guide: { path: "/guides/gcse-9-1-grades", title: "How GCSE 9–1 grades work" },
    gradingScale: { path: "/grading-scales/gcse", title: "UK GCSE 9–1 scale" },
  },
  "cgpa-to-percentage": {
    guide: { path: "/guides/cgpa-to-percentage", title: "How to convert CGPA to percentage" },
    gradingScale: { path: "/grading-scales/india", title: "India 10-point CGPA scale" },
  },
  "percentage-to-cgpa": {
    guide: { path: "/guides/cgpa-to-percentage", title: "How to convert CGPA to percentage" },
    gradingScale: { path: "/grading-scales/india", title: "India 10-point CGPA scale" },
  },
  "sgpa-to-cgpa": {
    guide: { path: "/guides/cgpa-to-percentage", title: "How to convert CGPA to percentage" },
    gradingScale: { path: "/grading-scales/india", title: "India 10-point CGPA scale" },
  },
  "cgpa-calculator": {
    guide: { path: "/guides/cgpa-to-percentage", title: "How to convert CGPA to percentage" },
    gradingScale: { path: "/grading-scales/india", title: "India 10-point CGPA scale" },
  },
  "cgpa-to-gpa": {
    guide: { path: "/guides/cgpa-to-percentage", title: "How to convert CGPA to percentage" },
    gradingScale: { path: "/grading-scales/india", title: "India 10-point CGPA scale" },
  },
};
