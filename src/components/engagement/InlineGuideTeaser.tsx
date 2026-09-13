import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface InlineGuideTeaserProps {
  title: string;
  summary: string;
  href: string;
}

export function InlineGuideTeaser({ title, summary, href }: InlineGuideTeaserProps) {
  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-4">
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-[var(--color-text-muted)]">{summary}</p>
      <Link href={href} className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)] hover:underline">
        Read full guide
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
