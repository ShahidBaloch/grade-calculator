export function isQuickToolActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/" || pathname.endsWith("/ez-grader");
  }
  if (href === "/calculators") {
    return pathname === "/calculators";
  }
  return pathname === href || pathname.endsWith(href);
}
