import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Newspaper } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { routes } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("blog.meta");
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: routes.blog },
    openGraph: { title: t("title"), description: t("description") },
    // Aún sin contenido publicado: no indexar hasta el lanzamiento.
    robots: { index: false, follow: true },
  };
}

export default async function BlogPage() {
  const t = await getTranslations("blog.comingSoon");

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-6 py-24 text-center">
      <span className="grid h-16 w-16 place-items-center rounded-2xl bg-navy-grad text-white shadow-sm">
        <Newspaper className="h-8 w-8" aria-hidden="true" />
      </span>
      <span className="inline-flex items-center rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-accent">
        {t("badge")}
      </span>
      <h1 className="max-w-2xl font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {t("title")}
      </h1>
      <p className="max-w-xl text-muted">{t("subtitle")}</p>
      <div className="w-full max-w-sm">
        <NewsletterForm />
      </div>
      <Button href={routes.contact} variant="outline">
        {t("cta")}
      </Button>
    </Container>
  );
}
