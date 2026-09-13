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
      "The worldwide default is US Standard 4.0. Location may switch the scale to UK, Canadian, Australian, or New Zealand. You can change it in any calculator that has a scale selector.",
  },
  {
    question: "Do you have country-specific tools?",
    answer:
      "Yes. Use the UK degree classification and GCSE 9–1 calculators, and the ATAR calculator for an educational Australian rank estimate. Country hubs at /us, /uk, /ca, /au, and /nz open featured tools with that country's scale locked.",
  },
  {
    question: "Where do I find a specific calculator?",
    answer:
      "Open All Calculators for the full list, or use the Calculators menu. Each tool page has its own how-to, formula, and FAQ — this page covers site-wide questions only.",
  },
];
