import type { Metadata } from "next";
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
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FeatureCard } from "@/components/ui/feature-card";
import { ServiceCard } from "@/components/ui/service-card";
import { StatsBar } from "@/components/ui/stats-bar";
import { CTABanner } from "@/components/ui/cta-banner";
import { SlideUp, Stagger, StaggerItem } from "@/components/motion/reveal";
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

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("services.meta");
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: routes.services },
    openGraph: { title: t("title"), description: t("description") },
  };
}

export default async function ServicesPage() {
  const t = await getTranslations("services");

  const services = t.raw("agency.items") as {
    key: string;
    name: string;
    category: string;
    summary: string;
    cta: string;
    href: string;
  }[];
  const stats = t.raw("stats.items") as { value: string; label: string }[];
  const whyus = t.raw("whyus.items") as { title: string; description: string }[];

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="border-b border-border bg-surface-2">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            as="h1"
            eyebrow={t("hero.eyebrow")}
            title={t("hero.title")}
            subtitle={t("hero.subtitle")}
          />
        </Container>
      </section>

      {/* ===== SERVICIOS DE AGENCIA ===== */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow={t("agency.eyebrow")}
            title={t("agency.title")}
            subtitle={t("agency.subtitle")}
          />
          <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <StaggerItem key={service.key}>
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
        </Container>
      </section>

      {/* ===== STATS ===== */}
      <StatsBar stats={stats} />

      {/* ===== SOLUCIONES ESPECIALIZADAS ===== */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow={t("solutions.eyebrow")}
            title={t("solutions.title")}
            subtitle={t("solutions.subtitle")}
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <SlideUp>
              <ServiceCard
                name={t("solutions.myintelli.name")}
                category={t("solutions.myintelli.category")}
                summary={t("solutions.myintelli.summary")}
                href={routes.myintelli}
                cta={t("solutions.myintelli.cta")}
                icon={Clock}
                accent="blue"
              />
            </SlideUp>
            <SlideUp delay={0.1}>
              <ServiceCard
                name={t("solutions.cybernova.name")}
                category={t("solutions.cybernova.category")}
                summary={t("solutions.cybernova.summary")}
                href={routes.cybernova}
                cta={t("solutions.cybernova.cta")}
                icon={ShieldCheck}
                accent="teal"
              />
            </SlideUp>
          </div>
        </Container>
      </section>

      {/* ===== POR QUÉ ELEGIRNOS ===== */}
      <section className="border-t border-border bg-surface-2 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow={t("whyus.eyebrow")}
            title={t("whyus.title")}
            subtitle={t("whyus.subtitle")}
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
