/** Renders a Next `Metadata` object as the same <head> tags Next emitted (order included). */
type Meta = Record<string, any>;

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function absolute(url: string, base: URL | undefined): string {
  if (/^https?:\/\//.test(url) || !base) return url;
  return new URL(url, base).toString();
}

function robotsContent(robots: Meta): string {
  const parts: string[] = [];
  if (robots.index !== undefined) parts.push(robots.index ? "index" : "noindex");
  if (robots.follow !== undefined) parts.push(robots.follow ? "follow" : "nofollow");
  for (const key of ["max-video-preview", "max-image-preview", "max-snippet"]) {
    if (robots[key] !== undefined) parts.push(`${key}:${robots[key]}`);
  }
  return parts.join(", ");
}

function resolveTitle(title: unknown): string | undefined {
  if (typeof title === "string") return title;
  if (title && typeof title === "object") {
    const t = title as Meta;
    return t.absolute ?? t.default;
  }
  return undefined;
}

export function mergeMetadata(layout: Meta, page: Meta | undefined): Meta {
  return { ...layout, ...(page ?? {}) };
}

export function headTags(meta: Meta): string {
  const base: URL | undefined = meta.metadataBase;
  const tags: string[] = [];
  const title = resolveTitle(meta.title);
  if (title) tags.push(`<title>${esc(title)}</title>`);
  if (meta.description) tags.push(`<meta name="description" content="${esc(meta.description)}">`);
  const keywords = Array.isArray(meta.keywords) ? meta.keywords.join(",") : meta.keywords;
  if (keywords) tags.push(`<meta name="keywords" content="${esc(keywords)}">`);
  if (meta.robots) {
    tags.push(`<meta name="robots" content="${esc(robotsContent(meta.robots))}">`);
    if (meta.robots.googleBot) {
      tags.push(`<meta name="googlebot" content="${esc(robotsContent(meta.robots.googleBot))}">`);
    }
  }
  const alternates = meta.alternates ?? {};
  if (alternates.canonical) {
    tags.push(`<link rel="canonical" href="${esc(absolute(alternates.canonical, base))}">`);
  }
  for (const [lang, href] of Object.entries(alternates.languages ?? {})) {
    tags.push(`<link rel="alternate" hreflang="${esc(lang)}" href="${esc(absolute(String(href), base))}">`);
  }
  const og = meta.openGraph;
  if (og) {
    if (og.title) tags.push(`<meta property="og:title" content="${esc(og.title)}">`);
    if (og.description) tags.push(`<meta property="og:description" content="${esc(og.description)}">`);
    if (og.url) tags.push(`<meta property="og:url" content="${esc(absolute(og.url, base))}">`);
    if (og.siteName) tags.push(`<meta property="og:site_name" content="${esc(og.siteName)}">`);
    if (og.locale) tags.push(`<meta property="og:locale" content="${esc(og.locale)}">`);
    for (const image of og.images ?? []) {
      const url = typeof image === "string" ? image : image.url;
      tags.push(`<meta property="og:image" content="${esc(absolute(url, base))}">`);
    }
    if (og.type) tags.push(`<meta property="og:type" content="${esc(og.type)}">`);
  }
  const tw = meta.twitter;
  if (tw) {
    if (tw.card) tags.push(`<meta name="twitter:card" content="${esc(tw.card)}">`);
    if (tw.title) tags.push(`<meta name="twitter:title" content="${esc(tw.title)}">`);
    if (tw.description) tags.push(`<meta name="twitter:description" content="${esc(tw.description)}">`);
    for (const image of tw.images ?? []) {
      const url = typeof image === "string" ? image : image.url;
      tags.push(`<meta name="twitter:image" content="${esc(absolute(url, base))}">`);
    }
  }
  return tags.join("");
}
