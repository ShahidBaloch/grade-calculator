/** Drop-in for the parts of next/navigation this site uses, on a fully static build. */
import { currentPathname } from "./router-state";

export function usePathname(): string {
  return currentPathname();
}

export function useSearchParams(): URLSearchParams {
  return new URLSearchParams(typeof window === "undefined" ? "" : window.location.search);
}

export function useRouter() {
  return {
    push: (href: string) => window.location.assign(href),
    replace: (href: string) => window.location.replace(href),
    back: () => window.history.back(),
    forward: () => window.history.forward(),
    refresh: () => window.location.reload(),
    prefetch: (_href: string) => {},
  };
}

export class NotFoundError extends Error {
  constructor() {
    super("NEXT_NOT_FOUND");
  }
}

/** Pages only call this for params outside generateStaticParams, which are never built. */
export function notFound(): never {
  throw new NotFoundError();
}

export class RedirectError extends Error {
  constructor(public destination: string) {
    super(`NEXT_REDIRECT ${destination}`);
  }
}

/** Redirect pages are served as 308s from vercel.json; the page itself is not built. */
export function permanentRedirect(destination: string): never {
  throw new RedirectError(destination);
}

export const redirect = permanentRedirect;
