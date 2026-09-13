import { CalculatorRoute } from "@/components/calculators/CalculatorRoute";
import { EzGrader } from "@/components/calculators/EzGrader";
import { createPageMetadata } from "@/lib/seo/metadata";
import { calculatorKeywords } from "@/lib/seo/keywords";
import { calculatorBySlug } from "@/config/calculators";

const config = calculatorBySlug["ez-grader"];

export const metadata = createPageMetadata({
  title: "EZ Grader — Easy Grader Online",
  description: config.description,
  path: "/ez-grader",
  keywords: calculatorKeywords["ez-grader"],
});

export default function EzGraderPage() {
  return <CalculatorRoute slug="ez-grader" calculator={<EzGrader />} />;
}
