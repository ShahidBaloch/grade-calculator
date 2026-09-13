import { CountryHubContent } from "@/components/content/CountryHubContent";
import { countryHubByPath } from "@/config/country-hubs";
import { createPageMetadata } from "@/lib/seo/metadata";

const hub = countryHubByPath["/nz"];

export const metadata = createPageMetadata({
  title: "New Zealand Grade Calculator — NZ GPA Tools",
  description: hub.description,
  path: "/nz",
  keywords: hub.keywords,
});

export default function NzHubPage() {
  return <CountryHubContent hub={hub} />;
}
