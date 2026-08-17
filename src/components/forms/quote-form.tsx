"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PhoneField } from "@/components/forms/phone-field";
import { SERVICIOS_VISIBLES, formQuoteSchema, type FormQuoteValues } from "@/lib/schemas";

// ---------------------------------------------------------------------------
// Estilos base
// ---------------------------------------------------------------------------
const inputBase =
  "h-11 w-full rounded-lg border bg-surface px-4 text-sm text-foreground outline-none placeholder:text-muted transition-colors focus:border-accent focus:ring-1 focus:ring-accent";

const selectBase =
  "h-11 w-full rounded-lg border bg-surface px-4 text-sm text-foreground outline-none transition-colors cursor-pointer focus:border-accent focus:ring-1 focus:ring-accent";

const textareaBase =
  "w-full resize-y rounded-lg border bg-surface px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted transition-colors focus:border-accent focus:ring-1 focus:ring-accent";

// ---------------------------------------------------------------------------
// Componente
// ---------------------------------------------------------------------------

export function QuoteForm() {
  const t = useTranslations("quote");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormQuoteValues>({
    resolver: zodResolver(formQuoteSchema),
  });

  // Si el visitante llega desde el chat de Josaka, precarga la conversación
  // en el objetivo del proyecto para que no repita lo que ya escribió.
  useEffect(() => {
    try {
      const chat = sessionStorage.getItem("vgt-chat-transcript");
      if (chat && !getValues("objetivo")) {
        setValue("objetivo", chat.slice(0, 5000));
      }
    } catch {
      // Sin sessionStorage no hay precarga; el formulario abre vacío.
    }
  }, [getValues, setValue]);

  async function onSubmit(values: FormQuoteValues) {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, type: "quote" }),
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
            htmlFor="quote-nombre"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            {t("form.fields.nombre.label")}
          </label>
          <input
            id="quote-nombre"
            type="text"
            autoComplete="given-name"
            placeholder={t("form.fields.nombre.placeholder")}
            aria-invalid={!!errors.nombre}
            aria-describedby={errors.nombre ? "quote-nombre-error" : undefined}
            {...register("nombre")}
            className={cn(inputBase, errors.nombre ? "border-danger" : "border-border")}
          />
          {errors.nombre && (
            <p id="quote-nombre-error" role="alert" className="mt-1 text-xs text-danger">
              {t("validation.nombreRequired")}
            </p>
          )}
        </div>

        {/* Empresa */}
        <div>
          <label
            htmlFor="quote-empresa"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            {t("form.fields.empresa.label")}
          </label>
          <input
            id="quote-empresa"
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
            htmlFor="quote-email"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            {t("form.fields.email.label")}
          </label>
          <input
            id="quote-email"
            type="email"
            autoComplete="email"
            placeholder={t("form.fields.email.placeholder")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "quote-email-error" : undefined}
            {...register("email")}
            className={cn(inputBase, errors.email ? "border-danger" : "border-border")}
          />
          {errors.email && (
            <p id="quote-email-error" role="alert" className="mt-1 text-xs text-danger">
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
              id="quote-telefono"
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
            htmlFor="quote-pais"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            {t("form.fields.pais.label")}
          </label>
          <input
            id="quote-pais"
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
            htmlFor="quote-empleados"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            {t("form.fields.empleados.label")}
          </label>
          <select
            id="quote-empleados"
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
            htmlFor="quote-servicio"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            {t("form.fields.servicio.label")}
          </label>
          <select
            id="quote-servicio"
            aria-invalid={!!errors.servicio}
            aria-describedby={errors.servicio ? "quote-servicio-error" : undefined}
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
            <p id="quote-servicio-error" role="alert" className="mt-1 text-xs text-danger">
              {t("validation.servicioRequired")}
            </p>
          )}
        </div>

        {/* Módulos / funcionalidades de interés */}
        <div className="sm:col-span-2">
          <label
            htmlFor="quote-modulos"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            {t("form.fields.modulos.label")}
          </label>
          <input
            id="quote-modulos"
            type="text"
            placeholder={t("form.fields.modulos.placeholder")}
            {...register("modulos")}
            className={cn(inputBase, "border-border")}
          />
        </div>

        {/* Objetivo o necesidad principal */}
        <div className="sm:col-span-2">
          <label
            htmlFor="quote-objetivo"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            {t("form.fields.objetivo.label")}
          </label>
          <textarea
            id="quote-objetivo"
            rows={4}
            placeholder={t("form.fields.objetivo.placeholder")}
            aria-invalid={!!errors.objetivo}
            aria-describedby={errors.objetivo ? "quote-objetivo-error" : undefined}
            {...register("objetivo")}
            className={cn(
              textareaBase,
              "min-h-[100px]",
              errors.objetivo ? "border-danger" : "border-border",
            )}
          />
          {errors.objetivo && (
            <p id="quote-objetivo-error" role="alert" className="mt-1 text-xs text-danger">
              {errors.objetivo.message === "objetivoRequired"
                ? t("validation.objetivoRequired")
                : t("validation.objetivoMinLength")}
            </p>
          )}
        </div>

        {/* Comentarios adicionales */}
        <div className="sm:col-span-2">
          <label
            htmlFor="quote-mensaje"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            {t("form.fields.mensaje.label")}
          </label>
          <textarea
            id="quote-mensaje"
            rows={3}
            placeholder={t("form.fields.mensaje.placeholder")}
            {...register("mensaje")}
            className={cn(textareaBase, "min-h-[80px] border-border")}
          />
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
