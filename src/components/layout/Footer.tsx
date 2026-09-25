import Link from "next/link";
import { footerNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-subtle)]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          <h2 className="mb-3 text-sm font-semibold">Calculators</h2>
          <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
            {footerNav.calculators.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-[var(--color-primary)]">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold">Guides</h2>
          <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
            {footerNav.guides.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-[var(--color-primary)]">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold">Countries</h2>
          <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
            {footerNav.countries.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-[var(--color-primary)]">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold">Reference</h2>
          <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
            {footerNav.reference.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-[var(--color-primary)]">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold">Company</h2>
          <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
            {footerNav.company.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-[var(--color-primary)]">
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
