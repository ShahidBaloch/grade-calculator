/**
 * Keeps Next's "use client" boundary meaningful on Astro:
 *
 * - SSR: each PascalCase export of a "use client" module is wrapped with `__island`, so it renders
 *   as a hydratable <gc-island> when used from server code.
 * - Browser: `virtual:gc-islands` maps every "use client" file to a lazy import, one chunk each.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

const VIRTUAL_ID = "virtual:gc-islands";
const RESOLVED_ID = `\0${VIRTUAL_ID}`;
const USE_CLIENT = /^\s*(?:\/\/[^\n]*\n|\/\*[\s\S]*?\*\/\s*)*["']use client["'];?/;
/** Context providers wrap the whole page; they are not islands. */
const NOT_AN_ISLAND = /(Provider|Context)$/;

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.tsx$/.test(name)) out.push(full);
  }
  return out;
}

function islandExports(code: string): string[] {
  const names = new Set<string>();
  for (const match of code.matchAll(/^export\s+(?:function|const|let)\s+([A-Z][A-Za-z0-9_]*)/gm)) {
    if (!NOT_AN_ISLAND.test(match[1])) names.add(match[1]);
  }
  return [...names];
}

export function useClientIslands(srcDir: string): Plugin {
  const toId = (file: string) => path.relative(srcDir, file).split(path.sep).join("/");

  return {
    name: "gc-use-client-islands",
    enforce: "pre",
    resolveId(id) {
      return id === VIRTUAL_ID ? RESOLVED_ID : undefined;
    },
    load(id) {
      if (id !== RESOLVED_ID) return undefined;
      const entries = walk(srcDir)
        .filter((file) => {
          const code = readFileSync(file, "utf8");
          return USE_CLIENT.test(code) && islandExports(code).length > 0;
        })
        .map((file) => `  ${JSON.stringify(toId(file))}: () => import(${JSON.stringify(file.split(path.sep).join("/"))}),`);
      return `export const islands = {\n${entries.join("\n")}\n};\n`;
    },
    transform(code, id, options) {
      if (!options?.ssr) return undefined;
      const file = id.split("?")[0];
      if (!file.endsWith(".tsx") || !path.resolve(file).startsWith(srcDir) || !USE_CLIENT.test(code)) {
        return undefined;
      }
      const names = islandExports(code);
      if (names.length === 0) return undefined;
      const islandId = toId(path.resolve(file));
      const body = code.replace(
        /^export\s+const\s+([A-Z][A-Za-z0-9_]*)/gm,
        (all, name: string) => (names.includes(name) ? `export let ${name}` : all),
      );
      const wraps = names
        .map((name) => `${name} = __gcIsland(${name}, ${JSON.stringify(`${islandId}#${name}`)});`)
        .join("\n");
      return {
        code: `${body}\nimport { __island as __gcIsland } from "@/islands/server";\n${wraps}\n`,
        map: null,
      };
    },
  };
}
