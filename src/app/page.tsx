import { getTranslations } from "next-intl/server";
import {
  Target,
  PenTool,
  Monitor,
  Bot,
  Lightbulb,
  BarChart3,
  ShieldCheck,
  Clock,
  Cpu,
  Users,
  BadgeCheck,
  Globe2,
  Sparkles,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceCard } from "@/components/ui/service-card";
import { FeatureCard } from "@/components/ui/feature-card";
import { ProjectCard } from "@/components/ui/project-card";
import { IndustryChip } from "@/components/ui/industry-chip";
import { StatsBar } from "@/components/ui/stats-bar";
import { CTABanner } from "@/components/ui/cta-banner";
import { FadeIn, SlideUp, Stagger, StaggerItem } from "@/components/motion/reveal";
import { routes } from "@/lib/site";

const SERVICE_ICONS: Record<string, LucideIcon> = {
  marketing: Target,
  branding: PenTool,
  desarrollo: Monitor,
  agentes: Bot,
  consultoria: Lightbulb,
  datos: BarChart3,
};

const WHY_ICONS: LucideIcon[] = [Target, Sparkles, Cpu, Users, BadgeCheck, Globe2];

export default async function HomePage() {
  const t = await getTranslations("home");
  const ts = await getTranslations("services");
  const tp = await getTranslations("projects");

  const services = ts.raw("agency.items") as {
    key: string;
    name: string;
    category: string;
    summary: string;
    cta: string;
    href: string;
  }[];
  const stats = ts.raw("stats.items") as { value: string; label: string }[];
  const whyus = ts.raw("whyus.items") as { title: string; description: string }[];
  const industries = t.raw("industries.items") as string[];
  const projects = (
    tp.raw("items") as {
      title: string;
      category: string;
      url: string;
      domain: string;
      image?: string;
    }[]
  ).slice(0, 3);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid opacity-60" />
        <Container className="grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div className="flex flex-col items-start gap-6">
            <SlideUp>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-accent">
                <span className="h-2 w-2 rounded-full bg-accent-2" aria-hidden="true" />
                {t("hero.badge")}
              </span>
            </SlideUp>
            <SlideUp delay={0.05}>
              <h1 className="font-display text-3xl font-extrabold uppercase leading-[1.1] tracking-tight text-foreground min-[420px]:text-4xl sm:text-5xl lg:text-6xl">
                {t("hero.title")}
              </h1>
            </SlideUp>
            <SlideUp delay={0.1}>
              <p className="max-w-xl text-lg leading-relaxed text-muted">
                {t("hero.subtitle")}
              </p>
            </SlideUp>
            <SlideUp delay={0.15} className="flex flex-wrap gap-3">
              <Button href={routes.services} variant="accent" size="lg">
                {t("hero.ctaPrimary")}
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Button>
              <Button href={routes.contact} variant="outline" size="lg">
                {t("hero.ctaSecondary")}
              </Button>
            </SlideUp>
          </div>

          {/* Visual de marca VGT */}
          <FadeIn delay={0.2} className="relative">
            <div className="relative mx-auto aspect-square w-full max-w-md">
              <div className="absolute inset-0 rounded-[2rem] bg-hero-grad shadow-card-hover" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <span className="font-display text-7xl font-extrabold tracking-tight text-white sm:text-8xl">
                  VGT
                </span>
                <div className="flex items-center gap-3" aria-hidden="true">
                  <span className="h-px w-12 bg-white/40" />
                  <span className="h-2 w-2 rounded-full bg-white/70" />
                  <span className="h-px w-12 bg-white/40" />
                </div>
                <span className="text-sm font-medium uppercase tracking-[0.25em] text-white/90">
                  Valadares Global Tech
                </span>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ===== SERVICIOS (agencia) ===== */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow={t("servicesPreview.eyebrow")}
            title={t("servicesPreview.title")}
            subtitle={t("servicesPreview.subtitle")}
          />
          <Stagger className="mt-12 grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <StaggerItem key={service.key} className="h-full">
                <ServiceCard
                  name={service.name}
                  category={service.category}
                  summary={service.summary}
                  href={service.href}
                  cta={service.cta}
                  icon={SERVICE_ICONS[service.key] ?? Cpu}
                />
              </StaggerItem>
            ))}
          </Stagger>
          <FadeIn className="mt-10 flex justify-center">
            <Button href={routes.services} variant="ghost">
              {t("servicesPreview.viewAll")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </FadeIn>
        </Container>
      </section>

      {/* ===== STATS ===== */}
      <StatsBar stats={stats} />

      {/* ===== PROYECTOS (preview) ===== */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow={t("projectsPreview.eyebrow")}
            title={t("projectsPreview.title")}
            subtitle={t("projectsPreview.subtitle")}
          />
          <Stagger className="mt-12 grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <StaggerItem key={project.title} className="h-full">
                <ProjectCard
                  title={project.title}
                  category={project.category}
                  url={project.url}
                  domain={project.domain}
                  visitLabel={tp("visit")}
                  image={project.image}
                />
              </StaggerItem>
            ))}
          </Stagger>
          <FadeIn className="mt-10 flex justify-center">
            <Button href={routes.projects} variant="ghost">
              {tp("viewAll")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </FadeIn>
        </Container>
      </section>

      {/* ===== SOLUCIONES ESPECIALIZADAS (Veritempo / Veriscudo) ===== */}
      <section className="border-y border-border bg-surface-2 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Soluciones"
            title={t("solutions.heading")}
            subtitle={t("solutions.subheading")}
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <SlideUp className="h-full">
              <ServiceCard
                name={t("solutions.veritempo.name")}
                category={t("solutions.veritempo.category")}
                summary={t("solutions.veritempo.summary")}
                href={routes.veritempo}
                cta={t("solutions.veritempo.cta")}
                icon={Clock}
                accent="blue"
              />
            </SlideUp>
            <SlideUp delay={0.1} className="h-full">
              <ServiceCard
                name={t("solutions.veriscudo.name")}
                category={t("solutions.veriscudo.category")}
                summary={t("solutions.veriscudo.summary")}
                href={routes.veriscudo}
                cta={t("solutions.veriscudo.cta")}
                icon={ShieldCheck}
                accent="teal"
              />
            </SlideUp>
          </div>
        </Container>
      </section>

      {/* ===== POR QUÉ ELEGIRNOS ===== */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow={ts("whyus.eyebrow")}
            title={ts("whyus.title")}
            subtitle={ts("whyus.subtitle")}
          />
          <Stagger className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {whyus.map((item, i) => (
              <StaggerItem key={item.title}>
                <FeatureCard
                  title={item.title}
                  description={item.description}
                  icon={WHY_ICONS[i] ?? BadgeCheck}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* ===== SECTORES ===== */}
      <section className="border-t border-border bg-surface-2 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Industrias"
            title={t("industries.heading")}
            subtitle={t("industries.subheading")}
          />
          <FadeIn className="mt-10 flex flex-wrap justify-center gap-3">
            {industries.map((industry) => (
              <IndustryChip key={industry} label={industry} />
            ))}
          </FadeIn>
        </Container>
      </section>

      {/* ===== CTA FINAL ===== */}
      <CTABanner
        title={t("finalCta.title")}
        subtitle={t("finalCta.subtitle")}
        buttonLabel={t("finalCta.button")}
        buttonHref={routes.contact}
      />
    </>
  );
}
