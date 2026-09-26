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
    mvp: true,
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
    relatedSlugs: [
      "middle-school-gpa-calculator",
      "uc-gpa-calculator",
      "weighted-gpa-calculator",
      "gpa-calculator",
    ],
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
    description:
      "Estimate an Australian ATAR from scaled subject scores (educational model). Does not convert ATAR to US GPA, university GPA, or UK degree class.",
    path: "/atar-calculator",
    icon: "Target",
    category: "conversion",
    mvp: false,
    relatedSlugs: ["weighted-grade-calculator", "letter-grade-calculator"],
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
  {
    slug: "cgpa-to-percentage",
    name: "CGPA to Percentage Calculator",
    shortName: "CGPA %",
    description:
      "Convert CGPA to percentage with CBSE ×9.5, campus formulas, or the unofficial Pakistan ×25 estimate.",
    path: "/cgpa-to-percentage",
    icon: "Percent",
    category: "conversion",
    mvp: false,
    relatedSlugs: ["percentage-to-cgpa", "sgpa-to-cgpa", "cgpa-calculator"],
    examples: [
      { label: "India 8.2 CGPA", values: { mode: "cgpa-to-percent", formulaId: "india-cbse-9.5", value: 8.2 } },
      { label: "Pakistan ×25 estimate", values: { mode: "cgpa-to-percent", formulaId: "pakistan-hec-25", value: 3.4 } },
      { label: "76% → CGPA", values: { mode: "percent-to-cgpa", formulaId: "india-cbse-9.5", value: 76 } },
    ],
  },
  {
    slug: "percentage-to-cgpa",
    name: "Percentage to CGPA Calculator",
    shortName: "% → CGPA",
    description:
      "Convert percentage marks to CGPA with CBSE ×9.5, campus formulas, or the unofficial Pakistan ×25 estimate.",
    path: "/percentage-to-cgpa",
    icon: "Percent",
    category: "conversion",
    mvp: false,
    relatedSlugs: ["cgpa-to-percentage", "cgpa-calculator", "sgpa-to-cgpa"],
    examples: [
      { label: "76% CBSE", values: { mode: "percent-to-cgpa", formulaId: "india-cbse-9.5", value: 76 } },
      { label: "85% ×25 estimate", values: { mode: "percent-to-cgpa", formulaId: "pakistan-hec-25", value: 85 } },
    ],
  },
  {
    slug: "sgpa-to-cgpa",
    name: "SGPA to CGPA Calculator",
    shortName: "SGPA→CGPA",
    description:
      "Combine semester SGPA values and credits into an overall credit-weighted CGPA.",
    path: "/sgpa-to-cgpa",
    icon: "Layers",
    category: "gpa",
    mvp: false,
    relatedSlugs: ["cgpa-calculator", "cgpa-to-percentage", "cumulative-gpa-calculator"],
    examples: [
      {
        label: "3 semesters",
        values: {
          terms: [
            { label: "Sem 1", sgpa: 8.2, credits: 22 },
            { label: "Sem 2", sgpa: 7.8, credits: 24 },
            { label: "Sem 3", sgpa: 8.5, credits: 23 },
          ],
        },
      },
    ],
  },
  {
    slug: "cgpa-calculator",
    name: "CGPA Calculator",
    shortName: "CGPA",
    description:
      "Calculate semester SGPA / CGPA from course grades and credits on India 10-point or Pakistan HEC scales.",
    path: "/cgpa-calculator",
    icon: "GraduationCap",
    category: "gpa",
    mvp: false,
    relatedSlugs: ["sgpa-to-cgpa", "cgpa-to-percentage", "cgpa-to-gpa"],
    examples: [
      {
        label: "India sample",
        values: {
          courses: [
            { name: "Physics", grade: "O", credits: 4 },
            { name: "Mathematics", grade: "A+", credits: 4 },
            { name: "Chemistry", grade: "A", credits: 3 },
          ],
        },
      },
    ],
  },
  {
    slug: "cgpa-to-gpa",
    name: "CGPA to GPA Converter (10 to 4.0)",
    shortName: "10→4 GPA",
    description:
      "Convert Indian 10-point CGPA to an estimated US 4.0 GPA for planning applications abroad.",
    path: "/cgpa-to-gpa",
    icon: "ArrowLeftRight",
    category: "conversion",
    mvp: false,
    relatedSlugs: ["cgpa-to-percentage", "cgpa-calculator", "gpa-calculator"],
    examples: [
      { label: "8.2 → 4.0", values: { cgpa: 8.2, methodId: "linear-0.4" } },
      { label: "Via % bridge", values: { cgpa: 8.2, methodId: "percent-bridge" } },
    ],
  },
  {
    slug: "mcmaster-gpa-to-us-gpa",
    name: "McMaster 12-Point GPA to US 4.0",
    shortName: "McMaster→US",
    description:
      "Convert McMaster University's 12-point GPA to a US 4.0 equivalent using McMaster's official lookup table — not ÷3.",
    path: "/mcmaster-gpa-to-us-gpa",
    icon: "ArrowLeftRight",
    category: "conversion",
    mvp: false,
    relatedSlugs: ["cgpa-to-gpa", "gpa-calculator", "college-gpa-calculator"],
    examples: [
      { label: "11 → 3.9", values: { mcmasterTwelve: 11 } },
      { label: "10 → 3.7", values: { mcmasterTwelve: 10 } },
    ],
  },
  {
    slug: "uk-degree-to-us-gpa-reference",
    name: "UK Degree Class to US GPA — Approximate Reference",
    shortName: "UK→US ref",
    description:
      "See how a UK First / 2:1 / 2:2 / Third might compare to a US 4.0 scale for planning only — not instructions to self-report on applications.",
    path: "/uk-degree-to-us-gpa-reference",
    icon: "ArrowLeftRight",
    category: "conversion",
    mvp: false,
    relatedSlugs: ["degree-classification-calculator", "letter-grade-calculator", "gpa-calculator"],
    examples: [
      { label: "2:1 reference", values: { mode: "classification", classification: "Upper Second (2:1)" } },
      { label: "65% → class", values: { mode: "percent", percent: 65 } },
    ],
  },
  {
    slug: "uc-gpa-calculator",
    name: "UC & CSU GPA Calculator",
    shortName: "UC/CSU",
    description:
      "Estimate a University of California or Cal State a-g GPA, including the honors-point cap. This is a planning estimate, not the official application GPA.",
    path: "/uc-gpa-calculator",
    icon: "Landmark",
    category: "gpa",
    mvp: false,
    relatedSlugs: ["high-school-gpa-calculator", "weighted-gpa-calculator", "gpa-calculator"],
    examples: [
      {
        label: "UC sample",
        values: {
          system: "uc",
          residency: "resident",
          courses: [
            { name: "English", grade: "A", year: "10", kind: "regular" },
            { name: "Honors Chemistry", grade: "A", year: "10", kind: "honors" },
            { name: "AP US History", grade: "B+", year: "11", kind: "ap-ib" },
            { name: "Math", grade: "B", year: "11", kind: "regular" },
          ],
        },
      },
    ],
  },
  {
    slug: "middle-school-gpa-calculator",
    name: "Middle School GPA Calculator",
    shortName: "MS GPA",
    description:
      "Calculate a middle school or junior high GPA. Every class counts equally. No credit hours and no Honors or AP bonus.",
    path: "/middle-school-gpa-calculator",
    icon: "School",
    category: "gpa",
    mvp: false,
    relatedSlugs: ["high-school-gpa-calculator", "gpa-calculator", "weighted-gpa-calculator"],
    examples: [
      {
        label: "Four classes",
        values: {
          classes: [
            { name: "English", grade: "A" },
            { name: "Math", grade: "B" },
            { name: "Science", grade: "A" },
            { name: "History", grade: "C" },
          ],
        },
      },
    ],
  },
];

export const calculatorBySlug = Object.fromEntries(
  calculators.map((c) => [c.slug, c]),
) as Record<CalculatorSlug, CalculatorConfig>;

export const mvpCalculators = calculators.filter((c) => c.mvp);

export const extendedCalculators = calculators.filter((c) => !c.mvp);

/** Public href. One URL per intent so country copies do not compete in search. */
export function getCalculatorPath(slug: CalculatorSlug): string {
  if (slug === "ez-grader") return "/";
  if (slug === "atar-calculator") return "/au/atar-calculator";
  if (slug === "degree-classification-calculator") return "/uk/degree-classification-calculator";
  return calculatorBySlug[slug].path;
}
