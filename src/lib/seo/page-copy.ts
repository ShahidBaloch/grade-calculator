/** Visible copy that makes each indexable URL a different search intent. */
export const DISTINCT_PAGE_COPY: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Grade Calculator & Easy Grader",
    description:
      "Free grade calculator and easy grader for quizzes and tests. Score by wrong answers, then open weighted grades, final exam score needed, and GPA. Scale follows your location.",
  },
  "/weighted-grade-calculator": {
    title: "Weighted Grade Calculator — Course & Class Average",
    description:
      "Free weighted grade calculator for class, course, and gradebook averages. Change a score to see what your grade would be.",
  },
  "/test-grade-calculator": {
    title: "Test & Exam Grade Calculator",
    description:
      "Calculate test or exam grades from correct answers, wrong answers, or bonus points. See your percentage and letter grade instantly.",
  },
  "/gpa-calculator": {
    title: "GPA Calculator — Semester & Term GPA",
    description:
      "Free GPA calculator for semester and term GPA. Add courses with letter grades or percentages and credit hours on your grading scale.",
  },
  "/final-grade-calculator": {
    title: "Final Grade Calculator — Exam Score Needed",
    description:
      "Find the score you need on a final or midterm. Enter your current grade, how much the exam is worth, and the grade you want.",
  },
  "/uc-gpa-calculator": {
    title: "UC & CSU GPA Calculator — Capped A–G Average",
    description:
      "Estimate a UC or CSU A–G GPA. UC caps at 8 honors points using grades 10–11 only; CSU includes grade 12 with only 2 honors points. Not an official application GPA.",
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
    title: "Raise GPA Calculator — Credits Needed to Hit Your Target",
    description:
      "Find how many credit hours and what grade you need to reach your target GPA. Enter current GPA and credits, set a goal, and plan semester by semester.",
  },
  "/high-school-gpa-calculator": {
    title: "High School GPA Calculator — Weighted & Unweighted",
    description:
      "Calculate a high school GPA by semester with optional Honors and AP/IB bonus points. Tracks cumulative GPA across all four years on the standard 4.0 or 5.0 scale.",
  },
  "/college-gpa-calculator": {
    title: "College GPA Calculator — Semester GPA by Credit Hours",
    description:
      "Calculate a college semester GPA weighted by credit hours. Excludes pass/fail and audited courses. Shows dean's list and good-standing thresholds on a standard 4.0 scale.",
  },
  "/percentage-to-letter-grade": {
    title: "Percentage to Letter Grade Converter — A–F Scale",
    description:
      "Convert any percentage score to a letter grade and GPA points instantly. Supports US, Canadian, and other grading scales. See where your mark falls on the A–F table.",
  },
  "/letter-grade-calculator": {
    title: "Letter Grade Calculator — Letter to Percentage & GPA Points",
    description:
      "Look up the percentage range and GPA quality points for any letter grade. Covers A+/A/A−, B+/B/B−, and below on standard and plus/minus grading scales.",
  },
  "/canvas-grade-calculator": {
    title: "Canvas Grade Calculator — Weighted Assignment Groups",
    description:
      "Calculate your Canvas LMS course grade from weighted assignment groups. Enter each group's weight and your current score to find your overall grade and what you need to pass.",
  },
  "/eoc-grade-calculator": {
    title: "EOC Grade Calculator — End-of-Course Exam Score Needed",
    description:
      "Find the End-of-Course exam score you need to hit your target report-card grade. Enter your class average, the EOC weight your state requires, and your goal grade.",
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
    title: "GCSE Grade Calculator — Percentage to 9–1 England Grade",
    description:
      "Convert a percentage mark to the England 9–1 GCSE numeric grade. See the old A*–G letter equivalent, whether it counts as a standard pass (4+), and the strong pass threshold (5+).",
  },
  "/cgpa-to-percentage": {
    title: "CGPA to Percentage Calculator — India & Pakistan Formulas",
    description:
      "Convert CGPA to percentage using CBSE ×9.5, Anna University ×10, SPPU formula, or Pakistan HEC §13.1 band minimum. Includes the unofficial ×25 shortcut for comparison.",
  },
  "/percentage-to-cgpa": {
    title: "Percentage to CGPA Calculator — Reverse Conversion",
    description:
      "Reverse-convert a percentage mark to an estimated CGPA on India or Pakistan grading scales. Choose CBSE ×9.5, ×10, SPPU, or HEC §13.1 planning band method.",
  },
  "/sgpa-to-cgpa": {
    title: "SGPA to CGPA Calculator — Credit-Weighted Semester Average",
    description:
      "Combine semester GPAs (SGPA) and their credit totals into an overall CGPA. Credit-weighted formula works for Indian 10-point and Pakistan HEC 4.0 scales.",
  },
  "/cgpa-calculator": {
    title: "CGPA Calculator — Semester SGPA from Courses & Credits",
    description:
      "Calculate one semester's SGPA from individual course grades and credit hours on a 10-point Indian or HEC 4.0 Pakistan scale. Add all semesters with the SGPA to CGPA tool.",
  },
  "/cgpa-to-gpa": {
    title: "CGPA to GPA Converter — India 10-Point to US 4.0",
    description:
      "Convert an Indian 10-point CGPA to an approximate US 4.0 GPA for graduate school planning. Shows WEF formula and linear-scale methods. Educational estimate — not a credential evaluation.",
  },
  "/mcmaster-gpa-to-us-gpa": {
    title: "McMaster GPA to US 4.0 Converter — 12-Point Scale",
    description:
      "Convert a McMaster University 12-point GPA to a US 4.0 equivalent using McMaster's published letter-grade table. Planning estimate for graduate school applications.",
  },
  "/uk-degree-to-us-gpa-reference": {
    title: "UK Degree Class to US GPA — Approximate Reference Table",
    description:
      "See how a UK First, 2:1, 2:2, or Third maps to a US 4.0 GPA for planning purposes. Includes WES context and graduate-school admission guidance. Not an official conversion.",
  },
  "/au/gpa-calculator": {
    title: "Australia GPA Calculator — UQ 7-Point and Monash 4-Point",
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
    title: "Canada GPA Calculator — University Preset",
    description:
      "Calculate a Canadian semester GPA on an illustrative 4.0-cap preset. Universities publish their own tables. McMaster’s 12-point scale uses a separate lookup.",
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
      "See the percentage band for a Canadian letter grade on the illustrative preset. Your university’s calendar overrides this chart.",
  },
  "/nz/gpa-calculator": {
    title: "New Zealand GPA Calculator — 9-Point Scale",
    description:
      "Calculate a New Zealand university GPA on the 9-point scale, where A+ is 9. NCEA achieved, merit, and excellence are a different system.",
  },
  "/nz/cumulative-gpa-calculator": {
    title: "New Zealand Cumulative GPA Calculator",
    description:
      "Combine New Zealand university terms on the 9-point GPA scale. Use the same grade-point table for every term.",
  },
  "/nz/letter-grade-calculator": {
    title: "New Zealand Letter Grade Calculator — 9-Point University Scale",
    description:
      "Look up a New Zealand university letter grade on the 9-point scale (A+ = 9). See the percentage band and GPA equivalent. This is a university grade, not an NCEA result.",
  },
  "/uk/degree-classification-calculator": {
    title: "UK Degree Classification Calculator — First, 2:1, 2:2",
    description:
      "Turn UK module marks into a degree class: First, 2:1, 2:2, or Third. UK results are not a US 4.0 GPA.",
  },
  "/in/gpa-calculator": {
    title: "India GPA Calculator — 10-Point CGPA",
    description:
      "Average Indian course grades on a 10-point CGPA scale. For a percentage, use the CGPA-to-percentage calculator and your board’s formula.",
  },
  "/pk/gpa-calculator": {
    title: "Pakistan GPA Calculator — HEC Scale",
    description:
      "Calculate a semester GPA on the Pakistan HEC-style scale. Confirm the grade-point table in your university prospectus.",
  },
  "/pk/cumulative-gpa-calculator": {
    title: "Pakistan Cumulative GPA Calculator — HEC 4.0 Scale",
    description:
      "Combine Pakistani university semesters into an overall CGPA on the HEC 4.0 letter scale. Enter prior CGPA and credits, then add this term's courses.",
  },
  "/pk/cgpa-to-percentage": {
    title: "Pakistan CGPA to Percentage Calculator — HEC §13.1",
    description:
      "Convert HEC CGPA to percentage using the §13.1 band minimum table. Includes the ×25 shortcut for comparison. HEC has notified it stopped converting CGPA into percentage — use your transcript value for applications.",
  },
  "/pk/percentage-to-cgpa": {
    title: "Pakistan Percentage to CGPA Calculator — HEC Scale",
    description:
      "Reverse-convert a percentage mark to an estimated HEC CGPA band. Choose the §13.1 band planning method or the unofficial ×25 shortcut. Your transcript percentage is the authoritative figure.",
  },
  "/pk/cgpa-calculator": {
    title: "Pakistan Semester CGPA Calculator — HEC Grading",
    description:
      "Calculate one semester's SGPA on the Pakistan HEC 4.0 letter scale (A+ through F). Enter each course with its letter grade and credit hours, then roll semesters into overall CGPA with the SGPA to CGPA tool.",
  },
  "/pk/sgpa-to-cgpa": {
    title: "Pakistan SGPA to CGPA Calculator — HEC Semester Formula",
    description:
      "Combine HEC semester GPAs (SGPA) into an overall CGPA. Enter each semester's SGPA and credit total. The credit-weighted result is your Pakistan CGPA.",
  },
  "/about": {
    title: "About GradeCalculator — Free Grade & GPA Tools",
    description:
      "Who builds GradeCalculator (gradcalc.com), why the tools are free, how we handle privacy, and how to report a formula error.",
  },
  "/disclaimer": {
    title: "Educational Disclaimer — Planning Estimates Only",
    description:
      "GradeCalculator results are for planning only. They are not official grades, GPAs, ATARs, or transcript values — always confirm with your school or registrar.",
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
      "Plain-language definitions of GPA, CGPA, SGPA, weighted GPA, quality points, and other terms used across GradeCalculator tools.",
  },
};

export function pageTitle(path: string, fallback: string): string {
  return DISTINCT_PAGE_COPY[path]?.title ?? fallback;
}

export function pageDescription(path: string, fallback: string): string {
  return DISTINCT_PAGE_COPY[path]?.description ?? fallback;
}
