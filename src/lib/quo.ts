/**
 * Integración con Quo (OpenPhone) — crea un contacto por cada lead recibido,
 * para que al llamar aparezca su nombre y empresa en la app en vez de un
 * número desconocido.
 *
 * Server-only: usa QUO_API_KEY (sin NEXT_PUBLIC, vive en .env.local).
 * Nunca lanza: un fallo aquí no debe tumbar el alta del lead — se registra
 * con console.error y la respuesta al visitante sigue siendo 200.
 */
import type { IncomingPayload } from "./schemas";

const QUO_CONTACTS_URL = "https://api.openphone.com/v1/contacts";

export async function createQuoContact(lead: IncomingPayload): Promise<void> {
  const apiKey = process.env.QUO_API_KEY;
  // Sin llave configurada (p. ej. build estático o preview) la web funciona igual.
  if (!apiKey) return;

  const [firstName, ...rest] = lead.nombre.trim().split(/\s+/);

  const body = {
    defaultFields: {
      firstName,
      lastName: rest.join(" ") || undefined,
      company: lead.empresa || undefined,
      // El "role" del contacto se usa para ver de un vistazo qué pidió el lead.
      role: `Lead ${lead.servicio} (${lead.type === "quote" ? "cotización" : "contacto"})`,
      emails: [{ name: "email", value: lead.email }],
      phoneNumbers: lead.telefono
        ? [{ name: "phone", value: lead.telefono }]
        : undefined,
    },
    source: "public-api",
  };

  try {
    const res = await fetch(QUO_CONTACTS_URL, {
      method: "POST",
      headers: { Authorization: apiKey, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      // Sin PII en logs: solo el status para diagnosticar.
      console.error("[quo] no se pudo crear el contacto", { status: res.status });
    }
  } catch (error) {
    console.error("[quo] error de red al crear el contacto", error);
  }
}
