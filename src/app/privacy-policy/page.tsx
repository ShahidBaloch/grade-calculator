import { ContentPageLayout } from "@/components/content/ContentPageLayout";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description: `Privacy policy for ${siteConfig.name} — client-side calculators, no grade data collection.`,
  path: "/privacy-policy",
  noIndex: false,
});

export default function PrivacyPolicyPage() {
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Privacy Policy", href: "/privacy-policy" },
  ];
  const updated = "September 13, 2026";

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <ContentPageLayout title="Privacy Policy" breadcrumbs={breadcrumbs}>
        <p className="text-sm text-[var(--color-text-muted)]">Last updated: {updated}</p>
        <div className="mt-6 space-y-6 text-[var(--color-text-muted)]">
          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)]">Overview</h2>
            <p className="mt-2">
              {siteConfig.name} (&quot;we&quot;, &quot;us&quot;) respects your privacy. Our calculators
              process all grade inputs locally in your browser. We do not collect, store, or transmit
              your grades to our servers.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)]">Information we collect</h2>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>
                <strong>Local storage:</strong> Optional preferences stored on your device only —
                theme (<span className="font-mono text-xs">gc-theme</span>), grading-scale
                preference (<span className="font-mono text-xs">gc-scale</span>), last calculator
                used (<span className="font-mono text-xs">gc-recent-calculator</span>), and the last
                inputs for each tool (<span className="font-mono text-xs">gc-state-*</span>). We
                never receive these values.
              </li>
              <li>
                <strong>Geo cookies:</strong> A cookie may store your detected country code to select
                the appropriate grading scale. No personal information is included.
              </li>
              <li>
                <strong>Analytics:</strong> We do not use analytics at launch. If added later, this
                policy will be updated.
              </li>
            </ul>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)]">Third parties</h2>
            <p className="mt-2">
              We do not sell your data. We do not share grade information with third parties because
              we never receive it.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)]">Contact</h2>
            <p className="mt-2">
              Privacy questions:{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-[var(--color-primary)] hover:underline">
                {siteConfig.email}
              </a>
            </p>
          </section>
        </div>
      </ContentPageLayout>
    </>
  );
}
