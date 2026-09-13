"use client";

import Link from "next/link";
import * as React from "react";
import { calculatorBySlug } from "@/config/calculators";
import { STORAGE_KEYS } from "@/lib/constants";
import { parseRecentCalculator } from "@/lib/utils/recent-calculator";
import { getStorageItem } from "@/lib/utils/storage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RecentlyUsed() {
  const [recent, setRecent] = React.useState<{ slug: string; path: string; name: string } | null>(
    null,
  );

  React.useEffect(() => {
    const parsed = parseRecentCalculator(getStorageItem(STORAGE_KEYS.recentCalculator));
    if (!parsed) return;
    const calculator = calculatorBySlug[parsed.slug];
    if (!calculator) return;
    setRecent({ slug: parsed.slug, path: parsed.path, name: calculator.name });
  }, []);

  if (!recent) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Continue where you left off</CardTitle>
      </CardHeader>
      <CardContent>
        <Link href={recent.path} className="text-sm font-medium text-[var(--color-primary)] hover:underline">
          {recent.name}
        </Link>
      </CardContent>
    </Card>
  );
}
