import { getCountryPrefixFromPath } from "@/lib/utils/country-path";
import { calculatorContent } from "@/config/calculator-content";
import type { CalculatorSlug } from "@/types/calculator";

const GPA_SCALE_STEP =
  "Each grade converts to quality points on the scale shown above (on /au pages, choose UQ, Monash, or the generic example preset).";

const LETTER_INPUT_STEP =
  "Enter a grade label from the scale shown above (for example HD/D/C on Australian pages or First/2:1 on UK pages).";

export function getCalculatorHowItWorks(slug: CalculatorSlug, pagePath?: string): string[] {
  const base = calculatorContent[slug].howItWorks;
  const onCountryHub = Boolean(getCountryPrefixFromPath(pagePath));

  if (slug === "gpa-calculator" && onCountryHub) {
    return [base[0], GPA_SCALE_STEP, base[2]];
  }

  if (slug === "letter-grade-calculator" && onCountryHub) {
    return [LETTER_INPUT_STEP, base[1], base[2]];
  }

  return base;
}
