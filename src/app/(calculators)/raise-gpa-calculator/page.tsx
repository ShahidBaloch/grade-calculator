import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { RaiseGpaCalculator } from "@/components/calculators/RaiseGpaCalculator";
import { calculatorHreflangLanguages } from "@/lib/seo/hreflang";
import { createPageMetadata } from "@/lib/seo/metadata";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { calculatorBySlug } from "@/config/calculators";

const config = calculatorBySlug["raise-gpa-calculator"];

export const metadata = createPageMetadata({
  title: "Raise GPA Calculator — Target GPA Planner",
  description: config.description,
  path: "/raise-gpa-calculator",
  keywords: calculatorKeywords["raise-gpa-calculator"],
  languages: calculatorHreflangLanguages("raise-gpa-calculator"),
});

export default function RaiseGpaCalculatorPage() {
  return <CalculatorRoute slug="raise-gpa-calculator" calculator={<RaiseGpaCalculator />} />;
}
