import type { NextConfig } from "next";
import { seoRedirects } from "./src/lib/seo/intent-urls";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return seoRedirects().map((redirect) => ({
      source: redirect.source,
      destination: redirect.destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
