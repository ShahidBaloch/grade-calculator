import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { CgpaToGpaCalculator } from "@/components/calculators/CgpaToGpaCalculator";
import { calculatorBySlug } from "@/config/calculators";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { createPageMetadata } from "@/lib/seo/metadata";
import { calculatorHreflangLanguages } from "@/lib/seo/hreflang";

const config = calculatorBySlug["cgpa-to-gpa"];

export const metadata = createPageMetadata({
  title: "CGPA to GPA Converter — 10 Point to 4.0",
  description: config.description,
  path: "/cgpa-to-gpa",
  keywords: calculatorKeywords["cgpa-to-gpa"],
  languages: calculatorHreflangLanguages("cgpa-to-gpa"),
});

export default function CgpaToGpaPage() {
  return <CalculatorRoute slug="cgpa-to-gpa" calculator={<CgpaToGpaCalculator />} />;
}
