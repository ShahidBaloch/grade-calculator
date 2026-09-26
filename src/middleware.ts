import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getAutoScaleIdFromGeoCountry } from "@/lib/grading-scales/geo-scale";

const GEO_SCALE_COOKIE = "gc-geo-scale";
const GEO_COUNTRY_COOKIE = "gc-geo-country";

function readGeoCountry(request: NextRequest): string | null {
  return (
    request.headers.get("x-vercel-ip-country") ??
    request.headers.get("cf-ipcountry") ??
    null
  );
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const isoCountry = readGeoCountry(request);

  if (!isoCountry || isoCountry === "XX") {
    return response;
  }

  const scaleId = getAutoScaleIdFromGeoCountry(isoCountry);
  if (!scaleId) {
    return response;
  }

  response.cookies.set(GEO_SCALE_COOKIE, scaleId, {
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  response.cookies.set(GEO_COUNTRY_COOKIE, isoCountry.toUpperCase(), {
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
