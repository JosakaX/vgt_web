"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Retardo en segundos (útil para escalonar listas). */
  delay?: number;
  /** Solo animar la primera vez que entra en viewport. */
  once?: boolean;
};

const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const slideVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

/** Aparición con fundido sutil al entrar en viewport. */
export function FadeIn({ children, className, delay = 0, once = true }: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={fadeVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Aparición deslizando hacia arriba al entrar en viewport. */
export function SlideUp({ children, className, delay = 0, once = true }: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={slideVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Contenedor que escalona la animación de sus hijos directos.
 * Combínalo con <Stagger.Item> para listas/grids.
 */
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export function Stagger({ children, className, once = true }: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.15 }}
    >
      {children}
    </motion.div>
  );
}

// Export nombrado (no .Item compuesto): el patrón Stagger.Item se rompe al
// cruzar el límite server→client, ya que las propiedades del proxy se pierden.
export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={slideVariants}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
