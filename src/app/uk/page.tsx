import { CountryHubContent } from "@/components/content/CountryHubContent";
import { countryHubByPath } from "@/config/country-hubs";
import { createPageMetadata } from "@/lib/seo/metadata";

const hub = countryHubByPath["/uk"];

export const metadata = createPageMetadata({
  title: "UK Grade Calculator — Degree Classification Tools",
  description: hub.description,
  path: "/uk",
  keywords: hub.keywords,
});

export default function UkHubPage() {
  return <CountryHubContent hub={hub} />;
}
