"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CheckSquare, GraduationCap, Scale, Target } from "lucide-react";
import { cn } from "@/lib/utils";

const tools = [
  { href: "/ez-grader", label: "EZ", icon: CheckSquare },
  { href: "/weighted-grade-calculator", label: "Weighted", icon: Scale },
  { href: "/final-grade-calculator", label: "Final", icon: Target },
  { href: "/gpa-calculator", label: "GPA", icon: GraduationCap },
];

export function ToolSwitcher() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Quick tools"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--color-border)] bg-[var(--color-bg)] md:hidden"
    >
      <ul className="grid h-14 grid-cols-4">
        {tools.map((tool) => {
          const active = pathname === tool.href || (tool.href === "/ez-grader" && pathname === "/");
          const Icon = tool.icon;
          return (
            <li key={tool.href}>
              <Link
                href={tool.href}
                className={cn(
                  "flex h-full flex-col items-center justify-center gap-0.5 text-xs",
                  active ? "text-[var(--color-primary)]" : "text-[var(--color-text-muted)]",
                )}
              >
                <Icon className="h-5 w-5" />
                {tool.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
