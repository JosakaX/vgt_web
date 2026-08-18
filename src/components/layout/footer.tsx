import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Globe, Mail, MapPin, Phone, Linkedin, Instagram, Facebook, Youtube } from "lucide-react";

import { Logo } from "./logo";
import { Container } from "@/components/ui/container";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { SocialIcon } from "@/components/ui/social-icon";
import { WhatsappIcon } from "@/components/ui/whatsapp-icon";
import { siteConfig, routes, mostrarSoluciones, mostrarPortafolio } from "@/lib/site";

export async function Footer() {
  const t = await getTranslations("common");
  const year = new Date().getFullYear();

  const phones = [
    { ...siteConfig.phones.us, note: t("contactInfo.phones.usNote") },
    { ...siteConfig.phones.pt1, note: t("contactInfo.phones.ptNote") },
    { ...siteConfig.phones.pt2, note: t("contactInfo.phones.ptNote") },
    { ...siteConfig.phones.ve, note: t("contactInfo.phones.veNote") },
  ];

  const cols = [
    {
      title: t("footer.cols.services"),
      links: [
        // Las soluciones de partners salen del footer hasta firmar los acuerdos.
        ...(mostrarSoluciones
          ? [
              { label: t("footer.links.veritempo"), href: routes.veritempo },
              { label: t("footer.links.veriscudo"), href: routes.veriscudo },
            ]
          : []),
        { label: t("footer.links.allServices"), href: routes.services },
      ],
    },
    {
      title: t("footer.cols.company"),
      links: [
        { label: t("footer.links.about"), href: routes.about },
        // El portafolio sale del footer hasta publicar sus sitios.
        ...(mostrarPortafolio
          ? [{ label: t("footer.links.projects"), href: routes.projects }]
          : []),
        { label: t("footer.links.contactPage"), href: routes.contact },
        { label: t("footer.links.quote"), href: routes.quote },
      ],
    },
    {
      title: t("footer.cols.legal"),
      links: [
        { label: t("footer.links.privacy"), href: routes.legal.privacy },
        { label: t("footer.links.terms"), href: routes.legal.terms },
        { label: t("footer.links.cookies"), href: routes.legal.cookies },
      ],
    },
  ];

  const socials = [
    { icon: Linkedin, href: siteConfig.social.linkedin, label: t("footer.social.linkedin") },
    { icon: Instagram, href: siteConfig.social.instagram, label: t("footer.social.instagram") },
    { icon: Facebook, href: siteConfig.social.facebook, label: t("footer.social.facebook") },
    { icon: Youtube, href: siteConfig.social.youtube, label: t("footer.social.youtube") },
  ];

  return (
    <footer className="border-t border-border bg-surface-2">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-8">
          {/* Marca + newsletter */}
          <div className="flex flex-col gap-5">
            <Logo />
            <p className="max-w-xs text-sm text-muted">{t("brand.tagline")}</p>
            <div className="max-w-xs">
              <p className="mb-2 text-sm font-semibold text-foreground">
                {t("footer.newsletter.title")}
              </p>
              <NewsletterForm />
            </div>
          </div>

          {/* Columnas de enlaces */}
          {cols.map((col) => (
            <nav key={col.title} aria-label={col.title} className="flex flex-col gap-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
                {col.title}
              </h2>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted transition-colors hover:text-accent"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Datos de contacto */}
        <div className="mt-12 grid gap-4 border-t border-border pt-8 text-sm text-muted sm:grid-cols-2 lg:grid-cols-4">
          <a
            href={siteConfig.url}
            className="flex items-center gap-2 transition-colors hover:text-accent"
          >
            <Globe className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
            {t("contactInfo.web")}
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-2 transition-colors hover:text-accent"
          >
            <Mail className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
            {t("contactInfo.email")}
          </a>
          {phones.map((p) => (
            <span key={p.href} className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <a href={p.href} className="transition-colors hover:text-accent">
                {p.display} · {p.note}
              </a>
              {p.whatsapp && (
                <a
                  href={p.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t("contactInfo.phones.whatsapp")}: ${p.display}`}
                  className="text-accent transition-colors hover:text-foreground"
                >
                  <WhatsappIcon className="h-4 w-4" />
                </a>
              )}
            </span>
          ))}
          <a
            href={siteConfig.address.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-2 transition-colors hover:text-accent sm:col-span-2"
          >
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
            <span>
              {siteConfig.address.street}, {siteConfig.address.city} ·{" "}
              {t("contactInfo.hours")}
            </span>
          </a>
        </div>

        {/* Social + nota partner + copyright */}
        <div className="mt-10 flex flex-col gap-6 border-t border-border pt-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm font-medium text-foreground">{t("brand.partnerNote")}</p>
            <div className="flex items-center gap-2">
              {/* Efecto "rodillo" de la casa (skill iconos-sociales-animados) */}
              {socials.map((s) => (
                <SocialIcon key={s.label} href={s.href} label={s.label}>
                  <s.icon className="h-4 w-4" aria-hidden="true" />
                </SocialIcon>
              ))}
            </div>
          </div>
          <p className="text-xs text-muted">
            © {year} {siteConfig.legalName}. {t("footer.rights")}
          </p>
        </div>
      </Container>
    </footer>
  );
}
