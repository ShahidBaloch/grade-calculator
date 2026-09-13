import { ContentPageLayout } from "@/components/content/ContentPageLayout";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Terms of Service",
  description: `Terms of service for using ${siteConfig.name} calculators and content.`,
  path: "/terms-of-service",
});

export default function TermsPage() {
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Terms of Service", href: "/terms-of-service" },
  ];
  const updated = "September 13, 2026";

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <ContentPageLayout title="Terms of Service" breadcrumbs={breadcrumbs}>
        <p className="text-sm text-[var(--color-text-muted)]">Last updated: {updated}</p>
        <div className="mt-6 space-y-6 text-[var(--color-text-muted)]">
          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)]">Use of service</h2>
            <p className="mt-2">
              {siteConfig.name} provides free educational calculators and reference content. By using
              this site, you agree to use the tools for lawful purposes only.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)]">No warranty</h2>
            <p className="mt-2">
              Calculators are provided &quot;as is&quot; for informational purposes. Grading policies
              vary by school and country. Always verify results with your instructor or official
              transcript. We are not liable for academic decisions based on calculator output.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)]">Intellectual property</h2>
            <p className="mt-2">
              Site content, design, and calculator logic are owned by {siteConfig.name}. You may link
              to our pages but may not scrape or republish our tools without permission.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)]">Changes</h2>
            <p className="mt-2">
              We may update these terms. Continued use after changes constitutes acceptance.
            </p>
          </section>
        </div>
      </ContentPageLayout>
    </>
  );
}
