// Languages available in the application
export const LANGUAGES = ["en", "es"] as const;
export type Locale = (typeof LANGUAGES)[number];
export const DEFAULT_LOCALE: Locale = "en";
export const PREFIXED = LANGUAGES.filter((l) => l !== DEFAULT_LOCALE);

// Route slugs for each locale
export const ROUTES = {
  home: { en: "", es: "" },
  about: { en: "about", es: "sobre-mi" },
} as const;
export type RouteKey = keyof typeof ROUTES;
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
  current: { lang: Locale; slug?: string },
  target: Locale,
): string {
  const found = ROUTE_ENTRIES.find(([, slugs]) => {
    return slugs[current.lang] === (current.slug ?? "");
  });

  const routeKey: RouteKey = found?.[0] ?? "home";

  return getRoutePath(routeKey, target);
}
