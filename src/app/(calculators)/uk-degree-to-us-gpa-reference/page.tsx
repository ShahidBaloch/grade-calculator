import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { UkDegreeToUsGpaReferenceCalculator } from "@/components/calculators/UkDegreeToUsGpaReferenceCalculator";
import { calculatorBySlug } from "@/config/calculators";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { createPageMetadata } from "@/lib/seo/metadata";
import { calculatorHreflangLanguages } from "@/lib/seo/hreflang";

const config = calculatorBySlug["uk-degree-to-us-gpa-reference"];

export const metadata = createPageMetadata({
  title: "UK Degree Class to US GPA — Approximate Reference",
  description: config.description,
  path: "/uk-degree-to-us-gpa-reference",
  keywords: calculatorKeywords["uk-degree-to-us-gpa-reference"],
  languages: calculatorHreflangLanguages("uk-degree-to-us-gpa-reference"),
});

export default function UkDegreeToUsGpaReferencePage() {
  return (
    <CalculatorRoute
      slug="uk-degree-to-us-gpa-reference"
      calculator={<UkDegreeToUsGpaReferenceCalculator />}
    />
  );
}
