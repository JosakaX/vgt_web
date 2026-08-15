# Valadares Global Tech — Sitio web corporativo

Sitio corporativo de **Valadares Global Tech (VGT)**, **agencia digital** para empresas e
instituciones de Latinoamérica. Seis líneas de servicio: Marketing & Estrategia Digital · Diseño &
Branding · Desarrollo Web, Apps & SaaS · Agentes de IA, Chatbots y Automatización · Consultoría en IA
& Transformación Digital · Datos, Analítica & Dashboards. Más dos soluciones especializadas que VGT
integra como servicio propio: Gestión de Asistencia y Acceso y Ciberseguridad Gestionada.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS 3** (tokens de marca en `tailwind.config.ts` + `src/app/globals.css`)
- **framer-motion** (animaciones de scroll discretas)
- **lucide-react** (iconografía lineal)
- **next-intl** (i18n preparado; ES activo, EN/PT-PT para Fase 2)
- **next-themes** (modo claro/oscuro persistente)
- **react-hook-form** + **zod** (formularios y validación)

## Requisitos

- Node.js ≥ 18.18 (probado con Node 24)
- npm ≥ 9

## Instalación y desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
```

## Scripts

| Script          | Descripción                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Servidor de desarrollo               |
| `npm run build` | Build de producción                  |
| `npm run start` | Sirve el build de producción         |
| `npm run lint`  | Linter (next/core-web-vitals)        |

## Variables de entorno

Copia el ejemplo y ajústalo:

```bash
cp .env.example .env.local
```

| Variable               | Descripción                                            |
| ---------------------- | ------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL` | URL pública del sitio (canónicas, sitemap, OG, JSON-LD)|

## Estructura

```
messages/es/         Textos por namespace (i18n). Una fuente de verdad por página.
public/logo/         Logo VGT (reemplaza logo-vgt.svg por el SVG final).
src/
  app/               Rutas (App Router), api/, sitemap.ts, robots.ts
  components/
    layout/          Navbar, Footer, Logo, ThemeToggle, LangSwitcher
    ui/              Container, Button, cards, Stepper, Accordion, CTABanner...
    forms/           ContactForm, QuoteForm, NewsletterForm
    motion/          FadeIn, SlideUp, Stagger (wrappers de framer-motion)
    seo/             JSON-LD
  i18n/              Configuración de next-intl
  lib/               site config (rutas, contacto), utils, schemas (zod)
docs/HANDOFF.md      Convenciones internas del proyecto
```

## Internacionalización

ES está activo. EN y PT-PT quedan **preparados** (Fase 2 — Portugal/UE): los textos están
centralizados en `messages/es/*.json` por namespace; para añadir un idioma se duplica la carpeta
de mensajes y se amplía `src/i18n/request.ts`.

## Despliegue (Cloudflare)

El destino de despliegue es **Cloudflare**. Opciones:

- **Cloudflare Workers/Pages con el adaptador OpenNext** (`@opennextjs/cloudflare`) — recomendado:
  soporta todas las features de Next 15 (rutas API `/api/*`, SSR). Pendiente de configurar.
- Alternativa: **export estático** (casi todas las páginas son estáticas) en Cloudflare Pages,
  sirviendo `/api/contact` y `/api/newsletter` con Pages Functions o un servicio externo.

Define `NEXT_PUBLIC_SITE_URL` con el dominio de producción en el panel de Cloudflare.

> Repositorio: https://github.com/JosakaX/vgt_web.git

## Páginas

`/` (Home) · `/servicios` (hub) · landings de servicio: `/servicios/marketing`,
`/servicios/branding`, `/servicios/desarrollo`, `/servicios/agentes`, `/servicios/consultoria`,
`/servicios/datos`, `/servicios/veritempo` (Gestión de Asistencia y Acceso),
`/servicios/cybernova` (Ciberseguridad Gestionada) · `/nosotros` (incluye equipo directivo) ·
`/proyectos` (portafolio) · `/blog` (Próximamente) · `/contacto` · `/cotizacion` ·
`/legal/privacidad` · `/legal/terminos` · `/legal/cookies`.

## Pendientes (`// TODO:` en el código)

- Configurar el adaptador de **Cloudflare** (OpenNext) para el despliegue.
- Reemplazar el placeholder del logo por el SVG final en `public/logo/`.
- Capturas/mockups reales de los proyectos del portafolio (hoy visual con gradiente).
- Confirmar métricas (+120 proyectos, +85 clientes, +10 países, +15 años) y categorías de proyectos.
- Fotos reales del equipo directivo (hoy avatares con iniciales).
- Confirmar el número telefónico de Estados Unidos.
- Integrar el envío real de formularios a un CRM/email (Resend, HubSpot…). Hoy los endpoints
  (`/api/contact`, `/api/newsletter`) validan y responden 200 sin persistir.
- Integrar Calendly en el bloque "Agendar demo".
- Activar analítica (Google Analytics / Plausible).
- Revisión legal de las plantillas de privacidad, términos y cookies.

Consulta **DECISIONES.md** para los supuestos tomados durante la construcción.
