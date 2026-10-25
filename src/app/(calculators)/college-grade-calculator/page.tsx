import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { CollegeGradeCalculator } from "@/components/calculators/CollegeGradeCalculator";
import { calculatorHreflangLanguages } from "@/lib/seo/hreflang";
import { createPageMetadata } from "@/lib/seo/metadata";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { pageDescription, pageTitle } from "@/lib/seo/page-copy";
import { calculatorBySlug } from "@/config/calculators";

const config = calculatorBySlug["college-grade-calculator"];

export const metadata = createPageMetadata({
  title: pageTitle("/college-grade-calculator", config.name),
  description: pageDescription("/college-grade-calculator", config.description),
  path: "/college-grade-calculator",
  keywords: calculatorKeywords["college-grade-calculator"],
  languages: calculatorHreflangLanguages("college-grade-calculator"),
});

export default function Page() {
  return <CalculatorRoute slug="college-grade-calculator" calculator={<CollegeGradeCalculator />} />;
}
