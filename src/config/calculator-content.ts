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
      "List this term's courses with the letter or percent you earned and the credit hours.",
      "Each grade is converted to quality points on the scale you pick (US 4.0 by default).",
      "Semester GPA is quality points divided by credit hours — it does not include past terms.",
    ],
    formula: "Semester GPA = quality points this term ÷ credit hours this term",
    workedExample:
      "English A (4.0 × 3 cr = 12 QP) and Math B (3.0 × 3 cr = 9 QP) → 21 ÷ 6 = 3.50 semester GPA.",
    faqs: [
      {
        question: "How do I calculate semester GPA?",
        answer:
          "Convert each letter to GPA points, multiply by that course's credits, add those quality points, then divide by this term's total credits.",
      },
      {
        question: "Is this the same as weighted or cumulative GPA?",
        answer:
          "No. This tool is one term, unweighted. Use Weighted GPA for Honors/AP bonuses, or Cumulative GPA to fold in previous semesters.",
      },
      {
        question: "Can I enter a percentage instead of a letter?",
        answer: "Yes. Type 92 or B+ — we map both through your selected grading scale.",
      },
    ],
  },
  "cumulative-gpa-calculator": {
    howItWorks: [
      "Enter the GPA and credit total already on your transcript (or clear both if this is your first term).",
      "Add this semester's courses with grades and credits.",
      "We combine prior quality points with this term to show your new overall GPA.",
    ],
    formula: "Cumulative GPA = (prior GPA × prior credits + this term QP) ÷ all credits",
    workedExample:
      "Transcript 3.50 over 30 credits (105 QP) plus a 3.70 semester of 15 credits (55.5 QP) → 160.5 ÷ 45 ≈ 3.57.",
    faqs: [
      {
        question: "What is cumulative GPA?",
        answer:
          "It is the credit-weighted average of every completed course on your record, not just the current semester.",
      },
      {
        question: "What if I am a first-semester student?",
        answer:
          "Clear the previous GPA and previous credits fields. The result is then identical to a single-term GPA.",
      },
      {
        question: "Why is the example pre-filled with 3.5 and 30 credits?",
        answer:
          "Those numbers are a demo only. Replace them with your transcript totals, or delete them for a first-term calculation.",
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
    workedExample:
      "3.2 GPA over 60 credits, want 3.5 with 15 more credits → need 4.70 (impossible on a 4.0 scale). Want 3.4 with 30 more credits → need 3.80.",
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
      "Add a block for each semester or quarter, then list the courses in that period.",
      "Turn on weighted GPA to mark Honors (+0.5), AP (+1.0), or IB (+1.0) per course.",
      "See GPA for every period plus one overall high school GPA.",
    ],
    formula: "HS GPA = Σ((base points + Honors/AP/IB bonus) × credits) ÷ Σ(credits)",
    workedExample:
      "Unweighted Fall A and Honors B+ is 3.65. With weighting, the B+ becomes 3.8 and that period rises to 3.90.",
    faqs: [
      {
        question: "How is high school GPA calculated?",
        answer:
          "Each course maps to GPA points. If weighted is on, Honors adds 0.5 and AP/IB add 1.0 (capped at 5.0), then we average by credits across all periods.",
      },
      {
        question: "Can I track by semester or quarter?",
        answer:
          "Yes. Add a period for Fall, Spring, or each quarter. You get a GPA per period and a combined high school GPA.",
      },
      {
        question: "Does my school use the same Honors and AP bonuses?",
        answer:
          "Policies vary. We use common US defaults. If your school uses +1.0 for Honors or a 6.0 scale, treat this as an estimate.",
      },
    ],
  },
  "college-gpa-calculator": {
    howItWorks: [
      "Enter each college course with its letter grade and credit hours (usually 1–5, often 3 or 4).",
      "A 4-credit lab counts more than a 1-credit seminar — that is the college-specific piece.",
      "Pass/fail and audited courses stay out; only letter-graded credits enter the GPA.",
    ],
    formula: "College semester GPA = Σ(GPA points × credit hours) ÷ letter-graded credit hours",
    workedExample:
      "A 4-credit A (16 QP) plus a 3-credit B+ (9.9 QP) → 25.9 ÷ 7 ≈ 3.70. The lab pulls the average up more than a 3-credit B+ would alone.",
    faqs: [
      {
        question: "How is college GPA different from high school?",
        answer:
          "The algebra is similar, but college weights by credit hours (labs and lectures differ) and usually does not add Honors/AP bonuses. Use this tool for a single college term.",
      },
      {
        question: "What about pass/fail or transfer courses?",
        answer:
          "Most colleges exclude P/F and audits from GPA. Transfer credit policies differ — only enter courses your registrar counts toward GPA.",
      },
      {
        question: "Should I use this or the semester GPA calculator?",
        answer:
          "Use this when you think in credit hours, pass/fail exclusions, and academic-standing ranges. Use the generic semester GPA tool for a plain term list, or Cumulative GPA when you also have a transcript total.",
      },
      {
        question: "What does dean's list or good standing mean here?",
        answer:
          "We show a typical range (about 3.5+ / 2.0+ on a 4.0 scale). Your college catalog is the official rule.",
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
      {
        question: "Does 85% always become a B?",
        answer:
          "Not on every scale. US 10-point letter bands may call 85% a B+, and UK or Australian tables use different cutoffs. Change the scale before you convert.",
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
      {
        question: "Why do you show a midpoint instead of a range only?",
        answer:
          "Weighted averages need a single number. We use the midpoint of the letter band, then still display the full range underneath.",
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
        question: "Canvas says my groups do not add to 100%.",
        answer:
          "Canvas can hide unused groups or drop unposted assignments. We still compute a weighted mean and warn if your entered weights are not 100%, so you can match what the LMS is actually using.",
      },
    ],
  },
  "eoc-grade-calculator": {
    howItWorks: [
      "Enter your course average before the state End-of-Course exam (not a teacher-written final).",
      "Enter the district weight for the EOC — often 20–30% in Florida, Texas, and similar states.",
      "Set the report-card grade you need. We solve for the EOC score that gets you there.",
    ],
    formula: "Required EOC % = (report-card target − class average × (1 − EOC weight)) ÷ EOC weight",
    workedExample:
      "Class average 82%, Florida-style EOC at 25%, want an 85% on the report card → you need 94% on the EOC.",
    faqs: [
      {
        question: "What is an EOC exam?",
        answer:
          "An End-of-Course exam is a state or district standardized test that is averaged into the course grade. It is not the same as a teacher's classroom final.",
      },
      {
        question: "How is this different from the final grade calculator?",
        answer:
          "The final grade tool is for a teacher-set exam with extra modes (reverse, points, drop lowest). This EOC tool is for one high-stakes state test with a published weight.",
      },
      {
        question: "How much is the EOC worth?",
        answer:
          "Many Florida and Texas courses use about 20–30%. Always confirm the current district policy — weights change by year and subject.",
      },
    ],
  },
  "degree-classification-calculator": {
    howItWorks: [
      "Add each UK module with its mark (0–100) and credit value.",
      "Tag modules as Year 2 or Year 3. If both years appear, we apply your year weights (often 40/60).",
      "Read the credit-weighted average and the predicted First / 2:1 / 2:2 / Third.",
    ],
    formula:
      "If both years: Overall = Y2 average × w2 + Y3 average × w3. Otherwise: Σ(mark × credits) ÷ Σ(credits).",
    workedExample:
      "Year 2 average 62% at 40% and Year 3 average 74% at 60% → overall 69.2% → Upper Second (2:1), 0.8 marks from a First.",
    faqs: [
      {
        question: "What marks make a First or a 2:1?",
        answer:
          "Common UK bands are First 70%+, 2:1 60–69%, 2:2 50–59%, Third 40–49%, Fail below 40%. Some programmes use 69.5% rounding or a borderline viva.",
      },
      {
        question: "Do all universities weight Year 2 and Year 3 the same way?",
        answer:
          "No. 40/60 is common; some use 30/70 or count Level 5/6 differently. Set the weights your handbook publishes.",
      },
      {
        question: "Is this an official classification?",
        answer:
          "No. Boards apply discretion, condonement, and credit rules we cannot see. Use this to plan, then confirm with your exam board.",
      },
    ],
  },
  "atar-calculator": {
    howItWorks: [
      "Enter scaled subject scores from 0–100 (not raw school marks).",
      "We average the best four scores and count a fifth at 10% — a simplified national model.",
      "Optionally set a target ATAR to see the counted average this curve associates with that rank.",
    ],
    formula: "Counted average → educational ATAR lookup curve (not UAC/VTAC/QTAC official tables)",
    workedExample:
      "Four scaled scores of 80 map to an estimated ATAR of 90.00 on this curve. A fifth score of 50 adds 5 points to the counted set (10% of 50).",
    faqs: [
      {
        question: "Is this an official ATAR?",
        answer:
          "No. Official ATARs use state scaling and a yearly rank table. Treat the output as a planning estimate only.",
      },
      {
        question: "Should I enter raw marks or scaled scores?",
        answer:
          "Scaled scores. Raw school percentages are adjusted by the state authority before they enter an ATAR.",
      },
      {
        question: "How is ATAR different from GPA?",
        answer:
          "ATAR is a percentile rank among a Year 12 cohort (0–99.95). Australian university GPA is usually a 7-point course average after you enrol.",
      },
      {
        question: "Why can't you use official UAC or VTAC tables?",
        answer:
          "Those rank tables are published for a specific year and state and are not free to republish as a live calculator. Pick your authority for the right disclaimer, then treat our curve as a planning estimate.",
      },
    ],
  },
  "gcse-grade-calculator": {
    howItWorks: [
      "Enter a percentage mark from 0–100.",
      "We map it to the England 9–1 GCSE table used in this tool.",
      "Read the numeric grade, whether it is a standard pass (4+), and an approximate legacy A*–G letter.",
    ],
    formula: "Grade = 9–1 band matching the percentage on the educational GCSE table",
    workedExample:
      "72% maps to grade 7 (70–79%), about an old A, and counts as a standard pass.",
    faqs: [
      {
        question: "Is grade 4 a pass?",
        answer:
          "Grade 4 is commonly called a standard pass and grade 5 a strong pass. Employers and sixth forms may ask for a 4 or a 5 in English and maths.",
      },
      {
        question: "Are these official exam-board boundaries?",
        answer:
          "No. Real boundaries move by subject and series. Use this to understand the 9–1 idea, then check the awarding body for that paper.",
      },
      {
        question: "How does this relate to a UK degree classification?",
        answer:
          "GCSEs are secondary qualifications. University results use First / 2:1 / 2:2 / Third. Open the degree classification calculator for those marks.",
      },
    ],
  },
};
