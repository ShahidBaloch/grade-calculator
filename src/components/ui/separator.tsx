import * as React from "react";
import { cn } from "@/lib/utils";

export function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
}) {
  const semantic = decorative
    ? { role: "none" }
    : {
        role: "separator",
        "aria-orientation": orientation === "vertical" ? ("vertical" as const) : undefined,
      };
  return (
    <div
      data-orientation={orientation}
      {...semantic}
      className={cn(
        "shrink-0 bg-[var(--color-border)]",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
      {...props}
    />
  );
}
