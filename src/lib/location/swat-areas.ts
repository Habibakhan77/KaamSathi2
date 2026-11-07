// Shared Swat District location data (safe to import on both client and server).

/** The overall default region. Not counted among the 12 local areas. */
export const DEFAULT_REGION = "Swat";

/** Exactly 12 selectable local areas within Swat District. */
export const SWAT_AREAS = [
  "Mingora",
  "Saidu Sharif",
  "Matta",
  "Barikot",
  "Khwazakhela",
  "Madyan",
  "Bahrain",
  "Kalam",
  "Kabal",
  "Charbagh",
  "Malam Jabba",
  "Kanju Township",
] as const;

export type SwatArea = (typeof SWAT_AREAS)[number];
export type SelectedLocation = SwatArea | typeof DEFAULT_REGION;

/**
 * Legacy / alternate spellings used in existing provider data and the NLP parser.
 * Keys and values are lower-case.
 */
const AREA_ALIASES: Record<string, string> = {
  kanju: "kanju township",
  behrain: "bahrain",
};

export function normalizeArea(area: string): string {
  const key = area.trim().toLowerCase();
  return AREA_ALIASES[key] ?? key;
}

/** True when a provider service area and a selected location refer to the same place. */
export function isSameArea(a: string, b: string): boolean {
  return normalizeArea(a) === normalizeArea(b);
}

export function isSwatArea(value: unknown): value is SwatArea {
  return typeof value === "string" && (SWAT_AREAS as readonly string[]).includes(value);
}

/** True when the selection means "the whole district" (no area filter). */
export function isWholeRegion(location: string): boolean {
  const l = location.trim().toLowerCase();
  return l === "swat" || l === "swat general" || l === "all swat" || l === "all";
}
