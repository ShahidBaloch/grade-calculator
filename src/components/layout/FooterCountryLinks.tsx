"use client";

import { AppLink as Link } from "@/components/navigation/AppLink";
import { usePathname } from "next/navigation";
import type { NavLink } from "@/config/navigation";
import { isCountryLinkActive } from "@/lib/utils/country-nav";
import { cn } from "@/lib/utils";

export function FooterCountryLinks({ links }: { links: NavLink[] }) {
  const pathname = usePathname();

  return (
    <ul className="space-y-1 text-sm">
      {links.map((link) => {
        const active = isCountryLinkActive(link.href, pathname);
        const currentPage = pathname === link.href;
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              aria-current={currentPage ? "page" : active ? "true" : undefined}
              className={cn(
                "country-footer-link inline-flex min-h-8 items-center gap-2 rounded-md px-1.5",
                active && "country-footer-current",
              )}
            >
              {link.flag ? (
                <span aria-hidden className="text-base leading-none">
                  {link.flag}
                </span>
              ) : null}
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
