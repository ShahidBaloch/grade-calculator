/**
 * Accordion on native <details>/<summary>: no client JS, and every panel's text stays in the HTML
 * (indexable, matches FAQPage JSON-LD). `type="single"` groups items with the `name` attribute so
 * opening one closes the others, like the old controlled version.
 * API kept: Accordion(type, collapsible, defaultValue), AccordionItem(value),
 * AccordionTrigger(headingLevel), AccordionContent.
 */
import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type AccordionCtx = { name?: string; defaultOpen: string[] };
const AccordionContext = React.createContext<AccordionCtx>({ defaultOpen: [] });

type AccordionProps = React.HTMLAttributes<HTMLDivElement> & {
  type?: "single" | "multiple";
  collapsible?: boolean;
  defaultValue?: string | string[];
};

export function Accordion({
  type = "single",
  collapsible: _collapsible,
  defaultValue,
  className,
  children,
  ...props
}: AccordionProps) {
  const id = React.useId();
  const ctx = React.useMemo<AccordionCtx>(
    () => ({
      name: type === "single" ? `acc${id.replace(/[^a-zA-Z0-9]/g, "")}` : undefined,
      defaultOpen:
        defaultValue === undefined ? [] : Array.isArray(defaultValue) ? defaultValue : [defaultValue],
    }),
    [type, id, defaultValue],
  );
  return (
    <AccordionContext.Provider value={ctx}>
      <div className={className} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({
  className,
  value,
  children,
  ...props
}: React.HTMLAttributes<HTMLDetailsElement> & { value: string }) {
  const ctx = React.useContext(AccordionContext);
  return (
    <details
      name={ctx.name}
      open={ctx.defaultOpen.includes(value) || undefined}
      className={cn("group border-b border-[var(--color-border)]", className)}
      {...props}
    >
      {children}
    </details>
  );
}

export function AccordionTrigger({
  className,
  children,
  headingLevel = 3,
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  /** Heading level for the trigger. Use 2 when the accordion sits directly under the page h1. */
  headingLevel?: 2 | 3 | 4;
}) {
  const Heading = `h${headingLevel}` as "h2" | "h3" | "h4";
  // Exposed as a button with aria-expanded like the old trigger; islands/client.ts keeps
  // aria-expanded in step with the <details> open state.
  return (
    <summary
      role="button"
      aria-expanded="false"
      className={cn(
        "flex flex-1 cursor-pointer list-none items-center justify-between py-4 text-left text-sm font-medium transition-all hover:underline min-h-11 [&::-webkit-details-marker]:hidden",
        className,
      )}
      {...props}
    >
      <Heading>{children}</Heading>
      <ChevronDown
        aria-hidden="true"
        className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180"
      />
    </summary>
  );
}

export function AccordionContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="overflow-hidden text-sm" {...props}>
      <div className={cn("pb-4 pt-0 text-[var(--color-text-muted)]", className)}>{children}</div>
    </div>
  );
}
