import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Gauge, Lightbulb, Map, Workflow, Layers, Users } from "lucide-react";

import { ServiceLanding } from "@/components/sections/service-landing";
import { routes } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("consultoria.meta");
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: routes.consultoria },
    openGraph: { title: t("title"), description: t("description") },
  };
}

export default function ConsultoriaPage() {
  return (
    <ServiceLanding
      ns="consultoria"
      icons={[Gauge, Lightbulb, Map, Workflow, Layers, Users]}
    />
  );
}
