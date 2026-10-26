import { beforeEach, describe, expect, it, vi } from "vitest";
import sitemap from "@/app/sitemap";
import { countryHubs } from "@/config/country-hubs";
import { mainCountryPath } from "@/config/country-hub-routes";
import { footerNav, mainNav } from "@/config/navigation";
import { seoRedirects } from "@/lib/seo/intent-urls";
import {
  calculatorNavTriggerLabel,
  isMenuCountrySelected,
  isNavLinkCurrent,
  navChildrenFor,
} from "@/lib/utils/country-nav";
import { navigationCountryHub, resolveSiteHref } from "@/lib/utils/country-path";
import { enablePreferredCountryHub, setPreferredCountryHub } from "@/lib/utils/preferred-country-hub";

/**
 * Every sitemap page × every session hub (none, or a non-US hub visited earlier).
 * Each header/footer link must open a real page, and the Countries label must match its tick.
 */
const pages = new Set(sitemap().map((entry) => new URL(entry.url).pathname));
const redirectSources = new Set(seoRedirects().map((r) => r.source));
const sessions: Array<string | null> = [null, ...countryHubs.map((h) => h.path).filter((p) => p !== mainCountryPath)];
const calculatorsNav = mainNav.find((item) => item.href === "/calculators")!;
const countriesNav = mainNav.find((item) => item.variant === "countries")!;

function opensRealPage(href: string): boolean {
  return pages.has(href) && !redirectSources.has(href);
}

describe("navbar matrix (all pages × session hubs)", () => {
  beforeEach(() => {
    const store = new Map<string, string>();
    vi.stubGlobal("sessionStorage", {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => {
        store.set(key, value);
      },
      removeItem: (key: string) => {
        store.delete(key);
      },
    });
    enablePreferredCountryHub();
  });

  function eachCombination(check: (path: string, session: string | null) => string | null) {
    const problems: string[] = [];
    for (const session of sessions) {
      for (const path of pages) {
        setPreferredCountryHub(session);
        const problem = check(path, session);
        if (problem) problems.push(`${path} [session ${session ?? "none"}]: ${problem}`);
      }
    }
    return problems;
  }

  it("Countries label and tick always name the same country", () => {
    const problems = eachCombination((path) => {
      const ticked = (countriesNav.children ?? []).filter((c) => isMenuCountrySelected(c.href, path));
      const hub = navigationCountryHub(path);
      const labelHub = hub && hub !== mainCountryPath ? hub : mainCountryPath;
      if (ticked.length !== 1) return `${ticked.length} countries ticked`;
      return ticked[0].href === labelHub ? null : `label ${labelHub}, tick ${ticked[0].href}`;
    });
    expect(problems).toEqual([]);
  });

  it("Calculators menu links open real pages, once each, with no US label on country hubs", () => {
    const problems = eachCombination((path) => {
      const children = navChildrenFor(calculatorsNav, path) ?? [];
      const hrefs = children.map((c) => c.href);
      const broken = hrefs.filter((href) => !opensRealPage(href));
      if (broken.length) return `broken/redirecting links ${broken.join(", ")}`;
      if (new Set(hrefs).size !== hrefs.length) return "duplicate links";
      const hub = navigationCountryHub(path);
      if (hub && hub !== mainCountryPath) {
        const us = children.filter((c) => c.label.startsWith("US "));
        if (us.length) return `US label on ${hub}: ${us.map((c) => c.label).join(", ")}`;
      }
      return null;
    });
    expect(problems).toEqual([]);
  });

  it("Calculators trigger names the open tool and at most one row is current", () => {
    const problems = eachCombination((path) => {
      const children = (navChildrenFor(calculatorsNav, path) ?? []).filter((c) => !c.label.startsWith("All "));
      const current = children.filter((c) => isNavLinkCurrent(c.href, path));
      if (current.length > 1) return `${current.length} rows current: ${current.map((c) => c.href).join(", ")}`;
      if (current.length === 1 && calculatorNavTriggerLabel(calculatorsNav, path) !== current[0].label) {
        return `trigger "${calculatorNavTriggerLabel(calculatorsNav, path)}" vs row "${current[0].label}"`;
      }
      return null;
    });
    expect(problems).toEqual([]);
  });

  it("footer calculator links resolve to real pages from any context", () => {
    const problems = eachCombination((path) => {
      const broken = footerNav.calculators
        .map((link) => resolveSiteHref(link.href, path))
        .filter((href) => !opensRealPage(href));
      return broken.length ? `footer → ${broken.join(", ")}` : null;
    });
    expect(problems).toEqual([]);
  });
});
