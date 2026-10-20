import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { RaiseGpaCalculator } from "@/components/calculators/RaiseGpaCalculator";
import { calculatorHreflangLanguages } from "@/lib/seo/hreflang";
import { createPageMetadata } from "@/lib/seo/metadata";
import { pageDescription, pageTitle } from "@/lib/seo/page-copy";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { calculatorBySlug } from "@/config/calculators";

const config = calculatorBySlug["raise-gpa-calculator"];

export const metadata = createPageMetadata({
  title: pageTitle("/raise-gpa-calculator", "Raise GPA Calculator — Target GPA Planner"),
  description: pageDescription("/raise-gpa-calculator", config.description),
  path: "/raise-gpa-calculator",
  keywords: calculatorKeywords["raise-gpa-calculator"],
  languages: calculatorHreflangLanguages("raise-gpa-calculator"),
});

export default function RaiseGpaCalculatorPage() {
  return <CalculatorRoute slug="raise-gpa-calculator" calculator={<RaiseGpaCalculator />} />;
}
