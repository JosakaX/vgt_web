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
