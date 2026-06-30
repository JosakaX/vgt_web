import { siteConfig } from "@/lib/site";

/**
 * JSON-LD de Organización para rich results.
 * Renderiza un <script type="application/ld+json"> seguro en el <head> del body.
 */
export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    alternateName: siteConfig.shortName,
    url: siteConfig.url,
    email: siteConfig.email,
    slogan: "Marketing · Diseño · Tecnología",
    description:
      "Valadares Global Tech integra y despliega soluciones líderes de gestión de personal y ciberseguridad para empresas de Latinoamérica.",
    logo: `${siteConfig.url}/logo/logo-vgt.svg`,
    areaServed: ["Latin America", "US"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: siteConfig.phones.ve.display,
        email: siteConfig.email,
        availableLanguage: ["Spanish"],
      },
    ],
    sameAs: Object.values(siteConfig.social).filter((u) => u !== "#"),
  };

  return (
    <script
      type="application/ld+json"
      // El contenido es estático y controlado por nosotros (sin input de usuario).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
