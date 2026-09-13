import { permanentRedirect } from "next/navigation";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Letter Grade Calculator",
  description: "Convert a letter grade to its percentage equivalent and GPA points.",
  path: "/letter-grade-calculator",
});

export default function LetterGradeToPercentageRedirect() {
  permanentRedirect("/letter-grade-calculator");
}
