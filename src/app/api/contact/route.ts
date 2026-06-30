import { NextResponse } from "next/server";
import { incomingSchema } from "@/lib/schemas";

/**
 * Endpoint placeholder para los formularios de contacto y cotización.
 *
 * Flujo:
 * 1. Parsea el JSON del body; 400 si es inválido.
 * 2. Valida con el schema discriminado (type: "contact" | "quote"); 422 si falla.
 * 3. Registra la solicitud con console.info y devuelve 200.
 *
 * TODO: integrar CRM/email (Resend, HubSpot, etc.)
 */
export async function POST(request: Request) {
  // 1. Parseo del JSON
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "JSON inválido" },
      { status: 400 },
    );
  }

  // 2. Validación con zod
  const parsed = incomingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Datos inválidos",
        details: parsed.error.flatten(),
      },
      { status: 422 },
    );
  }

  // 3. Log + respuesta exitosa
  const { type, email, nombre } = parsed.data;
  console.info(`[contact] nueva solicitud (${type}) de ${nombre} <${email}>`);

  return NextResponse.json({ ok: true }, { status: 200 });
}
