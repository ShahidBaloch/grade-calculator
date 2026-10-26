"use client";

import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useRef, type ComponentProps } from "react";

type AppLinkProps = ComponentProps<typeof NextLink>;

/** Hover must rest this long before prefetching, so sweeping across a menu does not fetch every item. */
const HOVER_INTENT_MS = 80;

/**
 * Internal navigation that prefetches on intent (hover, keyboard focus, touch) instead of on viewport.
 * Clicks stay instant without fetching every visible link up front — fewer RSC/CDN requests on Vercel.
 * Pass prefetch={true} (or null) to restore Next's default viewport prefetching for a key link.
 */
export function AppLink({
  prefetch = false,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onTouchStart,
  ...props
}: AppLinkProps) {
  const router = useRouter();
  const href = props.href;
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prefetched = useRef(false);

  const prefetchOnIntent = () => {
    if (prefetched.current || prefetch !== false || process.env.NODE_ENV === "development") return;
    // Internal paths only; skip hash links, external and protocol-relative URLs.
    if (typeof href === "string" && href.startsWith("/") && !href.startsWith("//")) {
      prefetched.current = true;
      router.prefetch(href);
    }
  };

  const cancelHover = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = null;
  };

  return (
    <NextLink
      prefetch={prefetch}
      onMouseEnter={(e) => {
        onMouseEnter?.(e);
        cancelHover();
        hoverTimer.current = setTimeout(prefetchOnIntent, HOVER_INTENT_MS);
      }}
      onMouseLeave={(e) => {
        onMouseLeave?.(e);
        cancelHover();
      }}
      onFocus={(e) => {
        onFocus?.(e);
        prefetchOnIntent();
      }}
      onTouchStart={(e) => {
        onTouchStart?.(e);
        prefetchOnIntent();
      }}
      {...props}
    />
  );
}
