import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/*out-of-*",
        "/*as-a-percent*",
        "/3/4*",
      ],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
