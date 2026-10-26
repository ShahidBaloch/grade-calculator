/** Visible copy that makes each indexable URL a different search intent. */
export const DISTINCT_PAGE_COPY: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Grade Calculator — Free EZ Grader & Grading Calculator",
    description:
      "Free grade calculator for US teachers and students. Enter questions and wrong answers to get the score, percentage, letter grade, and a full grading chart.",
  },
  "/weighted-grade-calculator": {
    title: "Weighted Grade Calculator — Gradebook & Class Average",
    description:
      "Free weighted grade calculator and gradebook. Add each category or grading period with its weight to see your class or course average update instantly.",
  },
  "/test-grade-calculator": {
    title: "Test & Exam Grade Calculator — Score Any Quiz",
    description:
      "Calculate test or exam grades from correct or wrong answers. See what 11 out of 15 or 12 out of 20 is as a percentage and letter grade, with bonus points.",
  },
  "/gpa-calculator": {
    title: "GPA Calculator — Semester & Term GPA",
    description:
      "Free GPA calculator for semester and term GPA. Add courses with letter grades or percentages and credit hours on your grading scale.",
  },
  "/average-grade-calculator": {
    title: "Average Grade Calculator — Test & Class Average",
    description:
      "Free average grade calculator: average test scores, marks, or a whole class list. Paste scores to get the mean, median, high, low, and letter grade.",
  },
  "/grade-chart": {
    title: "Grade Chart — Score to Percentage & Letter Grade",
    description:
      "Free printable grade chart: every score out of 10, 20, 50, 100, 150, 200, or any total, with its percentage, letter grade, and points needed per grade.",
  },
  "/final-grade-calculator": {
    title: "Final Grade Calculator — Midterm & Exam Score Needed",
    description:
      "Find the score you need on your final exam or midterm. Enter your current grade, the exam weight, and your target grade to see the score you need.",
  },
  "/uc-gpa-calculator": {
    title: "UC GPA Calculator — Capped & Unweighted A–G GPA",
    description:
      "Free UC GPA calculator: enter 10th and 11th grade a-g semester grades to get your capped UC GPA (8 honors points max, 4 from 10th grade) and unweighted GPA.",
  },
  "/csu-gpa-calculator": {
    title: "CSU GPA Calculator — Cal State A–G GPA with Honors",
    description:
      "Free CSU GPA calculator: enter 10th–12th grade a-g semester grades to get your Cal State GPA with up to 8 honors points (2 from 10th grade). Planning estimate.",
  },
  "/middle-school-gpa-calculator": {
    title: "Middle School GPA Calculator — Junior High",
    description:
      "Free middle school and junior high GPA calculator. Enter each class letter grade. Every class counts the same — no credit hours and no Honors or AP bonus.",
  },
  "/cumulative-gpa-calculator": {
    title: "Cumulative GPA Calculator — Multiple Semester GPA",
    description:
      "Combine grades from two or more semesters into one overall GPA. Enter each term's GPA and credit hours, or add courses directly. Works on any 4.0 scale.",
  },
  "/weighted-gpa-calculator": {
    title: "Weighted GPA Calculator — Honors, AP & IB Bonus Points",
    description:
      "Calculate a weighted GPA that adds Honors (+0.5) and AP or IB (+1.0) bonus points. See both weighted and unweighted results side by side on a 5.0 scale.",
  },
  "/raise-gpa-calculator": {
    title: "Raise GPA Calculator — Credits to Hit Your Target",
    description:
      "Find how many credit hours and what grade you need to reach your target GPA. Enter current GPA and credits, set a goal, and plan semester by semester.",
  },
  "/high-school-gpa-calculator": {
    title: "High School GPA Calculator — Weighted & Unweighted",
    description:
      "Calculate high school GPA by semester with optional Honors and AP/IB bonus points. Tracks cumulative GPA over four years on a 4.0 or 5.0 scale.",
  },
  "/college-gpa-calculator": {
    title: "College GPA Calculator — Semester GPA by Credit Hours",
    description:
      "Calculate college semester GPA weighted by credit hours. Excludes pass/fail and audited courses, and shows dean's list and good-standing thresholds.",
  },
  "/percentage-to-letter-grade": {
    title: "US Percentage to Letter Grade — A–F Scale",
    description:
      "Convert a percentage to a US A–F letter and 4.0 points, including plus and minus bands. A typical B is 83–86%. India and Pakistan CGPA use a different calculator.",
  },
  "/letter-grade-calculator": {
    title: "US Letter Grade Calculator — A–F to Percent",
    description:
      "Look up the US percentage band and 4.0 points for A+ through F. India 10-point CGPA and Pakistan HEC letters use a different calculator.",
  },
  "/canvas-grade-calculator": {
    title: "Canvas Grade Calculator — Weighted Groups & What-If",
    description:
      "Free Canvas grade calculator for US students. Enter each assignment group's weight and score to check your Canvas course grade and what you need on the rest.",
  },
  "/grade-percentage-calculator": {
    title: "Grade Percentage Calculator — Points to % & Letter",
    description:
      "Free grade percentage calculator: turn points earned out of points possible into a percentage and US letter grade, or convert any percentage to A–F.",
  },
  "/college-grade-calculator": {
    title: "College Grade Calculator — Grade from Your Syllabus",
    description:
      "Calculate your college class grade from syllabus weights for exams, homework, labs, and participation. See your current grade and what you need to finish.",
  },
  "/eoc-grade-calculator": {
    title: "EOC Calculator — End-of-Course Exam Score Needed",
    description:
      "Free EOC calculator: enter your class average, your state's EOC weight (e.g. 30% in Florida) and goal grade to see the End-of-Course exam score you need.",
  },
  "/degree-classification-calculator": {
    title: "UK Degree Classification Calculator — First, 2:1, 2:2, Third",
    description:
      "Predict your UK degree classification from credit-weighted module marks. Supports Year 2 and Year 3 weighting (e.g. 40/60). Covers First, Upper Second, Lower Second, and Third.",
  },
  "/atar-calculator": {
    title: "ATAR Calculator — Australian Year 12 Planning Estimate",
    description:
      "Estimate an ATAR from scaled subject scores for NSW, Victoria, Queensland, Western Australia, or SA/NT. Covers English requirements, bonus subjects, and VET inclusions. Educational model only.",
  },
  "/gcse-grade-calculator": {
    title: "GCSE Grade Calculator — Percentage to 9–1 Grade",
    description:
      "Convert a percentage mark to an England 9–1 GCSE grade. See the old A*–G equivalent and whether it is a standard pass (4+) or strong pass (5+).",
  },
  "/cgpa-to-percentage": {
    title: "CGPA to Percentage — India & Pakistan",
    description:
      "Convert India or Pakistan CGPA to a percentage with CBSE ×9.5, ×10, SPPU, or HEC §13.1. HEC’s B band is 71–74%, which is a different scale from US A–F.",
  },
  "/percentage-to-cgpa": {
    title: "Percentage to CGPA — India & Pakistan",
    description:
      "Turn an India or Pakistan percentage into CGPA with CBSE ÷9.5, ×10, SPPU, or HEC §13.1. For a US A–F letter from a percentage, use the US letter converter.",
  },
  "/sgpa-to-cgpa": {
    title: "SGPA to CGPA — India & Pakistan Terms",
    description:
      "Combine India 10-point or Pakistan HEC semester SGPAs and credits into one CGPA. A US 4.0 cumulative GPA is a different calculator.",
  },
  "/cgpa-calculator": {
    title: "CGPA Calculator — India 10-Point SGPA",
    description:
      "Calculate semester SGPA from India 10-point grades (O–F) and credits. Choose Pakistan HEC in the grading scale for HEC letters. US A–F percentages use the letter grade calculator.",
  },
  "/cgpa-to-gpa": {
    title: "India CGPA to US 4.0 — Planning Estimate",
    description:
      "Estimate a US 4.0 from an Indian 10-point CGPA for planning only. A US class percentage still converts on the A–F letter calculator, not this one.",
  },
  "/mcmaster-gpa-to-us-gpa": {
    title: "McMaster GPA Calculator — 12-Point to US 4.0 GPA",
    description:
      "Free McMaster GPA calculator: convert a McMaster 12-point GPA to a US 4.0 equivalent using McMaster's published letter-grade table.",
  },
  "/uk-degree-to-us-gpa-reference": {
    title: "UK Degree Class to US GPA — Reference Table",
    description:
      "See how a UK First, 2:1, 2:2, or Third compares to a US 4.0 GPA for planning, with WES context and grad-school guidance. Not an official conversion.",
  },
  "/au/gpa-calculator": {
    title: "Australia GPA Calculator — UQ 7-Point, Monash 4-Point",
    description:
      "Work out an Australian university GPA. UQ uses numeric grades 1–7. Monash uses a 4-point scale, with a fail at 0.3. This is not a US 4.0 calculator.",
  },
  "/au/cumulative-gpa-calculator": {
    title: "Australia Cumulative GPA Calculator",
    description:
      "Combine more than one term on an Australian GPA scale. Choose the UQ 7-point or Monash 4-point preset. Do not mix those points with a US 4.0.",
  },
  "/au/atar-calculator": {
    title: "ATAR Calculator — Australian Year 12 Planning Estimate",
    description:
      "Estimate an ATAR from scaled subject scores for your state. This is a planning model, not an official UAC, VTAC, QTAC, SATAC, or TISC result.",
  },
  "/ca/gpa-calculator": {
    title: "Canada GPA Calculator — Percentage to 4.0 GPA",
    description:
      "Free Canadian GPA calculator: enter percentages or letter grades with credits to get your 4.0 GPA. McMaster 12-point and A+ = 4.33 scales have separate tools.",
  },
  "/ca/college-gpa-calculator": {
    title: "Canada College GPA Calculator",
    description:
      "Average Canadian university courses by letter grade and credit weight on the Canada preset. Confirm the cut-offs in your faculty calendar.",
  },
  "/ca/cumulative-gpa-calculator": {
    title: "Canada Cumulative GPA Calculator",
    description:
      "Combine Canadian terms into one GPA. Keep the same institution’s scale for every term. Do not divide a McMaster 12-point GPA by 3.",
  },
  "/ca/letter-grade-calculator": {
    title: "Canada Letter Grade Calculator",
    description:
      "See the percentage band for a Canadian letter grade on the illustrative preset. Your university’s calendar overrides this chart. India CGPA and Pakistan HEC are separate tools.",
  },
  "/nz/gpa-calculator": {
    title: "New Zealand GPA Calculator — 9-Point Scale",
    description:
      "Calculate a New Zealand university GPA on the 9-point scale, where A+ is 9. NCEA achieved, merit, and excellence are a different system.",
  },
  "/nz/cumulative-gpa-calculator": {
    title: "New Zealand Cumulative GPA Calculator",
    description:
      "Combine New Zealand university terms into one cumulative GPA on the 9-point scale. Use the same grade-point table for every term.",
  },
  "/nz/letter-grade-calculator": {
    title: "NZ Letter Grade Calculator — 9-Point University Scale",
    description:
      "Look up a New Zealand university letter on the 9-point scale (A+ = 9), with its percentage band. University grades, not NCEA, US A–F, or India CGPA.",
  },
  "/uk/degree-classification-calculator": {
    title: "UK Degree Classification Calculator — First, 2:1, 2:2",
    description:
      "Turn UK module marks into a degree class: First, 2:1, 2:2, or Third, using credit-weighted averages. UK results are not a US 4.0 GPA.",
  },
  "/in/gpa-calculator": {
    title: "India Semester GPA — 10-Point O–F Average",
    description:
      "Average this term’s India 10-point course grades (O–F) and credits. CBSE percentage formulas and Pakistan HEC live on the CGPA converters. US A–F is a different scale.",
  },
  "/pk/gpa-calculator": {
    title: "Pakistan HEC Term GPA — One Semester",
    description:
      "Average one Pakistan semester on the HEC 4.0 scale. HEC’s B band is 71–74%, unlike a US B at 83–86%. CGPA-to-percentage uses the HEC converter.",
  },
  "/pk/cumulative-gpa-calculator": {
    title: "Pakistan Cumulative CGPA — Add This Term",
    description:
      "Add this term’s HEC courses to a prior CGPA and credit total. If you already have each semester’s SGPA, use SGPA to CGPA. This is not a US 4.0 cumulative GPA.",
  },
  "/pk/cgpa-to-percentage": {
    title: "Pakistan CGPA to Percentage — HEC §13.1",
    description:
      "Convert HEC CGPA to a percentage with the §13.1 band table, or compare the ×25 shortcut. This is not a US A–F letter chart. Use the percentage on your transcript.",
  },
  "/pk/percentage-to-cgpa": {
    title: "Pakistan Percentage to CGPA — HEC Scale",
    description:
      "Convert a Pakistan percentage to an estimated HEC CGPA with §13.1 bands or the ×25 shortcut. A US percentage-to-letter conversion uses the A–F calculator.",
  },
  "/pk/cgpa-calculator": {
    title: "Pakistan SGPA — HEC Course Grades",
    description:
      "Turn this semester’s HEC course grades and credits into SGPA, then combine finished terms into CGPA. HEC letters are not the US A–F percentage chart.",
  },
  "/pk/sgpa-to-cgpa": {
    title: "Pakistan SGPA to CGPA — HEC Formula",
    description:
      "Combine marksheet SGPAs and their credit totals into a Pakistan CGPA. Use this when each semester SGPA is already printed. A US 4.0 cumulative GPA is separate.",
  },
  "/about": {
    title: "About GradCalc — Free Grade & GPA Tools",
    description:
      "Who builds GradCalc (gradcalc.com), why the tools are free, how we handle privacy, and how to report a formula error.",
  },
  "/disclaimer": {
    title: "Educational Disclaimer — Planning Estimates Only",
    description:
      "GradCalc results are for planning only. They are not official grades, GPAs, ATARs, or transcript values — always confirm with your school or registrar.",
  },
  "/guides": {
    title: "Grade & GPA Guides — How-To Articles",
    description:
      "Free guides on GPA, weighted grades, final exam targets, LMS gradebooks, and grading scales. Many articles include an embedded calculator.",
  },
  "/guides/final-exam-tips": {
    title: "Final Exam Study Tips — Hit Your Target Score",
    description:
      "Turn the score you need on a final into a study plan. Learn when the target is already locked in and when to use the final grade calculator.",
  },
  "/guides/gpa-glossary": {
    title: "GPA & Grading Glossary — CGPA, SGPA, Quality Points",
    description:
      "Plain-language definitions of GPA, CGPA, SGPA, weighted GPA, quality points, and other terms used across GradCalc tools.",
  },
};

export function pageTitle(path: string, fallback: string): string {
  return DISTINCT_PAGE_COPY[path]?.title ?? fallback;
}

export function pageDescription(path: string, fallback: string): string {
  return DISTINCT_PAGE_COPY[path]?.description ?? fallback;
}
