export function HowItWorks({ steps }: { steps: string[] }) {
  return (
    <ol className="list-decimal space-y-3 pl-5 text-sm text-[var(--color-text-muted)]">
      {steps.map((step, index) => (
        <li key={index} className="text-[var(--color-text)]">
          {step}
        </li>
      ))}
    </ol>
  );
}
