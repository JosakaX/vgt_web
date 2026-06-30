"use client";

import { useState, useId } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type AccordionItem = {
  title: string;
  /** Lista de puntos o párrafos. */
  content: string[];
  icon?: LucideIcon;
};

type AccordionProps = {
  items: AccordionItem[];
  /** Permite mantener varios abiertos a la vez. */
  allowMultiple?: boolean;
  /** Índice abierto por defecto. */
  defaultOpen?: number;
};

/** Acordeón accesible (usado, p. ej., para las categorías de CyberNova). */
export function Accordion({ items, allowMultiple = false, defaultOpen }: AccordionProps) {
  const [open, setOpen] = useState<number[]>(
    typeof defaultOpen === "number" ? [defaultOpen] : [],
  );
  const baseId = useId();

  const toggle = (i: number) => {
    setOpen((prev) => {
      const isOpen = prev.includes(i);
      if (allowMultiple) {
        return isOpen ? prev.filter((x) => x !== i) : [...prev, i];
      }
      return isOpen ? [] : [i];
    });
  };

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = open.includes(i);
        const Icon = item.icon;
        const headingId = `${baseId}-h-${i}`;
        const panelId = `${baseId}-p-${i}`;
        return (
          <div
            key={item.title}
            className={cn(
              "overflow-hidden rounded-2xl border bg-surface transition-colors",
              isOpen ? "border-accent/40" : "border-border",
            )}
          >
            <h3>
              <button
                type="button"
                id={headingId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className="flex w-full items-center gap-4 px-5 py-4 text-left sm:px-6"
              >
                {Icon ? (
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                ) : null}
                <span className="flex-1 font-display text-base font-bold text-foreground sm:text-lg">
                  {item.title}
                </span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-muted transition-transform duration-300",
                    isOpen && "rotate-180 text-accent",
                  )}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={headingId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <ul className="flex flex-col gap-2 px-5 pb-5 pl-5 sm:px-6 sm:pb-6 sm:pl-20">
                    {item.content.map((point, j) => (
                      <li
                        key={j}
                        className="flex gap-2.5 text-sm leading-relaxed text-muted"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
