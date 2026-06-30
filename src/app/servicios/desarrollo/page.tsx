import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Globe, ShoppingCart, Smartphone, LayoutDashboard, Plug, Wrench } from "lucide-react";

import { ServiceLanding } from "@/components/sections/service-landing";
import { routes } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("desarrollo.meta");
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: routes.desarrollo },
    openGraph: { title: t("title"), description: t("description") },
  };
}

export default function DesarrolloPage() {
  return (
    <ServiceLanding
      ns="desarrollo"
      icons={[Globe, ShoppingCart, Smartphone, LayoutDashboard, Plug, Wrench]}
    />
  );
}
