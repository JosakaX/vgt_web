import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
});

/**
 * Endpoint placeholder de suscripción a newsletter.
 * Valida, registra en el log del servidor y devuelve 200.
 * TODO: integrar proveedor real (Resend, Mailchimp, HubSpot, etc.).
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Correo inválido" },
      { status: 422 },
    );
  }

  // TODO: persistir / enviar a CRM o servicio de email
  console.info("[newsletter] nueva suscripción:", parsed.data.email);

  return NextResponse.json({ ok: true }, { status: 200 });
}
