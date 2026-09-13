import Link from "next/link";
import { Calculator, CheckSquare, FileText, GraduationCap, Layers, Scale, Target } from "lucide-react";
import type { CalculatorConfig } from "@/config/calculators";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const iconMap = {
  CheckSquare,
  FileText,
  Scale,
  Target,
  GraduationCap,
  Layers,
  Calculator,
};

interface CalculatorCardProps {
  calculator: CalculatorConfig;
  variant?: "default" | "mini";
}

export function CalculatorCard({ calculator, variant = "default" }: CalculatorCardProps) {
  const Icon = iconMap[calculator.icon as keyof typeof iconMap] ?? Calculator;

  if (variant === "mini") {
    return (
      <Link href={calculator.path} className="group">
        <Card className="h-full transition-shadow group-hover:shadow-md">
          <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
            <Icon className="h-6 w-6 text-[var(--color-primary)]" />
            <span className="text-sm font-medium">{calculator.shortName}</span>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={calculator.path} className="group">
      <Card className={cn("h-full transition-shadow group-hover:shadow-md")}>
        <CardHeader>
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-primary-subtle)]">
            <Icon className="h-5 w-5 text-[var(--color-primary)]" />
          </div>
          <CardTitle className="text-base">{calculator.name}</CardTitle>
          <CardDescription>{calculator.description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
