import type { LucideIcon } from "lucide-react";

type FeatureCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
};

/** Card de pilar/beneficio con icono (p. ej. "Por qué VGT"). */
export function FeatureCard({ title, description, icon: Icon }: FeatureCardProps) {
  return (
    <div className="flex flex-col gap-3">
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy-grad text-white shadow-sm">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <h3 className="font-display text-lg font-bold text-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-muted">{description}</p>
    </div>
  );
}
