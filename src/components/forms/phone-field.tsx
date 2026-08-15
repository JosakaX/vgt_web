"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { ChevronDown } from "lucide-react";
// Importación nombrada (no `import * as`): solo entran al bundle las banderas usadas.
import {
  AD, AO, AR, AT, BE, BO, BR, CA, CH, CL, CO, CR, CV, DE, DO, EC, ES, FR,
  GB, GT, HN, IE, IT, LU, MX, MZ, NI, NL, PA, PE, PL, PT, PY, RO, SV, US,
  UY, VE,
} from "country-flag-icons/react/3x2";
import { cn } from "@/lib/utils";

const FLAGS = {
  AD, AO, AR, AT, BE, BO, BR, CA, CH, CL, CO, CR, CV, DE, DO, EC, ES, FR,
  GB, GT, HN, IE, IT, LU, MX, MZ, NI, NL, PA, PE, PL, PT, PY, RO, SV, US,
  UY, VE,
};

/** ISO 3166-1 alfa-2 + indicativo. El nombre del país y la bandera derivan del código. */
const DIAL_CODES: Record<string, string> = {
  AD: "+376", AO: "+244", AR: "+54", AT: "+43", BE: "+32", BO: "+591",
  BR: "+55", CA: "+1", CH: "+41", CL: "+56", CO: "+57", CR: "+506",
  CV: "+238", DE: "+49", DO: "+1", EC: "+593", ES: "+34", FR: "+33",
  GB: "+44", GT: "+502", HN: "+504", IE: "+353", IT: "+39", LU: "+352",
  MX: "+52", MZ: "+258", NI: "+505", NL: "+31", PA: "+507", PE: "+51",
  PL: "+48", PT: "+351", PY: "+595", RO: "+40", SV: "+503", US: "+1",
  UY: "+598", VE: "+58",
};

/** Siempre al tope de la lista: mercados principales de VGT. El resto ordena por nombre. */
const PINNED = ["VE", "US", "PT", "ES", "MX"];

/** País preseleccionado según el idioma activo del sitio. */
const DEFAULT_BY_LOCALE: Record<string, string> = { es: "VE", en: "US", pt: "PT" };

/** 🇻🇪 a partir de "VE" — evita mantener una tabla de emojis. */
function flagEmoji(code: string): string {
  return String.fromCodePoint(
    ...[...code].map((ch) => 0x1f1e6 + ch.charCodeAt(0) - 65),
  );
}

type PhoneFieldProps = {
  /** id del input de teléfono (el select de país deriva `${id}-pais`). */
  id: string;
  label: string;
  /** Etiqueta accesible del selector de país/indicativo. */
  dialLabel: string;
  placeholder?: string;
  /** Valor combinado ("+1 305 1234567") — pensado para RHF Controller. */
  value: string;
  onChange: (value: string) => void;
};

/**
 * Campo de teléfono con bandera + indicativo, al estilo del LeadForm de
 * Veritempo (técnica de Stripe Elements): el <select> nativo va encima,
 * estirado e invisible, y debajo dibujamos la bandera SVG + el código.
 * Conserva teclado, lector de pantalla y el selector nativo del móvil,
 * y la bandera se ve en Windows (donde no existen los emojis de bandera).
 */
export function PhoneField({
  id,
  label,
  dialLabel,
  placeholder,
  value,
  onChange,
}: PhoneFieldProps) {
  const locale = useLocale();
  const [country, setCountry] = useState(DEFAULT_BY_LOCALE[locale] ?? "VE");
  const [national, setNational] = useState("");

  // Reset externo (p. ej. reset() de RHF tras enviar): valor vacío limpia el número.
  useEffect(() => {
    if (!value) setNational("");
  }, [value]);

  // Nombres de país localizados por el propio navegador: sin copy duplicado en messages/.
  const countries = useMemo(() => {
    let nameOf: (code: string) => string;
    try {
      const dn = new Intl.DisplayNames([locale], { type: "region" });
      nameOf = (code) => dn.of(code) ?? code;
    } catch {
      nameOf = (code) => code;
    }
    const rest = Object.keys(DIAL_CODES)
      .filter((code) => !PINNED.includes(code))
      .map((code) => ({ code, name: nameOf(code), dial: DIAL_CODES[code] }))
      .sort((a, b) => a.name.localeCompare(b.name, locale));
    const pinned = PINNED.map((code) => ({
      code,
      name: nameOf(code),
      dial: DIAL_CODES[code],
    }));
    return [...pinned, ...rest];
  }, [locale]);

  const Flag = FLAGS[country as keyof typeof FLAGS];

  function emit(nextCountry: string, nextNational: string) {
    const n = nextNational.trim();
    // El indicativo solo viaja si hay número: un "+58" solitario no es un teléfono.
    onChange(n ? `${DIAL_CODES[nextCountry]} ${n}` : "");
  }

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
      </label>
      <div className="grid grid-cols-[auto_1fr] gap-2">
        <div className="relative">
          <select
            id={`${id}-pais`}
            aria-label={dialLabel}
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              emit(e.target.value, national);
            }}
            className="peer absolute inset-0 h-full w-full cursor-pointer opacity-0"
          >
            {countries.map((c) => (
              <option key={c.code} value={c.code}>
                {`${flagEmoji(c.code)} ${c.name} ${c.dial}`}
              </option>
            ))}
          </select>
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none flex h-11 items-center gap-2 rounded-lg border border-border bg-surface px-3 text-sm text-foreground transition-colors",
              "peer-focus-visible:border-accent peer-focus-visible:ring-1 peer-focus-visible:ring-accent",
            )}
          >
            <Flag className="h-[12px] w-[18px] shrink-0 rounded-[2px]" />
            <span className="tabular-nums">{DIAL_CODES[country]}</span>
            <ChevronDown className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
          </span>
        </div>
        <input
          id={id}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          maxLength={14}
          placeholder={placeholder}
          value={national}
          onChange={(e) => {
            setNational(e.target.value);
            emit(country, e.target.value);
          }}
          className="h-11 w-full rounded-lg border border-border bg-surface px-4 text-sm text-foreground outline-none placeholder:text-muted transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
        />
      </div>
    </div>
  );
}
