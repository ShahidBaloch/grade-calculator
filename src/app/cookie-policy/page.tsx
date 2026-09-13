import Link from "next/link";
import { ContentPageLayout } from "@/components/content/ContentPageLayout";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Cookie Policy",
  description: `How ${siteConfig.name} uses cookies — geo scale detection only. Theme is saved in localStorage.`,
  path: "/cookie-policy",
});

export default function CookiePolicyPage() {
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Cookie Policy", href: "/cookie-policy" },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <ContentPageLayout title="Cookie Policy" breadcrumbs={breadcrumbs}>
        <div className="space-y-6 text-[var(--color-text-muted)]">
          <p>
            {siteConfig.name} uses a minimal set of cookies to improve your experience. We do not use
            advertising or tracking cookies.
          </p>
          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)]">Cookies we use</h2>
            <table className="mt-3 w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border)]">
                  <th className="py-2 text-left">Cookie</th>
                  <th className="py-2 text-left">Purpose</th>
                  <th className="py-2 text-left">Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--color-border)]">
                  <td className="py-2 font-mono text-xs">gc-geo-scale</td>
                  <td className="py-2">Stores detected grading scale from your region</td>
                  <td className="py-2">30 days</td>
                </tr>
                <tr className="border-b border-[var(--color-border)]">
                  <td className="py-2 font-mono text-xs">gc-geo-country</td>
                  <td className="py-2">Stores detected country code (ISO)</td>
                  <td className="py-2">30 days</td>
                </tr>
              </tbody>
            </table>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)]">Stored on your device only</h2>
            <p className="mt-2">
              These keys stay in localStorage, not cookies: theme (
              <span className="font-mono text-xs">gc-theme</span>), grading-scale preference (
              <span className="font-mono text-xs">gc-scale</span>), last calculator used (
              <span className="font-mono text-xs">gc-recent-calculator</span>), and per-calculator
              inputs (<span className="font-mono text-xs">gc-state-*</span>). Clearing site data in
              your browser removes them.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)]">Managing cookies</h2>
            <p className="mt-2">
              You can clear cookies in your browser settings. The site will still work with US default
              grading scales. See our{" "}
              <Link href="/privacy-policy" className="text-[var(--color-primary)] hover:underline">
                Privacy Policy
              </Link>{" "}
              for more information.
            </p>
          </section>
        </div>
      </ContentPageLayout>
    </>
  );
}
