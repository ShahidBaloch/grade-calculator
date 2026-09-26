import { CountryHubContent } from "@/components/content/CountryHubContent";
import { countryHubByPath } from "@/config/country-hubs";
import { countryHubHreflangLanguages } from "@/lib/seo/hreflang";
import { createPageMetadata } from "@/lib/seo/metadata";

const hub = countryHubByPath["/nz"];

export const metadata = createPageMetadata({
  title: "New Zealand Grading Tools — 9-Point GPA",
  description: hub.description,
  path: "/nz",
  keywords: hub.keywords,
  languages: countryHubHreflangLanguages("/nz"),
});

export default function NzHubPage() {
  return <CountryHubContent hub={hub} />;
}
