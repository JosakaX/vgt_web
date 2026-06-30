import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { MessageCircle, Phone, Users, Workflow, Bot, Network } from "lucide-react";

import { ServiceLanding } from "@/components/sections/service-landing";
import { routes } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("agentes.meta");
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: routes.agentes },
    openGraph: { title: t("title"), description: t("description") },
  };
}

export default function AgentesPage() {
  return (
    <ServiceLanding
      ns="agentes"
      icons={[MessageCircle, Phone, Users, Workflow, Bot, Network]}
    />
  );
}
