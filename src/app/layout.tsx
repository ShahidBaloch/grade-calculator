import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GradeInputPrivacyNotice } from "@/components/content/GradeInputPrivacyNotice";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ToolSwitcher } from "@/components/engagement/ToolSwitcher";
import { GradingScaleProvider } from "@/components/providers/grading-scale-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";
import { organizationJsonLd, webSiteJsonLd } from "@/lib/seo/jsonld";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} min-h-screen antialiased pb-14 md:pb-0`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="gc-theme">
          <GradingScaleProvider>
            <TooltipProvider>
              <JsonLd data={[organizationJsonLd(), webSiteJsonLd()]} />
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-[var(--color-primary)] focus:px-4 focus:py-2 focus:text-white"
              >
                Skip to content
              </a>
              <Header />
              <div className="px-4 py-1.5">
                <div className="mx-auto max-w-7xl">
                  <GradeInputPrivacyNotice />
                </div>
              </div>
              <main id="main-content">{children}</main>
              <Footer />
              <ToolSwitcher />
            </TooltipProvider>
          </GradingScaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
