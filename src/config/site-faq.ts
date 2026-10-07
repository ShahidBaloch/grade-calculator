import type { FaqItem } from "@/types/seo";

export const siteFaqs: FaqItem[] = [
  {
    question: "Are these grade calculators free?",
    answer:
      "Yes. Every calculator is free to use with no sign-up. Calculations run in your browser.",
  },
  {
    question: "What is my grade?",
    answer:
      "To find your grade on a test or quiz, use the EZ grader on the homepage — enter total questions and wrong answers for an instant percentage and letter grade. To find your overall class grade, use the weighted grade calculator and enter each category with its score and weight. For the final exam score you need, use the final grade calculator.",
  },
  {
    question: "Is my grade data private?",
    answer:
      "Your calculator inputs are processed in your browser and are not uploaded to our servers. Optional localStorage on this device may save theme, grading-scale preference, the last calculator you opened, and that tool's last inputs. The site may use geo cookies, CDN security, aggregated analytics, or advertising cookies as described in our Privacy and Cookie policies. Clear site data in your browser to remove local saves.",
  },
  {
    question: "What grading scale do you use?",
    answer:
      "The worldwide default is the common US 4.0 GPA scale. On this scale, A is 93–100%, B is 83–92%, C is 73–82%, D is 63–72%, and F is below 60%. Location may switch the scale to UK, Canadian, Australian, New Zealand, India (10-point), or Pakistan (HEC 4.0). You can change it in any calculator that has a scale selector.",
  },
  {
    question: "What percentage is a B grade?",
    answer:
      "On the standard US grading scale, a B is 83–86%, B+ is 87–89%, and B− is 80–82%. The full B range (B− through B+) runs from 80% to 89%. B equals 3.0 GPA quality points, B+ is 3.3, and B− is 2.7.",
  },
  {
    question: "What percentage is a C grade?",
    answer:
      "On the standard US grading scale, C is 73–76%, C+ is 77–79%, and C− is 70–72%. C equals 2.0 GPA quality points. Many programs require a C or better to count a course toward a major requirement.",
  },
  {
    question: "Do you have country-specific tools?",
    answer:
      "Yes. Use the Countries menu for hubs at /us, /uk, /ca, /au, /nz, /in, and /pk. India and Pakistan hubs feature CGPA tools with local scales locked.",
  },
  {
    question: "How do I convert CGPA to percentage in India?",
    answer:
      "Use the formula your board or university prints. CBSE historically used Percentage = CGPA × 9.5 on some certificates. UGC does not set one national ×9.5 rule. Some universities use ×10 or (CGPA − 0.75) × 10.",
  },
  {
    question: "What is the difference between SGPA and CGPA?",
    answer:
      "SGPA is one semester’s grade point average. CGPA is the credit-weighted average of all semester SGPAs. Use the SGPA to CGPA calculator to combine terms.",
  },
  {
    question: "How do I convert CGPA to percentage in Pakistan?",
    answer:
      "HEC §13.1 assigns the minimum percentage of your grade-point band (3.00 CGPA → 71%). HEC has notified that it stopped converting CGPA into percentage. Percentage = CGPA × 25 is an unofficial shortcut, not that notice or the §13.1 table.",
  },
  {
    question: "Where do I find a specific calculator?",
    answer:
      "Open All Calculators for the full list, or use the Calculators menu. Each tool page has its own how-to, formula, and FAQ — this page covers site-wide questions only.",
  },
];
