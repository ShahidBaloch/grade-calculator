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
      "Yes. We do not upload your grades to a server. Optional localStorage on this device may save theme, grading-scale preference, the last calculator you opened, and that tool's last inputs. Clear site data in your browser to remove them.",
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
      "CBSE and many UGC colleges use Percentage = CGPA × 9.5. Some universities use ×10 or (CGPA − 0.75) × 10. Open the CGPA to Percentage calculator and pick your formula.",
  },
  {
    question: "What is the difference between SGPA and CGPA?",
    answer:
      "SGPA is one semester’s grade point average. CGPA is the credit-weighted average of all semester SGPAs. Use the SGPA to CGPA calculator to combine terms.",
  },
  {
    question: "How do I convert CGPA to percentage in Pakistan?",
    answer:
      "A common HEC-style estimate on a 4.0 scale is Percentage = CGPA × 25. Use the CGPA to Percentage calculator with the Pakistan HEC formula and confirm your university table.",
  },
  {
    question: "Where do I find a specific calculator?",
    answer:
      "Open All Calculators for the full list, or use the Calculators menu. Each tool page has its own how-to, formula, and FAQ — this page covers site-wide questions only.",
  },
];
