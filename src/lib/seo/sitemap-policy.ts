/**
 * Sitemap lists primary indexable pages only.
 * Bulk “X out of Y” score URLs and per-total grade-chart URLs stay live (internal links)
 * but are omitted so Search Console “Discovered pages” matches core URLs, not 300+ variants.
 */
export function isBulkProgrammaticSitemapPath(pathname: string): boolean {
  const path = pathname.split("?")[0]?.replace(/\/$/, "") || "/";
  if (/^\/score\/[^/]+$/.test(path)) return true;
  if (/^\/grade-chart\/\d+-questions$/.test(path)) return true;
  return false;
}

/** Paths always included when they are not redirect-only (hubs + core site). */
export const SITEMAP_SCORE_HUB = "/score";
