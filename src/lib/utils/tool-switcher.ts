export function isQuickToolActive(pathname: string, href: string): boolean {
  const normalized = pathname.replace(/\/$/, "") || "/";
  const target = href.replace(/\/$/, "") || "/";

  if (target === "/") {
    return normalized === "/" || normalized.endsWith("/ez-grader");
  }
  if (target === "/calculators") {
    return normalized === "/calculators" || normalized.endsWith("/calculators");
  }
  return normalized === target || normalized.endsWith(target);
}
