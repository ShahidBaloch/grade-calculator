import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { EocGradeCalculator } from "@/components/calculators/EocGradeCalculator";
import { calculatorHreflangLanguages } from "@/lib/seo/hreflang";
import { createPageMetadata } from "@/lib/seo/metadata";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { calculatorBySlug } from "@/config/calculators";

const config = calculatorBySlug["eoc-grade-calculator"];

export const metadata = createPageMetadata({
  title: "EOC Grade Calculator — End of Course Exam",
  description: config.description,
  path: "/eoc-grade-calculator",
  keywords: calculatorKeywords["eoc-grade-calculator"],
  languages: calculatorHreflangLanguages("eoc-grade-calculator"),
});

export default function EocGradeCalculatorPage() {
  return <CalculatorRoute slug="eoc-grade-calculator" calculator={<EocGradeCalculator />} />;
}
