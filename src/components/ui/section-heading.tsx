import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SlideUp } from "@/components/motion/reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  className?: string;
  /** Nivel semántico del encabezado (por defecto h2). */
  as?: "h1" | "h2" | "h3";
};

/** Encabezado de sección reutilizable, accesible y con animación de entrada. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <SlideUp
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl text-left",
        className,
      )}
    >
      {eyebrow ? (
        <span className="text-sm font-semibold uppercase tracking-widest text-accent">
          {eyebrow}
        </span>
      ) : null}
      <Tag className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {title}
      </Tag>
      {subtitle ? (
        <p className="text-base leading-relaxed text-muted sm:text-lg">{subtitle}</p>
      ) : null}
    </SlideUp>
  );
}
