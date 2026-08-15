"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Check, ChevronDown, Globe } from "lucide-react";
import { languages } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Selector de idioma. ES activo; EN/PT-PT deshabilitados con tooltip "Próximamente"
 * (preparado para Fase 2 — Portugal/UE).
 */
export function LangSwitcher() {
  const t = useTranslations("common.lang");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`${t("label")}: ES`}
        className="inline-flex h-10 items-center gap-1.5 rounded-full border border-border bg-surface px-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
      >
        <Globe className="h-4 w-4" aria-hidden="true" />
        <span className="uppercase">ES</span>
        <ChevronDown
          className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl border border-border bg-surface p-1 shadow-card"
        >
          {languages.map((lang) => (
            <div
              key={lang.code}
              role="menuitem"
              aria-disabled={!lang.enabled}
              className={cn(
                "flex items-center justify-between rounded-lg px-3 py-2 text-sm",
                lang.enabled
                  ? "font-semibold text-foreground"
                  : "cursor-not-allowed text-muted",
              )}
              title={!lang.enabled ? t("soon") : undefined}
            >
              <span>{lang.label}</span>
              {lang.enabled ? (
                <Check className="h-4 w-4 text-accent" aria-hidden="true" />
              ) : (
                <span className="rounded-full bg-surface-2 px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted">
                  {t("soon")}
                </span>
              )}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
