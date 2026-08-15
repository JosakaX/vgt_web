import { NextResponse } from "next/server";
import { z } from "zod";
import { originAllowed, clientIp, makeRateLimiter } from "@/lib/api-guard";

const schema = z.object({
  email: z.string().max(320).email(),
});

// Cada suscriptor es un lead de email marketing: va a la Audience de Resend
// ("VGT Newsletter") desde donde se enviarán los broadcasts.
const rateLimited = makeRateLimiter({ perIp: 5, global: 30 });

export async function POST(request: Request) {
  if (!originAllowed(request.headers.get("origin"))) {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }
  if (rateLimited(clientIp(request))) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Correo inválido" }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (apiKey && audienceId) {
    try {
      const res = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ email: parsed.data.email, unsubscribed: false }),
      });
      if (!res.ok) {
        console.error("[newsletter] Resend respondió error", { status: res.status });
      }
    } catch (error) {
      console.error("[newsletter] error de red", error);
    }
  }

  // Sin PII en logs; al suscriptor siempre se le confirma con 200.
  console.info("[newsletter] nueva suscripción procesada");
  return NextResponse.json({ ok: true }, { status: 200 });
}
