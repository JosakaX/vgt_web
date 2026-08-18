# PENDIENTES — VGT Web

Lista viva de lo que falta para dejar el sitio 100% listo. Mantenida por JosakaX + Claude.
Última actualización: 2026-08-18.

## 🔴 Decisiones / acciones de JosakaX (tú)
- [ ] **Portafolio — 4 sitios pendientes de estar en vivo (2026-08-15):** GEDEVAL (`gedeval.org`)
      y Solo Una Vida (`solounavida.ong` — dominio correcto, .ong) aún no tienen sitio publicado
      (dominios ya comprados, cards apuntando por decisión de JosakaX); OHGDA está en página de
      mantenimiento; y Veriscudo apunta a `veriscudo.com` que aún NO está registrado ni tiene
      sitio. Las 4 cards usan el visual de gradiente → **capturar miniatura real de cada uno
      cuando esté en vivo** (Veritempo y Red Gobierno con Valores ya tienen la suya).
- [ ] **Proveedores de servicios de agencia:** conseguir las empresas/aliados que prestarán
      Marketing & Estrategia, Diseño & Branding y Desarrollo Web/SaaS (el contenido de las landings
      se ajustará a lo que ellos ofrezcan).
- [x] ~~Nombre definitivo de Gestión de Asistencia~~ → **Veritempo** (renombrado en todo el sitio
      el 2026-08-15: ruta `/servicios/veritempo`, i18n y textos; MyIntelli ya no aparece).
- [ ] **Nombre de ciberseguridad: "Veriscudo" es PROVISIONAL** (decisión de JosakaX 2026-08-15,
      "esto es momentáneo"). CyberNova ya no aparece en el sitio (ruta `/servicios/veriscudo`).
      Cuando haya nombre definitivo, repetir el renombre (es un sed + git mv, 10 min).
      ⚠️ Registrar `veriscudo.com`/`.eu` si se confirma (estaban LIBRES el 2026-08-15).
- [ ] **Métricas:** confirmar qué cifras puede mostrar VGT como propias vs. las del proveedor
      (hoy se usan +1.000 clientes, +12 años, etc. de la plataforma de asistencia).
- [ ] **¿Quitar marcas dentro de las páginas de detalle?** Decidir si las landings de detalle
      siguen mostrando MyIntelli/CyberNova o se neutralizan (eso sería la "pasada grande": contenido
      + URLs + redirecciones 301). Hoy: el menú/Home/footer ya usan nombres de servicio VGT.
- [ ] **Logo SVG final** → reemplazar `public/logo/logo-vgt.svg` (hoy hay placeholder).
- [ ] **Teléfono de EE. UU.** → confirmar el número.
- [ ] **Fotos reales del equipo** (Carla y Jorge) → hoy avatares con iniciales.
- [ ] **PORTAFOLIO OCULTO (2026-08-17, decisión CEO):** de los 4 proyectos solo Red Gobierno
      con Valores está en línea — links a sitios muertos dejan mal parada a la empresa.
      Interruptor `mostrarPortafolio = false` en `site.ts` (oculta sección de portada,
      /proyectos → 404, menú, footer y sitemap). **Para restaurar:** publicar GEDEVAL,
      Solo Una Vida y OHGDA + capturas/miniaturas reales → poner en `true`.
      ⏰ JosakaX atiende los sitios y miniaturas desde el 2026-08-18.
- [ ] **Links reales de redes sociales** (hoy `siteConfig.social` tiene "#" y los iconos del
      footer apuntan a nada). ⏰ JosakaX los sube el 2026-08-18.
- [x] ~~Dar vida al card VGT del hero~~ → **HECHO (2026-08-17, nivel 2 "Interactivo"):**
      tilt 3D con el mouse, flotación suave, latido en la línea-punto y los 6 servicios
      rotando bajo el nombre (i18n, respeta prefers-reduced-motion). `VgtHeroCard` en
      `components/motion/`. Reserva futura: nivel 3 (partículas/3D) para una landing o post-deploy.
- [ ] **Misión y Visión** → validar los borradores con dirección.
- [ ] **Revisión legal** de privacidad, términos y cookies (+ fecha de última actualización).

## 🟡 Tareas de Claude (yo)
- ~~Franja "Desarrollo acelerado con IA" en Desarrollo y Agentes~~ → **descartada por JosakaX**.
- [x] ~~QA responsive teléfono/tablet~~ → **HECHO (2026-08-17):** verificado con navegador real
      (Chrome DevTools, emulación 375×812 móvil) en portada, /servicios, /contacto y /cotizacion:
      cero overflow horizontal, columnas apilan bien, formularios usables (teléfono con bandera
      incluido), chat y footer correctos. Único elemento "desbordado": el círculo decorativo del
      card de demo, recortado por overflow-hidden (intencional).
- [ ] Afinar el **contenido de las 6 landings de servicio** cuando JosakaX defina proveedores.
- [x] ~~Integrar Cal.com en "Agendar demo"~~ → **HECHO (2026-08-17):** el botón abre
      `cal.com/vgt-4tbcpv/demo-vgt` (evento 30 min, cuenta management@, horario Lun–Vie
      9–17 ET, avatar VGT). URL centralizada en `siteConfig.calDemoUrl`. Mejora futura
      opcional: embed/popup de Cal en vez de pestaña nueva.
- [x] ~~Integrar envío real de formularios~~ → **HECHO (2026-08-16):** leads a Supabase
      (`public.leads`) + contacto en Quo + aviso Resend a `info@` + acuse al lead en su idioma
      (commits d8d66cb/aa27ceb). Newsletter → Resend Audience "VGT Newsletter".
- [x] ~~Activar analítica~~ → **HECHO (2026-08-18):** GA4 propiedad "VGT Web"
      (`G-7J84XE0YCX`, cuenta Valadares Global Tech de management@). Componente
      `seo/google-analytics.tsx` — solo emite en builds de producción con
      `NEXT_PUBLIC_GA_ID` (dev y preview de GH Pages no miden). **Sin banner de cookies
      (decisión del CEO):** las políticas de cookies/privacidad (ES/EN/PT) dicen que
      navegar implica aceptar cookies y analítica. Search Console verificado
      (sc-domain bajo management@) y sitemap "Correcto" con 14 páginas.
- [x] ~~Despliegue final DINÁMICO en Cloudflare~~ → **HECHO (2026-08-18, orden del CEO):**
      worker `vgt-web` con OpenNext (`@opennextjs/cloudflare` + `wrangler`, config en
      `wrangler.jsonc`/`open-next.config.ts`, `npm run deploy`). Las rutas del zone
      `valadaresglobaltech.com/*` y `www…/*` pasaron de `vgt-construccion` a `vgt-web`.
      Secretos server-only subidos con `wrangler secret bulk` (9 claves). Verificado en
      producción: páginas 200, sitemap 200, GA presente y chatbot respondiendo.
      El export estático de GitHub Pages sigue siendo SOLO preview (NO hacer
      `output: export` permanente).
- [x] ~~Re-auditoría final de Lighthouse~~ → **CORRIDA contra producción (2026-08-18):**
      desktop **95/100/96/100** (Perf/A11y/BP/SEO) ✅; móvil **72**/100/96/100 — solo falla
      Performance móvil (FCP 3,5 s / LCP 5,5 s con throttling 4G).
- [ ] **Optimizar Performance móvil a ≥ 90** (LCP 5,5 s → < 2,5 s): preload/subset de las
      fuentes (Inter/Sora), reducir CSS bloqueante y aligerar el primer render del hero.

## ✅ Hecho
- [x] Fundación Next.js + TS + Tailwind + i18n + dark mode + componentes base.
- [x] Home (posicionamiento de agencia), Servicios, Nosotros (con equipo), Proyectos (4 sitios
      reales), Blog (Próximamente), Contacto, Cotización, Legales.
- [x] Renombrado de los servicios especializados en menú/Home/footer a nombres de servicio VGT.
- [x] SEO técnico (sitemap, robots, JSON-LD, metadata por página), README, DECISIONES, .env.example.
- [x] **6 landings de servicio de agencia** (Marketing, Branding, Desarrollo, Agentes+Chatbots,
      Consultoría IA, Datos & Dashboards) con componente reutilizable; tarjetas enlazadas; mega-menú
      de 2 columnas; sitemap actualizado.
- [x] **Repo en GitHub** (github.com/JosakaX/vgt_web) + **preview estático en GitHub Pages** vía
      GitHub Action (`.github/workflows/deploy-pages.yml`, export con `BUILD_STATIC=true`, basePath
      `/vgt_web`). Preview visual; formularios no envían en ese modo (es solo demo).
