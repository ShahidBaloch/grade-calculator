import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { googleSearchUserAgents, robotsDisallowPaths } from "@/lib/seo/robots-policy";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: [...googleSearchUserAgents],
        allow: "/",
        disallow: [...robotsDisallowPaths],
      },
      {
        userAgent: "*",
        disallow: "/",
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: new URL(siteConfig.url).host,
  };
}
