import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/ui/project-card";
import { CTABanner } from "@/components/ui/cta-banner";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/reveal";
import { notFound } from "next/navigation";
import { routes, mostrarSoluciones, mostrarPortafolio } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("projects.meta");
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: routes.projects },
    openGraph: { title: t("title"), description: t("description") },
  };
}

export default async function ProjectsPage() {
  // Página oculta hasta publicar los sitios del portafolio.
  if (!mostrarPortafolio) notFound();

  const t = await getTranslations("projects");
  const ts = await getTranslations("services");

  const projects = (
    t.raw("items") as {
      title: string;
      category: string;
      url: string;
      domain: string;
      image?: string;
    }[]
  )
    // Los proyectos de las marcas partner se ocultan hasta firmar los acuerdos.
    .filter(
      (p) =>
        mostrarSoluciones ||
        (!p.url.includes("veritempo") && !p.url.includes("veriscudo")),
    );

  return (
    <>
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

      <section className="py-20 sm:py-24">
        <Container>
          <FadeIn className="mx-auto mb-12 max-w-2xl text-center text-base leading-relaxed text-muted">
            {t("intro")}
          </FadeIn>
          <Stagger className="grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <StaggerItem key={project.title} className="h-full">
                <ProjectCard
                  title={project.title}
                  category={project.category}
                  url={project.url}
                  domain={project.domain}
                  visitLabel={t("visit")}
                  image={project.image}
                  priority={i === 0}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <CTABanner
        title={ts("cta.title")}
        subtitle={ts("cta.subtitle")}
        buttonLabel={ts("cta.button")}
        buttonHref={routes.contact}
      />
    </>
  );
}
