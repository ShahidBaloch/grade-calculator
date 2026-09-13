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
      {
        source: "/ez-grader",
        destination: "/",
        permanent: true,
      },
      {
        source: "/easy-grader",
        destination: "/",
        permanent: true,
      },
      {
        source: "/average-grade-calculator",
        destination: "/weighted-grade-calculator",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
