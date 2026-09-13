import { CountryHubContent } from "@/components/content/CountryHubContent";
import { countryHubByPath } from "@/config/country-hubs";
import { countryHubHreflangLanguages } from "@/lib/seo/hreflang";
import { createPageMetadata } from "@/lib/seo/metadata";

const hub = countryHubByPath["/us"];

export const metadata = createPageMetadata({
  title: "US Grade Calculator — Free GPA & EZ Grader",
  description: hub.description,
  path: "/us",
  keywords: hub.keywords,
  languages: countryHubHreflangLanguages(),
});

export default function UsHubPage() {
  return <CountryHubContent hub={hub} />;
}
