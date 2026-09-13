export const STORAGE_KEYS = {
  theme: "gc-theme",
  scale: "gc-scale",
  recentCalculator: "gc-recent-calculator",
  calculatorState: (slug: string) => `gc-state-${slug}`,
} as const;

export const URL_STATE_PARAM = "s";

/** Set by middleware from IP geo — not a user preference. */
export const GEO_COOKIES = {
  scale: "gc-geo-scale",
  country: "gc-geo-country",
} as const;

export const INPUT_DEBOUNCE_MS = 150;

export const TOUCH_TARGET_MIN = 44;
