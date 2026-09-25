const DEFAULT_SITE_URL = "https://ezgradecalc.com";

function resolveSiteOrigin(): string {
  const fromPublic = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const fromVercel = process.env.VERCEL_URL?.trim();
  const candidates = [fromPublic, fromVercel ? `https://${fromVercel}` : undefined, DEFAULT_SITE_URL];

  for (const candidate of candidates) {
    if (!candidate) continue;
    const withProtocol = /^https?:\/\//i.test(candidate) ? candidate : `https://${candidate}`;
    try {
      return new URL(withProtocol).origin;
    } catch {
      // try next candidate
    }
  }

  return DEFAULT_SITE_URL;
}

export const siteConfig = {
  name: "GradeCalculator",
  description:
    "Free online grade calculators for students and teachers. EZ grader, weighted grades, final exam, and GPA tools.",
  /** Canonical site origin — the homepage. Override with NEXT_PUBLIC_SITE_URL. */
  url: resolveSiteOrigin(),
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@ezgradecalc.com",
  ogImage: "/opengraph-image",
  locale: "en_US",
};

export function absoluteUrl(path: string): string {
  if (!path || path === "/") return siteConfig.url;
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
