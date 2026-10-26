"use client";

import { Fragment, lazy, Suspense, useEffect, useState } from "react";
import { AppLink as Link } from "@/components/navigation/AppLink";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import type { NavItem } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { LogoMark } from "./LogoMark";
import { ThemeToggle } from "./ThemeToggle";

const loadMenus = () => import("./HeaderMenus");
const DesktopNavMenu = lazy(() => loadMenus().then((m) => ({ default: m.DesktopNavMenu })));
const MobileNavSheet = lazy(() => loadMenus().then((m) => ({ default: m.MobileNavSheet })));

const MOBILE_MENU = "__mobile__";

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
  cancelIdleCallback?: (id: number) => void;
};

/** `nav` comes from the server layout so the nav catalog is not bundled into client JS. */
export function Header({ nav }: { nav: NavItem[] }) {
  const pathname = usePathname();
  // Menus are closed on load, so their code waits for idle time (or the first tap).
  const [menusReady, setMenusReady] = useState(false);
  const [openOnLoad, setOpenOnLoad] = useState<string | null>(null);

  useEffect(() => {
    const w = window as IdleWindow;
    const ready = () => setMenusReady(true);
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(ready, { timeout: 3000 });
      return () => w.cancelIdleCallback?.(id);
    }
    const timer = window.setTimeout(ready, 1500);
    return () => window.clearTimeout(timer);
  }, []);

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

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
          {nav.map((item) => {
            if (!item.children) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium hover:text-[var(--color-primary)]"
                >
                  {item.label}
                </Link>
              );
            }
            const trigger = (
              <Button
                variant="ghost"
                className="px-2"
                aria-haspopup="menu"
                aria-expanded={false}
                onClick={() => openNow(item.label)}
              >
                {item.label}
              </Button>
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
