"use client";

import { AppLink as Link } from "@/components/navigation/AppLink";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import type { CalculatorSlug } from "@/types/calculator";
import type { EngagementFlow } from "@/config/engagement-flows";
import { resolveCalculatorPath } from "@/lib/utils/country-path";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { usePreferredCountryHub } from "@/hooks/usePreferredCountryHub";

function resolveHref(to: EngagementFlow["to"], pathname: string | null): string {
  if (to === "grading-scales") return "/grading-scales";
  if (to.startsWith("guide:")) {
    return `/guides/${to.slice("guide:".length)}`;
  }
  return resolveCalculatorPath(to as CalculatorSlug, pathname);
}

export function NextStepCard({ flow }: { flow: EngagementFlow }) {
  const pathname = usePathname();
  // Re-render with the session hub after hydration (null in server HTML).
  usePreferredCountryHub();
  const href = resolveHref(flow.to, pathname);

  return (
    <Card className="no-print hover:shadow-md transition-shadow">
      <CardHeader>
        <p className="text-base font-semibold leading-none">{flow.title}</p>
        <CardDescription>{flow.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Link
          href={href}
          className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[var(--color-action)] px-4 text-sm font-medium text-[var(--color-action-fg)] transition-colors hover:bg-[var(--color-action-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
        >
          Continue
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
}
