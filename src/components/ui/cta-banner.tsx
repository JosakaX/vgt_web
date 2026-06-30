import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SlideUp } from "@/components/motion/reveal";

type CTABannerProps = {
  title: string;
  subtitle?: string;
  buttonLabel: string;
  buttonHref: string;
};

/** Banda CTA en navy con título y botón de acento. */
export function CTABanner({ title, subtitle, buttonLabel, buttonHref }: CTABannerProps) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SlideUp className="relative overflow-hidden rounded-3xl bg-navy-grad px-6 py-14 text-center shadow-card sm:px-12 sm:py-16">
          {/* Detalle decorativo */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/30 blur-3xl"
          />
          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-5">
            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {title}
            </h2>
            {subtitle ? <p className="text-base text-silver">{subtitle}</p> : null}
            <Button href={buttonHref} variant="accent" size="lg" className="mt-2">
              {buttonLabel}
            </Button>
          </div>
        </SlideUp>
      </Container>
    </section>
  );
}
