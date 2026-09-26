"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { resolveSiteHref } from "@/lib/utils/country-path";

export function CountryAwareLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const resolvedHref = resolveSiteHref(href, pathname);

  return (
    <Link href={resolvedHref} className={className}>
      {children}
    </Link>
  );
}
