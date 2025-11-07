import { ROUTES, type RouteKey } from "../constants/routes";

// Languages available in the application
export const LANGUAGES = ["en", "es"] as const;
export type Locale = (typeof LANGUAGES)[number];
export const DEFAULT_LOCALE: Locale = "en";
export const PREFIXED = LANGUAGES.filter((l) => l !== DEFAULT_LOCALE);

const ROUTE_ENTRIES = Object.entries(ROUTES) as [
  RouteKey,
  Record<Locale, string>,
][];

/**
 * Get the full path for a given route and locale.
 *
 * @param {RouteKey} route
 * @param {Locale} locale
 * @returns {string}
 */
export function getRoutePath(route: RouteKey, locale: Locale): string {
  const slug = ROUTES[route][locale];
  const prefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
  return `${prefix}/${slug}`;
}

/**
 * Generate the href for switching languages while maintaining the current page.
 *
 * @param { lang: Locale; slug?: string } current
 * @param {Locale} target
 * @returns {string}
 */
export function switchLangHref(
  current: { lang?: Locale; slug?: string },
  target: Locale,
): string {
  const found = ROUTE_ENTRIES.find(([, slugs]) => {
    return slugs[current.lang || DEFAULT_LOCALE] === (current.slug ?? "");
  });

  const routeKey: RouteKey = found?.[0] ?? "home";

  return getRoutePath(routeKey, target);
}

/**
 * Gets the language and slug from a given pathname.
 *
 * @param {string} pathname
 * @returns { lang: Locale; slug: string }
 */
export function getPathInfo(pathname: string): { lang: Locale; slug: string } {
  const clean = pathname.replace(/^\/|\/$/g, "");
  const parts = clean.split("/").filter(Boolean);

  if (parts.length === 0) {
    return { lang: DEFAULT_LOCALE, slug: "" }; // Root path
  }

  if (parts.length === 1) {
    return { lang: DEFAULT_LOCALE, slug: parts[0] }; // No language prefix
  }

  return {
    lang: parts[0] as Locale,
    slug: parts.slice(1).join("/"),
  };
}
