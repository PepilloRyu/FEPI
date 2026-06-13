// Auto-generated from git c38e36c~1 — admin preview only, NOT used in gameplay
export const ANSWERS_W1 = [
  [
    {
      "type": "mc",
      "tag": "Reto 1 · Concepto",
      "prompt": "¿En qué rama de las matemáticas las cantidades se representan con letras para abarcar todos los valores posibles?",
      "options": [
        {
          "label": "Aritmética",
          "correct": false
        },
        {
          "label": "Álgebra",
          "correct": true
        },
        {
          "label": "Geometría",
          "correct": false
        }
      ],
      "hint": "La aritmética usa números fijos. Busca la rama que usa letras para representar cualquier valor."
    },
    {
      "type": "build",
      "tag": "Reto 2 · Traducción (toca)",
      "prompt": "Traduce al lenguaje algebraico: la suma de <i>a</i>, <i>b</i> y <i>m</i>.",
      "bank": [
        "a",
        "b",
        "m",
        "c",
        "+",
        "+"
      ],
      "operands": [
        "a",
        "b",
        "m"
      ],
      "hint": "\"Suma\" significa unir las tres cantidades con el signo +. El orden no importa."
    },
    {
      "type": "match",
      "tag": "Reto 3 · Empareja (arrastra)",
      "prompt": "Arrastra cada símbolo hasta la frase que le corresponde.",
      "pairs": [
        {
          "desc": "la suma de a y b",
          "sym": "a + b"
        },
        {
          "desc": "el cuadrado de a",
          "sym": "a²"
        },
        {
          "desc": "el triple de a",
          "sym": "3a"
        },
        {
          "desc": "el cubo de b",
          "sym": "b³"
        }
      ],
      "symOrder": [
        "3a",
        "a + b",
        "b³",
        "a²"
      ],
      "hint": "El exponente ² significa \"al cuadrado\"; un número pegado como 3a es una multiplicación."
    },
    {
      "type": "slots",
      "tag": "Reto 4 · Completa (arrastra)",
      "prompt": "Arrastra los bloques a los huecos para escribir: el cuadrado de <i>a</i> más el cubo de <i>b</i>.",
      "slots": 2,
      "bank": [
        "b³",
        "2a",
        "a²",
        "3b"
      ],
      "answer": [
        "a²",
        "b³"
      ],
      "hint": "El cuadrado de a es a² (no 2a). El cubo de b es b³. El orden de la suma no importa."
    },
    {
      "type": "mc",
      "tag": "Reto 5 · Razonamiento",
      "prompt": "Si <i>a</i> es un número entero, ¿cuáles son los dos enteros consecutivos que vienen después de <i>a</i>?",
      "options": [
        {
          "label": "a, b",
          "correct": false
        },
        {
          "label": "a + 1, a + 2",
          "correct": true
        },
        {
          "label": "1a, 2a",
          "correct": false
        }
      ],
      "hint": "Para pasar al siguiente entero, sumas 1. El que sigue después de a es a + 1, y el siguiente a + 2."
    },
    {
      "type": "build",
      "tag": "Reto 6 · Problema aplicado <i class='fa-solid fa-trophy' style='color:#eab308;'></i>",
      "prompt": "El precio de un libro es <i>a</i> pesos, el de un cuaderno es <i>b</i> pesos y el de una mochila es <i>x</i> pesos. Si compraste 3 libros, 6 cuadernos y <i>m</i> mochilas, ¿cuál expresión representa el total gastado?",
      "bank": [
        "3a",
        "6b",
        "mx",
        "3",
        "a",
        "+",
        "+"
      ],
      "operands": [
        "3a",
        "6b",
        "mx"
      ],
      "hint": "Multiplica la cantidad por su precio: 3 libros a $a son 3a. Luego suma los tres resultados."
    }
  ],
  [
    {
      "type": "mc",
      "tag": "Reto 1 · Clasificación",
      "prompt": "¿A qué clase pertenecen los signos >, < y = ?",
      "options": [
        {
          "label": "Signos de operación",
          "correct": false
        },
        {
          "label": "Signos de relación",
          "correct": true
        },
        {
          "label": "Signos de agrupación",
          "correct": false
        }
      ],
      "hint": "Estos signos comparan dos cantidades para decir cuál es mayor, menor o si son iguales."
    },
    {
      "type": "vf",
      "tag": "Reto 2 · Verdadero o Falso",
      "prompt": "La expresión <i>a</i> < <i>b</i> + <i>c</i> se lee \"<i>a</i> es mayor que <i>b</i> + <i>c</i>\".",
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
      "hint": "El pico de < apunta a la cantidad menor: a < b + c significa que a es MENOR que b + c."
    },
    {
      "type": "mc",
      "tag": "Reto 3 · El intruso",
      "prompt": "Selecciona el signo que NO es un signo de agrupación.",
      "options": [
        {
          "label": "( )",
          "correct": false
        },
        {
          "label": "[ ]",
          "correct": false
        },
        {
          "label": "{ }",
          "correct": false
        },
        {
          "label": ">",
          "correct": true
        }
      ],
      "hint": "Los signos de agrupación encierran operaciones para resolverlas primero. El > compara, no agrupa."
    },
    {
      "type": "buildSeq",
      "tag": "Reto 4 · Traducción (toca)",
      "prompt": "Traduce usando signos de relación: \"La suma de <i>x</i> y <i>y</i> es mayor que <i>m</i>\".",
      "bank": [
        "x",
        "y",
        "m",
        "+",
        ">",
        "<"
      ],
      "answers": [
        [
          "x",
          "+",
          "y",
          ">",
          "m"
        ],
        [
          "y",
          "+",
          "x",
          ">",
          "m"
        ]
      ],
      "hint": "Primero la suma x + y, luego el signo \"mayor que\" (>) y al final m."
    },
    {
      "type": "mc",
      "tag": "Reto 5 · Evaluar una fórmula <i class='fa-solid fa-trophy' style='color:#eab308;'></i>",
      "prompt": "El área de un rectángulo es A = b × h. Si la base <i>b</i> = 3 y la altura <i>h</i> = 2, ¿cuánto vale <i>A</i>?",
      "options": [
        {
          "label": "5",
          "correct": false
        },
        {
          "label": "6",
          "correct": true
        },
        {
          "label": "8",
          "correct": false
        },
        {
          "label": "9",
          "correct": false
        }
      ],
      "hint": "Sustituye: cambia b por 3 y h por 2. Luego multiplica (no sumes): 3 × 2 = 6."
    }
  ],
  [
    {
      "type": "mc",
      "tag": "Reto 1 · Partes del término",
      "prompt": "Analiza el término  −3a²x³.  ¿Cuál es el coeficiente y cuál es la parte literal?",
      "options": [
        {
          "label": "Coeficiente: −3  |  Parte literal: a²x³",
          "correct": true
        },
        {
          "label": "Coeficiente: 3  |  Parte literal: a²x³",
          "correct": false
        },
        {
          "label": "Coeficiente: a²x³  |  Parte literal: −3",
          "correct": false
        },
        {
          "label": "Coeficiente: −3  |  Parte literal: −a²x³",
          "correct": false
        }
      ],
      "hint": "El signo viaja con el coeficiente: el coeficiente es −3. La parte literal son solo las letras con sus exponentes: a²x³."
    },
    {
      "type": "vf",
      "tag": "Reto 2 · Reglas ninja",
      "prompt": "El término <i>x</i> no tiene coeficiente ni signo, por lo tanto equivale a 0<i>x</i>.",
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
      "hint": "Coeficiente oculto = 1 (no 0). Y signo oculto = +. Por eso x equivale a +1x, no a 0x."
    },
    {
      "type": "slots",
      "tag": "Reto 3 · Grado (arrastra)",
      "prompt": "El grado absoluto es la suma de los exponentes de las letras. Arrastra el grado del término  5a⁴b³c².",
      "slots": 1,
      "prefix": "Grado =",
      "bank": [
        "9",
        "14",
        "24",
        "11"
      ],
      "answer": [
        "9"
      ],
      "hint": "Suma SOLO los exponentes de las letras: 4 + 3 + 2 = 9. El coeficiente 5 no se suma."
    },
    {
      "type": "mc",
      "tag": "Reto 4 · Monomio vs. polinomio",
      "prompt": "Clasifica la expresión:  x³ + 2x² + x + 7",
      "options": [
        {
          "label": "Monomio (un solo término)",
          "correct": false
        },
        {
          "label": "Polinomio (más de un término)",
          "correct": true
        }
      ],
      "hint": "Cuenta los términos separados por + o −. Aquí hay cuatro, así que es un polinomio."
    },
    {
      "type": "mc",
      "tag": "Reto 5 · Análisis completo <i class='fa-solid fa-trophy' style='color:#eab308;'></i>",
      "prompt": "Observa el polinomio <i>a</i> + <i>x</i> − <i>y</i>. ¿Cuántos términos tiene y de qué grado absoluto es cada uno?",
      "options": [
        {
          "label": "3 términos, cada uno de grado 1",
          "correct": true
        },
        {
          "label": "1 término, de grado 3",
          "correct": false
        },
        {
          "label": "3 términos, cada uno de grado 0",
          "correct": false
        },
        {
          "label": "2 términos, de grado 1",
          "correct": false
        }
      ],
      "hint": "Los signos + y − separan 3 términos. Cada letra sin exponente escrito tiene exponente 1, así que cada término es de grado 1."
    }
  ]
];