const DEFAULT_SITE_URL = "https://www.gradcalc.com";

/** Production host is www; apex env values must not leak into canonicals or sitemap. */
function normalizeSiteOrigin(origin: string): string {
  const url = new URL(origin);
  if (url.hostname === "gradcalc.com") {
    url.hostname = "www.gradcalc.com";
  }
  return url.origin;
}

function resolveSiteOrigin(): string {
  const fromPublic = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const candidates = [fromPublic, DEFAULT_SITE_URL];

  for (const candidate of candidates) {
    if (!candidate) continue;
    const withProtocol = /^https?:\/\//i.test(candidate) ? candidate : `https://${candidate}`;
    try {
      return normalizeSiteOrigin(new URL(withProtocol).origin);
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

/** Other names users search for — used in WebSite/Organization schema only. */
export const siteAlternateNames = ["gradcalc.com", "Grad Calc"];

export const siteConfig = {
  name: "GradCalc",
  /** Matches the public domain — shown in header for brand clarity. */
  domainLabel: "gradcalc.com",
  description:
    "Free grade calculators for students and teachers. EZ grader, weighted grades, finals, and GPA. Grading scale follows your location.",
  /** Canonical site origin — the homepage. Override with NEXT_PUBLIC_SITE_URL. */
  url: resolveSiteOrigin(),
  email: resolveContactEmail(),
  ogImage: "/opengraph-image",
  locale: "en_US",
  editorial: {
    author: "GradCalc Editorial Team",
    /** ISO date — update when formulas, sources, or legal copy are reviewed. */
    lastReviewed: "2026-09-01",
  },
};

export function absoluteUrl(path: string): string {
  if (!path || path === "/") return siteConfig.url;
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
