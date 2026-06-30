"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

/**
 * Proveedor de tema (claro/oscuro) persistente vía next-themes.
 * Default: claro. El toggle persiste la elección del usuario.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
