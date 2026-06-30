import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/site";

export default async function NotFound() {
  const t = await getTranslations("common");
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-6 py-24 text-center">
      <span className="font-display text-7xl font-extrabold text-gradient">404</span>
      <h1 className="font-display text-2xl font-bold text-foreground">
        Página no encontrada
      </h1>
      <p className="max-w-md text-muted">
        La página que buscas no existe o fue movida. Vuelve al inicio o explora nuestros
        servicios.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button href={routes.home} variant="accent">
          {t("nav.home")}
        </Button>
        <Button href={routes.services} variant="outline">
          {t("nav.services")}
        </Button>
      </div>
    </Container>
  );
}
