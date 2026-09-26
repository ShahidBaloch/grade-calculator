import Link from "next/link";
import { ContentPageLayout } from "@/components/content/ContentPageLayout";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "About Us",
  description:
    "GradeCalculator provides free, fast, and private grade and GPA calculators for students and teachers worldwide.",
  path: "/about",
});

export default function AboutPage() {
  const breadcrumbs = [{ name: "Home", href: "/" }, { name: "About", href: "/about" }];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <ContentPageLayout
        title="About GradeCalculator"
        description="Free tools for students and teachers — built for speed, accuracy, and privacy."
        breadcrumbs={breadcrumbs}
      >
        <div className="space-y-6 text-[var(--color-text-muted)]">
          <p>
            {siteConfig.name} is a free online platform for calculating test scores, weighted course
            averages, final exam targets, and GPA. We built it because existing grade calculator sites
            are often slow, ad-heavy, and missing the tools students actually search for.
          </p>
          <p>
            Our calculators run entirely in your browser. We don&apos;t store your grades on our servers,
            and we don&apos;t require sign-up. Geo cookies, CDN security, optional analytics, and
            advertising (if enabled) are described in our{" "}
            <Link href="/privacy-policy" className="text-[var(--color-primary)] hover:underline">
              Privacy Policy
            </Link>
            . Your grading scale is detected automatically from your location, with support for US, UK,
            Canadian, Australian, New Zealand, India (10-point CGPA), and Pakistan (HEC 4.0) systems.
          </p>
          <h2 className="text-xl font-semibold text-[var(--color-text)]">How results are checked</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Letter grades use the raw percentage. 89.99 stays a B+ when the A− cut-off is 90.</li>
            <li>A total weight or credit load of zero is rejected. The calculator does not divide by zero.</li>
            <li>University tables follow the institution’s published points. Monash and UQ are not the same scale.</li>
            <li>ATAR and UK-to-US figures are planning estimates. They are not official results or application GPAs.</li>
          </ul>
          <h2 className="text-xl font-semibold text-[var(--color-text)]">What we offer</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>EZ Grader, test grade, Canvas, and EOC calculators for classroom scoring</li>
            <li>Weighted grade and final exam calculators for course planning</li>
            <li>Semester, cumulative, high school, college, and raise-GPA tools</li>
            <li>UK degree classification, GCSE 9–1 bands, and an educational Australian ATAR estimate</li>
            <li>
              Country hubs for the US, UK, Canada, Australia, New Zealand,{" "}
              <Link href="/in" className="text-[var(--color-primary)] hover:underline">India</Link>, and{" "}
              <Link href="/pk" className="text-[var(--color-primary)] hover:underline">Pakistan</Link>{" "}
              (CGPA, SGPA, and local scale presets)
            </li>
            <li>Grading scale reference charts and educational guides</li>
          </ul>
          <p>
            Questions or feedback?{" "}
            <Link href="/contact" className="text-[var(--color-primary)] hover:underline">
              Contact us
            </Link>
            .
          </p>
        </div>
      </ContentPageLayout>
    </>
  );
}
