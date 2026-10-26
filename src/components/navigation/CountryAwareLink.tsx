"use client";

import { AppLink as Link } from "@/components/navigation/AppLink";
import { usePathname } from "next/navigation";
import { resolveSiteHref } from "@/lib/utils/country-path";
import { usePreferredCountryHub } from "@/hooks/usePreferredCountryHub";

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
  // Re-render with the session hub after hydration (null in server HTML).
  usePreferredCountryHub();
  const resolvedHref = resolveSiteHref(href, pathname);

  return (
    <Link href={resolvedHref} className={className} prefetch={prefetch}>
      {children}
    </Link>
  );
}
