import Link from "next/link";
import { Button } from "@/components/ui/button";

const suggestions = [
  { href: "/", label: "EZ Grader" },
  { href: "/gpa-calculator", label: "GPA Calculator" },
  { href: "/final-grade-calculator", label: "Final Grade Calculator" },
  { href: "/calculators", label: "All calculators" },
  { href: "/guides", label: "Guides" },
];

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="mt-2 text-[var(--color-text-muted)]">
        That URL does not exist. Try one of these tools instead.
      </p>
      <Button asChild className="mt-6">
        <Link href="/">Back to EZ Grader</Link>
      </Button>
      <ul className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
        {suggestions.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="text-[var(--color-primary)] hover:underline">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
