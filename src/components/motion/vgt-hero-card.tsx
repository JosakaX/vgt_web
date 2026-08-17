"use client";

/**
 * Card de marca VGT del hero — versión VIVA (decisión CEO 2026-08-17):
 * - Tilt 3D: el card se inclina siguiendo el puntero (desktop).
 * - Flotación suave constante (también en móvil, sin permisos ni giroscopio).
 * - Latido en la línea-punto-línea.
 * - Texto rotativo con los 6 servicios: la oferta completa en los primeros
 *   segundos, sin scrollear.
 * Respeta prefers-reduced-motion: sin tilt ni loops, texto fijo.
 */

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useTranslations } from "next-intl";

const SERVICE_KEYS = [
  "marketing",
  "branding",
  "desarrollo",
  "agentes",
  "consultoria",
  "datos",
] as const;

export function VgtHeroCard() {
  const tMenu = useTranslations("common.nav.servicesMenu");
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Tilt 3D con resorte: el card persigue al puntero con inercia suave.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
    stiffness: 150,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), {
    stiffness: 150,
    damping: 18,
  });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  // Rotativo de servicios (uno cada 2.6 s).
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const timer = setInterval(
      () => setI((v) => (v + 1) % SERVICE_KEYS.length),
      2600,
    );
    return () => clearInterval(timer);
  }, [reduced]);

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-md"
      style={{ perspective: 900 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY }}
        animate={reduced ? undefined : { y: [0, -8, 0] }}
        transition={
          reduced
            ? undefined
            : { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }
        className="absolute inset-0"
      >
        <div className="absolute inset-0 rounded-[2rem] bg-hero-grad shadow-card-hover" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <span className="font-display text-7xl font-extrabold tracking-tight text-white sm:text-8xl">
            VGT
          </span>
          <div className="flex items-center gap-3" aria-hidden="true">
            <span className="h-px w-12 bg-white/40" />
            <motion.span
              className="h-2 w-2 rounded-full bg-white/70"
              animate={
                reduced
                  ? undefined
                  : { scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }
              }
              transition={
                reduced
                  ? undefined
                  : { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }
            />
            <span className="h-px w-12 bg-white/40" />
          </div>
          <span className="text-sm font-medium uppercase tracking-[0.25em] text-white/90">
            Valadares Global Tech
          </span>
          {/* Decorativo (aria-hidden): los lectores de pantalla ya tienen la
              lista real de servicios en el menú y la sección de abajo. */}
          <div className="mt-1 h-6 overflow-hidden" aria-hidden="true">
            <AnimatePresence mode="wait">
              <motion.span
                key={SERVICE_KEYS[i]}
                initial={reduced ? false : { y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={reduced ? undefined : { y: -14, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="inline-block text-base font-semibold text-white"
              >
                {tMenu(SERVICE_KEYS[i])}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
