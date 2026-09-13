import { CheckCircle, Target, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { FinalGradeStatus } from "@/types/calculator";

const config: Record<FinalGradeStatus, { label: string; variant: "success" | "error" | "default"; icon: typeof Target }> = {
  achievable: { label: "Achievable", variant: "success", icon: Target },
  impossible: { label: "Impossible", variant: "error", icon: XCircle },
  already_met: { label: "Already met", variant: "default", icon: CheckCircle },
};

export function StatusBadge({ status }: { status: FinalGradeStatus }) {
  const item = config[status];
  const Icon = item.icon;

  return (
    <Badge variant={item.variant} className="gap-1">
      <Icon className="h-3.5 w-3.5" />
      {item.label}
    </Badge>
  );
}
