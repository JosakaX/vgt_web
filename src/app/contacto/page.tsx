import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Mail, Phone, CalendarDays } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { FadeIn, SlideUp } from "@/components/motion/reveal";
import { ContactForm } from "@/components/forms/contact-form";
import { siteConfig, routes } from "@/lib/site";

// ---------------------------------------------------------------------------
// SEO
// ---------------------------------------------------------------------------

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("contact.meta");
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: routes.contact },
    openGraph: {
      title: t("title"),
      description: t("description"),
    },
  };
}

// ---------------------------------------------------------------------------
// Página
// ---------------------------------------------------------------------------

export default async function ContactoPage() {
  const t = await getTranslations("contact");

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="border-b border-border bg-surface-2 py-16 sm:py-20">
        <Container size="narrow">
          <SectionHeading
            as="h1"
            align="center"
            eyebrow={t("hero.eyebrow")}
            title={t("hero.title")}
            subtitle={t("hero.subtitle")}
          />
        </Container>
      </section>

      {/* ===== CONTENIDO: FORMULARIO + INFO ===== */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">

            {/* Columna izquierda: formulario */}
            <SlideUp>
              <ContactForm />
            </SlideUp>

            {/* Columna derecha: datos de contacto + demo */}
            <FadeIn delay={0.15}>
              <div className="flex flex-col gap-6">

                {/* Datos de contacto */}
                <div className="rounded-2xl border border-border bg-surface p-6">
                  <h2 className="mb-5 font-display text-lg font-bold text-foreground">
                    {t("info.heading")}
                  </h2>

                  {/* Email */}
                  <div className="mb-5 flex items-start gap-3">
                    <span
                      className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-navy-grad text-white"
                      aria-hidden="true"
                    >
                      <Mail className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="mb-0.5 text-xs font-semibold uppercase tracking-widest text-muted">
                        {t("info.emailLabel")}
                      </p>
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="text-sm text-accent hover:underline"
                      >
                        {siteConfig.email}
                      </a>
                    </div>
                  </div>

                  {/* Teléfonos */}
                  <div className="flex items-start gap-3">
                    <span
                      className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-navy-grad text-white"
                      aria-hidden="true"
                    >
                      <Phone className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted">
                        {t("info.phoneLabel")}
                      </p>
                      <ul className="flex flex-col gap-1">
                        <li>
                          <a
                            href={siteConfig.phones.us.href}
                            className="text-sm text-foreground hover:text-accent"
                          >
                            {siteConfig.phones.us.display}
                          </a>
                        </li>
                        <li>
                          <a
                            href={siteConfig.phones.pt.href}
                            className="text-sm text-foreground hover:text-accent"
                          >
                            {siteConfig.phones.pt.display}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Bloque "Agendar demo" */}
                <div className="relative overflow-hidden rounded-2xl bg-navy-grad p-6">
                  {/* Decorativo */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-accent/20 blur-2xl"
                  />

                  <div className="relative flex items-start gap-3 mb-4">
                    <span
                      className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/10 text-white"
                      aria-hidden="true"
                    >
                      <CalendarDays className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <h2 className="font-display text-base font-bold text-white">
                      {t("info.demo.heading")}
                    </h2>
                  </div>

                  <p className="relative mb-5 text-sm leading-relaxed text-silver">
                    {t("info.demo.body")}
                  </p>

                  {/* TODO: integrar Calendly */}
                  <Button
                    href={"#" /* TODO: reemplazar con link de Calendly */}
                    variant="accent"
                    size="md"
                    className="relative w-full justify-center"
                  >
                    {t("info.demo.button")}
                  </Button>
                </div>

              </div>
            </FadeIn>
          </div>
        </Container>
      </section>
    </>
  );
}
