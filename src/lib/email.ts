/**
 * Correos transaccionales vía Resend (REST puro, sin SDK).
 * Server-only: usa RESEND_API_KEY de .env.local. Nunca lanza: un fallo de
 * correo no debe tumbar el alta del lead — se registra y la respuesta al
 * visitante sigue siendo 200 (doctrina del skill pasarelas-de-pago).
 */
import { siteConfig } from "./site";
import type { IncomingPayload } from "./schemas";

const RESEND_URL = "https://api.resend.com/emails";
const FROM_NOTIFY = `VGT Web <web@valadaresglobaltech.com>`;
const FROM_PUBLIC = `Valadares Global Tech <info@valadaresglobaltech.com>`;

async function sendEmail(payload: {
  from: string;
  to: string[];
  subject: string;
  text: string;
  reply_to?: string;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false; // sin llave, la web funciona igual

  try {
    const res = await fetch(RESEND_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error("[email] Resend respondió error", { status: res.status });
    }
    return res.ok;
  } catch (error) {
    console.error("[email] error de red", error);
    return false;
  }
}

const line = (label: string, value?: string) => (value ? `${label}: ${value}\n` : "");

/** Aviso interno a info@ con la ficha del lead, lista para responder. */
export async function sendLeadNotification(lead: IncomingPayload): Promise<boolean> {
  const tipo = lead.type === "quote" ? "Cotización" : "Contacto";
  const subject = `[${tipo}] ${lead.nombre}${lead.empresa ? ` — ${lead.empresa}` : ""} · ${lead.servicio}`;
  const text =
    `Nuevo lead desde el formulario de ${tipo.toLowerCase()} del sitio.\n\n` +
    line("Nombre", lead.nombre) +
    line("Empresa", lead.empresa) +
    line("País", lead.pais) +
    line("Email", lead.email) +
    line("Teléfono", lead.telefono) +
    line("Servicio", lead.servicio) +
    line("Empleados", lead.empleados) +
    ("modulos" in lead ? line("Módulos", lead.modulos) : "") +
    ("objetivo" in lead ? line("Objetivo", lead.objetivo) : "") +
    line("Mensaje", lead.mensaje) +
    `\nResponder directamente a este correo le escribe al lead.`;

  return sendEmail({
    from: FROM_NOTIFY,
    to: [siteConfig.email],
    reply_to: lead.email,
    subject,
    text,
  });
}

const ACK: Record<string, { subject: string; body: (nombre: string) => string }> = {
  es: {
    subject: "Recibimos tu solicitud — Valadares Global Tech",
    body: (nombre) =>
      `Hola ${nombre}:\n\n` +
      `Gracias por escribirnos. Tu solicitud llegó bien y nuestro equipo ya la está revisando: ` +
      `te respondemos en menos de 24 horas hábiles.\n\n` +
      `Si quieres agregar algo mientras tanto, responde a este correo.\n\n` +
      `Valadares Global Tech\n${siteConfig.url}\n${siteConfig.phones.us.display}`,
  },
  en: {
    subject: "We received your request — Valadares Global Tech",
    body: (nombre) =>
      `Hi ${nombre},\n\n` +
      `Thanks for reaching out. Your request arrived and our team is already reviewing it: ` +
      `we'll get back to you within 24 business hours.\n\n` +
      `If you'd like to add anything in the meantime, just reply to this email.\n\n` +
      `Valadares Global Tech\n${siteConfig.url}\n${siteConfig.phones.us.display}`,
  },
  pt: {
    subject: "Recebemos o seu pedido — Valadares Global Tech",
    body: (nombre) =>
      `Olá ${nombre}:\n\n` +
      `Obrigado por nos escrever. O seu pedido chegou bem e a nossa equipa já o está a analisar: ` +
      `respondemos em menos de 24 horas úteis.\n\n` +
      `Se quiser acrescentar algo entretanto, responda a este email.\n\n` +
      `Valadares Global Tech\n${siteConfig.url}\n${siteConfig.phones.us.display}`,
  },
};

/** Acuse automático al lead, en su idioma. Cumple la promesa de la página. */
export async function sendLeadAcknowledgement(
  lead: IncomingPayload,
  locale: string,
): Promise<boolean> {
  const copy = ACK[locale] ?? ACK.es;
  return sendEmail({
    from: FROM_PUBLIC,
    to: [lead.email],
    subject: copy.subject,
    text: copy.body(lead.nombre),
  });
}
