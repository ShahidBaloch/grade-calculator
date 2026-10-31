/**
 * Local production server for the built site (`npm run start`, used by Playwright and Lighthouse).
 * Serves .vercel/output/static the way Vercel does: clean URLs, the routes in config.json
 * (redirects and headers), gzip, and the 404 page. /api/* functions are not run here; /api/geo
 * answers "no geo" so pages keep their default scale.
 */
import { existsSync, readFileSync, statSync } from "node:fs";
import http from "node:http";
import path from "node:path";
import zlib from "node:zlib";

const OUTPUT = ".vercel/output";
const STATIC = path.resolve(OUTPUT, "static");
const PORT = Number(process.env.PORT ?? 3000);

if (!existsSync(`${OUTPUT}/config.json`)) {
  console.error("No build found. Run `npm run build` first.");
  process.exit(1);
}

const routes = JSON.parse(readFileSync(`${OUTPUT}/config.json`, "utf8")).routes ?? [];
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".json": "application/json",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
};

function findFile(pathname) {
  const base = path.join(STATIC, decodeURIComponent(pathname));
  if (!base.startsWith(STATIC)) return null;
  for (const candidate of [base, `${base}.html`, path.join(base, "index.html")]) {
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  }
  return null;
}

http
  .createServer((req, res) => {
    const url = new URL(req.url ?? "/", "http://localhost");
    const headers = {};
    for (const route of routes) {
      if (route.handle) break;
      if (route.has) continue; // host-based rules (apex → www) do not apply locally
      const match = new RegExp(route.src).exec(url.pathname);
      if (!match) continue;
      const routeHeaders = Object.fromEntries(
        Object.entries(route.headers ?? {}).map(([key, value]) => [
          key.toLowerCase(),
          String(value).replace(/\$(\d+)/g, (_, i) => match[Number(i)] ?? ""),
        ]),
      );
      Object.assign(headers, routeHeaders);
      if (route.status && routeHeaders.location) {
        res.writeHead(route.status, headers);
        return res.end();
      }
    }

    if (url.pathname === "/api/geo") {
      res.writeHead(200, { "content-type": "application/json" });
      return res.end(JSON.stringify({ country: null, scale: null }));
    }

    let file = findFile(url.pathname);
    let status = 200;
    if (!file) {
      file = path.join(STATIC, "404.html");
      status = 404;
    }
    const type = TYPES[path.extname(file)] ?? (url.pathname === "/opengraph-image" ? "image/png" : "application/octet-stream");
    const body = readFileSync(file);
    const gzip = /\bgzip\b/.test(req.headers["accept-encoding"] ?? "");
    res.writeHead(status, {
      "content-type": type,
      ...headers,
      ...(gzip ? { "content-encoding": "gzip" } : {}),
    });
    res.end(gzip ? zlib.gzipSync(body) : body);
  })
  .listen(PORT, () => console.log(`Ready on http://localhost:${PORT}`));
