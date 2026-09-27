import Link from "next/link";
import { ContentPageLayout } from "@/components/content/ContentPageLayout";
import { EditorialByline } from "@/components/content/EditorialByline";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";
import { webPageJsonLd } from "@/lib/seo/jsonld";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Educational Disclaimer",
  description:
    "GradeCalculator (gradcalc.com) provides planning calculators only. Results are not official grades, GPAs, ATARs, or transcript values — always confirm with your school.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Disclaimer", href: "/disclaimer" },
  ];

  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          name: "Educational Disclaimer",
          description:
            "Planning-only grade and GPA calculators. Not official academic records or application submissions.",
          path: "/disclaimer",
        })}
      />
      <BreadcrumbJsonLd items={breadcrumbs} />
      <ContentPageLayout
        title="Educational Disclaimer"
        description="How to interpret calculator results — and when to rely on your institution instead."
        breadcrumbs={breadcrumbs}
      >
        <EditorialByline className="not-prose mb-6" />
        <div className="space-y-6 text-[var(--color-text-muted)]">
          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)]">Planning tools, not official records</h2>
            <p className="mt-2">
              {siteConfig.name} at {siteConfig.domainLabel} helps students and teachers estimate scores,
              weighted averages, exam targets, and GPA-style figures. Outputs are{" "}
              <strong className="text-[var(--color-text)]">educational estimates</strong> for planning.
              They are not grades on your transcript, LMS gradebook entries, or university records.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)]">Policies differ by school and country</h2>
            <p className="mt-2">
              Letter cut-offs, weighting rules, rounding, dropped scores, honors points, and degree
              classifications vary. A calculator cannot know your syllabus, exam board, or registrar
              rules. Always confirm with your instructor, handbook, or official transcript before
              making decisions.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)]">Conversions and rankings</h2>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>
                <strong className="text-[var(--color-text)]">ATAR estimates</strong> are illustrative
                models — not official Australian Tertiary Admission Rank results from your state
                authority.
              </li>
              <li>
                <strong className="text-[var(--color-text)]">UK degree class ↔ US GPA</strong> pages
                are for orientation only. Do not self-report converted GPAs on applications unless the
                receiving institution explicitly asks you to.
              </li>
              <li>
                <strong className="text-[var(--color-text)]">CGPA ↔ percentage (India/Pakistan)</strong>{" "}
                tools may offer multiple formulas (e.g. CBSE ×9.5, HEC §13.1). Use the formula your
                university publishes.
              </li>
              <li>
                <strong className="text-[var(--color-text)]">UC/CSU GPA</strong> and similar tools are
                planning aids, not official admissions GPAs.
              </li>
            </ul>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)]">Rounding and letter grades</h2>
            <p className="mt-2">
              We map letter grades from the{" "}
              <strong className="text-[var(--color-text)]">unrounded percentage</strong> where noted
              (for example, 89.99% stays B+ when the A− cut-off is 90). Your school may round
              differently or use plus/minus rules not shown on your scale preset.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)]">Your data stays on your device</h2>
            <p className="mt-2">
              Calculator inputs are processed in your browser. We do not receive your grades unless you
              choose to email us via{" "}
              <Link href="/contact" className="text-[var(--color-primary)] hover:underline">
                Contact
              </Link>
              . Please do not send sensitive student records.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)]">Corrections</h2>
            <p className="mt-2">
              If you believe a formula or scale table is wrong, tell us through{" "}
              <Link href="/contact" className="text-[var(--color-primary)] hover:underline">
                Contact
              </Link>{" "}
              or review how we test tools in{" "}
              <Link href="/methodology" className="text-[var(--color-primary)] hover:underline">
                Methodology
              </Link>
              .
            </p>
          </section>
          <p className="text-sm">
            See also{" "}
            <Link href="/terms-of-service" className="text-[var(--color-primary)] hover:underline">
              Terms of Service
            </Link>
            .
          </p>
        </div>
      </ContentPageLayout>
    </>
  );
}
