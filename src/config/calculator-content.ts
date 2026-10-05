import type { CalculatorSlug } from "@/types/calculator";
import type { FaqItem } from "@/types/seo";

export interface PrimarySourceLink {
  label: string;
  href: string;
}

export interface CalculatorContent {
  howItWorks: string[];
  formula: string;
  workedExample: string;
  faqs: FaqItem[];
  /** Official or primary references — not a substitute for reading the authority's rules. */
  primarySources?: PrimarySourceLink[];
  /** Visible assumptions shown above FAQ — keeps expectations clear for users and reviewers. */
  assumptions?: string[];
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
          "We default to the common US 4.0 GPA scale. Visitors in some countries may see a local preset automatically; everyone can pick another scale (including New Zealand 9-point) in the calculator settings.",
      },
      {
        question: "Is there a free online EZ grader?",
        answer:
          "Yes. This page is an online EZ grader: enter total questions and wrong answers for an instant percentage, letter grade, and a full wrong-count chart. No login required; use Print for a paper chart.",
      },
      {
        question: "How much is each question worth on a test?",
        answer:
          "On a test with equal-weight questions, each question is worth 100 ÷ total questions percent. Example: 20 questions → 5% each; one wrong answer usually drops the score by about 5%. The chart below shows your grade for every wrong-count.",
      },
      {
        question: "What grade is 8 out of 13 or 12 out of 20?",
        answer:
          "Divide correct by total and multiply by 100. Eight out of 13 is 8 ÷ 13 ≈ 61.5%; twelve out of 20 is 60%. Enter total 13 and wrong 5 here (8 correct), or open the test grade calculator and enter correct answers directly.",
      },
      {
        question: "What is my grade on this test?",
        answer:
          "Enter how many questions were on the test and how many you missed. The grader shows correct count, percentage, and letter grade for that score.",
      },
      {
        question: "How do I get a percentage from wrong answers?",
        answer:
          "Percentage = (Total − Wrong) ÷ Total × 100. The EZ grader does that math for you and maps the result to a letter on your selected scale.",
      },
      {
        question: "Can I grade by number correct instead of wrong?",
        answer:
          "This EZ grader uses wrong answers because many teachers count misses while grading. If you only know how many you got right, use the test grade calculator and switch to correct-answer mode.",
      },
      {
        question: "Is there an easy grader for teachers online?",
        answer:
          "Yes. Teachers use this page as a free easy grader: set question total, enter wrong count, print the chart, and reuse it for the next quiz. No account or gradebook upload required.",
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
      {
        question: "How do I calculate my exam grade?",
        answer:
          "Pick correct or wrong answers, enter the question total, then add your count. The result is your exam percentage; we also show the matching letter grade.",
      },
      {
        question: "Can I use this for a quiz score out of 10 or 20?",
        answer:
          "Yes. Set total questions to 10, 20, or any number your teacher used. Bonus points work the same way for quizzes and tests.",
      },
      {
        question: "What grade is 8 out of 13?",
        answer:
          "Set total questions to 13, choose correct answers, and enter 8. That is 8 ÷ 13 ≈ 61.5%. The letter grade follows the scale you selected (US, New Zealand 9-point, etc.).",
      },
      {
        question: "What grade is 12 out of 20?",
        answer:
          "Twelve correct out of 20 is 12 ÷ 20 = 60%. Enter total 20 and correct 12 to see the percentage and letter grade on your chosen scale.",
      },
      {
        question: "How do I calculate my grade on a test?",
        answer:
          "Score % = (correct ÷ total questions) × 100, then compare to your school’s letter bands. Use this calculator for one test; for a whole course average with weighted assignments, use the weighted grade calculator.",
      },
    ],
  },
  "weighted-grade-calculator": {
    howItWorks: [
      "Add each assignment, quiz, or exam with its score and weight.",
      "Use percentage or point weights. We divide by the sum of those weights, not by 100. Match 100% when your syllabus requires it; we warn if percent mode is not 100%.",
      "See your weighted course average and letter grade.",
    ],
    formula:
      "Weighted avg = Σ(Score × Weight) ÷ Σ(Weight). We divide by the sum of weights you entered, not by 100. Match 100% when your syllabus requires it.",
    workedExample: "Homework 92% (20%), Midterm 85% (30%), Final 88% (50%) → 87.9%.",
    faqs: [
      {
        question: "What is a weighted grade?",
        answer:
          "A weighted grade gives different categories different importance. A final exam might count more than homework.",
      },
      {
        question: "My weights don't add to 100%. Is that OK?",
        answer:
          "Yes for the math: we divide by the total weight you entered, not by 100. If your syllabus requires 100%, match that — we show the running total and a warning when percent mode is not 100%.",
      },
      {
        question: "How do I calculate my course grade?",
        answer:
          "List each category (homework, quizzes, exams) with its average score and syllabus weight. The calculator multiplies score × weight, sums, and divides by total weight for your course average.",
      },
      {
        question: "What is my class grade if categories have different weights?",
        answer:
          "That is a weighted average, not a simple mean. Enter each weighted row from your syllabus; the total is your class grade before the final if the final is listed separately.",
      },
      {
        question: "Can I use this as a what-if grade calculator?",
        answer:
          "Yes. Change one score or weight and the course average updates. That shows what your grade would be if a quiz or exam came back higher or lower.",
      },
      {
        question: "What is an overall grade calculator?",
        answer:
          "An overall (course) grade is usually a weighted average of homework, quizzes, and exams — not a single test score. Enter each category with its syllabus weight here to get your class average.",
      },
      {
        question: "How much will my grade go up or drop?",
        answer:
          "Change one assignment score and watch the weighted average move. A low-weight quiz moves the total a little; a heavy exam moves it more. The shift equals that score’s weight share of the course.",
      },
    ],
    assumptions: [
      "Each row is one category (homework, tests, etc.) with an average score and a syllabus weight.",
      "We divide by the sum of weights you enter, not by 100 unless your weights add to 100%.",
      "Letter grades use your selected scale on the unrounded weighted average.",
    ],
    primarySources: [
      {
        label: "Edutopia — weighted grading overview for teachers",
        href: "https://www.edutopia.org/article/weighted-grading-pros-and-cons",
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
      {
        question: "How are final grades calculated in a class?",
        answer:
          "Most classes combine your work before the final with the final exam using weights from the syllabus. This tool solves for the final score you need once you know current average and final weight.",
      },
      {
        question: "How do you calculate what you need on a final exam?",
        answer:
          "Use Required = (Target − Current × (1 − w)) ÷ w, where w is the final as a decimal (40% → 0.4). The calculator applies the same formula and flags targets above 100%.",
      },
      {
        question: "Can I use this for a midterm?",
        answer:
          "Yes. Enter the grade you have before the midterm, the percent the midterm is worth, and the course grade you want. The formula is the same as a final.",
      },
      {
        question: "What is a what grade do I need calculator?",
        answer:
          "It works like a final grade calculator: enter your current course percentage, how much the final counts, and your target grade. We solve for the minimum final exam score you need.",
      },
      {
        question: "Does this work as a final grade calculator with percentages?",
        answer:
          "Yes. Enter current grade, target grade, and final weight as percentages (for example 85, 90, and 40). All three must use the same scale your syllabus uses.",
      },
    ],
    assumptions: [
      "Current and target grades are course percentages on the same scale as your syllabus.",
      "Final weight is the share of the course grade the exam counts for (40 means 40%, not 0.4 typed as 40).",
      "If the required score exceeds 100%, we label the target as impossible instead of showing a misleading number.",
    ],
    primarySources: [
      {
        label: "Khan Academy — weighted average (same structure as final-grade algebra)",
        href: "https://www.khanacademy.org/math/pre-algebra/pre-algebra-rates-and-ratios/pre-algebra-rates/a/rates-intro",
      },
    ],
  },
  "gpa-calculator": {
    howItWorks: [
      "List this term's courses with the letter or percent you earned and the credit hours.",
      "Each grade is converted to quality points using the grading scale shown in the calculator (change the scale on worldwide pages; country hub pages lock to a regional preset).",
      "Semester GPA (SGPA on India 10-point) is quality points divided by credit hours — it does not include past terms.",
    ],
    formula: "Semester GPA = quality points this term ÷ credit hours this term",
    workedExample:
      "English A (4.0 × 3 cr = 12 QP) and Math B (3.0 × 3 cr = 9 QP) → 21 ÷ 6 = 3.50 semester GPA. On India 10-point, O/A+/A map to 10/9/8 points the same way.",
    faqs: [
      {
        question: "How do I calculate semester GPA?",
        answer:
          "Convert each letter to GPA points, multiply by that course's credits, add those quality points, then divide by this term's total credits.",
      },
      {
        question: "Is this the same as weighted or cumulative GPA?",
        answer:
          "No. This tool is one term, unweighted. Use the weighted GPA calculator for Honors and AP bonuses, or use the cumulative GPA or SGPA-to-CGPA calculator to include previous semesters.",
      },
      {
        question: "Can I enter a percentage instead of a letter?",
        answer: "Yes. Type 92 or B+ — we map both through your selected grading scale.",
      },
      {
        question: "How do I convert Australian GPA to US 4.0?",
        answer:
          "There is no official linear map (for example GPA ÷ 7 × 4). Pick your university preset on /au and follow the receiving institution or credential evaluator — do not treat this calculator as a WES-equivalent conversion.",
      },
      {
        question: "What is an unweighted GPA?",
        answer:
          "Unweighted GPA treats every course the same — an A is 4.0 whether it is PE or AP. This semester calculator uses that model; use Weighted GPA if your school adds Honors or AP points.",
      },
      {
        question: "What if my classes have no credit hours?",
        answer:
          "Set every credit to 1. Each class then counts the same. For middle school or junior high, use the middle school GPA calculator, which has no credit column.",
      },
      {
        question: "How do you calculate GPA from letter grades?",
        answer:
          "Convert each letter to points on your scale, multiply by credit hours for quality points, add them up, and divide by total credit hours for the term. Enter courses above and we do each step.",
      },
      {
        question: "How do I calculate GPA from percentage grades?",
        answer:
          "Turn each course percentage into a letter (or quality points) using your school’s scale, then average by credit hours. Enter 92 or B+ in a row — we map percentages through the scale you selected.",
      },
      {
        question: "How do I convert GPA to a percentage?",
        answer:
          "There is no single national formula — schools map GPA points back to percentage bands differently. Use the percentage to letter grade tool with your scale, or check your transcript legend.",
      },
    ],
    primarySources: [
      {
        label: "NCES — grade point average in US education statistics",
        href: "https://nces.ed.gov/programs/coe/indicator/ctr",
      },
    ],
    assumptions: [
      "One term only — past semesters belong in the cumulative GPA calculator.",
      "Unweighted quality points unless you use the weighted GPA tool.",
      "Starter course rows are examples; replace them with your transcript data.",
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
          "It is the credit-weighted average of every completed course on your record, not just the current semester. Each course contributes proportionally to the total based on its credit hours.",
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
      {
        question: "How do I calculate cumulative GPA manually?",
        answer:
          "Multiply your prior GPA by prior credits to get past quality points. Add this term's quality points (grade points × credits per course, then summed). Divide the total quality points by the total credits. This calculator does every step automatically when you fill in the fields.",
      },
      {
        question: "What cumulative GPA do I need for graduate school?",
        answer:
          "Most graduate programs set a minimum between 3.0 and 3.5, but selective programs often have higher medians in practice. Check each program's stated minimum and the average GPA of admitted students in their latest data release, since the floor and the competitive average can differ by 0.3 or more.",
      },
      {
        question: "Does retaking a course change my cumulative GPA?",
        answer:
          "Only if your school applies grade replacement or academic renewal. Without that policy, the original grade stays in the calculation and the retake adds new credits and quality points on top. With grade replacement, the old grade is removed from the GPA. Enter your situation under whichever assumption matches your registrar's rules.",
      },
      {
        question: "Is cumulative GPA the same as overall GPA?",
        answer:
          "Yes — they refer to the same number: the credit-weighted average of all graded coursework across every term on your record. Some transcripts label it CGPA, others say Overall GPA or Cumulative Average; the calculation is the same.",
      },
    ],
    assumptions: [
      "Prior GPA and credits come from your official transcript — use those numbers, not estimates.",
      "Pass/fail, audited, and transfer credits excluded from your institution's GPA should not be entered.",
      "One term only is added each time; run the result forward through each new semester to keep it current.",
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
      {
        question: "Can a weighted GPA be above 4.0?",
        answer: "Yes. Because AP and IB courses add 1.0 point to the base grade value, an A in an AP class is worth 5.0 on a weighted scale. A student earning all A's in AP/IB courses would have a weighted GPA of 5.0.",
      },
      {
        question: "Do colleges look at weighted or unweighted GPA?",
        answer: "Most US colleges recalculate your GPA on their own unweighted scale during admissions. They still see your weighted GPA on your transcript, but they compare applicants on a level scale. High course rigor (AP, IB) matters even after recalculation.",
      },
      {
        question: "How do I know if my school uses weighted GPA?",
        answer: "Check your transcript or school profile. If you see both a 4.0-scale GPA and a higher GPA (sometimes on a 5.0 scale), your school reports weighted GPA. If there is only one number and it does not go above 4.0, it is likely unweighted.",
      },
      {
        question: "Should I use weighted or unweighted GPA for college applications?",
        answer: "Report both when the form asks — many Common App questions distinguish between the two. If only one is requested, most schools want unweighted, but include your course rigor details (AP/IB counts) in the profile section so admissions officers can see context.",
      },
    ],
    assumptions: [
      "Honors bonus is +0.5 and AP/IB bonus is +1.0 by default — adjust if your school uses different amounts.",
      "Bonuses cap the quality points per course at 5.0 on a standard weighted scale.",
      "Pass/fail or audited courses should not be entered as they do not carry letter-grade points.",
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
        answer: "Earn higher grades in remaining courses. This calculator shows exactly what GPA you need in those future terms to reach your target. More remaining credits give you more leverage because each new grade carries more weight.",
      },
      {
        question: "What if it says impossible?",
        answer: "Even straight A's won't reach your target with the credits you entered. Lower your target GPA, plan more future credit hours, or explore grade replacement policies at your school. Some institutions allow retaking courses and replacing the old grade.",
      },
      {
        question: "How many credits do I need to significantly raise my GPA?",
        answer: "The more credits already on your transcript, the harder a single term can move the needle. At 30 credits completed, one 15-credit semester at 4.0 can shift a 2.5 GPA to roughly 2.83. At 90 credits, the same semester moves it by less than 0.2. Use the calculator to plan ahead — the answer is unique to your current total.",
      },
      {
        question: "Does retaking a course improve my GPA?",
        answer: "It depends on your school's policy. Some institutions replace the original grade in the GPA calculation (grade forgiveness). Others average both attempts. Check your registrar's academic renewal or grade replacement rules before retaking a course solely to improve GPA.",
      },
      {
        question: "How long does it take to raise a GPA from 2.5 to 3.0?",
        answer: "Enter your current credits and target in this calculator for a precise answer. As a rough guide, going from 2.5 to 3.0 with 60 credits already completed requires earning about a 3.5 in 40 additional credit hours — roughly 3 full-time semesters of strong performance.",
      },
    ],
    assumptions: [
      "GPA is on a 4.0 scale — enter 4.0 as the maximum possible future GPA.",
      "Grade replacement or academic renewal policies are not modeled here; check your registrar.",
      "Future credits are letter-graded credits that count toward your GPA.",
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
      {
        question: "Is this the UC or CSU GPA?",
        answer:
          "No. School GPA often uses different bonuses. The UC and CSU calculator uses the a-g rules and honors caps those systems publish.",
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
    workedExample: "85% on the common US 4.0 scale → B (83–86%).",
    faqs: [
      {
        question: "What percentage is a B?",
        answer: "On the common US 4.0 scale, B is typically 83–86%. Exact ranges vary by school.",
      },
      {
        question: "Does 85% always become a B?",
        answer:
          "Not on every scale. US 10-point letter bands may call 85% a B+, and UK or Australian tables use different cutoffs. Change the scale before you convert.",
      },
      {
        question: "What percentage is an A?",
        answer:
          "On the common US 4.0 scale, A is 93–96% and A+ is 97–100%. A− is typically 90–92%. Your school may draw the line slightly differently — a 92% could be an A− or an A depending on the exact cutoff.",
      },
      {
        question: "What percentage is a passing grade?",
        answer:
          "In most US high schools and colleges, 60% is the minimum passing grade (D or D−). Some institutions require 70% for a passing grade in certain programs. Professional or graduate courses may set higher minimums — check your syllabus or catalog.",
      },
      {
        question: "What is a 70% letter grade?",
        answer:
          "On the standard US scale, 70–72% is typically a C− and 73–76% is a C. On a 10-point scale (some colleges), 70–79% is a C. The converter shows the letter and GPA equivalent for the scale you select.",
      },
      {
        question: "How is percentage different from a letter grade?",
        answer:
          "A percentage is an exact numerical score out of 100. A letter grade is a band that covers a range of percentages — B covers several percentage points, not just one number. Converting from percentage to letter collapses that range into a single label and loses precision, which is why exact percentage matters for grade point calculations.",
      },
    ],
    assumptions: [
      "Scores are expressed as a percentage out of 100, not raw points on a different scale.",
      "Band boundaries are from the selected grading scale — switch scales for non-US systems.",
      "Plus and minus grades are included on scales that use them; plain A/B/C scales group more scores into each band.",
    ],
  },
  "letter-grade-calculator": {
    howItWorks: [
      "Enter the grade label for your selected scale (letters, classifications, or HD/D/C-style bands).",
      "We show the percentage range and midpoint on your scale.",
      "Useful for understanding what a letter grade means numerically.",
    ],
    formula: "Percentage = midpoint of letter grade band on selected scale",
    workedExample: "B+ on the common US 4.0 scale → approximately 88% (87–89% range).",
    faqs: [
      {
        question: "What percentage is an A?",
        answer: "On the common US 4.0 scale, A is 93–96% and A+ is 97–100%. Select your scale for exact ranges.",
      },
      {
        question: "Why do you show a midpoint instead of a range only?",
        answer:
          "Weighted averages need a single number. We use the midpoint of the letter band, then still display the full range underneath.",
      },
      {
        question: "What is a passing letter grade?",
        answer:
          "In most US schools, D (60–66%) is the lowest passing grade for general credit. However, many majors, programs, and prerequisite courses require a C (73%) or C− (70%) to count toward the degree. Check your degree requirements before assuming a D passes.",
      },
      {
        question: "Does a D count as passing in college?",
        answer:
          "A D earns credit toward graduation at many US colleges but usually does not satisfy a core requirement or major prerequisite. A grade of F fails the course entirely. Some graduate schools require a B− or better in every course. Confirm with your registrar or academic advisor.",
      },
      {
        question: "How do plus and minus grades affect GPA?",
        answer:
          "On the common US scale, a B+ is 3.3 quality points, a B is 3.0, and a B− is 2.7. The plus or minus shifts the GPA value by about 0.3 per notch. Over a full semester, trading a B for a B+ in a 3-credit course raises the semester GPA by 0.1 points.",
      },
      {
        question: "What letter grade is a 2.0 GPA?",
        answer:
          "A 2.0 GPA corresponds to a C grade on the standard US 4.0 scale, which typically covers the 73–76% range. Many schools require at least a 2.0 cumulative GPA to remain in good academic standing.",
      },
    ],
    assumptions: [
      "Grade labels entered match those on the selected scale (A, B+, HD, First, etc.).",
      "Midpoint values are averages of each band's boundaries — useful for estimation, not for official transcript calculations.",
      "Scales with no plus/minus collapse A−, A, A+ into a single A band.",
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
        answer: "Canvas weights assignment groups. Each group's average is multiplied by its weight percentage, then those products are summed. If groups do not total 100%, Canvas normalizes relative to the entered weights.",
      },
      {
        question: "Canvas says my groups do not add to 100%.",
        answer:
          "Canvas can hide unused groups or drop unposted assignments, making visible weights appear under 100%. We still compute a weighted mean using the weights you enter and warn when they are not 100%, so you can match what the LMS is actually counting.",
      },
      {
        question: "What about Blackboard, Moodle, or Google Classroom?",
        answer:
          "Blackboard and Moodle usually use weighted categories too — enter them like assignment groups, or use the weighted grade calculator. Google Classroom is often points-based; see our LMS course grades guide for which tool fits each platform.",
      },
      {
        question: "How do I find my Canvas assignment group weights?",
        answer:
          "In Canvas, go to the course Grades page and look for the group weights listed under each category header, or ask your instructor to share the syllabus breakdown. Alternatively, your instructor may publish them on the syllabus page or in the course settings under Assignment Groups.",
      },
      {
        question: "Why does my Canvas total differ from what this calculator shows?",
        answer:
          "Canvas may apply rules this tool cannot see: dropping the lowest score, excluding unposted or excused assignments, or using a grading scheme that rounds differently. Enter the group averages Canvas already shows (not individual assignment scores) to get the closest match.",
      },
      {
        question: "Can I use this to calculate my Canvas grade before the final exam?",
        answer:
          "Yes. Enter all completed group averages with their weights, then set the final exam group to the score you expect to earn. The overall grade updates to show your projected course total, which is the same calculation Canvas will perform once the final is graded.",
      },
    ],
    assumptions: [
      "Enter the group average score for each assignment group, not individual assignment scores.",
      "Weights are the percentages published in Canvas — if they do not add to 100%, a warning appears.",
      "Drop-lowest, late penalties, and excused assignments are not modeled here — use Canvas for the official figure.",
    ],
  },
  "eoc-grade-calculator": {
    howItWorks: [
      "Enter your course average before the state End-of-Course exam (not a teacher-written final).",
      "Enter the EOC weight required by your state or district. Florida law can require 30% for specified courses; Texas no longer has a statewide 15% rule — local policies vary.",
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
          "Florida can require 30% for certain EOC courses under current statute. Texas STAAR EOC results are not mandated statewide as a fixed course percentage — confirm your district policy. Other states set their own rules.",
      },
      {
        question: "Does the EOC count toward my final course grade or just GPA?",
        answer:
          "The EOC is factored into the course grade itself — it replaces a portion of what your classwork average would otherwise contribute. Once the course grade is set, that letter maps to GPA quality points just like any other course. So an EOC can move both your report-card grade and your GPA.",
      },
      {
        question: "Can I retake an EOC exam to improve my course grade?",
        answer:
          "Retake policies are set by each state and district. In Florida, students who do not pass required EOC exams may have retake opportunities; the retake score then re-enters the course grade formula. Check with your school counselor for the specific retake schedule and whether an improved score replaces or averages with the original.",
      },
    ],
    primarySources: [
      {
        label: "Florida Legislature — statewide assessment statute",
        href: "https://www.flsenate.gov/Laws/Statutes/2024/1008.22",
      },
      {
        label: "Texas Education Agency — STAAR resources",
        href: "https://tea.texas.gov/student-assessment/testing/staar/staar-resources",
      },
    ],
  },
  "degree-classification-calculator": {
    primarySources: [
      {
        label: "QAA — UK quality code (assessment)",
        href: "https://www.qaa.ac.uk/quality-code",
      },
    ],
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
      {
        question: "What is a borderline degree class and how are borderline cases treated?",
        answer:
          "A borderline case is typically within 2–3 marks of the next class boundary — for example, 68–69% near the First threshold. Most institutions convene exam boards that can apply discretion, consider module-level profiles, or award borderline candidates the higher class if a majority of credits already sit in it. Rules vary, so check your faculty handbook.",
      },
      {
        question: "Does a UK degree classification convert to a US GPA?",
        answer:
          "There is no universally agreed conversion. A common informal mapping is First = 4.0, 2:1 = 3.3–3.7, 2:2 = 3.0–3.3, but US graduate schools and employers often evaluate UK transcripts contextually. WES and other credential evaluators produce their own equivalency letters — use those for official applications.",
      },
    ],
  },
  "atar-calculator": {
    primarySources: [
      { label: "UAC (NSW & ACT)", href: "https://www.uac.edu.au/" },
      { label: "VTAC (Victoria)", href: "https://www.vtac.edu.au/" },
      { label: "QTAC (Queensland)", href: "https://www.qtac.edu.au/" },
      { label: "TISC (Western Australia)", href: "https://www.tisc.edu.au/" },
      { label: "SATAC (SA & NT)", href: "https://www.satac.edu.au/" },
    ],
    howItWorks: [
      "Enter scaled subject scores from 0–100 (not raw school marks).",
      "Choose your state admission centre (UAC, VTAC, QTAC, TISC, or SATAC). Each counts subjects differently.",
      "Tag English, Applied or VET, and WACE bonus subjects when they apply. State-specific rules are in the FAQs below.",
      "Optionally set a target ATAR to see the counted average this curve associates with that rank.",
    ],
    formula:
      "Authority-specific counted average → educational ATAR lookup curve (not official UAC/VTAC/QTAC/TISC/SATAC tables; generic mode ≠ any one state)",
    workedExample:
      "VTAC planning: four scaled scores of 80 plus fifth 70 (10% → 7) and sixth 60 (10% → 6) → aggregate 333 on divisor 4.2 ≈ 79.29 counted average before the ATAR curve.",
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
          "ATAR is a percentile rank among a Year 12 cohort (0–99.95). University GPA depends on your institution (7-point, 4-point, WAM, etc.) — it is not interchangeable with ATAR or US 4.0 GPA.",
      },
      {
        question: "Can I convert ATAR to US GPA with (ATAR ÷ 99.95) × 4?",
        answer:
          "No. That formula is not valid. ATAR is a school-leaver rank; US GPA is a course grade average on a 4.0 scale. Do not use ATAR in US GPA fields or claim a WES-equivalent GPA from ATAR alone.",
      },
      {
        question: "Does ATAR convert to Australian university GPA or a UK 2:1?",
        answer:
          "No. After you enrol, universities calculate GPA or WAM from coursework — ATAR does not map to those numbers. UK degree classifications come from degree marks, not ATAR.",
      },
      {
        question: "Why can't you use official UAC or VTAC tables?",
        answer:
          "Those rank tables are published for a specific year and state and are not free to republish as a live calculator. Pick your authority for the right disclaimer, then treat our curve as a planning estimate.",
      },
      {
        question: "How does VCE / VTAC count fifth and sixth subjects?",
        answer:
          "VTAC builds from a primary four scaled scores, then allows up to two permitted 10% increments — typically from fifth and/or sixth permissible VCE studies — not 10% of every additional score you enter.",
      },
      {
        question: "Does QTAC only count General QCE subjects?",
        answer:
          "No. Eligible QTAC aggregates can be five General subjects, four General plus one Applied subject, or four General plus a Certificate III or higher VET qualification. Mark Applied or VET rows in the calculator when they apply.",
      },
      {
        question: "How does UAC count HSC subjects?",
        answer:
          "UAC uses your best two units of English plus your best eight units from remaining courses — not simply your five highest scaled scores. Tag English rows or include “English” in the subject name for this planning view.",
      },
      {
        question: "Does SATAC drop my lowest 10 credits?",
        answer:
          "SATAC’s ATAR aggregate is based on 90 credits (commonly three 20-credit TAS results plus a flexible 30-credit block). This tool models that structure; it is not “take 100 credits and discard the lowest 10”.",
      },
      {
        question: "What WACE bonuses does TISC use?",
        answer:
          "TISC can add 10% of your LOTE, Mathematics Methods, and Mathematics Specialist scaled scores on top of your best four — not LOTE alone. Tag those subjects in the WACE bonus column.",
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
      {
        question: "What percentage is each GCSE grade 1–9?",
        answer:
          "Official boundaries vary by subject and exam series, but indicative planning bands are: Grade 9 ≈ 90%+, Grade 8 ≈ 80–89%, Grade 7 ≈ 70–79%, Grade 6 ≈ 60–69%, Grade 5 ≈ 50–59%, Grade 4 ≈ 40–49%, Grade 3 ≈ 30–39%, Grade 2 ≈ 20–29%, Grade 1 ≈ below 20%. Always confirm with the awarding body's published boundaries for your actual papers.",
      },
      {
        question: "Do GCSE grades affect university or A-level admissions?",
        answer:
          "Yes. Many sixth-form colleges require at least grade 4 (sometimes 5) in English Language and Maths for entry to A-level courses. Universities rarely set GCSE conditions directly for undergraduate places, but competitive courses such as Medicine, Dentistry, and Law at some institutions specify minimum grades 6 or 7 in relevant subjects. Check each institution's entry requirements.",
      },
    ],
  },
  "cgpa-to-percentage": {
    primarySources: [
      {
        label: "HEC Policy Guidelines §13.1 (fractionalized grading)",
        href: "https://www.hec.gov.pk/english/services/universities/Documents/Final%20Examination%20Policy%20Guidelines.pdf",
      },
      {
        label: "HEC downloads — Stopping of Conversion of CGPA into Percentage",
        href: "https://www.hec.gov.pk/english/services/students/DES/Pages/Downloads.aspx",
      },
      {
        label: "UGC Choice Based Credit System guidelines",
        href: "https://www.ugc.gov.in/pdfnews/8023719_Guidelines-for-CBCS.pdf",
      },
    ],
    howItWorks: [
      "Choose CGPA → percentage or percentage → CGPA.",
      "Pick the formula your board or university prints (CBSE ×9.5, ×10, SPPU, HEC §13.1 band minimum, or the unofficial Pakistan ×25 shortcut).",
      "Enter your value and read the converted result instantly.",
    ],
    formula:
      "India CBSE historical: % = CGPA × 9.5 · Pakistan HEC §13.1: band minimum % · Unofficial shortcut: % = CGPA × 25",
    workedExample:
      "An 8.2 CGPA on the CBSE ×9.5 rule becomes 77.9%. HEC §13.1 maps 3.00 CGPA to 71% (B band minimum). The ×25 shortcut would show 75% for 3.00 — that is not the §13.1 table.",
    faqs: [
      {
        question: "Which India formula should I use?",
        answer:
          "Use the formula on your marksheet. CBSE historically used ×9.5 on some certificates. UGC does not set one national ×9.5 rule. Anna University, VIT, and some IITs/NITs use ×10. SPPU/Mumbai often use (CGPA − 0.75) × 10.",
      },
      {
        question: "What is the Pakistan HEC conversion?",
        answer:
          "HEC §13.1 assigns the minimum percentage of your grade-point band (3.00 CGPA → 71%). HEC later notified that it stopped converting CGPA into percentage. Percentage = CGPA × 25 is an unofficial shortcut, not that notice.",
      },
      {
        question: "Is this official for admissions?",
        answer:
          "No. These are educational estimates for planning. Applications abroad may require WES or school-specific evaluation.",
      },
      {
        question: "Why do different Indian universities use different CGPA-to-percentage multipliers?",
        answer:
          "India has no single national formula. Each university or board sets its own grading scale and conversion rule. CBSE historically used ×9.5 on its class X certificates; VIT, some IITs, and NITs use ×10; SPPU Mumbai commonly uses (CGPA − 0.75) × 10. The correct multiplier is whichever appears on your marksheet or in your institution's academic regulations — using the wrong one can misrepresent your academic record.",
      },
      {
        question: "Can I use a calculated percentage in place of my transcript percentage?",
        answer:
          "No. A calculated estimate is for planning only. Official applications — job portals, university admissions, visa documents — require the percentage that appears on your marksheet or transcript, or a credential evaluation letter from a body such as WES. Self-calculated conversions are not accepted as official documentation.",
      },
    ],
  },
  "percentage-to-cgpa": {
    primarySources: [
      {
        label: "HEC Policy Guidelines §13.1 (fractionalized grading)",
        href: "https://www.hec.gov.pk/english/services/universities/Documents/Final%20Examination%20Policy%20Guidelines.pdf",
      },
      {
        label: "HEC downloads — Stopping of Conversion of CGPA into Percentage",
        href: "https://www.hec.gov.pk/english/services/students/DES/Pages/Downloads.aspx",
      },
    ],
    howItWorks: [
      "Enter your percentage marks (0–100).",
      "Choose the India or Pakistan formula your institution uses.",
      "Read the estimated CGPA on that scale.",
    ],
    formula:
      "India CBSE historical: CGPA = % ÷ 9.5 · Pakistan HEC §13.1: planning top of band · Unofficial shortcut: CGPA = % ÷ 25",
    workedExample:
      "76% on CBSE ×9.5 ≈ 8.00 CGPA. 71% on HEC §13.1 planning maps to up to 3.00 CGPA in the B band.",
    faqs: [
      {
        question: "Is percentage to CGPA the reverse of CGPA to percentage?",
        answer:
          "Yes for the same formula. Always use the rule printed on your marksheet or handbook.",
      },
      {
        question: "Can I use this for CBSE Class 10?",
        answer:
          "CBSE historically published CGPA with ×9.5 on some certificates. That multiplier is not a UGC national rule. Newer marksheets may show percentages directly — follow what your board printed.",
      },
      {
        question: "What percentage converts to 8.0 CGPA on the India ×9.5 rule?",
        answer:
          "Using the CBSE ×9.5 formula: CGPA = 76 ÷ 9.5 = 8.0. So 76% maps to approximately 8.0 CGPA on that scale. For a ×10 institution, 76 ÷ 10 = 7.6 CGPA. Always use the multiplier your university or board publishes, not a generic estimate.",
      },
      {
        question: "What percentage equals 3.0 CGPA in Pakistan?",
        answer:
          "Under HEC §13.1, the B grade band (2.67–3.00 CGPA) maps to 71–74%. A 3.00 CGPA corresponds to the minimum of that band, which is 71%. The ×25 shortcut would give 75%, which is higher than the §13.1 table value for 3.00.",
      },
      {
        question: "Is there a single formula for converting percentage to CGPA for all Indian universities?",
        answer:
          "No. CBSE, UGC, Anna University, VIT, IITs, NITs, and SPPU Pune each use different multipliers or formulas. CBSE used ×9.5 on some certificates; Anna University and some IITs/NITs use ×10; SPPU uses (CGPA − 0.75) × 10. The only reliable source is the document your board or university issued with your marks.",
      },
    ],
    assumptions: [
      "Percentage must be the final exam or transcript percentage out of 100.",
      "Select the formula that matches your specific institution — mixing formulas gives incorrect CGPA.",
      "Pakistan HEC §13.1 planning values are the band top; the exact CGPA within a band depends on individual course grades.",
    ],
  },
  "sgpa-to-cgpa": {
    howItWorks: [
      "Add each completed semester with its SGPA and total credits for that term.",
      "We multiply SGPA × credits for every semester, then divide by total credits.",
      "The result is your overall credit-weighted CGPA.",
    ],
    formula: "CGPA = Σ(SGPA × credits) ÷ Σ(credits)",
    workedExample:
      "Semesters 8.2×22, 7.8×24, and 8.5×23 → (180.4 + 187.2 + 195.5) ÷ 69 = 8.16 CGPA.",
    faqs: [
      {
        question: "What is the difference between SGPA and CGPA?",
        answer:
          "SGPA is one semester's grade point average on your institution's scale. CGPA is the credit-weighted average of all semester SGPAs across every term you have completed so far.",
      },
      {
        question: "Do all semesters need the same credits?",
        answer:
          "No. Enter the real credit total from each semester marksheet so heavier terms count more. A semester with 24 credits influences the CGPA more than one with 18.",
      },
      {
        question: "Why is simply averaging all SGPAs wrong?",
        answer:
          "A simple mean treats all semesters equally regardless of how many credits they carried. Credit-weighting gives heavier semesters their correct share. If semesters differ by even a few credits, the simple average and the credit-weighted CGPA will diverge.",
      },
      {
        question: "What is a good CGPA in Indian universities?",
        answer:
          "On a 10-point scale, most IITs and NITs consider 8.0+ (roughly equivalent to 76–80%+) a strong performance. A CGPA above 7.5 is generally competitive for campus placements; many PSU (public sector unit) recruitment drives set a 6.5 or 7.0 CGPA cutoff. Your campus placement cell's data will be the most relevant benchmark.",
      },
      {
        question: "How do I include a failed or backlogs semester in CGPA?",
        answer:
          "Enter that semester's SGPA as reported on your marksheet — most universities print an SGPA even for terms with arrears, using 0 quality points for the failed course. If your university excludes failed courses from the semester average and recalculates once you pass, use the revised SGPA from the updated marksheet.",
      },
    ],
    assumptions: [
      "SGPA values come from official marksheets, not re-estimated from individual course grades.",
      "Credits entered are the full term credit load, including any failed courses unless your university explicitly excludes them from SGPA.",
      "All semesters are on the same grading scale — do not mix a 10-point SGPA with a 4-point semester.",
    ],
  },
  "cgpa-calculator": {
    howItWorks: [
      "List this semester’s courses with letter/percent grades and credit hours.",
      "Use India 10-point (O–F) or Pakistan HEC bands — this page prefers those scales.",
      "Your semester SGPA is quality points ÷ credits. Combine terms with SGPA to CGPA next.",
    ],
    formula: "SGPA = Σ(grade points × credits) ÷ Σ(credits)",
    workedExample:
      "Physics O (10×4), Math A+ (9×4), Chemistry A (8×3) → (40+36+24) ÷ 11 = 9.09 SGPA.",
    faqs: [
      {
        question: "Is this a CGPA or SGPA calculator?",
        answer:
          "This page calculates one semester (SGPA). Use SGPA to CGPA to roll multiple semesters into overall CGPA.",
      },
      {
        question: "Which scale should Pakistan students use?",
        answer:
          "Select Pakistan HEC 4.0 (or open the Pakistan hub) so letter bands match HEC §13.1 fractionalized grading.",
      },
      {
        question: "What happens to my CGPA if I fail a course?",
        answer:
          "A failed course typically earns 0 quality points. Those credits are still in the denominator (or removed, depending on your university’s policy), so the SGPA drops sharply. Once you pass the course on retake, the new grade replaces — or averages with — the fail, depending on your institution’s rules.",
      },
      {
        question: "How do I calculate CGPA for multiple semesters?",
        answer:
          "Calculate the SGPA for each semester here, then take all SGPAs and their credit totals to the SGPA to CGPA calculator. It weights each semester by its credit load to give you the overall CGPA.",
      },
      {
        question: "What does O grade mean on the India 10-point scale?",
        answer:
          "O stands for Outstanding and corresponds to 10 quality points — the highest grade on the India 10-point CGPA scale used by many IITs, NITs, and state universities. A+ is 9 points and A is 8 points in the most common variant, though exact labels and cutoffs can differ by institution.",
      },
    ],
    assumptions: [
      "One semester at a time — enter all courses in the current term before reading SGPA.",
      "Grade points per letter follow the India 10-point or HEC 4.0 scale selected.",
      "Credits are the full load for each course; enter the value printed on your timetable or marksheet.",
    ],
  },
  "cgpa-to-gpa": {
    howItWorks: [
      "Enter your 10-point CGPA.",
      "Choose a planning method (simple ×0.4 or percentage bridge).",
      "Read an estimated US 4.0 GPA — confirm with the target school or WES for official use.",
    ],
    formula: "US GPA ≈ CGPA × 0.4 (linear) · or (CGPA × 9.5) ÷ 25 (percentage bridge)",
    workedExample: "8.2 CGPA × 0.4 ≈ 3.28 on a 4.0 scale.",
    faqs: [
      {
        question: "Is there an official 10-point to 4.0 conversion?",
        answer:
          "No single official table exists. US universities and credential evaluators (WES, ECE, Span Tran) each apply their own method. Treat this tool's output as a rough planning figure, not a number to enter on applications unless the form says to self-convert.",
      },
      {
        question: "Should I use this for Pakistan HEC CGPA?",
        answer:
          "HEC CGPA is already on a 4.0-style scale, not a 10-point scale. This converter targets Indian 10-point CGPA to US 4.0. For Pakistan HEC CGPA, compare your GPA directly to the US 4.0 standard, keeping in mind that band cutoffs differ slightly.",
      },
      {
        question: "Does US graduate school use Indian CGPA directly or convert it?",
        answer:
          "Most US graduate programs ask you to report your GPA as it appears on your transcript. They then evaluate it in context — the institution, scale, and class rank all matter. If the program requests a 4.0-scale equivalent, use the credential evaluator service they specify rather than a self-computed conversion.",
      },
      {
        question: "How does WES evaluate Indian CGPA?",
        answer:
          "WES uses its own institution-specific grade conversion tables rather than a blanket ×0.4 formula. The result depends on your specific university's grading norms. The estimate from this calculator is for personal planning only and will not match a WES evaluation for the same CGPA.",
      },
      {
        question: "Is CGPA the same as cumulative GPA in the US?",
        answer:
          "The abbreviation overlaps but the scales differ. Indian CGPA is on a 10-point scale. US cumulative GPA is on a 4.0 scale. They measure the same concept — a running weighted average — but the numbers are not interchangeable without conversion.",
      },
    ],
    assumptions: [
      "Your CGPA is on a 10-point Indian-style scale — Pakistan HEC CGPA is already 4.0-based and should not be entered here.",
      "The ×0.4 linear method and the percentage bridge are planning estimates, not official evaluation results.",
      "For WES or other credential evaluations, contact the service directly.",
    ],
  },
  "mcmaster-gpa-to-us-gpa": {
    primarySources: [
      {
        label: "McMaster — grading & GPA",
        href: "https://registrar.mcmaster.ca/grades/",
      },
    ],
    howItWorks: [
      "Enter your McMaster 12-point GPA (0–12) from your transcript or degree audit.",
      "We look up McMaster's published 12-point → US 4.0 equivalent table.",
      "Read the US 4.0 planning value — confirm with McMaster or the receiving graduate program before submitting.",
    ],
    formula: "US 4.0 = McMaster official lookup (not 12-point GPA ÷ 3)",
    workedExample: "McMaster 11 → 3.9 US 4.0 (not 11 ÷ 3 = 3.67).",
    faqs: [
      {
        question: "Why is dividing McMaster GPA by 3 wrong?",
        answer:
          "McMaster's own conversion table maps 11 to 3.9 and 10 to 3.7. Simple division by 3 overstates or misstates those values and is not McMaster's published method.",
      },
      {
        question: "Is this the same as converting Canadian percentage to US GPA?",
        answer:
          "No. This tool is only for McMaster's 12-point GPA scale. Other Canadian universities use different scales — UBC, Waterloo, and U of T each publish their own letter-to-GPA tables. Use the general Canada GPA calculator for other institutions.",
      },
      {
        question: "What is a McMaster 12-point GPA equivalent to on a US 4.0 scale?",
        answer:
          "Based on McMaster's published lookup, a 12.0 maps to 4.0, an 11 maps to approximately 3.9, a 10 maps to 3.7, a 9 maps to 3.5, and so on. The table is non-linear, so even closely spaced McMaster values can differ meaningfully in the US equivalent. Confirm directly with McMaster Registrar for the most current mapping.",
      },
      {
        question: "Should I report my McMaster GPA as-is on US graduate applications?",
        answer:
          "Most US programs ask you to enter the GPA as it appears on your transcript. If the form asks for a 4.0-scale equivalent, use McMaster's published table rather than a self-computed conversion, and note the scale (12-point) in any supporting documents or notes field.",
      },
      {
        question: "Can I use this tool for any other Canadian university?",
        answer:
          "No. McMaster uses a unique 12-point scale. Most other Canadian universities use percentage grades or a 4.0/4.33 scale that requires different conversion logic. For a general Canada GPA estimate, use the Canada GPA calculator on the Canada hub.",
      },
    ],
    assumptions: [
      "GPA is McMaster's 12-point scale — do not enter a percentage or a different university's GPA.",
      "The US 4.0 values are planning estimates based on McMaster's published equivalency table; the receiving institution makes the final evaluation.",
      "Confirm the table with McMaster Registrar for official or application use, as the mapping can be updated.",
    ],
  },
  "uk-degree-to-us-gpa-reference": {
    primarySources: [
      {
        label: "Stanford Graduate Admissions — enter GPA as on transcript",
        href: "https://gradadmissions.stanford.edu/apply/application-overview",
      },
      {
        label: "QAA — UK higher education",
        href: "https://www.qaa.ac.uk/",
      },
    ],
    howItWorks: [
      "Pick your UK degree class or enter a UK percentage mark.",
      "We map it to the standard UK classification bands (First, 2:1, 2:2, Third).",
      "See an illustrative US 4.0 comparison only — not a number to enter on US applications that request transcript-format grades.",
    ],
    formula: "Illustrative US 4.0 ≈ planning comparison only (varies by evaluator)",
    workedExample:
      "Upper Second (2:1) may appear near 3.7 on informal charts — Stanford and many US schools want the classification or transcript GPA, not a self-converted 4.0.",
    faqs: [
      {
        question: "Should I enter 3.7 on my US application for a 2:1?",
        answer:
          "Usually no. Report your classification and marks as on your transcript. Stanford Graduate Admissions explicitly says not to convert to a 4.0 scale when the transcript does not include GPA. If a form requires a 4.0 entry and your degree does not use GPA, write the classification and percentage, or contact the admissions office for guidance.",
      },
      {
        question: "Is this the same as a WES evaluation?",
        answer:
          "No. WES and other credential evaluators apply their own institution-specific methodologies that consider the year-level distribution of marks, not just the final classification. This page shows commonly cited planning comparisons only.",
      },
      {
        question: "What is a First class degree equivalent to in the US?",
        answer:
          "Informally, a UK First (70%+) is often compared to a high US GPA (roughly 3.7–4.0 range on informal charts). However, this comparison is not officially endorsed. Most US graduate programs evaluate UK applicants on the degree classification, module marks, and the institution's reputation rather than converting to a 4.0 GPA.",
      },
      {
        question: "Does a 2:2 disqualify me from US master's programs?",
        answer:
          "Not automatically. A Lower Second (2:2) is the minimum UK honours degree and is considered a completed undergraduate degree. US programs assess the full application — research experience, statement of purpose, references, and GRE/test scores often matter as much as the degree class. Some programmes set a 2:1 minimum, but others accept strong 2:2 candidates with compensating strengths.",
      },
      {
        question: "How do US schools read UK percentage marks vs degree class?",
        answer:
          "Many US admissions offices are familiar with UK classifications but less so with raw percentage marks (e.g., knowing that 68% is a high 2:1 context). Including your transcript marks alongside the classification helps reviewers who may not know that a UK 70% is not comparable to a US 70%.",
      },
    ],
    assumptions: [
      "UK degree classifications follow standard QAA bands: First 70%+, 2:1 60–69%, 2:2 50–59%, Third 40–49%.",
      "Illustrative US 4.0 comparisons are for planning reference only — not for self-reporting on applications.",
      "Individual universities may apply borderline decisions, condonement, or credit-weighted averages that change the final classification from a simple percentage average.",
    ],
  },
  "uc-gpa-calculator": {
    primarySources: [
      {
        label: "UC Admissions — GPA requirement",
        href: "https://admission.universityofcalifornia.edu/admission-requirements/first-year-requirements/gpa-requirement.html",
      },
      {
        label: "CSU — freshman admission requirements",
        href: "https://www.calstate.edu/apply/freshman/getting_into_the_csu/pages/admission-requirements.aspx",
      },
    ],
    howItWorks: [
      "Choose UC or CSU. For UC, choose California resident or nonresident.",
      "Add one row per semester of an a-g course. A year-long class is two rows.",
      "Mark approved honors, AP/IB, or a college course. The result shows capped honors points and the GPA.",
    ],
    formula:
      "GPA = (letter points + capped honors points) ÷ semester grades. A=4, B=3, C=2, D=1, F=0. Plus and minus are ignored.",
    workedExample:
      "Four UC semesters: A regular, A honors, B+ AP, B regular. Letter points are 4+4+3+3 = 14. Two honors points apply. GPA = 16 ÷ 4 = 4.00. Without honors points it is 3.50.",
    faqs: [
      {
        question: "How do you calculate UC GPA?",
        answer:
          "Use a-g letter grades from the summer after 9th grade through the summer after 11th. A=4, B=3, C=2, D=1, F=0, and plus/minus do not change those points. Add one honors point per semester of an approved honors, AP, IB, or transferable college course with a C or better, up to 8 points and no more than 4 from 10th grade.",
      },
      {
        question: "How is CSU GPA different?",
        answer:
          "CSU also uses a-g grades after 9th grade, including 12th grade. The honors cap is still 8 semesters, but only 2 of those points can come from 10th grade. A C- can earn the extra CSU point. A C- does not earn the extra UC point.",
      },
      {
        question: "Does 9th grade count?",
        answer:
          "No. Ninth-grade a-g courses can meet subject requirements, but they are not in the UC or CSU GPA. Summer after 9th grade counts as 10th grade.",
      },
      {
        question: "Is this my official UC or CSU GPA?",
        answer:
          "No. This is a planning estimate. Only courses on your school's a-g list count, and UC or CSU calculates the GPA when you apply. Do not include pass/credit grades.",
      },
    ],
  },
  "middle-school-gpa-calculator": {
    howItWorks: [
      "Add each class and the letter grade you earned.",
      "Every class counts once. There is no credit-hour column.",
      "The GPA is the average of those grade points on the US 4.0 scale.",
    ],
    formula: "GPA = (sum of grade points) ÷ (number of classes). A=4.0, B=3.0, C=2.0, D=1.0, F=0.",
    workedExample: "A, B, A, and C is 4 + 3 + 4 + 2 = 13. Divide by 4 classes. GPA = 3.25.",
    faqs: [
      {
        question: "How do you calculate middle school GPA?",
        answer:
          "Turn each letter into points (A=4, B=3, C=2, D=1, F=0), add them, and divide by the number of classes. Middle school and junior high usually do not use credit hours or Honors bonuses.",
      },
      {
        question: "Is junior high GPA the same as high school GPA?",
        answer:
          "The letters often use the same 4.0 scale, but high school may weight Honors and AP and may use credit hours. Use the high school GPA calculator for that.",
      },
      {
        question: "Do plus and minus grades count?",
        answer:
          "On the common US scale, A− is 3.7 and B+ is 3.3. If your school ignores plus and minus, enter A, B, C, D, or F only.",
      },
      {
        question: "Does middle school GPA matter for high school admissions?",
        answer:
          "For most public high schools, middle school GPA has little formal role in placement. However, some competitive magnet programs, honors tracks, and selective private high schools do look at 7th and 8th grade GPAs and grades. It is also the foundation for habits that carry into high school, where GPA affects college admissions.",
      },
      {
        question: "What is a good GPA in middle school?",
        answer:
          "A 3.0 or higher (B average) is generally considered solid. A 3.5 or above (between B+ and A−) puts a student on track for honors or advanced classes in high school. The most important factor is whether grades reflect genuine understanding, since middle school content builds directly into high school courses.",
      },
      {
        question: "How is middle school GPA different from high school GPA?",
        answer:
          "Middle school GPA typically treats all classes equally with no credit hours and no Honors or AP bonuses. High school GPA often uses credit hours (a 4-credit class counts more than a 1-credit elective) and may add weighted bonus points for advanced courses. This calculator uses the simpler equal-weight model appropriate for middle school.",
      },
    ],
    assumptions: [
      "All classes count equally — there is no credit-hour weighting in middle school GPA.",
      "Electives, PE, and study hall are included only if your school counts them in the GPA; omit them otherwise.",
      "Plus and minus grades use the US 4.0 scale sub-divisions (A− = 3.7, B+ = 3.3); toggle them off if your school uses only whole letters.",
    ],
  },
};
