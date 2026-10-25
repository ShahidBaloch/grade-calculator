import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { GradePercentageCalculator } from "@/components/calculators/GradePercentageCalculator";
import { calculatorHreflangLanguages } from "@/lib/seo/hreflang";
import { createPageMetadata } from "@/lib/seo/metadata";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { pageDescription, pageTitle } from "@/lib/seo/page-copy";
import { calculatorBySlug } from "@/config/calculators";

const config = calculatorBySlug["grade-percentage-calculator"];

export const metadata = createPageMetadata({
  title: pageTitle("/grade-percentage-calculator", config.name),
  description: pageDescription("/grade-percentage-calculator", config.description),
  path: "/grade-percentage-calculator",
  keywords: calculatorKeywords["grade-percentage-calculator"],
  languages: calculatorHreflangLanguages("grade-percentage-calculator"),
});

export default function Page() {
  return <CalculatorRoute slug="grade-percentage-calculator" calculator={<GradePercentageCalculator />} />;
}
