import { Clock, ShieldCheck } from "lucide-react";

type Ally = {
  name: string;
  kind: "veritempo" | "cybernova";
};

type LogoCloudProps = {
  title: string;
  allies?: Ally[];
};

/**
 * Barra de confianza de aliados tecnológicos.
 * Muestra los logos/marcas de los PARTNERS (Veritempo, CyberNova),
 * NO clientes finales. Usa lockups de marca hasta tener los SVG oficiales.
 */
export function LogoCloud({
  title,
  allies = [
    { name: "Veritempo", kind: "veritempo" },
    { name: "CyberNova", kind: "cybernova" },
  ],
}: LogoCloudProps) {
  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-sm font-medium uppercase tracking-widest text-muted">{title}</p>
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
        {allies.map((ally) => {
          const Icon = ally.kind === "veritempo" ? Clock : ShieldCheck;
          return (
            <div
              key={ally.name}
              className="inline-flex items-center gap-2.5 rounded-2xl border border-border bg-surface px-6 py-3.5 shadow-sm"
            >
              <Icon
                className={
                  ally.kind === "veritempo"
                    ? "h-6 w-6 text-accent"
                    : "h-6 w-6 text-accent-2"
                }
                aria-hidden="true"
              />
              <span className="font-display text-lg font-bold text-foreground">
                {ally.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
