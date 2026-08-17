import type { ReactNode } from "react";

/**
 * Icono social con el efecto "rodillo" de la casa (skill
 * iconos-sociales-animados, aprobado por JosakaX 2026-07-31): en hover el
 * icono visible sale por arriba y su gemelo entra desde abajo, mientras el
 * fondo se llena del acento VGT. Puro CSS (transform + transition), cero JS.
 * El gemelo se genera aquí a partir del MISMO children — no puede
 * desincronizarse. Respeta prefers-reduced-motion.
 */
export function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-border bg-surface text-muted transition-colors duration-300 hover:border-accent-solid hover:bg-accent-solid hover:text-white motion-reduce:transition-none"
    >
      <span
        aria-hidden="true"
        className="transition-transform duration-300 group-hover:-translate-y-9 motion-reduce:transition-none"
      >
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute translate-y-9 transition-transform duration-300 group-hover:translate-y-0 motion-reduce:transition-none"
      >
        {children}
      </span>
    </a>
  );
}
