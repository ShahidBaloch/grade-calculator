import { calculators, getCalculatorPath } from "@/config/calculators";
import { countryHubs } from "@/config/country-hubs";
import { mainCountryPath } from "@/config/country-hub-routes";
import { gradingScalePages } from "@/config/grading-scale-pages";
import { guides } from "@/config/guides";
import { countryCalculatorNavLinks, hubMenuCalculatorSlugs } from "@/lib/utils/hub-calculator-nav";
import { activeCountryHub } from "@/lib/utils/country-path";
import { canonicalPathForSlug } from "@/lib/seo/canonical-path";

const calculatorLinks = calculators.map((calculator) => ({
  label: calculator.name,
  href: getCalculatorPath(calculator.slug),
}));

export interface NavLink {
  label: string;
  href: string;
  /** From `countryHubs[].flag`. Present on country links only. */
  flag?: string;
  /** From `countryHubs[].code`. Present on country links only. */
  code?: string;
}

const countryLinks: NavLink[] = countryHubs.map((hub) => ({
  label: hub.name,
  href: hub.path,
  flag: hub.flag,
  code: hub.code,
}));

export interface NavItem {
  label: string;
  href: string;
  children?: NavLink[];
  /** Country switcher treatment. Calculators keeps the plain menu. */
  variant?: "countries";
  /**
   * Menu shown instead of `children` while the visitor is inside a country hub
   * (keyed by hub path). Lets /pk show Pakistan's tools instead of the US list.
   */
  countryChildren?: Record<string, NavLink[]>;
}

/** Per-country catalog: only calculators with a real hub URL for that market. */
const countryCalculatorLinks: Record<string, NavLink[]> = Object.fromEntries(
  countryHubs
    .filter((hub) => hub.path !== mainCountryPath)
    .map((hub) => [hub.path, countryCalculatorNavLinks(hub.path)]),
);

export const mainNav: NavItem[] = [
  {
    label: "Calculators",
    href: "/calculators",
    children: [...calculatorLinks, { label: "All Calculators", href: "/calculators" }],
    countryChildren: countryCalculatorLinks,
  },
  {
    label: "Countries",
    href: "/us",
    variant: "countries",
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

const US_ONLY_FOOTER_GUIDE_SLUGS = new Set([
  "weighted-vs-unweighted-gpa",
  "how-to-raise-your-gpa",
  "what-is-a-good-gpa",
  "is-a-3-5-gpa-good",
  "gpa-needed-for-uc-csu",
]);

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Methodology", href: "/methodology" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Cookie Policy", href: "/cookie-policy" },
];

function footerCalculatorLinksForHub(hubPath: string | null) {
  if (!hubPath || hubPath === mainCountryPath) {
    return [...footerCalculatorLinks, { label: "All Calculators", href: "/calculators" }];
  }
  const hub = countryHubs.find((item) => item.path === hubPath);
  if (!hub) {
    return [...footerCalculatorLinks, { label: "All Calculators", href: "/calculators" }];
  }
  const slugs = hubMenuCalculatorSlugs(hubPath).slice(0, 14);
  const links = slugs.map((slug) => {
    const calculator = calculators.find((c) => c.slug === slug)!;
    return {
      label: calculator.name.replace(/^US\s+/, ""),
      href: canonicalPathForSlug(slug, hubPath),
    };
  });
  return [...links, { label: `All ${hub.name} tools`, href: hub.path }, { label: "All Calculators", href: "/calculators" }];
}

function footerGuideLinksForHub(hubPath: string | null) {
  const hub = hubPath ? countryHubs.find((item) => item.path === hubPath) : undefined;
  if (hub?.relatedGuides?.length) {
    return [
      ...hub.relatedGuides.map((guide) => ({ label: guide.title, href: guide.path })),
      { label: "All Guides", href: "/guides" },
    ];
  }
  const slugs = FOOTER_GUIDE_SLUGS.filter(
    (slug) => !hubPath || hubPath === mainCountryPath || !US_ONLY_FOOTER_GUIDE_SLUGS.has(slug),
  );
  const links = slugs.map((slug) => {
    const guide = guides.find((g) => g.slug === slug)!;
    return { label: guide.title, href: guide.path };
  });
  return [...links, { label: "All Guides", href: "/guides" }];
}

function footerReferenceForHub(hubPath: string | null) {
  const hub = hubPath ? countryHubs.find((item) => item.path === hubPath) : undefined;
  if (!hub || hub.path === mainCountryPath) {
    return [
      { label: "US Grading Scale & GPA Scale", href: usScalePage.path },
      { label: "Grading Scale (US A–F)", href: "/grading-scales" },
      { label: "Score Out of Total", href: "/score" },
    ];
  }
  const scalePage = gradingScalePages.find((page) => page.path === hub.gradingScalePath);
  return [
    {
      label: scalePage ? `${hub.name} grading scale` : `${hub.name} scale`,
      href: hub.gradingScalePath,
    },
    { label: "Grading Scale (US A–F)", href: "/grading-scales" },
    { label: "Score Out of Total", href: "/score" },
  ];
}

/** Sitewide footer for the US hub (also used in SEO audit static checks). */
export const footerNav = {
  calculators: footerCalculatorLinksForHub(mainCountryPath),
  guides: footerGuideLinksForHub(mainCountryPath),
  reference: footerReferenceForHub(mainCountryPath),
  countries: countryLinks,
  company: companyLinks,
};

/** Server footer: hub-aware calculator and guide links in the initial HTML. */
export function footerNavForPath(pathname: string | null | undefined) {
  const hubPath = activeCountryHub(pathname);
  return {
    calculators: footerCalculatorLinksForHub(hubPath),
    guides: footerGuideLinksForHub(hubPath),
    reference: footerReferenceForHub(hubPath),
    countries: countryLinks,
    company: companyLinks,
  };
}
