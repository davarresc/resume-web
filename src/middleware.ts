import type { APIContext } from "astro";
import { DEFAULT_LOCALE, LANGUAGES, type Locale } from "./i18n/config";
import { loadDictionary, t } from "./i18n/loader";
import { ROUTES } from "./constants/routes";

export async function onRequest(
  { request, locals }: APIContext,
  next: (request?: Request) => Promise<Response>,
) {
  const url = new URL(request.url);
  const [, lang, slug = ""] = url.pathname.split("/");

  if ((LANGUAGES as readonly string[]).includes(lang)) {
    await setLocalsAttrs(locals, lang as Locale);

    if (lang !== DEFAULT_LOCALE) {
      const routeKey = Object.keys(ROUTES).find(
        (key) => ROUTES[key as keyof typeof ROUTES][lang as Locale] === slug,
      );

      if (routeKey) {
        const newPath = `/${ROUTES[routeKey as keyof typeof ROUTES][DEFAULT_LOCALE] || ""}`;

        const newUrl = new URL(newPath, url.origin);
        request = new Request(newUrl, request);

        return next(request);
      }
    }
  } else {
    await setLocalsAttrs(locals, DEFAULT_LOCALE);
  }

  next();
}

async function setLocalsAttrs(locals: App.Locals, lang: Locale) {
  const dict = await loadDictionary(lang);

  locals.locale = lang;
  locals.t = (key: string, vars?: Record<string, string | number>) =>
    t(dict, key, vars);
}
