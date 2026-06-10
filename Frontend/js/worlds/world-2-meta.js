// js/worlds/world-2-meta.js — Mundo 2: Números Reales
// Contiene: metadata del mundo, niveles, teoría y getVisual.
// Los ejercicios se sirven desde el backend (GET /api/exercises/world/2).
export const WORLD = {
  id: 2,
  title: "Números Reales",
  subtitle: "Clasificación, propiedades y jerarquía de los números reales",
  levels: [
    {
      id: 1, icon: "🔢", node: "Conjuntos Numéricos", title: "Conjuntos Numéricos",
      subtitle: "Naturales, enteros, racionales, irracionales y reales",
      theory: [
        { icon: "🌱", tag: "Teoría 1 / 4", title: "Naturales y enteros: los primeros números",
          body: "Los primeros números que aprendiste fueron los <b>naturales</b> (ℕ): 1, 2, 3, 4, ... los que usamos para contar. Cuando necesitamos el cero y los negativos (para temperaturas, saldos, pisos), formamos los <b>enteros</b> (ℤ).",
          visual: "numhist", key: "ℕ ⊂ ℤ: todo natural es entero, pero no al revés. El −3 y el 0 son enteros, no naturales." },
        { icon: "🍕", tag: "Teoría 2 / 4", title: "Racionales: números con patrón",
          body: "Los <b>racionales</b> (ℚ) son todos los que se pueden escribir como fracción p/q con q ≠ 0. Incluye enteros, fracciones y decimales que terminan (0.5) o que se repiten con patrón (0.333... = 1/3).",
          visual: "rational", key: "Pista: si el decimal termina o se repite, es racional. Siempre puedes escribirlo como fracción." },
        { icon: "🌀", tag: "Teoría 3 / 4", title: "Irracionales: el infinito sin patrón",
          body: "Los <b>irracionales</b> (ℚ') son números cuyo decimal es infinito y nunca se repite. No pueden escribirse como fracción exacta. Son los 'outsiders' del sistema numérico.",
          visual: "irrational", key: "π = 3.14159265... y √2 = 1.41421... son irracionales: nunca terminan ni forman patrón." },
        { icon: "🌎", tag: "Teoría 4 / 4", title: "Los Reales: el gran conjunto",
          body: "El conjunto de los <b>números reales</b> (ℝ) es la unión de todos los anteriores. Positivos y negativos (enteros y fraccionarios, racionales e irracionales) más el cero.",
          visual: "realset", key: "ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ. Los reales los contienen a todos. Todo punto de la recta numérica es real." },
      ],
      challenges: [],
    },
    {
      id: 2, icon: "⚖️", node: "Propiedades de los Reales", title: "Propiedades de los Reales",
      subtitle: "Conmutativa, asociativa, distributiva, neutros e inversos",
      theory: [
        { icon: "➕", tag: "Teoría 1 / 4", title: "Propiedades de la suma",
          body: "La suma de reales cumple cuatro propiedades que Baldor llama <b>axiomas</b>: verdades de aprehensión inmediata. Conocerlas te ahorra errores al simplificar expresiones algebraicas.",
          visual: "sumprops", key: "Conmutativa: el orden NO importa (a+b = b+a). Asociativa: los paréntesis NO importan ((a+b)+c = a+(b+c))." },
        { icon: "✖️", tag: "Teoría 2 / 4", title: "Propiedades de la multiplicación",
          body: "La multiplicación también tiene sus axiomas, paralelos a los de la suma. Baldor destaca especialmente el <b>axioma de existencia del inverso</b> o recíproco.",
          visual: "multprops", key: "Neutro de la suma: 0 (a+0=a). Neutro de la multiplicación: 1 (a×1=a). ¡Son distintos!" },
        { icon: "📦", tag: "Teoría 3 / 4", title: "La propiedad distributiva",
          body: "La distributiva es el 'puente' entre la suma y la multiplicación. Baldor la enuncia: <i>a(b+c) = ab + ac</i>. Es fundamental para expandir y factorizar expresiones algebraicas.",
          visual: "distrib", key: "La multiplicación 'se distribuye' entre cada sumando: 3·(x+4) = 3x + 12." },
        { icon: "🔄", tag: "Teoría 4 / 4", title: "Inversos: el regreso al neutro",
          body: "Todo número real tiene un 'opuesto' que al sumarlo da 0, y un 'recíproco' que al multiplicarlo da 1. Son los <b>elementos inversos</b> — te devuelven al punto de partida.",
          visual: "neutrals", key: "Inverso aditivo de a: −a (su suma es 0). Inverso multiplicativo de a: 1/a (su producto es 1)." },
      ],
      challenges: [],
    },
    {
      id: 3, icon: "🧮", node: "Jerarquía de Operaciones", title: "Jerarquía de Operaciones",
      subtitle: "Ley de signos, orden correcto y potencias",
      theory: [
        { icon: "➕", tag: "Teoría 1 / 4", title: "Suma y resta con enteros",
          body: "Al operar con enteros, el signo lo decide todo. La ley de signos para la suma es simple: si los signos son <b>iguales</b>, sumas los valores y conservas el signo; si son <b>distintos</b>, restas y tomas el signo del número de mayor valor absoluto.",
          visual: "signsum", key: "Mismos signos → suma y conserva. Signos distintos → resta y toma el signo del mayor." },
        { icon: "✖️", tag: "Teoría 2 / 4", title: "Multiplicación y división: ley de signos",
          body: "En multiplicación y división, los signos se combinan según una regla fija. Apréndela de una vez: <b>signos iguales dan positivo, signos distintos dan negativo</b>.",
          visual: "signmult", key: "(+)(+)=+ · (−)(−)=+ · (+)(−)=− · (−)(+)=−. Iguales → positivo. Distintos → negativo." },
        { icon: "📋", tag: "Teoría 3 / 4", title: "Jerarquía de operaciones",
          body: "Cuando hay varias operaciones juntas, existe un orden universal. Sin él, dos personas resolverían la misma expresión y obtendrían resultados distintos. Hay que seguirlo siempre.",
          visual: "oporder", key: "1° Paréntesis · 2° Potencias y raíces · 3° × y ÷ (izq. → der.) · 4° + y − (izq. → der.)." },
        { icon: "⚡", tag: "Teoría 4 / 4", title: "Potencias: multiplicación compacta",
          body: "Una potencia aⁿ indica que la base (a) se multiplica por sí misma n veces. Las potencias tienen prioridad sobre la multiplicación y la suma dentro de la jerarquía.",
          visual: "powers", key: "2³ = 2·2·2 = 8. ¡Cuidado! 2³ ≠ 2×3. El exponente indica cuántas VECES se multiplica la base." },
      ],
      challenges: [],
    },
    {
      id: 4, icon: "📐", node: "Razones y Proporciones", title: "Razones y Proporciones",
      subtitle: "Comparar cantidades y encontrar el cuarto proporcional",
      theory: [
        { icon: "🔢", tag: "Teoría 1 / 4", title: "La razón: comparar cantidades",
          body: "Una <b>razón</b> es la comparación por cociente de dos cantidades. Se escribe a:b o a/b. Nos dice cuántas veces está contenida una cantidad en la otra. Como toda fracción, se simplifica dividiendo ambos términos por el MCD.",
          visual: "razones", key: "La razón se simplifica como fracción: 12:8 = 3:2. Divide ambos términos entre su MCD." },
        { icon: "⚖️", tag: "Teoría 2 / 4", title: "La proporción: dos razones iguales",
          body: "Una <b>proporción</b> establece que dos razones son iguales: a:b = c:d. Sus cuatro valores reciben nombres específicos según su posición.",
          visual: "proportion", key: "Extremos = 1° y 4° términos (a y d). Medios = 2° y 3° términos (b y c)." },
        { icon: "⚡", tag: "Teoría 3 / 4", title: "Propiedad fundamental: producto cruzado",
          body: "En toda proporción válida, el <b>producto de los extremos es igual al producto de los medios</b>. Esta es la herramienta clave para verificar proporciones y para hallar el término desconocido.",
          visual: "propfund", key: "a:b = c:d ⟺ a×d = b×c. Despeja x cuando uno de los cuatro términos es desconocido." },
        { icon: "📈", tag: "Teoría 4 / 4", title: "Proporciones directas en la vida real",
          body: "En una <b>proporción directa</b>, al aumentar una cantidad, la otra aumenta proporcionalmente. La razón entre ambas se mantiene constante. Es el tipo más frecuente en problemas cotidianos.",
          visual: "directprop", key: "Si 3 kg → $15, entonces 6 kg → $30. Razón precio/kg = 5 es siempre la misma." },
      ],
      challenges: [],
    },
    {
      id: 5, icon: "🧩", node: "MCM y MCD", title: "MCM y MCD",
      subtitle: "Mínimo Común Múltiplo y Máximo Común Divisor",
      theory: [
        { icon: "🔢", tag: "Teoría 1 / 4", title: "Múltiplos y el MCM",
          body: "Los <b>múltiplos</b> de un número son los resultados de multiplicarlo por 1, 2, 3, ... El <b>MCM</b> (Mínimo Común Múltiplo) de dos o más números es el múltiplo más pequeño que tienen en común, distinto de cero.",
          visual: "multiples", key: "MCM(4, 6) = 12: es el PRIMER número que aparece en las tablas del 4 y del 6 al mismo tiempo." },
        { icon: "🔍", tag: "Teoría 2 / 4", title: "Divisores y el MCD",
          body: "Los <b>divisores</b> de un número son los enteros positivos que lo dividen exactamente. El <b>MCD</b> (Máximo Común Divisor) es el mayor divisor que comparten dos o más números.",
          visual: "divisors", key: "MCD(12, 18) = 6: es el MAYOR número que divide exactamente tanto a 12 como a 18." },
        { icon: "🧩", tag: "Teoría 3 / 4", title: "Factores primos: el método eficiente",
          body: "Para números grandes, descomponer en factores primos es el método más rápido y seguro. Baldor lo extiende al MCM algebraico con la misma lógica.",
          visual: "primefact", key: "MCM → mayor exponente de cada factor primo. MCD → menor exponente de cada factor primo común." },
        { icon: "🌎", tag: "Teoría 4 / 4", title: "¿Cuándo usar MCM y cuándo MCD?",
          body: "Saber identificar cuál necesitas es la mitad del trabajo. El contexto del problema te da la clave.",
          visual: "lcmapp", key: "MCM → ¿cuándo coinciden ciclos? · MCD → ¿cuál es el mayor grupo igual posible?" },
      ],
      challenges: [],
    },
  ],
};

export function getVisual(kind) {
  if (kind === "numhist") return `<div class="mg-vis">
    <div class="mg-tr"><span class="l">ℕ Naturales &nbsp;·&nbsp; {1, 2, 3, 4, 5…}</span><span class="r" style="color:var(--owl-green)">contar</span></div>
    <div class="mg-tr"><span class="l">ℤ Enteros &nbsp;·&nbsp; {…, −2, −1, 0, 1, 2, …}</span><span class="r" style="color:var(--macaw-blue)">+ 0 y −</span></div>
    <div style="text-align:center;color:rgb(var(--wolf));font-size:13px;margin-top:8px">Todo natural es entero, pero −3 y 0 <b>no</b> son naturales</div>
  </div>`;
  if (kind === "rational") return `<div class="mg-vis">
    <div class="mg-band known"><div class="h">ℚ RACIONALES — se escriben como p/q (q ≠ 0)</div>
    <div class="l" style="font-size:15px;letter-spacing:1px">1/2 &nbsp; 3 &nbsp; 0.75 &nbsp; 0.333…</div></div>
    <div style="text-align:center;color:rgb(var(--wolf));font-size:13px;margin-top:10px">Decimal que <b>termina</b>: 0.5 = 1/2 ✓ &nbsp;·&nbsp; Decimal que <b>se repite</b>: 0.333… = 1/3 ✓</div>
  </div>`;
  if (kind === "irrational") return `<div class="mg-vis">
    <div class="mg-band unknown"><div class="h">ℚ' IRRACIONALES — no se pueden escribir como p/q</div>
    <div class="l" style="font-size:15px;letter-spacing:1px">π &nbsp; √2 &nbsp; √3 &nbsp; e</div></div>
    <div style="text-align:center;color:rgb(var(--wolf));font-size:13px;margin-top:10px">π = 3.14159265358979<b>…</b> (nunca termina, nunca se repite)</div>
  </div>`;
  if (kind === "realset") return `<div class="mg-vis">
    <div class="mg-band cat"><div class="h">ℝ REALES = ℚ ∪ ℚ' (racionales + irracionales)</div></div>
    <div class="mg-row-pills" style="margin-top:10px">
      <span class="mg-pill" style="font-size:14px">ℕ ⊂ ℤ</span>
      <span class="mg-pill" style="font-size:14px">ℤ ⊂ ℚ</span>
      <span class="mg-pill" style="font-size:14px">ℚ ⊂ ℝ</span>
      <span class="mg-pill q" style="font-size:14px">ℚ' ⊂ ℝ</span>
    </div>
    <div style="text-align:center;color:rgb(var(--wolf));font-size:13px;margin-top:8px">Todo punto de la recta numérica es un número real</div>
  </div>`;
  if (kind === "sumprops") return `<div class="mg-vis">
    <div class="mg-tr"><span class="l">Conmutativa: a + b = b + a</span><span class="r">↔️</span></div>
    <div class="mg-tr"><span class="l">Asociativa: (a+b)+c = a+(b+c)</span><span class="r">🔗</span></div>
    <div class="mg-tr"><span class="l">Neutro aditivo: a + 0 = a</span><span class="r">0️⃣</span></div>
    <div class="mg-tr"><span class="l">Inverso aditivo: a + (−a) = 0</span><span class="r">⚡</span></div>
  </div>`;
  if (kind === "multprops") return `<div class="mg-vis">
    <div class="mg-tr"><span class="l">Conmutativa: a · b = b · a</span><span class="r">↔️</span></div>
    <div class="mg-tr"><span class="l">Asociativa: (ab)c = a(bc)</span><span class="r">🔗</span></div>
    <div class="mg-tr"><span class="l">Neutro multiplicativo: a · 1 = a</span><span class="r">1️⃣</span></div>
    <div class="mg-tr"><span class="l">Inverso multiplicativo: a · (1/a) = 1</span><span class="r">⚡</span></div>
  </div>`;
  if (kind === "distrib") return `<div class="mg-vis">
    <div class="mg-formula" style="font-size:22px;padding:8px 0">a · (b + c) = <span style="color:var(--mathgo-blue)">a·b</span> + <span style="color:var(--owl-green)">a·c</span></div>
    <div style="text-align:center;color:rgb(var(--wolf));font-size:14px;margin-top:8px">Ejemplo: 3 · (x + 4) = 3x + 12</div>
    <div style="text-align:center;color:rgb(var(--wolf));font-size:13px">También con resta: a(b − c) = ab − ac</div>
  </div>`;
  if (kind === "neutrals") return `<div class="mg-vis">
    <div class="mg-band known"><div class="h">NEUTROS — no cambian el valor</div>
    <div class="l" style="font-size:15px;letter-spacing:2px">a + 0 = a &nbsp;&nbsp; a × 1 = a</div></div>
    <div class="mg-band unknown"><div class="h">INVERSOS — llevan al neutro</div>
    <div class="l" style="font-size:15px;letter-spacing:1px">a + (−a) = 0 &nbsp; a·(1/a) = 1</div></div>
  </div>`;
  if (kind === "signsum") return `<div class="mg-vis">
    <div class="mg-tr"><span class="l">(+5) + (+3) → mismo signo, suma</span><span class="r" style="color:var(--owl-green)">= +8</span></div>
    <div class="mg-tr"><span class="l">(−5) + (−3) → mismo signo, suma</span><span class="r" style="color:var(--cardinal)">= −8</span></div>
    <div class="mg-tr"><span class="l">(+5) + (−3) → distintos, resta</span><span class="r" style="color:var(--owl-green)">= +2</span></div>
    <div class="mg-tr"><span class="l">(−5) + (+3) → distintos, resta</span><span class="r" style="color:var(--cardinal)">= −2</span></div>
  </div>`;
  if (kind === "signmult") return `<div class="mg-row-pills">
    <span class="mg-pill" style="background:#e9f7ef;border-color:var(--correct-border);color:var(--correct-text)">(+)(+) = +</span>
    <span class="mg-pill" style="background:#e9f7ef;border-color:var(--correct-border);color:var(--correct-text)">(−)(−) = +</span>
    <span class="mg-pill" style="background:var(--wrong-bg);border-color:var(--wrong-border);color:var(--wrong-text)">(+)(−) = −</span>
    <span class="mg-pill" style="background:var(--wrong-bg);border-color:var(--wrong-border);color:var(--wrong-text)">(−)(+) = −</span>
  </div>
  <div style="text-align:center;color:rgb(var(--wolf));font-size:13px;margin-top:12px"><b>Iguales → positivo &nbsp;·&nbsp; Distintos → negativo</b></div>`;
  if (kind === "oporder") return `<div class="mg-vis">
    <div class="mg-tr"><span class="l">① Paréntesis ( ) [ ] { }</span><span class="r" style="color:var(--cardinal)">PRIMERO</span></div>
    <div class="mg-tr"><span class="l">② Potencias y raíces (aⁿ, √ )</span><span class="r" style="color:var(--bee-shadow)">2°</span></div>
    <div class="mg-tr"><span class="l">③ Multiplicación y División (× ÷)</span><span class="r" style="color:var(--owl-green)">3°</span></div>
    <div class="mg-tr"><span class="l">④ Suma y Resta (+ −)</span><span class="r" style="color:var(--mathgo-blue)">ÚLTIMO</span></div>
  </div>`;
  if (kind === "powers") return `<div class="mg-vis">
    <div class="mg-tr"><span class="l">2³ = 2 × 2 × 2</span><span class="r" style="color:var(--mathgo-blue)">= 8</span></div>
    <div class="mg-tr"><span class="l">3² = 3 × 3</span><span class="r" style="color:var(--mathgo-blue)">= 9</span></div>
    <div class="mg-tr"><span class="l">5¹ = 5</span><span class="r" style="color:var(--mathgo-blue)">= 5</span></div>
  </div>
  <div style="text-align:center;color:rgb(var(--wolf));font-size:13px;margin-top:8px">⚠️ 2³ ≠ 2×3. El exponente dice cuántas veces se multiplica la BASE.</div>`;
  if (kind === "razones") return `<div class="mg-vis">
    <div class="mg-tr"><span class="l">En un salón: 12 niños y 8 niñas</span><span class="r"></span></div>
    <div class="mg-formula" style="font-size:22px;padding:8px 0">Razón = <span style="color:var(--mathgo-blue)">12/8 = 3/2</span></div>
    <div style="text-align:center;color:rgb(var(--wolf));font-size:13px;margin-top:6px">Por cada 3 niños hay 2 niñas. La razón se simplifica como fracción.</div>
  </div>`;
  if (kind === "proportion") return `<div class="mg-vis">
    <div class="mg-formula" style="font-size:26px;padding:8px 0">
      <span style="color:var(--cardinal)">a</span> : <span style="color:var(--owl-green)">b</span> &nbsp;=&nbsp; <span style="color:var(--owl-green)">c</span> : <span style="color:var(--cardinal)">d</span>
    </div>
    <div class="mg-row-pills" style="margin-top:8px">
      <span class="mg-pill" style="background:#ffe9e9;border-color:var(--wrong-border);color:var(--wrong-text)">Extremos: a y d</span>
      <span class="mg-pill" style="background:#e9f7ef;border-color:var(--correct-border);color:var(--correct-text)">Medios: b y c</span>
    </div>
  </div>`;
  if (kind === "propfund") return `<div class="mg-vis">
    <div class="mg-formula" style="font-size:20px;padding:4px 0">Si <span style="color:var(--cardinal)">a</span>:<span style="color:var(--owl-green)">b</span> = <span style="color:var(--owl-green)">c</span>:<span style="color:var(--cardinal)">d</span>, entonces:</div>
    <div class="mg-formula" style="font-size:26px;padding:8px 0"><span style="color:var(--cardinal)">a × d</span> = <span style="color:var(--owl-green)">b × c</span></div>
    <div style="text-align:center;color:rgb(var(--wolf));font-size:13px;margin-top:6px">Ejemplo: 2:4 = 6:12 → 2×12=24 = 4×6=24 ✓</div>
  </div>`;
  if (kind === "directprop") return `<div class="mg-vis">
    <div class="mg-tr"><span class="l">3 kg de manzanas</span><span class="r" style="color:var(--mathgo-blue)">$15</span></div>
    <div class="mg-tr"><span class="l">6 kg (el doble)</span><span class="r" style="color:var(--mathgo-blue)">$30 (el doble)</span></div>
    <div style="text-align:center;color:rgb(var(--wolf));font-size:13px;margin-top:8px">Razón precio/kg = 15/3 = 30/6 = <b>5</b> (siempre constante)</div>
  </div>`;
  if (kind === "multiples") return `<div class="mg-vis">
    <div class="mg-tr"><span class="l">Múltiplos de 4: 4, 8, <b>12</b>, 16…</span><span class="r">×1, ×2, ×3…</span></div>
    <div class="mg-tr"><span class="l">Múltiplos de 6: 6, <b>12</b>, 18, 24…</span><span class="r">×1, ×2, ×3…</span></div>
    <div class="mg-formula" style="font-size:22px;padding:8px 0">MCM(4, 6) = <span style="color:var(--mathgo-blue)">12</span></div>
  </div>`;
  if (kind === "divisors") return `<div class="mg-vis">
    <div class="mg-tr"><span class="l">Divisores de 12: 1, 2, 3, 4, <b>6</b>, 12</span><span class="r"></span></div>
    <div class="mg-tr"><span class="l">Divisores de 18: 1, 2, 3, <b>6</b>, 9, 18</span><span class="r"></span></div>
    <div class="mg-formula" style="font-size:22px;padding:8px 0">MCD(12, 18) = <span style="color:var(--mathgo-blue)">6</span></div>
  </div>`;
  if (kind === "primefact") return `<div class="mg-vis">
    <div class="mg-tr"><span class="l">12 = 2² × 3¹</span><span class="r"></span></div>
    <div class="mg-tr"><span class="l">18 = 2¹ × 3²</span><span class="r"></span></div>
    <div class="mg-tr"><span class="l">MCM → exp. mayor: 2² × 3² = <b>36</b></span><span class="r" style="color:var(--mathgo-blue)">MCM</span></div>
    <div class="mg-tr"><span class="l">MCD → exp. menor: 2¹ × 3¹ = <b>6</b></span><span class="r" style="color:var(--owl-green)">MCD</span></div>
  </div>`;
  if (kind === "lcmapp") return `<div class="mg-vis">
    <div class="mg-band cat"><div class="h">USA MCM CUANDO…</div>
    <div class="l" style="font-size:14px;letter-spacing:0">¿Cuándo coinciden eventos que se repiten en ciclo?</div></div>
    <div class="mg-band known"><div class="h">USA MCD CUANDO…</div>
    <div class="l" style="font-size:14px;letter-spacing:0">¿Cuál es el mayor grupo igual que se puede formar?</div></div>
  </div>`;
  return "";
}
