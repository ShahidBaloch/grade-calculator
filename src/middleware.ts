import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { isLowValueProgrammaticPath } from "@/lib/seo/programmatic-pages";

/**
 * Canonical host is www (see site.ts). Apex → www matches Vercel when www is primary.
 * Do not also redirect www → apex in Vercel Domains — that causes a redirect loop.
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.replace(/:\d+$/, "").toLowerCase();
  if (host === "gradcalc.com") {
    const url = request.nextUrl.clone();
    url.hostname = "www.gradcalc.com";
    url.protocol = "https:";
    url.port = "";
    return NextResponse.redirect(url, 308);
  }

  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  if (isLowValueProgrammaticPath(pathname)) {
    return new NextResponse("Not Found", {
      status: 404,
      headers: {
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  }

  const response = NextResponse.next();
  response.headers.set("x-pathname", pathname);
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots\\.txt|sitemap\\.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|webmanifest)$).*)",
  ],
};
