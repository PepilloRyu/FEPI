// js/worlds/world-3-data.js — Mundo 3: Funciones y Ecuaciones Lineales
export const WORLD = {
  id: 3,
  title: "Funciones y Ecuaciones Lineales",
  subtitle: "Descifra el lenguaje de las relaciones entre variables",
  levels: [

    // ── NIVEL 1: Concepto de Función y Ecuación ──────────────────────────────
    {
      id: 1, icon: "🔗", node: "Funciones y Ecuaciones", title: "Funciones y Ecuaciones",
      subtitle: "Las bases del lenguaje algebraico relacional",
      theory: [
        { icon: "🎯", tag: "Teoría 1 / 4", title: "¿Qué es una función?",
          body: "Una función es una relación entre dos conjuntos donde a cada elemento del dominio le corresponde exactamente un elemento del rango. Se escribe como f(x) = expresión. Así, f(x) = 3x − 2 asigna a cada x un único resultado.",
          visual: "func-eval",
          key: "Imagina una función como una máquina: metes un número y obtienes exactamente un resultado. Nunca dos." },
        { icon: "📦", tag: "Teoría 2 / 4", title: "Dominio y Rango",
          body: "El dominio es el conjunto de todos los valores de entrada (x) permitidos. El rango es el conjunto de todos los valores de salida posibles. En una función lineal f(x) = mx + b, tanto el dominio como el rango son todos los números reales (ℝ).",
          visual: "domain-range",
          key: "Para funciones lineales, dominio = ℝ y rango = ℝ, salvo que el problema indique restricciones." },
        { icon: "⚖️", tag: "Teoría 3 / 4", title: "¿Qué es una ecuación?",
          body: "Una ecuación es una igualdad que contiene una o más incógnitas. Resolverla significa encontrar el valor de la incógnita que hace verdadera la igualdad. Las ecuaciones de primer grado tienen la forma ax + b = c, con a ≠ 0.",
          visual: "equation-balance",
          key: "Piensa en la ecuación como una balanza: lo que haces a un lado debes hacerlo al otro para mantener el equilibrio." },
        { icon: "⚡", tag: "Teoría 4 / 4", title: "Función vs Ecuación",
          body: "Una función describe una regla general — f(x) = 2x + 1 para cualquier x. Una ecuación busca el valor específico de x que cumple una condición — 2x + 1 = 7. Cuando igualamos una función a un valor, la convertimos en ecuación: f(x) = 7.",
          visual: "func-vs-eq",
          key: "La función es la descripción general; la ecuación es la pregunta específica." },
      ],
      challenges: [
        { type: "mc", tag: "Reto 1 · Evaluar",
          prompt: "Si f(x) = 4x − 2, ¿cuál es el valor de f(3)?",
          options: [{ label: "10", correct: true }, { label: "12", correct: false }, { label: "14", correct: false }, { label: "9", correct: false }],
          hint: "Sustituye x = 3: f(3) = 4(3) − 2 = 12 − 2 = 10." },
        { type: "vf", tag: "Reto 2 · Verdadero o Falso",
          prompt: "En la función f(x) = 5x + 1, el valor de f(0) es 1.",
          options: [{ label: "Verdadero", correct: true }, { label: "Falso", correct: false }],
          hint: "Cuando x = 0, el resultado siempre es el término independiente: f(0) = 5(0) + 1 = 1." },
        { type: "slots", tag: "Reto 3 · Completa (arrastra)",
          prompt: "Arrastra las palabras en el orden en que aparecen en la definición: una función asigna cada elemento del [1°] a exactamente un elemento del [2°].",
          slots: 2, bank: ["dominio", "rango", "conjunto", "variable", "incógnita"], answer: ["dominio", "rango"],
          hint: "La entrada se llama DOMINIO y la salida se llama RANGO." },
        { type: "mc", tag: "Reto 4 · Identificar",
          prompt: "¿Cuál de estas representa una ECUACIÓN (no una función)?",
          options: [
            { label: "f(x) = 3x + 7", correct: false },
            { label: "3x + 7 = 19", correct: true },
            { label: "y = 3x + 7", correct: false },
            { label: "g(x) = 7 + 3x", correct: false },
          ],
          hint: "Una ecuación pide encontrar un valor específico de x, no describe una regla general. Busca la igualdad con un número al otro lado." },
        { type: "mc", tag: "Reto 5 · Evaluar",
          prompt: "Si f(x) = 3x − 1, ¿cuál es el valor de f(2)?",
          options: [{ label: "5", correct: true }, { label: "7", correct: false }, { label: "6", correct: false }, { label: "4", correct: false }],
          hint: "Sustituye x = 2: f(2) = 3(2) − 1 = 6 − 1 = 5." },
        { type: "vf", tag: "Reto 6 · Lineal o no 🏆",
          prompt: "f(x) = x² es una función lineal.",
          options: [{ label: "Verdadero", correct: false }, { label: "Falso", correct: true }],
          hint: "Las funciones lineales tienen la forma f(x) = mx + b, con x a la primera potencia. En x², el exponente es 2 → es cuadrática, no lineal." },
      ],
    },

    // ── NIVEL 2: Ecuaciones de Primer Grado ──────────────────────────────────
    {
      id: 2, icon: "🔍", node: "Ecuaciones 1.° grado", title: "Ecuaciones de Primer Grado",
      subtitle: "Resuelve la incógnita paso a paso",
      theory: [
        { icon: "↔️", tag: "Teoría 1 / 4", title: "Transponer términos",
          body: "Para resolver una ecuación, transpone los términos con incógnita al lado izquierdo y los números al derecho. Al transponer un término cambia de signo: si suma, pasa restando; si multiplica, pasa dividiendo.",
          visual: "transpose",
          key: "La regla de oro: lo que haces a un lado de la igualdad, lo haces al otro." },
        { icon: "🔧", tag: "Teoría 2 / 4", title: "Ecuaciones con paréntesis",
          body: "Cuando hay paréntesis, primero aplica la propiedad distributiva para eliminarlos: a(b + c) = ab + ac. Si hay un signo negativo frente al paréntesis, cambia el signo de todos sus términos. Luego agrupa y despeja.",
          visual: "parentheses",
          key: "Siempre elimina paréntesis antes de mover términos de un lado al otro." },
        { icon: "🍕", tag: "Teoría 3 / 4", title: "Ecuaciones con fracciones",
          body: "Cuando hay fracciones, multiplica todos los términos por el MCM de los denominadores para eliminarlas. Esto convierte la ecuación en una ecuación entera más fácil de resolver.",
          visual: "fractions",
          key: "El MCM es tu mejor aliado para deshacerte de fracciones en ecuaciones." },
        { icon: "📝", tag: "Teoría 4 / 4", title: "Planteamiento de problemas",
          body: "Para problemas de texto: 1) Lee con atención. 2) Identifica la incógnita y nómbrala x. 3) Traduce las condiciones a una ecuación. 4) Resuelve. 5) Verifica que la solución tenga sentido.",
          visual: "word-keys",
          key: 'Palabras clave: "aumentado en" = suma, "disminuido en" = resta, "el triple de" = 3x, "la mitad de" = x/2.' },
      ],
      challenges: [
        { type: "buildSeq", tag: "Reto 1 · Ordena los pasos",
          prompt: "Toca los bloques en el orden correcto para resolver: 5x − 3 = 17",
          bank: ["Ecuación original: 5x − 3 = 17", "Transponer −3: 5x = 17 + 3", "Simplificar: 5x = 20", "Dividir entre 5: x = 4", "Verificación: 5(4) − 3 = 17 ✓"],
          answers: [["Ecuación original: 5x − 3 = 17", "Transponer −3: 5x = 17 + 3", "Simplificar: 5x = 20", "Dividir entre 5: x = 4", "Verificación: 5(4) − 3 = 17 ✓"]],
          hint: "Primero transpón el término independiente al otro lado, luego divide para despejar x." },
        { type: "mc", tag: "Reto 2 · Resolver",
          prompt: "¿Cuál es la solución de la ecuación  2x + 7 = 3x − 5 ?",
          options: [{ label: "x = 12", correct: true }, { label: "x = −12", correct: false }, { label: "x = 2", correct: false }, { label: "x = −2", correct: false }],
          hint: "Transpón 2x hacia la derecha y −5 hacia la izquierda: 7 + 5 = 3x − 2x → 12 = x." },
        { type: "mc", tag: "Reto 3 · Con paréntesis",
          prompt: "Resuelve: 3(2x − 4) = 6x − 12 + x",
          options: [{ label: "x = 0", correct: true }, { label: "No tiene solución", correct: false }, { label: "x = cualquier real", correct: false }, { label: "x = 12", correct: false }],
          hint: "Aplica distributiva: 6x − 12 = 7x − 12. Transponiendo: 6x − 7x = 0 → x = 0." },
        { type: "mc", tag: "Reto 4 · Con fracciones",
          prompt: "Resuelve: x/3 + 2 = 6",
          options: [{ label: "x = 12", correct: true }, { label: "x = 6", correct: false }, { label: "x = 18", correct: false }, { label: "x = 9", correct: false }],
          hint: "Multiplica todo por 3 para eliminar la fracción: x + 6 = 18. Despeja: x = 12." },
        { type: "vf", tag: "Reto 5 · Verificar",
          prompt: "La solución de la ecuación 4(x − 1) = 2(x + 3) es x = 5.",
          options: [{ label: "Verdadero", correct: true }, { label: "Falso", correct: false }],
          hint: "Distributiva: 4x − 4 = 2x + 6 → 2x = 10 → x = 5. Verifica: 4(4)=16 y 2(6)=16 ✓" },
        { type: "mc", tag: "Reto 6 · Problema aplicado 🏆",
          prompt: "El doble de un número aumentado en 9 es igual a 35. ¿Cuál es el número?",
          options: [{ label: "13", correct: true }, { label: "11", correct: false }, { label: "22", correct: false }, { label: "8", correct: false }],
          hint: 'Ecuación: 2x + 9 = 35. "El doble de" = 2x, "aumentado en 9" = +9. Despeja: 2x = 26 → x = 13.' },
      ],
    },

    // ── NIVEL 3: Sistemas de Ecuaciones 2×2 ──────────────────────────────────
    {
      id: 3, icon: "🔀", node: "Sistemas 2×2", title: "Sistemas de Ecuaciones 2×2",
      subtitle: "Dos ecuaciones, dos incógnitas — cuatro métodos",
      theory: [
        { icon: "🔄", tag: "Teoría 1 / 4", title: "Método de Sustitución",
          body: "1) Despeja una incógnita en una de las ecuaciones. 2) Sustituye esa expresión en la otra ecuación. 3) Resuelve con una sola incógnita. 4) Sustituye el valor encontrado para hallar la otra.",
          visual: "substitution",
          key: "Elige la ecuación más sencilla para despejar. Busca coeficientes de 1 o −1." },
        { icon: "➖", tag: "Teoría 2 / 4", title: "Método de Reducción",
          body: "1) Multiplica una o ambas ecuaciones por constantes para que los coeficientes de una incógnita sean iguales y opuestos. 2) Suma las ecuaciones para eliminar esa incógnita. 3) Resuelve. 4) Sustituye.",
          visual: "elimination",
          key: "Si los coeficientes ya son opuestos, suma directamente. Si son iguales, resta las ecuaciones." },
        { icon: "🤝", tag: "Teoría 3 / 4", title: "Método de Igualación",
          body: "1) Despeja la misma incógnita en ambas ecuaciones. 2) Iguala las dos expresiones obtenidas. 3) Resuelve la ecuación resultante. 4) Sustituye para hallar la otra incógnita.",
          visual: "equaling",
          key: "Despeja la incógnita que tenga el mismo coeficiente en ambas ecuaciones." },
        { icon: "📐", tag: "Teoría 4 / 4", title: "Regla de Cramer",
          body: "Para el sistema ax + by = e y cx + dy = f, usa determinantes: D = ad − bc, Dx = ed − bf, Dy = af − ec. Solución: x = Dx/D y = Dy/D, siempre que D ≠ 0.",
          visual: "cramer-det",
          key: "Cramer requiere calcular 3 determinantes. Úsalo cuando los coeficientes no simplifican fácilmente." },
      ],
      challenges: [
        { type: "mc", tag: "Reto 1 · Sustitución",
          prompt: "Resuelve el sistema por sustitución:\n  x + y = 10\n  x − y = 2",
          options: [
            { label: "x = 6, y = 4", correct: true },
            { label: "x = 4, y = 6", correct: false },
            { label: "x = 8, y = 2", correct: false },
            { label: "x = 5, y = 5", correct: false },
          ],
          hint: "De la 1ª ecuación: x = 10 − y. Sustituye en la 2ª: (10−y)−y = 2 → 10−2y = 2 → y = 4. Luego x = 6." },
        { type: "buildSeq", tag: "Reto 2 · Ordena los pasos (Reducción)",
          prompt: "Toca los pasos en orden para resolver por reducción:\n  3x + y = 11\n  x − y = 1",
          bank: ["Sumamos las dos ecuaciones: 4x = 12", "Dividimos: x = 3", "Sustituimos en x − y = 1: 3 − y = 1", "Despejamos: y = 2", "Solución: (3, 2)"],
          answers: [["Sumamos las dos ecuaciones: 4x = 12", "Dividimos: x = 3", "Sustituimos en x − y = 1: 3 − y = 1", "Despejamos: y = 2", "Solución: (3, 2)"]],
          hint: "Al sumar las ecuaciones, la y se elimina porque y + (−y) = 0. Obtienes 4x = 12." },
        { type: "mc", tag: "Reto 3 · Determinante (Cramer)",
          prompt: "Usando la Regla de Cramer, el determinante D del sistema  2x + y = 5  /  3x − 2y = 4  es:",
          options: [{ label: "−7", correct: true }, { label: "7", correct: false }, { label: "−4", correct: false }, { label: "10", correct: false }],
          hint: "D = (2)(−2) − (1)(3) = −4 − 3 = −7. El determinante es la diferencia cruzada de los coeficientes." },
        { type: "vf", tag: "Reto 4 · Infinitas soluciones",
          prompt: "El sistema  x + y = 5  /  2x + 2y = 10  tiene infinitas soluciones.",
          options: [{ label: "Verdadero", correct: true }, { label: "Falso", correct: false }],
          hint: "La segunda ecuación es exactamente el doble de la primera: son la misma recta. Sistema dependiente = infinitas soluciones." },
        { type: "match", tag: "Reto 5 · Empareja método (arrastra)",
          prompt: "Arrastra el método más conveniente para cada sistema.",
          pairs: [
            { desc: "x = 3y + 1  /  2x + y = 8", sym: "Sustitución" },
            { desc: "3x + 2y = 14  /  3x − 2y = 2", sym: "Reducción" },
            { desc: "x + 2y = 9  /  x + y = 6", sym: "Igualación" },
            { desc: "2x + 3y = 7  /  5x − y = 3", sym: "Cramer" },
          ],
          symOrder: ["Reducción", "Sustitución", "Cramer", "Igualación"],
          hint: "Sustitución: ya hay una variable despejada. Reducción: mismos coeficientes opuestos. Igualación: mismo coeficiente en ambas. Cramer: coeficientes variados." },
        { type: "mc", tag: "Reto 6 · Problema aplicado 🏆",
          prompt: "En una tienda, 2 cuadernos y 1 pluma cuestan $35. 1 cuaderno y 2 plumas cuestan $25. ¿Cuánto cuesta cada cuaderno?",
          options: [{ label: "$15", correct: true }, { label: "$10", correct: false }, { label: "$5", correct: false }, { label: "$20", correct: false }],
          hint: "Sistema: 2c + p = 35 y c + 2p = 25. Multiplica la 2ª por 2: 2c + 4p = 50. Resta a la 1ª: 3p = 15 → p = 5. Luego c = 15." },
      ],
    },

    // ── NIVEL 4: Sistemas 3×3 y Aplicaciones ─────────────────────────────────
    {
      id: 4, icon: "🌍", node: "Sistemas 3×3", title: "Sistemas 3×3 y Aplicaciones",
      subtitle: "Tres incógnitas y problemas del mundo real",
      theory: [
        { icon: "🧊", tag: "Teoría 1 / 4", title: "Sistemas de Tres Ecuaciones",
          body: "Un sistema 3×3 tiene tres ecuaciones y tres incógnitas (x, y, z). Estrategia: 1) Elige dos pares de ecuaciones y elimina la misma incógnita en ambos. 2) Obtienes un sistema 2×2. 3) Resuélvelo. 4) Sustituye para la tercera incógnita.",
          visual: "system3x3",
          key: "La clave es reducir el sistema 3×3 a un 2×2, eliminando siempre la misma variable en los dos pares." },
        { icon: "🧪", tag: "Teoría 2 / 4", title: "Problemas de Mezclas",
          body: "En los problemas de mezclas se combinan sustancias con diferentes concentraciones o precios. La ecuación es: (cantidad₁)(valor₁) + (cantidad₂)(valor₂) = (cantidad total)(valor resultado). Siempre verifica que las cantidades sumen el total.",
          visual: "mixtures-eq",
          key: "Dibuja una tabla con: sustancia, concentración o precio, y cantidad. Ayuda a plantear las dos ecuaciones." },
        { icon: "🚂", tag: "Teoría 3 / 4", title: "Problemas de Movimiento",
          body: "Usa d = v × t (distancia = velocidad × tiempo). En problemas de dos móviles: si van en sentidos contrarios, suma sus velocidades; si van en el mismo sentido, resta. Plantea la ecuación según la condición de igualdad.",
          visual: "movement-dvt",
          key: "Si van en el mismo sentido y uno alcanza al otro: d₁ = d₂. Si se alejan o acercan: d₁ + d₂ = distancia total." },
        { icon: "💰", tag: "Teoría 4 / 4", title: "Problemas de Edades y Dinero",
          body: "En problemas de edades, define la edad actual de cada persona como incógnita o en términos de una incógnita. Para problemas futuros o pasados, suma o resta los años. En problemas de dinero, identifica precio, cantidad y total.",
          visual: "ages-table",
          key: "Arma una tabla con las edades AHORA y DENTRO DE N AÑOS para cada persona. Facilita plantear la ecuación." },
      ],
      challenges: [
        { type: "mc", tag: "Reto 1 · Sistema 3×3",
          prompt: "En el sistema 3×3:\n  x + y + z = 9\n  x − y + z = 3\n  x + y − z = 5\n¿Cuál es el valor de x?",
          options: [{ label: "x = 4", correct: true }, { label: "x = 3", correct: false }, { label: "x = 5", correct: false }, { label: "x = 2", correct: false }],
          hint: "Suma (1)+(2): x+z = 6. Suma (1)+(3): x+y = 7. Con x+y=7 y x+z=6, sustituye en la ec (1): x+(7−x)+(6−x)=9 → 13−x=9 → x=4." },
        { type: "mc", tag: "Reto 2 · Movimiento",
          prompt: "Dos ciclistas parten del mismo punto en sentidos contrarios: uno a 15 km/h y otro a 20 km/h. ¿En cuántas horas estarán a 105 km de distancia?",
          options: [{ label: "3 horas", correct: true }, { label: "5 horas", correct: false }, { label: "7 horas", correct: false }, { label: "4 horas", correct: false }],
          hint: "Ecuación: 15t + 20t = 105 → 35t = 105 → t = 3 horas." },
        { type: "mc", tag: "Reto 3 · Edades 🏆",
          prompt: "La edad de Carlos es el triple de la de su hermano. Hace 4 años la suma de sus edades era 24. ¿Cuántos años tiene Carlos ahora?",
          options: [{ label: "24", correct: true }, { label: "27", correct: false }, { label: "18", correct: false }, { label: "9", correct: false }],
          hint: "Sea x = hermano ahora, 3x = Carlos ahora. Hace 4 años: (x−4)+(3x−4)=24 → 4x−8=24 → x=8. Carlos ahora: 3×8 = 24 años." },
        { type: "vf", tag: "Reto 4 · Estrategia 3×3",
          prompt: "Para resolver un sistema 3×3 se puede reducir a dos sistemas 2×2 eliminando la misma incógnita en ambos pares de ecuaciones.",
          options: [{ label: "Verdadero", correct: true }, { label: "Falso", correct: false }],
          hint: "Exacto. Elimina la misma variable entre (ec1, ec2) y entre (ec1, ec3) para obtener un sistema 2×2 resoluble." },
        { type: "buildSeq", tag: "Reto 5 · Ordena los pasos (Mezclas)",
          prompt: "Toca los pasos en orden para resolver: mezclar café a $80/kg con café a $50/kg para obtener 30 kg a $60/kg.",
          bank: [
            "Sea x = kg a $80 e y = kg a $50",
            "Ecuación de cantidad: x + y = 30",
            "Ecuación de valor: 80x + 50y = 1800",
            "Sustituir y = 30 − x: 80x + 50(30−x) = 1800",
            "30x = 300 → x = 10 kg",
            "Respuesta: 10 kg a $80 y 20 kg a $50",
          ],
          answers: [[
            "Sea x = kg a $80 e y = kg a $50",
            "Ecuación de cantidad: x + y = 30",
            "Ecuación de valor: 80x + 50y = 1800",
            "Sustituir y = 30 − x: 80x + 50(30−x) = 1800",
            "30x = 300 → x = 10 kg",
            "Respuesta: 10 kg a $80 y 20 kg a $50",
          ]],
          hint: "Los problemas de mezcla siempre tienen DOS ecuaciones: una de cantidades (x+y=total) y otra de valores o concentraciones." },
        { type: "match", tag: "Reto 6 · Tipo de problema (arrastra)",
          prompt: "Arrastra el tipo de aplicación que corresponde a cada enunciado.",
          pairs: [
            { desc: "Dos trenes se acercan a 90 y 110 km/h", sym: "Movimiento" },
            { desc: "Ana tiene el doble de años que Luis", sym: "Edades" },
            { desc: "Mezclar alcohol al 70% y al 30%", sym: "Mezclas" },
            { desc: "3 lápices y 2 borradores cuestan $25", sym: "Dinero" },
          ],
          symOrder: ["Edades", "Movimiento", "Dinero", "Mezclas"],
          hint: "Cada tipo tiene su propia estructura: movimiento usa d=vt, edades suma años, mezclas combina concentraciones, dinero plantea precio×cantidad." },
      ],
    },

  ],
};

export const FUTURE_NODES = [
  { node: "Desigualdades Lineales" },
  { node: "Funciones Cuadráticas" },
];

export function getVisual(kind) {
  // ── Nivel 1: Funciones y Ecuaciones ─────────────────────────────────────
  if (kind === "func-eval") return `<div class="mg-vis">
    <div class="mg-band cat"><div class="h">f(x) = 3x − 2</div></div>
    <div class="mg-tr"><span class="l">f(0) = 3(0) − 2</span><span class="r" style="color:var(--mathgo-blue)">= −2</span></div>
    <div class="mg-tr"><span class="l">f(1) = 3(1) − 2</span><span class="r" style="color:var(--mathgo-blue)">= 1</span></div>
    <div class="mg-tr"><span class="l">f(4) = 3(4) − 2</span><span class="r" style="color:var(--mathgo-blue)">= 10</span></div>
  </div>`;
  if (kind === "domain-range") return `<div class="mg-vis">
    <div class="mg-band known"><div class="h">DOMINIO — entradas (x)</div>
    <div class="l" style="font-size:15px;letter-spacing:1px">Todos los reales ℝ</div></div>
    <div class="mg-band cat"><div class="h">f(x) = 2x + 3</div></div>
    <div class="mg-band unknown"><div class="h">RANGO — salidas f(x)</div>
    <div class="l" style="font-size:15px;letter-spacing:1px">Todos los reales ℝ</div></div>
  </div>`;
  if (kind === "equation-balance") return `<div class="mg-vis">
    <div class="mg-formula" style="font-size:22px;padding:6px 0">2x + 3 = 11</div>
    <div class="mg-tr"><span class="l">Transponer +3</span><span class="r" style="color:var(--mathgo-blue)">2x = 8</span></div>
    <div class="mg-tr"><span class="l">Dividir entre 2</span><span class="r" style="color:var(--owl-green)">x = 4</span></div>
    <div style="text-align:center;color:rgb(var(--wolf));font-size:13px;margin-top:8px">Verificación: 2(4) + 3 = 11 ✓</div>
  </div>`;
  if (kind === "func-vs-eq") return `<div class="mg-vis">
    <div class="mg-tr"><span class="l">Función — regla general</span><span class="r" style="color:var(--mathgo-blue)">f(x) = 2x+1</span></div>
    <div class="mg-tr"><span class="l">Ecuación — valor específico</span><span class="r" style="color:var(--cardinal)">2x+1 = 7</span></div>
    <div class="mg-formula" style="font-size:16px;margin-top:10px">f(x) = 7 → 2x + 1 = 7 → x = 3</div>
  </div>`;
  // ── Nivel 2: Ecuaciones de Primer Grado ─────────────────────────────────
  if (kind === "transpose") return `<div class="mg-vis">
    <div class="mg-formula" style="font-size:20px;padding:4px 0">3x + 5 = 14</div>
    <div class="mg-tr"><span class="l">Transponer +5 → cambia a −5</span><span class="r" style="color:var(--mathgo-blue)">3x = 9</span></div>
    <div class="mg-tr"><span class="l">Dividir entre 3</span><span class="r" style="color:var(--owl-green)">x = 3</span></div>
    <div style="text-align:center;color:rgb(var(--wolf));font-size:13px;margin-top:8px">Verificación: 3(3) + 5 = 14 ✓</div>
  </div>`;
  if (kind === "parentheses") return `<div class="mg-vis">
    <div class="mg-formula" style="font-size:18px;padding:4px 0">2(x + 3) = x + 10</div>
    <div class="mg-tr"><span class="l">Distributiva</span><span class="r" style="color:var(--mathgo-blue)">2x + 6 = x + 10</span></div>
    <div class="mg-tr"><span class="l">Transponer x y 6</span><span class="r" style="color:var(--mathgo-blue)">2x − x = 10 − 6</span></div>
    <div class="mg-tr"><span class="l">Simplificar</span><span class="r" style="color:var(--owl-green)">x = 4</span></div>
  </div>`;
  if (kind === "fractions") return `<div class="mg-vis">
    <div class="mg-formula" style="font-size:20px;padding:4px 0">x/2 + x/3 = 5</div>
    <div class="mg-tr"><span class="l">MCM(2, 3) = 6. Multiplicar por 6</span><span class="r" style="color:var(--mathgo-blue)">3x + 2x = 30</span></div>
    <div class="mg-tr"><span class="l">Simplificar</span><span class="r" style="color:var(--mathgo-blue)">5x = 30</span></div>
    <div class="mg-tr"><span class="l">Dividir entre 5</span><span class="r" style="color:var(--owl-green)">x = 6</span></div>
  </div>`;
  if (kind === "word-keys") return `<div class="mg-vis">
    <div class="mg-tr"><span class="l">"aumentado en N"</span><span class="r">+ N</span></div>
    <div class="mg-tr"><span class="l">"disminuido en N"</span><span class="r">− N</span></div>
    <div class="mg-tr"><span class="l">"el triple de x"</span><span class="r">3x</span></div>
    <div class="mg-tr"><span class="l">"la mitad de x"</span><span class="r">x / 2</span></div>
    <div class="mg-tr"><span class="l">"es igual a"</span><span class="r">=</span></div>
  </div>`;
  // ── Nivel 3: Sistemas 2×2 ────────────────────────────────────────────────
  if (kind === "substitution") return `<div class="mg-vis">
    <div class="mg-band cat"><div class="h">Sistema: x + y = 7 · 2x − y = 2</div></div>
    <div class="mg-tr"><span class="l">De ec(1): x = 7 − y</span><span class="r">despejar</span></div>
    <div class="mg-tr"><span class="l">En ec(2): 2(7−y) − y = 2</span><span class="r">sustituir</span></div>
    <div class="mg-tr"><span class="l">14 − 3y = 2 → y = 4</span><span class="r" style="color:var(--owl-green)">y = 4</span></div>
    <div class="mg-tr"><span class="l">x = 7 − 4</span><span class="r" style="color:var(--owl-green)">x = 3</span></div>
  </div>`;
  if (kind === "elimination") return `<div class="mg-vis">
    <div class="mg-band cat"><div class="h">Sistema: 3x + 2y = 16 · x − 2y = 0</div></div>
    <div class="mg-tr"><span class="l">Los coeficientes de y son opuestos</span><span class="r">suma directa</span></div>
    <div class="mg-tr"><span class="l">Sumar: 4x = 16</span><span class="r" style="color:var(--owl-green)">x = 4</span></div>
    <div class="mg-tr"><span class="l">En ec(2): 4 − 2y = 0</span><span class="r" style="color:var(--owl-green)">y = 2</span></div>
  </div>`;
  if (kind === "equaling") return `<div class="mg-vis">
    <div class="mg-band cat"><div class="h">Sistema: 2x + y = 8 · x + y = 5</div></div>
    <div class="mg-tr"><span class="l">De ec(1): y = 8 − 2x</span><span class="r">despejar y</span></div>
    <div class="mg-tr"><span class="l">De ec(2): y = 5 − x</span><span class="r">despejar y</span></div>
    <div class="mg-tr"><span class="l">Igualar: 8 − 2x = 5 − x</span><span class="r" style="color:var(--owl-green)">x = 3</span></div>
    <div class="mg-tr"><span class="l">y = 5 − 3</span><span class="r" style="color:var(--owl-green)">y = 2</span></div>
  </div>`;
  if (kind === "cramer-det") return `<div class="mg-vis">
    <div class="mg-band cat"><div class="h">Sistema: 2x + 3y = 7 · x − 2y = 0</div></div>
    <div class="mg-tr"><span class="l">D = ad − bc = (2)(−2)−(3)(1)</span><span class="r" style="color:var(--cardinal)">D = −7</span></div>
    <div class="mg-tr"><span class="l">Dx = (7)(−2)−(3)(0) = −14</span><span class="r">x = −14/−7</span></div>
    <div class="mg-tr"><span class="l">Dy = (2)(0)−(7)(1) = −7</span><span class="r">y = −7/−7</span></div>
    <div class="mg-formula" style="font-size:18px;margin-top:8px">Solución: x = 2 · y = 1 ✓</div>
  </div>`;
  // ── Nivel 4: Sistemas 3×3 y Aplicaciones ────────────────────────────────
  if (kind === "system3x3") return `<div class="mg-vis">
    <div class="mg-band cat"><div class="h">Sistema 3×3 → reducir a 2×2</div></div>
    <div class="mg-tr"><span class="l">① Eliminar z en (ec1, ec2)</span><span class="r">→ ecuación A</span></div>
    <div class="mg-tr"><span class="l">② Eliminar z en (ec1, ec3)</span><span class="r">→ ecuación B</span></div>
    <div class="mg-tr"><span class="l">③ Resolver sistema A y B</span><span class="r">→ x, y</span></div>
    <div class="mg-tr"><span class="l">④ Sustituir para hallar z</span><span class="r">→ z</span></div>
  </div>`;
  if (kind === "mixtures-eq") return `<div class="mg-vis">
    <div class="mg-band known"><div class="h">ECUACIÓN DE MEZCLA</div>
    <div class="l" style="font-size:14px;letter-spacing:0">c₁ · q₁ + c₂ · q₂ = c_f · (q₁ + q₂)</div></div>
    <div class="mg-tr"><span class="l">Cantidad total</span><span class="r">q₁ + q₂ = total</span></div>
    <div class="mg-tr"><span class="l">Valor/concentración</span><span class="r">c₁·q₁ + c₂·q₂ = c_f·total</span></div>
    <div style="text-align:center;color:rgb(var(--wolf));font-size:13px;margin-top:8px">Siempre son DOS ecuaciones</div>
  </div>`;
  if (kind === "movement-dvt") return `<div class="mg-vis">
    <div class="mg-band cat"><div class="h">d = v × t</div></div>
    <div class="mg-tr"><span class="l">Sentidos contrarios</span><span class="r">d₁ + d₂ = D</span></div>
    <div class="mg-tr"><span class="l">Mismo sentido (alcance)</span><span class="r">d₁ = d₂</span></div>
    <div class="mg-tr"><span class="l">Ejemplo: 80t + 70t = 300</span><span class="r" style="color:var(--owl-green)">t = 2 h</span></div>
  </div>`;
  if (kind === "ages-table") return `<div class="mg-vis">
    <div class="mg-band cat"><div class="h">TABLA DE EDADES</div></div>
    <div class="mg-tr"><span class="l">Luis AHORA</span><span class="r">x</span></div>
    <div class="mg-tr"><span class="l">Ana AHORA (doble)</span><span class="r">2x</span></div>
    <div class="mg-tr"><span class="l">Luis en 5 años</span><span class="r">x + 5</span></div>
    <div class="mg-tr"><span class="l">Ana en 5 años</span><span class="r">2x + 5</span></div>
    <div class="mg-formula" style="font-size:15px;margin-top:8px">(x+5) + (2x+5) = 40 → x = 10</div>
  </div>`;
  return "";
}
