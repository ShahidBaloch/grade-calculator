/**
 * Client chunk groups computed from the static import graph, so the browser downloads a few
 * long-cached files instead of dozens of tiny ones, and never code a page cannot use:
 *
 * - core:        everything the always-present islands (header, hub sync, scale provider) import.
 * - calculators: everything calculator islands share beyond core, cached across calculator pages.
 *
 * Dynamic import() edges are not followed, so lazy chunks (header menus) stay lazy.
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const IMPORT = /^(?:import|export)\s+(?!type\b)[^;]*?from\s+"([^"]+)"/gms;

const SHIMS: Record<string, string> = {
  "next/link": "shims/next-link.tsx",
  "next/navigation": "shims/next-navigation.ts",
  "next/dynamic": "shims/next-dynamic.tsx",
  "next-themes": "shims/next-themes.tsx",
};

function resolveImport(srcDir: string, from: string, spec: string): string | null {
  let base: string;
  if (SHIMS[spec]) return path.join(srcDir, SHIMS[spec]);
  if (spec.startsWith("@/")) base = path.join(srcDir, spec.slice(2));
  else if (spec.startsWith(".")) base = path.resolve(path.dirname(from), spec);
  else return null;
  for (const ext of ["", ".ts", ".tsx", "/index.ts", "/index.tsx"]) {
    const file = base + ext;
    if (existsSync(file) && statSync(file).isFile()) return file;
  }
  return null;
}

function reachable(srcDir: string, roots: string[]): Set<string> {
  const seen = new Set<string>();
  const queue = roots.map((r) => path.join(srcDir, r));
  while (queue.length) {
    const file = queue.pop()!;
    if (seen.has(file)) continue;
    seen.add(file);
    for (const match of readFileSync(file, "utf8").matchAll(IMPORT)) {
      const dep = resolveImport(srcDir, file, match[1]);
      if (dep && !seen.has(dep)) queue.push(dep);
    }
  }
  return seen;
}

const CORE_ROOTS = [
  "components/providers/grading-scale-provider.tsx",
  "components/layout/Header.tsx",
  "components/layout/DeferredLayoutClient.tsx",
  "components/layout/PreferredCountryHubSync.tsx",
  "components/engagement/ToolSwitcher.tsx",
  "components/engagement/GeoPageHint.tsx",
  "components/engagement/GeoPageHintLazy.tsx",
];

export function chunkGroups(srcDir: string) {
  const norm = (id: string) => path.resolve(id.split("?")[0]);
  const core = reachable(srcDir, CORE_ROOTS);
  // Calculator islands ("use client" files directly in components/calculators) stay one chunk each.
  const calculatorRoots = readdirSync(path.join(srcDir, "components/calculators"))
    .filter((f) => f.endsWith(".tsx"))
    .map((f) => `components/calculators/${f}`)
    .filter((f) => readFileSync(path.join(srcDir, f), "utf8").trimStart().startsWith(`"use client"`));
  const roots = new Set(calculatorRoots.map((r) => path.join(srcDir, r)));
  const shared = new Map<string, number>();
  for (const root of calculatorRoots) {
    for (const file of reachable(srcDir, [root])) {
      if (!core.has(file) && !roots.has(file)) shared.set(file, (shared.get(file) ?? 0) + 1);
    }
  }
  const calculators = new Set([...shared].filter(([, n]) => n > 1).map(([file]) => file));
  return [
    {
      name: "vendor",
      test: /(preload-helper|rolldown[:\/]runtime|node_modules[\/](preact|lucide-preact|clsx|tailwind-merge|class-variance-authority|@radix-ui)[\/])/,
      priority: 40,
    },
    { name: "core", test: (id: string) => core.has(norm(id)), priority: 30 },
    {
      name: "calculators",
      test: (id: string) => calculators.has(norm(id)) || /node_modules[\/]zod[\/]/.test(id),
      priority: 20,
    },
  ];
}
