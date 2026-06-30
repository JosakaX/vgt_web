import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {
  ShieldCheck,
  Wallet,
  TrendingUp,
  Users,
  Clock,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FeatureCard } from "@/components/ui/feature-card";
import { CTABanner } from "@/components/ui/cta-banner";
import { Button } from "@/components/ui/button";
import { CyberNovaAccordion } from "@/components/ui/cybernova-accordion";
import { FadeIn, SlideUp, Stagger, StaggerItem } from "@/components/motion/reveal";
import { routes } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("cybernova.meta");
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: routes.cybernova },
    openGraph: {
      title: t("title"),
      description: t("description"),
    },
  };
}

const INTRO_ICONS: LucideIcon[] = [Wallet, TrendingUp, Users, Clock];

export default async function CyberNovaPage() {
  const t = await getTranslations("cybernova");

  const introItems = t.raw("intro.items") as { title: string; description: string }[];
  const categories = t.raw("services.categories") as { title: string; content: string[] }[];

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden border-b border-border bg-surface-2 py-20 sm:py-28">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid opacity-40" />
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="flex flex-col items-start gap-6">
              <SlideUp>
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-accent-2">
                  <span className="h-2 w-2 rounded-full bg-accent-2" aria-hidden="true" />
                  {t("hero.eyebrow")}
                </span>
              </SlideUp>
              <SlideUp delay={0.05}>
                <h1 className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
                  {t("hero.title")}
                </h1>
              </SlideUp>
              <SlideUp delay={0.1}>
                <p className="max-w-xl text-lg leading-relaxed text-muted">
                  {t("hero.subtitle")}
                </p>
              </SlideUp>
              <SlideUp delay={0.15} className="flex flex-wrap gap-3">
                <Button href={routes.contact} variant="accent" size="lg">
                  {t("hero.ctaPrimary")}
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Button>
                <Button href="#portafolio" variant="outline" size="lg">
                  {t("hero.ctaSecondary")}
                </Button>
              </SlideUp>
            </div>

            {/* Visual abstracto CyberNova */}
            <FadeIn delay={0.2} className="relative hidden lg:block">
              <div className="relative mx-auto aspect-square w-full max-w-md">
                <div className="absolute inset-0 rounded-[2rem] bg-navy-grad shadow-card-hover" />
                <div
                  aria-hidden="true"
                  className="absolute -left-6 top-10 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md"
                >
                  <ShieldCheck className="h-8 w-8 text-white" aria-hidden="true" />
                </div>
                <div
                  aria-hidden="true"
                  className="absolute -right-4 bottom-12 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md"
                >
                  <Users className="h-8 w-8 text-white" aria-hidden="true" />
                </div>
                <div className="absolute inset-0 grid place-items-center">
                  <span className="font-display text-5xl font-extrabold tracking-tight text-white/90">
                    CyberNova
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ===== QUÉ ES CSAAS ===== */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow={t("intro.eyebrow")}
            title={t("intro.title")}
            subtitle={t("intro.subtitle")}
          />
          <Stagger className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2">
            {introItems.map((item, i) => (
              <StaggerItem key={item.title}>
                <FeatureCard
                  title={item.title}
                  description={item.description}
                  icon={INTRO_ICONS[i] ?? ShieldCheck}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* ===== PORTAFOLIO DE SERVICIOS (ACORDEÓN) ===== */}
      <section
        id="portafolio"
        className="border-y border-border bg-surface-2 py-20 sm:py-24"
      >
        <Container>
          <SectionHeading
            eyebrow={t("services.eyebrow")}
            title={t("services.title")}
            subtitle={t("services.subtitle")}
          />
          <SlideUp className="mt-10">
            <CyberNovaAccordion items={categories} />
          </SlideUp>
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
