import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {
  Clock,
  KeyRound,
  UserCheck,
  CalendarCheck,
  Utensils,
  Fingerprint,
  Smartphone,
  Monitor,
  TrendingUp,
  Timer,
  ShieldCheck,
  LineChart,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ModuleCard } from "@/components/ui/module-card";
import { FeatureCard } from "@/components/ui/feature-card";
import { StatBlock } from "@/components/ui/stat-block";
import { IndustryChip } from "@/components/ui/industry-chip";
import { CTABanner } from "@/components/ui/cta-banner";
import { Button } from "@/components/ui/button";
import { FadeIn, SlideUp, Stagger, StaggerItem } from "@/components/motion/reveal";
import { routes } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("veritempo.meta");
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: routes.veritempo },
    openGraph: {
      title: t("title"),
      description: t("description"),
    },
  };
}

const MODULE_ICONS: LucideIcon[] = [Clock, KeyRound, UserCheck, CalendarCheck, Utensils];
const MARKING_ICONS: LucideIcon[] = [Fingerprint, Smartphone, Monitor];
const BENEFIT_ICONS: LucideIcon[] = [TrendingUp, Timer, ShieldCheck, LineChart];

export default async function VeritempoPage() {
  const t = await getTranslations("veritempo");

  const stats = t.raw("stats") as { value: string; label: string }[];
  const moduleItems = t.raw("modules.items") as { title: string; description: string }[];
  const markingItems = t.raw("marking.items") as {
    title: string;
    description: string;
    features: string[];
  }[];
  const integrationItems = t.raw("integrations.items") as string[];
  const benefitItems = t.raw("benefits.items") as { title: string; description: string }[];

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden border-b border-border bg-surface-2 py-20 sm:py-28">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid opacity-40" />
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="flex flex-col items-start gap-6">
              <SlideUp>
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-accent">
                  <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                  {t("hero.badge")}
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
                <Button href="#modulos" variant="outline" size="lg">
                  {t("hero.ctaSecondary")}
                </Button>
              </SlideUp>
            </div>

            {/* Visual abstracto Veritempo */}
            <FadeIn delay={0.2} className="relative hidden lg:block">
              <div className="relative mx-auto aspect-square w-full max-w-md">
                <div className="absolute inset-0 rounded-[2rem] bg-hero-grad shadow-card-hover" />
                <div
                  aria-hidden="true"
                  className="absolute -left-6 top-10 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md"
                >
                  <Clock className="h-8 w-8 text-white" aria-hidden="true" />
                </div>
                <div
                  aria-hidden="true"
                  className="absolute -right-4 bottom-12 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md"
                >
                  <Fingerprint className="h-8 w-8 text-white" aria-hidden="true" />
                </div>
                <div className="absolute inset-0 grid place-items-center">
                  <span className="font-display text-5xl font-extrabold tracking-tight text-white/90">
                    Veritempo
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ===== MÉTRICAS ===== */}
      <section className="py-16 sm:py-20">
        <Container>
          <FadeIn>
            <p className="mb-10 text-center text-sm font-semibold uppercase tracking-widest text-muted">
              {t("statsIntro")}
            </p>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
              {stats.map((stat) => (
                <StatBlock key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ===== MÓDULOS ===== */}
      <section
        id="modulos"
        className="border-t border-border bg-surface-2 py-20 sm:py-24"
      >
        <Container>
          <SectionHeading
            eyebrow={t("modules.eyebrow")}
            title={t("modules.title")}
            subtitle={t("modules.subtitle")}
          />
          <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {moduleItems.map((mod, i) => (
              <StaggerItem key={mod.title}>
                <ModuleCard
                  title={mod.title}
                  description={mod.description}
                  icon={MODULE_ICONS[i] ?? Clock}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* ===== MÉTODOS DE MARCAJE ===== */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow={t("marking.eyebrow")}
            title={t("marking.title")}
            subtitle={t("marking.subtitle")}
          />
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {markingItems.map((item, i) => {
              const Icon = MARKING_ICONS[i] ?? Fingerprint;
              return (
                <SlideUp key={item.title} delay={i * 0.1}>
                  <div className="flex h-full flex-col gap-5 rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-card">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <div className="flex flex-col gap-1.5">
                      <h3 className="font-display text-lg font-bold text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted">{item.description}</p>
                    </div>
                    <ul className="mt-auto flex flex-col gap-2">
                      {item.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex gap-2.5 text-sm leading-relaxed text-muted"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-2"
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </SlideUp>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ===== INTEGRACIONES ===== */}
      <section className="border-y border-border bg-surface-2 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow={t("integrations.eyebrow")}
            title={t("integrations.title")}
            subtitle={t("integrations.subtitle")}
          />
          <FadeIn className="mt-10 flex flex-wrap justify-center gap-3">
            {integrationItems.map((label) => (
              <IndustryChip key={label} label={label} />
            ))}
          </FadeIn>
        </Container>
      </section>

      {/* ===== BENEFICIOS ===== */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow={t("benefits.eyebrow")}
            title={t("benefits.title")}
            subtitle={t("benefits.subtitle")}
          />
          <Stagger className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {benefitItems.map((benefit, i) => (
              <StaggerItem key={benefit.title}>
                <FeatureCard
                  title={benefit.title}
                  description={benefit.description}
                  icon={BENEFIT_ICONS[i] ?? TrendingUp}
                />
              </StaggerItem>
            ))}
          </Stagger>
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
