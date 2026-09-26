import { CountryHubContent } from "@/components/content/CountryHubContent";
import { countryHubByPath } from "@/config/country-hubs";
import { countryHubHreflangLanguages } from "@/lib/seo/hreflang";
import { createPageMetadata } from "@/lib/seo/metadata";

const hub = countryHubByPath["/us"];

export const metadata = createPageMetadata({
  title: "United States Grading Tools — GPA, Finals, and EOC",
  description: hub.description,
  path: "/us",
  keywords: hub.keywords,
  languages: countryHubHreflangLanguages("/us"),
});

export default function UsHubPage() {
  return <CountryHubContent hub={hub} />;
}
