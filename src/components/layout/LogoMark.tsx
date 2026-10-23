/** GradCalc mark: a "G" whose crossbar is a check. Same artwork as src/app/icon.svg and public/logo.svg. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="gc-logo-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14b8a6" />
          <stop offset="1" stopColor="#0d6b63" />
        </linearGradient>
      </defs>
      <rect width="512" height="512" rx="112" fill="url(#gc-logo-bg)" />
      <path d="M335 147 A142 142 0 1 0 391 232" fill="none" stroke="#fff" strokeWidth="64" strokeLinecap="round" />
      <path
        d="M391 232 L258 326 L202 270"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="64"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
