import { ChevronDown } from "lucide-react";
import type { ComponentProps } from "react";
import type { NavItem } from "@/config/navigation";
import { calculatorNavTriggerLabel, isNavItemActive } from "@/lib/utils/country-nav";
import { navigationCountryHub } from "@/lib/utils/country-path";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type CountryMenuButtonProps = {
  item: NavItem;
  pathname: string;
} & ComponentProps<typeof Button>;

/** Shared sizing for Calculators and Countries so the header row lines up. */
const headerNavItemClass =
  "group gap-1.5 rounded-none px-3 hover:bg-transparent hover:text-[var(--color-primary)]";

/** Plain dropdown trigger (Calculators). The chevron tells users the item opens a menu. */
export function MenuTriggerButton({
  label,
  active = false,
  sectionLabel,
  className,
  ...props
}: { label: string; active?: boolean; sectionLabel?: string } & ComponentProps<typeof Button>) {
  const showingTool = sectionLabel != null && label !== sectionLabel;
  return (
    <Button
      aria-haspopup="menu"
      aria-expanded={false}
      {...props}
      type="button"
      variant="ghost"
      className={cn(headerNavItemClass, active && "nav-active", className)}
    >
      {showingTool ? <span className="sr-only">{sectionLabel}, </span> : null}
      <span className="max-w-[9rem] truncate lg:max-w-[14rem]">{label}</span>
      {active ? <span className="sr-only"> (current section)</span> : null}
      <ChevronDown
        aria-hidden
        className="h-4 w-4 shrink-0 opacity-80 transition-transform group-data-[state=open]:rotate-180"
      />
    </Button>
  );
}

/** Calculators trigger — shows the open tool name when you are on a calculator page. */
export function CalculatorsMenuButton({
  item,
  pathname,
  className,
  ...props
}: { item: NavItem; pathname: string } & ComponentProps<typeof Button>) {
  const active = isNavItemActive(item, pathname);
  const label = calculatorNavTriggerLabel(item, pathname);
  return (
    <MenuTriggerButton
      {...props}
      sectionLabel={item.label}
      label={label}
      active={active}
      className={className}
    />
  );
}

/** Desktop Countries trigger. Shared by the idle fallback and the open menu so they match. */
export function CountryMenuButton({ item, pathname, className, ...props }: CountryMenuButtonProps) {
  const active = isNavItemActive(item, pathname);
  const hub = navigationCountryHub(pathname);
  const selected = hub && hub !== "/us" ? item.children?.find((child) => child.href === hub) : undefined;
  const label = selected?.label ?? item.label;

  return (
    <Button
      aria-haspopup="menu"
      aria-expanded={false}
      {...props}
      type="button"
      // Same underline as Calculators; show the active country name when you are in a hub.
      variant="ghost"
      className={cn(headerNavItemClass, active && "nav-active", className)}
    >
      {selected ? <span className="sr-only">Countries, </span> : null}
      <span>{label}</span>
      {active ? <span className="sr-only"> (current section)</span> : null}
      <ChevronDown
        aria-hidden
        className="h-4 w-4 shrink-0 opacity-80 transition-transform group-data-[state=open]:rotate-180"
      />
    </Button>
  );
}
