import { AppLink as Link } from "@/components/navigation/AppLink";
import { countryHubs } from "@/config/country-hubs";
import { mainNav } from "@/config/navigation";

/**
 * Crawlable primary links while desktop dropdowns load on interaction.
 * Visible footer + sitemap remain the main discovery paths; this mirrors the header IA.
 */
export function HeaderSeoNav() {
  return (
    <nav className="sr-only" aria-label="Primary site navigation">
      <ul>
        {mainNav.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
        {countryHubs.map((hub) => (
          <li key={hub.path}>
            <Link href={hub.path}>{hub.name} grading tools</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
