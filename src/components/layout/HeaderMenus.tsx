"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import type { NavItem } from "@/config/navigation";
import { resolveSiteHref } from "@/lib/utils/country-path";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

/** Loaded lazily by Header so the Radix menu code stays off the first-paint path. */
export function DesktopNavMenu({
  item,
  pathname,
  defaultOpen,
}: {
  item: NavItem;
  pathname: string;
  defaultOpen: boolean;
}) {
  return (
    <DropdownMenu defaultOpen={defaultOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="px-2">
          {item.label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="max-h-[70vh] overflow-y-auto">
        {item.children?.map((child) => (
          <DropdownMenuItem key={child.href} asChild>
            <Link href={resolveSiteHref(child.href, pathname)}>{child.label}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function MobileNavSheet({
  nav,
  pathname,
  defaultOpen,
}: {
  nav: NavItem[];
  pathname: string;
  defaultOpen: boolean;
}) {
  return (
    <Sheet defaultOpen={defaultOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="mt-6 flex min-h-0 flex-1 flex-col gap-4" aria-label="Mobile">
          {nav.map((item) =>
            item.children ? (
              <div key={item.label} className="flex flex-col gap-1">
                <p className="px-3 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                  {item.label}
                </p>
                {item.children.map((child) => (
                  <Link
                    key={`${child.href}-${child.label}`}
                    href={resolveSiteHref(child.href, pathname)}
                    className="rounded-md px-3 py-3 text-sm font-medium hover:bg-[var(--color-bg-subtle)]"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-3 text-sm font-medium hover:bg-[var(--color-bg-subtle)]"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
