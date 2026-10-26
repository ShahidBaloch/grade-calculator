"use client";

import dynamic from "next/dynamic";

export const GeoPageHintLazy = dynamic(
  () => import("@/components/engagement/GeoPageHint").then((m) => m.GeoPageHint),
  { ssr: false },
);
