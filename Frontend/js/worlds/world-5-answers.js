// Auto-generated from git c38e36c~1 — admin preview only, NOT used in gameplay
export const ANSWERS_W5 = [
  [
    {
      "type": "mc",
      "tag": "Reto 1 · Orden de una matriz",
      "prompt": "¿Cuál es el orden de una matriz con 3 filas y 4 columnas?",
      "options": [
        {
          "label": "4×3",
          "correct": false
        },
        {
          "label": "3×4",
          "correct": true
        },
        {
          "label": "12×1",
          "correct": false
        },
        {
          "label": "7×1",
          "correct": false
        }
      ],
      "hint": "El orden siempre es filas × columnas. 3 filas y 4 columnas → 3×4."
    },
    {
      "type": "vf",
      "tag": "Reto 2 · Matriz identidad",
      "prompt": "La matriz identidad I₃ tiene unos en toda la diagonal principal y ceros en el resto.",
      "options": [
        {
          "label": "Verdadero",
          "correct": true
        },
        {
          "label": "Falso",
          "correct": false
        }
      ],
      "hint": "La identidad n×n tiene aᵢᵢ = 1 (diagonal) y aᵢⱼ = 0 para i≠j. Es el neutro de la multiplicación matricial."
    },
    {
      "type": "mc",
      "tag": "Reto 3 · Suma de matrices",
      "prompt": "Si A = [[1, 3], [−2, 0]] y B = [[4, −1], [2, 5]], ¿cuál es el elemento (2,1) de A + B?",
      "options": [
        {
          "label": "0",
          "correct": true
        },
        {
          "label": "2",
          "correct": false
        },
        {
          "label": "−2",
          "correct": false
        },
        {
          "label": "5",
          "correct": false
        }
      ],
      "hint": "(A+B)₂₁ = a₂₁ + b₂₁ = (−2) + 2 = 0. Se suman elementos en la misma posición (fila 2, columna 1)."
    },
    {
      "type": "match",
      "tag": "Reto 4 · Empareja tipos (arrastra)",
      "prompt": "Arrastra el tipo de matriz que corresponde a cada ejemplo.",
      "pairs": [
        {
          "desc": "[ 1 0 0 ] / [ 0 1 0 ] / [ 0 0 1 ]",
          "sym": "Identidad 3×3"
        },
        {
          "desc": "[ 5  2 ] / [ 2  9 ]",
          "sym": "Simétrica 2×2"
        },
        {
          "desc": "[ 3  1  4 ] / [ 0  2  7 ] / [ 0  0  5 ]",
          "sym": "Triangular superior"
        },
        {
          "desc": "[ 0  0 ] / [ 0  0 ] / [ 0  0 ]",
          "sym": "Nula 3×2"
        }
      ],
      "symOrder": [
        "Triangular superior",
        "Identidad 3×3",
        "Nula 3×2",
        "Simétrica 2×2"
      ],
      "hint": "Identidad: 1s en diagonal. Simétrica: a₁₂ = a₂₁. Triangular: ceros debajo de la diagonal. Nula: todo ceros."
    },
    {
      "type": "mc",
      "tag": "Reto 5 · Multiplicación de matrices",
      "prompt": "Para multiplicar A(2×3)·B, ¿cuántas filas necesita B y cuál es el orden del resultado?",
      "options": [
        {
          "label": "B necesita 3 filas; resultado de orden 2×p",
          "correct": true
        },
        {
          "label": "B necesita 2 filas; resultado de orden 3×p",
          "correct": false
        },
        {
          "label": "B puede tener cualquier número de filas",
          "correct": false
        },
        {
          "label": "B necesita 3 filas; resultado de orden 3×3",
          "correct": false
        }
      ],
      "hint": "El número de columnas de A (3) debe coincidir con las filas de B. Si B es 3×p, el resultado es A(2×3)·B(3×p) = C(2×p)."
    },
    {
      "type": "buildSeq",
      "tag": "Reto 6 · Calcular elemento c₁₂ <i class='fa-solid fa-trophy' style='color:#eab308;'></i>",
      "prompt": "Toca los pasos en orden para calcular c₁₂ de A·B, siendo A=[[2,1],[0,3]] y B=[[4,5],[6,7]].",
      "bank": [
        "Ubicar fila 1 de A: [2, 1]",
        "Ubicar columna 2 de B: [5, 7]",
        "Multiplicar posición a posición y sumar",
        "c₁₂ = 2·5 + 1·7 = 10 + 7 = 17",
        "Resultado: c₁₂ = 17"
      ],
      "answers": [
        [
          "Ubicar fila 1 de A: [2, 1]",
          "Ubicar columna 2 de B: [5, 7]",
          "Multiplicar posición a posición y sumar",
          "c₁₂ = 2·5 + 1·7 = 10 + 7 = 17",
          "Resultado: c₁₂ = 17"
        ]
      ],
      "hint": "cᵢⱼ = fila i de A · columna j de B. Multiplica elemento a elemento y suma. Para c₁₂: fila 1 de A × columna 2 de B."
    }
  ],
  [
    {
      "type": "mc",
      "tag": "Reto 1 · Determinante 2×2",
      "prompt": "¿Cuál es el determinante de A = [[4, 2], [1, 3]]?",
      "options": [
        {
          "label": "10",
          "correct": true
        },
        {
          "label": "14",
          "correct": false
        },
        {
          "label": "−10",
          "correct": false
        },
        {
          "label": "2",
          "correct": false
        }
      ],
      "hint": "det(A) = 4·3 − 2·1 = 12 − 2 = 10. Como det ≠ 0, la matriz tiene inversa."
    },
    {
      "type": "vf",
      "tag": "Reto 2 · Filas idénticas",
      "prompt": "Si dos filas de una matriz son idénticas, su determinante es cero.",
      "options": [
        {
          "label": "Verdadero",
          "correct": true
        },
        {
          "label": "Falso",
          "correct": false
        }
      ],
      "hint": "Si dos filas son iguales, una es múltiplo de la otra (factor 1). Por propiedad: fila múltiplo de otra → det = 0."
    },
    {
      "type": "mc",
      "tag": "Reto 3 · Matriz singular",
      "prompt": "Para la matriz B = [[2, 6], [1, 3]], ¿existe la inversa B⁻¹?",
      "options": [
        {
          "label": "Sí, porque B es cuadrada",
          "correct": false
        },
        {
          "label": "No, porque det(B) = 0",
          "correct": true
        },
        {
          "label": "Sí, det(B) = 12",
          "correct": false
        },
        {
          "label": "No, porque B no es identidad",
          "correct": false
        }
      ],
      "hint": "det(B) = 2·3 − 6·1 = 6 − 6 = 0. det = 0 → B es singular → no tiene inversa. La fila 2 es exactamente la mitad de la fila 1."
    },
    {
      "type": "buildSeq",
      "tag": "Reto 4 · Ordena los pasos (inversa)",
      "prompt": "Toca los pasos en orden para calcular A⁻¹ siendo A = [[5, 2], [3, 1]].",
      "bank": [
        "Calcular det(A) = 5·1 − 2·3 = −1",
        "Verificar det ≠ 0: −1 ≠ 0 ✓ existe la inversa",
        "Adjugar: intercambiar a,d y cambiar signos b,c → [1 −2; −3 5]",
        "Dividir entre det = −1: A⁻¹ = (1/−1)·[1 −2; −3 5]",
        "A⁻¹ = [−1  2; 3  −5]",
        "Verificar: A·A⁻¹ = I ✓"
      ],
      "answers": [
        [
          "Calcular det(A) = 5·1 − 2·3 = −1",
          "Verificar det ≠ 0: −1 ≠ 0 ✓ existe la inversa",
          "Adjugar: intercambiar a,d y cambiar signos b,c → [1 −2; −3 5]",
          "Dividir entre det = −1: A⁻¹ = (1/−1)·[1 −2; −3 5]",
          "A⁻¹ = [−1  2; 3  −5]",
          "Verificar: A·A⁻¹ = I ✓"
        ]
      ],
      "hint": "El orden siempre es: det → verificar → adjugar (intercambiar diagonal y cambiar signos) → dividir → verificar."
    },
    {
      "type": "mc",
      "tag": "Reto 5 · Calcular inversa",
      "prompt": "Para A = [[7, 3], [2, 1]], ¿cuánto vale det(A) y cuál es el elemento (1,2) de A⁻¹?",
      "options": [
        {
          "label": "det = 1, elemento (1,2) = −3",
          "correct": true
        },
        {
          "label": "det = 1, elemento (1,2) = 3",
          "correct": false
        },
        {
          "label": "det = 7, elemento (1,2) = −3",
          "correct": false
        },
        {
          "label": "det = 5, elemento (1,2) = −2",
          "correct": false
        }
      ],
      "hint": "det(A) = 7·1 − 3·2 = 7 − 6 = 1. A⁻¹ = (1/1)·[[1, −3], [−2, 7]]. El elemento (1,2) es −3."
    },
    {
      "type": "match",
      "tag": "Reto 6 · Propiedades del det (arrastra) <i class='fa-solid fa-trophy' style='color:#eab308;'></i>",
      "prompt": "Arrastra el efecto sobre el determinante que corresponde a cada operación.",
      "pairs": [
        {
          "desc": "Intercambiar dos filas",
          "sym": "Cambia el signo del det"
        },
        {
          "desc": "Una fila es múltiplo de otra",
          "sym": "det = 0"
        },
        {
          "desc": "Sacar factor k de una fila",
          "sym": "det se multiplica por k"
        },
        {
          "desc": "Sumar múltiplo de una fila a otra",
          "sym": "det no cambia"
        }
      ],
      "symOrder": [
        "det se multiplica por k",
        "Cambia el signo del det",
        "det no cambia",
        "det = 0"
      ],
      "hint": "Propiedad clave: sumar un múltiplo de fila a otra NO cambia el det. Por eso la eliminación gaussiana no altera el valor del determinante."
    }
  ],
  [
    {
      "type": "mc",
      "tag": "Reto 1 · Matriz aumentada",
      "prompt": "¿Cuál es la matriz aumentada del sistema: 3x − y = 7 / x + 2y = 4?",
      "options": [
        {
          "label": "[ 3  −1 | 7 ] / [ 1   2 | 4 ]",
          "correct": true
        },
        {
          "label": "[ 3   1 | 7 ] / [ 1  −2 | 4 ]",
          "correct": false
        },
        {
          "label": "[ 7  −1 | 3 ] / [ 4   2 | 1 ]",
          "correct": false
        },
        {
          "label": "[ 3  −1  7 ] / [ 1   2  4 ]",
          "correct": false
        }
      ],
      "hint": "Los coeficientes de x e y van a la izquierda de la barra vertical; los términos independientes a la derecha."
    },
    {
      "type": "vf",
      "tag": "Reto 2 · Operación de fila",
      "prompt": "Al aplicar la operación F₂ − 3·F₁ → F₂, la fila 1 también se modifica.",
      "options": [
        {
          "label": "Verdadero",
          "correct": false
        },
        {
          "label": "Falso",
          "correct": true
        }
      ],
      "hint": "F₂ − 3·F₁ → F₂ solo modifica la fila 2. La fila 1 se usa como referencia pero permanece sin cambios."
    },
    {
      "type": "buildSeq",
      "tag": "Reto 3 · Ordena los pasos (Gauss)",
      "prompt": "Toca los pasos en orden para resolver por Gauss: 2x + y = 8 / x − y = 1.",
      "bank": [
        "Matriz aumentada: [ 2  1 | 8 ] / [ 1 −1 | 1 ]",
        "F₁ ↔ F₂ → [ 1 −1 | 1 ] / [ 2  1 | 8 ]",
        "F₂ − 2·F₁ → F₂ → [ 1 −1 | 1 ] / [ 0  3 | 6 ]",
        "Sustitución: 3y = 6 → y = 2",
        "x − 2 = 1 → x = 3",
        "Solución: x = 3, y = 2"
      ],
      "answers": [
        [
          "Matriz aumentada: [ 2  1 | 8 ] / [ 1 −1 | 1 ]",
          "F₁ ↔ F₂ → [ 1 −1 | 1 ] / [ 2  1 | 8 ]",
          "F₂ − 2·F₁ → F₂ → [ 1 −1 | 1 ] / [ 0  3 | 6 ]",
          "Sustitución: 3y = 6 → y = 2",
          "x − 2 = 1 → x = 3",
          "Solución: x = 3, y = 2"
        ]
      ],
      "hint": "Gauss: conviene tener un 1 como pivote (intercambia filas si es necesario), luego elimina hacia abajo, finalmente sustitución regresiva."
    },
    {
      "type": "mc",
      "tag": "Reto 4 · Aplicar operación de fila",
      "prompt": "Después de aplicar F₃ − 2·F₁ → F₃ a la fila [4, 6, −2 | 10], con F₁ = [2, 1, 3 | 5], ¿cuál es la nueva fila 3?",
      "options": [
        {
          "label": "[0,  4, −8 | 0]",
          "correct": true
        },
        {
          "label": "[0,  4,  4 | 0]",
          "correct": false
        },
        {
          "label": "[0,  5, −5 | 5]",
          "correct": false
        },
        {
          "label": "[4,  4, −8 | 0]",
          "correct": false
        }
      ],
      "hint": "[4−2·2, 6−2·1, −2−2·3 | 10−2·5] = [0, 4, −8 | 0]. Opera cada elemento: columna por columna."
    },
    {
      "type": "match",
      "tag": "Reto 5 · Empareja forma de la matriz (arrastra)",
      "prompt": "Arrastra la descripción correcta para cada forma de matriz aumentada.",
      "pairs": [
        {
          "desc": "[ 1  3 | 4 ] / [ 0  1 | 2 ]",
          "sym": "Forma escalonada (Gauss)"
        },
        {
          "desc": "[ 1  0 | −2 ] / [ 0  1 | 2 ]",
          "sym": "Forma reducida (Gauss-Jordan)"
        },
        {
          "desc": "[ 2  3 | 4 ] / [ 1  −1 | 2 ]",
          "sym": "Aumentada sin reducir"
        },
        {
          "desc": "[ 1 0 0 | 3 ] / [ 0 1 0 | −1 ] / [ 0 0 1 | 2 ]",
          "sym": "Sistema 3×3 resuelto"
        }
      ],
      "symOrder": [
        "Forma reducida (Gauss-Jordan)",
        "Aumentada sin reducir",
        "Sistema 3×3 resuelto",
        "Forma escalonada (Gauss)"
      ],
      "hint": "Gauss: ceros DEBAJO de la diagonal. Gauss-Jordan: ceros en TODA la columna del pivote. La solución se lee directamente cuando A es la identidad."
    },
    {
      "type": "vf",
      "tag": "Reto 6 · Sin solución <i class='fa-solid fa-trophy' style='color:#eab308;'></i>",
      "prompt": "Si una fila de la matriz aumentada queda [0  0  0 | 5], el sistema no tiene solución.",
      "options": [
        {
          "label": "Verdadero",
          "correct": true
        },
        {
          "label": "Falso",
          "correct": false
        }
      ],
      "hint": "La fila [0 0 … 0 | k] con k≠0 representa 0x + 0y + … = k≠0: una contradicción. El sistema es incompatible (sin solución)."
    }
  ],
  [
    {
      "type": "mc",
      "tag": "Reto 1 · Calcular D",
      "prompt": "Para el sistema 2x + y = 5 / x − 3y = −4, ¿cuánto vale el determinante D?",
      "options": [
        {
          "label": "−7",
          "correct": true
        },
        {
          "label": "7",
          "correct": false
        },
        {
          "label": "−1",
          "correct": false
        },
        {
          "label": "1",
          "correct": false
        }
      ],
      "hint": "D = |2  1; 1 −3| = 2·(−3) − 1·1 = −6 − 1 = −7. Como D ≠ 0, el sistema tiene solución única."
    },
    {
      "type": "vf",
      "tag": "Reto 2 · Columna sustituida",
      "prompt": "En la regla de Cramer, para calcular Dᵧ se sustituye la columna 1 de A por los términos independientes.",
      "options": [
        {
          "label": "Verdadero",
          "correct": false
        },
        {
          "label": "Falso",
          "correct": true
        }
      ],
      "hint": "Para Dᵧ se sustituye la columna 2 (la de los coeficientes de y). Para Dₓ se sustituye la columna 1."
    },
    {
      "type": "mc",
      "tag": "Reto 3 · D y Dₓ",
      "prompt": "Para el sistema 4x − y = 6 / 2x + 3y = 10, ¿cuánto valen D y Dₓ?",
      "options": [
        {
          "label": "D = 14, Dₓ = 28",
          "correct": true
        },
        {
          "label": "D = 14, Dₓ = 14",
          "correct": false
        },
        {
          "label": "D = −14, Dₓ = 28",
          "correct": false
        },
        {
          "label": "D = 10, Dₓ = 56",
          "correct": false
        }
      ],
      "hint": "D = 4·3−(−1)·2 = 12+2 = 14. Dₓ = |6 −1; 10 3| = 6·3−(−1)·10 = 18+10 = 28. x = 28/14 = 2."
    },
    {
      "type": "buildSeq",
      "tag": "Reto 4 · Ordena los pasos (Cramer)",
      "prompt": "Toca los pasos en orden para resolver con Cramer: x + y = 5 / 2x − y = 1.",
      "bank": [
        "D = |1  1; 2 −1| = (1)(−1)−(1)(2) = −3",
        "Dₓ = |5  1; 1 −1| = 5(−1)−1(1) = −6",
        "Dᵧ = |1  5; 2  1| = 1(1)−5(2) = −9",
        "x = Dₓ/D = −6/−3 = 2",
        "y = Dᵧ/D = −9/−3 = 3",
        "Verificar: 2+3=5 ✓   2·2−3=1 ✓"
      ],
      "answers": [
        [
          "D = |1  1; 2 −1| = (1)(−1)−(1)(2) = −3",
          "Dₓ = |5  1; 1 −1| = 5(−1)−1(1) = −6",
          "Dᵧ = |1  5; 2  1| = 1(1)−5(2) = −9",
          "x = Dₓ/D = −6/−3 = 2",
          "y = Dᵧ/D = −9/−3 = 3",
          "Verificar: 2+3=5 ✓   2·2−3=1 ✓"
        ]
      ],
      "hint": "Cramer siempre en orden: D → Dₓ → Dᵧ (→ D_z en 3×3) → dividir → verificar. No confundas qué columna sustituyes en cada determinante."
    },
    {
      "type": "mc",
      "tag": "Reto 5 · D = 0 <i class='fa-solid fa-trophy' style='color:#eab308;'></i>",
      "prompt": "Al aplicar Cramer obtienes D = 0, Dₓ = 0 y Dᵧ = 0. El sistema tiene…",
      "options": [
        {
          "label": "Solución única: x = 0, y = 0",
          "correct": false
        },
        {
          "label": "Ninguna solución (incompatible)",
          "correct": false
        },
        {
          "label": "Infinitas soluciones (indeterminado)",
          "correct": true
        },
        {
          "label": "Exactamente dos soluciones",
          "correct": false
        }
      ],
      "hint": "D = 0 y TODOS los Dᵢ = 0 → sistema indeterminado (ecuaciones dependientes, infinitas soluciones). Si D = 0 pero algún Dᵢ ≠ 0 → incompatible."
    },
    {
      "type": "match",
      "tag": "Reto 6 · Método vs característica (arrastra)",
      "prompt": "Arrastra la característica principal que describe a cada método de resolución.",
      "pairs": [
        {
          "desc": "Gauss",
          "sym": "Triangulariza y resuelve por sustitución regresiva"
        },
        {
          "desc": "Gauss-Jordan",
          "sym": "Produce la identidad; solución directa"
        },
        {
          "desc": "Cramer",
          "sym": "Usa determinantes para cada variable"
        },
        {
          "desc": "Matriz inversa (A⁻¹b)",
          "sym": "Multiplica ambos lados por la inversa de A"
        }
      ],
      "symOrder": [
        "Usa determinantes para cada variable",
        "Triangulariza y resuelve por sustitución regresiva",
        "Multiplica ambos lados por la inversa de A",
        "Produce la identidad; solución directa"
      ],
      "hint": "Cramer es elegante para 2×2 y 3×3. Gauss es preferible para sistemas grandes. Gauss-Jordan elimina la necesidad de sustitución regresiva."
    }
  ]
];