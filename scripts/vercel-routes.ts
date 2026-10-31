/**
 * Post-build step (npm run build): writes the site redirects and cache/security headers into
 * .vercel/output/config.json, after the Astro Vercel adapter has written it.
 *
 * This replaces Next middleware (which ran on every request) and next.config headers with
 * static CDN routing rules, so no function is invoked for a page view.
 */
import { cpSync, existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";

const ROUTES_FILE = "gc-vercel-routes.json";

import { securityHeaders } from "../src/config/security-headers.ts";

/**
 * HTML: browsers may reuse a page for 10 minutes (back/forward and repeat visits cost no request);
 * the CDN keeps it for a day and serves stale while it refreshes. Deploys purge the CDN.
 */
const htmlCache = "public, max-age=600, s-maxage=86400, stale-while-revalidate=604800";
const immutable = "public, max-age=31536000, immutable";
const metaFileCache = "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400";

function escapeRegex(path: string) {
  return path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const OUTPUT = ".vercel/output";

function main() {
        const staticDir = `${OUTPUT}/static`;
        const routesFile = `${staticDir}/${ROUTES_FILE}`;
        const configFile = `${OUTPUT}/config.json`;
        if (!existsSync(routesFile) || !existsSync(configFile)) {
          throw new Error(`gc-vercel-routes: missing ${existsSync(routesFile) ? configFile : routesFile}`);
        }
        const { redirects } = JSON.parse(readFileSync(routesFile, "utf8")) as {
          redirects: Array<{ source: string; destination: string }>;
        };
        rmSync(routesFile);
        rmSync(`${routesFile}.html`, { force: true });

        const config = JSON.parse(readFileSync(configFile, "utf8"));
        const ours = [
          // Canonical host is www (apex → www, as the old middleware did).
          {
            src: "^/(.*)$",
            has: [{ type: "host", value: "gradcalc.com" }],
            status: 308,
            headers: { Location: "https://www.gradcalc.com/$1" },
          },
          ...redirects.map(({ source, destination }) => ({
            src: `^${escapeRegex(source)}/?$`,
            status: 308,
            headers: { Location: destination },
          })),
          { src: "^/(.*)$", headers: securityHeaders, continue: true },
          {
            src: "^/api/(.*)$",
            headers: { "X-Robots-Tag": "noindex, nofollow" },
            continue: true,
          },
          { src: "^/(?!api/|_astro/)[^.]*$", headers: { "Cache-Control": htmlCache }, continue: true },
          {
            src: "^/opengraph-image$",
            headers: { "Content-Type": "image/png", "Cache-Control": immutable },
            continue: true,
          },
          {
            src: "^/.*\\.(svg|jpg|jpeg|png|gif|webp|ico|woff2)$",
            headers: { "Cache-Control": immutable },
            continue: true,
          },
          { src: "^/(robots\\.txt|sitemap\\.xml)$", headers: { "Cache-Control": metaFileCache }, continue: true },
        ];
        config.routes = [...ours, ...(config.routes ?? [])];
        writeFileSync(configFile, JSON.stringify(config, null, 2));
        console.log(`wrote ${redirects.length} redirects and cache headers to ${configFile}`);

        writeCloudflareAssets(staticDir, redirects);
}

const CLOUDFLARE_ASSETS = ".cloudflare/static";

function listFiles(dir: string, prefix = ""): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? listFiles(`${dir}/${entry.name}`, `${prefix}/${entry.name}`)
      : [`${prefix}/${entry.name}`],
  );
}

/**
 * The same site for Cloudflare Workers static assets (wrangler.jsonc): a copy of the static
 * output plus `_redirects` and `_headers` carrying the routes above. Apex → www is a zone
 * redirect rule on Cloudflare, and /api/* runs in worker/index.ts.
 */
function writeCloudflareAssets(staticDir: string, redirects: Array<{ source: string; destination: string }>) {
  rmSync(CLOUDFLARE_ASSETS, { recursive: true, force: true });
  cpSync(staticDir, CLOUDFLARE_ASSETS, { recursive: true });
  const files = listFiles(CLOUDFLARE_ASSETS);
  const pages = files
    .filter((file) => file.endsWith(".html") && file !== "/404.html" && file !== "/index.html")
    .map((file) => file.replace(/(\/index)?\.html$/, ""));

  const redirectLines = [
    ...redirects.flatMap(({ source, destination }) => [
      `${source} ${destination} 308`,
      `${source}/ ${destination} 308`,
    ]),
    // trailingSlash: "never" (Vercel's generic /x/ → /x rule).
    ...pages.map((page) => `${page}/ ${page} 308`),
  ];
  writeFileSync(`${CLOUDFLARE_ASSETS}/_redirects`, `${redirectLines.join("\n")}\n`);

  const block = (path: string, headers: Record<string, string>, replace: string[] = []) =>
    [path, ...replace.map((name) => `  ! ${name}`), ...Object.entries(headers).map(([k, v]) => `  ${k}: ${v}`)].join(
      "\n",
    );
  const nonHtml = files.filter((file) => !file.endsWith(".html") && !file.startsWith("/_astro/"));
  const headerBlocks = [
    // The workers.dev test address must never compete with www.gradcalc.com in search.
    block("https://gradcalc.:account.workers.dev/*", { "X-Robots-Tag": "noindex, nofollow" }),
    // Pages get the HTML cache; other files below replace it.
    block("/*", { ...securityHeaders, "Cache-Control": htmlCache }),
    block("/_astro/*", { "Cache-Control": immutable }, ["Cache-Control"]),
    block("/opengraph-image", { "Content-Type": "image/png", "Cache-Control": immutable }, [
      "Content-Type",
      "Cache-Control",
    ]),
    ...nonHtml
      .filter((file) => file !== "/opengraph-image")
      .map((file) => {
        if (/\.(svg|jpg|jpeg|png|gif|webp|ico|woff2)$/.test(file)) {
          return block(file, { "Cache-Control": immutable }, ["Cache-Control"]);
        }
        if (/^\/(robots\.txt|sitemap\.xml)$/.test(file)) {
          return block(file, { "Cache-Control": metaFileCache }, ["Cache-Control"]);
        }
        // Like Vercel's default for other files (e.g. ads.txt).
        return block(file, { "Cache-Control": "public, max-age=0, must-revalidate" }, ["Cache-Control"]);
      }),
  ];
  writeFileSync(`${CLOUDFLARE_ASSETS}/_headers`, `${headerBlocks.join("\n")}\n`);
  console.log(
    `wrote ${CLOUDFLARE_ASSETS} (${files.length} files, ${redirectLines.length} redirects, ${headerBlocks.length} header rules)`,
  );
}

main();
