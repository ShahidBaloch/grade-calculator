import type { CalculatorSlug } from "@/types/calculator";
import type { FaqItem } from "@/types/seo";

export interface GuideConfig {
  slug: string;
  path: string;
  title: string;
  description: string;
  keywords: string[];
  readTime: string;
  embeddedCalculator?: CalculatorSlug;
  relatedGuides: string[];
  relatedCalculators: CalculatorSlug[];
  sections: Array<{ heading: string; body: string }>;
  faqs: FaqItem[];
}

export const guides: GuideConfig[] = [
  {
    slug: "how-to-calculate-gpa",
    path: "/guides/how-to-calculate-gpa",
    title: "How to Calculate GPA",
    description:
      "Learn how to calculate semester and cumulative GPA step by step, with examples and a free GPA calculator.",
    keywords: ["how to calculate gpa", "gpa formula", "semester gpa", "college gpa"],
    readTime: "12 min read",
    embeddedCalculator: "gpa-calculator",
    relatedGuides: ["how-to-calculate-weighted-grades", "what-grade-do-i-need-on-my-final", "how-to-raise-your-gpa"],
    relatedCalculators: ["gpa-calculator", "cumulative-gpa-calculator"],
    sections: [
      {
        heading: "What is GPA?",
        body:
          "Grade Point Average (GPA) summarizes your academic performance on a numeric scale. In the US, an A is typically worth 4.0 points, a B is 3.0, and so on. Your semester GPA is the average of all course GPA points weighted by credit hours.",
      },
      {
        heading: "The GPA formula",
        body:
          "GPA = Total Quality Points ÷ Total Credit Hours. Quality points for each course = GPA points for that letter grade × credit hours. For example, an A (4.0) in a 3-credit course contributes 12 quality points.",
      },
      {
        heading: "Step-by-step example",
        body:
          "Suppose you earned an A in English (3 credits), B+ in Math (4 credits), and A- in History (3 credits). Convert each grade to GPA points, multiply by credits, sum the quality points (12 + 13.2 + 11.1 = 36.3), and divide by total credits (10). Your semester GPA is 3.63.",
      },
      {
        heading: "Cumulative vs semester GPA",
        body:
          "Semester GPA covers one term. Cumulative GPA combines all completed semesters. Use our cumulative GPA calculator to add your previous GPA and credits to your current semester results.",
      },
      {
        heading: "Tips for raising your GPA",
        body:
          "Focus on high-credit courses where improvement has the biggest impact. Track assignments with the weighted grade calculator so you know where you stand before finals. Plan your final exam target with the final grade calculator.",
      },
      {
        heading: "Quality points in plain language",
        body:
          "Quality points are just GPA points multiplied by credits. A 3-credit A (4.0) is 12 quality points. A 4-credit B (3.0) is also 12 quality points. That is why a hard 4-credit course moves your GPA more than a 1-credit seminar with the same letter.",
      },
      {
        heading: "What this calculator does not do",
        body:
          "The semester GPA tool ignores past terms, Honors/AP bonuses, and pass/fail rules. If you need those, switch to cumulative GPA, weighted GPA, or the college GPA page so the story matches your transcript.",
      },
      {
        heading: "How credit hours change the story",
        body:
          "Imagine two students who both earned one A and one C. Student A took a 1-credit seminar (A) and a 4-credit lab (C). Student B did the reverse. Student A’s GPA is pulled toward the C because four of five credits sit there. Student B’s GPA is pulled toward the A. Always list real credit hours from the registrar, not “one row per class” with fake 3s.",
      },
      {
        heading: "Plus/minus and school-specific tables",
        body:
          "A B+ is 3.3 on the common US 4.0 table, but some high schools still use A=4, B=3 with no plus/minus. A few colleges give A+ a 4.3. If your transcript legend disagrees with our default, change the scale selector before you trust the number. The formula never changes — only the letter-to-points map does.",
      },
      {
        heading: "Repeated courses and withdrawals",
        body:
          "Some schools replace the first attempt when you retake a course; others average both. Withdrawals (W) usually add no quality points and no credits. Incompletes (I) should wait until a letter posts. If your policy is replacement, delete the old row. If your policy is averaging, keep both attempts.",
      },
      {
        heading: "Transfer credit",
        body:
          "Transfer hours often count toward graduation but not GPA. Do not paste a community-college 4.0 into a university cumulative calculator unless your new school says those grades stay on the GPA. When in doubt, use only courses that appear in the GPA hours column of your unofficial transcript.",
      },
      {
        heading: "Semester vs term vs quarter",
        body:
          "A semester is usually 15 weeks and 12–18 credits. Quarters are shorter and list more terms per year. The math is identical: quality points divided by attempted GPA hours. If you attend a quarter school, add one period per quarter in the high school or cumulative tools instead of forcing two “semesters.”",
      },
      {
        heading: "Worked example with mixed percents and letters",
        body:
          "You can type 92 instead of A− if that is what the portal shows. We convert 92 through the selected scale (US Standard A− = 3.7) then multiply by credits. Mixing “A” in one row and “88” in another is fine as long as both rows use the same scale. Do not mix a UK 68 (2:1) with a US B+ on the same 4.0 table.",
      },
      {
        heading: "When to open a different GPA tool",
        body:
          "One term, unweighted → this guide’s calculator. Several terms on a transcript → cumulative GPA. Honors/AP bonuses → weighted or high school GPA. Planning a target after 60 credits → raise GPA. UK module marks → degree classification, not a 4.0 tool.",
      },
    ],
    faqs: [
      {
        question: "Is a 3.5 GPA good?",
        answer: "A 3.5 GPA is generally considered strong — between a B+ and A- average on the 4.0 scale.",
      },
      {
        question: "What's the difference between weighted and unweighted GPA?",
        answer:
          "Unweighted GPA treats all courses equally. Weighted GPA adds extra points for honors or AP classes.",
      },
    ],
  },
  {
    slug: "what-grade-do-i-need-on-my-final",
    path: "/guides/what-grade-do-i-need-on-my-final",
    title: "What Grade Do I Need on My Final?",
    description:
      "Find out what score you need on your final exam to reach your target course grade, with formula and examples.",
    keywords: [
      "what grade do i need on my final",
      "final exam calculator",
      "what do i need on my final",
    ],
    readTime: "11 min read",
    embeddedCalculator: "final-grade-calculator",
    relatedGuides: ["how-to-calculate-weighted-grades", "how-to-calculate-gpa"],
    relatedCalculators: ["final-grade-calculator", "weighted-grade-calculator"],
    sections: [
      {
        heading: "Why this matters",
        body:
          "Before finals week, students want a clear target: what score do I need to get the grade I want? The answer depends on your current course average and how much the final exam counts toward your total grade.",
      },
      {
        heading: "The formula",
        body:
          "Required Final % = (Target Grade − Current Grade × (1 − Final Weight)) ÷ Final Weight. If the final is worth 40% of your grade, then w = 0.40. Plug in your numbers and solve.",
      },
      {
        heading: "Worked example",
        body:
          "Current grade: 85%. Target: 90%. Final worth 40%. Required = (90 − 85 × 0.60) / 0.40 = (90 − 51) / 0.40 = 97.5%. You need 97.5% on the final to finish with a 90% in the course.",
      },
      {
        heading: "When it's impossible",
        body:
          "If the required score is above 100%, you cannot reach your target through the final alone — even a perfect exam won't get you there. Consider adjusting your goal or speaking with your instructor about extra credit.",
      },
      {
        heading: "Study smarter",
        body:
          "Once you know your target, prioritize study time on high-weight topics. Update your weighted grade calculator as you receive new assignment scores so your current grade stays accurate.",
      },
      {
        heading: "Get the current grade right first",
        body:
          "The formula is only as good as the current average you type. If Canvas still has unposted quizzes or a dropped-lowest rule you forgot, your “85%” may actually be 82%. Recalculate the course with the weighted or Canvas tool, then paste that number into the final-grade calculator.",
      },
      {
        heading: "How weight is defined",
        body:
          "If the syllabus says “the final is 40% of the course,” use 40. If it says “the final is 200 points out of 500,” that is also 40%. Do not enter 200 as the weight unless you are in points mode. Mixing a percent current grade with a point weight will invent a nonsense required score.",
      },
      {
        heading: "Already-met and impossible results",
        body:
          "Already met means even a zero (or a very low score) keeps the letter — still check for a minimum-final rule. Impossible means a 100% cannot reach the target. The honest move is to lower the letter goal or ask about remaining assignments, not to assume the calculator is “wrong.”",
      },
      {
        heading: "Multiple finals or a practical plus a written paper",
        body:
          "If you have two remaining assessments, treat them as one combined weight only when they are scored as a single bucket. If they are separate (lab practical 15%, written 25%), use the weighted grade calculator to model both, or run the final-grade tool twice with updated current grades after the first exam.",
      },
      {
        heading: "EOC and other high-stakes tests",
        body:
          "A state End-of-Course exam is not a teacher-written final. Use the EOC calculator when the district publishes a 20–30% EOC weight. Use this guide’s tool for classroom finals, including reverse and drop-lowest modes.",
      },
      {
        heading: "A second worked example",
        body:
          "Current 78%, want 80%, final 25%. Required = (80 − 78 × 0.75) / 0.25 = (80 − 58.5) / 0.25 = 86%. That is a B on many US scales — a realistic weekend of study, not a miracle. Compare that with wanting 90%: required = (90 − 58.5) / 0.25 = 126%, which the calculator will flag as impossible.",
      },
    ],
    faqs: [
      {
        question: "What if I already met my target?",
        answer:
          "If the calculator shows you've already met your target, you need 0% or less on the final to maintain it — meaning you're in good shape.",
      },
      {
        question: "Does the final weight include homework?",
        answer:
          "Your current grade should already reflect homework, quizzes, and midterms. The final weight is only the portion the final exam counts toward.",
      },
    ],
  },
  {
    slug: "how-to-calculate-weighted-grades",
    path: "/guides/how-to-calculate-weighted-grades",
    title: "How to Calculate Weighted Grades",
    description:
      "Learn how weighted averages work for course grades, with a step-by-step formula and free weighted grade calculator.",
    keywords: [
      "how to calculate weighted grades",
      "weighted grade calculator",
      "weighted average grade",
    ],
    readTime: "11 min read",
    embeddedCalculator: "weighted-grade-calculator",
    relatedGuides: ["what-grade-do-i-need-on-my-final", "how-to-calculate-gpa"],
    relatedCalculators: ["weighted-grade-calculator", "final-grade-calculator"],
    sections: [
      {
        heading: "What is a weighted grade?",
        body:
          "A weighted grade gives different assignments different importance. A final exam might count for 40% while homework counts for 20%. Your course average is a weighted average, not a simple mean.",
      },
      {
        heading: "The formula",
        body:
          "Weighted Average = Σ(Score × Weight) ÷ Σ(Weight). Each category contributes proportionally to its weight. If homework is 20% at 92% and the midterm is 30% at 85%, homework contributes 18.4 points and the midterm contributes 25.5 points to the numerator.",
      },
      {
        heading: "Step-by-step example",
        body:
          "Homework 92% (weight 20), Midterm 85% (weight 30), Final 88% (weight 50). Weighted avg = (92×20 + 85×30 + 88×50) ÷ 100 = (1840 + 2550 + 4400) ÷ 100 = 87.9%.",
      },
      {
        heading: "Weights not totaling 100%",
        body:
          "Some teachers use weights that don't sum to exactly 100%. The formula still works — you're dividing by the total weight used. Our calculator warns you if weights don't add to 100%.",
      },
      {
        heading: "Letter grades in weighted calculations",
        body:
          "If your syllabus uses letter grades, convert each letter to a percentage midpoint (B+ = 88%, A- = 91%) before applying weights. Our calculator handles this automatically.",
      },
      {
        heading: "Percent weights vs point weights",
        body:
          "Percent weights should add to 100 (homework 20, midterm 30, final 50). Point weights are raw totals (homework 200 points, tests 300). Both use the same formula: sum of score times weight, divided by total weight. Switch the weight-format toggle so the labels match your syllabus language.",
      },
      {
        heading: "When weights do not add to 100%",
        body:
          "Teachers sometimes publish 20/20/20/50 by accident. We still divide by the total you typed and show a warning. Ask whether the extra 10% is extra credit, a missing category, or a typo. Canvas may also hide a 0% group until something is posted.",
      },
      {
        heading: "Dropped scores and extra credit",
        body:
          "If the syllabus drops the lowest quiz, omit that quiz from the list rather than giving it a zero. Extra credit that adds points after the average is not a weight — add it as bonus in the test-grade tool or raise the category score first.",
      },
      {
        heading: "Canvas groups vs a paper syllabus",
        body:
          "Canvas shows assignment-group weights. A paper syllabus may list individual assignments. Use the Canvas calculator when you are copying group averages from the LMS. Use this weighted tool when you have named rows (Homework, Midterm, Final) from a PDF syllabus.",
      },
      {
        heading: "From course average to GPA",
        body:
          "A weighted course average is still a percent. Convert it to a letter on your scale, then put that letter into the GPA calculator with the course’s credit hours. Do not average four course percents and call that a GPA — GPA is credit-weighted letter points, not a mean of percentages.",
      },
      {
        heading: "UK and Australian weighting",
        body:
          "UK degrees often weight Year 3 more than Year 2. That is year weighting, not assignment weighting — use the degree classification calculator. Australian course grades use HD/D/C/P bands; you can still use this tool for a single unit, then read the letter on the Australian scale.",
      },
    ],
    faqs: [
      {
        question: "Weighted vs unweighted — what's the difference?",
        answer:
          "Unweighted treats every assignment equally. Weighted assigns different percentages to categories like tests, homework, and participation.",
      },
      {
        question: "Can I use points instead of percentages?",
        answer:
          "Yes. If your teacher says the final is worth 200 points and homework 100 points, use point weights in our calculator.",
      },
    ],
  },
  {
    slug: "gpa-scale-explained",
    path: "/guides/gpa-scale-explained",
    title: "GPA Scale Explained",
    description:
      "How 4.0, 4.33, 5.0, and 7.0 GPA scales differ, and how to read letter grades on each one.",
    keywords: ["gpa scale", "4.0 scale", "gpa explained", "letter grade gpa"],
    readTime: "11 min read",
    relatedGuides: ["weighted-vs-unweighted-gpa", "how-to-calculate-gpa"],
    relatedCalculators: ["gpa-calculator", "percentage-to-letter-grade", "degree-classification-calculator", "atar-calculator"],
    sections: [
      {
        heading: "A scale is a translation table",
        body:
          "GPA is not a universal number. It is a letter or percentage run through a table. On the common US 4.0 scale, A is 4.0 and F is 0. On a 4.33 scale, A+ can sit above 4.0. On a high school weighted 5.0 scale, AP A can be 5.0. Australia’s 7-point scale uses High Distinction as 7. If you mix those tables, the average is meaningless.",
      },
      {
        heading: "US Standard 4.0",
        body:
          "Most US colleges treat A and A+ as 4.0, A− as 3.7, B+ as 3.3, and so on down to F at 0. Percent bands vary: one school’s B starts at 83%, another at 80%. Our US Standard table uses 93–96 for A. Always compare to your syllabus.",
      },
      {
        heading: "Weighted 5.0 high school scales",
        body:
          "Many US high schools add 0.5 for Honors and 1.0 for AP or IB, then cap at 5.0. A student with mostly AP A’s can show 4.6 weighted and 3.9 unweighted. Colleges often recompute both. Use the weighted GPA calculator when you need the bonus version.",
      },
      {
        heading: "UK classifications are not GPA",
        body:
          "UK degrees are labelled First, 2:1, 2:2, and Third from percentage averages. There is no official conversion to 4.0. If an application form asks for GPA, follow that university’s published chart rather than a generic website.",
      },
      {
        heading: "Canada, Australia, and New Zealand",
        body:
          "Canada may use 4.0 or 4.33. Australia commonly uses HD/D/C/P on a 7-point GPA. Several New Zealand universities use a 9-point letter scale. Open the matching grading-scale page before you convert a mark.",
      },
      {
        heading: "How to pick a scale in our tools",
        body:
          "Every calculator has a scale selector. Change it before you trust the letter or GPA output. Geo detection only applies when the host sends a country header; locally it stays on US Standard until you change it.",
      },
      {
        heading: "ATAR is a rank, not a GPA",
        body:
          "An Australian ATAR of 80.00 means the student is around the 80th percentile of the Year 12 cohort after scaling. It is not a course average. After enrolment, universities usually switch to a 7-point GPA. Do not paste an ATAR into a US 4.0 box.",
      },
      {
        heading: "Transcript legends beat any website",
        body:
          "If your PDF says A = 4.3 or HD = 7, that row wins. Use our tables to estimate, then overwrite the letter-to-points map mentally when the legend disagrees.",
      },
    ],
    faqs: [
      {
        question: "Is 4.0 the highest possible GPA?",
        answer:
          "On an unweighted US college scale, yes. Weighted high school and some Canadian A+ scales go higher.",
      },
      {
        question: "Can I compare GPAs from two countries?",
        answer:
          "Only with that institution’s conversion policy. The same 70% is a First in the UK and often a C in the US.",
      },
    ],
  },
  {
    slug: "weighted-vs-unweighted-gpa",
    path: "/guides/weighted-vs-unweighted-gpa",
    title: "Weighted vs Unweighted GPA",
    description:
      "The difference between unweighted 4.0 GPA and weighted Honors/AP GPA, with examples.",
    keywords: ["weighted vs unweighted gpa", "weighted gpa", "unweighted gpa"],
    readTime: "10 min read",
    relatedGuides: ["gpa-scale-explained", "how-to-raise-your-gpa"],
    relatedCalculators: ["weighted-gpa-calculator", "high-school-gpa-calculator"],
    sections: [
      {
        heading: "Unweighted GPA treats every course the same",
        body:
          "An A in PE and an A in AP Calculus are both 4.0 on an unweighted scale. That is useful for comparing students whose schools offer different numbers of AP classes.",
      },
      {
        heading: "Weighted GPA rewards difficulty",
        body:
          "Honors often adds 0.5 and AP/IB adds 1.0 before averaging. A B in AP Chemistry (3.0 + 1.0 = 4.0 weighted) can match an unweighted A in a regular class. That is why counselors report both numbers.",
      },
      {
        heading: "Worked comparison",
        body:
          "Three 1-credit courses: regular A (4.0), Honors B+ (3.3), AP A− (3.7). Unweighted average = 3.67. Weighted = (4.0 + 3.8 + 4.7) ÷ 3 = 4.17. Same transcript, two headlines.",
      },
      {
        heading: "What colleges actually use",
        body:
          "Many US colleges recalculate using only academic courses on a 4.0 scale. Your school’s 5.2 weighted GPA may never appear on the admissions file. Still report both if the application has two boxes.",
      },
      {
        heading: "Which calculator to open",
        body:
          "Use GPA Calculator for a plain term. Use High School GPA with the weighted checkbox and per-course type. Use Weighted GPA when you only need one list of Honors/AP/IB rows.",
      },
      {
        heading: "Core vs elective courses",
        body:
          "Some high schools weight only academic cores. A weighted PE A should not inflate a college-prep GPA. If your school excludes electives from the weighted number, leave those rows on Regular or omit them from the weighted run.",
      },
      {
        heading: "IB and dual enrollment",
        body:
          "IB Higher Level is often treated like AP (+1.0). Dual-enrollment college courses may stay unweighted or use the college letter as-is. When in doubt, run two versions: school-reported and college-recalculated.",
      },
    ],
    faqs: [
      {
        question: "Should I take AP if it might lower my unweighted GPA?",
        answer:
          "Admissions readers usually prefer a B in AP to an easy A, but it depends on the rest of the schedule. Run both GPAs before you drop a course.",
      },
    ],
  },
  {
    slug: "how-to-raise-your-gpa",
    path: "/guides/how-to-raise-your-gpa",
    title: "How to Raise Your GPA",
    description:
      "See why leftover credits matter more than motivation, and calculate the GPA you still need.",
    keywords: ["how to raise gpa", "raise gpa calculator", "improve gpa"],
    readTime: "8 min read",
    embeddedCalculator: "raise-gpa-calculator",
    relatedGuides: ["how-to-calculate-gpa", "what-grade-do-i-need-on-my-final"],
    relatedCalculators: ["raise-gpa-calculator", "cumulative-gpa-calculator"],
    sections: [
      {
        heading: "GPA is a running average",
        body:
          "After 60 credits at 3.2, you have 192 quality points. Fifteen new credits, even at a perfect 4.0, add only 60 points. New GPA = 252 ÷ 75 = 3.36. One strong term rarely jumps a long transcript by half a point.",
      },
      {
        heading: "The remaining-credit formula",
        body:
          "Required future GPA = (target × (prior credits + future credits) − current GPA × prior credits) ÷ future credits. If that number is above 4.0 (or 5.0 on a weighted scale), the target is impossible in that window.",
      },
      {
        heading: "When the calculator says impossible",
        body:
          "You need more credits, a lower target, or both. Repeating a failed course can also replace quality points if your school allows grade replacement — that is a policy question, not just arithmetic.",
      },
      {
        heading: "High-credit courses move the needle",
        body:
          "A 4-credit A changes the average more than a 1-credit A. Plan study time around labs and major requirements, then use the weighted grade calculator so you do not discover a 70% midterm after it is too late.",
      },
      {
        heading: "Pair this with finals planning",
        body:
          "Raising GPA starts with finishing the current term well. Use the final grade calculator for each course, then feed the resulting letters into raise-GPA to see whether the semester is enough.",
      },
    ],
    faqs: [
      {
        question: "Can I raise a 3.2 to a 3.5 in one semester?",
        answer:
          "Only if you have few prior credits or a large remaining load. Plug your numbers into the raise GPA calculator instead of guessing.",
      },
    ],
  },
  {
    slug: "understanding-letter-grades",
    path: "/guides/understanding-letter-grades",
    title: "Understanding Letter Grades",
    description:
      "What A through F mean in percentages and GPA points, and why the same letter differs by school.",
    keywords: ["letter grades", "what is a b plus", "letter grade percentage"],
    readTime: "10 min read",
    relatedGuides: ["gpa-scale-explained", "how-to-calculate-weighted-grades", "gcse-9-1-grades"],
    relatedCalculators: ["letter-grade-calculator", "percentage-to-letter-grade"],
    sections: [
      {
        heading: "A letter is a band, not a single percent",
        body:
          "On our US Standard table, B is 83–86% and B+ is 87–89%. The letter-grade calculator shows the midpoint of that band so you can plug a letter into a weighted average when the teacher never published a percent.",
      },
      {
        heading: "Plus and minus matter",
        body:
          "A− (3.7) versus A (4.0) is 0.3 GPA points. Over a 3-credit course that is 0.9 quality points — enough to change a 3.48 into a 3.51 at the margin. Do not ignore the minus.",
      },
      {
        heading: "Convert both directions",
        body:
          "Percentage → letter answers “what did I earn?” Letter → percentage answers “what number should I use in a weighted average?” Use both converters with the same scale selected.",
      },
      {
        heading: "International letters are not US letters",
        body:
          "A UK 60% is often a 2:1, not a US D. An Australian HD is closer to a US A. Always switch the scale before you convert.",
      },
      {
        heading: "GCSE 9–1 is another letter system",
        body:
          "England’s GCSE 9 is higher than 8, and 4 is a standard pass. That is not a US A–F table. Use the GCSE calculator for those percentages, not the US letter converter.",
      },
      {
        heading: "Why teachers publish midpoints",
        body:
          "When a rubric only shows letters, a weighted average still needs a number. The midpoint of the band (B+ ≈ 88% on US Standard) is the honest default until the teacher posts a percent.",
      },
    ],
    faqs: [
      {
        question: "What percentage is a B?",
        answer:
          "On US Standard, B is typically 83–86%. Your school may start B at 80% or 84%.",
      },
    ],
  },
  {
    slug: "final-exam-tips",
    path: "/guides/final-exam-tips",
    title: "Final Exam Study Tips for a Target Score",
    description:
      "Turn a required final percentage into a study plan, and know when the target is already locked in.",
    keywords: ["final exam tips", "study for finals", "what do i need on my final"],
    readTime: "10 min read",
    relatedGuides: ["what-grade-do-i-need-on-my-final", "how-to-calculate-weighted-grades"],
    relatedCalculators: ["final-grade-calculator", "eoc-grade-calculator"],
    sections: [
      {
        heading: "Get the number first",
        body:
          "Before you rewrite notes, compute the required final. A 72% target on a 20% final is a different week than a 97% target on a 40% final. Use the final grade calculator, then come back here.",
      },
      {
        heading: "If you need 90% or higher",
        body:
          "Treat the exam like a syllabus: list units by weight, drill the heaviest ones first, and time a practice test. Small homework points will not save a 40% final if you are already at 85% and want a 90%.",
      },
      {
        heading: "If you need under 70%",
        body:
          "Do not coast into a zero. Many syllabi fail the course below a minimum exam score. Confirm that rule, then study enough to clear it with a buffer.",
      },
      {
        heading: "When the result is impossible",
        body:
          "A required score above 100% means the final cannot reach the letter you want. Talk to the instructor about remaining assignments or extra credit, or reset the target and protect your GPA with other courses.",
      },
      {
        heading: "EOC exams are a different test",
        body:
          "State End-of-Course exams use a published weight and a standardized form. Use the EOC calculator for those. Classroom finals can use reverse, points, or drop-lowest modes on the final grade tool.",
      },
      {
        heading: "Plan the week backward from the number",
        body:
          "If you need an 88% on a 40% final, write three timed practice blocks and one sleep-in-place review. If you need a 60%, one mixed practice set plus the formula sheet may be enough. Match effort to the required score.",
      },
      {
        heading: "After the exam, update GPA",
        body:
          "Once the letter posts, put it in the GPA or raise-GPA tool. A single final can move a term average more than a month of homework if the weight is large.",
      },
    ],
    faqs: [
      {
        question: "Should I study if I already have an A locked?",
        answer:
          "Check whether the syllabus has a minimum final or a curve. If both are safe, a light review is enough.",
      },
    ],
  },
  {
    slug: "gcse-9-1-grades",
    path: "/guides/gcse-9-1-grades",
    title: "How GCSE 9–1 Grades Work",
    description:
      "Understand England’s GCSE 9–1 scale, what a standard pass means, and how to map a percentage to a grade for planning.",
    keywords: [
      "gcse grades",
      "gcse 9-1",
      "what is a gcse grade 4",
      "gcse percentage to grade",
    ],
    readTime: "10 min read",
    embeddedCalculator: "gcse-grade-calculator",
    relatedGuides: ["understanding-letter-grades", "gpa-scale-explained"],
    relatedCalculators: ["gcse-grade-calculator", "degree-classification-calculator", "percentage-to-letter-grade"],
    sections: [
      {
        heading: "9 is the top, 1 is the bottom",
        body:
          "England’s reformed GCSEs use numbers, not A*–G. Grade 9 is the highest, then 8, 7, and so on down to 1. U (unclassified) sits below 1. A 9 is harder to earn than the old A*; most high A* work maps nearer to 8 or 9 depending on the paper.",
      },
      {
        heading: "What counts as a pass",
        body:
          "Grade 4 is a standard pass. Grade 5 is often called a strong pass. Many sixth forms and employers ask for grade 4 or 5 in English and maths. That is not the same as a US D or C — do not convert it on a US A–F table.",
      },
      {
        heading: "Percentage bands are not official",
        body:
          "Exam boards set new grade boundaries every series and every subject. A 70% might be a 7 on one paper and a 6 on another. Our GCSE calculator uses a simplified educational map so you can plan. It is not Ofqual, AQA, Edexcel, OCR, or WJEC.",
      },
      {
        heading: "How to use the GCSE calculator",
        body:
          "Enter a percentage from 0–100. Read the 9–1 grade, whether it is a standard pass (4+), the percentage band we used, and an approximate legacy A*–G letter. Change the number to see what it would take to move up a grade.",
      },
      {
        heading: "Legacy A*–G letters",
        body:
          "Older certificates and some international GCSEs still show letters. Roughly, 7–9 sit near A/A*, 4 is around a C, and 1 is a G. Use that only as a memory aid. If your school still reports letters, use the letter-grade tools on the matching scale instead.",
      },
      {
        heading: "GCSEs are not a UK degree class",
        body:
          "A First at university is typically 70%+ on a degree classification. A GCSE 7 is also often near 70% on our educational table, but they are different qualifications. After you have A-level or university marks, switch to the UK degree classification calculator.",
      },
      {
        heading: "Scotland, Wales, and Northern Ireland",
        body:
          "This guide is about the England 9–1 scale. Scotland uses National 5 / Higher. Wales and Northern Ireland may still mix letters and numbers depending on the board. Check your exam board’s page before you treat a number as official.",
      },
    ],
    faqs: [
      {
        question: "Is grade 4 a pass?",
        answer:
          "Yes. Grade 4 is a standard pass and grade 5 is often called a strong pass. Confirm what your sixth form or college asks for in English and maths.",
      },
      {
        question: "Are these official exam-board boundaries?",
        answer:
          "No. Official boundaries change by subject and exam series. The calculator is a planning estimate only.",
      },
    ],
  },
];

export const guideBySlug = Object.fromEntries(guides.map((g) => [g.slug, g])) as Record<
  string,
  GuideConfig
>;
