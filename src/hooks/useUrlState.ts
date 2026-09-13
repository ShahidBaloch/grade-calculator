"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { decodeSearchParams, encodeStateToSearchParams } from "@/lib/utils/url-state";

export function useUrlState<T extends Record<string, string | number | boolean | undefined>>(
  initialState: T,
) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const state = React.useMemo(() => {
    const fromUrl = decodeSearchParams(searchParams.toString());
    return { ...initialState, ...fromUrl } as T;
  }, [initialState, searchParams]);

  const setState = React.useCallback(
    (patch: Partial<T>) => {
      const next = { ...state, ...patch };
      const query = encodeStateToSearchParams(next);
      router.replace(`${pathname}${query}`, { scroll: false });
    },
    [pathname, router, state],
  );

  return [state, setState] as const;
}
