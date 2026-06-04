// js/worlds/world-4-data.js — Mundo 4: Funciones y Ecuaciones Cuadráticas
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
      challenges: [
        { type: "mc", tag: "Reto 1 · Apertura",
          prompt: "En la función f(x) = −3x² + 6x − 1, ¿hacia dónde abre la parábola?",
          options: [
            { label: "Hacia arriba, porque el coeficiente de x² es negativo", correct: false },
            { label: "Hacia abajo, porque a = −3 < 0", correct: true },
            { label: "Hacia la derecha, porque b = 6 > 0", correct: false },
            { label: "No forma una parábola, falta la constante", correct: false },
          ],
          hint: "El signo de a (coeficiente de x²) determina la apertura. a < 0 → parábola abre hacia abajo (forma ∩)." },
        { type: "vf", tag: "Reto 2 · Vértice",
          prompt: "En f(x) = 2x² − 8x + 5, el vértice se encuentra en x = 2.",
          options: [{ label: "Verdadero", correct: true }, { label: "Falso", correct: false }],
          hint: "Usa xv = −b/(2a) = −(−8)/(2·2) = 8/4 = 2. ✓" },
        { type: "mc", tag: "Reto 3 · Intersección eje Y",
          prompt: "¿Cuál es el valor de f(0) para la función f(x) = 4x² − 3x + 7?",
          options: [{ label: "−3", correct: false }, { label: "4", correct: false }, { label: "7", correct: true }, { label: "8", correct: false }],
          hint: "f(0) = 4(0)² − 3(0) + 7 = 7. La intersección con el eje Y siempre es (0, c)." },
        { type: "mc", tag: "Reto 4 · Calcular vértice",
          prompt: "Para f(x) = x² − 6x + 8, ¿cuáles son las coordenadas del vértice?",
          options: [
            { label: "(3, −1)", correct: true },
            { label: "(3, 1)", correct: false },
            { label: "(−3, −1)", correct: false },
            { label: "(6, 8)", correct: false },
          ],
          hint: "xv = −(−6)/(2·1) = 3. yv = f(3) = 9 − 18 + 8 = −1. Vértice: (3, −1)." },
        { type: "match", tag: "Reto 5 · Empareja (arrastra)",
          prompt: "Arrastra la característica que corresponde a cada función.",
          pairs: [
            { desc: "f(x) = x² + 4x + 4", sym: "Vértice en (−2, 0)" },
            { desc: "f(x) = −2x² + 1", sym: "Abre hacia abajo, vértice en (0, 1)" },
            { desc: "f(x) = 3(x − 1)² − 5", sym: "Vértice en (1, −5)" },
            { desc: "f(x) = x² − 9", sym: "Raíces en x = ±3" },
          ],
          symOrder: ["Vértice en (1, −5)", "Vértice en (−2, 0)", "Raíces en x = ±3", "Abre hacia abajo, vértice en (0, 1)"],
          hint: "En la forma f(x) = a(x−h)²+k, el vértice es (h, k). Si b=0 y c es cuadrado perfecto, busca raíces ±√c." },
        { type: "buildSeq", tag: "Reto 6 · Ordena los pasos 🏆",
          prompt: "Toca los pasos en orden para encontrar el vértice de f(x) = 2x² − 12x + 10.",
          bank: [
            "Identificar: a = 2, b = −12, c = 10",
            "xv = −(−12) / (2·2) = 12/4 = 3",
            "yv = f(3) = 2(9) − 12(3) + 10 = −8",
            "Vértice: (3, −8)",
          ],
          answers: [[
            "Identificar: a = 2, b = −12, c = 10",
            "xv = −(−12) / (2·2) = 12/4 = 3",
            "yv = f(3) = 2(9) − 12(3) + 10 = −8",
            "Vértice: (3, −8)",
          ]],
          hint: "El proceso: identificar a, b, c → calcular xv = −b/2a → evaluar yv = f(xv) → escribir el vértice." },
      ],
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
      challenges: [
        { type: "mc", tag: "Reto 1 · Factorizar",
          prompt: "¿Cuáles son las raíces de x² + 7x + 12 = 0?",
          options: [
            { label: "x = 3 y x = 4", correct: false },
            { label: "x = −3 y x = −4", correct: true },
            { label: "x = 3 y x = −4", correct: false },
            { label: "x = −3 y x = 4", correct: false },
          ],
          hint: "Busca m·n = 12 y m+n = 7. Son 3 y 4. Como el signo del término en x es positivo, ambas raíces son negativas: (x+3)(x+4)=0." },
        { type: "vf", tag: "Reto 2 · TCP",
          prompt: "La ecuación x² − 10x + 25 = 0 es un trinomio cuadrado perfecto con raíz doble x = 5.",
          options: [{ label: "Verdadero", correct: true }, { label: "Falso", correct: false }],
          hint: "Verifica: √25 = 5, y 2·x·5 = 10x ✓. Factoriza como (x−5)² = 0 → raíz doble x = 5." },
        { type: "mc", tag: "Reto 3 · Diferencia de cuadrados",
          prompt: "Resuelve: 2x² − 18 = 0",
          options: [
            { label: "x = ±9", correct: false },
            { label: "x = ±3", correct: true },
            { label: "x = 3 únicamente", correct: false },
            { label: "x = ±√18", correct: false },
          ],
          hint: "2x² = 18 → x² = 9 → x = ±√9 = ±3. Sin término en x → despeje directo." },
        { type: "buildSeq", tag: "Reto 4 · Ordena los pasos",
          prompt: "Toca los pasos en orden para resolver x² − x − 6 = 0 por factorización.",
          bank: [
            "Identificar: m·n = −6  y  m+n = −1",
            "Los números son m = 2, n = −3  ✓",
            "Factorizar: (x + 2)(x − 3) = 0",
            "Factor cero: x + 2 = 0  ó  x − 3 = 0",
            "Solución: x = −2  ó  x = 3",
          ],
          answers: [[
            "Identificar: m·n = −6  y  m+n = −1",
            "Los números son m = 2, n = −3  ✓",
            "Factorizar: (x + 2)(x − 3) = 0",
            "Factor cero: x + 2 = 0  ó  x − 3 = 0",
            "Solución: x = −2  ó  x = 3",
          ]],
          hint: "Primero busca m y n cuyo producto sea c y suma sea b, luego escribe los factores y aplica la propiedad del factor cero." },
        { type: "match", tag: "Reto 5 · Empareja método (arrastra)",
          prompt: "Arrastra el método de resolución más directo para cada ecuación.",
          pairs: [
            { desc: "x² − 16 = 0", sym: "Diferencia de cuadrados" },
            { desc: "x² − 8x + 16 = 0", sym: "Trinomio cuadrado perfecto" },
            { desc: "x² + 5x + 6 = 0", sym: "Factorización entera" },
            { desc: "x² − 3x − 10 = 0", sym: "Factorización con signos mixtos" },
          ],
          symOrder: ["Trinomio cuadrado perfecto", "Diferencia de cuadrados", "Factorización con signos mixtos", "Factorización entera"],
          hint: "Sin término x → diferencia de cuadrados. Término central = 2ab → TCP. Signos mixtos en c → factorización con signos mixtos." },
        { type: "mc", tag: "Reto 6 · Raíz doble 🏆",
          prompt: "¿Cuántas raíces reales distintas tiene (x − 4)² = 0?",
          options: [
            { label: "Ninguna, el cuadrado siempre da positivo", correct: false },
            { label: "Dos raíces: x = 4 y x = −4", correct: false },
            { label: "Una sola raíz (doble): x = 4", correct: true },
            { label: "Infinitas raíces", correct: false },
          ],
          hint: "Cuando factoriza como (x − r)² = 0, hay una única raíz real repetida. La parábola toca el eje X solo en x = 4, no lo cruza." },
      ],
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
      challenges: [
        { type: "mc", tag: "Reto 1 · Discriminante",
          prompt: "Para la ecuación 3x² − 5x + 1 = 0, ¿cuánto vale el discriminante Δ?",
          options: [{ label: "13", correct: true }, { label: "−13", correct: false }, { label: "37", correct: false }, { label: "−37", correct: false }],
          hint: "Δ = b² − 4ac = (−5)² − 4(3)(1) = 25 − 12 = 13. Como Δ > 0, hay dos raíces reales distintas." },
        { type: "match", tag: "Reto 2 · Empareja Δ (arrastra)",
          prompt: "Arrastra la situación de la parábola que corresponde a cada valor del discriminante.",
          pairs: [
            { desc: "Δ = 49", sym: "Dos raíces reales distintas" },
            { desc: "Δ = 0", sym: "La parábola es tangente al eje X" },
            { desc: "Δ = −4", sym: "La parábola no corta el eje X" },
            { desc: "Δ = 1", sym: "Dos raíces con radical simple" },
          ],
          symOrder: ["La parábola es tangente al eje X", "Dos raíces reales distintas", "Dos raíces con radical simple", "La parábola no corta el eje X"],
          hint: "Δ > 0 → 2 raíces. Δ = 0 → raíz doble (tangente). Δ < 0 → sin raíces reales." },
        { type: "mc", tag: "Reto 3 · Identificar coeficientes y Δ",
          prompt: "Para x² − 5x + 6 = 0, ¿cuáles son los valores correctos de a, b, c y Δ?",
          options: [
            { label: "a=1, b=−5, c=6, Δ=1", correct: true },
            { label: "a=1, b=5, c=6, Δ=49", correct: false },
            { label: "a=1, b=−5, c=6, Δ=−1", correct: false },
            { label: "a=0, b=−5, c=6, Δ=25", correct: false },
          ],
          hint: "a=1, b=−5, c=6. Δ = (−5)² − 4(1)(6) = 25 − 24 = 1. Como Δ=1 > 0, hay dos raíces reales." },
        { type: "buildSeq", tag: "Reto 4 · Ordena los pasos (Fórmula general)",
          prompt: "Toca los pasos en orden para resolver 2x² + 3x − 2 = 0 con la fórmula general.",
          bank: [
            "Identificar: a=2, b=3, c=−2",
            "Calcular: Δ = 3² − 4(2)(−2) = 9 + 16 = 25",
            "Aplicar: x = (−3 ± √25) / 4 = (−3 ± 5) / 4",
            "x₁ = (−3 + 5)/4 = 1/2",
            "x₂ = (−3 − 5)/4 = −2",
            "Verificar: 2(1/4)+3(1/2)−2 = 0 ✓",
          ],
          answers: [[
            "Identificar: a=2, b=3, c=−2",
            "Calcular: Δ = 3² − 4(2)(−2) = 9 + 16 = 25",
            "Aplicar: x = (−3 ± √25) / 4 = (−3 ± 5) / 4",
            "x₁ = (−3 + 5)/4 = 1/2",
            "x₂ = (−3 − 5)/4 = −2",
            "Verificar: 2(1/4)+3(1/2)−2 = 0 ✓",
          ]],
          hint: "El flujo siempre es: identificar → calcular Δ → sustituir en la fórmula → simplificar → verificar." },
        { type: "mc", tag: "Reto 5 · Aplicar fórmula general",
          prompt: "Resuelve usando la fórmula general: x² − 6x + 9 = 0.",
          options: [
            { label: "x = 3 y x = −3", correct: false },
            { label: "x = 3 (raíz doble)", correct: true },
            { label: "x = 6 y x = 9", correct: false },
            { label: "No tiene solución real", correct: false },
          ],
          hint: "Δ = 36 − 36 = 0 → raíz doble. x = 6/(2·1) = 3. También se reconoce como TCP: (x−3)²=0." },
        { type: "vf", tag: "Reto 6 · Raíces reales 🏆",
          prompt: "La ecuación x² + x + 1 = 0 no tiene soluciones reales.",
          options: [{ label: "Verdadero", correct: true }, { label: "Falso", correct: false }],
          hint: "Δ = 1² − 4(1)(1) = 1 − 4 = −3 < 0. Discriminante negativo → sin raíces reales. La parábola está por encima del eje X." },
      ],
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
      challenges: [
        { type: "mc", tag: "Reto 1 · Plantear ecuación",
          prompt: "La suma de un número y su cuadrado es 20. ¿Cuál es la ecuación correcta?",
          options: [
            { label: "x² + x − 20 = 0", correct: true },
            { label: "x · x = 20  →  2x² = 20", correct: false },
            { label: "x · x = 20  →  x = 20", correct: false },
            { label: "x² − x − 20 = 0", correct: false },
          ],
          hint: 'El enunciado dice "un número (x) más su cuadrado (x²) es 20": x + x² = 20 → x² + x − 20 = 0.' },
        { type: "mc", tag: "Reto 2 · Área de rectángulo",
          prompt: "Un rectángulo tiene ancho x y largo (x + 5). Si su área es 84 cm², ¿cuánto mide el ancho?",
          options: [{ label: "7 cm", correct: true }, { label: "12 cm", correct: false }, { label: "9 cm", correct: false }, { label: "14 cm", correct: false }],
          hint: "x(x+5) = 84 → x² + 5x − 84 = 0 → (x+12)(x−7) = 0. Se descarta x = −12, queda x = 7 cm." },
        { type: "vf", tag: "Reto 3 · Descartar raíz",
          prompt: "Al resolver x² − 3x − 10 = 0 en un problema de longitud, la solución válida es x = 5 (se descarta x = −2).",
          options: [{ label: "Verdadero", correct: true }, { label: "Falso", correct: false }],
          hint: "Las raíces son x = 5 y x = −2. En contextos de longitud, los valores negativos no tienen sentido físico." },
        { type: "buildSeq", tag: "Reto 4 · Ordena los pasos",
          prompt: "Toca los pasos en orden para resolver: el producto de dos enteros consecutivos es 72.",
          bank: [
            "Sea x el primer entero, x+1 el siguiente",
            "Plantear: x(x+1) = 72  →  x² + x − 72 = 0",
            "Factorizar: (x−8)(x+9) = 0  →  x = 8 ó x = −9",
            "Números: 8 y 9  (ó −9 y −8)",
            "Verificar: 8×9 = 72 ✓  y  (−9)(−8) = 72 ✓",
          ],
          answers: [[
            "Sea x el primer entero, x+1 el siguiente",
            "Plantear: x(x+1) = 72  →  x² + x − 72 = 0",
            "Factorizar: (x−8)(x+9) = 0  →  x = 8 ó x = −9",
            "Números: 8 y 9  (ó −9 y −8)",
            "Verificar: 8×9 = 72 ✓  y  (−9)(−8) = 72 ✓",
          ]],
          hint: "El flujo para todo problema: definir variable → plantear ecuación → resolver → interpretar → verificar." },
        { type: "mc", tag: "Reto 5 · Caída libre",
          prompt: "Un objeto cae desde 45 m de altura. Usando h(t) = 45 − 5t² = 0, ¿cuánto tarda en llegar al suelo?",
          options: [{ label: "t = 3 s", correct: true }, { label: "t = 9 s", correct: false }, { label: "t = 5 s", correct: false }, { label: "t = √45 s", correct: false }],
          hint: "45 − 5t² = 0 → 5t² = 45 → t² = 9 → t = 3 s. Despeje directo (sin término lineal en t)." },
        { type: "mc", tag: "Reto 6 · Triángulo 🏆",
          prompt: "La base de un triángulo es (2x+1) cm y su altura (x−2) cm. Si el área es 12 cm², ¿qué ecuación describe la situación?",
          options: [
            { label: "(2x+1)(x−2) = 12", correct: false },
            { label: "½(2x+1)(x−2) = 12", correct: true },
            { label: "(2x+1) + (x−2) = 12", correct: false },
            { label: "2(2x+1)(x−2) = 12", correct: false },
          ],
          hint: "Área del triángulo = ½ · base · altura = ½(2x+1)(x−2) = 12. Recuerda el factor ½ para triángulos." },
      ],
    },

  ],
};

export const FUTURE_NODES = [
  { node: "Inecuaciones Cuadráticas" },
  { node: "Funciones Trigonométricas" },
];

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
