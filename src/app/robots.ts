import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import {
  blockedCrawlerUserAgents,
  bingSearchUserAgents,
  googleSearchUserAgents,
  openAiCrawlerUserAgents,
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
      searchCrawlerRule(openAiCrawlerUserAgents),
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
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: new URL(siteConfig.url).host,
  };
}
