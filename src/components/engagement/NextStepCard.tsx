import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCalculatorPath } from "@/config/calculators";
import type { CalculatorSlug } from "@/types/calculator";
import type { EngagementFlow } from "@/config/engagement-flows";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function resolveHref(to: EngagementFlow["to"]): string {
  if (to === "grading-scales") return "/grading-scales";
  if (to.startsWith("guide:")) {
    return `/guides/${to.slice("guide:".length)}`;
  }
  return getCalculatorPath(to as CalculatorSlug);
}

export function NextStepCard({ flow }: { flow: EngagementFlow }) {
  const href = resolveHref(flow.to);

  return (
    <Card className="no-print hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-base">{flow.title}</CardTitle>
        <CardDescription>{flow.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Link
          href={href}
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:underline min-h-11"
        >
          Continue
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
}
