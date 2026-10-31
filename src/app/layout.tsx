import type { ReactNode } from "react";
import { GradeInputPrivacyNotice } from "@/components/content/GradeInputPrivacyNotice";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { HeaderSeoNav } from "@/components/layout/HeaderSeoNav";
import {
  DeferredPreferredCountryHubSync,
  DeferredToolSwitcher,
} from "@/components/layout/DeferredLayoutClient";
import { GradingScaleProvider } from "@/components/providers/grading-scale-provider";
import { JsonLd } from "@/components/seo/JsonLd";
import { mainNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { organizationJsonLd, webSiteJsonLd } from "@/lib/seo/jsonld";

/** Root layout defaults; page metadata overrides these (same merge as Next). */
export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.name,
  description: siteConfig.description,
};

/** Everything inside <body>. The <html>/<head> shell lives in src/layouts/Document.astro. */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <GradingScaleProvider>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={webSiteJsonLd()} />
      <a
        href="#main-content"
        className="no-print fixed left-4 top-4 z-[100] inline-flex min-h-11 -translate-y-[200%] items-center rounded-md bg-[var(--color-action)] px-4 py-2 text-[var(--color-action-fg)] focus:translate-y-0"
      >
        Skip to content
      </a>
      <DeferredPreferredCountryHubSync />
      <Header nav={mainNav} />
      <HeaderSeoNav />
      <div className="no-print px-4 py-1.5" data-print-chrome>
        <div className="mx-auto max-w-7xl">
          <GradeInputPrivacyNotice />
        </div>
      </div>
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <DeferredToolSwitcher />
    </GradingScaleProvider>
  );
}
