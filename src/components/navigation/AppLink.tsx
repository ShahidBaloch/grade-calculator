"use client";

import NextLink from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps } from "react";

type AppLinkProps = ComponentProps<typeof NextLink>;

/**
 * Internal navigation that prefetches on intent (hover, keyboard focus, touch) instead of on viewport.
 * Clicks stay instant without fetching every visible link up front — fewer RSC/CDN requests on Vercel.
 * Pass prefetch={true} (or null) to restore Next's default viewport prefetching for a key link.
 */
export function AppLink({ prefetch = false, onMouseEnter, onFocus, onTouchStart, ...props }: AppLinkProps) {
  const router = useRouter();
  const href = props.href;

  const prefetchOnIntent = () => {
    if (prefetch !== false || process.env.NODE_ENV === "development") return;
    // Internal paths only; skip hash links, external and protocol-relative URLs.
    if (typeof href === "string" && href.startsWith("/") && !href.startsWith("//")) {
      router.prefetch(href);
    }
  };

  return (
    <NextLink
      prefetch={prefetch}
      onMouseEnter={(e) => {
        onMouseEnter?.(e);
        prefetchOnIntent();
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
