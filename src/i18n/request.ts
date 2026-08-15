import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";

import { getLocaleMessages } from "./messages";

// Fase 2 activada (2026-08-15): ES, EN y PT-PT. Arquitectura SIN routing:
// el idioma viaja en la cookie NEXT_LOCALE (la escribe el LangSwitcher).
export const locales = ["es", "en", "pt"] as const;
export const defaultLocale = "es" as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async () => {
  let locale: Locale = defaultLocale;

  // El export estático (GitHub Pages) queda fijo en ES: leer cookies()
  // haría dinámicas todas las páginas y rompería el export.
  if (process.env.BUILD_STATIC !== "true") {
    const store = await cookies();
    const candidate = store.get("NEXT_LOCALE")?.value;
    if (candidate && (locales as readonly string[]).includes(candidate)) {
      locale = candidate as Locale;
    }
  }

  return { locale, messages: getLocaleMessages(locale) };
});
