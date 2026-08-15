/**
 * Configuración central del sitio VGT.
 * Datos no traducibles (URLs, rutas, estructura de navegación).
 * Los textos visibles viven en messages/es/*.json (i18n-ready).
 */

export const siteConfig = {
  name: "Valadares Global Tech",
  shortName: "VGT",
  legalName: "Valadares Global Tech LLC",
  // En producción usar la variable de entorno; fallback al dominio oficial.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.valadaresglobaltech.com",
  email: "contacto@valadaresglobaltech.com",
  phones: {
    // TODO: confirmar número de Estados Unidos
    us: { display: "+1 (USA)", href: "tel:+1" },
    ve: { display: "+58 424 612 5993", href: "tel:+584246125993" },
    pt: { display: "+351 932 742 678", href: "tel:+351932742678" },
  },
  // TODO: confirmar/activar perfiles sociales reales
  social: {
    linkedin: "#",
    instagram: "#",
    x: "#",
    youtube: "#",
  },
} as const;

/** Rutas de navegación principal. */
export const routes = {
  home: "/",
  services: "/servicios",
  marketing: "/servicios/marketing",
  branding: "/servicios/branding",
  desarrollo: "/servicios/desarrollo",
  agentes: "/servicios/agentes",
  consultoria: "/servicios/consultoria",
  datos: "/servicios/datos",
  veritempo: "/servicios/veritempo",
  veriscudo: "/servicios/veriscudo",
  about: "/nosotros",
  projects: "/proyectos",
  contact: "/contacto",
  quote: "/cotizacion",
  legal: {
    privacy: "/legal/privacidad",
    terms: "/legal/terminos",
    cookies: "/legal/cookies",
  },
  // Fase 2 (previstas, aún no implementadas)
  affiliates: "/afiliados",
} as const;

/** Idiomas activos del sitio (Fase 2 activada 2026-08-15: ES, EN y PT-PT). */
export const languages = [
  { code: "es", label: "Español", enabled: true },
  { code: "en", label: "English", enabled: true },
  { code: "pt", label: "Português", enabled: true },
] as const;
