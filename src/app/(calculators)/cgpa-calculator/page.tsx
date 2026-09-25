import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { CgpaCalculator } from "@/components/calculators/CgpaCalculator";
import { calculatorBySlug } from "@/config/calculators";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { createPageMetadata } from "@/lib/seo/metadata";
import { calculatorHreflangLanguages } from "@/lib/seo/hreflang";

const config = calculatorBySlug["cgpa-calculator"];

export const metadata = createPageMetadata({
  title: "CGPA Calculator — SGPA from Course Grades",
  description: config.description,
  path: "/cgpa-calculator",
  keywords: calculatorKeywords["cgpa-calculator"],
  languages: calculatorHreflangLanguages("cgpa-calculator"),
});

export default function CgpaCalculatorPage() {
  return <CalculatorRoute slug="cgpa-calculator" calculator={<CgpaCalculator />} />;
}
