import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { SemesterGradeCalculator } from "@/components/calculators/SemesterGradeCalculator";
import { calculatorHreflangLanguages } from "@/lib/seo/hreflang";
import { createPageMetadata } from "@/lib/seo/metadata";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { pageDescription, pageTitle } from "@/lib/seo/page-copy";
import { calculatorBySlug } from "@/config/calculators";

const config = calculatorBySlug["semester-grade-calculator"];

export const metadata = createPageMetadata({
  title: pageTitle("/semester-grade-calculator", config.name),
  description: pageDescription("/semester-grade-calculator", config.description),
  path: "/semester-grade-calculator",
  keywords: calculatorKeywords["semester-grade-calculator"],
  languages: calculatorHreflangLanguages("semester-grade-calculator"),
});

export default function Page() {
  return <CalculatorRoute slug="semester-grade-calculator" calculator={<SemesterGradeCalculator />} />;
}
