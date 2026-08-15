import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ServiceCardProps = {
  name: string;
  category: string;
  summary: string;
  href: string;
  cta: string;
  icon: LucideIcon;
  /** Color de acento del producto. */
  accent?: "blue" | "teal";
};

/** Card grande de solución/servicio (Home, hub de servicios). */
export function ServiceCard({
  name,
  category,
  summary,
  href,
  cta,
  icon: Icon,
  accent = "blue",
}: ServiceCardProps) {
  const accentClasses =
    accent === "teal"
      ? "bg-accent-2/10 text-accent-2"
      : "bg-accent/10 text-accent";

  return (
    <Link
      href={href}
      className="group relative flex h-full flex-col gap-5 overflow-hidden rounded-3xl border border-border bg-surface p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-card-hover sm:p-8"
    >
      <div
        className={cn(
          "grid h-14 w-14 place-items-center rounded-2xl transition-transform duration-300 group-hover:scale-110",
          accentClasses,
        )}
      >
        <Icon className="h-7 w-7" aria-hidden="true" />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-widest text-muted">
          {category}
        </span>
        <h3 className="font-display text-2xl font-bold text-foreground">{name}</h3>
        <p className="text-sm leading-relaxed text-muted">{summary}</p>
      </div>

      <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
        {cta}
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}
