"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { resolveSiteHref } from "@/lib/utils/country-path";

export function CountryAwareLink({
  href,
  className,
  children,
  prefetch,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  prefetch?: boolean;
}) {
  const pathname = usePathname();
  const resolvedHref = resolveSiteHref(href, pathname);

  return (
    <Link href={resolvedHref} className={className} prefetch={prefetch}>
      {children}
    </Link>
  );
}
