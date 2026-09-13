import { CountryHubContent } from "@/components/content/CountryHubContent";
import { countryHubByPath } from "@/config/country-hubs";
import { countryHubHreflangLanguages } from "@/lib/seo/hreflang";
import { createPageMetadata } from "@/lib/seo/metadata";

const hub = countryHubByPath["/au"];

export const metadata = createPageMetadata({
  title: "Australia Grade Calculator — 7.0 GPA Scale",
  description: hub.description,
  path: "/au",
  keywords: hub.keywords,
  languages: countryHubHreflangLanguages(),
});

export default function AuHubPage() {
  return <CountryHubContent hub={hub} />;
}
