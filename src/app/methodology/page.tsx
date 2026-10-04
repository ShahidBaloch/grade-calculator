import Link from "next/link";
import { ContentPageLayout } from "@/components/content/ContentPageLayout";
import { EditorialByline } from "@/components/content/EditorialByline";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Methodology & Editorial Policy",
  description:
    "How GradeCalculator builds, tests, and updates free grade and GPA tools — formulas, sources, privacy, and SEO quality standards.",
  path: "/methodology",
});

export default function MethodologyPage() {
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Methodology", href: "/methodology" },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <ContentPageLayout
        title="Methodology & Editorial Policy"
        description="Transparent rules for calculator accuracy, citations, and content updates."
        breadcrumbs={breadcrumbs}
      >
        <EditorialByline className="mb-6" />
        <div className="space-y-6 text-[var(--color-text-muted)]">
          <section>
            <h2 className="text-xl font-semibold text-[var(--color-text)]">Purpose</h2>
            <p className="mt-2">
              {siteConfig.name} publishes free educational calculators and guides. We do not replace
              official transcripts, admission systems, or faculty grading policies. Every regional tool
              is labeled as a planning aid when it simplifies government or university rules.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-[var(--color-text)]">How formulas are built</h2>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>
                Standard math (weighted averages, final-exam targets, test percentages, semester GPA)
                follows widely taught formulas shown on each calculator page.
              </li>
              <li>
                Letter grades map through selectable grading scales. Boundaries use the raw percentage
                (89.99 stays below a 90 cutoff).
              </li>
              <li>
                Regional models (ATAR planning curves, UK degree classification, UC A–G, McMaster 12-point
                lookup) mirror published rules where possible and link to primary sources on the
                calculator page.
              </li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-[var(--color-text)]">Automated quality checks</h2>
            <p className="mt-2">
              Calculator logic is covered by automated regression tests, including edge cases (zero
              weights, impossible final targets, grade boundaries, and invalid inputs). SEO and legal
              copy are checked so privacy statements match client-side storage keys and CDN behavior.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-[var(--color-text)]">Sample data in the UI</h2>
            <p className="mt-2">
              Calculators may open with example numbers so you can see a result immediately. Those
              values are not your grades. Replace them, click an example scenario, or use Reset to clear
              saved inputs on this device.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-[var(--color-text)]">Privacy & data</h2>
            <p className="mt-2">
              Grades you type are processed in your browser and are not uploaded to our servers.
              Optional localStorage may remember theme, scale, and calculator inputs. Analytics,
              advertising, and CDN security are described in our{" "}
              <Link href="/privacy-policy" className="text-[var(--color-primary)] hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-[var(--color-text)]">SEO & indexability</h2>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>One canonical URL per calculator intent; duplicate geo URLs redirect or noindex.</li>
              <li>Sitemaps list indexable pages only — not redirect-only or thin programmatic URLs.</li>
              <li>Country and worldwide pages use distinct titles and descriptions to avoid keyword overlap.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-[var(--color-text)]">Updates & corrections</h2>
            <p className="mt-2">
              We update tools when grading policies change or users report a reproducible error. Contact{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-[var(--color-primary)] hover:underline">
                {siteConfig.email}
              </a>{" "}
              with the calculator URL, inputs, and expected result.
            </p>
          </section>
        </div>
      </ContentPageLayout>
    </>
  );
}
