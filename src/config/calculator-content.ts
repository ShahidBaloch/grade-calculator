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
          "We default to the common US 4.0 GPA scale. Your region may be detected automatically, or you can pick a different scale in the calculator settings.",
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
    ],
  },
  "weighted-grade-calculator": {
    howItWorks: [
      "Add each assignment, quiz, or exam with its score and weight.",
      "Use percentage weights or point weights — weights are normalized by their sum (100% total only if your syllabus requires it).",
      "See your weighted course average and letter grade.",
    ],
    formula: "Weighted avg = Σ(Score × Weight) ÷ Σ(Weight) — always normalized by the sum of weights you enter (100% total not required)",
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
          "We divide by the total weight you entered (normalized average), not by 100. If your syllabus says weights must total 100%, fix the rows until they do — we show the running total and a warning when percent mode ≠ 100%.",
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
          "No. This tool is one term, unweighted. Use Weighted GPA for Honors/AP bonuses, or Cumulative GPA / SGPA to CGPA to fold in previous semesters.",
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
    ],
    primarySources: [
      {
        label: "NCES — grade point average in US education statistics",
        href: "https://nces.ed.gov/programs/coe/indicator/ctr",
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
    ],
  },
  "letter-grade-calculator": {
    howItWorks: [
      "Enter the grade label for your selected scale (letters, classifications, or HD/D/C-style bands).",
      "We show the percentage range and midpoint on your scale.",
      "Useful for understanding what a letter grade means numerically.",
    ],
    formula: "Percentage = midpoint of letter grade band on selected scale",
    workedExample: "B+ on the common US 4.0 scale → approximately 89.5% (87–89% range).",
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
      {
        question: "What about Blackboard, Moodle, or Google Classroom?",
        answer:
          "Blackboard and Moodle usually use weighted categories too — enter them like assignment groups, or use the weighted grade calculator. Google Classroom is often points-based; see our LMS course grades guide for which tool fits each platform.",
      },
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
      "Choose your state admission centre. Queensland (QTAC/QCE) allows five General, four General plus Applied, or four General plus VET — not General-only. NSW (UAC) uses best two English plus best eight others. Victoria (VTAC) uses primary four plus up to two 10% increments. WA (TISC) adds LOTE, Methods, and Specialist bonuses. SA/NT (SATAC) models 90 credits (three TAS blocks plus flexible 30).",
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
          "SGPA is one semester. CGPA is the credit-weighted average of all semester SGPAs completed so far.",
      },
      {
        question: "Do all semesters need the same credits?",
        answer:
          "No. Enter the real credit total from each semester marksheet so heavier terms count more.",
      },
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
          "No single official table. Universities and evaluation services use their own. Treat this as a planning estimate.",
      },
      {
        question: "Should I use this for Pakistan HEC CGPA?",
        answer:
          "HEC is already on a 4.0 idea. This converter is for Indian 10-point CGPA mapping to US 4.0.",
      },
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
          "No. This tool is only for McMaster's 12-point GPA scale. Other Canadian universities use different scales.",
      },
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
          "Usually no. Report your classification and marks as on your transcript. Stanford Graduate Admissions explicitly says not to convert to a 4.0 scale when the transcript does not include GPA.",
      },
      {
        question: "Is this the same as a WES evaluation?",
        answer:
          "No. WES and other credential evaluators apply their own methodologies. This page shows commonly cited planning numbers only.",
      },
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
          "On the common US scale, A- is 3.7 and B+ is 3.3. If your school ignores plus and minus, enter A, B, C, D, or F only.",
      },
    ],
  },
};
