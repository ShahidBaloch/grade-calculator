/**
 * Paths that should not be crawled (non-page endpoints only). The favicon (/icon.svg)
 * stays crawlable: Google needs it for the site icon in search results.
 * Legacy junk URL patterns (e.g. /3/4-as-a-percent) are NOT listed here: middleware
 * answers them with 404 + noindex, and Google must be able to crawl them to see that.
 */
export const robotsDisallowPaths = [
  "/api/",
] as const;

/** SEO tools and aggressive scrapers — full site disallow (honor-based). */
export const blockedCrawlerUserAgents = [
  "AhrefsBot",
  "AhrefsSiteAudit",
  "SemrushBot",
  "SemrushBot-BA",
  "SemrushBot-SI",
  "MJ12bot",
  "DotBot",
  "BLEXBot",
  "DataForSeoBot",
  "MegaIndex",
  "rogerbot",
  "SiteAuditBot",
  "serpstatbot",
  "Screaming Frog SEO Spider",
  "PetalBot",
  "Bytespider",
  "MauiBot",
  "Ezooms",
  "LinkdexBot",
  "GPTBot",
  "ChatGPT-User",
  "CCBot",
  "anthropic-ai",
  "ClaudeBot",
] as const;

/** Google Search, previews, and AdSense verification — no crawl delay. */
export const googleSearchUserAgents = [
  "Googlebot",
  "Googlebot-Image",
  "Googlebot-Video",
  "Google-InspectionTool",
  "Storebot-Google",
  "AdsBot-Google",
  "AdsBot-Google-Mobile",
  "Mediapartners-Google",
] as const;

/** Bing / Microsoft search — no crawl delay. */
export const bingSearchUserAgents = ["Bingbot", "msnbot", "BingPreview"] as const;

/** Yandex search — no crawl delay (Yandex also honors Crawl-delay on other agents). */
export const yandexSearchUserAgents = ["YandexBot", "YandexImages", "YandexMobileBot"] as const;

/** Other major search crawlers — full allow, no delay. */
export const otherSearchUserAgents = ["Applebot", "DuckDuckBot", "Slurp"] as const;

/** @deprecated Use split lists above; kept for tests that expect one combined allow-list. */
export const preferredSearchUserAgents = [
  ...googleSearchUserAgents,
  ...bingSearchUserAgents,
  ...yandexSearchUserAgents,
  ...otherSearchUserAgents,
] as const;
