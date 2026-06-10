// js/worlds/world-1-meta.js — Mundo 1: Las Bases del Álgebra
// Contiene: metadata del mundo, niveles, teoría y getVisual.
// Los ejercicios se sirven desde el backend (GET /api/exercises/world/1).
export const WORLD = {
  id: 1,
  title: "Las Bases del Álgebra",
  subtitle: "Del pensamiento aritmético al algebraico",
  levels: [
    {
      id: 1, icon: "📐", node: "El nuevo lenguaje", title: "El nuevo lenguaje",
      subtitle: "Aritmética vs. álgebra y la notación con letras",
      theory: [
        { icon: "🔢", tag: "Teoría 1 / 4", title: "De números a letras",
          body: "En aritmética, cada cantidad tiene un valor fijo: el 20 siempre vale veinte. El álgebra da un salto — queremos hablar de cualquier valor posible. Para eso usamos letras.",
          visual: "values", key: "Una letra puede valer lo que tú quieras. Es un número comodín." },
        { icon: "🔤", tag: "Teoría 2 / 4", title: "El alfabeto matemático",
          body: "Trabajamos con números y letras, y hay una convención para saber qué representa cada letra.",
          visual: "alphabet", key: 'Si ves una x, piensa "esto es lo que busco". Si ves una a, piensa "esto ya lo conozco".' },
        { icon: "🌐", tag: "Teoría 3 / 4", title: "Traducir operaciones",
          body: "El álgebra es un idioma. Aprende a traducir las palabras más comunes a símbolos.",
          visual: "translate", key: '"El cuadrado de a" NO es 2·a. Es a·a = a². El exponente dice cuántas veces se multiplica.' },
        { icon: "✖️", tag: "Teoría 4 / 4", title: "Multiplicación abreviada",
          body: 'En álgebra casi nunca escribimos el signo ×. Un número pegado a una letra significa "multiplica".',
          visual: "mult", key: '3a significa "tres veces a". No es 3 + a. Pegados = multiplicación.' },
      ],
      challenges: [],
    },
    {
      id: 2, icon: "⚖️", node: "Signos y Fórmulas", title: "Signos y Fórmulas",
      subtitle: "Relación, agrupación y evaluar fórmulas",
      theory: [
        { icon: "🧰", tag: "Teoría 1 / 4", title: "Las tres herramientas",
          body: "Para trabajar con nuestro lenguaje, el álgebra usa tres clases de signos: de operación, de relación y de agrupación.",
          visual: "signs3", key: "Los de operación ya los conoces (+, −, ×, ÷). ¡Veamos para qué sirven los otros dos!" },
        { icon: "⚖️", tag: "Teoría 2 / 4", title: "Signos de relación (los jueces)",
          body: "Sirven para indicar la relación o comparación entre dos cantidades.",
          visual: "relation", key: "El pico de < y > siempre apunta a la cantidad MENOR. En a < b+c, la a es la menor." },
        { icon: "📦", tag: "Teoría 3 / 4", title: "Signos de agrupación (los organizadores)",
          body: "Indican que las operaciones colocadas entre ellos deben resolverse primero.",
          visual: "grouping", key: "Primero se resuelve lo agrupado. Los más usados: paréntesis ( ), corchetes [ ] y llaves { }." },
        { icon: "📐", tag: "Teoría 4 / 4", title: "El poder de las fórmulas",
          body: "La gran ventaja de las letras es crear fórmulas: una regla general escrita con letras. Al cambiar las letras por números, resolvemos problemas reales.",
          visual: "formula", key: "Para usar una fórmula, sustituye cada letra por su número y haz la operación." },
      ],
      challenges: [],
    },
    {
      id: 3, icon: "🔬", node: "Nomenclatura", title: "Nomenclatura",
      subtitle: "Términos, monomios, polinomios, coeficientes y grados",
      theory: [
        { icon: "🧩", tag: "Teoría 1 / 4", title: "¿Qué es un término?",
          body: "Un término es una expresión algebraica formada por uno o varios símbolos que NO están separados entre sí por un signo + o −.",
          visual: "term", key: "3b y 2xy son términos sueltos. En cambio, a + b son DOS términos, porque el + los separa." },
        { icon: "🔧", tag: "Teoría 2 / 4", title: "La anatomía de un término",
          body: "Todo término tiene cuatro partes: el signo, el coeficiente, la parte literal y el grado.",
          visual: "anatomy", key: "Reglas ninja: si no hay signo, es positivo (a = +a). Si no hay número al frente, el coeficiente es 1 (abc = 1abc)." },
        { icon: "📊", tag: "Teoría 3 / 4", title: "El grado de un término",
          body: 'El grado absoluto te dice qué tan "grande" es un término. Para calcularlo, suma los exponentes de todas sus letras. Y ojo: si una letra no tiene exponente escrito, su exponente es 1 (a = a¹).',
          visual: "degree", key: "Suma SOLO los exponentes de las letras. El coeficiente NO cuenta para el grado." },
        { icon: "👨‍👩‍👧", tag: "Teoría 4 / 4", title: "Familias de expresiones",
          body: "Según cuántos términos tengan, las expresiones reciben nombres distintos.",
          visual: "families", key: "Monomio = un solo término (−5b). Polinomio = más de un término (a + b)." },
      ],
      challenges: [],
    },
  ],
};

export function getVisual(kind) {
  if (kind === "values") return `<div class="mg-row-pills"><span class="mg-pill">x = 5</span><span class="mg-pill">x = 100</span><span class="mg-pill q">x = ?</span></div>`;
  if (kind === "alphabet") return `<div class="mg-vis">
    <div class="mg-band known"><div class="h">CONOCIDAS</div><div class="l">a&nbsp;b&nbsp;c&nbsp;d …</div></div>
    <div class="mg-band unknown"><div class="h">INCÓGNITAS</div><div class="l">… x&nbsp;y&nbsp;z</div></div></div>`;
  if (kind === "translate") {
    const rows = [["la suma de a y b", "a + b"], ["la diferencia de a y b", "a − b"], ["el cuadrado de a", "a²"], ["el cubo de b", "b³"]];
    return `<div class="mg-vis">${rows.map(r => `<div class="mg-tr"><span class="l">${r[0]}</span><span class="r">${r[1]}</span></div>`).join("")}</div>`;
  }
  if (kind === "mult") return `<div class="mg-formula" style="font-size:30px;padding:8px 0">3 · a&nbsp;&nbsp;=&nbsp;&nbsp;<span style="color:var(--mathgo-blue)">3a</span></div>`;
  if (kind === "signs3") return `<div class="mg-vis">
    <div class="mg-band cat"><div class="h">OPERACIÓN</div><div class="l">+ &nbsp; − &nbsp; × &nbsp; ÷</div></div>
    <div class="mg-band cat"><div class="h">RELACIÓN</div><div class="l">= &nbsp; &gt; &nbsp; &lt;</div></div>
    <div class="mg-band cat"><div class="h">AGRUPACIÓN</div><div class="l">( ) &nbsp; [ ] &nbsp; { }</div></div></div>`;
  if (kind === "relation") {
    const rows = [['"igual a"', "a = b"], ['"mayor que"', "x + y &gt; m"], ['"menor que"', "a &lt; b + c"]];
    return `<div class="mg-vis">${rows.map(r => `<div class="mg-tr"><span class="l">${r[0]}</span><span class="r">${r[1]}</span></div>`).join("")}</div>`;
  }
  if (kind === "grouping") return `<div class="mg-row-pills">
    <span class="mg-pill">( )</span><span class="mg-pill">[ ]</span><span class="mg-pill">{ }</span></div>
    <div style="text-align:center;color:rgb(var(--wolf));font-size:14px;margin-top:10px">Ej: 2 × (3 + 4) → primero resuelves (3 + 4)</div>`;
  if (kind === "formula") return `<div class="mg-vis">
    <div class="mg-tr"><span class="l">Fórmula del área</span><span class="r">A = b × h</span></div>
    <div style="color:rgb(var(--wolf));font-size:14px">Si b = 3 y h = 2, sustituye cada letra:</div>
    <div class="mg-formula" style="font-size:26px">A = 3 × 2 = <span style="color:var(--mathgo-blue)">6</span></div></div>`;
  if (kind === "term") return `<div class="mg-row-pills"><span class="mg-pill">3b</span><span class="mg-pill">2xy</span></div>
    <div style="text-align:center;color:rgb(var(--wolf));font-size:14px;margin-top:10px">Son términos sueltos. Pero <b>a + b</b> son <b>dos</b> términos: el + los separa.</div>`;
  if (kind === "anatomy") return `<div class="mg-anatomy">
    <div class="part"><div class="box" style="background:#ffe9e9;border-color:var(--wrong-border);color:var(--wrong-text)">−</div><div class="cap">SIGNO</div></div>
    <div class="part"><div class="box" style="background:#fff5d3;border-color:var(--hint-border);color:var(--hint-text)">3</div><div class="cap">COEFICIENTE</div></div>
    <div class="part"><div class="box" style="background:#e8f0ff;border-color:var(--mathgo-blue);color:var(--mathgo-blue)">a²</div><div class="cap">PARTE LITERAL</div></div></div>
    <div style="text-align:center;color:rgb(var(--wolf));font-size:14px;margin-top:12px">El término completo es <b>−3a²</b></div>`;
  if (kind === "degree") return `<div class="mg-formula" style="font-size:24px;padding:6px 0">5a⁴b³c² &nbsp;→&nbsp; 4 + 3 + 2 = <span style="color:var(--mathgo-blue)">9</span></div>
    <div style="text-align:center;color:rgb(var(--wolf));font-size:14px;margin-top:8px">El coeficiente 5 no se suma. Y a = a¹ (exponente oculto).</div>`;
  if (kind === "families") return `<div class="mg-vis">
    <div class="mg-tr"><span class="l">Monomio · un solo término</span><span class="r">−5b</span></div>
    <div class="mg-tr"><span class="l">Polinomio · más de un término</span><span class="r">a + b</span></div></div>`;
  return "";
}
