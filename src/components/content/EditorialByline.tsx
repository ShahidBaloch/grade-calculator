import Link from "next/link";
import { siteConfig } from "@/config/site";

function formatReviewDate(iso: string): string {
  const date = new Date(`${iso}T12:00:00`);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export function EditorialByline({
  className = "",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const { author, lastReviewed } = siteConfig.editorial;

  if (compact) {
    return (
      <p className={`text-xs text-[var(--color-text-muted)] ${className}`.trim()}>
        Estimates only — confirm with your school.{" "}
        <Link href="/methodology" className="font-medium text-[var(--color-primary)] hover:underline">
          How we calculate
        </Link>
        {" · "}
        <Link href="/contact" className="font-medium text-[var(--color-primary)] hover:underline">
          Report an error
        </Link>
      </p>
    );
  }

  return (
    <p className={`text-sm text-[var(--color-text-muted)] ${className}`.trim()}>
      Written by {author}. Last reviewed {formatReviewDate(lastReviewed)}. See our{" "}
      <Link href="/methodology" className="font-medium text-[var(--color-primary)] hover:underline">
        methodology
      </Link>{" "}
      for how we test formulas and cite sources.
    </p>
  );
}
