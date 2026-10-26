import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] disabled:pointer-events-none disabled:opacity-50 min-h-11 min-w-11",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-action)] text-[var(--color-action-fg)] hover:bg-[var(--color-action-hover)]",
        outline:
          "border border-[var(--color-btn-border)] bg-[var(--color-btn-bg)] text-[var(--color-text)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]",
        ghost: "hover:bg-[var(--color-bg-muted)]",
        neutral:
          "border border-[var(--color-btn-border)] bg-[var(--color-btn-bg)] text-[var(--color-text)] hover:border-[var(--color-error)] hover:text-[var(--color-error)]",
        secondary: "bg-[var(--color-bg-muted)] text-[var(--color-text)]",
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-md px-6",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}
