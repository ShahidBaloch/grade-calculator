import Link from "next/link";

/** Site-wide trust line — grades stay client-side; ads/analytics described in legal pages. */
export function GradeInputPrivacyNotice({ className = "" }: { className?: string }) {
  return (
    <p className={`text-xs text-[var(--color-text-muted)] ${className}`.trim()}>
      Grades stay in your browser. Cookies, analytics, and ads are covered in our{" "}
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
