import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { McmasterGpaToUsCalculator } from "@/components/calculators/McmasterGpaToUsCalculator";
import { calculatorBySlug } from "@/config/calculators";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { createPageMetadata } from "@/lib/seo/metadata";
import { calculatorHreflangLanguages } from "@/lib/seo/hreflang";

const config = calculatorBySlug["mcmaster-gpa-to-us-gpa"];

export const metadata = createPageMetadata({
  title: "McMaster 12-Point GPA to US 4.0 — Official Lookup",
  description: config.description,
  path: "/mcmaster-gpa-to-us-gpa",
  keywords: calculatorKeywords["mcmaster-gpa-to-us-gpa"],
  languages: calculatorHreflangLanguages("mcmaster-gpa-to-us-gpa"),
});

export default function McmasterGpaToUsPage() {
  return (
    <CalculatorRoute slug="mcmaster-gpa-to-us-gpa" calculator={<McmasterGpaToUsCalculator />} />
  );
}
