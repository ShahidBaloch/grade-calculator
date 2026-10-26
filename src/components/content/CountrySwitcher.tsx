import { AppLink as Link } from "@/components/navigation/AppLink";
import { countryHubs } from "@/config/country-hubs";
import { cn } from "@/lib/utils";

/** Outlined chip row for switching country hubs. Inactive matches homepage tool chips. */
export function CountrySwitcher({ currentPath }: { currentPath: string }) {
  return (
    <nav aria-label="Switch country" className="mt-5">
      <ul className="flex flex-wrap gap-2">
        {countryHubs.map((hub) => {
          const active = hub.path === currentPath;
          return (
            <li key={hub.path}>
              <Link
                href={hub.path}
                prefetch={false}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-11 items-center gap-2 rounded-md border px-3 text-sm font-medium transition-colors",
                  active
                    ? "nav-current"
                    : "country-chip border-[var(--color-btn-border)] bg-[var(--color-btn-bg)] text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]",
                )}
              >
                <span aria-hidden className="text-base leading-none">
                  {hub.flag}
                </span>
                {hub.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
