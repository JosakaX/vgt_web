import { Linkedin } from "lucide-react";

type TeamCardProps = {
  name: string;
  /** Cargo ejecutivo (p. ej. "Founder & CEO"). */
  role: string;
  /** Título/área secundario opcional (p. ej. "Director de Innovación..."). */
  subrole?: string;
  /** Iniciales para el avatar placeholder (// TODO: reemplazar por foto real). */
  initials: string;
  linkedin?: string;
};

/** Tarjeta de miembro del equipo directivo. Avatar placeholder con iniciales. */
export function TeamCard({ name, role, subrole, initials, linkedin }: TeamCardProps) {
  return (
    <article className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface p-7 text-center shadow-card">
      <div className="grid h-24 w-24 place-items-center rounded-full bg-navy-grad font-display text-2xl font-bold text-white shadow-sm">
        {initials}
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="font-display text-lg font-bold text-foreground">{name}</h3>
        <p className="text-sm font-semibold text-accent">{role}</p>
        {subrole ? <p className="text-sm text-muted">{subrole}</p> : null}
      </div>
      {linkedin ? (
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`LinkedIn de ${name}`}
          className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
        >
          <Linkedin className="h-4 w-4" aria-hidden="true" />
        </a>
      ) : null}
    </article>
  );
}
