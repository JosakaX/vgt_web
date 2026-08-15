import type { AbstractIntlMessages } from "next-intl";

// ES
import esCommon from "../../messages/es/common.json";
import esHome from "../../messages/es/home.json";
import esServices from "../../messages/es/services.json";
import esVeritempo from "../../messages/es/veritempo.json";
import esVeriscudo from "../../messages/es/veriscudo.json";
import esAbout from "../../messages/es/about.json";
import esContact from "../../messages/es/contact.json";
import esQuote from "../../messages/es/quote.json";
import esLegal from "../../messages/es/legal.json";
import esProjects from "../../messages/es/projects.json";
import esMarketing from "../../messages/es/marketing.json";
import esBranding from "../../messages/es/branding.json";
import esDesarrollo from "../../messages/es/desarrollo.json";
import esAgentes from "../../messages/es/agentes.json";
import esConsultoria from "../../messages/es/consultoria.json";
import esDatos from "../../messages/es/datos.json";

// EN
import enCommon from "../../messages/en/common.json";
import enHome from "../../messages/en/home.json";
import enServices from "../../messages/en/services.json";
import enVeritempo from "../../messages/en/veritempo.json";
import enVeriscudo from "../../messages/en/veriscudo.json";
import enAbout from "../../messages/en/about.json";
import enContact from "../../messages/en/contact.json";
import enQuote from "../../messages/en/quote.json";
import enLegal from "../../messages/en/legal.json";
import enProjects from "../../messages/en/projects.json";
import enMarketing from "../../messages/en/marketing.json";
import enBranding from "../../messages/en/branding.json";
import enDesarrollo from "../../messages/en/desarrollo.json";
import enAgentes from "../../messages/en/agentes.json";
import enConsultoria from "../../messages/en/consultoria.json";
import enDatos from "../../messages/en/datos.json";

// PT-PT
import ptCommon from "../../messages/pt/common.json";
import ptHome from "../../messages/pt/home.json";
import ptServices from "../../messages/pt/services.json";
import ptVeritempo from "../../messages/pt/veritempo.json";
import ptVeriscudo from "../../messages/pt/veriscudo.json";
import ptAbout from "../../messages/pt/about.json";
import ptContact from "../../messages/pt/contact.json";
import ptQuote from "../../messages/pt/quote.json";
import ptLegal from "../../messages/pt/legal.json";
import ptProjects from "../../messages/pt/projects.json";
import ptMarketing from "../../messages/pt/marketing.json";
import ptBranding from "../../messages/pt/branding.json";
import ptDesarrollo from "../../messages/pt/desarrollo.json";
import ptAgentes from "../../messages/pt/agentes.json";
import ptConsultoria from "../../messages/pt/consultoria.json";
import ptDatos from "../../messages/pt/datos.json";

// Cast a través de unknown: next-intl admite arrays de objetos en runtime
// (vía t.raw), pero su tipo AbstractIntlMessages no los modela.
const MESSAGES = {
  es: {
    common: esCommon,
    home: esHome,
    services: esServices,
    veritempo: esVeritempo,
    veriscudo: esVeriscudo,
    about: esAbout,
    contact: esContact,
    quote: esQuote,
    legal: esLegal,
    projects: esProjects,
    marketing: esMarketing,
    branding: esBranding,
    desarrollo: esDesarrollo,
    agentes: esAgentes,
    consultoria: esConsultoria,
    datos: esDatos,
  },
  en: {
    common: enCommon,
    home: enHome,
    services: enServices,
    veritempo: enVeritempo,
    veriscudo: enVeriscudo,
    about: enAbout,
    contact: enContact,
    quote: enQuote,
    legal: enLegal,
    projects: enProjects,
    marketing: enMarketing,
    branding: enBranding,
    desarrollo: enDesarrollo,
    agentes: enAgentes,
    consultoria: enConsultoria,
    datos: enDatos,
  },
  pt: {
    common: ptCommon,
    home: ptHome,
    services: ptServices,
    veritempo: ptVeritempo,
    veriscudo: ptVeriscudo,
    about: ptAbout,
    contact: ptContact,
    quote: ptQuote,
    legal: ptLegal,
    projects: ptProjects,
    marketing: ptMarketing,
    branding: ptBranding,
    desarrollo: ptDesarrollo,
    agentes: ptAgentes,
    consultoria: ptConsultoria,
    datos: ptDatos,
  },
} as unknown as Record<"es" | "en" | "pt", AbstractIntlMessages>;

export function getLocaleMessages(locale: "es" | "en" | "pt"): AbstractIntlMessages {
  return MESSAGES[locale];
}
