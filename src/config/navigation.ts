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

export interface NavItem {
  label: string;
  href: string;
  children?: Array<{ label: string; href: string }>;
}

export const mainNav: NavItem[] = [
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

/**
 * Footer is the only sitewide link block in the server HTML (header menus load lazily), so it
 * is curated: the US money pages get a sitewide link, everything else is one click away via the
 * /calculators, /guides and /grading-scales hubs. Listing every page here (110+ links) spread
 * link equity thin and made every page look like it was about Pakistan and New Zealand too.
 */
const FOOTER_CALCULATOR_SLUGS = [
  "ez-grader",
  "test-grade-calculator",
  "weighted-grade-calculator",
  "final-grade-calculator",
  "gpa-calculator",
  "high-school-gpa-calculator",
  "college-gpa-calculator",
  "cumulative-gpa-calculator",
  "percentage-to-letter-grade",
  "grade-chart",
  "eoc-grade-calculator",
  "canvas-grade-calculator",
  "grade-percentage-calculator",
  "college-grade-calculator",
  // Weakly linked non-core tools that otherwise only get 3–4 inbound links.
  "middle-school-gpa-calculator",
  "uc-gpa-calculator",
  "csu-gpa-calculator",
  "atar-calculator",
  "mcmaster-gpa-to-us-gpa",
  "gcse-grade-calculator",
  "average-grade-calculator",
] as const;

const FOOTER_GUIDE_SLUGS = [
  "how-to-calculate-gpa",
  "what-grade-do-i-need-on-my-final",
  "how-to-calculate-weighted-grades",
  "lms-course-grades-explained",
  "weighted-vs-unweighted-gpa",
  "gpa-scale-explained",
  "understanding-letter-grades",
  "how-to-raise-your-gpa",
  "gcse-9-1-grades",
  "final-exam-tips",
  "what-is-a-good-gpa",
  "is-a-3-5-gpa-good",
  "gpa-needed-for-uc-csu",
] as const;

const footerCalculatorLinks = FOOTER_CALCULATOR_SLUGS.map((slug) => {
  const calculator = calculators.find((c) => c.slug === slug)!;
  return {
    label: slug === "ez-grader" ? "Grade Calculator (EZ Grader)" : calculator.name,
    href: getCalculatorPath(slug),
  };
});

const footerGuideLinks = FOOTER_GUIDE_SLUGS.map((slug) => {
  const guide = guides.find((g) => g.slug === slug)!;
  return { label: guide.title, href: guide.path };
});

const usScalePage = gradingScalePages.find((page) => page.slug === "us")!;

export const footerNav = {
  calculators: [...footerCalculatorLinks, { label: "All Calculators", href: "/calculators" }],
  guides: [...footerGuideLinks, { label: "All Guides", href: "/guides" }],
  reference: [
    { label: "US Grading Scale & GPA Scale", href: usScalePage.path },
    { label: "Grading Scale (US A–F)", href: "/grading-scales" },
    { label: "Score Out of Total", href: "/score" },
  ],
  countries: countryLinks,
  company: [
    { label: "About", href: "/about" },
    { label: "Methodology", href: "/methodology" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "Disclaimer", href: "/disclaimer" },
    { label: "Cookie Policy", href: "/cookie-policy" },
  ],
};
