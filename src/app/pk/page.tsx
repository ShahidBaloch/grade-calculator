import { CountryHubContent } from "@/components/content/CountryHubContent";
import { countryHubByPath } from "@/config/country-hubs";
import { countryHubHreflangLanguages } from "@/lib/seo/hreflang";
import { createPageMetadata } from "@/lib/seo/metadata";

const hub = countryHubByPath["/pk"];

export const metadata = createPageMetadata({
  title: "Pakistan Grading Tools — HEC GPA and CGPA",
  description: hub.description,
  path: "/pk",
  keywords: hub.keywords,
  languages: countryHubHreflangLanguages("/pk"),
});

export default function PkHubPage() {
  return <CountryHubContent hub={hub} />;
}
