# DECISIONES.md — Supuestos y decisiones de diseño

Documento de decisiones tomadas al construir el sitio de VGT donde el brief dejaba margen.
Alineadas con un sitio SaaS/corporativo B2B moderno.

## ⭐ Actualización de alcance (posicionamiento de agencia)

El brief inicial describía a VGT solo como revendedor de MyIntelli y CyberNova. Tras revisión del
cliente, se corrigió el **posicionamiento real**:

- **VGT es ante todo una agencia digital**: Marketing, Diseño y Tecnología. La Home, el menú y la
  página de Servicios lideran con los **5 servicios propios**: Estrategia Digital, Diseño & Branding,
  Desarrollo Web, Desarrollo de Apps, Tecnología & Innovación.
- **MyIntelli y CyberNova pasan a ser "Soluciones especializadas"** que VGT distribuye como partner
  autorizado — una sub-oferta, no el foco. Sus landings se conservan intactas.
- **Nuevas secciones/páginas:** Proyectos (portafolio), equipo directivo en Nosotros, "¿Por qué
  elegirnos?", franja de indicadores, y Blog (Próximamente).
- **Navegación:** Inicio · Nosotros · Servicios · Proyectos · Blog · Contacto + botón "Hablemos".
- **Color de marca:** navy ajustado a **#0B2C6D** (según identidad del cliente).
- **Despliegue:** objetivo **Cloudflare** (no Vercel). Adaptador recomendado: OpenNext
  (`@opennextjs/cloudflare`), pendiente de configurar.

### Datos del portafolio, equipo y métricas
- **Proyectos (reales, con enlace en vivo):** Red Gobierno con Valores
  (redgobiernoconvalores.com), OHGDA (ohgda.org), GEDEVAL (gedeval.org), Solo Una Vida
  (solounavida.org). Las **categorías** son descriptivas/inferidas y editables en
  `messages/es/projects.json`. Las tarjetas usan un visual con gradiente: // TODO capturas reales.
- **Equipo directivo (reales):** Carla Valadares (Directora Creativa y Relaciones Institucionales)
  y Jorge Valadares (Director de Innovación y Desarrollo Tecnológico). Avatares con iniciales hasta
  tener **fotos reales** (// TODO).
- **Métricas (+120 proyectos · +85 clientes · +10 países · +15 años):** provistas por el cliente,
  marcadas como **referenciales** y editables en `messages/es/services.json` (// TODO confirmar).

## Arquitectura y stack

- **Tailwind CSS v3** (no v4). El brief pide "variables de marca mapeadas en `tailwind.config`",
  patrón propio de v3; además es más estable para producción hoy. Las CSS vars de marca viven en
  `globals.css` y se mapean a utilidades semánticas en `tailwind.config.ts`.
- **next-intl en modo "sin routing i18n"**. Implementamos solo ES, con textos centralizados por
  namespace en `messages/es/*.json`. Decisión: URLs limpias sin prefijo de idioma (`/servicios`,
  no `/es/servicios`) para no romper enlaces al activar EN/PT en Fase 2. La estructura por
  namespace evita conflictos y facilita duplicar idiomas.
- **Tokens semánticos theme-aware** (`--bg`, `--surface`, `--fg`, `--border-color`…) además de los
  tokens de marca del brief. Permiten dark mode coherente sin colores hardcodeados.
- **next-themes** con `defaultTheme="light"` (el brief fija claro por defecto), persistente y sin
  parpadeo (`disableTransitionOnChange`, `suppressHydrationWarning`).

## Marca y diseño

- **Logo:** se usa un *lockup* tipográfico (monograma VGT en navy + wordmark) como componente
  `Logo`, que se adapta a tema claro/oscuro. Hay un **placeholder SVG** en `public/logo/logo-vgt.svg`
  pendiente de reemplazar por el archivo final. Paleta tomada del logo (navy #1B2A56 sobre plata).
- **Fuentes:** Sora (titulares, `font-display`) + Inter (cuerpo) vía `next/font` (sin FOUT).
- **Barra de confianza:** muestra solo a los **partners** (MyIntelli, CyberNova) como lockups de
  marca, NO clientes finales (regla del brief). Pendiente: SVGs oficiales de los aliados.

## Contenido

- **Sin precios.** CTAs de "Agendar demo" / "Solicitar cotización", según el brief.
- Misión/Visión en /nosotros son **borradores marcados `// TODO:`** para validación de dirección.
- Plantillas legales: base para **LLC de EE.UU. operando en LatAm**, sin afirmar RGPD (Fase 2). Todas
  marcadas `// TODO: revisión legal` y con fecha de actualización como placeholder.

## Formularios y backend

- Endpoints `/api/contact` y `/api/newsletter` son **placeholder**: validan con zod, registran en log
  y devuelven 200. Sin persistencia ni CRM (Fase 2). Marcado `// TODO: integrar CRM/email`.
- "Agendar demo" usa un placeholder para Calendly (`// TODO`).

## SEO y accesibilidad

- `metadata` por página vía `generateMetadata` + namespace `.meta`; `sitemap.ts`, `robots.ts`,
  Open Graph y JSON-LD de Organización en el layout raíz.
- Objetivo de accesibilidad **WCAG AA**: foco visible global, jerarquía de encabezados, `aria-*` en
  controles, respeto a `prefers-reduced-motion`.

## Orquestación (equipo JosakaXBot)

- La fundación, el layout y la Home las construyó el Director (coherencia de patrones). Las páginas
  de Fase 1 (servicios/landings, nosotros/legales, contacto/cotización) se construyeron en paralelo
  por escuadrones especializados que comparten el filesystem y consumen los componentes y tokens ya
  establecidos. Convenciones en `docs/HANDOFF.md`.

## Fuera de alcance (Fase 2) — estructura prevista, no implementada

- Versión Portugal/UE + RGPD · Portal de afiliados · Blog/CMS (hoy `/blog` es "Próximamente") ·
  Pasarela de pago · Integración real de CRM/email. La ruta `/afiliados` queda reservada en `lib/site.ts`.

## ⭐ Catálogo de servicios (evolución final)

VGT se posiciona como **agencia digital**. La página `/servicios` y la Home presentan **6 líneas de
agencia** (cada una con landing propia, generada con el componente reutilizable
`components/sections/service-landing.tsx`):
1. Marketing & Estrategia Digital · 2. Diseño & Branding · 3. Desarrollo Web, Apps & SaaS
(web, apps, SaaS, micro-SaaS, bases de datos y sistemas — lo ejecuta JosakaX con capacidades de Claude)
· 4. **Agentes de IA, Chatbots y Automatización** · 5. **Consultoría en IA & Transformación Digital**
· 6. **Datos, Analítica & Dashboards**.
Más 2 **soluciones especializadas** (de terceros, renombradas como servicio VGT, páginas de detalle
conservadas): Gestión de Asistencia y Acceso (MyIntelli) y Ciberseguridad Gestionada (CyberNova).

Decisiones de contenido:
- **No se nombran los proveedores** (MyIntelli/CyberNova/Hermes/OpenClaw/n8n/Make) en el copy público:
  se vende por el resultado, no por la herramienta. El contacto siempre va a VGT (`/contacto`).
- **"Vibe coding" / desarrollo con IA: NO es un servicio con nombre propio** (es jerga; el cliente no
  lo busca). Se usará como **diferenciador de velocidad** ("MVPs en días") dentro de Desarrollo y
  Agentes. Franja pendiente de implementar.
- Las landings de los 6 servicios tienen **contenido base informado por investigación**, editable
  cuando JosakaX consiga los proveedores que prestarán cada servicio.
- El menú "Servicios" es un mega-menú de **2 columnas** (8 servicios).

---

## ⭐ D-007 — Cobro: TODO lo cobra VGT desde su cuenta principal de Stripe (2026-08-03)

> Decisión de estructura, no de diseño. Espejo de la registrada en
> `Marketing Ideas\chawi\chawi-app\DECISIONES.md` (D-007) — VGT es el origen, Chawi la consume.

**Qué se decidió**: **una sola cuenta de Stripe — la principal de Valadares Global Tech LLC —
cobra todo**: los servicios de la agencia y los productos propios (Chawi, Veritempo, y las apps
que vengan). Cuenta verificada por API el 2026-08-03: `acct_1U0HHQRXgjAALchA`, 0 productos, limpia.

**Los dos modelos de cobro conviven en la misma cuenta** (Stripe los soporta juntos):

| Qué se cobra | Herramienta de Stripe |
|---|---|
| Los 6 servicios de agencia + las 2 soluciones integradas + proyectos (Costa Rica, etc.) — **por cotización** | **Invoices** |
| Productos propios con ingreso recurrente — Chawi ($19/mes) y las apps siguientes | **Checkout + Subscriptions** |

Esto es coherente con la regla inflexible de `docs/HANDOFF.md`: «Sin precios inventados. Usa CTAs
de Solicitar cotización» — la web no publica precios; el monto lo fija la cotización y se cobra por
factura. Los productos SaaS sí llevan precio público (ahí el precio vive en el código del producto).

**Por qué una sola cuenta**: la propia doc de Stripe lo recomienda — «If you operate multiple
accounts under the same legal entity, Stripe recommends using one account with appropriate public
business information» (`docs.stripe.com/get-started/account/multiple-accounts`). Cuentas separadas
son obligatorias solo con **distinta entidad legal o distinto tax ID**, y aquí todo es la misma LLC.

**Identidad de cada marca sin cuentas separadas**: el Branding (logo/colores) es por CUENTA, pero
el **`statement descriptor` es por PRODUCTO** («Overrides default descriptors») — así el cliente de
Chawi ve `CHAWI.APP` en su banco aunque cobre VGT. El correo de soporte también es por marca
(`support@chawi.app`, ya activo vía Cloudflare Email Routing).

⚠️ **Higiene obligatoria**: cada producto lleva **metadata de marca** (`brand=chawi`,
`brand=veritempo`, …) además de `plan_id`. Con muchas apps recurrentes en una cuenta, esa metadata
es lo único que separa ingresos por marca en los reportes sin trabajo manual. **Desde el primer
producto** — retro-etiquetar suscripciones vivas es manual y doloroso.

**Camino de crecimiento**: **Stripe Organizations** (una organización VGT con una cuenta por marca,
compartiendo datos, equipo y reportes consolidados). No se monta hoy.
**Disparador**: dos o más marcas facturando de verdad Y el branding compartido molestando al
cliente; o un producto que necesite entidad legal propia.

**Orden de construcción**: **VGT → Chawi → Veritempo → siguientes**. La LLC es el cuello de botella:
desbloquea la verificación de Meta (Chawi) y el cobro real. La home de VGT sigue en mantenimiento.

⚠️ **Aprendido a la mala (2026-08-03)**: lo configurado en un **sandbox NO pasa a producción** —
productos, precios, webhooks y llaves hay que recrearlos en modo live (Stripe recomienda reusar los
mismos IDs). Y el branding de la cuenta principal es el de **VGT**, nunca el de una app.
