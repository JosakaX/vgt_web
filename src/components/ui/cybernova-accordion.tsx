"use client";

import { Scale, Activity, ShieldCheck, FileSearch, Target, BookOpen } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";

type CategoryItem = {
  title: string;
  content: string[];
};

type CyberNovaAccordionProps = {
  items: CategoryItem[];
};

/** Thin wrapper that injects CyberNova category icons into the Accordion client component. */
const CATEGORY_ICONS: LucideIcon[] = [
  Scale,       // GRC
  Activity,    // Monitoreo, Detección y Respuesta
  ShieldCheck, // Ciberdefensa / Blue Team
  FileSearch,  // Análisis Forense Digital (DFIR)
  Target,      // Operaciones Ofensivas / Red Team
  BookOpen,    // e-Learning
];

export function CyberNovaAccordion({ items }: CyberNovaAccordionProps) {
  const enriched = items.map((item, i) => ({
    ...item,
    icon: CATEGORY_ICONS[i],
  }));

  return <Accordion items={enriched} defaultOpen={0} />;
}
