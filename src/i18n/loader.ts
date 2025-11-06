/* eslint-disable @typescript-eslint/no-explicit-any */
import { DEFAULT_LOCALE, type Locale } from "./config";

type Dictionary = Record<string, unknown>;

/**
 * Loaders for each locale
 */
const loaders: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./locales/en.json").then((mod) => mod.default),
  es: () => import("./locales/es.json").then((mod) => mod.default),
};

/**
 * Load the dictionary for a given locale
 *
 * @param {Locale} locale
 * @returns
 */
export async function loadDictionary(locale: Locale): Promise<Dictionary> {
  const loader = loaders[locale] ?? loaders[DEFAULT_LOCALE];
  return loader();
}

/**
 * Translate a key using the given dictionary
 *
 * @param {Dictionary} dict
 * @param {string} key
 * @param {Record<string, string | number>} vars
 * @returns string
 */
export function t(
  dict: Dictionary,
  key: string,
  vars?: Record<string, string | number>,
): string {
  const val = key
    .split(".")
    .reduce(
      (acc: any, k: string) =>
        acc && typeof acc === "object" ? acc[k] : undefined,
      dict,
    );

  if (typeof val !== "string") return key;

  return vars
    ? val.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""))
    : val;
}
