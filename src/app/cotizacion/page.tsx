import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn, SlideUp } from "@/components/motion/reveal";
import { QuoteForm } from "@/components/forms/quote-form";
import { routes } from "@/lib/site";

// ---------------------------------------------------------------------------
// SEO
// ---------------------------------------------------------------------------

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("quote.meta");
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: routes.quote },
    openGraph: {
      title: t("title"),
      description: t("description"),
    },
  };
}

// ---------------------------------------------------------------------------
// Página
// ---------------------------------------------------------------------------

export default async function CotizacionPage() {
  const t = await getTranslations("quote");

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

      {/* ===== FORMULARIO ===== */}
      <section className="py-16 sm:py-20">
        <Container size="narrow">

          {/* Nota "a medida y sin compromiso" */}
          <FadeIn>
            <p className="mb-8 text-center text-sm leading-relaxed text-muted">
              {t("note")}
            </p>
          </FadeIn>

          {/* Formulario de cotización */}
          <SlideUp delay={0.05}>
            <QuoteForm />
          </SlideUp>

        </Container>
      </section>
    </>
  );
}
