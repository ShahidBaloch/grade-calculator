/**
 * Path of the page being rendered. Set by the Astro router before each static render
 * (builds render one page at a time); in the browser the address bar is the source of truth.
 */
let serverPathname = "/";

export function setServerPathname(pathname: string) {
  serverPathname = pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";
}

export function currentPathname(): string {
  if (typeof window === "undefined") return serverPathname;
  const path = window.location.pathname.replace(/\.html$/, "");
  return path.length > 1 ? path.replace(/\/+$/, "") : "/";
}
