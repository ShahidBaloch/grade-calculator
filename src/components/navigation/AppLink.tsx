import Link, { type LinkProps } from "next/link";

/**
 * Internal navigation link. Pages are static HTML on the CDN, so this is a plain anchor: no client
 * router, no prefetch requests. Kept as its own component so call sites stay unchanged.
 */
export function AppLink(props: LinkProps) {
  return <Link {...props} />;
}
