// js/worlds/world-4-meta.js — Mundo 4: Funciones y Ecuaciones Cuadráticas
// Contiene: metadata del mundo, niveles, teoría y getVisual.
// Los ejercicios se sirven desde el backend (GET /api/exercises/world/4).
export const WORLD = {
  id: 4,
  title: "Funciones y Ecuaciones Cuadráticas",
  subtitle: "Domina la curva que rige el universo",
  levels: [

    // ── NIVEL 1: La Función Cuadrática y la Parábola ─────────────────────────
    {
      id: 1, icon: "📐", node: "Función Cuadrática", title: "La Función Cuadrática y la Parábola",
      subtitle: "Conoce la curva más elegante del álgebra",
      theory: [
        { icon: "📈", tag: "Teoría 1 / 4", title: "¿Qué es una función cuadrática?",
          body: "Una función cuadrática tiene la forma f(x) = ax² + bx + c, donde a ≠ 0. Su gráfica es una curva llamada <b>parábola</b>. El coeficiente a determina la apertura: si a > 0 abre hacia arriba (forma U), si a < 0 abre hacia abajo (forma ∩).",
          visual: "parabola-intro",
          key: "Si a > 0, la parábola tiene un mínimo. Si a < 0, tiene un máximo. El signo de a lo decide todo." },
        { icon: "🎯", tag: "Teoría 2 / 4", title: "Vértice y eje de simetría",
          body: "El <b>vértice</b> es el punto más alto o más bajo de la parábola. Su coordenada x es xv = −b / (2a). Luego se sustituye en f(x) para obtener yv. El <b>eje de simetría</b> es la línea vertical x = xv que divide la parábola en dos mitades iguales.",
          visual: "vertex-formula",
          key: "El vértice es donde la parábola cambia de dirección. Fórmula: xv = −b / (2a)." },
        { icon: "✂️", tag: "Teoría 3 / 4", title: "Intersecciones con los ejes",
          body: "La parábola cruza el eje Y cuando x = 0, dando el punto (0, c). Cruza el eje X cuando f(x) = 0, es decir, cuando resolvemos ax² + bx + c = 0. Esas soluciones se llaman <b>raíces</b> o ceros de la función.",
          visual: "axis-intercepts",
          key: "Intersección con eje Y: siempre en (0, c). Con el eje X: resolver ax² + bx + c = 0." },
        { icon: "🔄", tag: "Teoría 4 / 4", title: "Forma estándar vs forma vértice",
          body: "La función cuadrática tiene dos formas: <b>estándar</b> f(x) = ax² + bx + c (muestra a, b, c directamente) y <b>vértice</b> f(x) = a(x − h)² + k donde (h, k) es el vértice. Ambas representan la misma parábola.",
          visual: "standard-vs-vertex",
          key: "La forma vértice es perfecta para graficar: ya sabes el vértice y hacia dónde abre." },
      ],
      challenges: [],   // ← stripped, exercises come from API
    },

    // ── NIVEL 2: Resolución por Factorización ────────────────────────────────
    {
      id: 2, icon: "🧩", node: "Factorización", title: "Resolución por Factorización",
      subtitle: "Descompón y conquista la ecuación cuadrática",
      theory: [
        { icon: "⚖️", tag: "Teoría 1 / 3", title: "Ecuación de segundo grado",
          body: "Una ecuación de segundo grado tiene la forma ax² + bx + c = 0 (a ≠ 0). Sus soluciones se llaman raíces. El método de <b>factorización</b> busca dos números m y n tal que m·n = c y m+n = b, para escribir (x − m)(x − n) = 0. Luego aplica la propiedad del factor cero.",
          visual: "factor-method",
          key: "Propiedad del factor cero: si A·B = 0, entonces A = 0 ó B = 0. Es la base de toda factorización." },
        { icon: "🔲", tag: "Teoría 2 / 3", title: "Trinomio cuadrado perfecto (TCP)",
          body: "Un TCP tiene la forma a² ± 2ab + b² = (a ± b)². Para reconocerlo: el primer y último términos son cuadrados perfectos, y el término central es el doble del producto de sus raíces. Al igualarlo a cero da una <b>raíz doble</b>.",
          visual: "tcp-visual",
          key: "Raíz doble = la parábola es tangente al eje X, toca el eje justo en el vértice sin cruzarlo." },
        { icon: "➕", tag: "Teoría 3 / 3", title: "Diferencia de cuadrados",
          body: "Si la ecuación no tiene término lineal (b = 0), se factoriza como diferencia de cuadrados: ax² − c = 0 → (√a·x − √c)(√a·x + √c) = 0, o simplemente despeja: x² = c/a → x = ±√(c/a).",
          visual: "diff-squares-vis",
          key: "Cuando no hay término en x, piensa en diferencia de cuadrados o despeje directo. Siempre da dos raíces opuestas." },
      ],
      challenges: [],   // ← stripped, exercises come from API
    },

    // ── NIVEL 3: Fórmula General y Discriminante ──────────────────────────────
    {
      id: 3, icon: "🔬", node: "Fórmula General", title: "Fórmula General y Discriminante",
      subtitle: "La herramienta universal para cualquier cuadrática",
      theory: [
        { icon: "🧮", tag: "Teoría 1 / 3", title: "La fórmula general",
          body: "Toda ecuación ax² + bx + c = 0 (con a ≠ 0) se resuelve con la <b>fórmula general</b>:<br><br>x = (−b ± √(b² − 4ac)) / (2a)<br><br>Esta fórmula funciona siempre, incluso cuando el trinomio no factoriza con números enteros. Se obtiene completando el cuadrado en la ecuación general.",
          visual: "quadratic-formula",
          key: "Memoriza: menos b, más-menos raíz de (b cuadrado menos cuatro ac), sobre dos a." },
        { icon: "🔭", tag: "Teoría 2 / 3", title: "El discriminante",
          body: "El <b>discriminante</b> es la expresión dentro del radical: Δ = b² − 4ac. Su valor determina la naturaleza de las raíces sin necesidad de resolver: Δ > 0 → dos raíces reales distintas; Δ = 0 → una raíz doble; Δ < 0 → sin raíces reales.",
          visual: "discriminant-cases",
          key: "Calcula Δ primero. Si es negativo, no hay raíces reales y puedes parar ahí." },
        { icon: "🔲", tag: "Teoría 3 / 3", title: "Completar el cuadrado",
          body: "Método alternativo para resolver o convertir a forma vértice. Pasos: (1) pasar c al otro lado, (2) dividir entre a, (3) sumar (b/2a)² en ambos lados, (4) factorizar el TCP, (5) sacar raíz cuadrada y despejar x.",
          visual: "complete-square-steps",
          key: "Completar el cuadrado también convierte a forma vértice f(x) = a(x−h)²+k, útil para graficar." },
      ],
      challenges: [],   // ← stripped, exercises come from API
    },

    // ── NIVEL 4: Problemas de Aplicación ─────────────────────────────────────
    {
      id: 4, icon: "🌍", node: "Aplicaciones", title: "Problemas de Aplicación",
      subtitle: "Ecuaciones cuadráticas en el mundo real",
      theory: [
        { icon: "🗺️", tag: "Teoría 1 / 3", title: "Estrategia para plantear problemas",
          body: "Pasos universales: (1) Leer con atención e identificar qué se busca. (2) Asignar variable a la incógnita. (3) Traducir las condiciones a una ecuación cuadrática. (4) Resolver. (5) Verificar que las soluciones tengan sentido en el contexto — a veces se descarta una raíz negativa.",
          visual: "problem-strategy",
          key: "Siempre verifica las soluciones en el enunciado original, no solo en la ecuación. El contexto puede descartar raíces." },
        { icon: "📏", tag: "Teoría 2 / 3", title: "Problemas geométricos",
          body: "En problemas de área, la relación entre dimensiones produce ecuaciones cuadráticas. El área de un rectángulo es A = largo × ancho. Si largo y ancho se expresan en función de una misma variable, el producto genera un trinomio de grado 2.",
          visual: "rect-area",
          key: "En problemas de longitud o área, siempre descarta raíces negativas: las medidas físicas son positivas." },
        { icon: "🏀", tag: "Teoría 3 / 3", title: "Movimiento y caída libre",
          body: "La altura en caída libre sigue el modelo h(t) = h₀ + v₀t − ½gt². Para encontrar cuándo el objeto llega al suelo, iguala h(t) = 0 y resuelve la ecuación cuadrática. Usando g ≈ 10 m/s², el coeficiente del término cuadrático es 5.",
          visual: "free-fall",
          key: "El tiempo siempre debe ser positivo. Si obtienes dos raíces positivas, usa el contexto para elegir la correcta." },
      ],
      challenges: [],   // ← stripped, exercises come from API
    },

  ],
};

export function getVisual(kind) {
  // ── Nivel 1: Función Cuadrática ─────────────────────────────────────────
  if (kind === "parabola-intro") return `<div class="mg-vis">
    <div class="mg-band cat"><div class="h">f(x) = x² − 4x + 3  (a = 1 > 0 → abre ↑)</div></div>
    <div class="mg-tr"><span class="l">f(0) = 3</span><span class="r" style="color:var(--mathgo-blue)">punto (0, 3)</span></div>
    <div class="mg-tr"><span class="l">f(2) = −1</span><span class="r" style="color:var(--cardinal)">vértice (2, −1)</span></div>
    <div class="mg-tr"><span class="l">f(1) = 0  y  f(3) = 0</span><span class="r" style="color:var(--owl-green)">raíces</span></div>
  </div>`;
  if (kind === "vertex-formula") return `<div class="mg-vis">
    <div class="mg-band cat"><div class="h">VÉRTICE: xv = −b / (2a)</div></div>
    <div class="mg-formula" style="font-size:18px;padding:6px 0">f(x) = x² − 4x + 3  →  xv = 4/2 = 2</div>
    <div class="mg-tr"><span class="l">yv = f(2) = 4 − 8 + 3</span><span class="r" style="color:var(--cardinal)">= −1</span></div>
    <div class="mg-tr"><span class="l">Eje de simetría</span><span class="r">x = 2</span></div>
  </div>`;
  if (kind === "axis-intercepts") return `<div class="mg-vis">
    <div class="mg-tr"><span class="l">Eje Y: evaluar f(0) = c</span><span class="r" style="color:var(--mathgo-blue)">(0, 3)</span></div>
    <div class="mg-tr"><span class="l">Eje X: resolver f(x) = 0</span><span class="r" style="color:var(--owl-green)">(1,0) y (3,0)</span></div>
    <div style="text-align:center;color:rgb(var(--wolf));font-size:13px;margin-top:10px">x²−4x+3=0 → (x−1)(x−3)=0 → x=1 y x=3</div>
  </div>`;
  if (kind === "standard-vs-vertex") return `<div class="mg-vis">
    <div class="mg-band known"><div class="h">FORMA ESTÁNDAR</div>
    <div class="l" style="font-size:15px;letter-spacing:0">f(x) = x² − 4x + 3</div></div>
    <div class="mg-band cat"><div class="h">FORMA VÉRTICE  →  vértice = (h, k)</div>
    <div class="l" style="font-size:15px;letter-spacing:0">f(x) = (x − 2)² − 1</div></div>
    <div style="text-align:center;color:rgb(var(--wolf));font-size:13px;margin-top:8px">Verificación: (x−2)²−1 = x²−4x+4−1 = x²−4x+3 ✓</div>
  </div>`;
  // ── Nivel 2: Factorización ───────────────────────────────────────────────
  if (kind === "factor-method") return `<div class="mg-vis">
    <div class="mg-formula" style="font-size:18px;padding:4px 0">x² − 5x + 6 = 0</div>
    <div class="mg-tr"><span class="l">m · n = 6  y  m + n = −5</span><span class="r">m=−2, n=−3</span></div>
    <div class="mg-tr"><span class="l">Factorizar</span><span class="r" style="color:var(--mathgo-blue)">(x−2)(x−3) = 0</span></div>
    <div class="mg-tr"><span class="l">Factor cero</span><span class="r" style="color:var(--owl-green)">x=2 ó x=3</span></div>
  </div>`;
  if (kind === "tcp-visual") return `<div class="mg-vis">
    <div class="mg-band cat"><div class="h">TRINOMIO CUADRADO PERFECTO</div></div>
    <div class="mg-tr"><span class="l">x² − 6x + 9 = 0</span><span class="r">(x−3)² = 0</span></div>
    <div class="mg-tr"><span class="l">Raíz doble</span><span class="r" style="color:var(--owl-green)">x = 3</span></div>
    <div class="mg-tr"><span class="l">4x² + 12x + 9 = 0</span><span class="r">(2x+3)² = 0  →  x = −3/2</span></div>
  </div>`;
  if (kind === "diff-squares-vis") return `<div class="mg-vis">
    <div class="mg-band cat"><div class="h">DIFERENCIA DE CUADRADOS  (b = 0)</div></div>
    <div class="mg-tr"><span class="l">x² − 25 = 0</span><span class="r">(x−5)(x+5)=0</span></div>
    <div class="mg-tr"><span class="l">Raíces</span><span class="r" style="color:var(--owl-green)">x = ±5</span></div>
    <div class="mg-tr"><span class="l">4x² − 36 = 0  →  x² = 9</span><span class="r" style="color:var(--owl-green)">x = ±3</span></div>
  </div>`;
  // ── Nivel 3: Fórmula General ─────────────────────────────────────────────
  if (kind === "quadratic-formula") return `<div class="mg-vis">
    <div class="mg-band known"><div class="h">FÓRMULA GENERAL</div>
    <div class="l" style="font-size:17px;letter-spacing:0">x = (−b ± √Δ) / (2a)</div></div>
    <div class="mg-formula" style="font-size:14px;margin-top:8px">2x² − 7x + 3 = 0  →  a=2, b=−7, c=3</div>
    <div class="mg-tr"><span class="l">x = (7 ± √(49−24)) / 4 = (7 ± 5) / 4</span><span class="r" style="color:var(--owl-green)">x=3 ó x=½</span></div>
  </div>`;
  if (kind === "discriminant-cases") return `<div class="mg-vis">
    <div class="mg-tr"><span class="l">Δ > 0 (ej. Δ=9)</span><span class="r" style="color:var(--owl-green)">2 raíces distintas</span></div>
    <div class="mg-tr"><span class="l">Δ = 0</span><span class="r" style="color:var(--bee-shadow)">raíz doble</span></div>
    <div class="mg-tr"><span class="l">Δ < 0 (ej. Δ=−16)</span><span class="r" style="color:var(--cardinal)">sin raíces reales</span></div>
    <div style="text-align:center;color:rgb(var(--wolf));font-size:13px;margin-top:8px">Δ = b² − 4ac</div>
  </div>`;
  if (kind === "complete-square-steps") return `<div class="mg-vis">
    <div class="mg-formula" style="font-size:16px;padding:4px 0">x² + 6x − 7 = 0</div>
    <div class="mg-tr"><span class="l">① Pasar c: x² + 6x = 7</span><span class="r"></span></div>
    <div class="mg-tr"><span class="l">② Sumar (6/2)²=9 en ambos lados</span><span class="r">(x+3)²=16</span></div>
    <div class="mg-tr"><span class="l">③ Raíz cuadrada: x+3 = ±4</span><span class="r" style="color:var(--owl-green)">x=1 ó x=−7</span></div>
  </div>`;
  // ── Nivel 4: Aplicaciones ────────────────────────────────────────────────
  if (kind === "problem-strategy") return `<div class="mg-vis">
    <div class="mg-tr"><span class="l">① Identificar la incógnita</span><span class="r">Sea x = ___</span></div>
    <div class="mg-tr"><span class="l">② Traducir condiciones</span><span class="r">ecuación</span></div>
    <div class="mg-tr"><span class="l">③ Resolver</span><span class="r">x₁, x₂</span></div>
    <div class="mg-tr"><span class="l">④ Verificar en el contexto</span><span class="r">descartar raíces</span></div>
    <div class="mg-tr"><span class="l">⑤ Responder con unidades</span><span class="r">✓</span></div>
  </div>`;
  if (kind === "rect-area") return `<div class="mg-vis">
    <div class="mg-band cat"><div class="h">RECTÁNGULO: A = largo × ancho</div></div>
    <div class="mg-formula" style="font-size:16px;padding:4px 0">Ancho = x, Largo = x + 3, A = 40</div>
    <div class="mg-tr"><span class="l">x(x+3) = 40  →  x²+3x−40=0</span><span class="r"></span></div>
    <div class="mg-tr"><span class="l">(x+8)(x−5)=0  →  x=5 ó x=−8</span><span class="r" style="color:var(--owl-green)">x = 5 cm</span></div>
    <div style="text-align:center;color:rgb(var(--wolf));font-size:13px;margin-top:6px">Se descarta x = −8 (negativo)</div>
  </div>`;
  if (kind === "free-fall") return `<div class="mg-vis">
    <div class="mg-band known"><div class="h">MODELO DE CAÍDA LIBRE</div>
    <div class="l" style="font-size:15px;letter-spacing:0">h(t) = h₀ + v₀t − 5t²</div></div>
    <div class="mg-tr"><span class="l">Cuando llega al suelo:</span><span class="r">h(t) = 0</span></div>
    <div class="mg-tr"><span class="l">h₀ = 45, v₀ = 0: 45 − 5t² = 0</span><span class="r" style="color:var(--owl-green)">t = 3 s</span></div>
    <div style="text-align:center;color:rgb(var(--wolf));font-size:13px;margin-top:6px">Siempre se descarta t < 0</div>
  </div>`;
  return "";
}
