export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

export function formatGpa(value: number, decimals = 2): string {
  return value.toFixed(decimals);
}

export function formatFraction(earned: number, total: number): string {
  return `${earned}/${total}`;
}
