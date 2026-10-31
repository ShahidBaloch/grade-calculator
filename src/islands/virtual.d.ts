declare module "virtual:gc-islands" {
  export const islands: Record<string, () => Promise<Record<string, unknown>>>;
}
