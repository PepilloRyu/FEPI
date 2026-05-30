// js/worlds/world-1-data.js — Mundo 1: Las Bases del Álgebra
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
      challenges: [
        { type: "mc", tag: "Reto 1 · Concepto",
          prompt: "¿En qué rama de las matemáticas las cantidades se representan con letras para abarcar todos los valores posibles?",
          options: [{ label: "Aritmética", correct: false }, { label: "Álgebra", correct: true }, { label: "Geometría", correct: false }],
          hint: "La aritmética usa números fijos. Busca la rama que usa letras para representar cualquier valor." },
        { type: "build", tag: "Reto 2 · Traducción (toca)",
          prompt: "Traduce al lenguaje algebraico: la suma de a, b y m.",
          bank: ["a", "b", "m", "c", "+", "+"], operands: ["a", "b", "m"],
          hint: '"Suma" significa unir las tres cantidades con el signo +. El orden no importa.' },
        { type: "match", tag: "Reto 3 · Empareja (arrastra)",
          prompt: "Arrastra cada símbolo hasta la frase que le corresponde.",
          pairs: [{ desc: "la suma de a y b", sym: "a + b" }, { desc: "el cuadrado de a", sym: "a²" }, { desc: "el triple de a", sym: "3a" }, { desc: "el cubo de b", sym: "b³" }],
          symOrder: ["3a", "a + b", "b³", "a²"],
          hint: 'El exponente ² significa "al cuadrado"; un número pegado como 3a es una multiplicación.' },
        { type: "slots", tag: "Reto 4 · Completa (arrastra)",
          prompt: "Arrastra los bloques a los huecos para escribir: el cuadrado de a más el cubo de b.",
          slots: 2, bank: ["b³", "2a", "a²", "3b"], answer: ["a²", "b³"],
          hint: "El cuadrado de a es a² (no 2a). El cubo de b es b³. El orden de la suma no importa." },
        { type: "mc", tag: "Reto 5 · Razonamiento",
          prompt: "Si a es un número entero, ¿cuáles son los dos enteros consecutivos que vienen después de a?",
          options: [{ label: "a, b", correct: false }, { label: "a + 1, a + 2", correct: true }, { label: "1a, 2a", correct: false }],
          hint: "Para pasar al siguiente entero, sumas 1. El que sigue después de a es a + 1, y el siguiente a + 2." },
        { type: "build", tag: "Reto 6 · Problema aplicado 🏆",
          prompt: "Compraste 3 libros a $a c/u, 6 cuadernos a $b c/u y m mochilas a $x c/u. ¿Cuánto gastaste en total?",
          bank: ["3a", "6b", "mx", "3", "a", "+", "+"], operands: ["3a", "6b", "mx"],
          hint: "Multiplica la cantidad por su precio: 3 libros a $a son 3a. Luego suma los tres resultados." },
      ],
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
      challenges: [
        { type: "mc", tag: "Reto 1 · Clasificación",
          prompt: "¿A qué clase pertenecen los signos >, < y = ?",
          options: [{ label: "Signos de operación", correct: false }, { label: "Signos de relación", correct: true }, { label: "Signos de agrupación", correct: false }],
          hint: "Estos signos comparan dos cantidades para decir cuál es mayor, menor o si son iguales." },
        { type: "vf", tag: "Reto 2 · Verdadero o Falso",
          prompt: 'La expresión  a < b + c  se lee "a es mayor que b + c".',
          options: [{ label: "Verdadero", correct: false }, { label: "Falso", correct: true }],
          hint: "El pico de < apunta a la cantidad menor: a < b + c significa que a es MENOR que b + c." },
        { type: "mc", tag: "Reto 3 · El intruso",
          prompt: "Selecciona el signo que NO es un signo de agrupación.",
          options: [{ label: "( )", correct: false }, { label: "[ ]", correct: false }, { label: "{ }", correct: false }, { label: ">", correct: true }],
          hint: "Los signos de agrupación encierran operaciones para resolverlas primero. El > compara, no agrupa." },
        { type: "buildSeq", tag: "Reto 4 · Traducción (toca)",
          prompt: 'Traduce usando signos de relación: "La suma de x y y es mayor que m".',
          bank: ["x", "y", "m", "+", ">", "<"],
          answers: [["x", "+", "y", ">", "m"], ["y", "+", "x", ">", "m"]],
          hint: 'Primero la suma x + y, luego el signo "mayor que" (>) y al final m.' },
        { type: "mc", tag: "Reto 5 · Evaluar una fórmula 🏆",
          prompt: "El área de un rectángulo es A = b × h. Si la base b = 3 y la altura h = 2, ¿cuánto vale A?",
          options: [{ label: "5", correct: false }, { label: "6", correct: true }, { label: "8", correct: false }, { label: "9", correct: false }],
          hint: "Sustituye: cambia b por 3 y h por 2. Luego multiplica (no sumes): 3 × 2 = 6." },
      ],
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
      challenges: [
        { type: "mc", tag: "Reto 1 · Partes del término",
          prompt: "Analiza el término  −3a²x³.  ¿Cuál es el coeficiente y cuál es la parte literal?",
          options: [
            { label: "Coeficiente: −3  |  Parte literal: a²x³", correct: true },
            { label: "Coeficiente: 3  |  Parte literal: a²x³", correct: false },
            { label: "Coeficiente: a²x³  |  Parte literal: −3", correct: false },
            { label: "Coeficiente: −3  |  Parte literal: −a²x³", correct: false },
          ],
          hint: "El signo viaja con el coeficiente: el coeficiente es −3. La parte literal son solo las letras con sus exponentes: a²x³." },
        { type: "vf", tag: "Reto 2 · Reglas ninja",
          prompt: "El término  x  no tiene coeficiente ni signo, por lo tanto equivale a  0x.",
          options: [{ label: "Verdadero", correct: false }, { label: "Falso", correct: true }],
          hint: "Coeficiente oculto = 1 (no 0). Y signo oculto = +. Por eso x equivale a +1x, no a 0x." },
        { type: "slots", tag: "Reto 3 · Grado (arrastra)",
          prompt: "El grado absoluto es la suma de los exponentes de las letras. Arrastra el grado del término  5a⁴b³c².",
          slots: 1, prefix: "Grado =", bank: ["9", "14", "24", "11"], answer: ["9"],
          hint: "Suma SOLO los exponentes de las letras: 4 + 3 + 2 = 9. El coeficiente 5 no se suma." },
        { type: "mc", tag: "Reto 4 · Monomio vs. polinomio",
          prompt: "Clasifica la expresión:  x³ + 2x² + x + 7",
          options: [{ label: "Monomio (un solo término)", correct: false }, { label: "Polinomio (más de un término)", correct: true }],
          hint: "Cuenta los términos separados por + o −. Aquí hay cuatro, así que es un polinomio." },
        { type: "mc", tag: "Reto 5 · Análisis completo 🏆",
          prompt: "Observa el polinomio  a + x − y.  ¿Cuántos términos tiene y de qué grado absoluto es cada uno?",
          options: [
            { label: "3 términos, cada uno de grado 1", correct: true },
            { label: "1 término, de grado 3", correct: false },
            { label: "3 términos, cada uno de grado 0", correct: false },
            { label: "2 términos, de grado 1", correct: false },
          ],
          hint: "Los signos + y − separan 3 términos. Cada letra sin exponente escrito tiene exponente 1, así que cada término es de grado 1." },
      ],
    },
  ],
};

export const FUTURE_NODES = [
  { node: "Términos semejantes" },
  { node: "Ecuaciones de 1.er grado" },
];

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
