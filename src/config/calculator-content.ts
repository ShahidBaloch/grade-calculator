import type { CalculatorSlug } from "@/types/calculator";
import type { FaqItem } from "@/types/seo";

export interface CalculatorContent {
  howItWorks: string[];
  formula: string;
  workedExample: string;
  faqs: FaqItem[];
}

export const calculatorContent: Record<CalculatorSlug, CalculatorContent> = {
  "ez-grader": {
    howItWorks: [
      "Enter the total number of questions on your quiz or test.",
      "Enter how many answers were wrong.",
      "Your score, percentage, and letter grade update instantly.",
    ],
    formula: "Score % = (Correct ÷ Total) × 100",
    workedExample:
      "A 10-question quiz with 2 wrong answers: 8 correct → 80% → typically a B− on the US scale.",
    faqs: [
      {
        question: "How do I grade a test quickly?",
        answer:
          "Enter total questions and wrong answers. The EZ grader shows the percentage and letter grade immediately, plus a full chart for every wrong-count.",
      },
      {
        question: "Can teachers use this as an easy grader?",
        answer:
          "Yes. Teachers use it to score quizzes in seconds without login. Print the grading chart for your desk.",
      },
      {
        question: "What grading scale is used?",
        answer:
          "We default to the US Standard 4.0 scale. Your region may be detected automatically, or you can pick a different scale in the calculator settings.",
      },
    ],
  },
  "test-grade-calculator": {
    howItWorks: [
      "Choose whether you count correct or wrong answers.",
      "Enter total questions and your count.",
      "Add optional bonus points if your teacher offers extra credit.",
    ],
    formula: "Score % = (Correct ÷ Total) × 100 + Bonus (max 100%)",
    workedExample: "18 correct out of 20 with 2 bonus points: 90% + 2 = 92%.",
    faqs: [
      {
        question: "How is a test grade calculated?",
        answer: "Divide correct answers by total questions and multiply by 100. Add bonus points if applicable.",
      },
      {
        question: "What if bonus pushes me over 100%?",
        answer: "We cap the displayed score at 100% and note that bonus points were included.",
      },
    ],
  },
  "weighted-grade-calculator": {
    howItWorks: [
      "Add each assignment, quiz, or exam with its score and weight.",
      "Use percentage weights (should total 100%) or point weights.",
      "See your weighted course average and letter grade.",
    ],
    formula: "Weighted avg = Σ(Score × Weight) ÷ Σ(Weight)",
    workedExample: "Homework 92% (20%), Midterm 85% (30%), Final 88% (50%) → 87.9%.",
    faqs: [
      {
        question: "What is a weighted grade?",
        answer:
          "A weighted grade gives different categories different importance. A final exam might count more than homework.",
      },
      {
        question: "My weights don't add to 100%. Is that OK?",
        answer: "We still calculate the average but show a warning. Ask your teacher how weights are defined.",
      },
    ],
  },
  "final-grade-calculator": {
    howItWorks: [
      "Enter your current course grade and how much the final is worth.",
      "Enter the grade you want in the class.",
      "See the minimum final exam score you need.",
    ],
    formula: "Required = (Target − Current × (1 − w)) ÷ w, where w = final weight",
    workedExample: "Current 85%, want 90%, final worth 40% → you need 97.5% on the final.",
    faqs: [
      {
        question: "What grade do I need on my final?",
        answer:
          "Enter your current grade, target grade, and final weight. The calculator solves for the required final exam score.",
      },
      {
        question: "What if it says impossible?",
        answer:
          "That means even a perfect final cannot reach your target. Consider adjusting your goal or improving other assignments.",
      },
      {
        question: "Does this support RogerHub-style modes?",
        answer:
          "Yes. Switch modes to predict your overall grade, use point-based grading, or drop your lowest test score.",
      },
    ],
  },
  "gpa-calculator": {
    howItWorks: [
      "Add each course with letter grade and credit hours.",
      "We convert grades to GPA points using your grading scale.",
      "Your semester GPA is quality points divided by total credits.",
    ],
    formula: "GPA = Σ(GPA points × Credits) ÷ Σ(Credits)",
    workedExample: "An A (4.0) in 3 credits and a B (3.0) in 3 credits → GPA 3.50.",
    faqs: [
      {
        question: "How do I calculate semester GPA?",
        answer: "Multiply each course's GPA points by credits, sum them, and divide by total credits.",
      },
      {
        question: "Is this weighted GPA?",
        answer: "This version uses standard letter-to-GPA conversion. For Honors/AP weighting, use our Weighted GPA Calculator.",
      },
    ],
  },
  "cumulative-gpa-calculator": {
    howItWorks: [
      "Optionally enter your previous cumulative GPA and total credits.",
      "Add your current semester courses with grades and credits.",
      "See your updated overall GPA.",
    ],
    formula: "Cumulative GPA = (Prior QP + Current QP) ÷ Total Credits",
    workedExample: "3.5 GPA over 30 credits plus a 3.7 semester (15 credits) → cumulative ≈ 3.57.",
    faqs: [
      {
        question: "What is cumulative GPA?",
        answer: "It's your overall GPA across all completed semesters, weighted by credit hours.",
      },
      {
        question: "Can I skip previous GPA?",
        answer: "Yes. Leave previous fields empty to see only your current semester GPA.",
      },
    ],
  },
  "weighted-gpa-calculator": {
    howItWorks: [
      "Add each course with letter grade, credits, and course type (Regular, Honors, AP, IB).",
      "Honors courses get +0.5 GPA points; AP/IB get +1.0.",
      "Your weighted GPA updates instantly.",
    ],
    formula: "Weighted GPA = Σ((base points + bonus) × credits) ÷ Σ(credits)",
    workedExample: "An A in AP English (5.0 points) and a B+ in Honors Math (3.5 points) in 3-credit courses → weighted GPA 4.25.",
    faqs: [
      {
        question: "What is weighted GPA?",
        answer: "Weighted GPA gives extra points for advanced courses like Honors, AP, and IB. Many high schools use a 5.0 scale.",
      },
      {
        question: "Does every school use the same bonuses?",
        answer: "No. We use common US defaults (+0.5 Honors, +1.0 AP/IB). Check your school's policy.",
      },
    ],
  },
  "raise-gpa-calculator": {
    howItWorks: [
      "Enter your current GPA and total credits completed.",
      "Enter your target GPA and how many future credits you'll take.",
      "See the GPA you need in those future courses.",
    ],
    formula: "Required GPA = (target × total credits − current × prior credits) ÷ future credits",
    workedExample: "3.2 GPA over 60 credits, want 3.5 with 15 credits left → need 4.4 GPA (not achievable on 4.0 scale).",
    faqs: [
      {
        question: "How do I raise my GPA?",
        answer: "Earn higher grades in remaining courses. This calculator shows exactly what GPA you need.",
      },
      {
        question: "What if it says impossible?",
        answer: "Even straight A's won't reach your target. Try a lower goal or more credit hours.",
      },
    ],
  },
  "high-school-gpa-calculator": {
    howItWorks: [
      "Add semesters or quarters with course grades.",
      "Optionally enable weighted GPA for Honors/AP courses.",
      "See GPA per period and your overall high school GPA.",
    ],
    formula: "GPA = Σ(grade points × credits) ÷ Σ(credits)",
    workedExample: "Fall 3.7 + Spring 3.5 across equal credits → overall 3.6.",
    faqs: [
      {
        question: "How is high school GPA calculated?",
        answer: "Each course grade converts to GPA points, multiplied by credits, then averaged across all courses.",
      },
      {
        question: "Can I track by semester?",
        answer: "Yes. Add a period for each semester or quarter and see per-period and cumulative GPA.",
      },
    ],
  },
  "college-gpa-calculator": {
    howItWorks: [
      "Add each college course with letter grade and credit hours.",
      "GPA points are weighted by credit hours.",
      "Your semester GPA updates as you type.",
    ],
    formula: "GPA = Σ(GPA points × credit hours) ÷ Σ(credit hours)",
    workedExample: "A (4.0) in 4 credits + B+ (3.3) in 3 credits → GPA 3.69.",
    faqs: [
      {
        question: "How is college GPA different from high school?",
        answer: "College GPA uses credit hours (typically 1–5 per course) rather than Carnegie units. The math is the same.",
      },
      {
        question: "What about pass/fail courses?",
        answer: "Pass/fail courses are usually excluded from GPA. Only enter letter-graded courses.",
      },
    ],
  },
  "percentage-to-letter-grade": {
    howItWorks: [
      "Enter your percentage score (0–100).",
      "Select your grading scale if needed.",
      "See the letter grade and GPA equivalent.",
    ],
    formula: "Letter = band matching percentage on selected scale",
    workedExample: "85% on US Standard scale → B (83–86%).",
    faqs: [
      {
        question: "What percentage is a B?",
        answer: "On the US Standard scale, B is typically 83–86%. Exact ranges vary by school.",
      },
    ],
  },
  "letter-grade-calculator": {
    howItWorks: [
      "Enter a letter grade (A, B+, C-, etc.).",
      "We show the percentage range and midpoint on your scale.",
      "Useful for understanding what a letter grade means numerically.",
    ],
    formula: "Percentage = midpoint of letter grade band on selected scale",
    workedExample: "B+ on US Standard → approximately 89.5% (87–89% range).",
    faqs: [
      {
        question: "What percentage is an A?",
        answer: "On US Standard, A is 93–96% and A+ is 97–100%. Select your scale for exact ranges.",
      },
    ],
  },
  "canvas-grade-calculator": {
    howItWorks: [
      "Enter each Canvas assignment group (Assignments, Quizzes, Exams, etc.).",
      "Add the group's average score and weight percentage.",
      "See your overall Canvas course grade.",
    ],
    formula: "Course grade = Σ(group score × group weight) ÷ Σ(weights)",
    workedExample: "Assignments 92% (30%), Quizzes 88% (20%), Final 90% (50%) → 90.2%.",
    faqs: [
      {
        question: "How does Canvas calculate grades?",
        answer: "Canvas weights assignment groups. Each group's average is multiplied by its weight percentage.",
      },
      {
        question: "My weights don't add to 100%.",
        answer: "We still calculate but show a warning. Canvas may normalize weights differently.",
      },
    ],
  },
  "eoc-grade-calculator": {
    howItWorks: [
      "Enter your current course grade before the EOC exam.",
      "Enter how much the EOC counts toward your final grade.",
      "Enter your target grade to see what you need on the EOC.",
    ],
    formula: "Required EOC = (target − current × (1 − w)) ÷ w",
    workedExample: "Current 82%, EOC worth 25%, want 85% → need 94% on the EOC.",
    faqs: [
      {
        question: "What is an EOC exam?",
        answer: "End-of-Course exams are standardized tests that count toward your final course grade, common in US states like Florida and Texas.",
      },
      {
        question: "How much is the EOC worth?",
        answer: "Typically 20–30% of your course grade, but it varies by state and district. Check with your teacher.",
      },
    ],
  },
};
