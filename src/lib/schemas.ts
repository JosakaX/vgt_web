/**
 * Esquemas zod compartidos para los formularios de contacto y cotización.
 * Usados tanto por los componentes cliente (react-hook-form + zodResolver)
 * como por el route handler /api/contact (validación del lado del servidor).
 */
import { z } from "zod";

// ---------------------------------------------------------------------------
// Enums reutilizables
// ---------------------------------------------------------------------------

export const SERVICIOS = ["veritempo", "cybernova", "ambos"] as const;
export const EMPLEADOS_RANGOS = ["1-50", "51-200", "201-1000", "+1000"] as const;

const servicioEnum = z.enum(SERVICIOS, {
  errorMap: () => ({ message: "servicioRequired" }),
});

/** Transforma string vacío en undefined para selects opcionales. */
const empleadosEnum = z.preprocess(
  (v) => (v === "" ? undefined : v),
  z.enum(EMPLEADOS_RANGOS).optional(),
);

// ---------------------------------------------------------------------------
// Campos base compartidos por ambos formularios (sin el discriminador `type`)
// ---------------------------------------------------------------------------

const baseFormFields = {
  nombre: z.string().min(1, "nombreRequired"),
  empresa: z.string().optional(),
  pais: z.string().optional(),
  email: z.string().min(1, "emailRequired").email("emailInvalid"),
  telefono: z.string().optional(),
  servicio: servicioEnum,
  empleados: empleadosEnum,
};

// ---------------------------------------------------------------------------
// Esquemas para react-hook-form (sin el campo `type`)
// ---------------------------------------------------------------------------

/** Esquema del formulario de contacto (validación en el cliente). */
export const formContactSchema = z.object({
  ...baseFormFields,
  mensaje: z.string().min(1, "mensajeRequired").min(10, "mensajeMinLength"),
});

/** Esquema del formulario de cotización (validación en el cliente). */
export const formQuoteSchema = z.object({
  ...baseFormFields,
  modulos: z.string().optional(),
  objetivo: z.string().min(1, "objetivoRequired").min(10, "objetivoMinLength"),
  mensaje: z.string().optional(),
});

export type FormContactValues = z.infer<typeof formContactSchema>;
export type FormQuoteValues = z.infer<typeof formQuoteSchema>;

// ---------------------------------------------------------------------------
// Esquemas para el API route (incluyen el discriminador `type`)
// ---------------------------------------------------------------------------

/** Payload completo de contacto enviado al servidor. */
export const contactSchema = formContactSchema.extend({
  type: z.literal("contact"),
});

/** Payload completo de cotización enviado al servidor. */
export const quoteSchema = formQuoteSchema.extend({
  type: z.literal("quote"),
});

/**
 * Unión discriminada usada por el API route para validar ambos tipos.
 * El discriminador es el campo `type`.
 */
export const incomingSchema = z.discriminatedUnion("type", [
  contactSchema,
  quoteSchema,
]);

export type ContactPayload = z.infer<typeof contactSchema>;
export type QuotePayload = z.infer<typeof quoteSchema>;
export type IncomingPayload = z.infer<typeof incomingSchema>;
