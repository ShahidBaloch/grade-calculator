// @ts-check
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import preact from "@astrojs/preact";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { chunkGroups } from "./integrations/chunk-groups.ts";
import { useClientIslands } from "./integrations/use-client-islands.ts";

const src = fileURLToPath(new URL("./src", import.meta.url));
// Like Next, inline NEXT_PUBLIC_* values (from the environment or .env files) at build time.
const env = { ...loadEnv(process.env.NODE_ENV ?? "production", process.cwd(), "NEXT_PUBLIC_"), ...process.env };
const publicEnv = Object.fromEntries(
  ["NEXT_PUBLIC_SITE_URL", "NEXT_PUBLIC_CONTACT_EMAIL"].map((key) => [
    `process.env.${key}`,
    JSON.stringify(env[key] ?? ""),
  ]),
);

const shim = (/** @type {string} */ file) => fileURLToPath(new URL(`./src/shims/${file}`, import.meta.url));

export default defineConfig({
  site: "https://www.gradcalc.com",
  // Every page is prerendered to plain HTML on the CDN; only /api/* runs as functions.
  output: "static",
  adapter: vercel({ webAnalytics: { enabled: false } }),
  trailingSlash: "never",
  build: {
    format: "file",
    // Inline the CSS (~8 KB gzipped): most visitors land from search and view one page, so this
    // saves a render-blocking request (faster LCP) and one CDN request per visit.
    inlineStylesheets: "always",
  },
  // Prefetching would spend CDN requests on pages the visitor never opens.
  prefetch: false,
  integrations: [preact({ compat: true })],
  vite: {
    define: publicEnv,
    plugins: [
      tailwindcss(),
      useClientIslands(src),
      {
        // React-ecosystem packages must be bundled so `react` resolves to preact/compat on the
        // server too (real React is installed as a peer dependency and Node would load it).
        name: "gc-bundle-react-deps",
        configEnvironment(name) {
          if (name === "client") {
            // A handful of long-cached chunks instead of ~60 tiny files: every file is a CDN
            // request, and these are shared by (and cached across) every page.
            return {
              build: {
                rolldownOptions: {
                  preserveEntrySignatures: "allow-extension",
                  output: {
                    codeSplitting: {
                      includeDependenciesRecursively: false,
                      groups: chunkGroups(src),
                    },
                  },
                },
              },
            };
          }
          if (name !== "ssr" && name !== "prerender") return;
          return {
            resolve: {
              noExternal: ["react", "react-dom", "react/jsx-runtime", /^@radix-ui\//],
            },
          };
        },
      },
    ],
    resolve: {
      alias: [
        { find: /^@\//, replacement: `${src}/` },
        { find: /^next\/link$/, replacement: shim("next-link.tsx") },
        { find: /^next\/navigation$/, replacement: shim("next-navigation.ts") },
        { find: /^next\/dynamic$/, replacement: shim("next-dynamic.tsx") },
        { find: /^next-themes$/, replacement: shim("next-themes.tsx") },
        { find: /^next$/, replacement: shim("next.ts") },
        { find: /^lucide-react$/, replacement: "lucide-preact" },
      ],
    },
  },
});
