import path from "path";
import { defineConfig } from "vitest/config";

const shim = (file: string) => path.resolve(__dirname, "./src/shims", file);

export default defineConfig({
  oxc: { jsx: { runtime: "automatic", importSource: "preact" } },
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
    coverage: {
      provider: "v8",
      include: ["src/lib/calculators/**/*.ts"],
      exclude: [
        "src/lib/calculators/index.ts",
        "src/lib/calculators/types.ts",
        "src/lib/calculators/schemas/**",
      ],
      thresholds: {
        lines: 85,
        functions: 85,
        branches: 80,
        statements: 85,
      },
    },
  },
  resolve: {
    alias: [
      { find: /^@\//, replacement: `${path.resolve(__dirname, "./src")}/` },
      { find: /^next\/link$/, replacement: shim("next-link.tsx") },
      { find: /^next\/navigation$/, replacement: shim("next-navigation.ts") },
      { find: /^next\/dynamic$/, replacement: shim("next-dynamic.tsx") },
      { find: /^next-themes$/, replacement: shim("next-themes.tsx") },
      { find: /^next$/, replacement: shim("next.ts") },
      { find: /^lucide-react$/, replacement: "lucide-preact" },
      { find: /^react$/, replacement: "preact/compat" },
      { find: /^react-dom$/, replacement: "preact/compat" },
    ],
  },
});
