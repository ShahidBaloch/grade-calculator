const DEFAULT_SITE_URL = "https://www.gradcalc.com";

function resolveSiteOrigin(): string {
  const fromPublic = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const candidates = [fromPublic, DEFAULT_SITE_URL];

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

function resolveContactEmail(): string {
  const fromEnv = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
  if (fromEnv) return fromEnv;
  return "hello@gradcalc.com";
}

export const siteConfig = {
  name: "GradeCalculator",
  description:
    "Free grade calculators for students and teachers. EZ grader, weighted grades, finals, and GPA. Grading scale follows your location.",
  /** Canonical site origin — the homepage. Override with NEXT_PUBLIC_SITE_URL. */
  url: resolveSiteOrigin(),
  email: resolveContactEmail(),
  ogImage: "/opengraph-image",
  locale: "en_US",
};

export function absoluteUrl(path: string): string {
  if (!path || path === "/") return siteConfig.url;
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
