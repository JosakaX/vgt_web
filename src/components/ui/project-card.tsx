import { Globe, ArrowUpRight } from "lucide-react";

type ProjectCardProps = {
  title: string;
  category: string;
  /** URL del sitio en vivo. */
  url: string;
  /** Dominio mostrado (sin protocolo). */
  domain: string;
  /** Texto accesible/visible para el enlace (i18n). */
  visitLabel: string;
};

/**
 * Tarjeta de proyecto del portafolio enlazada al sitio en vivo.
 * Visual con gradiente + icono mientras no haya captura real del sitio
 * (// TODO: reemplazar por screenshot/mockup de cada proyecto).
 */
export function ProjectCard({ title, category, url, domain, visitLabel }: ProjectCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${title} — ${visitLabel} (${domain})`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-card-hover"
    >
      {/* Visual placeholder */}
      <div className="relative grid aspect-[16/10] place-items-center overflow-hidden bg-navy-grad">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-20" />
        <Globe
          className="h-14 w-14 text-white/90 transition-transform duration-300 group-hover:scale-110"
          aria-hidden="true"
        />
      </div>
      <div className="flex flex-col gap-1.5 p-5">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent">
          {category}
        </span>
        <h3 className="font-display text-lg font-bold text-foreground">{title}</h3>
        <span className="mt-1 inline-flex items-center gap-1 text-sm text-muted transition-colors group-hover:text-accent">
          {domain}
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </a>
  );
}
