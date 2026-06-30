import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {
  TrendingUp,
  Palette,
  Cpu,
  BadgeCheck,
  Target,
  Eye,
  ArrowRight,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FeatureCard } from "@/components/ui/feature-card";
import { TeamCard } from "@/components/ui/team-card";
import { CTABanner } from "@/components/ui/cta-banner";
import { Button } from "@/components/ui/button";
import { FadeIn, SlideUp, Stagger, StaggerItem } from "@/components/motion/reveal";
import { routes } from "@/lib/site";
import type { LucideIcon } from "lucide-react";

// Íconos para los tres pilares de valor (Marketing · Diseño · Tecnología)
const VALUE_ICONS: LucideIcon[] = [TrendingUp, Palette, Cpu];

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("about.meta");
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: routes.about },
    openGraph: { title: t("title"), description: t("description") },
  };
}

export default async function NosotrosPage() {
  const t = await getTranslations("about");

  const paragraphs = t.raw("who.paragraphs") as string[];
  const partnerItems = t.raw("partner.items") as {
    name: string;
    badge: string;
    description: string;
    href: string;
  }[];
  const valuePillars = t.raw("value.pillars") as {
    title: string;
    description: string;
  }[];
  const team = t.raw("team.members") as {
    name: string;
    role: string;
    subrole?: string;
    initials: string;
  }[];

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden border-b border-border">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid opacity-60" />
        <Container className="py-16 lg:py-24">
          <SectionHeading
            as="h1"
            eyebrow={t("hero.eyebrow")}
            title={t("hero.title")}
            subtitle={t("hero.subtitle")}
          />
        </Container>
      </section>

      {/* ===== QUIÉNES SOMOS ===== */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
            <SectionHeading
              as="h2"
              eyebrow={t("who.eyebrow")}
              title={t("who.title")}
              align="left"
            />
            <FadeIn className="flex flex-col gap-5 pt-2">
              {paragraphs.map((p, i) => (
                <p key={i} className="text-base leading-relaxed text-muted">
                  {p}
                </p>
              ))}
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ===== MODELO PARTNER ===== */}
      <section className="border-y border-border bg-surface-2 py-20 sm:py-24">
        <Container>
          <SectionHeading
            as="h2"
            eyebrow={t("partner.eyebrow")}
            title={t("partner.title")}
            subtitle={t("partner.subtitle")}
          />
          <Stagger className="mt-12 grid gap-6 md:grid-cols-2">
            {partnerItems.map((item) => (
              <StaggerItem key={item.name}>
                <div className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-surface p-6 shadow-card transition-shadow hover:shadow-card-hover">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-xl font-bold text-foreground">
                      {item.name}
                    </h3>
                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                      <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
                      {item.badge}
                    </span>
                  </div>
                  <p className="flex-1 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                  <Button href={item.href} variant="ghost" size="sm" className="self-start">
                    {t("partner.viewSolution")}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* ===== PROPUESTA DE VALOR ===== */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            as="h2"
            eyebrow={t("value.eyebrow")}
            title={t("value.title")}
            subtitle={t("value.subtitle")}
          />
          <Stagger className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-3">
            {valuePillars.map((pillar, i) => (
              <StaggerItem key={pillar.title}>
                <FeatureCard
                  title={pillar.title}
                  description={pillar.description}
                  icon={VALUE_ICONS[i] ?? Cpu}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* ===== MISIÓN Y VISIÓN =====
          TODO: validar con dirección — textos borrador en messages/es/about.json
      */}
      <section className="border-y border-border bg-surface-2 py-20 sm:py-24">
        <Container>
          <SectionHeading
            as="h2"
            eyebrow={t("mission.eyebrow")}
            title={t("mission.title")}
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <SlideUp>
              <div className="flex flex-col gap-4 rounded-2xl bg-navy-grad px-6 py-8 text-white shadow-card">
                <span className="inline-flex items-center gap-2">
                  <Target className="h-5 w-5 shrink-0" aria-hidden="true" />
                  <span className="font-display text-sm font-semibold uppercase tracking-widest opacity-80">
                    {t("mission.mission.label")}
                  </span>
                </span>
                <p className="text-base leading-relaxed text-silver">
                  {t("mission.mission.text")}
                </p>
              </div>
            </SlideUp>
            <SlideUp delay={0.1}>
              <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface px-6 py-8 shadow-card">
                <span className="inline-flex items-center gap-2 text-accent">
                  <Eye className="h-5 w-5 shrink-0" aria-hidden="true" />
                  <span className="font-display text-sm font-semibold uppercase tracking-widest">
                    {t("mission.vision.label")}
                  </span>
                </span>
                <p className="text-base leading-relaxed text-muted">
                  {t("mission.vision.text")}
                </p>
              </div>
            </SlideUp>
          </div>
        </Container>
      </section>

      {/* ===== EQUIPO DIRECTIVO ===== */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            as="h2"
            eyebrow={t("team.eyebrow")}
            title={t("team.title")}
            subtitle={t("team.subtitle")}
          />
          <Stagger className="mx-auto mt-12 grid max-w-2xl gap-6 sm:grid-cols-2">
            {team.map((member) => (
              <StaggerItem key={member.name}>
                <TeamCard
                  name={member.name}
                  role={member.role}
                  subrole={member.subrole}
                  initials={member.initials}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* ===== CTA FINAL ===== */}
      <CTABanner
        title={t("cta.title")}
        subtitle={t("cta.subtitle")}
        buttonLabel={t("cta.button")}
        buttonHref={routes.contact}
      />
    </>
  );
}
