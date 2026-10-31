/**
 * Post-build step (npm run build): writes the site redirects and cache/security headers into
 * .vercel/output/config.json, after the Astro Vercel adapter has written it.
 *
 * This replaces Next middleware (which ran on every request) and next.config headers with
 * static CDN routing rules, so no function is invoked for a page view.
 */
import { existsSync, readFileSync, rmSync, writeFileSync } from "node:fs";

const ROUTES_FILE = "gc-vercel-routes.json";

const securityHeaders = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Frame-Options": "SAMEORIGIN",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

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
}

main();
