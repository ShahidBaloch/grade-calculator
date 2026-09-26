import { CountryHubContent } from "@/components/content/CountryHubContent";
import { countryHubByPath } from "@/config/country-hubs";
import { countryHubHreflangLanguages } from "@/lib/seo/hreflang";
import { createPageMetadata } from "@/lib/seo/metadata";

const hub = countryHubByPath["/au"];

export const metadata = createPageMetadata({
  title: "Australia Grading Tools — University GPA and ATAR",
  description: hub.description,
  path: "/au",
  keywords: hub.keywords,
  languages: countryHubHreflangLanguages("/au"),
});

export default function AuHubPage() {
  return <CountryHubContent hub={hub} />;
}
