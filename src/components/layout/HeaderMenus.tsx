"use client";

import { AppLink as Link } from "@/components/navigation/AppLink";
import { ArrowRight, Check, Menu } from "lucide-react";
import type { NavItem } from "@/config/navigation";
import { isCountryLinkActive, isNavItemActive, isNavLinkCurrent, navChildrenFor } from "@/lib/utils/country-nav";
import { resolveSiteHref } from "@/lib/utils/country-path";
import { cn } from "@/lib/utils";
import { CalculatorsMenuButton, CountryMenuButton } from "./CountryMenuButton";
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
  if (item.variant === "countries") {
    return <CountryDesktopMenu item={item} pathname={pathname} defaultOpen={defaultOpen} />;
  }
  const children = navChildrenFor(item, pathname) ?? [];

  return (
    <DropdownMenu defaultOpen={defaultOpen}>
      <DropdownMenuTrigger asChild>
        <CalculatorsMenuButton item={item} pathname={pathname} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="max-h-[70vh] overflow-y-auto">
        {children.map((child, index) => {
          // "All …" links go to hub pages; set them apart so users see a fuller list exists.
          const isHub = child.label.startsWith("All ");
          const firstHub = isHub && !children[index - 1]?.label.startsWith("All ");
          const current = isNavLinkCurrent(child.href, pathname);
          return (
            <DropdownMenuItem
              key={child.href}
              asChild
              className={cn(
                "nav-option gap-2.5",
                isHub && "font-semibold text-[var(--color-brand-accent)]",
                firstHub && "mt-1 border-t border-[var(--color-border)] pt-2",
                current && "nav-current",
              )}
            >
              <Link href={resolveSiteHref(child.href, pathname)} aria-current={current ? "page" : undefined}>
                <span className="flex-1">{child.label}</span>
                {current ? (
                  <Check className="h-4 w-4 shrink-0" aria-hidden />
                ) : isHub ? (
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                ) : null}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function CountryDesktopMenu({
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
        <CountryMenuButton item={item} pathname={pathname} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-64 overflow-visible rounded-lg border-[var(--color-border-strong)] p-1.5 shadow-lg"
      >
        {item.children?.map((child) => {
          const selected = isCountryLinkActive(child.href, pathname);
          const currentPage = pathname === child.href;
          return (
            <DropdownMenuItem
              key={child.href}
              asChild
              className={cn(
                "nav-option w-full cursor-pointer gap-2.5 rounded-md px-2.5 transition-none",
                selected && "nav-current",
              )}
            >
              <Link
                href={resolveSiteHref(child.href, pathname)}
                aria-current={currentPage ? "page" : selected ? "true" : undefined}
              >
                <span className="flex-1">{child.label}</span>
                {selected ? (
                  <Check className="h-4 w-4 shrink-0" aria-hidden />
                ) : (
                  <span className="h-4 w-4 shrink-0" aria-hidden />
                )}
              </Link>
            </DropdownMenuItem>
          );
        })}
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
                {(navChildrenFor(item, pathname) ?? item.children).map((child) => {
                  const current = isNavLinkCurrent(child.href, pathname);
                  const selected = child.flag ? isCountryLinkActive(child.href, pathname) : current;
                  return (
                    <Link
                      key={`${child.href}-${child.label}`}
                      href={resolveSiteHref(child.href, pathname)}
                      aria-current={current ? "page" : selected ? "true" : undefined}
                      className={cn(
                        "flex min-h-11 items-center gap-2 rounded-md px-3 py-3 text-sm font-medium",
                        selected ? "nav-current" : "hover:bg-[var(--color-bg-subtle)]",
                      )}
                    >
                      <span className="flex-1">{child.label}</span>
                      {selected ? <Check className="h-4 w-4 shrink-0" aria-hidden /> : null}
                    </Link>
                  );
                })}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                aria-current={
                  pathname === item.href ? "page" : isNavItemActive(item, pathname) ? "true" : undefined
                }
                className={cn(
                  "inline-flex min-h-11 items-center rounded-md px-3 py-3 text-sm font-medium hover:bg-[var(--color-bg-subtle)]",
                  isNavItemActive(item, pathname) && "nav-active",
                )}
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
