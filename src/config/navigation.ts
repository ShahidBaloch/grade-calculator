import { calculators, getCalculatorPath } from "@/config/calculators";
import { countryHubs } from "@/config/country-hubs";
import { gradingScalePages } from "@/config/grading-scale-pages";
import { guides } from "@/config/guides";

const calculatorLinks = calculators.map((calculator) => ({
  label: calculator.name,
  href: getCalculatorPath(calculator.slug),
}));

const countryLinks = countryHubs.map((hub) => ({
  label: hub.name,
  href: hub.path,
}));

export const mainNav = [
  {
    label: "Calculators",
    href: "/calculators",
    children: [...calculatorLinks, { label: "All Calculators", href: "/calculators" }],
  },
  {
    label: "Countries",
    href: "/us",
    children: countryLinks,
  },
  { label: "Guides", href: "/guides" },
  { label: "Grading Scales", href: "/grading-scales" },
];

export const footerNav = {
  calculators: [...calculatorLinks, { label: "All Calculators", href: "/calculators" }],
  guides: [...guides.map((guide) => ({ label: guide.title, href: guide.path })), { label: "All Guides", href: "/guides" }],
  reference: [
    ...gradingScalePages.map((page) => ({ label: page.title, href: page.path })),
    { label: "All Scales", href: "/grading-scales" },
  ],
  countries: countryLinks,
  company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "Cookie Policy", href: "/cookie-policy" },
  ],
};
