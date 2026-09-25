"use client";

import Link from "next/link";
import * as React from "react";
import { calculatorBySlug } from "@/config/calculators";
import { STORAGE_KEYS } from "@/lib/constants";
import { useStorageItem } from "@/hooks/useStorageItem";
import { parseRecentCalculator } from "@/lib/utils/recent-calculator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RecentlyUsed() {
  const stored = useStorageItem(STORAGE_KEYS.recentCalculator);
  const recent = React.useMemo(() => {
    const parsed = parseRecentCalculator(stored);
    if (!parsed) return null;
    const calculator = calculatorBySlug[parsed.slug];
    if (!calculator) return null;
    return { slug: parsed.slug, path: parsed.path, name: calculator.name };
  }, [stored]);

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
