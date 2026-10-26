import { AppLink as Link } from "@/components/navigation/AppLink";

/** Site-wide trust line — grades stay client-side; ads/analytics described in legal pages. */
export function GradeInputPrivacyNotice({ className = "" }: { className?: string }) {
  return (
    <p className={`text-xs text-[var(--color-text-muted)] ${className}`.trim()}>
      Your grades stay on this device — we do not store them on our servers.{" "}
      <Link href="/privacy-policy" prefetch={false} className="text-[var(--color-primary)] hover:underline">
        Privacy
      </Link>
      {" · "}
      <Link href="/disclaimer" prefetch={false} className="text-[var(--color-primary)] hover:underline">
        Disclaimer
      </Link>
    </p>
  );
}
