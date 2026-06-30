# HANDOFF — Convenciones del proyecto VGT (LÉEME ANTES DE CODEAR)

Sitio corporativo de **Valadares Global Tech (VGT)** en Next.js (App Router) + TS + Tailwind v3 +
framer-motion + lucide-react + next-intl (sin routing, ES) + next-themes + react-hook-form + zod.

La **fundación, el layout (Navbar/Footer) y la Home ya están construidos y compilando**.
Tu trabajo es construir páginas nuevas **reutilizando** los componentes existentes y respetando
estos patrones. Mira `src/app/page.tsx` como referencia viva de estilo.

## Reglas de contenido (INFLEXIBLES)
- **Sin precios inventados.** Usa CTAs de "Solicitar cotización" / "Agendar demo".
- VGT es **partner/distribuidor autorizado** de MyIntelli y CyberNova. NO mostrar logos de
  clientes finales de MyIntelli como clientes de VGT.
- Datos faltantes → marca con `// TODO:` o placeholder claro. No inventes cifras/clientes.
- Español latino neutro (tú). Sin voseo argentino.

## i18n (next-intl, modo sin routing)
- TODOS los textos visibles van en `messages/es/<namespace>.json`. **Nada hardcodeado** en JSX.
- Cada página es dueña de su archivo de namespace (ya existen como stub con `meta`).
- En **server components**: `import { getTranslations } from "next-intl/server";`
  `const t = await getTranslations("<namespace>");`
- En **client components**: `import { useTranslations } from "next-intl";` `const t = useTranslations("<ns>");`
- Para **arrays/objetos** usa `t.raw("clave") as TipoEsperado[]` (ver Home con `pillars`/`steps`).
- El namespace ya está cableado en `src/i18n/request.ts` (no hace falta tocarlo).

## SEO por página (OBLIGATORIO en cada page.tsx)
```ts
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("<namespace>.meta");
  return { title: t("title"), description: t("description"), alternates: { canonical: "<ruta>" },
           openGraph: { title: t("title"), description: t("description") } };
}
```
(El layout raíz ya pone metadataBase, OG base y JSON-LD de Organización.)

## Rutas (usa `routes` de `@/lib/site`)
`routes.home` `/` · `routes.services` `/servicios` · `routes.myintelli` `/servicios/myintelli`
· `routes.cybernova` `/servicios/cybernova` · `routes.about` `/nosotros` · `routes.contact` `/contacto`
· `routes.quote` `/cotizacion` · `routes.legal.privacy|terms|cookies`.

## Componentes disponibles (NO los reescribas, impórtalos)
- `Container` (`@/components/ui/container`) — `size?: "default"|"narrow"|"wide"`, `as?`.
- `SectionHeading` (`.../section-heading`) — `eyebrow?`, `title`, `subtitle?`, `align?: "left"|"center"`, `as?: "h1"|"h2"|"h3"`.
- `Button` (`.../button`) — `variant?: "accent"|"navy"|"outline"|"ghost"`, `size?: "sm"|"md"|"lg"`, `href?` (Link) o como `<button>`, `external?`.
- `ServiceCard` — `name, category, summary, href, cta, icon: LucideIcon, accent?: "blue"|"teal"`.
- `ModuleCard` — `title, description, icon` (ideal para módulos de producto).
- `FeatureCard` — `title, description, icon` (pilares/beneficios).
- `StatBlock` — `value, label` (métricas).
- `IndustryChip` — `label`.
- `Stepper` — `steps: {title, description}[]`.
- `LogoCloud` — `title`, `allies?`.
- `CTABanner` — `title, subtitle?, buttonLabel, buttonHref` (banda navy, ya incluye <section>).
- `Accordion` (`.../accordion`) — `items: {title, content: string[], icon?}[]`, `allowMultiple?`, `defaultOpen?`. **Client**.
- Animación (`@/components/motion/reveal`): `FadeIn`, `SlideUp` (props `delay?`, `className?`), `Stagger` + `StaggerItem` para listas.
  ⚠️ NO uses `Stagger.Item` (se rompe en el límite server/client). Importa `StaggerItem` por separado.

Si necesitas un componente nuevo, créalo en `src/components/ui/` con **nombre único** (no choca con otros escuadrones).

## Tokens / clases Tailwind (usa SIEMPRE tokens, nunca colores hardcodeados → dark mode gratis)
- Colores marca: `navy` / `navy-deep` / `navy-soft`, `accent` (azul CTA), `accent-2` (teal), `silver`.
- Semánticos (theme-aware): `bg-background`, `bg-surface`, `bg-surface-2`, `border-border`,
  `text-foreground`, `text-muted`.
- Gradientes: `bg-navy-grad`, `bg-hero-grad`, utilidad `.text-gradient`, patrón `.bg-grid`.
- Fuentes: `font-display` (Sora, titulares) y `font-sans` (Inter, cuerpo).
- Estados: `text-success` `text-warning` `text-danger`.

## Accesibilidad (AA)
- Encabezados jerárquicos correctos (un solo `h1` por página → usa `SectionHeading as="h1"` en el hero).
- `aria-label` en iconos interactivos; iconos decorativos con `aria-hidden="true"`.
- Foco visible (ya global). Navegable por teclado. Contraste AA.

## Verificación
- NO ejecutes `next build` ni `next dev` (el Director hace el build integrado y QA para evitar
  contención del directorio `.next`). Si quieres typecheck rápido: `npx tsc --noEmit`.
- Material de origen para copys fieles: `Brochure de Servicios MyIntelli.pdf` y
  `CyberNova - Portafolio de servicios.pdf` en la raíz del proyecto.
