// TODO: revisión legal — plantilla base para LLC de EE.UU. operando en Latinoamérica.
// Actualizar sección de cookies de terceros cuando se integre herramienta de analítica.

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/motion/reveal";
import { routes } from "@/lib/site";

type CookieItem = {
  name: string;
  description: string;
};

type LegalSection = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
  footer?: string;
  items?: CookieItem[];
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("legal.cookies.meta");
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: routes.legal.cookies },
    openGraph: { title: t("title"), description: t("description") },
  };
}

export default async function CookiesPage() {
  const t = await getTranslations("legal.cookies");
  const sections = t.raw("sections") as LegalSection[];

  return (
    <section className="py-16 sm:py-20">
      <Container size="narrow">
        <FadeIn>
          {/* Encabezado de página */}
          <div className="mb-10 border-b border-border pb-8">
            <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t("pageTitle")}
            </h1>
            <p className="mt-3 text-sm text-muted">{t("lastUpdated")}</p>
          </div>

          {/* Introducción */}
          <p className="mb-10 text-base leading-relaxed text-muted">{t("intro")}</p>

          {/* Secciones */}
          <div className="flex flex-col gap-10">
            {sections.map((section) => (
              <article key={section.heading}>
                <h2 className="mb-3 font-display text-xl font-bold text-foreground">
                  {section.heading}
                </h2>

                {section.paragraphs?.map((p, i) => (
                  <p key={i} className="mb-3 text-base leading-relaxed text-muted">
                    {p}
                  </p>
                ))}

                {/* Lista de tipos de cookies con nombre destacado */}
                {section.items && section.items.length > 0 && (
                  <dl className="my-4 flex flex-col gap-4">
                    {section.items.map((item) => (
                      <div
                        key={item.name}
                        className="rounded-lg border border-border bg-surface p-4"
                      >
                        <dt className="mb-1 font-display text-sm font-bold text-foreground">
                          {item.name}
                        </dt>
                        <dd className="text-sm leading-relaxed text-muted">
                          {item.description}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}

                {section.list && section.list.length > 0 && (
                  <ul className="my-4 flex flex-col gap-2 pl-5">
                    {section.list.map((item, i) => (
                      <li
                        key={i}
                        className="list-disc text-base leading-relaxed text-muted"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {section.footer && (
                  <p className="mt-4 rounded-lg border border-border bg-surface-2 px-4 py-3 text-sm leading-relaxed text-muted">
                    {section.footer}
                  </p>
                )}
              </article>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
