import type { AnchorHTMLAttributes, ReactNode } from "react";

type Href = string | { pathname?: string; query?: Record<string, string>; hash?: string };

export type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: Href;
  prefetch?: boolean | null;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  children?: ReactNode;
};

function hrefToString(href: Href): string {
  if (typeof href === "string") return href;
  const query = href.query ? `?${new URLSearchParams(href.query)}` : "";
  return `${href.pathname ?? ""}${query}${href.hash ? `#${href.hash}` : ""}`;
}

/** Plain anchor: static pages need no client router. */
export default function Link({ href, prefetch, replace, scroll, shallow, ...props }: LinkProps) {
  return <a href={hrefToString(href)} {...props} />;
}
