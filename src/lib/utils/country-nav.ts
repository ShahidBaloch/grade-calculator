import { calculatorBySlug } from "@/config/calculators";
import { mainCountryPath } from "@/config/country-hub-routes";
import type { NavItem, NavLink } from "@/config/navigation";
import {
  activeCountryHub,
  getCountryPrefixFromPath,
  navigationCountryHub,
  slugFromWorldPath,
} from "@/lib/utils/country-path";

export { activeCountryHub };

/**
 * True when `href` is the country for this route.
 * A country URL wins (`/pk`, `/grading-scales/pakistan`). Worldwide pages target the US hub.
 */
export function isCountryLinkActive(href: string, pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  return (activeCountryHub(pathname) ?? mainCountryPath) === href;
}

/**
 * Header Countries menu tick. Uses the session hub too, so it matches the trigger label
 * ("Pakistan" on /calculators after visiting /pk). Client-only menus — the SSR footer keeps
 * {@link isCountryLinkActive}.
 */
export function isMenuCountrySelected(href: string, pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  return (navigationCountryHub(pathname) ?? mainCountryPath) === href;
}

/** Menu links for `item` on this route: country catalog when a hub is in context, else worldwide. */
export function navChildrenFor(item: NavItem, pathname: string | null | undefined): NavLink[] | undefined {
  const hub = navigationCountryHub(pathname);
  if (hub && hub !== mainCountryPath && item.countryChildren?.[hub]) {
    return item.countryChildren[hub];
  }
  return item.children;
}

/**
 * True when this menu row is the page being viewed.
 * Alias rows (UK GPA tools → degree class, CA GPA variants → /ca/gpa) must not all look selected.
 */
export function isNavLinkCurrent(href: string, pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  if (href === pathname) return true;

  const prefix = getCountryPrefixFromPath(pathname);
  const toolPath = prefix && pathname !== prefix ? pathname.slice(prefix.length) : pathname;
  if (toolPath === href) return true;

  // Same worldwide path on a hub URL (legacy checks without a prefix in href).
  if (prefix != null && pathname !== prefix && pathname.slice(prefix.length) === href) {
    return true;
  }

  return false;
}

/** Header label for the Calculators menu — tool name when one is open, else "Calculators". */
export function calculatorNavTriggerLabel(item: NavItem, pathname: string | null | undefined): string {
  if (!pathname || pathname === item.href) return item.label;
  const hub = activeCountryHub(pathname);
  if (hub && pathname === hub) return item.label;

  const current = (navChildrenFor(item, pathname) ?? []).find(
    (child) => !child.label.startsWith("All ") && isNavLinkCurrent(child.href, pathname),
  );
  if (current) return current.label;

  const prefix = getCountryPrefixFromPath(pathname);
  const toolPath = prefix && pathname !== prefix ? pathname.slice(prefix.length) : pathname;
  const slug = slugFromWorldPath(toolPath);
  if (slug && slug !== "ez-grader") {
    return calculatorBySlug[slug]?.name ?? item.label;
  }
  if (pathname === "/") {
    return calculatorBySlug["ez-grader"]?.name ?? item.label;
  }
  return item.label;
}

/** True when the visitor is somewhere in this top-level section (its page, a sub-page, or one of its menu links). */
export function isNavItemActive(item: NavItem, pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  if (item.variant === "countries") {
    const hub = navigationCountryHub(pathname);
    return hub != null && hub !== mainCountryPath;
  }
  if (pathname === item.href || pathname.startsWith(`${item.href}/`)) return true;
  const hub = navigationCountryHub(pathname);
  return (navChildrenFor(item, pathname) ?? []).some((child) => {
    // "All Pakistan tools" points at the hub. That page belongs to Countries, not Calculators.
    if (hub && child.href === hub && hub !== item.href) return false;
    return isNavLinkCurrent(child.href, pathname);
  });
}
