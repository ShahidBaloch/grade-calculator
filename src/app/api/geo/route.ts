import { getAutoScaleIdFromGeoCountry } from "@/lib/grading-scales/geo-scale";

export const runtime = "edge";

/**
 * Country + default grading scale from Vercel's IP geo header.
 * Called by the browser at most once per 30 days (see lib/utils/geo-client.ts),
 * so static pages never need a per-request function.
 */
export function GET(request: Request) {
  const raw =
    request.headers.get("x-vercel-ip-country") ?? request.headers.get("cf-ipcountry") ?? null;
  const country = raw && raw !== "XX" ? raw.toUpperCase() : null;
  const scale = getAutoScaleIdFromGeoCountry(country);

  return Response.json(
    { country: scale ? country : null, scale },
    { headers: { "Cache-Control": "private, max-age=86400" } },
  );
}
