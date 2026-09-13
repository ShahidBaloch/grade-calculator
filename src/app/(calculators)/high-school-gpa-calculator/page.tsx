import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { HighSchoolGpaCalculator } from "@/components/calculators/HighSchoolGpaCalculator";
import { createPageMetadata } from "@/lib/seo/metadata";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { calculatorBySlug } from "@/config/calculators";

const config = calculatorBySlug["high-school-gpa-calculator"];

export const metadata = createPageMetadata({
  title: "High School GPA Calculator",
  description: config.description,
  path: "/high-school-gpa-calculator",
  keywords: calculatorKeywords["high-school-gpa-calculator"],
});

export default function HighSchoolGpaCalculatorPage() {
  return (
    <CalculatorRoute slug="high-school-gpa-calculator" calculator={<HighSchoolGpaCalculator />} />
  );
}
