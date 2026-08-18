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
      "Valadares Global Tech es una agencia digital de marketing, diseño y tecnología para empresas de Latinoamérica.",
    logo: `${siteConfig.url}/logo/logo-vgt.svg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: "Fort Lauderdale",
      addressRegion: "FL",
      postalCode: "33301",
      addressCountry: "US",
    },
    areaServed: ["Latin America", "US"],
    contactPoint: Object.values(siteConfig.phones).map((p) => ({
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: p.display,
      email: siteConfig.email,
      availableLanguage: ["Spanish", "English", "Portuguese"],
    })),
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
