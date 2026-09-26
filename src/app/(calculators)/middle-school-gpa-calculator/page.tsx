import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { MiddleSchoolGpaCalculator } from "@/components/calculators/MiddleSchoolGpaCalculator";
import { calculatorBySlug } from "@/config/calculators";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { calculatorHreflangLanguages } from "@/lib/seo/hreflang";
import { createPageMetadata } from "@/lib/seo/metadata";
import { pageDescription, pageTitle } from "@/lib/seo/page-copy";

const config = calculatorBySlug["middle-school-gpa-calculator"];

export const metadata = createPageMetadata({
  title: pageTitle("/middle-school-gpa-calculator", config.name),
  description: pageDescription("/middle-school-gpa-calculator", config.description),
  path: "/middle-school-gpa-calculator",
  keywords: calculatorKeywords["middle-school-gpa-calculator"],
  languages: calculatorHreflangLanguages("middle-school-gpa-calculator"),
});

export default function MiddleSchoolGpaCalculatorPage() {
  return (
    <CalculatorRoute slug="middle-school-gpa-calculator" calculator={<MiddleSchoolGpaCalculator />} />
  );
}
