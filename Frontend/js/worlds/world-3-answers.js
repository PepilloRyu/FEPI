// Auto-generated from git c38e36c~1 — admin preview only, NOT used in gameplay
export const ANSWERS_W3 = [
  [
    {
      "type": "mc",
      "tag": "Reto 1 · Evaluar",
      "prompt": "Si f(x) = 4x − 2, ¿cuál es el valor de f(3)?",
      "options": [
        {
          "label": "10",
          "correct": true
        },
        {
          "label": "12",
          "correct": false
        },
        {
          "label": "14",
          "correct": false
        },
        {
          "label": "9",
          "correct": false
        }
      ],
      "hint": "Sustituye x = 3: f(3) = 4(3) − 2 = 12 − 2 = 10."
    },
    {
      "type": "vf",
      "tag": "Reto 2 · Verdadero o Falso",
      "prompt": "En la función f(x) = 5x + 1, el valor de f(0) es 1.",
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
      "hint": "Cuando x = 0, el resultado siempre es el término independiente: f(0) = 5(0) + 1 = 1."
    },
    {
      "type": "slots",
      "tag": "Reto 3 · Completa (arrastra)",
      "prompt": "Arrastra las palabras en el orden en que aparecen en la definición: una función asigna cada elemento del [1°] a exactamente un elemento del [2°].",
      "slots": 2,
      "bank": [
        "dominio",
        "rango",
        "conjunto",
        "variable",
        "incógnita"
      ],
      "answer": [
        "dominio",
        "rango"
      ],
      "hint": "La entrada se llama DOMINIO y la salida se llama RANGO."
    },
    {
      "type": "mc",
      "tag": "Reto 4 · Identificar",
      "prompt": "¿Cuál de estas representa una ECUACIÓN (no una función)?",
      "options": [
        {
          "label": "f(x) = 3x + 7",
          "correct": false
        },
        {
          "label": "3x + 7 = 19",
          "correct": true
        },
        {
          "label": "y = 3x + 7",
          "correct": false
        },
        {
          "label": "g(x) = 7 + 3x",
          "correct": false
        }
      ],
      "hint": "Una ecuación pide encontrar un valor específico de x, no describe una regla general. Busca la igualdad con un número al otro lado."
    },
    {
      "type": "mc",
      "tag": "Reto 5 · Evaluar",
      "prompt": "Si f(x) = 3x − 1, ¿cuál es el valor de f(2)?",
      "options": [
        {
          "label": "5",
          "correct": true
        },
        {
          "label": "7",
          "correct": false
        },
        {
          "label": "6",
          "correct": false
        },
        {
          "label": "4",
          "correct": false
        }
      ],
      "hint": "Sustituye x = 2: f(2) = 3(2) − 1 = 6 − 1 = 5."
    },
    {
      "type": "vf",
      "tag": "Reto 6 · Lineal o no <i class='fa-solid fa-trophy' style='color:#eab308;'></i>",
      "prompt": "f(x) = x² es una función lineal.",
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
      "hint": "Las funciones lineales tienen la forma f(x) = mx + b, con x a la primera potencia. En x², el exponente es 2 → es cuadrática, no lineal."
    }
  ],
  [
    {
      "type": "buildSeq",
      "tag": "Reto 1 · Ordena los pasos",
      "prompt": "Toca los bloques en el orden correcto para resolver: 5x − 3 = 17",
      "bank": [
        "Ecuación original: 5x − 3 = 17",
        "Transponer −3: 5x = 17 + 3",
        "Simplificar: 5x = 20",
        "Dividir entre 5: x = 4",
        "Verificación: 5(4) − 3 = 17 ✓"
      ],
      "answers": [
        [
          "Ecuación original: 5x − 3 = 17",
          "Transponer −3: 5x = 17 + 3",
          "Simplificar: 5x = 20",
          "Dividir entre 5: x = 4",
          "Verificación: 5(4) − 3 = 17 ✓"
        ]
      ],
      "hint": "Primero transpón el término independiente al otro lado, luego divide para despejar x."
    },
    {
      "type": "mc",
      "tag": "Reto 2 · Resolver",
      "prompt": "¿Cuál es la solución de la ecuación  2x + 7 = 3x − 5 ?",
      "options": [
        {
          "label": "x = 12",
          "correct": true
        },
        {
          "label": "x = −12",
          "correct": false
        },
        {
          "label": "x = 2",
          "correct": false
        },
        {
          "label": "x = −2",
          "correct": false
        }
      ],
      "hint": "Transpón 2x hacia la derecha y −5 hacia la izquierda: 7 + 5 = 3x − 2x → 12 = x."
    },
    {
      "type": "mc",
      "tag": "Reto 3 · Con paréntesis",
      "prompt": "Resuelve: 3(2x − 4) = 6x − 12 + x",
      "options": [
        {
          "label": "x = 0",
          "correct": true
        },
        {
          "label": "No tiene solución",
          "correct": false
        },
        {
          "label": "x = cualquier real",
          "correct": false
        },
        {
          "label": "x = 12",
          "correct": false
        }
      ],
      "hint": "Aplica distributiva: 6x − 12 = 7x − 12. Transponiendo: 6x − 7x = 0 → x = 0."
    },
    {
      "type": "mc",
      "tag": "Reto 4 · Con fracciones",
      "prompt": "Resuelve: x/3 + 2 = 6",
      "options": [
        {
          "label": "x = 12",
          "correct": true
        },
        {
          "label": "x = 6",
          "correct": false
        },
        {
          "label": "x = 18",
          "correct": false
        },
        {
          "label": "x = 9",
          "correct": false
        }
      ],
      "hint": "Multiplica todo por 3 para eliminar la fracción: x + 6 = 18. Despeja: x = 12."
    },
    {
      "type": "vf",
      "tag": "Reto 5 · Verificar",
      "prompt": "La solución de la ecuación 4(x − 1) = 2(x + 3) es x = 5.",
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
      "hint": "Distributiva: 4x − 4 = 2x + 6 → 2x = 10 → x = 5. Verifica: 4(4)=16 y 2(6)=16 ✓"
    },
    {
      "type": "mc",
      "tag": "Reto 6 · Problema aplicado <i class='fa-solid fa-trophy' style='color:#eab308;'></i>",
      "prompt": "El doble de un número aumentado en 9 es igual a 35. ¿Cuál es el número?",
      "options": [
        {
          "label": "13",
          "correct": true
        },
        {
          "label": "11",
          "correct": false
        },
        {
          "label": "22",
          "correct": false
        },
        {
          "label": "8",
          "correct": false
        }
      ],
      "hint": "Ecuación: 2x + 9 = 35. \"El doble de\" = 2x, \"aumentado en 9\" = +9. Despeja: 2x = 26 → x = 13."
    }
  ],
  [
    {
      "type": "mc",
      "tag": "Reto 1 · Sustitución",
      "prompt": "Resuelve el sistema por sustitución:\n  x + y = 10\n  x − y = 2",
      "options": [
        {
          "label": "x = 6, y = 4",
          "correct": true
        },
        {
          "label": "x = 4, y = 6",
          "correct": false
        },
        {
          "label": "x = 8, y = 2",
          "correct": false
        },
        {
          "label": "x = 5, y = 5",
          "correct": false
        }
      ],
      "hint": "De la 1ª ecuación: x = 10 − y. Sustituye en la 2ª: (10−y)−y = 2 → 10−2y = 2 → y = 4. Luego x = 6."
    },
    {
      "type": "buildSeq",
      "tag": "Reto 2 · Ordena los pasos (Reducción)",
      "prompt": "Toca los pasos en orden para resolver por reducción:\n  3x + y = 11\n  x − y = 1",
      "bank": [
        "Sumamos las dos ecuaciones: 4x = 12",
        "Dividimos: x = 3",
        "Sustituimos en x − y = 1: 3 − y = 1",
        "Despejamos: y = 2",
        "Solución: (3, 2)"
      ],
      "answers": [
        [
          "Sumamos las dos ecuaciones: 4x = 12",
          "Dividimos: x = 3",
          "Sustituimos en x − y = 1: 3 − y = 1",
          "Despejamos: y = 2",
          "Solución: (3, 2)"
        ]
      ],
      "hint": "Al sumar las ecuaciones, la y se elimina porque y + (−y) = 0. Obtienes 4x = 12."
    },
    {
      "type": "mc",
      "tag": "Reto 3 · Determinante (Cramer)",
      "prompt": "Usando la Regla de Cramer, el determinante D del sistema  2x + y = 5  /  3x − 2y = 4  es:",
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
          "label": "−4",
          "correct": false
        },
        {
          "label": "10",
          "correct": false
        }
      ],
      "hint": "D = (2)(−2) − (1)(3) = −4 − 3 = −7. El determinante es la diferencia cruzada de los coeficientes."
    },
    {
      "type": "vf",
      "tag": "Reto 4 · Infinitas soluciones",
      "prompt": "El sistema  x + y = 5  /  2x + 2y = 10  tiene infinitas soluciones.",
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
      "hint": "La segunda ecuación es exactamente el doble de la primera: son la misma recta. Sistema dependiente = infinitas soluciones."
    },
    {
      "type": "match",
      "tag": "Reto 5 · Empareja método (arrastra)",
      "prompt": "Arrastra el método más conveniente para cada sistema.",
      "pairs": [
        {
          "desc": "x = 3y + 1  /  2x + y = 8",
          "sym": "Sustitución"
        },
        {
          "desc": "3x + 2y = 14  /  3x − 2y = 2",
          "sym": "Reducción"
        },
        {
          "desc": "x + 2y = 9  /  x + y = 6",
          "sym": "Igualación"
        },
        {
          "desc": "2x + 3y = 7  /  5x − y = 3",
          "sym": "Cramer"
        }
      ],
      "symOrder": [
        "Reducción",
        "Sustitución",
        "Cramer",
        "Igualación"
      ],
      "hint": "Sustitución: ya hay una variable despejada. Reducción: mismos coeficientes opuestos. Igualación: mismo coeficiente en ambas. Cramer: coeficientes variados."
    },
    {
      "type": "mc",
      "tag": "Reto 6 · Problema aplicado <i class='fa-solid fa-trophy' style='color:#eab308;'></i>",
      "prompt": "En una tienda, 2 cuadernos y 1 pluma cuestan $35. 1 cuaderno y 2 plumas cuestan $25. ¿Cuánto cuesta cada cuaderno?",
      "options": [
        {
          "label": "$15",
          "correct": true
        },
        {
          "label": "$10",
          "correct": false
        },
        {
          "label": "$5",
          "correct": false
        },
        {
          "label": "$20",
          "correct": false
        }
      ],
      "hint": "Sistema: 2c + p = 35 y c + 2p = 25. Multiplica la 2ª por 2: 2c + 4p = 50. Resta a la 1ª: 3p = 15 → p = 5. Luego c = 15."
    }
  ],
  [
    {
      "type": "mc",
      "tag": "Reto 1 · Sistema 3×3",
      "prompt": "En el sistema 3×3:\n  x + y + z = 9\n  x − y + z = 3\n  x + y − z = 5\n¿Cuál es el valor de x?",
      "options": [
        {
          "label": "x = 4",
          "correct": true
        },
        {
          "label": "x = 3",
          "correct": false
        },
        {
          "label": "x = 5",
          "correct": false
        },
        {
          "label": "x = 2",
          "correct": false
        }
      ],
      "hint": "Suma (1)+(2): x+z = 6. Suma (1)+(3): x+y = 7. Con x+y=7 y x+z=6, sustituye en la ec (1): x+(7−x)+(6−x)=9 → 13−x=9 → x=4."
    },
    {
      "type": "mc",
      "tag": "Reto 2 · Movimiento",
      "prompt": "Dos ciclistas parten del mismo punto en sentidos contrarios: uno a 15 km/h y otro a 20 km/h. ¿En cuántas horas estarán a 105 km de distancia?",
      "options": [
        {
          "label": "3 horas",
          "correct": true
        },
        {
          "label": "5 horas",
          "correct": false
        },
        {
          "label": "7 horas",
          "correct": false
        },
        {
          "label": "4 horas",
          "correct": false
        }
      ],
      "hint": "Ecuación: 15t + 20t = 105 → 35t = 105 → t = 3 horas."
    },
    {
      "type": "mc",
      "tag": "Reto 3 · Edades <i class='fa-solid fa-trophy' style='color:#eab308;'></i>",
      "prompt": "La edad de Carlos es el triple de la de su hermano. Hace 4 años la suma de sus edades era 24. ¿Cuántos años tiene Carlos ahora?",
      "options": [
        {
          "label": "24",
          "correct": true
        },
        {
          "label": "27",
          "correct": false
        },
        {
          "label": "18",
          "correct": false
        },
        {
          "label": "9",
          "correct": false
        }
      ],
      "hint": "Sea x = hermano ahora, 3x = Carlos ahora. Hace 4 años: (x−4)+(3x−4)=24 → 4x−8=24 → x=8. Carlos ahora: 3×8 = 24 años."
    },
    {
      "type": "vf",
      "tag": "Reto 4 · Estrategia 3×3",
      "prompt": "Para resolver un sistema 3×3 se puede reducir a dos sistemas 2×2 eliminando la misma incógnita en ambos pares de ecuaciones.",
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
      "hint": "Exacto. Elimina la misma variable entre (ec1, ec2) y entre (ec1, ec3) para obtener un sistema 2×2 resoluble."
    },
    {
      "type": "buildSeq",
      "tag": "Reto 5 · Ordena los pasos (Mezclas)",
      "prompt": "Toca los pasos en orden para resolver: mezclar café a $80/kg con café a $50/kg para obtener 30 kg a $60/kg.",
      "bank": [
        "Sea x = kg a $80 e y = kg a $50",
        "Ecuación de cantidad: x + y = 30",
        "Ecuación de valor: 80x + 50y = 1800",
        "Sustituir y = 30 − x: 80x + 50(30−x) = 1800",
        "30x = 300 → x = 10 kg",
        "Respuesta: 10 kg a $80 y 20 kg a $50"
      ],
      "answers": [
        [
          "Sea x = kg a $80 e y = kg a $50",
          "Ecuación de cantidad: x + y = 30",
          "Ecuación de valor: 80x + 50y = 1800",
          "Sustituir y = 30 − x: 80x + 50(30−x) = 1800",
          "30x = 300 → x = 10 kg",
          "Respuesta: 10 kg a $80 y 20 kg a $50"
        ]
      ],
      "hint": "Los problemas de mezcla siempre tienen DOS ecuaciones: una de cantidades (x+y=total) y otra de valores o concentraciones."
    },
    {
      "type": "match",
      "tag": "Reto 6 · Tipo de problema (arrastra)",
      "prompt": "Arrastra el tipo de aplicación que corresponde a cada enunciado.",
      "pairs": [
        {
          "desc": "Dos trenes se acercan a 90 y 110 km/h",
          "sym": "Movimiento"
        },
        {
          "desc": "Ana tiene el doble de años que Luis",
          "sym": "Edades"
        },
        {
          "desc": "Mezclar alcohol al 70% y al 30%",
          "sym": "Mezclas"
        },
        {
          "desc": "3 lápices y 2 borradores cuestan $25",
          "sym": "Dinero"
        }
      ],
      "symOrder": [
        "Edades",
        "Movimiento",
        "Dinero",
        "Mezclas"
      ],
      "hint": "Cada tipo tiene su propia estructura: movimiento usa d=vt, edades suma años, mezclas combina concentraciones, dinero plantea precio×cantidad."
    }
  ]
];