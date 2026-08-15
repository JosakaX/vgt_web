import type { LucideIcon } from "lucide-react";

type ModuleCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
};

/** Card de módulo de producto (p. ej. los módulos de Veritempo). */
export function ModuleCard({ title, description, icon: Icon }: ModuleCardProps) {
  return (
    <div className="group flex h-full flex-col gap-4 rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-card">
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-110">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <h3 className="font-display text-lg font-bold text-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-muted">{description}</p>
    </div>
  );
}
