"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { ArrowRight, Check, Loader2 } from "lucide-react";

const schema = z.object({
  email: z.string().email(),
});

type FormValues = z.infer<typeof schema>;

export function NewsletterForm() {
  const t = useTranslations("common.footer.newsletter");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="flex items-center gap-2 text-sm text-success" role="status">
        <Check className="h-4 w-4" aria-hidden="true" />
        {t("success")}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2" noValidate>
      <div className="flex gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          {t("placeholder")}
        </label>
        <input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          placeholder={t("placeholder")}
          aria-invalid={!!errors.email}
          {...register("email")}
          className="h-11 w-full rounded-full border border-border bg-surface px-4 text-sm text-foreground outline-none placeholder:text-muted focus:border-accent"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          aria-label={t("button")}
          className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full bg-accent-solid px-4 text-sm font-semibold text-white transition-colors hover:bg-accent-solid-hover disabled:opacity-60"
        >
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <>
              <span className="hidden sm:inline">{t("button")}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>
      </div>
      {errors.email ? (
        <p className="text-xs text-danger">{t("invalid")}</p>
      ) : null}
      {status === "error" ? (
        <p className="text-xs text-danger" role="alert">
          {t("error")}
        </p>
      ) : null}
    </form>
  );
}
