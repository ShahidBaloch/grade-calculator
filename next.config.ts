import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/letter-grade-to-percentage",
        destination: "/letter-grade-calculator",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
