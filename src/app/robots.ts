import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

// Permite generarlo como archivo estático (necesario con output: export).
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Fase 2: rutas aún no públicas
      disallow: ["/api/"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
