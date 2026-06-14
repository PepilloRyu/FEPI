// js/worlds/world-5-meta.js — Mundo 5: Matrices y Sistemas Avanzados
// Contiene: metadata del mundo, niveles, teoría y getVisual.
// Los ejercicios se sirven desde el backend (GET /api/exercises/world/5).
export const WORLD = {
  id: 5,
  title: "Matrices y Sistemas Avanzados",
  subtitle: "Organiza el caos en filas y columnas",
  levels: [

    // ── NIVEL 1: Definición, Tipos y Operaciones ──────────────────────────────
    {
      id: 1, icon: "🗂️", node: "Matrices: Definición", title: "Matrices: Definición y Tipos",
      subtitle: "Aprende a leer, clasificar y operar matrices",
      theory: [
        { icon: "📊", tag: "Teoría 1 / 4", title: "¿Qué es una matriz?",
          body: "Una matriz es un arreglo rectangular de números organizados en filas (horizontales) y columnas (verticales). Se denota con mayúscula (A, B, M) y su tamaño se expresa como m×n: m filas y n columnas. Cada elemento se identifica como aᵢⱼ (fila i, columna j).",
          visual: "matrix-def",
          key: "El elemento aᵢⱼ siempre: primero la fila i, luego la columna j. Igual que leer un libro: de arriba a abajo y de izquierda a derecha." },
        { icon: "🔖", tag: "Teoría 2 / 4", title: "Tipos de matrices",
          body: "Las matrices se clasifican por forma: <b>cuadrada</b> (n×n), <b>rectangular</b> (m≠n), <b>identidad</b> (I: 1s en diagonal, 0s fuera), <b>nula</b> (todo ceros), <b>diagonal</b> (0s fuera de la diagonal), <b>triangular</b> superior/inferior, y <b>simétrica</b> (A = Aᵀ).",
          visual: "matrix-types",
          key: "La identidad I es el 'uno' de las matrices: cualquier A multiplicada por I da ella misma, como x · 1 = x." },
        { icon: "➕", tag: "Teoría 3 / 4", title: "Suma, resta y escalar",
          body: "Suma/resta: solo entre matrices del <b>mismo orden</b>. Se operan los elementos en la misma posición: (A±B)ᵢⱼ = aᵢⱼ ± bᵢⱼ. Multiplicación por escalar k: se multiplica cada elemento: (kA)ᵢⱼ = k·aᵢⱼ.",
          visual: "matrix-ops",
          key: "No puedes sumar una 2×3 con una 3×2 aunque tengan el mismo total de elementos. Las dimensiones deben coincidir exactamente." },
        { icon: "✖️", tag: "Teoría 4 / 4", title: "Multiplicación de matrices",
          body: "Para multiplicar A·B, las columnas de A deben ser iguales a las filas de B. Si A es m×n y B es n×p, el resultado C es m×p. El elemento cᵢⱼ es la suma de productos de la fila i de A por la columna j de B. <b>A·B ≠ B·A</b> en general.",
          visual: "matrix-product",
          key: "Regla rápida: escribe los órdenes juntos. Los internos deben coincidir: (2×3)(3×4) → sí, resultado 2×4." },
      ],
      challenges: [],   // ← stripped, exercises come from API
    },

    // ── NIVEL 2: Determinantes y Matriz Inversa ───────────────────────────────
    {
      id: 2, icon: "🔍", node: "Determinantes", title: "Determinantes y Matriz Inversa",
      subtitle: "El número que revela el alma de una matriz",
      theory: [
        { icon: "🔢", tag: "Teoría 1 / 4", title: "Determinante 2×2",
          body: "El determinante de una matriz cuadrada es un número real que condensa propiedades clave. Para una 2×2: A = [[a, b], [c, d]], det(A) = ad − bc. Si det(A) = 0, la matriz es <b>singular</b> (no tiene inversa). Si det(A) ≠ 0, es <b>no singular</b> (tiene inversa).",
          visual: "det2x2",
          key: "Regla visual: dibuja una X. det = producto diagonal ↘ menos producto diagonal ↗." },
        { icon: "🧮", tag: "Teoría 2 / 4", title: "Determinante 3×3: Regla de Sarrus",
          body: "Para una 3×3 se usa la <b>regla de Sarrus</b>: copia las dos primeras columnas a la derecha. Suma los tres productos de las diagonales ↘ y resta los tres productos de las diagonales ↗. El resultado es det(A).",
          visual: "det3x3-sarrus",
          key: "La regla de Sarrus solo aplica a matrices 3×3. Para orden mayor usa expansión por cofactores." },
        { icon: "📐", tag: "Teoría 3 / 4", title: "Propiedades de los determinantes",
          body: "Propiedades clave: (1) Intercambiar filas cambia el signo. (2) Si una fila es múltiplo de otra, det = 0. (3) Fila de puros ceros → det = 0. (4) Sacar factor k de una fila multiplica det por k. (5) Sumar múltiplo de una fila a otra no cambia det.",
          visual: "det-properties",
          key: "La propiedad (5) es la base de la eliminación gaussiana: triangulariza sin cambiar el determinante." },
        { icon: "🔄", tag: "Teoría 4 / 4", title: "Matriz inversa",
          body: "La inversa A⁻¹ cumple A·A⁻¹ = I. Solo existe si det(A) ≠ 0. Para una 2×2 con A = [[a,b],[c,d]]:<br>A⁻¹ = (1/det(A)) · [[d, −b], [−c, a]]<br>Se intercambia la diagonal principal y se cambia el signo a los otros dos elementos.",
          visual: "matrix-inverse",
          key: "Regla 2×2: intercambia a y d, cambia el signo de b y c, divide todo entre det(A)." },
      ],
      challenges: [],   // ← stripped, exercises come from API
    },

    // ── NIVEL 3: Eliminación Gaussiana y Gauss-Jordan ────────────────────────
    {
      id: 3, icon: "⚙️", node: "Gauss y Gauss-Jordan", title: "Eliminación de Gauss y Gauss-Jordan",
      subtitle: "Triangulariza, reduce y conquista el sistema",
      theory: [
        { icon: "📋", tag: "Teoría 1 / 4", title: "Matriz aumentada de un sistema",
          body: "Un sistema de ecuaciones lineales se representa como matriz aumentada [A|b], donde A contiene los coeficientes de las variables y b los términos independientes. Las operaciones sobre filas de esta matriz son equivalentes a las operaciones sobre las ecuaciones del sistema.",
          visual: "augmented-matrix",
          key: "La línea vertical en [A|b] solo separa coeficientes de términos independientes. Las operaciones de fila afectan toda la fila, incluyendo el lado derecho." },
        { icon: "🔧", tag: "Teoría 2 / 4", title: "Operaciones elementales de fila",
          body: "Tres operaciones que no cambian la solución del sistema: (1) Fᵢ ↔ Fⱼ — intercambiar filas. (2) k·Fᵢ → Fᵢ — multiplicar la fila i por k ≠ 0. (3) Fᵢ + k·Fⱼ → Fᵢ — sumar a la fila i un múltiplo de la fila j. El objetivo es llegar a una forma triangular o reducida.",
          visual: "row-ops",
          key: "Siempre escribe la operación junto a la fila modificada (ej. F₂ − 2F₁ → F₂). Te protege de errores." },
        { icon: "📐", tag: "Teoría 3 / 4", title: "Método de Gauss (forma escalonada)",
          body: "La eliminación de Gauss convierte la matriz en forma <b>escalonada</b> (triangular superior): debajo de cada pivote hay solo ceros. Luego se resuelve por <b>sustitución regresiva</b>: se despeja la última variable y se sustituye hacia arriba.",
          visual: "gauss-method",
          key: "El pivote de cada fila debe estar a la derecha del pivote anterior. Si un pivote es cero, intercambia filas antes de continuar." },
        { icon: "✨", tag: "Teoría 4 / 4", title: "Método de Gauss-Jordan (forma reducida)",
          body: "Gauss-Jordan lleva la matriz hasta la forma escalonada <b>reducida</b>: cada pivote es 1 y todos los demás elementos de su columna son cero. El resultado se lee directamente de la última columna, sin sustitución regresiva: [I | solución].",
          visual: "gauss-jordan-vis",
          key: "Gauss es más eficiente para sistemas grandes; Gauss-Jordan es más visual porque la solución aparece directamente." },
      ],
      challenges: [],   // ← stripped, exercises come from API
    },

    // ── NIVEL 4: Regla de Cramer ──────────────────────────────────────────────
    {
      id: 4, icon: "🏆", node: "Regla de Cramer", title: "Regla de Cramer",
      subtitle: "Determinantes al servicio de los sistemas",
      theory: [
        { icon: "📜", tag: "Teoría 1 / 3", title: "La regla de Cramer: idea central",
          body: "La regla de Cramer resuelve sistemas n×n usando determinantes. Dado A·x = b con det(A) ≠ 0, la solución única es xᵢ = det(Aᵢ) / det(A), donde Aᵢ es la matriz A con la columna i sustituida por el vector b de términos independientes.",
          visual: "cramer-idea",
          key: 'En det(xᵢ): la columna que corresponde a esa variable se "sustituye" por los términos independientes b.' },
        { icon: "✏️", tag: "Teoría 2 / 3", title: "Cramer para sistemas 2×2",
          body: "Pasos: (1) Calcular D = det(A). (2) Si D = 0, Cramer no aplica. (3) Calcular Dₓ sustituyendo columna 1 por b. (4) Calcular Dᵧ sustituyendo columna 2 por b. (5) x = Dₓ/D, y = Dᵧ/D. (6) Verificar en las ecuaciones originales.",
          visual: "cramer-2x2",
          key: "Siempre verifica: sustituye los valores en AMBAS ecuaciones. Un error aritmético puede pasar desapercibido si no verificas." },
        { icon: "🔺", tag: "Teoría 3 / 3", title: "Cramer para sistemas 3×3",
          body: "Para 3×3 el procedimiento es igual, con determinantes de tercer orden (Sarrus): D, Dₓ, Dᵧ, D_z. Se sustituye la columna correspondiente a cada variable por el vector b. x = Dₓ/D, y = Dᵧ/D, z = D_z/D. Para sistemas grandes, Gauss es preferible.",
          visual: "cramer-3x3",
          key: "Si D = 0 y todos los Dᵢ = 0: sistema indeterminado. Si D = 0 pero algún Dᵢ ≠ 0: sistema incompatible. Cramer no aplica en ninguno de los dos casos." },
      ],
      challenges: [],   // ← stripped, exercises come from API
    },

  ],
};

export function getVisual(kind) {
  // ── Nivel 1: Matrices ────────────────────────────────────────────────────
  if (kind === "matrix-def") return `<div class="mg-vis">
    <div class="mg-band cat"><div class="h">Matriz A de orden 2×3</div></div>
    <div class="mg-tr"><span class="l">a₁₁=2  a₁₂=5  a₁₃=−1</span><span class="r" style="color:var(--mathgo-blue)">fila 1</span></div>
    <div class="mg-tr"><span class="l">a₂₁=0  a₂₂=3  a₂₃=4</span><span class="r" style="color:var(--mathgo-blue)">fila 2</span></div>
    <div style="text-align:center;color:rgb(var(--wolf));font-size:13px;margin-top:8px">aᵢⱼ = fila i, columna j &nbsp;·&nbsp; A tiene 2 filas y 3 columnas</div>
  </div>`;
  if (kind === "matrix-types") return `<div class="mg-vis">
    <div class="mg-tr"><span class="l">Identidad I₃ — 1s en diagonal</span><span class="r"><span class="mg-matrix-wrap"><span class="mg-matrix-inner cols-3"><span class="mg-mc">1</span><span class="mg-mc">0</span><span class="mg-mc">0</span><span class="mg-mc">0</span><span class="mg-mc">1</span><span class="mg-mc">0</span><span class="mg-mc">0</span><span class="mg-mc">0</span><span class="mg-mc">1</span></span></span></span></div>
    <div class="mg-tr"><span class="l">Triangular superior — 0s debajo</span><span class="r"><span class="mg-matrix-wrap"><span class="mg-matrix-inner cols-2"><span class="mg-mc">2</span><span class="mg-mc">5</span><span class="mg-mc">0</span><span class="mg-mc">3</span></span></span></span></div>
    <div class="mg-tr"><span class="l">Simétrica — a₁₂ = a₂₁</span><span class="r"><span class="mg-matrix-wrap"><span class="mg-matrix-inner cols-2"><span class="mg-mc">3</span><span class="mg-mc">7</span><span class="mg-mc">7</span><span class="mg-mc">5</span></span></span></span></div>
    <div class="mg-tr"><span class="l">Nula — todo ceros</span><span class="r"><span class="mg-matrix-wrap"><span class="mg-matrix-inner cols-2"><span class="mg-mc">0</span><span class="mg-mc">0</span><span class="mg-mc">0</span><span class="mg-mc">0</span></span></span></span></div>
  </div>`;
  if (kind === "matrix-ops") return `<div class="mg-vis">
    <div class="mg-band cat"><div class="h">A + B  (mismo orden)</div></div>
    <div class="mg-formula" style="font-size:15px;padding:4px 0">[2 −1; 0 4] + [3 5; −2 1] = [5 4; −2 5]</div>
    <div class="mg-band cat"><div class="h">3A  (escalar)</div></div>
    <div class="mg-formula" style="font-size:15px;padding:4px 0">3·[2 −1; 0 4] = [6 −3; 0 12]</div>
  </div>`;
  if (kind === "matrix-product") return `<div class="mg-vis">
    <div class="mg-band cat"><div class="h">A(2×2) · B(2×2) = C(2×2)</div></div>
    <div class="mg-tr"><span class="l">c₁₁ = 1·5 + 2·7 = 19</span><span class="r" style="color:var(--mathgo-blue)">fila 1 · col 1</span></div>
    <div class="mg-tr"><span class="l">c₁₂ = 1·6 + 2·8 = 22</span><span class="r" style="color:var(--mathgo-blue)">fila 1 · col 2</span></div>
    <div class="mg-tr"><span class="l">c₂₁ = 3·5 + 4·7 = 43</span><span class="r" style="color:var(--owl-green)">fila 2 · col 1</span></div>
    <div class="mg-tr"><span class="l">c₂₂ = 3·6 + 4·8 = 50</span><span class="r" style="color:var(--owl-green)">fila 2 · col 2</span></div>
  </div>`;
  // ── Nivel 2: Determinantes ───────────────────────────────────────────────
  if (kind === "det2x2") return `<div class="mg-vis">
    <div class="mg-band cat"><div class="h">det(A) = ad − bc</div></div>
    <div class="mg-formula" style="font-size:18px;padding:6px 0">A = <span class="mg-matrix-wrap"><span class="mg-matrix-inner cols-2"><span class="mg-mc">3</span><span class="mg-mc">5</span><span class="mg-mc">2</span><span class="mg-mc">4</span></span></span></div>
    <div class="mg-tr"><span class="l">det = 3·4 − 5·2 = 12 − 10</span><span class="r" style="color:var(--mathgo-blue)">= 2</span></div>
    <div class="mg-tr"><span class="l">B = <span class="mg-matrix-wrap"><span class="mg-matrix-inner cols-2"><span class="mg-mc">6</span><span class="mg-mc">3</span><span class="mg-mc">4</span><span class="mg-mc">2</span></span></span> → det = 12−12</span><span class="r" style="color:var(--cardinal)">= 0 (singular)</span></div>
  </div>`;
  if (kind === "det3x3-sarrus") return `<div class="mg-vis">
    <div class="mg-band cat"><div class="h">Regla de Sarrus — copia columnas 1 y 2</div></div>
    <div class="mg-tr"><span class="l">Diagonales ↘: a·e·i + b·f·g + c·d·h</span><span class="r">suma</span></div>
    <div class="mg-tr"><span class="l">Diagonales ↗: c·e·g + a·f·h + b·d·i</span><span class="r">resta</span></div>
    <div style="text-align:center;color:rgb(var(--wolf));font-size:13px;margin-top:8px">Solo para matrices 3×3. No aplica a órdenes mayores.</div>
  </div>`;
  if (kind === "det-properties") return `<div class="mg-vis">
    <div class="mg-tr"><span class="l">Intercambiar filas</span><span class="r" style="color:var(--cardinal)">cambia signo</span></div>
    <div class="mg-tr"><span class="l">Fila múltiplo de otra</span><span class="r" style="color:var(--cardinal)">det = 0</span></div>
    <div class="mg-tr"><span class="l">Sacar factor k de una fila</span><span class="r" style="color:var(--mathgo-blue)">det · k</span></div>
    <div class="mg-tr"><span class="l">Sumar múltiplo de fila a otra</span><span class="r" style="color:var(--owl-green)">det no cambia</span></div>
  </div>`;
  if (kind === "matrix-inverse") return `<div class="mg-vis">
    <div class="mg-band cat"><div class="h">A⁻¹ = (1/det) · [d −b; −c a]</div></div>
    <div class="mg-formula" style="font-size:16px;padding:4px 0">A = <span class="mg-matrix-wrap"><span class="mg-matrix-inner cols-2"><span class="mg-mc">3</span><span class="mg-mc">5</span><span class="mg-mc">1</span><span class="mg-mc">2</span></span></span> → det = 1</div>
    <div class="mg-tr"><span class="l">A⁻¹ = (1/1)·<span class="mg-matrix-wrap"><span class="mg-matrix-inner cols-2"><span class="mg-mc">2</span><span class="mg-mc">−5</span><span class="mg-mc">−1</span><span class="mg-mc">3</span></span></span></span><span class="r" style="color:var(--owl-green)"><span class="mg-matrix-wrap"><span class="mg-matrix-inner cols-2"><span class="mg-mc">2</span><span class="mg-mc">−5</span><span class="mg-mc">−1</span><span class="mg-mc">3</span></span></span></span></div>
    <div style="text-align:center;color:rgb(var(--wolf));font-size:13px;margin-top:8px">Verificar: A·A⁻¹ = I ✓</div>
  </div>`;
  // ── Nivel 3: Gauss / Gauss-Jordan ────────────────────────────────────────
  if (kind === "augmented-matrix") return `<div class="mg-vis">
    <div class="mg-band cat"><div class="h">Sistema → Matriz aumentada [A|b]</div></div>
    <div class="mg-tr"><span class="l">2x + 3y − z = 5</span><span class="r">[ 2  3 −1 | 5 ]</span></div>
    <div class="mg-tr"><span class="l">x − y + 2z = 3</span><span class="r">[ 1 −1  2 | 3 ]</span></div>
    <div class="mg-tr"><span class="l">3x + 2y + z = 4</span><span class="r">[ 3  2  1 | 4 ]</span></div>
  </div>`;
  if (kind === "row-ops") return `<div class="mg-vis">
    <div class="mg-tr"><span class="l">Fᵢ ↔ Fⱼ</span><span class="r">intercambiar filas</span></div>
    <div class="mg-tr"><span class="l">k·Fᵢ → Fᵢ</span><span class="r">multiplicar fila por k≠0</span></div>
    <div class="mg-tr"><span class="l">Fᵢ + k·Fⱼ → Fᵢ</span><span class="r">sumar múltiplo de otra fila</span></div>
    <div style="text-align:center;color:rgb(var(--wolf));font-size:13px;margin-top:8px">Ninguna cambia la solución del sistema</div>
  </div>`;
  if (kind === "gauss-method") return `<div class="mg-vis">
    <div class="mg-formula" style="font-size:15px;padding:4px 0">x + 2y = 5 / 2x + 3y = 8</div>
    <div class="mg-tr"><span class="l">F₂ − 2·F₁ → F₂</span><span class="r">eliminar x en F₂</span></div>
    <div class="mg-tr"><span class="l"><span class="mg-matrix-wrap"><span class="mg-matrix-inner cols-3"><span class="mg-mc">1</span><span class="mg-mc">2</span><span class="mg-mc mg-aug">5</span><span class="mg-mc">0</span><span class="mg-mc">−1</span><span class="mg-mc mg-aug">−2</span></span></span></span><span class="r">escalonada</span></div>
    <div class="mg-tr"><span class="l">−y = −2 → y=2; x=1</span><span class="r" style="color:var(--owl-green)">sustitución ↑</span></div>
  </div>`;
  if (kind === "gauss-jordan-vis") return `<div class="mg-vis">
    <div class="mg-tr"><span class="l"><span class="mg-matrix-wrap"><span class="mg-matrix-inner cols-3"><span class="mg-mc">1</span><span class="mg-mc">2</span><span class="mg-mc mg-aug">5</span><span class="mg-mc">0</span><span class="mg-mc">−1</span><span class="mg-mc mg-aug">−2</span></span></span></span><span class="r">escalonada</span></div>
    <div class="mg-tr"><span class="l">(−1)·F₂ → [ 0  1 | 2 ]</span><span class="r">pivote = 1</span></div>
    <div class="mg-tr"><span class="l">F₁ − 2·F₂ → [ 1  0 | 1 ]</span><span class="r">cero arriba</span></div>
    <div class="mg-tr"><span class="l"><span class="mg-matrix-wrap"><span class="mg-matrix-inner cols-3"><span class="mg-mc">1</span><span class="mg-mc">0</span><span class="mg-mc mg-aug">1</span><span class="mg-mc">0</span><span class="mg-mc">1</span><span class="mg-mc mg-aug">2</span></span></span></span><span class="r" style="color:var(--owl-green)">x=1, y=2</span></div>
  </div>`;
  // ── Nivel 4: Cramer ──────────────────────────────────────────────────────
  if (kind === "cramer-idea") return `<div class="mg-vis">
    <div class="mg-band cat"><div class="h">x = Dₓ/D  ·  y = Dᵧ/D  ·  z = D_z/D</div></div>
    <div class="mg-tr"><span class="l">D = det(A)</span><span class="r">det del sistema</span></div>
    <div class="mg-tr"><span class="l">Dₓ = A con col 1 → b</span><span class="r">det para x</span></div>
    <div class="mg-tr"><span class="l">Dᵧ = A con col 2 → b</span><span class="r">det para y</span></div>
    <div style="text-align:center;color:rgb(var(--wolf));font-size:13px;margin-top:6px">Solo aplica cuando D ≠ 0</div>
  </div>`;
  if (kind === "cramer-2x2") return `<div class="mg-vis">
    <div class="mg-formula" style="font-size:14px;padding:2px 0">3x + 2y = 7  /  x − y = 1</div>
    <div class="mg-tr"><span class="l">D = |3 2; 1 −1| = −3−2</span><span class="r" style="color:var(--cardinal)">= −5</span></div>
    <div class="mg-tr"><span class="l">Dₓ = |7 2; 1 −1| = −7−2</span><span class="r">= −9</span></div>
    <div class="mg-tr"><span class="l">Dᵧ = |3 7; 1 1| = 3−7</span><span class="r">= −4</span></div>
    <div class="mg-tr"><span class="l">x = −9/−5 = 9/5  ·  y = −4/−5 = 4/5</span><span class="r" style="color:var(--owl-green)">✓</span></div>
  </div>`;
  if (kind === "cramer-3x3") return `<div class="mg-vis">
    <div class="mg-band cat"><div class="h">Cramer 3×3 — misma idea, Sarrus para cada det</div></div>
    <div class="mg-tr"><span class="l">D = det(A)</span><span class="r">Sarrus</span></div>
    <div class="mg-tr"><span class="l">Dₓ: sustituye col 1 por b</span><span class="r">Sarrus</span></div>
    <div class="mg-tr"><span class="l">Dᵧ: sustituye col 2 por b</span><span class="r">Sarrus</span></div>
    <div class="mg-tr"><span class="l">D_z: sustituye col 3 por b</span><span class="r" style="color:var(--owl-green)">Sarrus</span></div>
  </div>`;
  return "";
}
