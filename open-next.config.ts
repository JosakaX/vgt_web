import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Configuración por defecto: sin caché incremental remota (el sitio es
// estático + route handlers; no usa ISR). Si algún día se activa ISR,
// añadir aquí un incrementalCache sobre R2.
export default defineCloudflareConfig();
