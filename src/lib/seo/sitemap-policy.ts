/**
 * Sitemap lists primary indexable pages only.
 *
 * Bulk “X out of Y” score URLs and per-total grade-chart URLs stay live (internal links)
 * but are omitted so Search Console “Discovered pages” matches core URLs, not 300+ variants.
 *
 * GSC / clicks: omitting a URL from the sitemap does **not** noindex it and does **not** remove
 * pages that already earn impressions — Google can still crawl them via internal links. Do not
 * add noindex or middleware 404 to those paths to “clean up” Performance reports; that can drop
 * clicks. When consolidating duplicates, keep a **permanent redirect** from the old URL and leave
 * the new canonical in the sitemap (see tests/seo/gsc-indexing-safety.test.ts).
 */
export function isBulkProgrammaticSitemapPath(pathname: string): boolean {
  const path = pathname.split("?")[0]?.replace(/\/$/, "") || "/";
  if (/^\/score\/[^/]+$/.test(path)) return true;
  if (/^\/grade-chart\/\d+-questions$/.test(path)) return true;
  return false;
}

/** Paths always included when they are not redirect-only (hubs + core site). */
export const SITEMAP_SCORE_HUB = "/score";
