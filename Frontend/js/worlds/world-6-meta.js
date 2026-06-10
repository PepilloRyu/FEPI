// js/worlds/world-6-meta.js — Mundo 6: Números Complejos y Vectores
// Contiene: metadata del mundo, niveles, teoría y getVisual.
// Los ejercicios se sirven desde el backend (GET /api/exercises/world/6).
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
      challenges: [],   // ← stripped, exercises come from API
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
      challenges: [],   // ← stripped, exercises come from API
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
      challenges: [],   // ← stripped, exercises come from API
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
      challenges: [],   // ← stripped, exercises come from API
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
