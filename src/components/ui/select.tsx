"use client";

/**
 * Select with the same API and look as the Radix version it replaces (Select, SelectTrigger,
 * SelectValue, SelectContent, SelectItem, SelectGroup), at a fraction of the client JS.
 * The selected label is read from the SelectItem children at render, so it is in the server HTML.
 */
import * as React from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { moveFocus, placeBelow, useDismiss, type Placement } from "./popover";

type SelectCtx = {
  value: string | undefined;
  select: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  disabled?: boolean;
  labels: Map<string, React.ReactNode>;
  baseId: string;
};
const SelectContext = React.createContext<SelectCtx | null>(null);

function useSelect() {
  const ctx = React.useContext(SelectContext);
  if (!ctx) throw new Error("Select parts must be inside <Select>");
  return ctx;
}

/** value → label for every SelectItem in the tree (items are written inline or via .map). */
function collectLabels(node: React.ReactNode, out: Map<string, React.ReactNode>) {
  React.Children.forEach(node, (child) => {
    if (!React.isValidElement(child)) return;
    const props = child.props as { value?: string; children?: React.ReactNode };
    if (child.type === SelectItem && props.value !== undefined) out.set(props.value, props.children);
    else if (props.children) collectLabels(props.children, out);
  });
  return out;
}

export function Select({
  value: controlled,
  defaultValue,
  onValueChange,
  disabled,
  children,
}: {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: any) => void;
  disabled?: boolean;
  name?: string;
  children?: React.ReactNode;
}) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue);
  const [open, setOpen] = React.useState(false);
  const baseId = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const value = controlled !== undefined ? controlled : uncontrolled;
  const ctx: SelectCtx = {
    value,
    open,
    setOpen,
    disabled,
    baseId,
    labels: collectLabels(children, new Map()),
    select: (next) => {
      if (controlled === undefined) setUncontrolled(next);
      onValueChange?.(next);
      setOpen(false);
      document.querySelector<HTMLElement>(`[data-select-trigger="${baseId}"]`)?.focus();
    },
  };
  return <SelectContext.Provider value={ctx}>{children}</SelectContext.Provider>;
}

export function SelectGroup({ children }: { children?: React.ReactNode }) {
  return <div role="group">{children}</div>;
}

export function SelectValue({ placeholder }: { placeholder?: React.ReactNode }) {
  const { value, labels } = useSelect();
  const label = value !== undefined ? labels.get(value) : undefined;
  return <span style={{ pointerEvents: "none" }}>{label ?? placeholder}</span>;
}

export function SelectTrigger({
  className,
  children,
  id,
  onClick,
  onKeyDown,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { open, setOpen, disabled, baseId } = useSelect();
  return (
    <button
      type="button"
      role="combobox"
      id={id ?? `${baseId}-trigger`}
      data-select-trigger={baseId}
      aria-controls={`${baseId}-content`}
      aria-expanded={open}
      aria-autocomplete="none"
      data-state={open ? "open" : "closed"}
      disabled={disabled}
      className={cn(
        "flex h-11 w-full items-center justify-between rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) setOpen(!open);
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
          event.preventDefault();
          setOpen(true);
        }
      }}
      {...props}
    >
      {children}
      <ChevronDown aria-hidden="true" className="h-4 w-4 opacity-50" />
    </button>
  );
}

function triggerElementId(baseId: string) {
  const trigger = document.querySelector<HTMLElement>(`[data-select-trigger="${baseId}"]`);
  return trigger?.id ?? `${baseId}-trigger`;
}

export function SelectContent({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
  position?: "popper" | "item-aligned";
}) {
  const { open, setOpen, value, baseId } = useSelect();
  const listRef = React.useRef<HTMLDivElement>(null);
  const [place, setPlace] = React.useState<Placement | null>(null);

  React.useLayoutEffect(() => {
    if (!open) return;
    const triggerId = triggerElementId(baseId);
    setPlace(placeBelow(triggerId));
  }, [open, baseId]);

  React.useEffect(() => {
    if (!open || !place || !listRef.current) return;
    const selected = listRef.current.querySelector<HTMLElement>('[aria-selected="true"]');
    (selected ?? listRef.current.querySelector<HTMLElement>("[data-item]"))?.focus();
  }, [open, place]);

  useDismiss(
    open,
    (reason) => {
      setOpen(false);
      if (reason === "escape") document.getElementById(triggerElementId(baseId))?.focus();
    },
    () => [listRef.current, document.getElementById(triggerElementId(baseId))],
  );

  if (!open || !place) return null;
  return createPortal(
    <div
      ref={listRef}
      id={`${baseId}-content`}
      role="listbox"
      data-state="open"
      data-side="bottom"
      style={{ position: "fixed", top: place.top, left: place.left, minWidth: place.minWidth }}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-y-auto rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] shadow-md",
        className,
      )}
      onKeyDown={(event) => {
        if (moveFocus(event.currentTarget, event.key)) event.preventDefault();
        else if (event.key === "Tab") setOpen(false);
      }}
      data-value={value}
    >
      <div className="p-1 w-full">{children}</div>
    </div>,
    document.body,
  );
}

export function SelectItem({
  className,
  children,
  value,
  disabled,
}: {
  className?: string;
  children?: React.ReactNode;
  value: string;
  disabled?: boolean;
}) {
  const { value: selected, select } = useSelect();
  const isSelected = selected === value;
  return (
    <div
      role="option"
      data-item
      tabIndex={-1}
      aria-selected={isSelected}
      aria-disabled={disabled || undefined}
      data-state={isSelected ? "checked" : "unchecked"}
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-2 pl-8 pr-2 text-sm outline-none focus:bg-[var(--color-bg-subtle)] hover:bg-[var(--color-bg-subtle)] min-h-11",
        className,
      )}
      onClick={() => !disabled && select(value)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          if (!disabled) select(value);
        }
      }}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {isSelected && <Check className="h-4 w-4" />}
      </span>
      <span>{children}</span>
    </div>
  );
}
