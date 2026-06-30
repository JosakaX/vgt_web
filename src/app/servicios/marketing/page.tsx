import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Target, Share2, FileText, Megaphone, Mail, BarChart3 } from "lucide-react";

import { ServiceLanding } from "@/components/sections/service-landing";
import { routes } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("marketing.meta");
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: routes.marketing },
    openGraph: { title: t("title"), description: t("description") },
  };
}

export default function MarketingPage() {
  return (
    <ServiceLanding
      ns="marketing"
      icons={[Target, Share2, FileText, Megaphone, Mail, BarChart3]}
    />
  );
}
