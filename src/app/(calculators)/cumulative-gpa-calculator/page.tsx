import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { CumulativeGpaCalculator } from "@/components/calculators/CumulativeGpaCalculator";
import { calculatorHreflangLanguages } from "@/lib/seo/hreflang";
import { createPageMetadata } from "@/lib/seo/metadata";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { calculatorBySlug } from "@/config/calculators";

const config = calculatorBySlug["cumulative-gpa-calculator"];

export const metadata = createPageMetadata({
  title: "Cumulative GPA Calculator",
  description: config.description,
  path: "/cumulative-gpa-calculator",
  keywords: calculatorKeywords["cumulative-gpa-calculator"],
  languages: calculatorHreflangLanguages("cumulative-gpa-calculator"),
});

export default function CumulativeGpaCalculatorPage() {
  return (
    <CalculatorRoute slug="cumulative-gpa-calculator" calculator={<CumulativeGpaCalculator />} />
  );
}
