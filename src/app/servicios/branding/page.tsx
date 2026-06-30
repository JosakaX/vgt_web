import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Sparkles, PenTool, Palette, BookOpen, MessageSquare, LayoutTemplate } from "lucide-react";

import { ServiceLanding } from "@/components/sections/service-landing";
import { routes } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("branding.meta");
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: routes.branding },
    openGraph: { title: t("title"), description: t("description") },
  };
}

export default function BrandingPage() {
  return (
    <ServiceLanding
      ns="branding"
      icons={[Sparkles, PenTool, Palette, BookOpen, MessageSquare, LayoutTemplate]}
    />
  );
}
