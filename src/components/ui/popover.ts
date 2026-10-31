"use client";

/**
 * Shared bits for the small menu/select/sheet primitives that replace Radix (which also failed
 * to position its popovers under Preact): placement under a trigger, outside-click and Escape.
 */
import * as React from "react";

export interface Placement {
  top: number;
  left: number;
  minWidth: number;
}

/** Fixed-position coordinates just below the trigger, aligned to its start edge. */
export function placeBelow(triggerId: string, offset = 4): Placement | null {
  const trigger = document.getElementById(triggerId);
  if (!trigger) return null;
  const rect = trigger.getBoundingClientRect();
  return { top: rect.bottom + offset, left: rect.left, minWidth: rect.width };
}

/** Closes on outside pointer down, Escape, scroll and resize while `open`. */
export function useDismiss(
  open: boolean,
  close: (reason: "escape" | "outside") => void,
  inside: () => Array<Element | null>,
) {
  React.useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!inside().some((el) => el?.contains(target))) close("outside");
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close("escape");
      }
    };
    const onViewport = () => close("outside");
    document.addEventListener("pointerdown", onPointer, true);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onViewport);
    window.addEventListener("scroll", onViewport, true);
    return () => {
      document.removeEventListener("pointerdown", onPointer, true);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onViewport);
      window.removeEventListener("scroll", onViewport, true);
    };
  }, [open]);
}

/** Arrow/Home/End focus movement between `[data-item]` children of a list element. */
export function moveFocus(list: HTMLElement, key: string): boolean {
  const items = [...list.querySelectorAll<HTMLElement>("[data-item]:not([aria-disabled=true])")];
  if (items.length === 0) return false;
  const index = items.indexOf(document.activeElement as HTMLElement);
  let next: number;
  if (key === "ArrowDown") next = index < 0 ? 0 : Math.min(items.length - 1, index + 1);
  else if (key === "ArrowUp") next = index < 0 ? items.length - 1 : Math.max(0, index - 1);
  else if (key === "Home") next = 0;
  else if (key === "End") next = items.length - 1;
  else return false;
  items[next].focus();
  return true;
}
