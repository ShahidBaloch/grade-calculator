import type { CalculatorSlug } from "@/types/calculator";

export interface EngagementFlow {
  from: CalculatorSlug;
  to: CalculatorSlug | "guide:final-exam-tips" | "guide:what-grade-do-i-need-on-my-final" | "grading-scales";
  title: string;
  description: string;
}

export const engagementFlows: EngagementFlow[] = [
  {
    from: "ez-grader",
    to: "weighted-grade-calculator",
    title: "Add this score to your course average",
    description: "Track multiple assignments with the weighted grade calculator.",
  },
  {
    from: "ez-grader",
    to: "test-grade-calculator",
    title: "Calculate from correct answers instead",
    description: "Switch to counting correct answers with optional bonus points.",
  },
  {
    from: "test-grade-calculator",
    to: "ez-grader",
    title: "Grade by number wrong instead",
    description: "Use the EZ grader chart for quick wrong-answer grading.",
  },
  {
    from: "weighted-grade-calculator",
    to: "final-grade-calculator",
    title: "What do you need on your final?",
    description: "Plan your final exam target based on your current average.",
  },
  {
    from: "weighted-grade-calculator",
    to: "gpa-calculator",
    title: "Convert to GPA",
    description: "See how your course average maps to GPA points.",
  },
  {
    from: "final-grade-calculator",
    to: "weighted-grade-calculator",
    title: "Recalculate with updated scores",
    description: "Update your weighted average after new assignments.",
  },
  {
    from: "final-grade-calculator",
    to: "guide:final-exam-tips",
    title: "Study tips for your target score",
    description: "Read our guide on preparing for your final exam.",
  },
  {
    from: "gpa-calculator",
    to: "cumulative-gpa-calculator",
    title: "Add previous semesters",
    description: "Combine this semester with your overall GPA.",
  },
  {
    from: "gpa-calculator",
    to: "weighted-grade-calculator",
    title: "Calculate course average first",
    description: "Build your GPA from individual assignment scores.",
  },
  {
    from: "cumulative-gpa-calculator",
    to: "gpa-calculator",
    title: "Calculate this semester's GPA",
    description: "Start with your current semester courses.",
  },
  {
    from: "weighted-gpa-calculator",
    to: "raise-gpa-calculator",
    title: "Plan your target GPA",
    description: "See what grades you need to reach your goal.",
  },
  {
    from: "raise-gpa-calculator",
    to: "gpa-calculator",
    title: "Calculate current semester GPA",
    description: "Start with your current course grades.",
  },
  {
    from: "high-school-gpa-calculator",
    to: "weighted-gpa-calculator",
    title: "Try weighted GPA",
    description: "Add Honors and AP course bonuses.",
  },
  {
    from: "college-gpa-calculator",
    to: "cumulative-gpa-calculator",
    title: "Add previous semesters",
    description: "Combine with your overall college GPA.",
  },
  {
    from: "percentage-to-letter-grade",
    to: "letter-grade-calculator",
    title: "Convert letter to percentage",
    description: "Go the other direction with our letter grade calculator.",
  },
  {
    from: "letter-grade-calculator",
    to: "percentage-to-letter-grade",
    title: "Convert percentage to letter",
    description: "Go the other direction with our percentage converter.",
  },
  {
    from: "canvas-grade-calculator",
    to: "weighted-grade-calculator",
    title: "Calculate with individual assignments",
    description: "Break down scores by assignment instead of groups.",
  },
  {
    from: "eoc-grade-calculator",
    to: "final-grade-calculator",
    title: "Try the full final grade calculator",
    description: "More modes including reverse and point-based grading.",
  },
  {
    from: "degree-classification-calculator",
    to: "weighted-grade-calculator",
    title: "Recalculate a single year average",
    description: "Use the weighted grade calculator if your handbook uses category weights instead of credits.",
  },
  {
    from: "atar-calculator",
    to: "gpa-calculator",
    title: "Switch to university GPA",
    description: "ATAR is a school-leaver rank. After you enrol, Australian GPA is usually a 7-point average.",
  },
  {
    from: "gcse-grade-calculator",
    to: "percentage-to-letter-grade",
    title: "Convert on another scale",
    description: "Use the percentage-to-letter tool if you need US, Canadian, or Australian bands instead.",
  },
  {
    from: "cgpa-to-percentage",
    to: "sgpa-to-cgpa",
    title: "Combine semester SGPAs",
    description: "Turn multiple SGPA values into an overall credit-weighted CGPA.",
  },
  {
    from: "cgpa-to-percentage",
    to: "cgpa-to-gpa",
    title: "Convert 10-point CGPA to US 4.0",
    description: "Estimate a 4.0 GPA for study-abroad planning.",
  },
  {
    from: "percentage-to-cgpa",
    to: "cgpa-calculator",
    title: "Calculate this semester’s SGPA",
    description: "Enter course grades and credits on the India or Pakistan scale.",
  },
  {
    from: "sgpa-to-cgpa",
    to: "cgpa-to-percentage",
    title: "Convert CGPA to percentage",
    description: "Apply CBSE ×9.5, ×10, SPPU, or Pakistan HEC ×25.",
  },
  {
    from: "cgpa-calculator",
    to: "sgpa-to-cgpa",
    title: "Roll into overall CGPA",
    description: "Add prior semester SGPAs and credits for a cumulative CGPA.",
  },
  {
    from: "cgpa-to-gpa",
    to: "cgpa-to-percentage",
    title: "Also convert to percentage",
    description: "Use India or Pakistan percentage formulas when a school asks for %.",
  },
];

export function getFlowsForCalculator(slug: CalculatorSlug): EngagementFlow[] {
  return engagementFlows.filter((flow) => flow.from === slug);
}

export function getPrimaryFlow(slug: CalculatorSlug): EngagementFlow | undefined {
  return getFlowsForCalculator(slug)[0];
}
