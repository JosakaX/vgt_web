"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PhoneField } from "@/components/forms/phone-field";
import { SERVICIOS_VISIBLES, formContactSchema, type FormContactValues } from "@/lib/schemas";

// ---------------------------------------------------------------------------
// Estilos base reutilizados en cada campo
// ---------------------------------------------------------------------------
const inputBase =
  "h-11 w-full rounded-lg border bg-surface px-4 text-sm text-foreground outline-none placeholder:text-muted transition-colors focus:border-accent focus:ring-1 focus:ring-accent";

const selectBase =
  "h-11 w-full rounded-lg border bg-surface px-4 text-sm text-foreground outline-none transition-colors cursor-pointer focus:border-accent focus:ring-1 focus:ring-accent";

const textareaBase =
  "min-h-[100px] w-full resize-y rounded-lg border bg-surface px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted transition-colors focus:border-accent focus:ring-1 focus:ring-accent";

// ---------------------------------------------------------------------------
// Componente
// ---------------------------------------------------------------------------

export function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormContactValues>({
    resolver: zodResolver(formContactSchema),
  });

  // Si el visitante llega desde el chat de Josaka, precarga la conversación
  // en el mensaje para que no repita lo que ya escribió.
  useEffect(() => {
    try {
      const chat = sessionStorage.getItem("vgt-chat-transcript");
      if (chat && !getValues("mensaje")) {
        setValue("mensaje", chat.slice(0, 5000));
      }
    } catch {
      // Sin sessionStorage no hay precarga; el formulario abre vacío.
    }
  }, [getValues, setValue]);

  async function onSubmit(values: FormContactValues) {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, type: "contact" }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  // Estado de éxito: reemplaza el formulario completo
  if (status === "success") {
    return (
      <div
        className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface p-8 text-center"
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 className="h-12 w-12 text-success" aria-hidden="true" />
        <p className="font-display text-lg font-semibold text-foreground">
          {t("form.success")}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-2xl border border-border bg-surface p-6 sm:p-8"
    >
      <h2 className="mb-6 font-display text-xl font-bold text-foreground">
        {t("form.heading")}
      </h2>

      <div className="grid gap-5 sm:grid-cols-2">

        {/* Nombre */}
        <div>
          <label
            htmlFor="contact-nombre"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            {t("form.fields.nombre.label")}
          </label>
          <input
            id="contact-nombre"
            type="text"
            autoComplete="given-name"
            placeholder={t("form.fields.nombre.placeholder")}
            aria-invalid={!!errors.nombre}
            aria-describedby={errors.nombre ? "contact-nombre-error" : undefined}
            {...register("nombre")}
            className={cn(inputBase, errors.nombre ? "border-danger" : "border-border")}
          />
          {errors.nombre && (
            <p id="contact-nombre-error" role="alert" className="mt-1 text-xs text-danger">
              {t("validation.nombreRequired")}
            </p>
          )}
        </div>

        {/* Empresa */}
        <div>
          <label
            htmlFor="contact-empresa"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            {t("form.fields.empresa.label")}
          </label>
          <input
            id="contact-empresa"
            type="text"
            autoComplete="organization"
            placeholder={t("form.fields.empresa.placeholder")}
            {...register("empresa")}
            className={cn(inputBase, "border-border")}
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="contact-email"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            {t("form.fields.email.label")}
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            placeholder={t("form.fields.email.placeholder")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            {...register("email")}
            className={cn(inputBase, errors.email ? "border-danger" : "border-border")}
          />
          {errors.email && (
            <p id="contact-email-error" role="alert" className="mt-1 text-xs text-danger">
              {errors.email.message === "emailRequired"
                ? t("validation.emailRequired")
                : t("validation.emailInvalid")}
            </p>
          )}
        </div>

        {/* Teléfono (bandera + indicativo, como el LeadForm de Veritempo) */}
        <Controller
          control={control}
          name="telefono"
          render={({ field }) => (
            <PhoneField
              id="contact-telefono"
              label={t("form.fields.telefono.label")}
              dialLabel={t("form.fields.telefono.dial")}
              placeholder={t("form.fields.telefono.placeholder")}
              value={field.value ?? ""}
              onChange={field.onChange}
            />
          )}
        />

        {/* País */}
        <div>
          <label
            htmlFor="contact-pais"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            {t("form.fields.pais.label")}
          </label>
          <input
            id="contact-pais"
            type="text"
            autoComplete="country-name"
            placeholder={t("form.fields.pais.placeholder")}
            {...register("pais")}
            className={cn(inputBase, "border-border")}
          />
        </div>

        {/* Número de empleados */}
        <div>
          <label
            htmlFor="contact-empleados"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            {t("form.fields.empleados.label")}
          </label>
          <select
            id="contact-empleados"
            {...register("empleados")}
            className={cn(selectBase, "border-border")}
          >
            <option value="">{t("form.fields.empleados.placeholder")}</option>
            <option value="1-50">{t("form.fields.empleados.r1")}</option>
            <option value="51-200">{t("form.fields.empleados.r2")}</option>
            <option value="201-1000">{t("form.fields.empleados.r3")}</option>
            <option value="+1000">{t("form.fields.empleados.r4")}</option>
          </select>
        </div>

        {/* Servicio de interés */}
        <div className="sm:col-span-2">
          <label
            htmlFor="contact-servicio"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            {t("form.fields.servicio.label")}
          </label>
          <select
            id="contact-servicio"
            aria-invalid={!!errors.servicio}
            aria-describedby={errors.servicio ? "contact-servicio-error" : undefined}
            {...register("servicio")}
            className={cn(
              selectBase,
              errors.servicio ? "border-danger" : "border-border",
            )}
          >
            <option value="" disabled>
              {t("form.fields.servicio.placeholder")}
            </option>
            {SERVICIOS_VISIBLES.map((s) => (
              <option key={s} value={s}>
                {t(`form.fields.servicio.${s}`)}
              </option>
            ))}
          </select>
          {errors.servicio && (
            <p id="contact-servicio-error" role="alert" className="mt-1 text-xs text-danger">
              {t("validation.servicioRequired")}
            </p>
          )}
        </div>

        {/* Mensaje */}
        <div className="sm:col-span-2">
          <label
            htmlFor="contact-mensaje"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            {t("form.fields.mensaje.label")}
          </label>
          <textarea
            id="contact-mensaje"
            rows={4}
            placeholder={t("form.fields.mensaje.placeholder")}
            aria-invalid={!!errors.mensaje}
            aria-describedby={errors.mensaje ? "contact-mensaje-error" : undefined}
            {...register("mensaje")}
            className={cn(
              textareaBase,
              errors.mensaje ? "border-danger" : "border-border",
            )}
          />
          {errors.mensaje && (
            <p id="contact-mensaje-error" role="alert" className="mt-1 text-xs text-danger">
              {errors.mensaje.message === "mensajeRequired"
                ? t("validation.mensajeRequired")
                : t("validation.mensajeMinLength")}
            </p>
          )}
        </div>
      </div>

      {status === "error" && (
        <div
          className="mt-4 flex items-center gap-2 rounded-lg border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger"
          role="alert"
          aria-live="assertive"
        >
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          {t("form.error")}
        </div>
      )}

      <div className="mt-6">
        <Button
          type="submit"
          variant="accent"
          size="md"
          disabled={status === "loading"}
          className="w-full sm:w-auto"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              {t("form.submitting")}
            </>
          ) : (
            t("form.submit")
          )}
        </Button>
      </div>
    </form>
  );
}
