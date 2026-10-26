"use client";

import { Fragment, lazy, Suspense, useState } from "react";
import { AppLink as Link } from "@/components/navigation/AppLink";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import type { NavItem } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { isNavItemActive } from "@/lib/utils/country-nav";
import { cn } from "@/lib/utils";
import { CalculatorsMenuButton, CountryMenuButton } from "./CountryMenuButton";
import { LogoMark } from "./LogoMark";
import { ThemeToggle } from "./ThemeToggle";
import { usePreferredCountryHub } from "@/hooks/usePreferredCountryHub";

const loadMenus = () => import("./HeaderMenus");
const DesktopNavMenu = lazy(() => loadMenus().then((m) => ({ default: m.DesktopNavMenu })));
const MobileNavSheet = lazy(() => loadMenus().then((m) => ({ default: m.MobileNavSheet })));

const MOBILE_MENU = "__mobile__";

/** `nav` comes from the server layout so the nav catalog is not bundled into client JS. */
export function Header({ nav }: { nav: NavItem[] }) {
  const pathname = usePathname();
  // Re-render with the session hub after hydration (null in server HTML).
  usePreferredCountryHub();
  // Dropdown chunks load only when opened — keeps initial JS off the critical path (Lighthouse TBT).
  const [menusReady, setMenusReady] = useState(false);
  const [openOnLoad, setOpenOnLoad] = useState<string | null>(null);

  const openNow = (menu: string) => {
    setOpenOnLoad(menu);
    setMenusReady(true);
  };

  const mobileTrigger = (
    <Button
      variant="ghost"
      size="icon"
      className="md:hidden"
      aria-label="Open menu"
      aria-haspopup="dialog"
      onClick={() => openNow(MOBILE_MENU)}
    >
      <Menu className="h-5 w-5" />
    </Button>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)] md:bg-[var(--color-bg)]/95 md:backdrop-blur md:supports-[backdrop-filter]:bg-[var(--color-bg)]/80">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 md:h-16">
        <Link href="/" className="flex items-center gap-2 text-[var(--color-text)]">
          <LogoMark className="h-8 w-8 shrink-0" />
          <span className="flex flex-col leading-tight sm:flex-row sm:items-baseline sm:gap-2">
            <span className="text-lg font-bold">{siteConfig.name}</span>
            <span className="text-xs font-normal text-[var(--color-text-muted)]">{siteConfig.domainLabel}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex" aria-label="Main">
          {nav.map((item) => {
            if (!item.children) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : isNavItemActive(item, pathname) ? "true" : undefined}
                  className={cn(
                    "inline-flex h-11 items-center rounded-none px-3 text-sm font-medium hover:text-[var(--color-primary)]",
                    isNavItemActive(item, pathname) && "nav-active",
                  )}
                >
                  {item.label}
                </Link>
              );
            }
            const openMenu = () => openNow(item.label);
            const trigger =
              item.variant === "countries" ? (
                <CountryMenuButton
                  item={item}
                  pathname={pathname}
                  onClick={openMenu}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                      event.preventDefault();
                      openMenu();
                    }
                  }}
                />
              ) : (
                <CalculatorsMenuButton item={item} pathname={pathname} onClick={openMenu} />
              );
            return menusReady ? (
              <Suspense key={item.label} fallback={trigger}>
                <DesktopNavMenu item={item} pathname={pathname} defaultOpen={openOnLoad === item.label} />
              </Suspense>
            ) : (
              <Fragment key={item.label}>{trigger}</Fragment>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {menusReady ? (
            <Suspense fallback={mobileTrigger}>
              <MobileNavSheet nav={nav} pathname={pathname} defaultOpen={openOnLoad === MOBILE_MENU} />
            </Suspense>
          ) : (
            mobileTrigger
          )}
        </div>
      </div>
    </header>
  );
}
