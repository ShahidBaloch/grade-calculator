import type { GuideConfig } from "@/config/guides";

/**
 * Long-tail informational guides added to close the competitor content gap
 * (see COMPETITOR-BLOG-AUDIT.md). Primaries are informational and must not
 * collide with calculator primaries in src/lib/seo/keywords.ts.
 */
export const gapGuides: GuideConfig[] = [
  {
    slug: "what-is-a-good-gpa",
    path: "/guides/what-is-a-good-gpa",
    title: "What Is a Good GPA? High School vs College, by Scale",
    description:
      "What counts as a good GPA in high school and college, how weighted and unweighted scales change the answer, and how to judge your own number.",
    keywords: ["what is a good gpa", "good gpa for college", "good high school gpa", "average gpa"],
    readTime: "8 min read",
    embeddedCalculator: "gpa-calculator",
    relatedGuides: ["is-a-3-5-gpa-good", "how-to-calculate-gpa", "weighted-vs-unweighted-gpa", "gpa-scale-explained", "gpa-for-financial-aid"],
    relatedCalculators: ["gpa-calculator", "high-school-gpa-calculator", "college-gpa-calculator", "weighted-gpa-calculator"],
    relatedReference: [{ label: "US Grading Scale & GPA Scale", href: "/grading-scales/us" }],
    sections: [
      {
        heading: "Short answer",
        body:
          "On the common US unweighted 4.0 scale, a 3.0 (B average) is usually treated as solid, a 3.5 (B+/A− average) as strong, and 3.7+ as excellent. “Good” is relative, though: it depends on the scale, your school, and what you need the GPA for — a scholarship, a graduate program, or simply staying in good standing.",
      },
      {
        heading: "Good GPA in high school",
        body:
          "Colleges read your GPA in the context of your school. A 3.6 unweighted with a demanding course load can look stronger than a 4.0 with few honors classes. Many state universities list a minimum around 2.5–3.0, while highly selective colleges typically admit students with mostly A grades. Check each college’s published profile rather than relying on one national cutoff.",
      },
      {
        heading: "Good GPA in college",
        body:
          "In college, about 2.0 is often the minimum for good academic standing, but many majors, internships, and graduate programs look for 3.0 or higher. Competitive professional programs (medicine, law, some PhDs) usually want well above that. Your department may also track a separate major GPA.",
      },
      {
        heading: "Weighted vs unweighted changes the meaning",
        body:
          "A weighted GPA can exceed 4.0 because Honors, AP, or IB courses earn bonus points. A 4.3 weighted and a 3.8 unweighted may describe the same transcript. When comparing with friends or college data, make sure you are comparing the same type of GPA. Our weighted vs unweighted guide explains the difference.",
      },
      {
        heading: "Other scales: 5.0, 10-point, and 7-point",
        body:
          "A 4.0 on a 5.0 weighted scale is not the same as a 4.0 on a 4.0 scale. In India, many universities use a 10-point CGPA, where 8.0+ is often considered good; Australia commonly uses a 7-point GPA. Do not convert between systems with a simple ratio for applications — use the institution’s own conversion or a credential evaluator.",
      },
      {
        heading: "How to judge your own GPA",
        body:
          "Ask three questions: What is the minimum for the goal I care about? How does my GPA compare with my school’s typical range (counselors or the school profile often share this)? Is my trend going up? An upward trend in harder courses is frequently viewed more favorably than a flat high GPA in easier ones.",
      },
      {
        heading: "Calculate before you compare",
        body:
          "Portal GPAs can lag or exclude the current term. Use the GPA calculator with your real credit hours to see where you stand now, and the raise GPA calculator to plan a target.",
      },
    ],
    faqs: [
      {
        question: "Is a 3.0 GPA good?",
        answer:
          "A 3.0 is a B average and meets the minimum for many college programs and scholarships. For selective programs it is often below the typical admitted range.",
      },
      {
        question: "Is a 4.0 GPA always the best?",
        answer:
          "On an unweighted 4.0 scale it is the top. On a weighted scale, students can score above 4.0, so a 4.0 weighted may not be the highest in your class.",
      },
      {
        question: "What GPA do colleges consider good?",
        answer:
          "It varies by college. Check each school’s published admitted-student profile and read your GPA alongside course rigor.",
      },
    ],
  },
  {
    slug: "is-a-3-5-gpa-good",
    path: "/guides/is-a-3-5-gpa-good",
    title: "Is a 3.5 GPA Good? Plus 2.0, 3.0, 3.8 and 4.0",
    description:
      "What a 2.0, 3.0, 3.5, 3.8, and 4.0 GPA mean in high school and college, what letter averages they reflect, and what each one typically opens up.",
    keywords: ["is a 3.5 gpa good", "is a 3.0 gpa good", "is a 3.8 gpa good", "is a 2.0 gpa good"],
    readTime: "9 min read",
    embeddedCalculator: "gpa-calculator",
    relatedGuides: ["what-is-a-good-gpa", "how-to-raise-your-gpa", "weighted-vs-unweighted-gpa", "how-to-calculate-gpa", "gpa-for-financial-aid"],
    relatedCalculators: ["gpa-calculator", "raise-gpa-calculator", "cumulative-gpa-calculator", "high-school-gpa-calculator"],
    sections: [
      {
        heading: "How to read this page",
        body:
          "All numbers below assume the common US unweighted 4.0 scale (A = 4.0, B = 3.0, C = 2.0). If your GPA is weighted or on another scale, convert it first or compare it only with numbers on the same scale.",
      },
      {
        heading: "Is a 2.0 GPA good?",
        body:
          "A 2.0 is a C average. In college it is often the minimum for good academic standing and graduation, and it is commonly tied to financial aid progress rules. It is generally below what most four-year colleges and graduate programs look for, so treat it as a floor to climb from, not a goal.",
      },
      {
        heading: "Is a 3.0 GPA good?",
        body:
          "A 3.0 is a B average. It meets many scholarship, internship, and transfer minimums, and many employers that screen by GPA use 3.0 as a cutoff. For selective colleges or competitive majors it is usually below the typical admitted range.",
      },
      {
        heading: "Is a 3.5 GPA good?",
        body:
          "Yes — a 3.5 sits between a B+ and an A− average and is widely seen as strong. In college it often clears the bar for honors programs and many graduate applications. For the most selective colleges, a 3.5 unweighted is usually competitive only with rigorous courses and strong other factors. At some schools a 3.5 is near the cum laude range, but Latin honors cutoffs vary.",
      },
      {
        heading: "Is a 3.8 GPA good?",
        body:
          "A 3.8 is mostly A grades with a few A− or B+ marks. It is excellent at nearly every school and typically within range for selective programs, though highly selective admissions look at much more than GPA.",
      },
      {
        heading: "Is a 4.0 GPA good?",
        body:
          "An unweighted 4.0 means straight A’s. On a weighted scale, 4.0 can be good but not the top, because Honors/AP bonuses let students exceed 4.0. Context — course rigor and the scale — matters as much as the number.",
      },
      {
        heading: "Same GPA, different story",
        body:
          "Two 3.5s can tell different stories: one rising from 3.0 to 3.9, another falling from 3.9 to 3.1. Admissions readers and employers often notice trends and course difficulty. Your major GPA can also differ from your overall GPA.",
      },
      {
        heading: "Moving from one band to the next",
        body:
          "The more credits you have, the harder it is to move cumulative GPA. Going from 3.0 to 3.5 after 30 credits is very different from after 90. Use the raise GPA calculator to see what grades and how many credits it takes.",
      },
    ],
    faqs: [
      {
        question: "Is a 3.5 GPA good for college admissions?",
        answer:
          "It is solid for many colleges. For highly selective schools it is often below the typical unweighted range, so rigor, essays, and other factors matter more.",
      },
      {
        question: "Is a 3.5 weighted GPA the same as a 3.5 unweighted?",
        answer:
          "No. A 3.5 weighted usually reflects a lower unweighted average, because bonus points are already included.",
      },
      {
        question: "What letter grade is a 3.5 GPA?",
        answer: "On the common 4.0 table, it is between a B+ (3.3) and an A− (3.7).",
      },
    ],
  },
  {
    slug: "gpa-to-percentage",
    path: "/guides/gpa-to-percentage",
    title: "GPA to Percentage: How Conversion Works",
    description:
      "How to convert a 4.0 GPA to a percentage, why there is no single official formula, and which conversion your school or application expects.",
    keywords: ["gpa to percentage", "convert gpa to percentage", "4.0 gpa to percentage", "gpa percentage equivalent"],
    readTime: "7 min read",
    relatedGuides: ["gpa-scale-explained", "understanding-letter-grades", "how-to-calculate-gpa"],
    relatedCalculators: ["percentage-to-letter-grade", "letter-grade-calculator", "gpa-calculator"],
    relatedReference: [
      { label: "US Grading Scale & GPA Scale", href: "/grading-scales/us" },
      { label: "Different system: India & Pakistan CGPA to percentage", href: "/cgpa-to-percentage" },
    ],
    sections: [
      {
        heading: "The honest answer",
        body:
          "There is no universal GPA-to-percentage formula. A GPA is an average of grade points, and each grade point already stands for a band of percentages. Converting back loses information, so any result is an estimate unless your institution publishes the conversion.",
      },
      {
        heading: "Band method (most defensible)",
        body:
          "Use your school’s letter table. On the common US scale, A (4.0) is roughly 93–100%, B (3.0) about 83–86%, C (2.0) about 73–76%, with plus/minus bands in between. A 3.0 GPA therefore points to a B average — roughly the low-to-mid 80s — not one exact percent. Many schools use different cut-offs, so check your syllabus or handbook.",
      },
      {
        heading: "Simple ratio shortcut (unofficial)",
        body:
          "Some people use Percentage = GPA ÷ 4 × 100, so 3.2 → 80%. This is easy but unofficial and often wrong, because a 4.0 does not mean 100% on every assignment. Use it only for a rough sense, never on an application.",
      },
      {
        heading: "Other scales",
        body:
          "On a 5.0 weighted scale, remove Honors/AP bonuses before converting. For 10-point CGPA systems in India, universities publish their own multipliers — see our CGPA guides. For HEC Pakistan’s 4.0 scale, HEC uses percentage bands rather than a straight multiplier.",
      },
      {
        heading: "What applications usually want",
        body:
          "If a form asks for a percentage, use the figure printed on your transcript or provided by your registrar. If the institution evaluates foreign credentials, it will often do the conversion itself or ask for an evaluation from a credential service. Self-converted numbers can cause mismatches.",
      },
      {
        heading: "Going the other way",
        body:
          "Converting a percentage course average to a letter (and then GPA points) is far more reliable, because it follows your school’s table. Use the percentage to letter grade calculator, then the GPA calculator.",
      },
    ],
    faqs: [
      {
        question: "What percentage is a 3.5 GPA?",
        answer:
          "On a common US table, a 3.5 is a B+/A− average, roughly the high 80s to around 90%. The exact figure depends on your school’s cut-offs.",
      },
      {
        question: "Is GPA ÷ 4 × 100 an official formula?",
        answer: "No. It is an unofficial shortcut. Use your institution’s published conversion if one exists.",
      },
    ],
  },
  {
    slug: "university-cgpa-to-percentage",
    path: "/guides/university-cgpa-to-percentage",
    title: "VTU, VIT, Anna, Mumbai & HEC CGPA to Percentage",
    description:
      "Commonly cited CGPA-to-percentage formulas for VTU, VIT, Anna University, Mumbai University, and HEC Pakistan, with worked examples and verification tips.",
    keywords: [
      "vtu cgpa to percentage",
      "vit cgpa to percentage",
      "anna university cgpa to percentage",
      "mumbai university cgpa to percentage",
      "hec cgpa percentage bands",
    ],
    readTime: "8 min read",
    embeddedCalculator: "cgpa-to-percentage",
    relatedGuides: ["cgpa-to-percentage", "gpa-to-percentage", "gpa-scale-explained"],
    relatedCalculators: ["cgpa-to-percentage", "percentage-to-cgpa", "sgpa-to-cgpa", "cgpa-calculator"],
    relatedReference: [
      { label: "India Grading Scale", href: "/grading-scales/india" },
      { label: "Pakistan Grading Scale", href: "/grading-scales/pakistan" },
    ],
    sections: [
      {
        heading: "Read this first",
        body:
          "Universities change regulations between batches and schemes. The formulas below are the ones most commonly cited for each university; they are not a substitute for your own regulation document, marksheet legend, or controller of examinations. If your marksheet prints a percentage or a formula, that wins.",
      },
      {
        heading: "VTU (Visvesvaraya Technological University)",
        body:
          "The formula commonly cited for VTU CBCS/CBCS-style schemes is Percentage = (CGPA − 0.75) × 10. Example: 8.2 CGPA → (8.2 − 0.75) × 10 = 74.5%. Some older schemes and some employers use different methods, so check the circular for your scheme year.",
      },
      {
        heading: "VIT (Vellore Institute of Technology)",
        body:
          "VIT is commonly cited as using Percentage = CGPA × 10 for its 10-point scale. Example: 8.6 CGPA → 86%. Confirm against your grade sheet or the academic regulations for your programme.",
      },
      {
        heading: "Anna University",
        body:
          "Anna University regulations are commonly cited as Percentage = CGPA × 10. Example: 7.9 CGPA → 79%. Affiliated colleges follow the regulation of your admission year, so verify it there.",
      },
      {
        heading: "Mumbai University",
        body:
          "Mumbai University has used more than one grading system over time, and conversion depends on which one your marksheet uses. Formulas such as (CGPA − 0.75) × 10 for 10-point schemes and 7.1 × CGPA + 11 for the older 7-point scheme are widely cited, but you should confirm the ordinance that applies to your batch before using either.",
      },
      {
        heading: "HEC Pakistan",
        body:
          "HEC’s published grading policy maps grade-point ranges to percentage bands rather than using one multiplier, and HEC has notified that it no longer issues CGPA-to-percentage conversions. Percentage ≈ CGPA × 25 is an unofficial shortcut that often overstates the band value. Use the percentage on your transcript or ask your university.",
      },
      {
        heading: "Worked comparison",
        body:
          "The same 8.0 CGPA gives 80% with ×10, 72.5% with (CGPA − 0.75) × 10, and 76% with ×9.5. That spread is why you must use your own university’s formula rather than a generic one.",
      },
    ],
    faqs: [
      {
        question: "Can I use the CBSE ×9.5 formula for university CGPA?",
        answer:
          "Usually not. ×9.5 was a CBSE board convention. Universities set their own rules; use the one in your regulations.",
      },
      {
        question: "What if my university publishes no formula?",
        answer:
          "Ask the controller of examinations for an official conversion certificate. Employers and universities abroad generally prefer that to a self-calculated number.",
      },
      {
        question: "Does the GradCalc converter support these formulas?",
        answer:
          "The CGPA to percentage calculator supports ×9.5, ×10, and (CGPA − 0.75) × 10 options. Pick the one your university uses.",
      },
    ],
  },
  {
    slug: "how-to-check-gpa-on-powerschool",
    path: "/guides/how-to-check-gpa-on-powerschool",
    title: "Check Your GPA on PowerSchool & Infinite Campus",
    description:
      "Where to find GPA in PowerSchool and Infinite Campus, why it may be missing, and how to calculate it yourself from your grades.",
    keywords: [
      "how to check gpa on powerschool",
      "powerschool gpa",
      "infinite campus gpa",
      "where to find gpa on powerschool",
    ],
    readTime: "6 min read",
    relatedGuides: ["lms-course-grades-explained", "how-to-calculate-gpa", "weighted-vs-unweighted-gpa", "canvas-what-if-grades"],
    relatedCalculators: ["high-school-gpa-calculator", "gpa-calculator", "weighted-gpa-calculator", "cumulative-gpa-calculator"],
    relatedReference: [{ label: "PowerSchool Grade Calculator", href: "/powerschool-grade-calculator" }, { label: "US Grading Scale & GPA Scale", href: "/grading-scales/us" }],
    sections: [
      {
        heading: "Why GPA can be hard to find",
        body:
          "PowerSchool and Infinite Campus are configured by each district. Some schools show GPA to students and parents; others hide it until the end of a term or show it only on report cards and transcripts. If you cannot find it, that is often a setting, not a mistake on your part.",
      },
      {
        heading: "PowerSchool on the web",
        body:
          "Sign in to the student/parent portal, then look in Grades and Attendance or Grade History. If your school enables it, a GPA line appears near the bottom of the grades table or in a GPA/historical grades section. Some districts label it “Cumulative GPA” or “Weighted/Unweighted GPA.”",
      },
      {
        heading: "PowerSchool mobile app",
        body:
          "The app focuses on current class grades. GPA often does not appear in the app even when it shows on the web portal, so check the website if the app only shows class percentages.",
      },
      {
        heading: "Infinite Campus",
        body:
          "In Campus Student or Campus Parent, check Grades for term grades and look for Academic Progress, Transcript, or Documents (report cards) for GPA. Whether GPA is visible depends on the district’s configuration.",
      },
      {
        heading: "Current grades are not your GPA",
        body:
          "An in-progress class percentage is not a final grade, and portals usually calculate GPA only from posted term or semester grades. Your counselor or registrar has the official number, including how weighting is applied.",
      },
      {
        heading: "Calculate it yourself",
        body:
          "Write down each posted semester grade, its credit value, and whether it is Honors/AP. Enter them into the high school GPA calculator to see weighted and unweighted results. Compare with your report card to make sure your school’s scale matches.",
      },
    ],
    faqs: [
      {
        question: "Why doesn’t my PowerSchool show a GPA?",
        answer:
          "Many districts hide it or show it only after grades post. Check the web portal, your report card, or ask your counselor.",
      },
      {
        question: "Is the PowerSchool GPA weighted?",
        answer:
          "It depends on your district. Some show both; the label usually says which. Your counselor can confirm.",
      },
    ],
  },
  {
    slug: "canvas-what-if-grades",
    path: "/guides/canvas-what-if-grades",
    title: "Canvas What-If Grades: Test Scores Before They Post",
    description:
      "How to use Canvas What-If grades to see how future scores change your course grade, plus limits and how to double-check the math.",
    keywords: ["canvas what if grades", "canvas what if scores", "what if grades canvas", "show what if scores canvas"],
    readTime: "6 min read",
    relatedGuides: ["lms-course-grades-explained", "how-to-calculate-weighted-grades", "how-much-will-a-test-affect-my-grade", "how-to-check-gpa-on-powerschool"],
    relatedCalculators: ["canvas-grade-calculator", "weighted-grade-calculator", "final-grade-calculator", "test-grade-calculator"],
    relatedReference: [{ label: "Canvas Grade Calculator", href: "/canvas-grade-calculator" }, { label: "College Grade Calculator", href: "/college-grade-calculator" }],
    sections: [
      {
        heading: "What What-If grades do",
        body:
          "On the Canvas Grades page, you can type hypothetical scores for assignments and see how your total would change. The changes are visible only to you and do not alter your real grade or notify your instructor.",
      },
      {
        heading: "How to use them",
        body:
          "Open the course, go to Grades, and click the score cell of an assignment (graded or ungraded). Type a hypothetical score and press Enter; Canvas recalculates the total. Depending on your Canvas version, you may see a “Show What-If Scores” toggle or a revert arrow to restore the real score.",
      },
      {
        heading: "When the option is missing",
        body:
          "Instructors can hide course totals or disable grade calculations. If you cannot see a total, What-If results will not tell you much. You can still estimate your grade with the syllabus weights and our Canvas grade calculator.",
      },
      {
        heading: "Weighted groups matter",
        body:
          "If the course uses assignment groups (e.g. Exams 50%, Homework 20%), a What-If score changes your total by that group’s weight, not by its points. A 100-point exam in a 50% group can move your grade far more than a 100-point homework set.",
      },
      {
        heading: "Common pitfalls",
        body:
          "Ungraded assignments may be treated as excluded until you add a What-If score. Dropped-lowest rules, extra credit, and late penalties can make the Canvas total differ from the syllabus. Missing work may count as zero if your instructor sets it that way.",
      },
      {
        heading: "Cross-check with a calculator",
        body:
          "Enter your category weights and current averages into the weighted grade calculator, then try the final grade calculator to find the score you need on the final. If the two disagree, ask your instructor which is correct.",
      },
    ],
    faqs: [
      {
        question: "Can my teacher see my What-If grades?",
        answer: "No. What-If scores are visible only to you and are not saved as real grades.",
      },
      {
        question: "Do What-If grades stay after I leave the page?",
        answer:
          "They may persist for your view until you revert them, depending on your Canvas version. They never change the official gradebook.",
      },
    ],
  },
  {
    slug: "latin-honors-gpa",
    path: "/guides/latin-honors-gpa",
    title: "Latin Honors GPA: Cum Laude, Magna & Summa Cum Laude",
    description:
      "What cum laude, magna cum laude, and summa cum laude mean, why GPA cutoffs differ by school, and how to check whether you are on track.",
    keywords: ["latin honors gpa", "cum laude gpa", "magna cum laude gpa", "summa cum laude gpa"],
    readTime: "6 min read",
    embeddedCalculator: "college-gpa-calculator",
    relatedGuides: ["how-to-raise-your-gpa", "is-a-3-5-gpa-good", "does-gpa-matter-for-jobs", "rounding-gpa-on-resume"],
    relatedCalculators: ["college-gpa-calculator", "cumulative-gpa-calculator", "raise-gpa-calculator"],
    sections: [
      {
        heading: "The three levels",
        body:
          "Cum laude means “with honor,” magna cum laude “with great honor,” and summa cum laude “with highest honor.” They appear on diplomas and transcripts at many US colleges.",
      },
      {
        heading: "Cutoffs are set by each school",
        body:
          "There is no national standard. Some schools use fixed GPA thresholds; others award honors to a top percentage of the graduating class, which changes each year. A frequently seen pattern is something like 3.5 / 3.7 / 3.9, but many schools are higher or lower. Your college catalog or registrar’s page is the only reliable source.",
      },
      {
        heading: "Other requirements",
        body:
          "Many schools also require a minimum number of credits earned at the institution, an honors thesis, or no academic integrity violations. Transfer credits may not count toward the honors GPA.",
      },
      {
        heading: "Which GPA counts",
        body:
          "Usually the cumulative institutional GPA at graduation, though some schools calculate honors at the end of the prior term for commencement programs. Rounding rules vary; some truncate rather than round.",
      },
      {
        heading: "Planning to reach a cutoff",
        body:
          "Find your school’s threshold, then use the raise GPA calculator with your current GPA and credits to see what average you need in remaining credits. Late in a degree, small changes are hard, so plan early.",
      },
      {
        heading: "Putting honors on a resume",
        body:
          "List it under education exactly as on your diploma, e.g. “B.A., magna cum laude.” Do not claim honors you have not been awarded; listing “expected” honors is risky unless your school confirms them.",
      },
    ],
    faqs: [
      {
        question: "Is a 3.5 GPA cum laude?",
        answer: "At some schools, yes; at others the cutoff is higher. Check your college catalog.",
      },
      {
        question: "Do high schools award Latin honors?",
        answer: "Some do, using their own rules. It is most common at colleges and universities.",
      },
    ],
  },
  {
    slug: "gpa-for-financial-aid",
    path: "/guides/gpa-for-financial-aid",
    title: "GPA for Financial Aid: SAP Requirements Explained",
    description:
      "How GPA affects federal financial aid through Satisfactory Academic Progress, what pace and maximum timeframe mean, and what to do if you fall below.",
    keywords: ["gpa for financial aid", "satisfactory academic progress gpa", "sap gpa requirement", "financial aid gpa requirement"],
    readTime: "7 min read",
    embeddedCalculator: "gpa-calculator",
    relatedGuides: ["how-to-raise-your-gpa", "is-a-3-5-gpa-good", "how-to-calculate-gpa"],
    relatedCalculators: ["gpa-calculator", "cumulative-gpa-calculator", "raise-gpa-calculator"],
    sections: [
      {
        heading: "What SAP is",
        body:
          "US colleges must check that students receiving federal aid make Satisfactory Academic Progress. Each school writes its own SAP policy within federal rules, so the exact numbers come from your financial aid office.",
      },
      {
        heading: "The GPA part",
        body:
          "Federal rules require, for programs longer than two years, that students have at least a C average (or equivalent) by the end of the second academic year. Many schools simply set a 2.0 cumulative minimum; some use a sliding scale by credits attempted.",
      },
      {
        heading: "Pace (completion rate)",
        body:
          "SAP also checks how many attempted credits you complete. Many schools use about 67%, but check yours. Withdrawals, incompletes, and failed courses usually count as attempted but not completed, so they can hurt pace even if GPA is fine.",
      },
      {
        heading: "Maximum timeframe",
        body:
          "Federal aid generally ends once you have attempted 150% of the published program length (e.g. 180 attempted credits for a 120-credit degree). Changing majors and repeated courses use up this allowance.",
      },
      {
        heading: "Warning, probation, and appeals",
        body:
          "Schools that review every term often give a warning term first. If you still miss SAP, aid can be suspended. Most schools allow an appeal for circumstances like illness or a family emergency, often with an academic plan. Deadlines matter — contact the aid office quickly.",
      },
      {
        heading: "Scholarships have their own rules",
        body:
          "Institutional and state scholarships often require a higher GPA (3.0 or more is common) and full-time enrollment. Read each award’s renewal terms separately from SAP.",
      },
      {
        heading: "Check where you stand",
        body:
          "Use the cumulative GPA calculator with your transcript, then the raise GPA calculator to see the term average needed to get back above your school’s minimum.",
      },
    ],
    faqs: [
      {
        question: "What GPA do you need to keep financial aid?",
        answer:
          "Often a 2.0 cumulative for federal aid, but the exact rule is in your school’s SAP policy. Scholarships may require more.",
      },
      {
        question: "Does a W hurt financial aid?",
        answer: "It usually does not affect GPA, but it typically counts as attempted credits and can lower your completion rate.",
      },
      {
        question: "Does high school GPA affect federal aid?",
        answer:
          "Federal aid eligibility is not based on high school GPA, but many state and college scholarships are.",
      },
    ],
  },
  {
    slug: "does-gpa-matter-for-jobs",
    path: "/guides/does-gpa-matter-for-jobs",
    title: "Does GPA Matter for Jobs? When Employers Care",
    description:
      "When employers ask for GPA, common screening cutoffs, whether to list it on your resume, and what matters more after your first job.",
    keywords: ["does gpa matter for jobs", "gpa for jobs", "do employers look at gpa", "should i put gpa on resume"],
    readTime: "6 min read",
    relatedGuides: ["rounding-gpa-on-resume", "latin-honors-gpa", "what-is-a-good-gpa", "is-a-3-5-gpa-good"],
    relatedCalculators: ["gpa-calculator", "college-gpa-calculator", "cumulative-gpa-calculator"],
    sections: [
      {
        heading: "Short answer",
        body:
          "GPA matters most for internships and first jobs, especially in fields with structured campus recruiting. After a few years of experience, most employers focus on your work, skills, and references instead.",
      },
      {
        heading: "Where GPA tends to matter more",
        body:
          "Finance, consulting, some engineering firms, government programs, and large graduate schemes often ask for GPA and may filter applications by it. A 3.0 minimum is commonly seen; some competitive programs expect higher. Postings usually state the cutoff if there is one.",
      },
      {
        heading: "Where it matters less",
        body:
          "Startups, creative fields, trades, and many tech roles often weigh portfolios, projects, and interviews more heavily. A strong project or internship can outweigh an average GPA.",
      },
      {
        heading: "Should you list it?",
        body:
          "Common advice: list it if it is 3.0 or higher, or if the application asks. If your major GPA is stronger, you can list it clearly labeled as “Major GPA.” If an application asks for GPA, always answer honestly.",
      },
      {
        heading: "Employers may verify",
        body:
          "Some employers request transcripts or run education verification. A mismatch between your resume and transcript can cost an offer, so use your official number and rounding conventions.",
      },
      {
        heading: "If your GPA is low",
        body:
          "Lead with experience, projects, and skills. Mention an upward trend or strong final-year grades if true. Check your current number with the GPA calculator so you answer screening questions accurately.",
      },
    ],
    faqs: [
      {
        question: "Do employers check GPA?",
        answer: "Some do, through transcripts or verification services, especially for entry-level roles.",
      },
      {
        question: "When should I remove GPA from my resume?",
        answer: "Many people drop it after their first job or a few years of experience, unless an application asks.",
      },
    ],
  },
  {
    slug: "rounding-gpa-on-resume",
    path: "/guides/rounding-gpa-on-resume",
    title: "Can I Round Up My GPA? Rules for Resumes",
    description:
      "When rounding your GPA is acceptable, how to round correctly to one or two decimals, and why you should never round up on official applications.",
    keywords: ["can i round up my gpa", "rounding gpa on resume", "round gpa 3.49", "gpa decimal places"],
    readTime: "5 min read",
    relatedGuides: ["does-gpa-matter-for-jobs", "latin-honors-gpa", "how-to-calculate-gpa"],
    relatedCalculators: ["gpa-calculator", "college-gpa-calculator", "cumulative-gpa-calculator"],
    sections: [
      {
        heading: "Short answer",
        body:
          "Standard rounding is generally acceptable on a resume; rounding up past the rule is not. 3.46 → 3.5 is normal rounding to one decimal. 3.44 → 3.5 isn't rounding at all; that's misstating your GPA.",
      },
      {
        heading: "How to round correctly",
        body:
          "Look at the digit after the place you are keeping. If it is 5 or more, round up; otherwise round down. 3.675 to two decimals is 3.68; 3.674 is 3.67. Many people show two decimals because that is how most transcripts display GPA.",
      },
      {
        heading: "The 3.49 problem",
        body:
          "3.49 rounds to 3.5 at one decimal, which is why it is tempting. If an employer has a 3.5 cutoff, they may read your transcript 3.49 as below it. When a cutoff is involved, show the transcript value.",
      },
      {
        heading: "Never round on official forms",
        body:
          "On applications, background checks, and forms that ask for GPA, enter exactly what your transcript shows, to the decimals requested. Some schools truncate rather than round, so use their figure.",
      },
      {
        heading: "Major GPA and other options",
        body:
          "If your major GPA is higher, list it clearly labeled. That is honest and often more relevant than rounding aggressively.",
      },
      {
        heading: "Find your exact GPA",
        body:
          "Use the GPA calculator or cumulative GPA calculator with your credit hours to get the unrounded number before deciding how to present it.",
      },
    ],
    faqs: [
      {
        question: "Can I round 3.45 to 3.5?",
        answer: "Under standard rounding to one decimal, 3.45 becomes 3.5. Still, list 3.45 if an application asks for your exact GPA.",
      },
      {
        question: "Should I use one or two decimal places?",
        answer: "Two decimals match most transcripts. One is acceptable on resumes if rounded correctly.",
      },
    ],
  },
  {
    slug: "how-much-will-a-test-affect-my-grade",
    path: "/guides/how-much-will-a-test-affect-my-grade",
    title: "How Much Will a Test Affect My Grade? Worked Examples",
    description:
      "How to work out how much one test or exam will move your course grade, using category weights and points, with step-by-step examples.",
    keywords: [
      "how much will a test affect my grade",
      "how much will a test raise my grade",
      "how much will a test lower my grade",
      "test impact on grade",
    ],
    readTime: "7 min read",
    embeddedCalculator: "final-grade-calculator",
    relatedGuides: ["how-to-calculate-weighted-grades", "what-grade-do-i-need-on-my-final", "how-final-grades-are-calculated", "canvas-what-if-grades"],
    relatedCalculators: ["final-grade-calculator", "weighted-grade-calculator", "test-grade-calculator", "ez-grader"],
    sections: [
      {
        heading: "It depends on weight",
        body:
          "A test changes your grade in proportion to how much it counts. In a weighted course, look at the test’s category weight (e.g. Exams 40%). In a points-based course, look at the test’s points compared with total course points.",
      },
      {
        heading: "Weighted-course formula",
        body:
          "New grade = current grade × (1 − w) + test score × w, where w is the test’s share of the final grade. Example: you have 85% and the final is worth 20%. Scoring 95 gives 85 × 0.8 + 95 × 0.2 = 87%. Scoring 60 gives 80%.",
      },
      {
        heading: "Points-based example",
        body:
          "You have 340 of 400 points (85%). A 100-point test is next. Scoring 90 gives 430 / 500 = 86%. Scoring 50 gives 390 / 500 = 78%. The bigger the test relative to points so far, the larger the swing.",
      },
      {
        heading: "Tests inside a category",
        body:
          "If the Exams category is worth 40% and has four equal exams, each exam is about 10% of your final grade. Find each test’s real share before panicking about one score.",
      },
      {
        heading: "Early vs late in the term",
        body:
          "In points systems, early tests move the grade more because fewer points are recorded. In weighted systems, a category with only one graded item can swing your grade widely until more items post.",
      },
      {
        heading: "Use the calculators",
        body:
          "Score a test with the test grade calculator, plug categories into the weighted grade calculator, and use the final grade calculator to find the score you need for a target grade.",
      },
    ],
    faqs: [
      {
        question: "Can one bad test ruin my grade?",
        answer:
          "Usually not if it is a small share of the course. A heavily weighted final can move a grade a full letter or more.",
      },
      {
        question: "Why did my grade drop more than expected?",
        answer:
          "The category may have had few items, or your teacher may weight categories differently from points. Check the syllabus or Canvas What-If grades.",
      },
    ],
  },
  {
    slug: "gpa-needed-for-uc-csu",
    path: "/guides/gpa-needed-for-uc-csu",
    title: "GPA for UC & CSU Admission: Minimum vs Competitive",
    description:
      "Minimum GPA for UC and CSU admission, how each system calculates GPA, why competitive ranges are higher, and how to estimate your own UC and CSU GPA.",
    keywords: ["gpa for uc admission", "csu gpa requirement", "uc minimum gpa", "gpa needed for csu"],
    readTime: "8 min read",
    embeddedCalculator: "uc-gpa-calculator",
    relatedGuides: ["weighted-vs-unweighted-gpa", "what-is-a-good-gpa", "how-to-calculate-gpa"],
    relatedCalculators: ["uc-gpa-calculator", "csu-gpa-calculator", "high-school-gpa-calculator", "weighted-gpa-calculator"],
    sections: [
      {
        heading: "Planning estimates only",
        body:
          "This guide and our calculators help you plan. Official GPAs are calculated by UC and CSU from your application, and requirements can change, so check the UC and CSU admissions websites for your entry year.",
      },
      {
        heading: "UC minimum GPA",
        body:
          "UC publishes a minimum GPA in A–G courses taken in grades 10–11 of 3.0 for California residents and 3.4 for nonresidents, with no grade lower than C in those courses. Meeting the minimum makes you eligible to be considered; it does not guarantee admission.",
      },
      {
        heading: "Competitive UC ranges",
        body:
          "Most UC campuses admit students well above the minimum, and the most selective campuses typically admit students with mostly A grades. UC reviews applications comprehensively, so course rigor, essays (Personal Insight Questions), and context matter alongside GPA. Each campus publishes admitted-student profiles.",
      },
      {
        heading: "CSU minimum GPA",
        body:
          "CSU publishes a minimum A–G GPA of 2.5 for California residents and 3.0 for nonresidents, calculated from grades 10–11 (with additional rules for applicants below the minimum at some campuses). Impacted campuses and majors often need much higher GPAs.",
      },
      {
        heading: "How UC and CSU calculate GPA differently",
        body:
          "Both use A–G courses from 10th and 11th grade and add honors points for approved courses, with caps. UC caps honors points; CSU has its own cap, and CSU counts each college course semester grade twice. That is why the same transcript can produce different UC and CSU GPAs.",
      },
      {
        heading: "Estimate your GPA",
        body:
          "Enter your 10th and 11th grade A–G grades in the UC GPA calculator and the CSU GPA calculator. Compare the results with each campus profile to see where you are competitive.",
      },
      {
        heading: "If you are below the range",
        body:
          "Strong senior-year grades, community college transfer pathways, and less impacted campuses are common routes. Counselors can help with A–G planning.",
      },
    ],
    faqs: [
      {
        question: "What GPA do you need for UC?",
        answer:
          "UC’s published minimum is 3.0 (3.4 for nonresidents) in A–G courses from grades 10–11. Most admitted students are well above that.",
      },
      {
        question: "What GPA do you need for CSU?",
        answer:
          "CSU’s published minimum is 2.5 (3.0 for nonresidents). Impacted campuses and majors are usually more competitive.",
      },
      {
        question: "Does UC use weighted or unweighted GPA?",
        answer:
          "UC calculates a capped weighted GPA and also looks at unweighted grades. Our UC GPA calculator estimates both.",
      },
    ],
  },
  {
    slug: "what-is-gpa",
    path: "/guides/what-is-gpa",
    title: "What Is GPA? Meaning, Scale and UK Equivalents",
    description:
      "What GPA stands for, how letter grades become grade points on the 4.0 scale, and how GPA compares with UK degree classes and other countries' systems.",
    keywords: ["what is gpa", "gpa meaning", "what does gpa stand for", "gpa definition"],
    readTime: "6 min read",
    embeddedCalculator: "gpa-calculator",
    relatedGuides: ["how-to-calculate-gpa", "gpa-scale-explained", "what-is-a-good-gpa", "gpa-glossary"],
    relatedCalculators: ["gpa-calculator", "cumulative-gpa-calculator", "uk-degree-to-us-gpa-reference"],
    relatedReference: [
      { label: "US 4.0 GPA scale", href: "/grading-scales/us" },
      { label: "UK university grading system", href: "/grading-scales/uk" },
    ],
    sections: [
      {
        heading: "What GPA stands for",
        body:
          "GPA stands for grade point average. It turns all of your course grades into one number, so schools, scholarship committees and employers can compare results at a glance. In the US it usually runs from 0.0 to 4.0, where 4.0 means straight A grades.",
      },
      {
        heading: "How letter grades become grade points",
        body:
          "Each letter grade has a point value. On the common US scale A = 4.0, B = 3.0, C = 2.0, D = 1.0 and F = 0. Schools that use plus and minus grades add steps in between, such as A− = 3.7 and B+ = 3.3. The GPA is the average of those points, with longer courses counting more.",
      },
      {
        heading: "Why credit hours matter",
        body:
          "A course worth four credits pulls your GPA more than a one-credit course. Each grade point is multiplied by the course credits, the results are added, and the total is divided by all credits taken. The how to calculate GPA guide walks through a full example.",
      },
      {
        heading: "Semester, cumulative, weighted and unweighted GPA",
        body:
          "A semester GPA covers one term; a cumulative GPA covers every term so far. An unweighted GPA treats every class the same on the 4.0 scale, while a weighted GPA adds bonus points for Honors, AP or IB classes, so it can go above 4.0.",
      },
      {
        heading: "Do UK universities use GPA?",
        body:
          "Mostly not. UK bachelor's degrees are reported as honours classes: First, Upper Second (2:1), Lower Second (2:2) and Third, based on percentage marks. A few UK universities also publish a GPA alongside the class, but the classification is still the headline result employers ask for.",
      },
      {
        heading: "Converting a UK degree to a US GPA",
        body:
          "There is no single official conversion. US graduate schools and credential evaluators each apply their own tables, and a First is usually read as A-range work while a 2:1 is often read in the B+ to A− range. Use the UK degree to US GPA reference as a starting point and check what your target school asks for.",
      },
      {
        heading: "GPA in other countries",
        body:
          "Canada uses 4.0, 4.3 or 4.33 scales depending on the university, Australia commonly uses a 7-point scale, and India uses a 10-point CGPA. A 3.5 on one scale is not the same as 3.5 on another, so always compare numbers on the same scale.",
      },
    ],
    faqs: [
      {
        question: "What does GPA stand for?",
        answer: "Grade point average: the average of your course grades after each one is converted to points.",
      },
      {
        question: "Is 4.0 the highest GPA?",
        answer:
          "On an unweighted US scale, yes. Weighted GPAs can exceed 4.0 because Honors, AP and IB classes earn bonus points, and some universities use 4.3 or 4.33 scales.",
      },
      {
        question: "What is the UK equivalent of a GPA?",
        answer:
          "The closest equivalent is the degree classification (First, 2:1, 2:2, Third), which is based on your weighted average mark rather than grade points.",
      },
    ],
  },
  {
    slug: "uk-masters-grading",
    path: "/guides/uk-masters-grading",
    title: "UK Master's Grading: Distinction, Merit and Pass",
    description:
      "What a Distinction, Merit and Pass mean on a UK master's degree, the usual percentage bands, how your overall result is worked out, and borderline rules.",
    keywords: ["distinction grade", "what is a distinction grade", "uk masters grading system", "merit grade uk"],
    readTime: "6 min read",
    relatedGuides: ["what-is-gpa", "how-to-calculate-weighted-grades", "gpa-scale-explained"],
    relatedCalculators: ["degree-classification-calculator", "weighted-grade-calculator", "uk-degree-to-us-gpa-reference"],
    relatedReference: [{ label: "UK university grading system", href: "/grading-scales/uk" }],
    sections: [
      {
        heading: "The usual master's bands",
        body:
          "Most UK universities grade taught master's degrees (MA, MSc, MBA, LLM) on these bands: Distinction at 70% or above, Merit at 60–69%, Pass at 50–59%, and Fail below 50%. Your university's regulations set the exact cutoffs, so check them before you plan around a number.",
      },
      {
        heading: "What a Distinction means",
        body:
          "A Distinction is the top master's result. Marks of 70% and above are rare in UK marking, where 80% or more is reserved for exceptional work, so a Distinction signals consistently excellent performance across your modules and dissertation.",
      },
      {
        heading: "Merit and Pass",
        body:
          "A Merit (60–69%) shows strong, above-average work and is a solid result for most jobs and PhD applications. A Pass (50–59%) means you have met the standard for the degree. Note that the master's pass mark is usually 50%, higher than the 40% pass mark common on bachelor's modules.",
      },
      {
        heading: "How your overall result is worked out",
        body:
          "Your final mark is usually a credit-weighted average of your modules. A typical master's is 180 credits, often with a 60-credit dissertation, so the dissertation can carry a third of the weight. Multiply each module mark by its credits, add the results, and divide by the total credits.",
      },
      {
        heading: "Borderline marks",
        body:
          "Many universities consider students just below a boundary, such as 68–69%, for the higher award. A common rule looks at whether most of your credits, or your dissertation, reached the higher band. These rules differ between universities, so read your programme handbook.",
      },
      {
        heading: "Not the same as bachelor's classes or BTEC grades",
        body:
          "UK bachelor's honours degrees use classes (First, 2:1, 2:2, Third) instead of Distinction and Merit. BTEC and other vocational qualifications also use Distinction, Merit and Pass, but on their own scales unrelated to university percentages.",
      },
    ],
    faqs: [
      {
        question: "What percentage is a Distinction in a UK master's?",
        answer: "Usually 70% or above overall. Merit is usually 60–69% and Pass 50–59%, but check your university's regulations.",
      },
      {
        question: "Is a Merit good?",
        answer:
          "Yes. A Merit shows above-average work and meets the entry requirement for many PhD programmes and graduate jobs.",
      },
      {
        question: "What is a Distinction in US GPA terms?",
        answer:
          "There is no official conversion. Evaluators usually read a Distinction as A-range work, but each US school applies its own table.",
      },
    ],
  },
];
