import type { FaqItem } from "@/types/seo";

export const siteFaqs: FaqItem[] = [
  {
    question: "Are these grade calculators free?",
    answer:
      "Yes. Every calculator is free to use with no sign-up. Calculations run in your browser.",
  },
  {
    question: "Is my grade data private?",
    answer:
      "Your calculator inputs are processed in your browser and are not uploaded to our servers. Optional localStorage on this device may save theme, grading-scale preference, the last calculator you opened, and that tool's last inputs. The site may use geo cookies, CDN security, aggregated analytics, or advertising cookies as described in our Privacy and Cookie policies. Clear site data in your browser to remove local saves.",
  },
  {
    question: "What grading scale do you use?",
    answer:
      "The worldwide default is the common US 4.0 GPA scale. Location may switch the scale to UK, Canadian, Australian, New Zealand, India (10-point), or Pakistan (HEC 4.0). You can change it in any calculator that has a scale selector.",
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
