"use client";

/**
 * Side sheet (modal dialog) with the API and look of the Radix Dialog version it replaces:
 * Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetClose.
 * Escape and the overlay close it; focus stays inside while open and returns to the trigger.
 */
import * as React from "react";
import { createPortal } from "react-dom";
import { Slot } from "@radix-ui/react-slot";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type SheetCtx = { open: boolean; setOpen: (open: boolean) => void; baseId: string };
const SheetContext = React.createContext<SheetCtx | null>(null);

function useSheet() {
  const ctx = React.useContext(SheetContext);
  if (!ctx) throw new Error("Sheet parts must be inside <Sheet>");
  return ctx;
}

export function Sheet({ defaultOpen = false, children }: { defaultOpen?: boolean; children?: React.ReactNode }) {
  const [open, setOpen] = React.useState(defaultOpen);
  const baseId = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  return <SheetContext.Provider value={{ open, setOpen, baseId }}>{children}</SheetContext.Provider>;
}

export function SheetTrigger({
  asChild,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }) {
  const { open, setOpen, baseId } = useSheet();
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      type="button"
      id={`${baseId}-trigger`}
      aria-haspopup="dialog"
      aria-expanded={open}
      data-state={open ? "open" : "closed"}
      onClick={() => setOpen(true)}
      {...props}
    />
  );
}

export function SheetClose({
  asChild,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }) {
  const { setOpen } = useSheet();
  const Comp = asChild ? Slot : "button";
  return <Comp type="button" onClick={() => setOpen(false)} {...props} />;
}

const FOCUSABLE =
  "a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex='-1'])";

export function SheetContent({
  side = "right",
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { side?: "left" | "right" }) {
  const { open, setOpen, baseId } = useSheet();
  const panelRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const trigger = document.getElementById(`${baseId}-trigger`);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
      } else if (event.key === "Tab" && panelRef.current) {
        const items = [...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      trigger?.focus();
    };
  }, [open, baseId]);

  if (!open) return null;
  return createPortal(
    <>
      <div className="fixed inset-0 z-50 bg-black/50" data-state="open" onClick={() => setOpen(false)} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${baseId}-title`}
        data-state="open"
        className={cn(
          "fixed z-50 flex h-full flex-col gap-4 overflow-y-auto bg-[var(--color-bg)] p-6 shadow-lg transition ease-in-out",
          side === "right" && "inset-y-0 right-0 w-3/4 max-w-sm border-l border-[var(--color-border)]",
          side === "left" && "inset-y-0 left-0 w-3/4 max-w-sm border-r border-[var(--color-border)]",
          className,
        )}
        onClick={(event) => {
          // Following a link inside the sheet closes it (same-page hash links included).
          if ((event.target as HTMLElement).closest("a[href]")) setOpen(false);
        }}
        {...props}
      >
        {children}
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] min-h-11 min-w-11 inline-flex items-center justify-center"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      </div>
    </>,
    document.body,
  );
}

export function SheetHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />;
}

export function SheetTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  const { baseId } = useSheet();
  return <h2 id={`${baseId}-title`} className={cn("text-lg font-semibold", className)} {...props} />;
}
