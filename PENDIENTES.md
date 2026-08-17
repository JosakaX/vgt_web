# PENDIENTES — VGT Web

Lista viva de lo que falta para dejar el sitio 100% listo. Mantenida por JosakaX + Claude.
Última actualización: 2026-08-15.

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
- [ ] **Capturas/mockups reales** de los proyectos del portafolio (hoy visual con gradiente).
      ⏰ JosakaX lo atiende el 2026-08-18: faltan las miniaturas porque varias páginas de los
      proyectos aún no están hechas/publicadas.
- [ ] **Links reales de redes sociales** (hoy `siteConfig.social` tiene "#" y los iconos del
      footer apuntan a nada). ⏰ JosakaX los sube el 2026-08-18.
- [ ] **Idea del CEO (2026-08-17):** hacer "algo" dentro del card VGT del hero de portada
      (el navy con VGT + línea + punto). Es JSX normal — se puede meter animación, 3D,
      partículas, texto rotativo, etc. Definir qué con JosakaX en otra sesión.
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
- [ ] Activar **analítica** (Google Analytics / Plausible).
- [ ] **Despliegue final DINÁMICO en Cloudflare** (adaptador OpenNext). ⚠️ IMPORTANTE: en producción
      el sitio debe ser **dinámico como en dev**, con las rutas API funcionando (`/api/contact`,
      `/api/newsletter`). El export estático de GitHub Pages es **SOLO para el preview visual**:
      se activa con `BUILD_STATIC=true` y el Action **quita `src/app/api`** antes de exportar. El build
      normal (sin esa variable) conserva todo lo dinámico — ese es el que va a Cloudflare. NO hacer
      `output: export` permanente.
- [ ] Re-auditoría final de **Lighthouse** (Performance/A11y/SEO/Best Practices ≥ 90).

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
