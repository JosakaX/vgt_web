import { getRequestConfig } from "next-intl/server";
import type { AbstractIntlMessages } from "next-intl";

import common from "../../messages/es/common.json";
import home from "../../messages/es/home.json";
import services from "../../messages/es/services.json";
import veritempo from "../../messages/es/veritempo.json";
import veriscudo from "../../messages/es/veriscudo.json";
import about from "../../messages/es/about.json";
import contact from "../../messages/es/contact.json";
import quote from "../../messages/es/quote.json";
import legal from "../../messages/es/legal.json";
import projects from "../../messages/es/projects.json";
import blog from "../../messages/es/blog.json";
import marketing from "../../messages/es/marketing.json";
import branding from "../../messages/es/branding.json";
import desarrollo from "../../messages/es/desarrollo.json";
import agentes from "../../messages/es/agentes.json";
import consultoria from "../../messages/es/consultoria.json";
import datos from "../../messages/es/datos.json";

// Fase 1: solo español. EN y PT-PT quedan preparados para Fase 2 (Portugal/UE).
export const locales = ["es"] as const;
export const defaultLocale = "es" as const;
export type Locale = (typeof locales)[number];

// Mensajes centralizados por namespace. Cada página/escuadrón es dueño de su
// propio archivo en messages/es/<namespace>.json (sin conflictos de merge).
// Cast a través de unknown: next-intl admite arrays de objetos en runtime
// (vía t.raw), pero su tipo AbstractIntlMessages no los modela.
const messages = {
  common,
  home,
  services,
  veritempo,
  veriscudo,
  about,
  contact,
  quote,
  legal,
  projects,
  blog,
  marketing,
  branding,
  desarrollo,
  agentes,
  consultoria,
  datos,
} as unknown as AbstractIntlMessages;

export default getRequestConfig(async () => ({
  locale: defaultLocale,
  messages,
}));
