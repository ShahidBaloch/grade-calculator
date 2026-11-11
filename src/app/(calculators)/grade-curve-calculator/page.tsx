import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { GradeCurveCalculator } from "@/components/calculators/GradeCurveCalculator";
import { calculatorHreflangLanguages } from "@/lib/seo/hreflang";
import { createPageMetadata } from "@/lib/seo/metadata";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { pageDescription, pageTitle } from "@/lib/seo/page-copy";
import { calculatorBySlug } from "@/config/calculators";

const config = calculatorBySlug["grade-curve-calculator"];

export const metadata = createPageMetadata({
  title: pageTitle("/grade-curve-calculator", config.name),
  description: pageDescription("/grade-curve-calculator", config.description),
  path: "/grade-curve-calculator",
  keywords: calculatorKeywords["grade-curve-calculator"],
  languages: calculatorHreflangLanguages("grade-curve-calculator"),
});

export default function Page() {
  return <CalculatorRoute slug="grade-curve-calculator" calculator={<GradeCurveCalculator />} />;
}
