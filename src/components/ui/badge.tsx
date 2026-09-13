import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-[var(--color-primary-subtle)] text-[var(--color-primary)]",
        secondary: "border-transparent bg-[var(--color-bg-muted)] text-[var(--color-text)]",
        success: "border-transparent bg-[var(--grade-a-bg)] text-[var(--grade-a-text)]",
        warning: "border-transparent bg-[var(--grade-c-bg)] text-[var(--grade-c-text)]",
        error: "border-transparent bg-[var(--grade-f-bg)] text-[var(--grade-f-text)]",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
