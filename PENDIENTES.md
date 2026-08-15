# PENDIENTES — VGT Web

Lista viva de lo que falta para dejar el sitio 100% listo. Mantenida por JosakaX + Claude.
Última actualización: 2026-08-15.

## 🔴 Decisiones / acciones de JosakaX (tú)
- [ ] **Portafolio — 3 sitios pendientes de estar en vivo (2026-08-15):** GEDEVAL (`gedeval.org`)
      y Solo Una Vida (`solounavida.ong` — dominio correcto, .ong) aún no tienen sitio publicado;
      JosakaX ya compró ambos dominios y decidió dejar las cards apuntando. OHGDA está en página
      de mantenimiento. Las 3 cards usan el visual de gradiente → **capturar miniatura real de
      cada uno cuando esté en vivo** (Veritempo y Red Gobierno con Valores ya tienen la suya).
- [ ] **Proveedores de servicios de agencia:** conseguir las empresas/aliados que prestarán
      Marketing & Estrategia, Diseño & Branding y Desarrollo Web/SaaS (el contenido de las landings
      se ajustará a lo que ellos ofrezcan).
- [x] ~~Nombre definitivo de Gestión de Asistencia~~ → **Veritempo** (renombrado en todo el sitio
      el 2026-08-15: ruta `/servicios/veritempo`, i18n y textos; MyIntelli ya no aparece).
- [ ] **Nombre definitivo del servicio de ciberseguridad** (hoy "Ciberseguridad Gestionada" /
      CyberNova) — JosakaX está eligiendo nombre propio (propuestas entregadas 2026-08-15).
- [ ] **Métricas:** confirmar qué cifras puede mostrar VGT como propias vs. las del proveedor
      (hoy se usan +1.000 clientes, +12 años, etc. de la plataforma de asistencia).
- [ ] **¿Quitar marcas dentro de las páginas de detalle?** Decidir si las landings de detalle
      siguen mostrando MyIntelli/CyberNova o se neutralizan (eso sería la "pasada grande": contenido
      + URLs + redirecciones 301). Hoy: el menú/Home/footer ya usan nombres de servicio VGT.
- [ ] **Logo SVG final** → reemplazar `public/logo/logo-vgt.svg` (hoy hay placeholder).
- [ ] **Teléfono de EE. UU.** → confirmar el número.
- [ ] **Fotos reales del equipo** (Carla y Jorge) → hoy avatares con iniciales.
- [ ] **Capturas/mockups reales** de los proyectos del portafolio (hoy visual con gradiente).
- [ ] **Misión y Visión** → validar los borradores con dirección.
- [ ] **Revisión legal** de privacidad, términos y cookies (+ fecha de última actualización).

## 🟡 Tareas de Claude (yo)
- ~~Franja "Desarrollo acelerado con IA" en Desarrollo y Agentes~~ → **descartada por JosakaX**.
- [ ] **QA responsive** teléfono/tablet: revisión a nivel de código + visual cuando el entorno de
      screenshots lo permita.
- [ ] Afinar el **contenido de las 6 landings de servicio** cuando JosakaX defina proveedores.
- [ ] Integrar **Calendly** en el bloque "Agendar demo".
- [ ] Integrar **envío real de formularios** a CRM/email (Resend / HubSpot). Hoy: endpoints
      placeholder que validan y responden 200.
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
