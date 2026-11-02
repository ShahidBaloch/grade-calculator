import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import {
  aiSearchUserAgents,
  blockedCrawlerUserAgents,
  bingSearchUserAgents,
  googleSearchUserAgents,
  otherSearchUserAgents,
  robotsDisallowPaths,
  yandexSearchUserAgents,
} from "@/lib/seo/robots-policy";

export const dynamic = "force-static";

function searchCrawlerRule(userAgents: readonly string[]) {
  return {
    userAgent: [...userAgents],
    allow: "/",
    disallow: [...robotsDisallowPaths],
  };
}

export default function robots(): MetadataRoute.Robots {
  const disallow = [...robotsDisallowPaths];

  return {
    rules: [
      searchCrawlerRule(googleSearchUserAgents),
      searchCrawlerRule(bingSearchUserAgents),
      searchCrawlerRule(yandexSearchUserAgents),
      searchCrawlerRule(otherSearchUserAgents),
      searchCrawlerRule(aiSearchUserAgents),
      {
        userAgent: [...blockedCrawlerUserAgents],
        disallow: "/",
      },
      {
        userAgent: "*",
        allow: "/",
        disallow,
      },
    ],
    // No `Host:` line: it is a retired Yandex-only directive that Google reports as unknown.
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
