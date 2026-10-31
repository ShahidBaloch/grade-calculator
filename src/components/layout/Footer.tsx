import { footerNavForPath } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { AppLink as Link } from "@/components/navigation/AppLink";
import { FooterCountryLinks } from "./FooterCountryLinks";
import { usePathname } from "next/navigation";

/**
 * Hub-specific footer links follow the current URL. Each page is built with its own path, so the
 * footer is plain HTML (no client JS).
 */
export function Footer() {
  const year = new Date().getFullYear();
  const pathname = usePathname();
  const footerNav = footerNavForPath(pathname);

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-subtle)]">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 lg:grid-cols-[minmax(0,27rem)_minmax(0,17rem)_0.8fr_1.3fr_0.9fr]">
        <div className="col-span-2 lg:col-span-1">
          <h2 className="mb-3 text-sm font-semibold">Calculators</h2>
          {/* Two columns: one long list left most of the footer empty. */}
          <ul className="gap-x-6 text-sm text-[var(--color-text-muted)] sm:columns-2 [&>li]:mb-1 [&>li]:break-inside-avoid">
            {footerNav.calculators.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="inline-flex min-h-6 items-center hover:text-[var(--color-primary)]">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <h2 className="mb-3 text-sm font-semibold">Guides</h2>
          <ul className="space-y-1 text-sm text-[var(--color-text-muted)]">
            {footerNav.guides.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="inline-flex min-h-6 items-center hover:text-[var(--color-primary)]">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold">Countries</h2>
          <FooterCountryLinks links={footerNav.countries} />
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold">Reference</h2>
          <ul className="space-y-1 text-sm text-[var(--color-text-muted)]">
            {footerNav.reference.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="inline-flex min-h-6 items-center hover:text-[var(--color-primary)]">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold">Company</h2>
          <ul className="space-y-1 text-sm text-[var(--color-text-muted)]">
            {footerNav.company.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="inline-flex min-h-6 items-center hover:text-[var(--color-primary)]">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--color-border)] px-4 py-4 text-center text-sm text-[var(--color-text-muted)]">
        © {year} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
