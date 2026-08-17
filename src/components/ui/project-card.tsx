import Image from "next/image";
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
  /** Ruta pública de la miniatura del sitio (ej. /projects/ohgda.webp). */
  image?: string;
  /** true para la primera tarjeta visible: precarga la imagen (LCP). */
  priority?: boolean;
};

/**
 * Tarjeta de proyecto del portafolio enlazada al sitio en vivo.
 * Con `image` muestra la captura real del sitio; sin ella cae al visual
 * de gradiente + icono.
 */
export function ProjectCard({
  title,
  category,
  url,
  domain,
  visitLabel,
  image,
  priority,
}: ProjectCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${title} — ${visitLabel} (${domain})`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-card-hover"
    >
      {image ? (
        <div className="relative aspect-[16/10] overflow-hidden border-b border-border">
          <Image
            src={image}
            alt=""
            fill
            priority={priority}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.04]"
          />
        </div>
      ) : (
        <div className="relative grid aspect-[16/10] place-items-center overflow-hidden bg-navy-grad">
          <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-20" />
          <Globe
            className="h-14 w-14 text-white/90 transition-transform duration-300 group-hover:scale-110"
            aria-hidden="true"
          />
        </div>
      )}
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
