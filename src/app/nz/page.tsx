import { CountryHubContent } from "@/components/content/CountryHubContent";
import { countryHubByPath } from "@/config/country-hubs";
import { countryHubHreflangLanguages } from "@/lib/seo/hreflang";
import { createPageMetadata } from "@/lib/seo/metadata";

const hub = countryHubByPath["/nz"];

export const metadata = createPageMetadata({
  title: "New Zealand Grade Calculator — NZ GPA Tools",
  description: hub.description,
  path: "/nz",
  keywords: hub.keywords,
  languages: countryHubHreflangLanguages(),
});

export default function NzHubPage() {
  return <CountryHubContent hub={hub} />;
}
