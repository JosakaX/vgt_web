import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// Export estático SOLO para el preview de GitHub Pages (BUILD_STATIC=true).
// El build normal (dev / Cloudflare más adelante) no se ve afectado.
const isStaticExport = process.env.BUILD_STATIC === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Workers no trae optimizador de imágenes; servimos los archivos tal cual.
  images: { unoptimized: true },
  // Metadata SIEMPRE bloqueante en el <head>. Desde Next 15.2 el metadata de las
  // páginas dinámicas (todas lo son: el idioma sale de la cookie NEXT_LOCALE) se
  // transmite en streaming y termina en el <body> para cualquier user-agent que
  // no esté en la lista de "bots limitados"; React no lo mueve al <head> en el
  // cliente (verificado en producción el 2026-09-07: title, description, canonical
  // y OG en el body → Lighthouse SEO "sin meta description"). Hacer que la regex
  // case con todo obliga a Next a renderizar el metadata en el <head> para todos.
  // Costo: la respuesta espera a generateMetadata (traducciones en memoria, ~0 ms).
  htmlLimitedBots: /.*/,
  ...(isStaticExport
    ? {
        output: "export",
        // GitHub Pages de proyecto sirve en /<repo>
        basePath: "/vgt_web",
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
};

export default withNextIntl(nextConfig);
