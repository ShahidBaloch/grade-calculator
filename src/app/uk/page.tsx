import { CountryHubContent } from "@/components/content/CountryHubContent";
import { countryHubByPath } from "@/config/country-hubs";
import { countryHubHreflangLanguages } from "@/lib/seo/hreflang";
import { createPageMetadata } from "@/lib/seo/metadata";

const hub = countryHubByPath["/uk"];

export const metadata = createPageMetadata({
  title: "United Kingdom Grading Tools — Degree Class and GCSE",
  description: hub.description,
  path: "/uk",
  keywords: hub.keywords,
  languages: countryHubHreflangLanguages("/uk"),
});

export default function UkHubPage() {
  return <CountryHubContent hub={hub} />;
}
