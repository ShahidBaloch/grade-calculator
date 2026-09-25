import Link from "next/link";

const INTENTS = [
  { href: "/", label: "Grade a test", description: "EZ Grader for quizzes" },
  { href: "/weighted-grade-calculator", label: "Course grade", description: "Weighted average" },
  { href: "/final-grade-calculator", label: "What I need on final", description: "Final exam target" },
  { href: "/gpa-calculator", label: "GPA", description: "Semester GPA" },
  { href: "/cgpa-calculator", label: "CGPA / SGPA", description: "India & Pakistan" },
  { href: "/cgpa-to-percentage", label: "CGPA ↔ %", description: "×9.5 / HEC ×25" },
  { href: "/in", label: "India hub", description: "10-point tools" },
  { href: "/pk", label: "Pakistan hub", description: "HEC 4.0 tools" },
] as const;

export function HomepageIntentLinks({ activeHref = "/" }: { activeHref?: string }) {
  return (
    <nav aria-label="What do you want to calculate?" className="no-print space-y-2">
      <p className="text-sm font-medium text-[var(--color-text)]">I want to…</p>
      <ul className="grid gap-2 sm:grid-cols-2">
        {INTENTS.map((intent) => {
          const active = intent.href === activeHref;
          return (
            <li key={intent.href}>
              <Link
                href={intent.href}
                className={`flex min-h-11 flex-col justify-center rounded-md border px-3 py-2 text-sm ${
                  active
                    ? "border-[var(--color-primary)] bg-[var(--color-primary-subtle)]"
                    : "border-[var(--color-border)] hover:bg-[var(--color-bg-subtle)]"
                }`}
                aria-current={active ? "page" : undefined}
              >
                <span className="font-medium">{intent.label}</span>
                <span className="text-xs text-[var(--color-text-muted)]">{intent.description}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
