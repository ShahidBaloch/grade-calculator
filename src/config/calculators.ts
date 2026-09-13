import type { CalculatorSlug, ExampleScenario } from "@/types/calculator";

export interface CalculatorConfig {
  slug: CalculatorSlug;
  name: string;
  shortName: string;
  description: string;
  path: string;
  icon: string;
  category: "grade" | "gpa" | "conversion";
  mvp: boolean;
  relatedSlugs: CalculatorSlug[];
  examples: ExampleScenario[];
}

export const calculators: CalculatorConfig[] = [
  {
    slug: "ez-grader",
    name: "EZ Grader",
    shortName: "EZ",
    description: "Grade tests quickly by number of questions and wrong answers.",
    path: "/ez-grader",
    icon: "CheckSquare",
    category: "grade",
    mvp: true,
    relatedSlugs: ["test-grade-calculator", "weighted-grade-calculator"],
    examples: [
      { label: "Perfect score", values: { totalQuestions: 20, wrongAnswers: 0 } },
      { label: "Typical quiz", values: { totalQuestions: 10, wrongAnswers: 2 } },
      { label: "Tough test", values: { totalQuestions: 25, wrongAnswers: 8 } },
    ],
  },
  {
    slug: "test-grade-calculator",
    name: "Test Grade Calculator",
    shortName: "Test",
    description: "Calculate test scores from correct answers or wrong answers.",
    path: "/test-grade-calculator",
    icon: "FileText",
    category: "grade",
    mvp: true,
    relatedSlugs: ["ez-grader", "weighted-grade-calculator"],
    examples: [
      { label: "15/20 correct", values: { totalQuestions: 20, correctAnswers: 15 } },
      { label: "With bonus", values: { totalQuestions: 10, correctAnswers: 9, bonusPoints: 5 } },
    ],
  },
  {
    slug: "weighted-grade-calculator",
    name: "Weighted Grade Calculator",
    shortName: "Weighted",
    description: "Calculate weighted course averages from assignments and exams.",
    path: "/weighted-grade-calculator",
    icon: "Scale",
    category: "grade",
    mvp: true,
    relatedSlugs: ["final-grade-calculator", "gpa-calculator"],
    examples: [
      {
        label: "3 assignments",
        values: { items: [{ score: 90, weight: 30 }, { score: 85, weight: 30 }, { score: 88, weight: 40 }] },
      },
    ],
  },
  {
    slug: "final-grade-calculator",
    name: "Final Grade Calculator",
    shortName: "Final",
    description: "Find what score you need on your final exam.",
    path: "/final-grade-calculator",
    icon: "Target",
    category: "grade",
    mvp: true,
    relatedSlugs: ["weighted-grade-calculator", "gpa-calculator"],
    examples: [
      { label: "Need 90% final", values: { currentGrade: 85, desiredGrade: 90, finalWeight: 40 } },
    ],
  },
  {
    slug: "gpa-calculator",
    name: "GPA Calculator",
    shortName: "GPA",
    description: "Calculate semester GPA from course grades and credit hours.",
    path: "/gpa-calculator",
    icon: "GraduationCap",
    category: "gpa",
    mvp: true,
    relatedSlugs: ["cumulative-gpa-calculator", "weighted-grade-calculator"],
    examples: [
      {
        label: "4 courses",
        values: {
          courses: [
            { grade: 90, credits: 3 },
            { grade: 85, credits: 3 },
            { grade: 88, credits: 4 },
            { grade: 92, credits: 3 },
          ],
        },
      },
    ],
  },
  {
    slug: "cumulative-gpa-calculator",
    name: "Cumulative GPA Calculator",
    shortName: "Cum. GPA",
    description: "Combine multiple semesters into an overall GPA.",
    path: "/cumulative-gpa-calculator",
    icon: "Layers",
    category: "gpa",
    mvp: true,
    relatedSlugs: ["gpa-calculator"],
    examples: [
      {
        label: "With prior GPA",
        values: { previousGpa: 3.5, previousCredits: 30 },
      },
    ],
  },
  {
    slug: "weighted-gpa-calculator",
    name: "Weighted GPA Calculator",
    shortName: "Wtd GPA",
    description: "Calculate weighted GPA with Honors (+0.5) and AP/IB (+1.0) course bonuses.",
    path: "/weighted-gpa-calculator",
    icon: "Award",
    category: "gpa",
    mvp: false,
    relatedSlugs: ["gpa-calculator", "high-school-gpa-calculator", "raise-gpa-calculator"],
    examples: [
      {
        label: "AP + Honors mix",
        values: {
          courses: [
            { grade: "A", credits: 3, courseType: "ap" },
            { grade: "B+", credits: 3, courseType: "honors" },
          ],
        },
      },
    ],
  },
  {
    slug: "raise-gpa-calculator",
    name: "Raise GPA Calculator",
    shortName: "Raise GPA",
    description: "Find what GPA you need in future courses to reach your target GPA.",
    path: "/raise-gpa-calculator",
    icon: "TrendingUp",
    category: "gpa",
    mvp: false,
    relatedSlugs: ["gpa-calculator", "cumulative-gpa-calculator", "weighted-gpa-calculator"],
    examples: [
      { label: "Reach 3.4", values: { currentGpa: 3.2, currentCredits: 60, targetGpa: 3.4, futureCredits: 30 } },
      { label: "Need 4.70", values: { currentGpa: 3.2, currentCredits: 60, targetGpa: 3.5, futureCredits: 15 } },
    ],
  },
  {
    slug: "high-school-gpa-calculator",
    name: "High School GPA Calculator",
    shortName: "HS GPA",
    description: "Calculate high school GPA by semester or quarter with optional weighted courses.",
    path: "/high-school-gpa-calculator",
    icon: "School",
    category: "gpa",
    mvp: false,
    relatedSlugs: ["weighted-gpa-calculator", "gpa-calculator", "raise-gpa-calculator"],
    examples: [
      {
        label: "Two semesters",
        values: {
          weighted: true,
          periods: [
            {
              name: "Fall",
              courses: [
                { name: "English", grade: "A", credits: 1, courseType: "regular" },
                { name: "Honors Algebra", grade: "B+", credits: 1, courseType: "honors" },
              ],
            },
            {
              name: "Spring",
              courses: [
                { name: "AP Biology", grade: "A-", credits: 1, courseType: "ap" },
                { name: "History", grade: "B", credits: 1, courseType: "regular" },
              ],
            },
          ],
        },
      },
    ],
  },
  {
    slug: "college-gpa-calculator",
    name: "College GPA Calculator",
    shortName: "College",
    description: "Calculate college semester GPA from course grades and credit hours.",
    path: "/college-gpa-calculator",
    icon: "Building",
    category: "gpa",
    mvp: false,
    relatedSlugs: ["gpa-calculator", "cumulative-gpa-calculator", "raise-gpa-calculator"],
    examples: [
      {
        label: "Lab-heavy term",
        values: {
          courses: [
            { name: "Intro to Psychology", grade: "A", credits: 3, countsTowardGpa: true },
            { name: "Calculus I", grade: "B+", credits: 4, countsTowardGpa: true },
            { name: "PE (pass/fail)", grade: "P", credits: 1, countsTowardGpa: false },
          ],
        },
      },
    ],
  },
  {
    slug: "percentage-to-letter-grade",
    name: "Percentage to Letter Grade",
    shortName: "% → Letter",
    description: "Convert a percentage score to a letter grade and GPA points.",
    path: "/percentage-to-letter-grade",
    icon: "ArrowRight",
    category: "conversion",
    mvp: false,
    relatedSlugs: ["letter-grade-calculator", "test-grade-calculator"],
    examples: [{ label: "85%", values: { percent: 85 } }],
  },
  {
    slug: "letter-grade-calculator",
    name: "Letter Grade Calculator",
    shortName: "Letter → %",
    description: "Convert a letter grade to its percentage equivalent and GPA points.",
    path: "/letter-grade-calculator",
    icon: "ArrowLeft",
    category: "conversion",
    mvp: false,
    relatedSlugs: ["percentage-to-letter-grade", "gpa-calculator"],
    examples: [{ label: "B+", values: { letter: "B+" } }],
  },
  {
    slug: "canvas-grade-calculator",
    name: "Canvas Grade Calculator",
    shortName: "Canvas",
    description: "Calculate your Canvas LMS course grade from weighted assignment groups.",
    path: "/canvas-grade-calculator",
    icon: "LayoutGrid",
    category: "grade",
    mvp: false,
    relatedSlugs: ["weighted-grade-calculator", "final-grade-calculator"],
    examples: [
      {
        label: "Typical Canvas course",
        values: {
          groups: [
            { name: "Assignments", weight: 30, score: 88 },
            { name: "Quizzes", weight: 20, score: 92 },
            { name: "Exams", weight: 50, score: 81 },
          ],
        },
      },
    ],
  },
  {
    slug: "eoc-grade-calculator",
    name: "EOC Grade Calculator",
    shortName: "EOC",
    description: "Find what score you need on your End-of-Course exam to reach your target grade.",
    path: "/eoc-grade-calculator",
    icon: "ClipboardCheck",
    category: "grade",
    mvp: false,
    relatedSlugs: ["final-grade-calculator", "weighted-grade-calculator"],
    examples: [
      { label: "Need 85%", values: { currentGrade: 82, eocWeight: 25, targetGrade: 85 } },
    ],
  },
  {
    slug: "degree-classification-calculator",
    name: "UK Degree Classification Calculator",
    shortName: "UK Class",
    description: "Predict First, 2:1, 2:2, or Third from credit-weighted UK module marks.",
    path: "/degree-classification-calculator",
    icon: "Award",
    category: "gpa",
    mvp: false,
    relatedSlugs: ["weighted-grade-calculator", "letter-grade-calculator", "gpa-calculator"],
    examples: [
      {
        label: "Typical law mix",
        values: {
          year2Weight: 40,
          year3Weight: 60,
          modules: [
            { name: "Public Law", mark: 68, credits: 30, year: 2 },
            { name: "Contract", mark: 64, credits: 30, year: 2 },
            { name: "Dissertation", mark: 72, credits: 40, year: 3 },
            { name: "Equity", mark: 66, credits: 20, year: 3 },
          ],
        },
      },
    ],
  },
  {
    slug: "atar-calculator",
    name: "ATAR Calculator",
    shortName: "ATAR",
    description: "Estimate an Australian ATAR from scaled subject scores (educational model).",
    path: "/atar-calculator",
    icon: "Target",
    category: "conversion",
    mvp: false,
    relatedSlugs: ["gpa-calculator", "letter-grade-calculator", "percentage-to-letter-grade"],
    examples: [
      {
        label: "Strong four",
        values: {
          subjects: [
            { name: "English", scaledScore: 88 },
            { name: "Methods", scaledScore: 86 },
            { name: "Chemistry", scaledScore: 84 },
            { name: "History", scaledScore: 82 },
          ],
          targetAtar: 90,
        },
      },
    ],
  },
  {
    slug: "gcse-grade-calculator",
    name: "GCSE Grade Calculator",
    shortName: "GCSE",
    description: "Convert a percentage to the England 9–1 GCSE scale (educational boundaries).",
    path: "/gcse-grade-calculator",
    icon: "Hash",
    category: "conversion",
    mvp: false,
    relatedSlugs: ["percentage-to-letter-grade", "degree-classification-calculator", "letter-grade-calculator"],
    examples: [
      { label: "Grade 7", values: { percent: 72 } },
      { label: "Standard pass", values: { percent: 42 } },
    ],
  },
];

export const calculatorBySlug = Object.fromEntries(
  calculators.map((c) => [c.slug, c]),
) as Record<CalculatorSlug, CalculatorConfig>;

export const mvpCalculators = calculators.filter((c) => c.mvp);

export const extendedCalculators = calculators.filter((c) => !c.mvp);

export function getCalculatorPath(slug: CalculatorSlug): string {
  return calculatorBySlug[slug].path;
}
