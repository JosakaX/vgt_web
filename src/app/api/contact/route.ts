import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { incomingSchema } from "@/lib/schemas";
import { createQuoContact } from "@/lib/quo";
import { sendLeadNotification, sendLeadAcknowledgement } from "@/lib/email";
import { saveLead } from "@/lib/leads";
import { originAllowed, clientIp, makeRateLimiter } from "@/lib/api-guard";

// El formulario dispara correos y escrituras: mismo blindaje que /api/chat.
const rateLimited = makeRateLimiter({ perIp: 5, global: 30 });

/**
 * Endpoint de los formularios de contacto y cotización.
 *
 * Flujo:
 * 1. Parsea el JSON del body; 400 si es inválido.
 * 2. Valida con el schema discriminado (type: "contact" | "quote"); 422 si falla.
 * 3. Crea el contacto en Quo (teléfono de la empresa) — si falla, no bloquea.
 * 4. Registra la solicitud con console.info y devuelve 200.
 *
 * TODO: integrar email (Resend) y CRM.
 */
export async function POST(request: Request) {
  // 0. Guardas: origen del propio sitio (fail-closed) + rate limit.
  if (!originAllowed(request.headers.get("origin"))) {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }
  if (rateLimited(clientIp(request))) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

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

  // 3. Integraciones (ninguna bloquea el alta del lead): lead a Supabase +
  //    contacto en Quo + aviso a info@ + acuse al lead en su idioma.
  const locale = (await cookies()).get("NEXT_LOCALE")?.value ?? "es";
  await Promise.all([
    saveLead(parsed.data),
    createQuoContact(parsed.data),
    sendLeadNotification(parsed.data),
    sendLeadAcknowledgement(parsed.data, locale),
  ]);

  // 4. Log + respuesta exitosa.
  // No registramos PII ni texto del usuario en logs (evita exponer datos
  // personales e inyección de logs). `type` proviene de un enum controlado.
  console.info("[contact] nueva solicitud recibida", { type: parsed.data.type });

  return NextResponse.json({ ok: true }, { status: 200 });
}
