import { siteConfig } from "@/config/site";

/** Lightweight uptime probe — no auth secrets. Safe for monitors; not a sitemap substitute. */
export function GET() {
  return Response.json(
    {
      ok: true,
      service: siteConfig.name,
      url: siteConfig.url,
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
