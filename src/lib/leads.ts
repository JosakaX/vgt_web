/**
 * Persistencia de leads en Supabase (proyecto VGT, tabla public.leads con RLS
 * activo y sin políticas: solo el servidor escribe con la llave secreta).
 * Misma tabla que usará Josaka en el Build 1 — el formulario y el agente
 * comparten casa. Nunca lanza: un fallo aquí no tumba el alta del lead.
 */
import type { IncomingPayload } from "./schemas";

export async function saveLead(lead: IncomingPayload): Promise<boolean> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) return false; // sin credenciales, la web funciona igual

  // El mensaje completo del visitante SIEMPRE se guarda en `necesidad`.
  const necesidad = [
    "objetivo" in lead ? lead.objetivo : undefined,
    lead.mensaje,
  ]
    .filter(Boolean)
    .join("\n\n");

  const row = {
    nombre: lead.nombre,
    empresa: lead.empresa || null,
    contacto: lead.email,
    necesidad: necesidad || "(sin mensaje)",
    categoria: "servicio",
    origen: "formulario-web",
    tipo: lead.type,
    email: lead.email,
    telefono: lead.telefono || null,
    pais: lead.pais || null,
    servicio: lead.servicio,
    empleados: lead.empleados || null,
    modulos: "modulos" in lead ? lead.modulos || null : null,
  };

  try {
    const res = await fetch(`${url}/rest/v1/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: key,
        Authorization: `Bearer ${key}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify(row),
    });
    if (!res.ok) {
      console.error("[leads] Supabase respondió error", { status: res.status });
    }
    return res.ok;
  } catch (error) {
    console.error("[leads] error de red", error);
    return false;
  }
}
