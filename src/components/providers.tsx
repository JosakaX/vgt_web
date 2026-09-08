"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

/**
 * Proveedor de tema (oscuro/claro) persistente vía next-themes.
 * Default: OSCURO (orden del CEO, 2026-09-08) — el sitio abre en oscuro y el
 * visitante puede pasar a claro con el toggle; su elección queda guardada.
 * `enableSystem={false}`: no seguimos la preferencia del sistema, siempre
 * arrancamos en oscuro.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
