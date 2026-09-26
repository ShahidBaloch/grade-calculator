import Link from "next/link";

/** Site-wide trust line — grades stay client-side; ads/analytics described in legal pages. */
export function GradeInputPrivacyNotice({ className = "" }: { className?: string }) {
  return (
    <p className={`text-sm text-[var(--color-text-muted)] ${className}`.trim()}>
      Your grades stay in your browser; calculator inputs are not stored on our servers. Site cookies,
      analytics, or ads (if enabled) are described in our{" "}
      <Link href="/privacy-policy" className="text-[var(--color-primary)] hover:underline">
        Privacy Policy
      </Link>{" "}
      and{" "}
      <Link href="/cookie-policy" className="text-[var(--color-primary)] hover:underline">
        Cookie Policy
      </Link>
      .
    </p>
  );
}
