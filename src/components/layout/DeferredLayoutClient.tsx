"use client";

import dynamic from "next/dynamic";

/** Mobile quick nav — not needed for first paint on desktop or for Lighthouse TBT. */
export const DeferredToolSwitcher = dynamic(
  () => import("@/components/engagement/ToolSwitcher").then((m) => m.ToolSwitcher),
  { ssr: false },
);

/** Session hub memory — runs after hydration only. */
export const DeferredPreferredCountryHubSync = dynamic(
  () =>
    import("@/components/layout/PreferredCountryHubSync").then((m) => m.PreferredCountryHubSync),
  { ssr: false },
);
