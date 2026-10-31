/**
 * Next app-router pages (every page.tsx under src/app) as a static route table: route groups dropped,
 * [param] segments expanded with generateStaticParams. Redirect-only URLs are left out (308s in
 * the Vercel config).
 */
import { isRedirectOnlyPath } from "@/lib/seo/canonical";

type PageModule = {
  default: (props: { params: Promise<Record<string, string>>; searchParams: Promise<Record<string, string>> }) => unknown;
  metadata?: Record<string, unknown>;
  generateMetadata?: (props: { params: Promise<Record<string, string>> }) => Promise<Record<string, unknown>> | Record<string, unknown>;
  generateStaticParams?: () => Array<Record<string, string>> | Promise<Array<Record<string, string>>>;
};

const modules = import.meta.glob<PageModule>("/src/app/**/page.tsx");

/** Pages whose default export only calls permanentRedirect(). */
const REDIRECT_PAGES = new Set(["/ez-grader", "/letter-grade-to-percentage"]);

function routePattern(file: string): string {
  const segments = file
    .replace(/^\/src\/app/, "")
    .replace(/\/page\.tsx$/, "")
    .split("/")
    .filter((s) => s && !/^\(.*\)$/.test(s));
  return `/${segments.join("/")}`;
}

export interface StaticRoute {
  file: string;
  pathname: string;
  params: Record<string, string>;
}

export async function staticRoutes(): Promise<StaticRoute[]> {
  const routes: StaticRoute[] = [];
  for (const [file, load] of Object.entries(modules)) {
    const pattern = routePattern(file);
    if (!pattern.includes("[")) {
      if (!REDIRECT_PAGES.has(pattern)) routes.push({ file, pathname: pattern, params: {} });
      continue;
    }
    const mod = await load();
    for (const params of (await mod.generateStaticParams?.()) ?? []) {
      const pathname = pattern.replace(/\[([^\]]+)\]/g, (_, key: string) => params[key]);
      routes.push({ file, pathname, params });
    }
  }
  // A static page wins over a dynamic one with the same URL (Next's matching order).
  const seen = new Set<string>();
  return routes
    .sort((a, b) => Number(a.file.includes("[")) - Number(b.file.includes("[")))
    .filter((route) => {
      if (seen.has(route.pathname) || isRedirectOnlyPath(route.pathname)) return false;
      seen.add(route.pathname);
      return true;
    });
}

export async function renderRoute(route: StaticRoute) {
  const mod = await modules[route.file]();
  const params = Promise.resolve(route.params);
  const metadata = mod.generateMetadata ? await mod.generateMetadata({ params }) : mod.metadata;
  const tree = await mod.default({ params, searchParams: Promise.resolve({}) });
  return { metadata, tree };
}
