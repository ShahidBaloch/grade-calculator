"use client";

import { CountryAwareLink } from "@/components/navigation/CountryAwareLink";
import {
  COMPACT_INTENT_HREFS,
  USER_INTENT_GROUPS,
  isIntentActive,
  type UserIntentItem,
} from "@/config/user-intents";
import { usePathname } from "next/navigation";

function findCompactItems(): UserIntentItem[] {
  const byHref = new Map<string, UserIntentItem>();
  for (const group of USER_INTENT_GROUPS) {
    for (const item of group.items) {
      byHref.set(item.href, item);
    }
  }
  byHref.set("/calculators", {
    href: "/calculators",
    label: "All tools",
    shortLabel: "All",
    description: "Full calculator list",
  });
  return COMPACT_INTENT_HREFS.map((href) => byHref.get(href)!);
}

interface UserIntentNavProps {
  variant?: "full" | "compact";
  /** Highlight the current destination (pathname or canonical href). */
  activeHref?: string;
  className?: string;
}

export function UserIntentNav({ variant = "full", activeHref, className = "" }: UserIntentNavProps) {
  const pathname = usePathname();
  const current = (activeHref ?? pathname).replace(/\/$/, "") || "/";

  if (variant === "compact") {
    const items = findCompactItems();
    return (
      <nav
        aria-label="Switch calculator"
        className={`no-print flex gap-2 overflow-x-auto pb-1 ${className}`.trim()}
      >
        {items.map((item) => {
          const active = isIntentActive(current, item);
          return (
            <CountryAwareLink
              key={item.href}
              href={item.href}
              className={`shrink-0 rounded-full border px-3 py-1.5 text-sm font-medium ${
                active
                  ? "border-[var(--color-primary)] bg-[var(--color-primary-subtle)] text-[var(--color-text)]"
                  : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:bg-[var(--color-bg-subtle)]"
              }`}
              aria-current={active ? "page" : undefined}
            >
              {item.shortLabel ?? item.label}
            </CountryAwareLink>
          );
        })}
      </nav>
    );
  }

  return (
    <nav aria-label="What do you want to calculate?" className={`no-print space-y-6 ${className}`.trim()}>
      {USER_INTENT_GROUPS.map((group) => (
        <div key={group.title} className="space-y-2">
          <p className="text-sm font-semibold text-[var(--color-text)]">{group.title}</p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {group.items.map((item) => {
              const active = isIntentActive(current, item);
              return (
                <li key={item.href}>
                  <CountryAwareLink
                    href={item.href}
                    className={`flex min-h-11 flex-col justify-center rounded-md border px-3 py-2 text-sm ${
                      active
                        ? "border-[var(--color-primary)] bg-[var(--color-primary-subtle)]"
                        : "border-[var(--color-border)] hover:bg-[var(--color-bg-subtle)]"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    <span className="font-medium">{item.label}</span>
                    <span className="text-xs text-[var(--color-text-muted)]">{item.description}</span>
                  </CountryAwareLink>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
