"use client";

/**
 * Dropdown menu with the API and look of the Radix version it replaces (Root, Trigger, Content,
 * Item, Label, Separator, Group), sized for this site's two header menus.
 */
import * as React from "react";
import { createPortal } from "react-dom";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { moveFocus, placeBelow, useDismiss, type Placement } from "./popover";

type MenuCtx = { open: boolean; setOpen: (open: boolean) => void; baseId: string };
const MenuContext = React.createContext<MenuCtx | null>(null);

function useMenu() {
  const ctx = React.useContext(MenuContext);
  if (!ctx) throw new Error("DropdownMenu parts must be inside <DropdownMenu>");
  return ctx;
}

export function DropdownMenu({
  defaultOpen = false,
  children,
}: {
  defaultOpen?: boolean;
  children?: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  const baseId = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  return <MenuContext.Provider value={{ open, setOpen, baseId }}>{children}</MenuContext.Provider>;
}

export function DropdownMenuGroup(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div role="group" {...props} />;
}

export function DropdownMenuTrigger({
  asChild,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }) {
  const { open, setOpen, baseId } = useMenu();
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      type="button"
      id={`${baseId}-trigger`}
      aria-haspopup="menu"
      aria-expanded={open}
      aria-controls={open ? `${baseId}-content` : undefined}
      data-state={open ? "open" : "closed"}
      onClick={() => setOpen(!open)}
      onKeyDown={(event: React.KeyboardEvent) => {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          setOpen(true);
        }
      }}
      {...props}
    >
      {children}
    </Comp>
  );
}

export function DropdownMenuContent({
  className,
  sideOffset = 4,
  align: _align,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { sideOffset?: number; align?: "start" | "center" | "end" }) {
  const { open, setOpen, baseId } = useMenu();
  const menuRef = React.useRef<HTMLDivElement>(null);
  const [place, setPlace] = React.useState<Placement | null>(null);
  const triggerId = `${baseId}-trigger`;

  React.useLayoutEffect(() => {
    if (open) setPlace(placeBelow(triggerId, sideOffset));
  }, [open, triggerId, sideOffset]);

  React.useEffect(() => {
    if (open && place) menuRef.current?.focus();
  }, [open, place]);

  useDismiss(
    open,
    (reason) => {
      setOpen(false);
      if (reason === "escape") document.getElementById(triggerId)?.focus();
    },
    () => [menuRef.current, document.getElementById(triggerId)],
  );

  if (!open || !place) return null;
  return createPortal(
    <div style={{ position: "fixed", top: place.top, left: place.left, zIndex: 50, minWidth: "max-content" }}>
      <div
        ref={menuRef}
        id={`${baseId}-content`}
        role="menu"
        aria-labelledby={triggerId}
        aria-orientation="vertical"
        tabIndex={-1}
        data-state="open"
        data-side="bottom"
        className={cn(
          "z-50 min-w-[8rem] overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] p-1 text-[var(--color-text)] shadow-md outline-none",
          className,
        )}
        onKeyDown={(event) => {
          if (moveFocus(event.currentTarget, event.key)) event.preventDefault();
          else if (event.key === "Tab") setOpen(false);
        }}
        {...props}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

export function DropdownMenuItem({
  className,
  inset,
  asChild,
  onClick,
  ...props
}: React.HTMLAttributes<HTMLElement> & { inset?: boolean; asChild?: boolean }) {
  const { setOpen } = useMenu();
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      role="menuitem"
      tabIndex={-1}
      data-item=""
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-2 text-sm outline-none transition-colors focus:bg-[var(--color-bg-subtle)] hover:bg-[var(--color-bg-subtle)] min-h-11",
        inset && "pl-8",
        className,
      )}
      onClick={(event: React.MouseEvent<HTMLElement>) => {
        onClick?.(event);
        setOpen(false);
      }}
      {...props}
    />
  );
}

export function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }) {
  return <div className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)} {...props} />;
}

export function DropdownMenuSeparator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={cn("-mx-1 my-1 h-px bg-[var(--color-border)]", className)}
      {...props}
    />
  );
}
