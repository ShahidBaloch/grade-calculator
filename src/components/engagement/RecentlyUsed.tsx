"use client";

import Link from "next/link";
import * as React from "react";
import { calculatorBySlug } from "@/config/calculators";
import { STORAGE_KEYS } from "@/lib/constants";
import { getStorageItem } from "@/lib/utils/storage";
import type { CalculatorSlug } from "@/types/calculator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RecentlyUsed() {
  const [slug, setSlug] = React.useState<CalculatorSlug | null>(null);

  React.useEffect(() => {
    const stored = getStorageItem(STORAGE_KEYS.recentCalculator) as CalculatorSlug | null;
    if (stored && calculatorBySlug[stored]) setSlug(stored);
  }, []);

  if (!slug) return null;

  const calculator = calculatorBySlug[slug];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Continue where you left off</CardTitle>
      </CardHeader>
      <CardContent>
        <Link href={calculator.path} className="text-sm font-medium text-[var(--color-primary)] hover:underline">
          {calculator.name}
        </Link>
      </CardContent>
    </Card>
  );
}
