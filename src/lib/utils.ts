/**
 * Une clases condicionalmente sin dependencias externas.
 * Filtra falsy y normaliza espacios. Suficiente para nuestro caso de uso.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
}
