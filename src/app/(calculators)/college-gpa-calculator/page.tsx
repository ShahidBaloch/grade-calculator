import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { CollegeGpaCalculator } from "@/components/calculators/CollegeGpaCalculator";
import { calculatorHreflangLanguages } from "@/lib/seo/hreflang";
import { createPageMetadata } from "@/lib/seo/metadata";
import { pageDescription, pageTitle } from "@/lib/seo/page-copy";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { calculatorBySlug } from "@/config/calculators";

const config = calculatorBySlug["college-gpa-calculator"];

export const metadata = createPageMetadata({
  title: pageTitle("/college-gpa-calculator", "College GPA Calculator — Credit Hours"),
  description: pageDescription("/college-gpa-calculator", config.description),
  path: "/college-gpa-calculator",
  keywords: calculatorKeywords["college-gpa-calculator"],
  languages: calculatorHreflangLanguages("college-gpa-calculator"),
});

export default function CollegeGpaCalculatorPage() {
  return <CalculatorRoute slug="college-gpa-calculator" calculator={<CollegeGpaCalculator />} />;
}
