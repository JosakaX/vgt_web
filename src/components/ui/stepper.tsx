import { SlideUp } from "@/components/motion/reveal";

type Step = {
  title: string;
  description: string;
};

type StepperProps = {
  steps: Step[];
};

/** Proceso por pasos numerados (p. ej. "Cómo trabajamos"). */
export function Stepper({ steps }: StepperProps) {
  return (
    <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => (
        <li key={step.title} className="relative">
          <SlideUp delay={i * 0.08} className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent-solid font-display text-base font-bold text-white">
                {i + 1}
              </span>
              {i < steps.length - 1 ? (
                <span className="hidden h-px flex-1 bg-gradient-to-r from-accent/40 to-transparent lg:block" />
              ) : null}
            </div>
            <h3 className="font-display text-lg font-bold text-foreground">{step.title}</h3>
            <p className="text-sm leading-relaxed text-muted">{step.description}</p>
          </SlideUp>
        </li>
      ))}
    </ol>
  );
}
