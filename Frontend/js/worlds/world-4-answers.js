// Auto-generated from git c38e36c~1 — admin preview only, NOT used in gameplay
export const ANSWERS_W4 = [
  [
    {
      "type": "mc",
      "tag": "Reto 1 · Apertura",
      "prompt": "En la función f(x) = −3x² + 6x − 1, ¿hacia dónde abre la parábola?",
      "options": [
        {
          "label": "Hacia arriba, porque el coeficiente de x² es negativo",
          "correct": false
        },
        {
          "label": "Hacia abajo, porque a = −3 < 0",
          "correct": true
        },
        {
          "label": "Hacia la derecha, porque b = 6 > 0",
          "correct": false
        },
        {
          "label": "No forma una parábola, falta la constante",
          "correct": false
        }
      ],
      "hint": "El signo de a (coeficiente de x²) determina la apertura. a < 0 → parábola abre hacia abajo (forma ∩)."
    },
    {
      "type": "vf",
      "tag": "Reto 2 · Vértice",
      "prompt": "En f(x) = 2x² − 8x + 5, el vértice se encuentra en x = 2.",
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
      "hint": "Usa xv = −b/(2a) = −(−8)/(2·2) = 8/4 = 2. ✓"
    },
    {
      "type": "mc",
      "tag": "Reto 3 · Intersección eje Y",
      "prompt": "¿Cuál es el valor de f(0) para la función f(x) = 4x² − 3x + 7?",
      "options": [
        {
          "label": "−3",
          "correct": false
        },
        {
          "label": "4",
          "correct": false
        },
        {
          "label": "7",
          "correct": true
        },
        {
          "label": "8",
          "correct": false
        }
      ],
      "hint": "f(0) = 4(0)² − 3(0) + 7 = 7. La intersección con el eje Y siempre es (0, c)."
    },
    {
      "type": "mc",
      "tag": "Reto 4 · Calcular vértice",
      "prompt": "Para f(x) = x² − 6x + 8, ¿cuáles son las coordenadas del vértice?",
      "options": [
        {
          "label": "(3, −1)",
          "correct": true
        },
        {
          "label": "(3, 1)",
          "correct": false
        },
        {
          "label": "(−3, −1)",
          "correct": false
        },
        {
          "label": "(6, 8)",
          "correct": false
        }
      ],
      "hint": "xv = −(−6)/(2·1) = 3. yv = f(3) = 9 − 18 + 8 = −1. Vértice: (3, −1)."
    },
    {
      "type": "match",
      "tag": "Reto 5 · Empareja (arrastra)",
      "prompt": "Arrastra la característica que corresponde a cada función.",
      "pairs": [
        {
          "desc": "f(x) = x² + 4x + 4",
          "sym": "Vértice en (−2, 0)"
        },
        {
          "desc": "f(x) = −2x² + 1",
          "sym": "Abre hacia abajo, vértice en (0, 1)"
        },
        {
          "desc": "f(x) = 3(x − 1)² − 5",
          "sym": "Vértice en (1, −5)"
        },
        {
          "desc": "f(x) = x² − 9",
          "sym": "Raíces en x = ±3"
        }
      ],
      "symOrder": [
        "Vértice en (1, −5)",
        "Vértice en (−2, 0)",
        "Raíces en x = ±3",
        "Abre hacia abajo, vértice en (0, 1)"
      ],
      "hint": "En la forma f(x) = a(x−h)²+k, el vértice es (h, k). Si b=0 y c es cuadrado perfecto, busca raíces ±√c."
    },
    {
      "type": "buildSeq",
      "tag": "Reto 6 · Ordena los pasos <i class='fa-solid fa-trophy' style='color:#eab308;'></i>",
      "prompt": "Toca los pasos en orden para encontrar el vértice de f(x) = 2x² − 12x + 10.",
      "bank": [
        "Identificar: a = 2, b = −12, c = 10",
        "xv = −(−12) / (2·2) = 12/4 = 3",
        "yv = f(3) = 2(9) − 12(3) + 10 = −8",
        "Vértice: (3, −8)"
      ],
      "answers": [
        [
          "Identificar: a = 2, b = −12, c = 10",
          "xv = −(−12) / (2·2) = 12/4 = 3",
          "yv = f(3) = 2(9) − 12(3) + 10 = −8",
          "Vértice: (3, −8)"
        ]
      ],
      "hint": "El proceso: identificar a, b, c → calcular xv = −b/2a → evaluar yv = f(xv) → escribir el vértice."
    }
  ],
  [
    {
      "type": "mc",
      "tag": "Reto 1 · Factorizar",
      "prompt": "¿Cuáles son las raíces de x² + 7x + 12 = 0?",
      "options": [
        {
          "label": "x = 3 y x = 4",
          "correct": false
        },
        {
          "label": "x = −3 y x = −4",
          "correct": true
        },
        {
          "label": "x = 3 y x = −4",
          "correct": false
        },
        {
          "label": "x = −3 y x = 4",
          "correct": false
        }
      ],
      "hint": "Busca m·n = 12 y m+n = 7. Son 3 y 4. Como el signo del término en x es positivo, ambas raíces son negativas: (x+3)(x+4)=0."
    },
    {
      "type": "vf",
      "tag": "Reto 2 · TCP",
      "prompt": "La ecuación x² − 10x + 25 = 0 es un trinomio cuadrado perfecto con raíz doble x = 5.",
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
      "hint": "Verifica: √25 = 5, y 2·x·5 = 10x ✓. Factoriza como (x−5)² = 0 → raíz doble x = 5."
    },
    {
      "type": "mc",
      "tag": "Reto 3 · Diferencia de cuadrados",
      "prompt": "Resuelve: 2x² − 18 = 0",
      "options": [
        {
          "label": "x = ±9",
          "correct": false
        },
        {
          "label": "x = ±3",
          "correct": true
        },
        {
          "label": "x = 3 únicamente",
          "correct": false
        },
        {
          "label": "x = ±√18",
          "correct": false
        }
      ],
      "hint": "2x² = 18 → x² = 9 → x = ±√9 = ±3. Sin término en x → despeje directo."
    },
    {
      "type": "buildSeq",
      "tag": "Reto 4 · Ordena los pasos",
      "prompt": "Toca los pasos en orden para resolver x² − x − 6 = 0 por factorización.",
      "bank": [
        "Identificar: m·n = −6  y  m+n = −1",
        "Los números son m = 2, n = −3  ✓",
        "Factorizar: (x + 2)(x − 3) = 0",
        "Factor cero: x + 2 = 0  ó  x − 3 = 0",
        "Solución: x = −2  ó  x = 3"
      ],
      "answers": [
        [
          "Identificar: m·n = −6  y  m+n = −1",
          "Los números son m = 2, n = −3  ✓",
          "Factorizar: (x + 2)(x − 3) = 0",
          "Factor cero: x + 2 = 0  ó  x − 3 = 0",
          "Solución: x = −2  ó  x = 3"
        ]
      ],
      "hint": "Primero busca m y n cuyo producto sea c y suma sea b, luego escribe los factores y aplica la propiedad del factor cero."
    },
    {
      "type": "match",
      "tag": "Reto 5 · Empareja método (arrastra)",
      "prompt": "Arrastra el método de resolución más directo para cada ecuación.",
      "pairs": [
        {
          "desc": "x² − 16 = 0",
          "sym": "Diferencia de cuadrados"
        },
        {
          "desc": "x² − 8x + 16 = 0",
          "sym": "Trinomio cuadrado perfecto"
        },
        {
          "desc": "x² + 5x + 6 = 0",
          "sym": "Factorización entera"
        },
        {
          "desc": "x² − 3x − 10 = 0",
          "sym": "Factorización con signos mixtos"
        }
      ],
      "symOrder": [
        "Trinomio cuadrado perfecto",
        "Diferencia de cuadrados",
        "Factorización con signos mixtos",
        "Factorización entera"
      ],
      "hint": "Sin término x → diferencia de cuadrados. Término central = 2ab → TCP. Signos mixtos en c → factorización con signos mixtos."
    },
    {
      "type": "mc",
      "tag": "Reto 6 · Raíz doble <i class='fa-solid fa-trophy' style='color:#eab308;'></i>",
      "prompt": "¿Cuántas raíces reales distintas tiene (x − 4)² = 0?",
      "options": [
        {
          "label": "Ninguna, el cuadrado siempre da positivo",
          "correct": false
        },
        {
          "label": "Dos raíces: x = 4 y x = −4",
          "correct": false
        },
        {
          "label": "Una sola raíz (doble): x = 4",
          "correct": true
        },
        {
          "label": "Infinitas raíces",
          "correct": false
        }
      ],
      "hint": "Cuando factoriza como (x − r)² = 0, hay una única raíz real repetida. La parábola toca el eje X solo en x = 4, no lo cruza."
    }
  ],
  [
    {
      "type": "mc",
      "tag": "Reto 1 · Discriminante",
      "prompt": "Para la ecuación 3x² − 5x + 1 = 0, ¿cuánto vale el discriminante Δ?",
      "options": [
        {
          "label": "13",
          "correct": true
        },
        {
          "label": "−13",
          "correct": false
        },
        {
          "label": "37",
          "correct": false
        },
        {
          "label": "−37",
          "correct": false
        }
      ],
      "hint": "Δ = b² − 4ac = (−5)² − 4(3)(1) = 25 − 12 = 13. Como Δ > 0, hay dos raíces reales distintas."
    },
    {
      "type": "match",
      "tag": "Reto 2 · Empareja Δ (arrastra)",
      "prompt": "Arrastra la situación de la parábola que corresponde a cada valor del discriminante.",
      "pairs": [
        {
          "desc": "Δ = 49",
          "sym": "Dos raíces reales distintas"
        },
        {
          "desc": "Δ = 0",
          "sym": "La parábola es tangente al eje X"
        },
        {
          "desc": "Δ = −4",
          "sym": "La parábola no corta el eje X"
        },
        {
          "desc": "Δ = 1",
          "sym": "Dos raíces con radical simple"
        }
      ],
      "symOrder": [
        "La parábola es tangente al eje X",
        "Dos raíces reales distintas",
        "Dos raíces con radical simple",
        "La parábola no corta el eje X"
      ],
      "hint": "Δ > 0 → 2 raíces. Δ = 0 → raíz doble (tangente). Δ < 0 → sin raíces reales."
    },
    {
      "type": "mc",
      "tag": "Reto 3 · Identificar coeficientes y Δ",
      "prompt": "Para x² − 5x + 6 = 0, ¿cuáles son los valores correctos de a, b, c y Δ?",
      "options": [
        {
          "label": "a=1, b=−5, c=6, Δ=1",
          "correct": true
        },
        {
          "label": "a=1, b=5, c=6, Δ=49",
          "correct": false
        },
        {
          "label": "a=1, b=−5, c=6, Δ=−1",
          "correct": false
        },
        {
          "label": "a=0, b=−5, c=6, Δ=25",
          "correct": false
        }
      ],
      "hint": "a=1, b=−5, c=6. Δ = (−5)² − 4(1)(6) = 25 − 24 = 1. Como Δ=1 > 0, hay dos raíces reales."
    },
    {
      "type": "buildSeq",
      "tag": "Reto 4 · Ordena los pasos (Fórmula general)",
      "prompt": "Toca los pasos en orden para resolver 2x² + 3x − 2 = 0 con la fórmula general.",
      "bank": [
        "Identificar: a=2, b=3, c=−2",
        "Calcular: Δ = 3² − 4(2)(−2) = 9 + 16 = 25",
        "Aplicar: x = (−3 ± √25) / 4 = (−3 ± 5) / 4",
        "x₁ = (−3 + 5)/4 = 1/2",
        "x₂ = (−3 − 5)/4 = −2",
        "Verificar: 2(1/4)+3(1/2)−2 = 0 ✓"
      ],
      "answers": [
        [
          "Identificar: a=2, b=3, c=−2",
          "Calcular: Δ = 3² − 4(2)(−2) = 9 + 16 = 25",
          "Aplicar: x = (−3 ± √25) / 4 = (−3 ± 5) / 4",
          "x₁ = (−3 + 5)/4 = 1/2",
          "x₂ = (−3 − 5)/4 = −2",
          "Verificar: 2(1/4)+3(1/2)−2 = 0 ✓"
        ]
      ],
      "hint": "El flujo siempre es: identificar → calcular Δ → sustituir en la fórmula → simplificar → verificar."
    },
    {
      "type": "mc",
      "tag": "Reto 5 · Aplicar fórmula general",
      "prompt": "Resuelve usando la fórmula general: x² − 6x + 9 = 0.",
      "options": [
        {
          "label": "x = 3 y x = −3",
          "correct": false
        },
        {
          "label": "x = 3 (raíz doble)",
          "correct": true
        },
        {
          "label": "x = 6 y x = 9",
          "correct": false
        },
        {
          "label": "No tiene solución real",
          "correct": false
        }
      ],
      "hint": "Δ = 36 − 36 = 0 → raíz doble. x = 6/(2·1) = 3. También se reconoce como TCP: (x−3)²=0."
    },
    {
      "type": "vf",
      "tag": "Reto 6 · Raíces reales <i class='fa-solid fa-trophy' style='color:#eab308;'></i>",
      "prompt": "La ecuación x² + x + 1 = 0 no tiene soluciones reales.",
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
      "hint": "Δ = 1² − 4(1)(1) = 1 − 4 = −3 < 0. Discriminante negativo → sin raíces reales. La parábola está por encima del eje X."
    }
  ],
  [
    {
      "type": "mc",
      "tag": "Reto 1 · Plantear ecuación",
      "prompt": "La suma de un número y su cuadrado es 20. ¿Cuál es la ecuación correcta?",
      "options": [
        {
          "label": "x² + x − 20 = 0",
          "correct": true
        },
        {
          "label": "x · x = 20  →  2x² = 20",
          "correct": false
        },
        {
          "label": "x · x = 20  →  x = 20",
          "correct": false
        },
        {
          "label": "x² − x − 20 = 0",
          "correct": false
        }
      ],
      "hint": "El enunciado dice \"un número (x) más su cuadrado (x²) es 20\": x + x² = 20 → x² + x − 20 = 0."
    },
    {
      "type": "mc",
      "tag": "Reto 2 · Área de rectángulo",
      "prompt": "Un rectángulo tiene ancho <i>x</i> y largo (<i>x</i> + 5). Si su área es 84 cm², ¿cuánto mide el ancho?",
      "options": [
        {
          "label": "7 cm",
          "correct": true
        },
        {
          "label": "12 cm",
          "correct": false
        },
        {
          "label": "9 cm",
          "correct": false
        },
        {
          "label": "14 cm",
          "correct": false
        }
      ],
      "hint": "x(x+5) = 84 → x² + 5x − 84 = 0 → (x+12)(x−7) = 0. Se descarta x = −12, queda x = 7 cm."
    },
    {
      "type": "vf",
      "tag": "Reto 3 · Descartar raíz",
      "prompt": "Al resolver x² − 3x − 10 = 0 en un problema de longitud, la solución válida es x = 5 (se descarta x = −2).",
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
      "hint": "Las raíces son x = 5 y x = −2. En contextos de longitud, los valores negativos no tienen sentido físico."
    },
    {
      "type": "buildSeq",
      "tag": "Reto 4 · Ordena los pasos",
      "prompt": "Toca los pasos en orden para resolver: el producto de dos enteros consecutivos es 72.",
      "bank": [
        "Sea x el primer entero, x+1 el siguiente",
        "Plantear: x(x+1) = 72  →  x² + x − 72 = 0",
        "Factorizar: (x−8)(x+9) = 0  →  x = 8 ó x = −9",
        "Números: 8 y 9  (ó −9 y −8)",
        "Verificar: 8×9 = 72 ✓  y  (−9)(−8) = 72 ✓"
      ],
      "answers": [
        [
          "Sea x el primer entero, x+1 el siguiente",
          "Plantear: x(x+1) = 72  →  x² + x − 72 = 0",
          "Factorizar: (x−8)(x+9) = 0  →  x = 8 ó x = −9",
          "Números: 8 y 9  (ó −9 y −8)",
          "Verificar: 8×9 = 72 ✓  y  (−9)(−8) = 72 ✓"
        ]
      ],
      "hint": "El flujo para todo problema: definir variable → plantear ecuación → resolver → interpretar → verificar."
    },
    {
      "type": "mc",
      "tag": "Reto 5 · Caída libre",
      "prompt": "Un objeto cae desde 45 m de altura. Usando h(t) = 45 − 5t² = 0, ¿cuánto tarda en llegar al suelo?",
      "options": [
        {
          "label": "t = 3 s",
          "correct": true
        },
        {
          "label": "t = 9 s",
          "correct": false
        },
        {
          "label": "t = 5 s",
          "correct": false
        },
        {
          "label": "t = √45 s",
          "correct": false
        }
      ],
      "hint": "45 − 5t² = 0 → 5t² = 45 → t² = 9 → t = 3 s. Despeje directo (sin término lineal en t)."
    },
    {
      "type": "mc",
      "tag": "Reto 6 · Triángulo <i class='fa-solid fa-trophy' style='color:#eab308;'></i>",
      "prompt": "La base de un triángulo es (2x+1) cm y su altura (x−2) cm. Si el área es 12 cm², ¿qué ecuación describe la situación?",
      "options": [
        {
          "label": "(2x+1)(x−2) = 12",
          "correct": false
        },
        {
          "label": "½(2x+1)(x−2) = 12",
          "correct": true
        },
        {
          "label": "(2x+1) + (x−2) = 12",
          "correct": false
        },
        {
          "label": "2(2x+1)(x−2) = 12",
          "correct": false
        }
      ],
      "hint": "Área del triángulo = ½ · base · altura = ½(2x+1)(x−2) = 12. Recuerda el factor ½ para triángulos."
    }
  ]
];