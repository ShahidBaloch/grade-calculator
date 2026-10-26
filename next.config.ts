import type { NextConfig } from "next";
import { seoRedirects } from "./src/lib/seo/intent-urls";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    // Inline the (small, ~36 KB) Tailwind CSS so first paint does not wait on a separate request.
    inlineCss: true,
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-accordion",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-label",
      "@radix-ui/react-select",
      "@radix-ui/react-separator",
      "@radix-ui/react-slot",
      "@radix-ui/react-tabs",
    ],
  },
  async headers() {
    const cacheableMeta =
      "public, max-age=86400, stale-while-revalidate=604800";
    /** CDN caches HTML; browsers revalidate (SEO-safe stale-while-revalidate at edge). */
    const cdnHtmlCache =
      "public, max-age=0, must-revalidate, s-maxage=86400, stale-while-revalidate=604800";

    const securityHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
      },
    ];

    return [
      {
        source: "/api/:path*",
        headers: [...securityHeaders, { key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/sitemap.xml",
        headers: [{ key: "Cache-Control", value: cacheableMeta }],
      },
      {
        source: "/robots.txt",
        headers: [{ key: "Cache-Control", value: cacheableMeta }],
      },
      {
        source: "/",
        headers: [...securityHeaders, { key: "Cache-Control", value: cdnHtmlCache }],
      },
      {
        source:
          "/((?!api|_next/static|_next/image|.*\\..*).*)",
        headers: [...securityHeaders, { key: "Cache-Control", value: cdnHtmlCache }],
      },
      {
        source: "/:path*\\.(svg|jpg|jpeg|png|gif|webp|ico|woff2)",
        headers: [
          ...securityHeaders,
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return seoRedirects().map((redirect) => ({
      source: redirect.source,
      destination: redirect.destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
