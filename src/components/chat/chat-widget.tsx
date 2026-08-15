"use client";

/**
 * Widget del chatbot de ventas (decisión D-008).
 * Canal de comunicación flotante: responde sobre los servicios y deriva al
 * formulario. Si el API falla o no hay llave, degrada a ofrecer /contacto.
 */
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { MessageCircle, Send, X } from "lucide-react";

import { routes } from "@/lib/site";

type ChatMessage = { role: "user" | "assistant"; content: string };

export function ChatWidget() {
  const t = useTranslations("common.chat");
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, loading, open]);

  async function send() {
    const content = input.trim();
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
        body: JSON.stringify({ messages: history.slice(-12) }),
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
      {open && (
        <div
          className="fixed bottom-24 right-4 z-50 flex max-h-[70dvh] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-card-hover animate-fade-in"
          role="dialog"
          aria-label={t("title")}
        >
          <div className="flex items-start justify-between gap-3 border-b border-border bg-navy-grad px-4 py-3">
            <div>
              <p className="font-display text-sm font-bold text-white">{t("title")}</p>
              <p className="text-xs text-white/70">{t("subtitle")}</p>
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
            <Bubble role="assistant">{t("greeting")}</Bubble>
            {messages.map((m, i) => (
              <Bubble key={i} role={m.role}>
                {m.content}
              </Bubble>
            ))}
            {loading && <p className="text-xs text-muted">{t("typing")}</p>}
            {failed && (
              <div className="rounded-xl border border-border bg-surface-2 p-3 text-xs text-muted">
                {t("error")}{" "}
                <Link href={routes.contact} className="font-semibold text-accent underline">
                  {t("contactLink")}
                </Link>
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

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? t("closeLabel") : t("openLabel")}
        className="fixed bottom-6 right-4 z-50 grid h-14 w-14 place-items-center rounded-full bg-accent-solid text-white shadow-card transition-all hover:bg-accent-solid-hover hover:shadow-card-hover"
      >
        {open ? (
          <X className="h-6 w-6" aria-hidden="true" />
        ) : (
          <MessageCircle className="h-6 w-6" aria-hidden="true" />
        )}
      </button>
    </>
  );
}

function Bubble({ role, children }: { role: "user" | "assistant"; children: React.ReactNode }) {
  const isUser = role === "user";
  return (
    <div className={isUser ? "flex justify-end" : "flex justify-start"}>
      <p
        className={
          isUser
            ? "max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-md bg-accent-solid px-3.5 py-2 text-sm text-white"
            : "max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-bl-md bg-surface-2 px-3.5 py-2 text-sm text-foreground"
        }
      >
        {children}
      </p>
    </div>
  );
}
