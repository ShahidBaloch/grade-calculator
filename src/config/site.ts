function homepageUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ezgradecalc.com";
  return raw.replace(/\/+$/, "");
}

export const siteConfig = {
  name: "GradeCalculator",
  description:
    "Free online grade calculators for students and teachers. EZ grader, weighted grades, final exam, and GPA tools.",
  /** Canonical site origin — the homepage. Override with NEXT_PUBLIC_SITE_URL. */
  url: homepageUrl(),
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@ezgradecalc.com",
  ogImage: "/opengraph-image",
  locale: "en_US",
};

export function absoluteUrl(path: string): string {
  if (!path || path === "/") return siteConfig.url;
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
