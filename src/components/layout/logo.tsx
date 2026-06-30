import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Muestra el wordmark + tagline junto al monograma. */
  showWordmark?: boolean;
  href?: string;
};

/**
 * Lockup de marca VGT. Monograma en navy + wordmark.
 * Adapta perfectamente a tema claro/oscuro usando tokens de color.
 *
 * NOTA: cuando esté el SVG final en /public/logo/logo-vgt.svg, se puede
 * sustituir el contenido por <img src="/logo/logo-vgt.svg" .../> sin tocar
 * los consumidores (Navbar/Footer).
 */
export function Logo({ className, showWordmark = true, href = "/" }: LogoProps) {
  const content = (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span
        aria-hidden="true"
        className="grid h-10 w-10 place-items-center rounded-xl bg-navy-grad font-display text-sm font-extrabold tracking-tight text-white shadow-sm"
      >
        VGT
      </span>
      {showWordmark ? (
        <span className="flex flex-col leading-none">
          <span className="font-display text-base font-bold tracking-tight text-foreground">
            VALADARES GLOBAL TECH
          </span>
          <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
            Marketing · Diseño · Tecnología
          </span>
        </span>
      ) : null}
    </span>
  );

  if (href) {
    return (
      <Link
        href={href}
        // Si se muestra el wordmark, el texto visible ya provee el nombre accesible
        // (evita el desajuste label/content de WCAG). Sin wordmark, etiquetamos.
        aria-label={showWordmark ? undefined : "Valadares Global Tech — Inicio"}
        className="shrink-0"
      >
        {content}
      </Link>
    );
  }
  return content;
}
