"use client";

/**
 * Widget de Josaka, el asistente de VGT (decisión D-008 + Build 1 §13).
 * Estructura calcada del patrón Aimi/Alliance: botón flotante con avatar y
 * punto "en línea", globo de saludo que salta solo, cabecera con cara y
 * nombre, avatar junto a cada mensaje y chips de arranque que desaparecen
 * al primer mensaje. El saludo lo escribe el widget (no gasta API).
 */
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Bot, Send, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { routes } from "@/lib/site";

type ChatMessage = { role: "user" | "assistant"; content: string };

/**
 * Rutas que Josaka menciona en texto plano ("/cotizacion") y el widget
 * convierte en enlace inline + botón de acción bajo el mensaje (§13).
 */
const CHAT_ROUTES = [
  { token: "/cotizacion", href: routes.quote, labelKey: "ctaQuote" },
  { token: "/contacto", href: routes.contact, labelKey: "ctaContact" },
] as const;

/**
 * Chips de arranque: los 6 servicios. El click INICIA la conversación sobre
 * ese servicio con Josaka (no navega) — Josaka responde breve y ofrece los
 * botones de /cotizacion y /contacto (pedido del CEO 2026-08-17).
 */
const SERVICE_CHIP_KEYS = [
  "marketing",
  "branding",
  "desarrollo",
  "agentes",
  "consultoria",
  "datos",
] as const;

/**
 * Convierte la respuesta del asistente en nodos React: **negritas** reales y
 * las rutas conocidas como enlaces. Sin HTML crudo — React escapa el resto.
 */
function renderAssistantText(content: string): React.ReactNode[] {
  const pattern = /(\*\*[^*]+\*\*|\/cotizacion|\/contacto)/g;
  return content.split(pattern).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    const route = CHAT_ROUTES.find((r) => r.token === part);
    if (route) {
      return (
        <Link key={i} href={route.href} className="font-semibold text-accent underline">
          {part}
        </Link>
      );
    }
    return part;
  });
}

/**
 * Avatar PROVISIONAL del agente (SVG inline: icono Bot sobre navy) hasta que
 * JosakaX elija la imagen definitiva. Los PNG de Josaka siguen disponibles en
 * /public/agente/ (familia -disco) para restaurarlos en un minuto.
 */
function JosakaAvatar({ size, className }: { size: 24 | 32 | 40 | 56; className?: string }) {
  const box = { 24: "h-6 w-6", 32: "h-8 w-8", 40: "h-10 w-10", 56: "h-14 w-14" }[size];
  const icon = { 24: "h-3.5 w-3.5", 32: "h-4 w-4", 40: "h-5 w-5", 56: "h-7 w-7" }[size];
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid shrink-0 place-items-center rounded-full bg-navy-grad text-white ring-1 ring-white/25",
        box,
        className,
      )}
    >
      <Bot className={icon} aria-hidden="true" />
    </span>
  );
}

export function ChatWidget() {
  const t = useTranslations("common.chat");
  const tMenu = useTranslations("common.nav.servicesMenu");
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [balloon, setBalloon] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // El globo de saludo salta solo a los 2 s, una vez, mientras el chat esté cerrado.
  useEffect(() => {
    const timer = setTimeout(() => setBalloon(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, loading, open]);

  function openChat() {
    setBalloon(false);
    setOpen(true);
  }

  /**
   * Al saltar a /cotizacion o /contacto: guarda la conversación para que el
   * formulario la precargue (el cliente no repite lo que ya escribió) y
   * cierra el panel para que la página nueva se vea.
   */
  function goToForm() {
    if (messages.length > 0) {
      const transcript = messages
        .map((m) => `${m.role === "user" ? "Cliente" : "Josaka"}: ${m.content}`)
        .join("\n");
      // El primer servicio mencionado en la conversación preselecciona el
      // "Servicio de interés" del formulario (las claves coinciden con el enum).
      let servicio: (typeof SERVICE_CHIP_KEYS)[number] | undefined;
      for (const m of messages) {
        servicio = SERVICE_CHIP_KEYS.find((key) => m.content.includes(tMenu(key)));
        if (servicio) break;
      }
      try {
        sessionStorage.setItem("vgt-chat-transcript", transcript.slice(0, 4000));
        if (servicio) sessionStorage.setItem("vgt-chat-servicio", servicio);
      } catch {
        // Almacenamiento bloqueado: el formulario simplemente abre vacío.
      }
    }
    setOpen(false);
  }

  async function send(text?: string) {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const history = [...messages, { role: "user" as const, content }];
    setMessages(history);
    setInput("");
    setLoading(true);
    setFailed(false);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Historial acotado: el backend valida máx. 20 mensajes de ≤1000 chars.
        // El locale del sitio fija el idioma en que responde el agente.
        body: JSON.stringify({ messages: history.slice(-12), locale }),
      });
      const data: { ok: boolean; reply?: string } = await res.json();
      if (data.ok && data.reply) {
        setMessages([...history, { role: "assistant", content: data.reply }]);
      } else {
        setFailed(true);
      }
    } catch {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Globo de saludo (aparece solo, como Aimi) */}
      {balloon && !open && (
        <div className="fixed bottom-24 right-4 z-50 flex w-[calc(100vw-5rem)] max-w-xs items-start gap-2.5 rounded-2xl rounded-br-md border border-border bg-surface p-3 shadow-card-hover animate-fade-in">
          <JosakaAvatar size={32} className="mt-0.5" />
          <button type="button" onClick={openChat} className="text-left text-sm text-foreground">
            {t("greeting").split("\n").map((line, i) => (
              <span key={i} className={i === 0 ? "font-semibold" : undefined}>
                {line}{" "}
              </span>
            ))}
          </button>
          <button
            type="button"
            onClick={() => setBalloon(false)}
            aria-label={t("balloonClose")}
            className="shrink-0 rounded-full p-0.5 text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      )}

      {open && (
        <div
          className="fixed bottom-24 right-4 z-50 flex h-[calc(100dvh-7.5rem)] max-h-[46rem] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-card-hover animate-fade-in"
          role="dialog"
          aria-label={t("name")}
        >
          {/* Cabecera con avatar + punto en línea (patrón Aimi) */}
          <div className="flex items-center justify-between gap-3 border-b border-border bg-navy-grad px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="relative shrink-0">
                <JosakaAvatar size={40} />
                <span
                  className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-success"
                  title={t("online")}
                />
              </span>
              <div>
                <p className="font-display text-sm font-bold leading-tight text-white">{t("name")}</p>
                <p className="text-xs text-white/70">{t("subtitle")}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t("closeLabel")}
              className="rounded-full p-1 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
            <Bubble role="assistant">
              {t("greeting").split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  {i === 0 && <br />}
                </span>
              ))}
            </Bubble>
            {messages.map((m, i) =>
              m.role === "user" ? (
                <Bubble key={i} role="user">
                  {m.content}
                </Bubble>
              ) : (
                <div key={i} className="space-y-2">
                  <Bubble role="assistant">{renderAssistantText(m.content)}</Bubble>
                  <ChatActions content={m.content} onAction={goToForm} />
                </div>
              ),
            )}
            {loading && (
              <div className="flex items-end gap-2">
                <JosakaAvatar size={24} />
                <p className="text-xs text-muted">{t("typing")}</p>
              </div>
            )}
            {failed && (
              <div className="rounded-xl border border-border bg-surface-2 p-3 text-xs text-muted">
                {t("error")}{" "}
                <Link href={routes.contact} className="font-semibold text-accent underline">
                  {t("contactLink")}
                </Link>
              </div>
            )}
            {/* Chips de arranque: los 6 servicios; el click abre la conversación sobre ese servicio */}
            {messages.length === 0 && !loading && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SERVICE_CHIP_KEYS.map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => void send(tMenu(key))}
                    className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
                  >
                    {tMenu(key)}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              void send();
            }}
            className="flex items-center gap-2 border-t border-border p-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("placeholder")}
              maxLength={1000}
              className="h-10 w-full rounded-full border border-border bg-background px-4 text-sm text-foreground outline-none placeholder:text-muted focus:border-accent"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label={t("send")}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent-solid text-white transition-colors hover:bg-accent-solid-hover disabled:opacity-50"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </div>
      )}

      {/* Botón flotante: la cara de Josaka con punto en línea; X cuando está abierto */}
      <button
        type="button"
        onClick={() => (open ? setOpen(false) : openChat())}
        aria-label={open ? t("closeLabel") : t("openLabel")}
        className="fixed bottom-6 right-4 z-50 grid h-14 w-14 place-items-center rounded-full shadow-card transition-all hover:shadow-card-hover"
      >
        {open ? (
          <span className="grid h-14 w-14 place-items-center rounded-full bg-accent-solid text-white transition-colors hover:bg-accent-solid-hover">
            <X className="h-6 w-6" aria-hidden="true" />
          </span>
        ) : (
          <span className="relative">
            <JosakaAvatar size={56} />
            <span
              className="absolute bottom-0.5 right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-success"
              title={t("online")}
            />
          </span>
        )}
      </button>
    </>
  );
}

/** Botones de acción bajo el mensaje cuando Josaka menciona /cotizacion o /contacto. */
function ChatActions({ content, onAction }: { content: string; onAction: () => void }) {
  const t = useTranslations("common.chat");
  const mentioned = CHAT_ROUTES.filter((r) => content.includes(r.token));
  if (mentioned.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2 pl-8">
      {mentioned.map((r) => (
        <Link
          key={r.token}
          href={r.href}
          onClick={onAction}
          className="rounded-full bg-accent-solid px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-accent-solid-hover"
        >
          {t(r.labelKey)}
        </Link>
      ))}
    </div>
  );
}

function Bubble({ role, children }: { role: "user" | "assistant"; children: React.ReactNode }) {
  if (role === "user") {
    return (
      <div className="flex justify-end">
        <p className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-md bg-accent-solid px-3.5 py-2 text-sm text-white">
          {children}
        </p>
      </div>
    );
  }
  return (
    <div className="flex items-end gap-2">
      <JosakaAvatar size={24} />
      <p className="max-w-[80%] whitespace-pre-wrap rounded-2xl rounded-bl-md bg-surface-2 px-3.5 py-2 text-sm text-foreground">
        {children}
      </p>
    </div>
  );
}
