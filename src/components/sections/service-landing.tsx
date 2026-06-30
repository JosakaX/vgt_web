import { getTranslations } from "next-intl/server";
import { Check, type LucideIcon } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FeatureCard } from "@/components/ui/feature-card";
import { Stepper } from "@/components/ui/stepper";
import { CTABanner } from "@/components/ui/cta-banner";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/reveal";
import { routes } from "@/lib/site";

type ServiceLandingProps = {
  /** Namespace de mensajes (p. ej. "marketing"). */
  ns: string;
  /** Iconos para las tarjetas de "qué incluye" (uno por item, cicla si faltan). */
  icons: LucideIcon[];
};

/**
 * Estructura reutilizable de landing de servicio de agencia:
 * hero + qué incluye + proceso + entregables + CTA.
 * El contenido vive en messages/es/<ns>.json.
 */
export async function ServiceLanding({ ns, icons }: ServiceLandingProps) {
  const t = await getTranslations(ns);

  const includes = t.raw("includes.items") as { title: string; description: string }[];
  const steps = t.raw("process.steps") as { title: string; description: string }[];
  const deliverables = t.raw("deliverables.items") as string[];

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden border-b border-border">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid opacity-60" />
        <Container className="py-16 sm:py-20">
          <SectionHeading
            as="h1"
            eyebrow={t("hero.eyebrow")}
            title={t("hero.title")}
            subtitle={t("hero.subtitle")}
          />
        </Container>
      </section>

      {/* ===== QUÉ INCLUYE ===== */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow={t("includes.eyebrow")}
            title={t("includes.title")}
            subtitle={t("includes.subtitle")}
          />
          <Stagger className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {includes.map((item, i) => (
              <StaggerItem key={item.title}>
                <FeatureCard
                  title={item.title}
                  description={item.description}
                  icon={icons[i % icons.length]}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* ===== PROCESO ===== */}
      <section className="border-y border-border bg-surface-2 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow={t("process.eyebrow")}
            title={t("process.title")}
            subtitle={t("process.subtitle")}
          />
          <div className="mt-14">
            <Stepper steps={steps} />
          </div>
        </Container>
      </section>

      {/* ===== ENTREGABLES ===== */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow={t("deliverables.eyebrow")}
            title={t("deliverables.title")}
            subtitle={t("deliverables.subtitle")}
          />
          <FadeIn className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">
            {deliverables.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4"
              >
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
                  <Check className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="text-sm leading-relaxed text-foreground">{item}</span>
              </div>
            ))}
          </FadeIn>
        </Container>
      </section>

      {/* ===== CTA ===== */}
      <CTABanner
        title={t("cta.title")}
        subtitle={t("cta.subtitle")}
        buttonLabel={t("cta.button")}
        buttonHref={routes.contact}
      />
    </>
  );
}
