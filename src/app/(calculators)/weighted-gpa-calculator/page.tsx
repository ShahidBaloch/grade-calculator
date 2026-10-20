import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { WeightedGpaCalculator } from "@/components/calculators/WeightedGpaCalculator";
import { calculatorHreflangLanguages } from "@/lib/seo/hreflang";
import { createPageMetadata } from "@/lib/seo/metadata";
import { pageDescription, pageTitle } from "@/lib/seo/page-copy";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { calculatorBySlug } from "@/config/calculators";

const config = calculatorBySlug["weighted-gpa-calculator"];

export const metadata = createPageMetadata({
  title: pageTitle("/weighted-gpa-calculator", "Weighted GPA Calculator — Honors & AP"),
  description: pageDescription("/weighted-gpa-calculator", config.description),
  path: "/weighted-gpa-calculator",
  keywords: calculatorKeywords["weighted-gpa-calculator"],
  languages: calculatorHreflangLanguages("weighted-gpa-calculator"),
});

export default function WeightedGpaCalculatorPage() {
  return <CalculatorRoute slug="weighted-gpa-calculator" calculator={<WeightedGpaCalculator />} />;
}
