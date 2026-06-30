import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LayoutDashboard, Database, Target, LineChart, FileBarChart, Sparkles } from "lucide-react";

import { ServiceLanding } from "@/components/sections/service-landing";
import { routes } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("datos.meta");
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: routes.datos },
    openGraph: { title: t("title"), description: t("description") },
  };
}

export default function DatosPage() {
  return (
    <ServiceLanding
      ns="datos"
      icons={[LayoutDashboard, Database, Target, LineChart, FileBarChart, Sparkles]}
    />
  );
}
