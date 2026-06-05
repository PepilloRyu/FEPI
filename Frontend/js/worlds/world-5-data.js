// js/worlds/world-5-data.js — Mundo 5: Matrices y Sistemas Avanzados
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
      challenges: [
        { type: "mc", tag: "Reto 1 · Orden de una matriz",
          prompt: "¿Cuál es el orden de una matriz con 3 filas y 4 columnas?",
          options: [{ label: "4×3", correct: false }, { label: "3×4", correct: true }, { label: "12×1", correct: false }, { label: "7×1", correct: false }],
          hint: "El orden siempre es filas × columnas. 3 filas y 4 columnas → 3×4." },
        { type: "vf", tag: "Reto 2 · Matriz identidad",
          prompt: "La matriz identidad I₃ tiene unos en toda la diagonal principal y ceros en el resto.",
          options: [{ label: "Verdadero", correct: true }, { label: "Falso", correct: false }],
          hint: "La identidad n×n tiene aᵢᵢ = 1 (diagonal) y aᵢⱼ = 0 para i≠j. Es el neutro de la multiplicación matricial." },
        { type: "mc", tag: "Reto 3 · Suma de matrices",
          prompt: "Si A = [[1, 3], [−2, 0]] y B = [[4, −1], [2, 5]], ¿cuál es el elemento (2,1) de A + B?",
          options: [{ label: "0", correct: true }, { label: "2", correct: false }, { label: "−2", correct: false }, { label: "5", correct: false }],
          hint: "(A+B)₂₁ = a₂₁ + b₂₁ = (−2) + 2 = 0. Se suman elementos en la misma posición (fila 2, columna 1)." },
        { type: "match", tag: "Reto 4 · Empareja tipos (arrastra)",
          prompt: "Arrastra el tipo de matriz que corresponde a cada ejemplo.",
          pairs: [
            { desc: "[ 1 0 0 ] / [ 0 1 0 ] / [ 0 0 1 ]", sym: "Identidad 3×3" },
            { desc: "[ 5  2 ] / [ 2  9 ]", sym: "Simétrica 2×2" },
            { desc: "[ 3  1  4 ] / [ 0  2  7 ] / [ 0  0  5 ]", sym: "Triangular superior" },
            { desc: "[ 0  0 ] / [ 0  0 ] / [ 0  0 ]", sym: "Nula 3×2" },
          ],
          symOrder: ["Triangular superior", "Identidad 3×3", "Nula 3×2", "Simétrica 2×2"],
          hint: "Identidad: 1s en diagonal. Simétrica: a₁₂ = a₂₁. Triangular: ceros debajo de la diagonal. Nula: todo ceros." },
        { type: "mc", tag: "Reto 5 · Multiplicación de matrices",
          prompt: "Para multiplicar A(2×3)·B, ¿cuántas filas necesita B y cuál es el orden del resultado?",
          options: [
            { label: "B necesita 3 filas; resultado de orden 2×p", correct: true },
            { label: "B necesita 2 filas; resultado de orden 3×p", correct: false },
            { label: "B puede tener cualquier número de filas", correct: false },
            { label: "B necesita 3 filas; resultado de orden 3×3", correct: false },
          ],
          hint: "El número de columnas de A (3) debe coincidir con las filas de B. Si B es 3×p, el resultado es A(2×3)·B(3×p) = C(2×p)." },
        { type: "buildSeq", tag: "Reto 6 · Calcular elemento c₁₂ 🏆",
          prompt: "Toca los pasos en orden para calcular c₁₂ de A·B, siendo A=[[2,1],[0,3]] y B=[[4,5],[6,7]].",
          bank: [
            "Ubicar fila 1 de A: [2, 1]",
            "Ubicar columna 2 de B: [5, 7]",
            "Multiplicar posición a posición y sumar",
            "c₁₂ = 2·5 + 1·7 = 10 + 7 = 17",
            "Resultado: c₁₂ = 17",
          ],
          answers: [[
            "Ubicar fila 1 de A: [2, 1]",
            "Ubicar columna 2 de B: [5, 7]",
            "Multiplicar posición a posición y sumar",
            "c₁₂ = 2·5 + 1·7 = 10 + 7 = 17",
            "Resultado: c₁₂ = 17",
          ]],
          hint: "cᵢⱼ = fila i de A · columna j de B. Multiplica elemento a elemento y suma. Para c₁₂: fila 1 de A × columna 2 de B." },
      ],
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
      challenges: [
        { type: "mc", tag: "Reto 1 · Determinante 2×2",
          prompt: "¿Cuál es el determinante de A = [[4, 2], [1, 3]]?",
          options: [{ label: "10", correct: true }, { label: "14", correct: false }, { label: "−10", correct: false }, { label: "2", correct: false }],
          hint: "det(A) = 4·3 − 2·1 = 12 − 2 = 10. Como det ≠ 0, la matriz tiene inversa." },
        { type: "vf", tag: "Reto 2 · Filas idénticas",
          prompt: "Si dos filas de una matriz son idénticas, su determinante es cero.",
          options: [{ label: "Verdadero", correct: true }, { label: "Falso", correct: false }],
          hint: "Si dos filas son iguales, una es múltiplo de la otra (factor 1). Por propiedad: fila múltiplo de otra → det = 0." },
        { type: "mc", tag: "Reto 3 · Matriz singular",
          prompt: "Para la matriz B = [[2, 6], [1, 3]], ¿existe la inversa B⁻¹?",
          options: [
            { label: "Sí, porque B es cuadrada", correct: false },
            { label: "No, porque det(B) = 0", correct: true },
            { label: "Sí, det(B) = 12", correct: false },
            { label: "No, porque B no es identidad", correct: false },
          ],
          hint: "det(B) = 2·3 − 6·1 = 6 − 6 = 0. det = 0 → B es singular → no tiene inversa. La fila 2 es exactamente la mitad de la fila 1." },
        { type: "buildSeq", tag: "Reto 4 · Ordena los pasos (inversa)",
          prompt: "Toca los pasos en orden para calcular A⁻¹ siendo A = [[5, 2], [3, 1]].",
          bank: [
            "Calcular det(A) = 5·1 − 2·3 = −1",
            "Verificar det ≠ 0: −1 ≠ 0 ✓ existe la inversa",
            "Adjugar: intercambiar a,d y cambiar signos b,c → [1 −2; −3 5]",
            "Dividir entre det = −1: A⁻¹ = (1/−1)·[1 −2; −3 5]",
            "A⁻¹ = [−1  2; 3  −5]",
            "Verificar: A·A⁻¹ = I ✓",
          ],
          answers: [[
            "Calcular det(A) = 5·1 − 2·3 = −1",
            "Verificar det ≠ 0: −1 ≠ 0 ✓ existe la inversa",
            "Adjugar: intercambiar a,d y cambiar signos b,c → [1 −2; −3 5]",
            "Dividir entre det = −1: A⁻¹ = (1/−1)·[1 −2; −3 5]",
            "A⁻¹ = [−1  2; 3  −5]",
            "Verificar: A·A⁻¹ = I ✓",
          ]],
          hint: "El orden siempre es: det → verificar → adjugar (intercambiar diagonal y cambiar signos) → dividir → verificar." },
        { type: "mc", tag: "Reto 5 · Calcular inversa",
          prompt: "Para A = [[7, 3], [2, 1]], ¿cuánto vale det(A) y cuál es el elemento (1,2) de A⁻¹?",
          options: [
            { label: "det = 1, elemento (1,2) = −3", correct: true },
            { label: "det = 1, elemento (1,2) = 3", correct: false },
            { label: "det = 7, elemento (1,2) = −3", correct: false },
            { label: "det = 5, elemento (1,2) = −2", correct: false },
          ],
          hint: "det(A) = 7·1 − 3·2 = 7 − 6 = 1. A⁻¹ = (1/1)·[[1, −3], [−2, 7]]. El elemento (1,2) es −3." },
        { type: "match", tag: "Reto 6 · Propiedades del det (arrastra) 🏆",
          prompt: "Arrastra el efecto sobre el determinante que corresponde a cada operación.",
          pairs: [
            { desc: "Intercambiar dos filas", sym: "Cambia el signo del det" },
            { desc: "Una fila es múltiplo de otra", sym: "det = 0" },
            { desc: "Sacar factor k de una fila", sym: "det se multiplica por k" },
            { desc: "Sumar múltiplo de una fila a otra", sym: "det no cambia" },
          ],
          symOrder: ["det se multiplica por k", "Cambia el signo del det", "det no cambia", "det = 0"],
          hint: "Propiedad clave: sumar un múltiplo de fila a otra NO cambia el det. Por eso la eliminación gaussiana no altera el valor del determinante." },
      ],
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
      challenges: [
        { type: "mc", tag: "Reto 1 · Matriz aumentada",
          prompt: "¿Cuál es la matriz aumentada del sistema: 3x − y = 7 / x + 2y = 4?",
          options: [
            { label: "[ 3  −1 | 7 ] / [ 1   2 | 4 ]", correct: true },
            { label: "[ 3   1 | 7 ] / [ 1  −2 | 4 ]", correct: false },
            { label: "[ 7  −1 | 3 ] / [ 4   2 | 1 ]", correct: false },
            { label: "[ 3  −1  7 ] / [ 1   2  4 ]", correct: false },
          ],
          hint: "Los coeficientes de x e y van a la izquierda de la barra vertical; los términos independientes a la derecha." },
        { type: "vf", tag: "Reto 2 · Operación de fila",
          prompt: "Al aplicar la operación F₂ − 3·F₁ → F₂, la fila 1 también se modifica.",
          options: [{ label: "Verdadero", correct: false }, { label: "Falso", correct: true }],
          hint: "F₂ − 3·F₁ → F₂ solo modifica la fila 2. La fila 1 se usa como referencia pero permanece sin cambios." },
        { type: "buildSeq", tag: "Reto 3 · Ordena los pasos (Gauss)",
          prompt: "Toca los pasos en orden para resolver por Gauss: 2x + y = 8 / x − y = 1.",
          bank: [
            "Matriz aumentada: [ 2  1 | 8 ] / [ 1 −1 | 1 ]",
            "F₁ ↔ F₂ → [ 1 −1 | 1 ] / [ 2  1 | 8 ]",
            "F₂ − 2·F₁ → F₂ → [ 1 −1 | 1 ] / [ 0  3 | 6 ]",
            "Sustitución: 3y = 6 → y = 2",
            "x − 2 = 1 → x = 3",
            "Solución: x = 3, y = 2",
          ],
          answers: [[
            "Matriz aumentada: [ 2  1 | 8 ] / [ 1 −1 | 1 ]",
            "F₁ ↔ F₂ → [ 1 −1 | 1 ] / [ 2  1 | 8 ]",
            "F₂ − 2·F₁ → F₂ → [ 1 −1 | 1 ] / [ 0  3 | 6 ]",
            "Sustitución: 3y = 6 → y = 2",
            "x − 2 = 1 → x = 3",
            "Solución: x = 3, y = 2",
          ]],
          hint: "Gauss: conviene tener un 1 como pivote (intercambia filas si es necesario), luego elimina hacia abajo, finalmente sustitución regresiva." },
        { type: "mc", tag: "Reto 4 · Aplicar operación de fila",
          prompt: "Después de aplicar F₃ − 2·F₁ → F₃ a la fila [4, 6, −2 | 10], con F₁ = [2, 1, 3 | 5], ¿cuál es la nueva fila 3?",
          options: [
            { label: "[0,  4, −8 | 0]", correct: true },
            { label: "[0,  4,  4 | 0]", correct: false },
            { label: "[0,  5, −5 | 5]", correct: false },
            { label: "[4,  4, −8 | 0]", correct: false },
          ],
          hint: "[4−2·2, 6−2·1, −2−2·3 | 10−2·5] = [0, 4, −8 | 0]. Opera cada elemento: columna por columna." },
        { type: "match", tag: "Reto 5 · Empareja forma de la matriz (arrastra)",
          prompt: "Arrastra la descripción correcta para cada forma de matriz aumentada.",
          pairs: [
            { desc: "[ 1  3 | 4 ] / [ 0  1 | 2 ]", sym: "Forma escalonada (Gauss)" },
            { desc: "[ 1  0 | −2 ] / [ 0  1 | 2 ]", sym: "Forma reducida (Gauss-Jordan)" },
            { desc: "[ 2  3 | 4 ] / [ 1  −1 | 2 ]", sym: "Aumentada sin reducir" },
            { desc: "[ 1 0 0 | 3 ] / [ 0 1 0 | −1 ] / [ 0 0 1 | 2 ]", sym: "Sistema 3×3 resuelto" },
          ],
          symOrder: ["Forma reducida (Gauss-Jordan)", "Aumentada sin reducir", "Sistema 3×3 resuelto", "Forma escalonada (Gauss)"],
          hint: "Gauss: ceros DEBAJO de la diagonal. Gauss-Jordan: ceros en TODA la columna del pivote. La solución se lee directamente cuando A es la identidad." },
        { type: "vf", tag: "Reto 6 · Sin solución 🏆",
          prompt: "Si una fila de la matriz aumentada queda [0  0  0 | 5], el sistema no tiene solución.",
          options: [{ label: "Verdadero", correct: true }, { label: "Falso", correct: false }],
          hint: "La fila [0 0 … 0 | k] con k≠0 representa 0x + 0y + … = k≠0: una contradicción. El sistema es incompatible (sin solución)." },
      ],
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
      challenges: [
        { type: "mc", tag: "Reto 1 · Calcular D",
          prompt: "Para el sistema 2x + y = 5 / x − 3y = −4, ¿cuánto vale el determinante D?",
          options: [{ label: "−7", correct: true }, { label: "7", correct: false }, { label: "−1", correct: false }, { label: "1", correct: false }],
          hint: "D = |2  1; 1 −3| = 2·(−3) − 1·1 = −6 − 1 = −7. Como D ≠ 0, el sistema tiene solución única." },
        { type: "vf", tag: "Reto 2 · Columna sustituida",
          prompt: "En la regla de Cramer, para calcular Dᵧ se sustituye la columna 1 de A por los términos independientes.",
          options: [{ label: "Verdadero", correct: false }, { label: "Falso", correct: true }],
          hint: "Para Dᵧ se sustituye la columna 2 (la de los coeficientes de y). Para Dₓ se sustituye la columna 1." },
        { type: "mc", tag: "Reto 3 · D y Dₓ",
          prompt: "Para el sistema 4x − y = 6 / 2x + 3y = 10, ¿cuánto valen D y Dₓ?",
          options: [
            { label: "D = 14, Dₓ = 28", correct: true },
            { label: "D = 14, Dₓ = 14", correct: false },
            { label: "D = −14, Dₓ = 28", correct: false },
            { label: "D = 10, Dₓ = 56", correct: false },
          ],
          hint: "D = 4·3−(−1)·2 = 12+2 = 14. Dₓ = |6 −1; 10 3| = 6·3−(−1)·10 = 18+10 = 28. x = 28/14 = 2." },
        { type: "buildSeq", tag: "Reto 4 · Ordena los pasos (Cramer)",
          prompt: "Toca los pasos en orden para resolver con Cramer: x + y = 5 / 2x − y = 1.",
          bank: [
            "D = |1  1; 2 −1| = (1)(−1)−(1)(2) = −3",
            "Dₓ = |5  1; 1 −1| = 5(−1)−1(1) = −6",
            "Dᵧ = |1  5; 2  1| = 1(1)−5(2) = −9",
            "x = Dₓ/D = −6/−3 = 2",
            "y = Dᵧ/D = −9/−3 = 3",
            "Verificar: 2+3=5 ✓   2·2−3=1 ✓",
          ],
          answers: [[
            "D = |1  1; 2 −1| = (1)(−1)−(1)(2) = −3",
            "Dₓ = |5  1; 1 −1| = 5(−1)−1(1) = −6",
            "Dᵧ = |1  5; 2  1| = 1(1)−5(2) = −9",
            "x = Dₓ/D = −6/−3 = 2",
            "y = Dᵧ/D = −9/−3 = 3",
            "Verificar: 2+3=5 ✓   2·2−3=1 ✓",
          ]],
          hint: "Cramer siempre en orden: D → Dₓ → Dᵧ (→ D_z en 3×3) → dividir → verificar. No confundas qué columna sustituyes en cada determinante." },
        { type: "mc", tag: "Reto 5 · D = 0 🏆",
          prompt: "Al aplicar Cramer obtienes D = 0, Dₓ = 0 y Dᵧ = 0. El sistema tiene…",
          options: [
            { label: "Solución única: x = 0, y = 0", correct: false },
            { label: "Ninguna solución (incompatible)", correct: false },
            { label: "Infinitas soluciones (indeterminado)", correct: true },
            { label: "Exactamente dos soluciones", correct: false },
          ],
          hint: "D = 0 y TODOS los Dᵢ = 0 → sistema indeterminado (ecuaciones dependientes, infinitas soluciones). Si D = 0 pero algún Dᵢ ≠ 0 → incompatible." },
        { type: "match", tag: "Reto 6 · Método vs característica (arrastra)",
          prompt: "Arrastra la característica principal que describe a cada método de resolución.",
          pairs: [
            { desc: "Gauss", sym: "Triangulariza y resuelve por sustitución regresiva" },
            { desc: "Gauss-Jordan", sym: "Produce la identidad; solución directa" },
            { desc: "Cramer", sym: "Usa determinantes para cada variable" },
            { desc: "Matriz inversa (A⁻¹b)", sym: "Multiplica ambos lados por la inversa de A" },
          ],
          symOrder: ["Usa determinantes para cada variable", "Triangulariza y resuelve por sustitución regresiva", "Multiplica ambos lados por la inversa de A", "Produce la identidad; solución directa"],
          hint: "Cramer es elegante para 2×2 y 3×3. Gauss es preferible para sistemas grandes. Gauss-Jordan elimina la necesidad de sustitución regresiva." },
      ],
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
    <div class="mg-tr"><span class="l">Identidad I₃ — 1s en diagonal</span><span class="r">[1 0 0; 0 1 0; 0 0 1]</span></div>
    <div class="mg-tr"><span class="l">Triangular superior — 0s debajo</span><span class="r">[2 5; 0 3]</span></div>
    <div class="mg-tr"><span class="l">Simétrica — a₁₂ = a₂₁</span><span class="r">[3 7; 7 5]</span></div>
    <div class="mg-tr"><span class="l">Nula — todo ceros</span><span class="r">[0 0; 0 0]</span></div>
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
    <div class="mg-formula" style="font-size:18px;padding:6px 0">A = [3  5; 2  4]</div>
    <div class="mg-tr"><span class="l">det = 3·4 − 5·2 = 12 − 10</span><span class="r" style="color:var(--mathgo-blue)">= 2</span></div>
    <div class="mg-tr"><span class="l">B = [6  3; 4  2] → det = 12−12</span><span class="r" style="color:var(--cardinal)">= 0 (singular)</span></div>
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
    <div class="mg-formula" style="font-size:16px;padding:4px 0">A = [3  5; 1  2] → det = 1</div>
    <div class="mg-tr"><span class="l">A⁻¹ = (1/1)·[2 −5; −1 3]</span><span class="r" style="color:var(--owl-green)">[2 −5; −1 3]</span></div>
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
    <div class="mg-tr"><span class="l">[ 1  2 | 5 ] / [ 0 −1 | −2 ]</span><span class="r">escalonada</span></div>
    <div class="mg-tr"><span class="l">−y = −2 → y=2; x=1</span><span class="r" style="color:var(--owl-green)">sustitución ↑</span></div>
  </div>`;
  if (kind === "gauss-jordan-vis") return `<div class="mg-vis">
    <div class="mg-tr"><span class="l">[ 1  2 | 5 ] / [ 0 −1 | −2 ]</span><span class="r">escalonada</span></div>
    <div class="mg-tr"><span class="l">(−1)·F₂ → [ 0  1 | 2 ]</span><span class="r">pivote = 1</span></div>
    <div class="mg-tr"><span class="l">F₁ − 2·F₂ → [ 1  0 | 1 ]</span><span class="r">cero arriba</span></div>
    <div class="mg-tr"><span class="l">[ 1  0 | 1 ] / [ 0  1 | 2 ]</span><span class="r" style="color:var(--owl-green)">x=1, y=2</span></div>
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
