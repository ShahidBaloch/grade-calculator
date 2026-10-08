/** Paths that should not be crawled (junk URL patterns + non-page endpoints). */
export const robotsDisallowPaths = [
  "/*out-of-*",
  "/*as-a-percent*",
  "/3/4*",
  "/icon",
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

/**
 * Polite throttle for unknown bots hitting User-agent: *.
 * Google and Bingbot ignore Crawl-delay; Yandex may use it for non-YandexBot agents.
 */
export const generalCrawlerCrawlDelaySeconds = 5;

/** @deprecated Use split lists above; kept for tests that expect one combined allow-list. */
export const preferredSearchUserAgents = [
  ...googleSearchUserAgents,
  ...bingSearchUserAgents,
  ...yandexSearchUserAgents,
  ...otherSearchUserAgents,
] as const;
