/**
 * Routing fields of each country hub, without the hub page copy (FAQs, details,
 * keywords). Client components import this; `country-hubs.ts` holds the content.
 * A test keeps the two in sync.
 */
export const countryHubRoutes = [
  { code: "us", path: "/us", gradingScalePath: "/grading-scales/us" },
  { code: "ca", path: "/ca", gradingScalePath: "/grading-scales/canada" },
  { code: "uk", path: "/uk", gradingScalePath: "/grading-scales/uk" },
  { code: "au", path: "/au", gradingScalePath: "/grading-scales/australia-uq" },
  { code: "nz", path: "/nz", gradingScalePath: "/grading-scales/new-zealand" },
  { code: "in", path: "/in", gradingScalePath: "/grading-scales/india" },
  { code: "pk", path: "/pk", gradingScalePath: "/grading-scales/pakistan" },
] as const;
