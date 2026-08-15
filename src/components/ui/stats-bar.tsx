import { Container } from "@/components/ui/container";
import { SlideUp } from "@/components/motion/reveal";

type Stat = {
  value: string;
  label: string;
};

type StatsBarProps = {
  stats: Stat[];
};

/** Franja navy con indicadores/métricas en blanco. */
export function StatsBar({ stats }: StatsBarProps) {
  return (
    <section className="bg-navy-grad py-12 sm:py-14">
      <Container>
        <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <SlideUp key={stat.label} delay={i * 0.08} className="text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="flex flex-col gap-1">
                <span className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                  {stat.value}
                </span>
                <span aria-hidden="true" className="text-sm text-silver">
                  {stat.label}
                </span>
              </dd>
            </SlideUp>
          ))}
        </dl>
      </Container>
    </section>
  );
}
