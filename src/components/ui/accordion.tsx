"use client";

/**
 * Lightweight accordion (replaces @radix-ui/react-accordion to cut ~25 KB of client JS).
 * Same API surface used in this codebase: Accordion(type single|multiple, collapsible),
 * AccordionItem(value), AccordionTrigger(headingLevel), AccordionContent.
 * Closed panels stay in the server HTML with `hidden` so FAQ / formula text is indexable
 * and matches FAQPage JSON-LD. Triggers are buttons with aria-expanded / aria-controls.
 */
import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type AccordionCtx = {
  isOpen: (value: string) => boolean;
  toggle: (value: string) => void;
  baseId: string;
};
const AccordionContext = React.createContext<AccordionCtx | null>(null);
const ItemContext = React.createContext<{ value: string; open: boolean } | null>(null);

type AccordionProps = React.HTMLAttributes<HTMLDivElement> & {
  type?: "single" | "multiple";
  collapsible?: boolean;
  defaultValue?: string | string[];
};

export function Accordion({
  type = "single",
  collapsible = false,
  defaultValue,
  className,
  children,
  ...props
}: AccordionProps) {
  const [open, setOpen] = React.useState<string[]>(
    defaultValue === undefined ? [] : Array.isArray(defaultValue) ? defaultValue : [defaultValue],
  );
  const baseId = React.useId();
  const ctx = React.useMemo<AccordionCtx>(
    () => ({
      baseId,
      isOpen: (value) => open.includes(value),
      toggle: (value) =>
        setOpen((current) => {
          const isOpen = current.includes(value);
          if (type === "multiple") {
            return isOpen ? current.filter((v) => v !== value) : [...current, value];
          }
          if (isOpen) return collapsible ? [] : current;
          return [value];
        }),
    }),
    [open, type, collapsible, baseId],
  );
  return (
    <AccordionContext.Provider value={ctx}>
      <div className={className} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export const AccordionItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, value, ...props }, ref) => {
  const ctx = React.useContext(AccordionContext);
  const open = ctx?.isOpen(value) ?? false;
  return (
    <ItemContext.Provider value={{ value, open }}>
      <div
        ref={ref}
        data-state={open ? "open" : "closed"}
        className={cn("border-b border-[var(--color-border)]", className)}
        {...props}
      />
    </ItemContext.Provider>
  );
});
AccordionItem.displayName = "AccordionItem";

function ids(baseId: string, value: string) {
  const safe = value.replace(/[^a-zA-Z0-9_-]/g, "-");
  return { trigger: `${baseId}-t-${safe}`, content: `${baseId}-c-${safe}` };
}

export const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    /** Heading level for the trigger. Use 2 when the accordion sits directly under the page h1. */
    headingLevel?: 2 | 3 | 4;
  }
>(({ className, children, headingLevel = 3, onClick, ...props }, ref) => {
  const ctx = React.useContext(AccordionContext);
  const item = React.useContext(ItemContext);
  const Heading = `h${headingLevel}` as "h2" | "h3" | "h4";
  const open = item?.open ?? false;
  const { trigger, content } = ids(ctx?.baseId ?? "acc", item?.value ?? "");
  return (
    <Heading className="flex">
      <button
        ref={ref}
        type="button"
        id={trigger}
        aria-expanded={open}
        aria-controls={content}
        data-state={open ? "open" : "closed"}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented && item) ctx?.toggle(item.value);
        }}
        className={cn(
          "flex flex-1 items-center justify-between py-4 text-left text-sm font-medium transition-all hover:underline min-h-11 [&[data-state=open]>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0 transition-transform duration-200" />
      </button>
    </Heading>
  );
});
AccordionTrigger.displayName = "AccordionTrigger";

export const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const ctx = React.useContext(AccordionContext);
  const item = React.useContext(ItemContext);
  const open = item?.open ?? false;
  const { trigger, content } = ids(ctx?.baseId ?? "acc", item?.value ?? "");
  return (
    <div
      ref={ref}
      id={content}
      role="region"
      aria-labelledby={trigger}
      data-state={open ? "open" : "closed"}
      hidden={!open}
      className="overflow-hidden text-sm data-[state=closed]:hidden data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("pb-4 pt-0 text-[var(--color-text-muted)]", className)}>{children}</div>
    </div>
  );
});
AccordionContent.displayName = "AccordionContent";
