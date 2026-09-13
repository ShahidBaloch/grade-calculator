import { permanentRedirect } from "next/navigation";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Grade Calculator — EZ Grader & Free Online Tools",
  description:
    "Free grade calculator and EZ grader for teachers and students. Score tests instantly, calculate weighted grades, finals, and GPA.",
  path: "/",
});

export default function EzGraderRedirectPage() {
  permanentRedirect("/");
}
