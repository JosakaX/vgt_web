/**
 * Pruebas del juez semántico del chat (src/lib/chat-guard.ts).
 *
 * El chat es público y lo paga VGT: cualquiera puede escribirle cualquier cosa.
 * El juez decide, antes de gastar un token de Anthropic, si el mensaje tiene
 * que ver con la agencia y si intenta manipular al asistente. Lo que aquí se
 * defiende:
 *
 *   1. Un juez caído, lento o que contesta basura NUNCA deja al visitante sin
 *      respuesta: devuelve null y el chat sigue como siempre.
 *   2. Sin llave de TypeSafe el juez no existe: ni una llamada.
 *   3. La duda favorece al visitante. Bloquear a un posible cliente cuesta
 *      más que contestar una pregunta de más.
 *   4. La llave viaja en la cabecera y en ningún otro sitio.
 *
 * Ninguna prueba sale a la red: `fetch` está sustituido.
 *
 * Correr con:  npm test      (Node 22.18 o superior: importa el .ts directamente)
 */

import {
  juzgarMensaje, veredicto, juezConfigurado, RESPUESTA_FUERA_DE_TEMA,
  MODELO_JEV, UMBRAL_TEMA, UMBRAL_MANIPULACION, ESPERA_MS, CONTEXTO_MAX,
} from "../src/lib/chat-guard.ts";

let ok = 0, fallos = 0;
const avisar = console.error.bind(console);

function comprobar(nombre, condicion, detalle = "") {
  if (condicion) { ok++; }
  else { fallos++; avisar("  ✘ " + nombre + (detalle ? " → " + detalle : "")); }
}

const LLAVE = "ts_pruebaLocalNoEsUnaLlaveReal";
const fetchReal = globalThis.fetch;
const consola = { warn: console.warn, log: console.log, error: console.error };
const llaveReal = process.env.TYPESAFE_API_KEY;

function simularRed(jev) {
  const pedidos = [];
  globalThis.fetch = async (url, init = {}) => {
    const destino = String(url);
    if (!destino.startsWith("https://api.typesafe.ai/")) {
      throw new Error("la prueba intentó salir a la red: " + destino);
    }
    pedidos.push({ url: destino, init });
    if (jev === "red") throw new TypeError("fetch failed");
    if (jev === "colgado") {
      return new Promise((_, rechazar) => {
        init.signal?.addEventListener("abort", () => rechazar(init.signal.reason));
      });
    }
    if (jev === "basura") return new Response("<html>502</html>", { status: 200 });
    if (typeof jev === "number") return new Response("{}", { status: jev });
    return new Response(JSON.stringify({ model: MODELO_JEV, answers: jev, usage: {} }), { status: 200 });
  };
  return pedidos;
}

const respuestas = (tema, manip) => ({
  en_tema: { type: "noul", noul: tema },
  manipulacion: { type: "noul", noul: manip },
});
const EN_TEMA = respuestas(0.97, 0.01);
const FUERA = respuestas(0.02, 0.01);
const MANIPULA = respuestas(0.70, 0.95);

const usuario = (content) => ({ role: "user", content });
const asistente = (content) => ({ role: "assistant", content });
const UNO = [usuario("Necesito una tienda online para mi negocio de ropa.")];

console.log("\nVGT web · juez semántico del chat\n");
console.warn = console.log = console.error = () => {};

try {

/* ---------- 1. el veredicto ---------- */

comprobar("en tema: pasa", veredicto({ answers: EN_TEMA }) === "pasa");
comprobar("fuera de tema: bloquea", veredicto({ answers: FUERA }) === "fuera_de_tema");
comprobar("manipulación: bloquea aunque hable de un proyecto", veredicto({ answers: MANIPULA }) === "manipulacion");
comprobar("justo en el umbral de tema: bloquea", veredicto({ answers: respuestas(UMBRAL_TEMA, 0) }) === "fuera_de_tema");
comprobar("una centésima por encima: pasa", veredicto({ answers: respuestas(UMBRAL_TEMA + 0.01, 0) }) === "pasa");
comprobar("justo en el umbral de manipulación: bloquea",
  veredicto({ answers: respuestas(0.9, UMBRAL_MANIPULACION) }) === "manipulacion");
comprobar("una centésima por debajo: pasa",
  veredicto({ answers: respuestas(0.9, UMBRAL_MANIPULACION - 0.01) }) === "pasa");
comprobar("la duda favorece al visitante: 0.50 pasa", veredicto({ answers: respuestas(0.5, 0.5) }) === "pasa");
comprobar("los umbrales no se han relajado hacia el bloqueo",
  UMBRAL_TEMA <= 0.3 && UMBRAL_MANIPULACION >= 0.7, UMBRAL_TEMA + " / " + UMBRAL_MANIPULACION);

for (const [nombre, dato] of [
  ["respuesta vacía", null],
  ["sin `answers`", { model: MODELO_JEV }],
  ["falta una pregunta", { answers: { en_tema: EN_TEMA.en_tema } }],
  ["probabilidad como texto", { answers: respuestas("0.9", 0.01) }],
  ["probabilidad mayor que 1", { answers: respuestas(1.7, 0.01) }],
  ["probabilidad negativa", { answers: respuestas(-0.2, 0.01) }],
  ["probabilidad NaN", { answers: respuestas(NaN, 0.01) }],
  ["tipo equivocado", { answers: { en_tema: { type: "choice", choice: "si" }, manipulacion: EN_TEMA.manipulacion } }],
]) {
  comprobar("forma inválida no produce veredicto: " + nombre, veredicto(dato) === null);
}

/* ---------- 2. sin llave, el juez no existe ---------- */

delete process.env.TYPESAFE_API_KEY;
comprobar("sin llave, no está configurado", juezConfigurado() === false);
{
  const pedidos = simularRed(EN_TEMA);
  const r = await juzgarMensaje(UNO);
  comprobar("sin llave no juzga y no llama a nadie", r === null && pedidos.length === 0);
}
process.env.TYPESAFE_API_KEY = "";
comprobar("llave vacía no cuenta", juezConfigurado() === false);

process.env.TYPESAFE_API_KEY = LLAVE;
comprobar("con llave, está configurado", juezConfigurado() === true);

/* ---------- 3. lo que viaja ---------- */

{
  const pedidos = simularRed(EN_TEMA);
  const r = await juzgarMensaje(UNO);
  const p = pedidos[0];
  const cuerpo = JSON.parse(p.init.body);

  comprobar("con llave, juzga", r === "pasa");
  comprobar("una sola llamada por mensaje", pedidos.length === 1);
  comprobar("llama al endpoint exacto", p.url === "https://api.typesafe.ai/v1/systemone");
  comprobar("la llave va en la cabecera", p.init.headers.authorization === "Bearer " + LLAVE);
  comprobar("la llave no va en la URL ni en el cuerpo", !p.url.includes(LLAVE) && !p.init.body.includes(LLAVE));
  comprobar("el modelo va fijado a una versión, no a un alias",
    cuerpo.model === MODELO_JEV && /^jev-\d+\.\d+/.test(MODELO_JEV), cuerpo.model);
  comprobar("el mensaje viaja como dato, en `state`", cuerpo.state.ultimo_mensaje === UNO[0].content);
  /* Sin la situación, el juez bloqueó «Just exploring» y «Estou só a explorar»,
     que son botones del propio chat (medición del 2026-09-28). */
  comprobar("viaja la situación: dónde está el visitante y qué se le preguntó",
    typeof cuerpo.state.situacion === "string" && /explorando/.test(cuerpo.state.situacion) &&
    /agencia/.test(cuerpo.state.situacion));
  comprobar("la pregunta de tema se apoya en la situación",
    cuerpo.questions.en_tema.instructions.includes("`situacion`"));
  comprobar("explorar sin concretar cuenta como estar en tema",
    /explorando/.test(cuerpo.questions.en_tema.criteria.true));
  comprobar("se hacen las dos preguntas y ninguna más",
    Object.keys(cuerpo.questions).sort().join() === "en_tema,manipulacion");
  comprobar("el mensaje del visitante no se cuela en las instrucciones",
    !JSON.stringify(cuerpo.questions).includes(UNO[0].content));
  comprobar("la llamada lleva límite de tiempo", p.init.signal instanceof AbortSignal);
}

// El contexto: una respuesta corta solo se entiende con lo que se preguntó antes.
{
  const pedidos = simularRed(EN_TEMA);
  const hilo = [
    usuario("Quiero una app para mi gimnasio."),
    asistente("¿Es para uso interno o para tus clientes?"),
    usuario("Para mis clientes"),
  ];
  await juzgarMensaje(hilo);
  const estado = JSON.parse(pedidos[0].init.body).state;
  comprobar("el último mensaje es el del visitante", estado.ultimo_mensaje === "Para mis clientes");
  comprobar("la conversación previa viaja como contexto", estado.conversacion.length === 2);
  comprobar("el contexto no repite el último mensaje",
    !estado.conversacion.some((m) => m.texto === "Para mis clientes"));
  comprobar("el contexto dice quién habló",
    estado.conversacion[0].quien === "visitante" && estado.conversacion[1].quien === "asistente");
}

{
  const pedidos = simularRed(EN_TEMA);
  const largo = [];
  for (let i = 0; i < 9; i++) { largo.push(usuario("mensaje " + i), asistente("respuesta " + i)); }
  largo.push(usuario("el último"));
  await juzgarMensaje(largo);
  const estado = JSON.parse(pedidos[0].init.body).state;
  comprobar("el contexto se acota: no se manda toda la conversación",
    estado.conversacion.length === CONTEXTO_MAX, String(estado.conversacion.length));
  comprobar("se conservan los mensajes más recientes", estado.conversacion.at(-1).texto === "respuesta 8");
}

comprobar("una conversación vacía no produce veredicto", (await juzgarMensaje([])) === null);
comprobar("si el último mensaje no es del visitante, no se juzga",
  (await juzgarMensaje([usuario("hola"), asistente("¡Hola!")])) === null);

/* ---------- 4. el juez ante la red ---------- */

for (const [nombre, jev] of [["HTTP 429", 429], ["HTTP 500", 500], ["HTTP 401", 401],
  ["red caída", "red"], ["respuesta que no es JSON", "basura"], ["forma inválida", respuestas(3, 0)]]) {
  const pedidos = simularRed(jev);
  const r = await juzgarMensaje(UNO);
  comprobar("juez caído (" + nombre + ") devuelve null, no lanza", r === null);
  comprobar("juez caído (" + nombre + ") no reintenta", pedidos.length === 1);
}

{
  simularRed("colgado");
  const sosten = setInterval(() => {}, 50);   // el reloj de AbortSignal.timeout no sostiene a Node
  let tope;
  const sinCorte = new Promise((r) => { tope = setTimeout(() => r("sin_corte"), ESPERA_MS + 2500); });
  const t0 = Date.now();
  const r = await Promise.race([juzgarMensaje(UNO), sinCorte]);
  const ms = Date.now() - t0;
  clearInterval(sosten);
  clearTimeout(tope);
  comprobar("juez colgado: se corta y devuelve null", r === null, String(r));
  comprobar("juez colgado: no espera más del límite", ms < ESPERA_MS + 600, ms + " ms");
  comprobar("el límite de espera no castiga al visitante", ESPERA_MS <= 2000);
}

/* ---------- 5. lo que se le contesta a quien se bloquea ---------- */

for (const idioma of ["es", "en", "pt"]) {
  const t = RESPUESTA_FUERA_DE_TEMA[idioma];
  comprobar("hay respuesta de reencauce en " + idioma, typeof t === "string" && t.length > 40);
  comprobar("la respuesta en " + idioma + " nombra a la empresa", /Valadares Global Tech/.test(t));
  comprobar("la respuesta en " + idioma + " no lleva enlaces ni HTML", !/https?:|<[a-z]/i.test(t));
}
comprobar("las tres respuestas son distintas entre sí",
  new Set(Object.values(RESPUESTA_FUERA_DE_TEMA)).size === 3);
comprobar("el español no usa voseo", !/\b(vos|tenés|querés|podés|contame|decime)\b/i.test(RESPUESTA_FUERA_DE_TEMA.es));

} finally {
  globalThis.fetch = fetchReal;
  Object.assign(console, consola);
  if (llaveReal === undefined) delete process.env.TYPESAFE_API_KEY;
  else process.env.TYPESAFE_API_KEY = llaveReal;
}

console.log("juez del chat: " + ok + "/" + (ok + fallos) + " comprobaciones correctas");
if (fallos) {
  console.error("\n" + fallos + " FALLO(S)\n");
  process.exit(1);
}
console.log("TODO EN VERDE\n");
