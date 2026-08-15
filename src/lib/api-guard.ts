/**
 * Guardas compartidas de los endpoints públicos (pilares de seguridad VGT):
 * verificación de Origin con fallo cerrado + rate limit en memoria por IP
 * con tope global. x-forwarded-for es falsificable fuera de un proxy
 * confiable; el tope global acota el gasto total aunque roten IPs.
 */

const ALLOWED_ORIGINS = new Set([
  "https://www.valadaresglobaltech.com",
  "https://valadaresglobaltech.com",
  "https://josakax.github.io",
  "http://localhost:3000",
]);

/** Fail-closed: sin Origin válido no hay servicio (el navegador siempre lo envía). */
export function originAllowed(origin: string | null): boolean {
  return origin !== null && ALLOWED_ORIGINS.has(origin);
}

export function clientIp(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
}

export function makeRateLimiter(opts: { perIp: number; global: number; windowMs?: number }) {
  const windowMs = opts.windowMs ?? 60_000;
  const hits = new Map<string, number[]>();
  let globalHits: number[] = [];

  return function rateLimited(ip: string): boolean {
    const now = Date.now();

    globalHits = globalHits.filter((t) => now - t < windowMs);
    globalHits.push(now);
    if (globalHits.length > opts.global) return true;

    // Poda: evita crecimiento sin límite del mapa con IPs rotadas.
    if (hits.size > 500) {
      for (const [key, times] of hits) {
        if (times.every((t) => now - t >= windowMs)) hits.delete(key);
      }
    }

    const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
    recent.push(now);
    hits.set(ip, recent);
    return recent.length > opts.perIp;
  };
}
