"use client";

import { Button } from "@/components/ui/button";

/**
 * Botón "Pedir una demo" (/contacto): precarga el mensaje del formulario con
 * la frase de demo (vía evento, el formulario escucha) y baja hasta él.
 * La demo la agenda VGT: el cliente solo pide y el aviso llega por correo.
 */
export function DemoRequestButton({ label }: { label: string }) {
  function pedirDemo() {
    window.dispatchEvent(new Event("vgt:pedir-demo"));
    document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <Button
      variant="accent"
      size="md"
      className="relative w-full justify-center"
      onClick={pedirDemo}
    >
      {label}
    </Button>
  );
}
