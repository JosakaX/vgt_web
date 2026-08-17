import type { MetadataRoute } from "next";
import { siteConfig, routes, mostrarSoluciones } from "@/lib/site";

// Permite generarlo como archivo estático (necesario con output: export).
export const dynamic = "force-static";

/** Sitemap del sitio. Fase 1: solo rutas en español publicadas. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const lastModified = new Date();

  const entries: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] =
    [
      { path: routes.home, priority: 1, changeFrequency: "monthly" },
      { path: routes.services, priority: 0.9, changeFrequency: "monthly" },
      { path: routes.marketing, priority: 0.8, changeFrequency: "monthly" },
      { path: routes.branding, priority: 0.8, changeFrequency: "monthly" },
      { path: routes.desarrollo, priority: 0.8, changeFrequency: "monthly" },
      { path: routes.agentes, priority: 0.8, changeFrequency: "monthly" },
      { path: routes.consultoria, priority: 0.8, changeFrequency: "monthly" },
      { path: routes.datos, priority: 0.8, changeFrequency: "monthly" },
      // Las soluciones de partners se indexan solo cuando estén publicadas.
      ...(mostrarSoluciones
        ? [
            { path: routes.veritempo, priority: 0.8, changeFrequency: "monthly" as const },
            { path: routes.veriscudo, priority: 0.8, changeFrequency: "monthly" as const },
          ]
        : []),
      { path: routes.about, priority: 0.7, changeFrequency: "yearly" },
      { path: routes.projects, priority: 0.7, changeFrequency: "monthly" },
      { path: routes.contact, priority: 0.8, changeFrequency: "yearly" },
      { path: routes.quote, priority: 0.8, changeFrequency: "yearly" },
      { path: routes.legal.privacy, priority: 0.3, changeFrequency: "yearly" },
      { path: routes.legal.terms, priority: 0.3, changeFrequency: "yearly" },
      { path: routes.legal.cookies, priority: 0.3, changeFrequency: "yearly" },
    ];

  return entries.map((e) => ({
    url: `${base}${e.path === "/" ? "" : e.path}`,
    lastModified,
    changeFrequency: e.changeFrequency,
    priority: e.priority,
  }));
}
