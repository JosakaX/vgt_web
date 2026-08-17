"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  ChevronDown,
  Menu,
  ShieldCheck,
  Clock,
  Target,
  PenTool,
  Monitor,
  Bot,
  Lightbulb,
  BarChart3,
  X,
} from "lucide-react";

import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { LangSwitcher } from "./lang-switcher";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { routes, mostrarSoluciones } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const t = useTranslations("common.nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cierra el menú móvil al navegar
  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  // Bloquea el scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navLinks = [
    { href: routes.home, label: t("home") },
    { href: routes.about, label: t("about") },
    { href: routes.projects, label: t("projects") },
    { href: routes.contact, label: t("contact") },
  ];

  const serviceLinks = [
    {
      href: routes.marketing,
      label: t("servicesMenu.marketing"),
      desc: t("servicesMenu.marketingDesc"),
      icon: Target,
    },
    {
      href: routes.branding,
      label: t("servicesMenu.branding"),
      desc: t("servicesMenu.brandingDesc"),
      icon: PenTool,
    },
    {
      href: routes.desarrollo,
      label: t("servicesMenu.desarrollo"),
      desc: t("servicesMenu.desarrolloDesc"),
      icon: Monitor,
    },
    {
      href: routes.agentes,
      label: t("servicesMenu.agentes"),
      desc: t("servicesMenu.agentesDesc"),
      icon: Bot,
    },
    {
      href: routes.consultoria,
      label: t("servicesMenu.consultoria"),
      desc: t("servicesMenu.consultoriaDesc"),
      icon: Lightbulb,
    },
    {
      href: routes.datos,
      label: t("servicesMenu.datos"),
      desc: t("servicesMenu.datosDesc"),
      icon: BarChart3,
    },
    {
      href: routes.veritempo,
      label: t("servicesMenu.veritempo"),
      desc: t("servicesMenu.veritempoDesc"),
      icon: Clock,
    },
    {
      href: routes.veriscudo,
      label: t("servicesMenu.veriscudo"),
      desc: t("servicesMenu.veriscudoDesc"),
      icon: ShieldCheck,
    },
    // Las soluciones de partners salen del menú hasta firmar los acuerdos.
  ].filter(
    (link) =>
      mostrarSoluciones ||
      (link.href !== routes.veritempo && link.href !== routes.veriscudo),
  );

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "border-border bg-background/80 shadow-nav backdrop-blur-md"
          : "border-transparent bg-background/0",
      )}
    >
      {/* Salto de accesibilidad al contenido */}
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
      >
        {t("skipToContent")}
      </a>

      <Container>
        <div className="flex h-20 items-center justify-between gap-2 sm:gap-4">
          <Logo />

          {/* Navegación desktop */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
            <NavItem href={routes.home} active={isActive(routes.home)}>
              {t("home")}
            </NavItem>
            <NavItem href={routes.about} active={isActive(routes.about)}>
              {t("about")}
            </NavItem>

            {/* Dropdown de servicios */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <Link
                href={routes.services}
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  isActive(routes.services)
                    ? "text-accent"
                    : "text-foreground hover:text-accent",
                )}
                aria-haspopup="true"
                aria-expanded={servicesOpen}
              >
                {t("services")}
                <ChevronDown
                  className={cn("h-4 w-4 transition-transform", servicesOpen && "rotate-180")}
                  aria-hidden="true"
                />
              </Link>

              {servicesOpen ? (
                <div className="absolute left-1/2 top-full -translate-x-1/2 pt-2">
                  <div className="grid w-[38rem] max-w-[calc(100vw-2rem)] grid-cols-2 gap-1 overflow-hidden rounded-2xl border border-border bg-surface p-2 shadow-card">
                    {serviceLinks.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-surface-2"
                      >
                        <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent">
                          <s.icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span className="flex flex-col">
                          <span className="text-sm font-semibold text-foreground">
                            {s.label}
                          </span>
                          <span className="text-xs text-muted">{s.desc}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <NavItem href={routes.projects} active={isActive(routes.projects)}>
              {t("projects")}
            </NavItem>
            <NavItem href={routes.contact} active={isActive(routes.contact)}>
              {t("contact")}
            </NavItem>
          </nav>

          {/* Acciones derecha */}
          <div className="flex shrink-0 items-center gap-2">
            <div className="hidden sm:block">
              <LangSwitcher />
            </div>
            <ThemeToggle />
            <div className="hidden lg:block">
              <Button href={routes.contact} variant="accent" size="md">
                {t("talk")}
              </Button>
            </div>

            {/* Hamburguesa móvil */}
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-foreground lg:hidden"
              aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Panel móvil */}
      {mobileOpen ? (
        <div className="lg:hidden">
          <nav
            className="border-t border-border bg-background px-5 pb-8 pt-4"
            aria-label="Móvil"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "rounded-xl px-4 py-3 text-base font-medium",
                    isActive(l.href)
                      ? "bg-surface-2 text-accent"
                      : "text-foreground hover:bg-surface-2",
                  )}
                >
                  {l.label}
                </Link>
              ))}

              <div className="mt-2 rounded-xl bg-surface-2 p-2">
                <p className="px-2 py-1 text-xs font-semibold uppercase tracking-wide text-muted">
                  {t("services")}
                </p>
                {serviceLinks.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-foreground hover:bg-background"
                  >
                    <s.icon className="h-5 w-5 text-accent" aria-hidden="true" />
                    <span className="text-sm font-medium">{s.label}</span>
                  </Link>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <LangSwitcher />
                <Button href={routes.contact} variant="accent" size="md" className="flex-1">
                  {t("talk")}
                </Button>
              </div>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function NavItem({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-full px-4 py-2 text-sm font-medium transition-colors",
        active ? "text-accent" : "text-foreground hover:text-accent",
      )}
    >
      {children}
    </Link>
  );
}
