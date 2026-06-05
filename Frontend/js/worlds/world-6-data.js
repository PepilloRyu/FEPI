// js/worlds/world-6-data.js — Mundo 6: Números Complejos y Vectores
export const WORLD = {
  id: 6,
  title: "Números Complejos y Vectores",
  subtitle: "Donde lo imaginario se vuelve real",
  levels: [

    // ── NIVEL 1: Forma Cartesiana y el Plano de Gauss ────────────────────────
    {
      id: 1, icon: "📍", node: "Forma Cartesiana", title: "Forma Cartesiana y el Plano de Gauss",
      subtitle: "Descubre el plano donde viven los imaginarios",
      theory: [
        { icon: "🔮", tag: "Teoría 1 / 4", title: "¿Qué es un número complejo?",
          body: "Un número complejo tiene la forma z = a + bi, donde a ∈ ℝ es la <b>parte real</b> Re(z) = a, b ∈ ℝ es la <b>parte imaginaria</b> Im(z) = b, e i es la unidad imaginaria: i = √(−1), por lo que i² = −1. Si b = 0, z es real; si a = 0 y b ≠ 0, es imaginaria pura.",
          visual: "complex-def",
          key: "Para simplificar iⁿ, divide n entre 4 y usa el residuo: i⁰=1, i¹=i, i²=−1, i³=−i. Ejemplo: i¹⁷ = i¹ = i (17÷4, residuo 1)." },
        { icon: "🗺️", tag: "Teoría 2 / 4", title: "El plano de Gauss",
          body: "Los números complejos se representan en el <b>plano de Gauss</b> (plano complejo): el eje horizontal es el eje real (parte a) y el eje vertical es el eje imaginario (parte b). Cada complejo z = a + bi corresponde al punto (a, b), llamado su <b>afijo</b>.",
          visual: "gauss-plane",
          key: "Pensar el plano de Gauss como el plano cartesiano te permite visualizar operaciones: sumar complejos es como sumar vectores." },
        { icon: "⚙️", tag: "Teoría 3 / 4", title: "Conjugado y operaciones básicas",
          body: "El <b>conjugado</b> de z = a+bi es z̄ = a−bi. Suma: (a+bi)+(c+di) = (a+c)+(b+d)i. Resta: (a+bi)−(c+di) = (a−c)+(b−d)i. Producto: (a+bi)(c+di) = (ac−bd)+(ad+bc)i. División: multiplicar numerador y denominador por el conjugado del denominador.",
          visual: "complex-ops",
          key: "La clave de la división es multiplicar por el conjugado del denominador: el denominador se vuelve real (c²+d²) y la expresión se simplifica." },
        { icon: "📏", tag: "Teoría 4 / 4", title: "Módulo y argumento",
          body: "El <b>módulo</b> de z = a+bi es |z| = √(a²+b²): la distancia del afijo al origen. El <b>argumento</b> es el ángulo θ que forma z con el eje real: θ = arctan(b/a), ajustado al cuadrante. Propiedad: z·z̄ = |z|².",
          visual: "modulus-arg",
          key: "Para el argumento fíjate en el cuadrante. arctan(b/a) solo es correcto en el 1er cuadrante; en los demás hay que sumar o restar 180°." },
      ],
      challenges: [
        { type: "mc", tag: "Reto 1 · Potencias de i",
          prompt: "¿Cuál es el valor de i²⁵?",
          options: [{ label: "1", correct: false }, { label: "−1", correct: false }, { label: "i", correct: true }, { label: "−i", correct: false }],
          hint: "25 ÷ 4 = 6 con residuo 1. i²⁵ = i¹ = i. Ciclo: i, −1, −i, 1, i, −1, −i, 1, …" },
        { type: "vf", tag: "Reto 2 · Conjugado",
          prompt: "El conjugado de z = 5 − 3i es z̄ = −5 + 3i.",
          options: [{ label: "Verdadero", correct: false }, { label: "Falso", correct: true }],
          hint: "El conjugado solo cambia el signo de la parte imaginaria, no de la real. El conjugado de 5−3i es z̄ = 5+3i." },
        { type: "mc", tag: "Reto 3 · Producto de complejos",
          prompt: "Calcula (3 + 2i)(1 − i).",
          options: [
            { label: "3 − 2i²  (sin simplificar)", correct: false },
            { label: "5 − i", correct: true },
            { label: "1 + 5i", correct: false },
            { label: "3 + 2", correct: false },
          ],
          hint: "(3+2i)(1−i) = 3−3i+2i−2i² = 3−i−2(−1) = 3−i+2 = 5−i." },
        { type: "mc", tag: "Reto 4 · Propiedades de z = 4 − 3i",
          prompt: "Para z = 4 − 3i, ¿cuáles son Re(z), Im(z), el conjugado z̄ y el módulo |z|?",
          options: [
            { label: "Re=4, Im=−3, z̄=4+3i, |z|=5", correct: true },
            { label: "Re=4, Im=3, z̄=4−3i, |z|=5", correct: false },
            { label: "Re=−3, Im=4, z̄=−4+3i, |z|=5", correct: false },
            { label: "Re=4, Im=−3, z̄=4+3i, |z|=7", correct: false },
          ],
          hint: "Im(z) es el coeficiente de i (sin el i): Im=−3. El conjugado cambia el signo de Im: z̄=4+3i. |z|=√(16+9)=5." },
        { type: "buildSeq", tag: "Reto 5 · División de complejos",
          prompt: "Toca los pasos en orden para calcular (2+i)/(3−2i).",
          bank: [
            "Multiplicar numerador y denominador por el conjugado (3+2i)",
            "(2+i)(3+2i) = 6+4i+3i+2i² = 4+7i",
            "(3−2i)(3+2i) = 9−4i² = 9+4 = 13",
            "Resultado: (4+7i)/13 = 4/13 + 7i/13",
          ],
          answers: [[
            "Multiplicar numerador y denominador por el conjugado (3+2i)",
            "(2+i)(3+2i) = 6+4i+3i+2i² = 4+7i",
            "(3−2i)(3+2i) = 9−4i² = 9+4 = 13",
            "Resultado: (4+7i)/13 = 4/13 + 7i/13",
          ]],
          hint: "La división de complejos siempre: multiplicar por el conjugado del denominador → el denominador se vuelve real (c²+d²)." },
        { type: "mc", tag: "Reto 6 · Módulo 🏆",
          prompt: "¿Cuál de estos complejos tiene módulo diferente de 5?",
          options: [
            { label: "z = 1 + i", correct: true },
            { label: "z = 3 + 4i", correct: false },
            { label: "z = −5i", correct: false },
            { label: "z = −3 − 4i", correct: false },
          ],
          hint: "|z|=√(a²+b²). Para 3+4i: √(9+16)=5. Para −5i: √(0+25)=5. Para 1+i: √(1+1)=√2 ≠ 5." },
      ],
    },

    // ── NIVEL 2: Forma Polar y Exponencial ───────────────────────────────────
    {
      id: 2, icon: "🌐", node: "Forma Polar", title: "Forma Polar y Exponencial",
      subtitle: "El mismo número visto con otros lentes",
      theory: [
        { icon: "🎯", tag: "Teoría 1 / 3", title: "Forma polar de un número complejo",
          body: "Con el módulo r = |z| y el argumento θ, todo complejo z = a+bi se escribe en <b>forma polar</b>: z = r(cos θ + i·sin θ) = r·cis θ, donde a = r·cos θ, b = r·sin θ. Esta forma facilita la multiplicación, división y potenciación de complejos.",
          visual: "polar-form",
          key: 'La notación "cis θ" es abreviatura de "cos θ + i·sin θ". Es práctica para multiplicar: r₁·cis θ₁ × r₂·cis θ₂ = r₁r₂·cis(θ₁+θ₂).' },
        { icon: "✖️", tag: "Teoría 2 / 3", title: "Multiplicación y división en forma polar",
          body: "En forma polar, las operaciones se reducen a operar módulos y ángulos. <b>Multiplicación</b>: z₁·z₂ = r₁r₂·cis(θ₁+θ₂) — módulos se multiplican, ángulos se suman. <b>División</b>: z₁/z₂ = (r₁/r₂)·cis(θ₁−θ₂) — módulos se dividen, ángulos se restan.",
          visual: "polar-mult",
          key: "Regla análoga a los exponentes: aᵐ·aⁿ = aᵐ⁺ⁿ. Los complejos en forma polar revelan su estructura exponencial." },
        { icon: "🔬", tag: "Teoría 3 / 3", title: "Forma exponencial de Euler",
          body: "La <b>fórmula de Euler</b> conecta exponencial y trigonometría: e^(iθ) = cos θ + i·sin θ. Todo complejo se escribe en forma exponencial: z = r·e^(iθ), donde r = |z| y θ = arg(z). La identidad más famosa: e^(iπ) + 1 = 0.",
          visual: "euler-form",
          key: "Para la forma exponencial, el ángulo θ debe estar en radianes: 180°=π, 90°=π/2, 60°=π/3, 45°=π/4, 30°=π/6." },
      ],
      challenges: [
        { type: "mc", tag: "Reto 1 · A forma polar",
          prompt: "¿Cuál es la forma polar de z = −1 + i?",
          options: [
            { label: "√2·cis 45°", correct: false },
            { label: "√2·cis 135°", correct: true },
            { label: "2·cis 135°", correct: false },
            { label: "√2·cis(−45°)", correct: false },
          ],
          hint: "r=√(1+1)=√2. El punto (−1,1) está en el 2do cuadrante: θ = 180°−45° = 135°. Forma polar: √2·cis 135°." },
        { type: "vf", tag: "Reto 2 · Multiplicación polar",
          prompt: "En la forma polar, al multiplicar dos complejos los módulos se suman y los ángulos se multiplican.",
          options: [{ label: "Verdadero", correct: false }, { label: "Falso", correct: true }],
          hint: "Es al revés: los módulos se MULTIPLICAN y los ángulos se SUMAN. z₁·z₂ = r₁r₂·cis(θ₁+θ₂)." },
        { type: "mc", tag: "Reto 3 · A forma cartesiana",
          prompt: "Convierte z = 3·cis 90° a forma cartesiana.",
          options: [
            { label: "3 + 0i", correct: false },
            { label: "0 + 3i", correct: true },
            { label: "3 + 3i", correct: false },
            { label: "0 − 3i", correct: false },
          ],
          hint: "a = 3·cos 90° = 0; b = 3·sin 90° = 3. Resultado: z = 3i. θ=90° corresponde al eje imaginario positivo." },
        { type: "mc", tag: "Reto 4 · Cociente en polar",
          prompt: "Para z₁=2·cis 40° y z₂=5·cis 20°, ¿cuáles son el módulo y argumento del cociente z₁/z₂?",
          options: [
            { label: "módulo = 2/5, argumento = 20°", correct: true },
            { label: "módulo = 10, argumento = 20°", correct: false },
            { label: "módulo = 2/5, argumento = 60°", correct: false },
            { label: "módulo = 3, argumento = 20°", correct: false },
          ],
          hint: "División: módulos se dividen (2/5), ángulos se restan (40°−20°=20°). El módulo 10 y ángulo 60° corresponden al PRODUCTO." },
        { type: "buildSeq", tag: "Reto 5 · A forma polar paso a paso",
          prompt: "Toca los pasos en orden para convertir z = −√3 + i a forma polar.",
          bank: [
            "Calcular r = √((−√3)² + 1²) = √(3+1) = 2",
            "Ángulo de referencia: arctan(1/√3) = 30°",
            "Determinar cuadrante: a<0, b>0 → 2do cuadrante",
            "θ = 180° − 30° = 150°",
            "Forma polar: z = 2·cis 150°",
          ],
          answers: [[
            "Calcular r = √((−√3)² + 1²) = √(3+1) = 2",
            "Ángulo de referencia: arctan(1/√3) = 30°",
            "Determinar cuadrante: a<0, b>0 → 2do cuadrante",
            "θ = 180° − 30° = 150°",
            "Forma polar: z = 2·cis 150°",
          ]],
          hint: "El ángulo de referencia (arctan|b/a|) es siempre positivo. El cuadrante determina el ajuste: Q1→ref, Q2→180°−ref, Q3→180°+ref, Q4→360°−ref." },
        { type: "match", tag: "Reto 6 · Euler (arrastra) 🏆",
          prompt: "Arrastra el equivalente cartesiano de cada expresión exponencial.",
          pairs: [
            { desc: "e^(iπ)", sym: "−1" },
            { desc: "e^(i·π/2)", sym: "i" },
            { desc: "2·e^(i·π/3)", sym: "1 + i√3" },
            { desc: "e^(i·0)", sym: "1" },
          ],
          symOrder: ["i", "−1", "1", "1 + i√3"],
          hint: "Usa e^(iθ)=cosθ+i·sinθ. e^(iπ)=cos π+i·sin π=−1. e^(iπ/2)=cos90°+i·sin90°=i. e^(0)=1. 2·e^(iπ/3)=2(1/2+i√3/2)=1+i√3." },
      ],
    },

    // ── NIVEL 3: Euler, De Moivre y Raíces ───────────────────────────────────
    {
      id: 3, icon: "⚡", node: "De Moivre y Raíces", title: "De Moivre y Raíces de Complejos",
      subtitle: "El poder de la forma polar para potencias y raíces",
      theory: [
        { icon: "🚀", tag: "Teoría 1 / 3", title: "Fórmula de De Moivre",
          body: "La <b>fórmula de De Moivre</b> permite elevar un complejo a una potencia entera n de forma sencilla: [r·cis θ]ⁿ = rⁿ·cis(nθ). El módulo se eleva a la potencia n y el ángulo se multiplica por n. Es consecuencia directa de la multiplicación polar aplicada n veces.",
          visual: "de-moivre",
          key: "Antes de aplicar De Moivre, convierte siempre a forma polar. Un error en r o θ se amplifica exponencialmente al elevar a la potencia." },
        { icon: "🌸", tag: "Teoría 2 / 3", title: "Raíces n-ésimas de un complejo",
          body: "Las raíces n-ésimas de z = r·cis θ son exactamente <b>n complejos distintos</b>: zₖ = r^(1/n)·cis((θ+360°·k)/n) para k = 0, 1, …, n−1. Están igualmente espaciadas sobre un círculo de radio r^(1/n), separadas 360°/n entre sí.",
          visual: "nth-roots",
          key: "n raíces distintas, equidistantes 360°/n: raíces cuadradas separadas 180°, cúbicas 120°, cuartas 90°." },
        { icon: "🎭", tag: "Teoría 3 / 3", title: "De Moivre y las identidades trigonométricas",
          body: "Aplicación poderosa de De Moivre: expandiendo (cos θ+i·sin θ)ⁿ con el binomio de Newton y separando partes real e imaginaria se obtienen fórmulas para cos(nθ) y sin(nθ). Con n=2 se obtienen las identidades del <b>doble ángulo</b>.",
          visual: "de-moivre-trig",
          key: "Con n=3 obtienes las fórmulas de triple ángulo (cos 3θ = 4cos³θ−3cos θ) sin necesidad de memorizarlas." },
      ],
      challenges: [
        { type: "mc", tag: "Reto 1 · De Moivre",
          prompt: "Usando De Moivre, calcula (√3 + i)⁴. Dato: √3+i = 2·cis 30°.",
          options: [
            { label: "16·cis 120°", correct: true },
            { label: "8·cis 120°", correct: false },
            { label: "16·cis 60°", correct: false },
            { label: "4·cis 120°", correct: false },
          ],
          hint: "[2·cis 30°]⁴ = 2⁴·cis(4·30°) = 16·cis 120°. Módulo: 2⁴=16. Ángulo: 30°×4=120°." },
        { type: "vf", tag: "Reto 2 · Raíces de la unidad",
          prompt: "La ecuación z⁵ = 1 tiene exactamente 5 soluciones en los números complejos.",
          options: [{ label: "Verdadero", correct: true }, { label: "Falso", correct: false }],
          hint: "Toda ecuación zⁿ=w tiene exactamente n raíces complejas distintas. Las 5 raíces quintas de 1 están equidistantes 72° sobre el círculo unitario." },
        { type: "mc", tag: "Reto 3 · Potencia a cartesiana",
          prompt: "¿Cuánto vale (2·cis 30°)³ en forma cartesiana?",
          options: [{ label: "8i", correct: true }, { label: "−8i", correct: false }, { label: "8", correct: false }, { label: "4+4i", correct: false }],
          hint: "(2·cis 30°)³ = 2³·cis(3·30°) = 8·cis 90°. Luego: 8(cos 90°+i·sin 90°) = 8(0+i) = 8i." },
        { type: "buildSeq", tag: "Reto 4 · Raíces cuadradas",
          prompt: "Toca los pasos en orden para hallar las raíces cuadradas de z = 4·cis 60°.",
          bank: [
            "Identificar: r=4, θ=60°, n=2",
            "Módulo de cada raíz: 4^(1/2) = 2",
            "k=0: 2·cis((60°+0°)/2) = 2·cis 30°",
            "k=1: 2·cis((60°+360°)/2) = 2·cis 210°",
            "Las raíces están separadas 360°/2 = 180° entre sí",
          ],
          answers: [[
            "Identificar: r=4, θ=60°, n=2",
            "Módulo de cada raíz: 4^(1/2) = 2",
            "k=0: 2·cis((60°+0°)/2) = 2·cis 30°",
            "k=1: 2·cis((60°+360°)/2) = 2·cis 210°",
            "Las raíces están separadas 360°/2 = 180° entre sí",
          ]],
          hint: "Fórmula: zₖ = r^(1/n)·cis((θ+360°k)/n) para k=0,1,…,n−1. Siempre verifica que las raíces estén equidistantes." },
        { type: "mc", tag: "Reto 5 · (1+i)⁶",
          prompt: "(1+i)⁶ = (√2·cis 45°)⁶. ¿Cuál es el resultado en forma cartesiana?",
          options: [
            { label: "−8i", correct: true },
            { label: "8i", correct: false },
            { label: "8", correct: false },
            { label: "−8", correct: false },
          ],
          hint: "(√2)⁶=2³=8. Ángulo: 6×45°=270°. 8·cis 270° = 8(cos 270°+i·sin 270°) = 8(0+(−1)i) = −8i." },
        { type: "mc", tag: "Reto 6 · Potencias 🏆",
          prompt: "¿Cuánto vale (cis 120°)³?",
          options: [{ label: "1", correct: true }, { label: "−1", correct: false }, { label: "i", correct: false }, { label: "−i", correct: false }],
          hint: "(cis 120°)³ = cis(3×120°) = cis 360° = cos 360°+i·sin 360° = 1+0i = 1." },
      ],
    },

    // ── NIVEL 4: Vectores en R² ───────────────────────────────────────────────
    {
      id: 4, icon: "🏹", node: "Vectores en R²", title: "Vectores en R²",
      subtitle: "Fuerza y dirección: el álgebra del movimiento",
      theory: [
        { icon: "➡️", tag: "Teoría 1 / 3", title: "¿Qué es un vector en R²?",
          body: "Un vector v en R² es un par ordenado v = (v₁, v₂). Tiene <b>magnitud</b> y <b>dirección</b>. Se escribe como v = v₁î + v₂ĵ donde î=(1,0) y ĵ=(0,1) son los vectores unitarios canónicos. Suma: u+v = (u₁+v₁, u₂+v₂). Escalar: k·v = (k·v₁, k·v₂).",
          visual: "vector-def",
          key: "Un vector no es un punto: puede colocarse en cualquier lugar del plano. Lo que importa es su magnitud y dirección, no su posición de origen." },
        { icon: "📏", tag: "Teoría 2 / 3", title: "Norma y vector unitario",
          body: "La <b>norma</b> (magnitud) de v = (v₁, v₂) es ‖v‖ = √(v₁²+v₂²). El <b>vector unitario</b> en la dirección de v es û = v/‖v‖, con ‖û‖ = 1. Todo vector puede descomponerse como v = ‖v‖·û. El ángulo de dirección: θ = arctan(v₂/v₁), ajustado al cuadrante.",
          visual: "vector-norm",
          key: "El vector unitario û guarda solo la dirección (norma 1), sin información de magnitud. Es como el signo de un número: indica hacia dónde, no cuánto." },
        { icon: "🔀", tag: "Teoría 3 / 3", title: "Producto escalar y ortogonalidad",
          body: "El <b>producto escalar</b> de u=(u₁,u₂) y v=(v₁,v₂) es u·v = u₁v₁+u₂v₂ — un <b>número real</b>. Relación con el ángulo: cos θ = (u·v)/(‖u‖·‖v‖). Ortogonalidad: u⊥v ⟺ u·v = 0. Proyección de u sobre v: proy_v(u) = (u·v/‖v‖²)·v.",
          visual: "dot-product",
          key: "El producto escalar es un ESCALAR (número), no un vector. En R² no existe el producto vectorial; la herramienta siempre es el producto escalar." },
      ],
      challenges: [
        { type: "mc", tag: "Reto 1 · Operaciones con vectores",
          prompt: "Si u = (5, −2) y v = (1, 3), ¿cuánto vale u + 2v?",
          options: [{ label: "(7, 4)", correct: true }, { label: "(6, 1)", correct: false }, { label: "(3, −8)", correct: false }, { label: "(7, −8)", correct: false }],
          hint: "Primero calcula 2v = (2, 6). Luego u + 2v = (5+2, −2+6) = (7, 4)." },
        { type: "vf", tag: "Reto 2 · Producto escalar",
          prompt: "El producto escalar u·v es un vector con la misma dirección que u.",
          options: [{ label: "Verdadero", correct: false }, { label: "Falso", correct: true }],
          hint: "El producto escalar u·v = u₁v₁+u₂v₂ es un número real (escalar), no un vector. No tiene dirección." },
        { type: "mc", tag: "Reto 3 · Norma de un vector",
          prompt: "¿Cuál es la norma del vector v = (−6, 8)?",
          options: [{ label: "2", correct: false }, { label: "14", correct: false }, { label: "10", correct: true }, { label: "√28", correct: false }],
          hint: "‖v‖ = √((−6)²+8²) = √(36+64) = √100 = 10." },
        { type: "mc", tag: "Reto 4 · Ortogonalidad",
          prompt: "Para u=(1,2) y v=(4,−2), ¿cuánto vale u·v y son ortogonales?",
          options: [
            { label: "u·v=0, sí son ortogonales", correct: true },
            { label: "u·v=4, no son ortogonales", correct: false },
            { label: "u·v=10, no son ortogonales", correct: false },
            { label: "u·v=0, no son ortogonales", correct: false },
          ],
          hint: "u·v = 1·4+2·(−2) = 4−4 = 0. Producto escalar = 0 → vectores ortogonales (perpendiculares). ‖u‖=√(1+4)=√5." },
        { type: "buildSeq", tag: "Reto 5 · Ángulo entre vectores",
          prompt: "Toca los pasos en orden para hallar el ángulo entre u=(1,0) y v=(1,1).",
          bank: [
            "Calcular u·v = 1·1 + 0·1 = 1",
            "Calcular ‖u‖ = √(1+0) = 1",
            "Calcular ‖v‖ = √(1+1) = √2",
            "cos θ = (u·v)/(‖u‖·‖v‖) = 1/(1·√2) = 1/√2",
            "θ = arccos(1/√2) = 45°",
          ],
          answers: [[
            "Calcular u·v = 1·1 + 0·1 = 1",
            "Calcular ‖u‖ = √(1+0) = 1",
            "Calcular ‖v‖ = √(1+1) = √2",
            "cos θ = (u·v)/(‖u‖·‖v‖) = 1/(1·√2) = 1/√2",
            "θ = arccos(1/√2) = 45°",
          ]],
          hint: "El flujo: producto escalar → normas → fórmula del coseno → arccos. î=(1,0) apunta a la derecha y (1,1) apunta a 45°: tiene sentido geométrico." },
        { type: "mc", tag: "Reto 6 · Par NO ortogonal 🏆",
          prompt: "¿Cuál par de vectores NO es ortogonal?",
          options: [
            { label: "u=(2,1) y v=(3,4)", correct: true },
            { label: "u=(2,3) y v=(−3,2)", correct: false },
            { label: "u=(1,0) y v=(0,5)", correct: false },
            { label: "u=(3,1) y v=(−1,3)", correct: false },
          ],
          hint: "u·v=0 → ortogonales. (2)(3)+(1)(4)=6+4=10≠0 → no ortogonales. Para los demás: (2)(−3)+(3)(2)=0, (1)(0)+(0)(5)=0, (3)(−1)+(1)(3)=0." },
      ],
    },

  ],
};

export function getVisual(kind) {
  // ── Nivel 1: Números Complejos ───────────────────────────────────────────
  if (kind === "complex-def") return `<div class="mg-vis">
    <div class="mg-band cat"><div class="h">z = a + bi  ·  i² = −1</div></div>
    <div class="mg-tr"><span class="l">z₁ = 3 + 5i</span><span class="r" style="color:var(--mathgo-blue)">a=3, b=5</span></div>
    <div class="mg-tr"><span class="l">z₄ = 6i (imaginaria pura)</span><span class="r">a=0, b=6</span></div>
    <div class="mg-band cat"><div class="h">Ciclo de i: i · −1 · −i · 1 · i · …</div></div>
  </div>`;
  if (kind === "gauss-plane") return `<div class="mg-vis">
    <div class="mg-band cat"><div class="h">Plano de Gauss — eje Re × eje Im</div></div>
    <div class="mg-tr"><span class="l">z = 3 + 4i → punto (3, 4)</span><span class="r" style="color:var(--mathgo-blue)">Q1</span></div>
    <div class="mg-tr"><span class="l">z = −2 + i → punto (−2, 1)</span><span class="r">Q2</span></div>
    <div class="mg-tr"><span class="l">Real 5 → (5, 0) sobre eje Re</span><span class="r"></span></div>
    <div class="mg-tr"><span class="l">Imaginaria 3i → (0, 3) sobre eje Im</span><span class="r"></span></div>
  </div>`;
  if (kind === "complex-ops") return `<div class="mg-vis">
    <div class="mg-formula" style="font-size:14px;padding:2px 0">z₁=2+3i · z₂=1−2i</div>
    <div class="mg-tr"><span class="l">Suma</span><span class="r" style="color:var(--mathgo-blue)">3 + i</span></div>
    <div class="mg-tr"><span class="l">Resta</span><span class="r" style="color:var(--mathgo-blue)">1 + 5i</span></div>
    <div class="mg-tr"><span class="l">Producto (2+3i)(1−2i)</span><span class="r" style="color:var(--owl-green)">8 − i</span></div>
    <div style="text-align:center;color:rgb(var(--wolf));font-size:13px;margin-top:8px">Producto: usa i²=−1</div>
  </div>`;
  if (kind === "modulus-arg") return `<div class="mg-vis">
    <div class="mg-band cat"><div class="h">|z| = √(a² + b²)  ·  θ = arctan(b/a)</div></div>
    <div class="mg-tr"><span class="l">z = 3 + 4i</span><span class="r" style="color:var(--mathgo-blue)">|z| = 5</span></div>
    <div class="mg-tr"><span class="l">θ = arctan(4/3) ≈ 53°</span><span class="r">Q1</span></div>
    <div class="mg-tr"><span class="l">z·z̄ = (3+4i)(3−4i) = 25</span><span class="r" style="color:var(--owl-green)">= |z|² ✓</span></div>
  </div>`;
  // ── Nivel 2: Forma Polar ──────────────────────────────────────────────────
  if (kind === "polar-form") return `<div class="mg-vis">
    <div class="mg-band cat"><div class="h">z = r·cis θ  →  a = r·cosθ, b = r·sinθ</div></div>
    <div class="mg-formula" style="font-size:14px;padding:4px 0">z = 1 + i√3: r=2, θ=60° → 2·cis 60°</div>
    <div class="mg-tr"><span class="l">4·cis 30° → a=4·cos30°=2√3</span><span class="r">b=4·sin30°=2</span></div>
    <div style="text-align:center;color:rgb(var(--wolf));font-size:13px;margin-top:8px">cis θ = cos θ + i·sin θ</div>
  </div>`;
  if (kind === "polar-mult") return `<div class="mg-vis">
    <div class="mg-tr"><span class="l">Producto z₁·z₂</span><span class="r" style="color:var(--mathgo-blue)">r₁r₂·cis(θ₁+θ₂)</span></div>
    <div class="mg-tr"><span class="l">División z₁/z₂</span><span class="r" style="color:var(--owl-green)">(r₁/r₂)·cis(θ₁−θ₂)</span></div>
    <div class="mg-formula" style="font-size:14px;margin-top:8px">2·cis30° × 3·cis45° = 6·cis75°</div>
  </div>`;
  if (kind === "euler-form") return `<div class="mg-vis">
    <div class="mg-band known"><div class="h">Fórmula de Euler: e^(iθ) = cosθ + i·sinθ</div></div>
    <div class="mg-tr"><span class="l">e^(iπ) = −1 + 0i</span><span class="r" style="color:var(--cardinal)">e^(iπ)+1=0</span></div>
    <div class="mg-tr"><span class="l">z = r·e^(iθ)  →  forma exponencial</span><span class="r"></span></div>
    <div style="text-align:center;color:rgb(var(--wolf));font-size:13px;margin-top:8px">Radianes: 180°=π, 90°=π/2, 60°=π/3</div>
  </div>`;
  // ── Nivel 3: De Moivre ────────────────────────────────────────────────────
  if (kind === "de-moivre") return `<div class="mg-vis">
    <div class="mg-band cat"><div class="h">[r·cis θ]ⁿ = rⁿ·cis(nθ)</div></div>
    <div class="mg-formula" style="font-size:14px;padding:4px 0">(1+i)⁸ = (√2·cis 45°)⁸</div>
    <div class="mg-tr"><span class="l">Módulo: (√2)⁸ = 2⁴ = 16</span><span class="r"></span></div>
    <div class="mg-tr"><span class="l">Ángulo: 8×45° = 360° → cis 360° = 1</span><span class="r" style="color:var(--owl-green)">(1+i)⁸ = 16</span></div>
  </div>`;
  if (kind === "nth-roots") return `<div class="mg-vis">
    <div class="mg-band cat"><div class="h">zₖ = r^(1/n)·cis((θ+360°k)/n)</div></div>
    <div class="mg-tr"><span class="l">Raíces cúbicas de 8·cis30°</span><span class="r">n=3, r^(1/3)=2</span></div>
    <div class="mg-tr"><span class="l">k=0: 2·cis10°</span><span class="r">k=1: 2·cis130°</span></div>
    <div class="mg-tr"><span class="l">k=2: 2·cis250°</span><span class="r">separadas 120°</span></div>
  </div>`;
  if (kind === "de-moivre-trig") return `<div class="mg-vis">
    <div class="mg-formula" style="font-size:14px;padding:4px 0">(cosθ + i·sinθ)² = cos2θ + i·sin2θ</div>
    <div class="mg-tr"><span class="l">Parte real</span><span class="r" style="color:var(--mathgo-blue)">cos2θ = cos²θ−sin²θ</span></div>
    <div class="mg-tr"><span class="l">Parte imaginaria</span><span class="r" style="color:var(--owl-green)">sin2θ = 2sinθcosθ</span></div>
    <div style="text-align:center;color:rgb(var(--wolf));font-size:13px;margin-top:8px">Identidades de doble ángulo deducidas</div>
  </div>`;
  // ── Nivel 4: Vectores ─────────────────────────────────────────────────────
  if (kind === "vector-def") return `<div class="mg-vis">
    <div class="mg-band cat"><div class="h">v = (v₁, v₂) = v₁î + v₂ĵ</div></div>
    <div class="mg-formula" style="font-size:14px;padding:2px 0">u=(3,−1) · v=(−2,4)</div>
    <div class="mg-tr"><span class="l">u + v</span><span class="r" style="color:var(--mathgo-blue)">(1, 3)</span></div>
    <div class="mg-tr"><span class="l">u − v</span><span class="r" style="color:var(--mathgo-blue)">(5, −5)</span></div>
    <div class="mg-tr"><span class="l">2u</span><span class="r" style="color:var(--owl-green)">(6, −2)</span></div>
  </div>`;
  if (kind === "vector-norm") return `<div class="mg-vis">
    <div class="mg-band cat"><div class="h">‖v‖ = √(v₁² + v₂²)</div></div>
    <div class="mg-tr"><span class="l">v = (3, 4) → ‖v‖ = √(9+16)</span><span class="r" style="color:var(--mathgo-blue)">= 5</span></div>
    <div class="mg-tr"><span class="l">û = (3/5, 4/5) → ‖û‖</span><span class="r" style="color:var(--owl-green)">= 1 ✓</span></div>
    <div style="text-align:center;color:rgb(var(--wolf));font-size:13px;margin-top:8px">û guarda solo la dirección, ‖û‖ = 1 siempre</div>
  </div>`;
  if (kind === "dot-product") return `<div class="mg-vis">
    <div class="mg-band cat"><div class="h">u·v = u₁v₁ + u₂v₂  (número real)</div></div>
    <div class="mg-tr"><span class="l">u=(2,3), v=(4,−1): u·v=8−3</span><span class="r" style="color:var(--mathgo-blue)">= 5</span></div>
    <div class="mg-tr"><span class="l">cos θ = (u·v)/(‖u‖·‖v‖)</span><span class="r">ángulo</span></div>
    <div class="mg-tr"><span class="l">u·v = 0 → u ⊥ v</span><span class="r" style="color:var(--owl-green)">ortogonales</span></div>
  </div>`;
  return "";
}
