// Auto-generated from git c38e36c~1 — admin preview only, NOT used in gameplay
export const ANSWERS_W2 = [
  [
    {
      "type": "mc",
      "tag": "Reto 1 · Naturales",
      "prompt": "¿Cuál de los siguientes es un número natural?",
      "options": [
        {
          "label": "−5",
          "correct": false
        },
        {
          "label": "0",
          "correct": false
        },
        {
          "label": "3/4",
          "correct": false
        },
        {
          "label": "7",
          "correct": true
        }
      ],
      "hint": "Los naturales son los números de contar: 1, 2, 3, 4, ... Positivos, sin fracciones ni cero."
    },
    {
      "type": "vf",
      "tag": "Reto 2 · Enteros",
      "prompt": "El número −8 pertenece al conjunto de los números enteros (ℤ).",
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
      "hint": "Los enteros incluyen negativos: ℤ = {..., −3, −2, −1, 0, 1, 2, 3, ...}. El −8 está ahí."
    },
    {
      "type": "match",
      "tag": "Reto 3 · Empareja (arrastra)",
      "prompt": "Arrastra cada número al conjunto al que pertenece como miembro más específico.",
      "pairs": [
        {
          "desc": "7",
          "sym": "ℕ Naturales"
        },
        {
          "desc": "−3",
          "sym": "ℤ Enteros"
        },
        {
          "desc": "3/4",
          "sym": "ℚ Racionales"
        },
        {
          "desc": "√5",
          "sym": "ℚ' Irracionales"
        }
      ],
      "symOrder": [
        "ℚ Racionales",
        "ℕ Naturales",
        "ℚ' Irracionales",
        "ℤ Enteros"
      ],
      "hint": "Natural = positivo sin fracción. Entero = incluye negativos. Racional = fracción. Irracional = raíz no exacta."
    },
    {
      "type": "mc",
      "tag": "Reto 4 · Racionales vs Irracionales",
      "prompt": "El número 0.666... (que equivale a 2/3) pertenece al conjunto de los:",
      "options": [
        {
          "label": "Naturales (ℕ)",
          "correct": false
        },
        {
          "label": "Enteros (ℤ)",
          "correct": false
        },
        {
          "label": "Racionales (ℚ)",
          "correct": true
        },
        {
          "label": "Irracionales (ℚ')",
          "correct": false
        }
      ],
      "hint": "Un decimal que se repite siempre puede escribirse como fracción. 0.666... = 2/3 → es racional."
    },
    {
      "type": "mc",
      "tag": "Reto 5 · ¿Cuál es irracional?",
      "prompt": "¿Cuál de estos números es irracional?",
      "options": [
        {
          "label": "√4",
          "correct": false
        },
        {
          "label": "√9",
          "correct": false
        },
        {
          "label": "√16",
          "correct": false
        },
        {
          "label": "√7",
          "correct": true
        }
      ],
      "hint": "√4=2, √9=3, √16=4 son raíces exactas (naturales). √7 no tiene raíz exacta: es irracional."
    },
    {
      "type": "slots",
      "tag": "Reto 6 · El gran conjunto <i class='fa-solid fa-trophy' style='color:#eab308;'></i> (arrastra)",
      "prompt": "El conjunto que contiene a TODOS los demás es el de los números ___.",
      "slots": 1,
      "bank": [
        "ℕ Naturales",
        "ℤ Enteros",
        "ℚ Racionales",
        "ℝ Reales"
      ],
      "answer": [
        "ℝ Reales"
      ],
      "hint": "Recuerda: ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ. Los reales son el universo numérico más amplio que verás en álgebra."
    }
  ],
  [
    {
      "type": "mc",
      "tag": "Reto 1 · Propiedad conmutativa",
      "prompt": "Si a + b = b + a, ¿qué propiedad de la suma ilustra esta igualdad?",
      "options": [
        {
          "label": "Asociativa de la suma",
          "correct": false
        },
        {
          "label": "Conmutativa de la suma",
          "correct": true
        },
        {
          "label": "Distributiva",
          "correct": false
        },
        {
          "label": "Elemento neutro",
          "correct": false
        }
      ],
      "hint": "Conmutativa = cambiar el ORDEN. Asociativa = mover los PARÉNTESIS. Aquí solo cambia el orden de a y b."
    },
    {
      "type": "vf",
      "tag": "Reto 2 · Distributiva",
      "prompt": "La expresión 4 · (3 + 5) es igual a 4 · 3 + 4 · 5.",
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
      "hint": "Distributiva: 4·(3+5) = 4·3 + 4·5 = 12 + 20 = 32. Comprueba: 4·8 = 32. ¡Correcto!"
    },
    {
      "type": "match",
      "tag": "Reto 3 · Empareja propiedades (arrastra)",
      "prompt": "Arrastra cada propiedad al ejemplo que le corresponde.",
      "pairs": [
        {
          "desc": "a + 0 = a",
          "sym": "Neutro aditivo"
        },
        {
          "desc": "a(b + c) = ab + ac",
          "sym": "Distributiva"
        },
        {
          "desc": "(a+b)+c = a+(b+c)",
          "sym": "Asociativa"
        },
        {
          "desc": "a + (−a) = 0",
          "sym": "Inverso aditivo"
        }
      ],
      "symOrder": [
        "Distributiva",
        "Neutro aditivo",
        "Inverso aditivo",
        "Asociativa"
      ],
      "hint": "Neutro: no cambia el valor. Inverso: lleva al neutro. Asociativa: mueve paréntesis. Distributiva: reparte."
    },
    {
      "type": "mc",
      "tag": "Reto 4 · Aplicar la distributiva",
      "prompt": "Aplica la propiedad distributiva: 5 · (x + 3) = ?",
      "options": [
        {
          "label": "5x + 3",
          "correct": false
        },
        {
          "label": "5x + 15",
          "correct": true
        },
        {
          "label": "5x · 3",
          "correct": false
        },
        {
          "label": "8x",
          "correct": false
        }
      ],
      "hint": "Distribuye el 5 entre TODOS los términos: 5·x + 5·3 = 5x + 15. El 3 NO queda como estaba."
    },
    {
      "type": "mc",
      "tag": "Reto 5 · Inverso multiplicativo <i class='fa-solid fa-trophy' style='color:#eab308;'></i>",
      "prompt": "¿Cuál es el inverso multiplicativo (recíproco) de 3/4?",
      "options": [
        {
          "label": "−3/4",
          "correct": false
        },
        {
          "label": "3/4",
          "correct": false
        },
        {
          "label": "4/3",
          "correct": true
        },
        {
          "label": "4",
          "correct": false
        }
      ],
      "hint": "El recíproco de a/b es b/a, pues (a/b)·(b/a)=1. Recíproco de 3/4 → 4/3."
    }
  ],
  [
    {
      "type": "mc",
      "tag": "Reto 1 · Ley de signos (suma)",
      "prompt": "¿Cuánto es (−9) + (−4)?",
      "options": [
        {
          "label": "5",
          "correct": false
        },
        {
          "label": "−5",
          "correct": false
        },
        {
          "label": "13",
          "correct": false
        },
        {
          "label": "−13",
          "correct": true
        }
      ],
      "hint": "Signos iguales (ambos −): suma los valores absolutos (9+4=13) y conserva el signo negativo: −13."
    },
    {
      "type": "vf",
      "tag": "Reto 2 · Ley de signos (multiplicación)",
      "prompt": "El resultado de (−3) × (−5) es un número negativo.",
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
      "hint": "Negativo × Negativo = Positivo: (−3)(−5) = +15. Signos iguales siempre dan positivo."
    },
    {
      "type": "mc",
      "tag": "Reto 3 · ¿Qué va primero?",
      "prompt": "En la expresión 2 + 3 × 4, ¿qué operación se realiza primero?",
      "options": [
        {
          "label": "La suma 2 + 3",
          "correct": false
        },
        {
          "label": "La multiplicación 3 × 4",
          "correct": true
        },
        {
          "label": "Se resuelve de derecha a izquierda",
          "correct": false
        },
        {
          "label": "Da igual el orden",
          "correct": false
        }
      ],
      "hint": "Jerarquía: la multiplicación (×) va ANTES que la suma (+). Siempre, sin excepción."
    },
    {
      "type": "mc",
      "tag": "Reto 4 · Calcula con jerarquía",
      "prompt": "Calcula respetando la jerarquía: 2 + 3 × 4",
      "options": [
        {
          "label": "20",
          "correct": false
        },
        {
          "label": "14",
          "correct": true
        },
        {
          "label": "24",
          "correct": false
        },
        {
          "label": "11",
          "correct": false
        }
      ],
      "hint": "1° Multiplicación: 3×4=12. 2° Suma: 2+12=14. Hacer 2+3=5 primero daría 20, que es incorrecto."
    },
    {
      "type": "mc",
      "tag": "Reto 5 · Paréntesis y potencias",
      "prompt": "Calcula: (4 + 2)² ÷ 3",
      "options": [
        {
          "label": "12",
          "correct": true
        },
        {
          "label": "10",
          "correct": false
        },
        {
          "label": "4",
          "correct": false
        },
        {
          "label": "6",
          "correct": false
        }
      ],
      "hint": "1° Paréntesis: (4+2)=6. 2° Potencia: 6²=36. 3° División: 36÷3=12."
    },
    {
      "type": "mc",
      "tag": "Reto 6 · Expresión completa <i class='fa-solid fa-trophy' style='color:#eab308;'></i>",
      "prompt": "¿Cuánto vale: 3² + 4 × 2 − (10 ÷ 5)?",
      "options": [
        {
          "label": "28",
          "correct": false
        },
        {
          "label": "15",
          "correct": true
        },
        {
          "label": "17",
          "correct": false
        },
        {
          "label": "13",
          "correct": false
        }
      ],
      "hint": "Paréntesis: 10÷5=2. Potencia: 3²=9. Multiplicación: 4×2=8. Suma/resta: 9+8−2=15."
    }
  ],
  [
    {
      "type": "mc",
      "tag": "Reto 1 · Simplificar razón",
      "prompt": "¿Cuál es la razón simplificada de 12 a 8?",
      "options": [
        {
          "label": "12:8",
          "correct": false
        },
        {
          "label": "2:3",
          "correct": false
        },
        {
          "label": "3:2",
          "correct": true
        },
        {
          "label": "4:3",
          "correct": false
        }
      ],
      "hint": "Simplifica como fracción: 12/8. MCD(12,8)=4. Divide: 12÷4=3, 8÷4=2. Razón = 3:2."
    },
    {
      "type": "vf",
      "tag": "Reto 2 · Verificar proporción",
      "prompt": "En la proporción 3:6 = 5:10, el producto de extremos (3×10) es igual al producto de medios (6×5).",
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
      "hint": "Extremos: 3×10=30. Medios: 6×5=30. Son iguales. Confirma que 3:6 = 5:10 es válida."
    },
    {
      "type": "mc",
      "tag": "Reto 3 · Cuarto proporcional",
      "prompt": "Encuentra el valor de x en la proporción: 4:6 = x:9",
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
          "label": "7",
          "correct": false
        },
        {
          "label": "8",
          "correct": false
        }
      ],
      "hint": "Producto cruzado: 4×9 = 6×x → 36 = 6x → x = 36÷6 = 6."
    },
    {
      "type": "match",
      "tag": "Reto 4 · Términos (arrastra)",
      "prompt": "En la proporción 2:5 = 6:15, identifica el nombre de cada término.",
      "pairs": [
        {
          "desc": "2",
          "sym": "Primer extremo"
        },
        {
          "desc": "5",
          "sym": "Primer medio"
        },
        {
          "desc": "6",
          "sym": "Segundo medio"
        },
        {
          "desc": "15",
          "sym": "Segundo extremo"
        }
      ],
      "symOrder": [
        "Segundo medio",
        "Primer extremo",
        "Segundo extremo",
        "Primer medio"
      ],
      "hint": "Extremos = 1° y 4° (2 y 15). Medios = 2° y 3° (5 y 6). Comprueba: 2×15=30 = 5×6=30 ✓"
    },
    {
      "type": "mc",
      "tag": "Reto 5 · Problema aplicado <i class='fa-solid fa-trophy' style='color:#eab308;'></i>",
      "prompt": "Si 5 libros cuestan $75, ¿cuánto cuestan 8 libros al mismo precio?",
      "options": [
        {
          "label": "$100",
          "correct": false
        },
        {
          "label": "$120",
          "correct": true
        },
        {
          "label": "$110",
          "correct": false
        },
        {
          "label": "$90",
          "correct": false
        }
      ],
      "hint": "Plantea: 5:75 = 8:x. Producto cruzado: 5×x = 75×8 → 5x = 600 → x = $120."
    }
  ],
  [
    {
      "type": "mc",
      "tag": "Reto 1 · Múltiplos",
      "prompt": "¿Cuáles son los primeros cuatro múltiplos positivos de 6?",
      "options": [
        {
          "label": "1, 2, 3, 6",
          "correct": false
        },
        {
          "label": "6, 12, 18, 24",
          "correct": true
        },
        {
          "label": "6, 10, 14, 18",
          "correct": false
        },
        {
          "label": "3, 6, 9, 12",
          "correct": false
        }
      ],
      "hint": "Múltiplos de 6: 6×1=6, 6×2=12, 6×3=18, 6×4=24. No confundas múltiplos con divisores."
    },
    {
      "type": "mc",
      "tag": "Reto 2 · Calcular el MCM",
      "prompt": "¿Cuál es el MCM de 4 y 6?",
      "options": [
        {
          "label": "2",
          "correct": false
        },
        {
          "label": "12",
          "correct": true
        },
        {
          "label": "24",
          "correct": false
        },
        {
          "label": "6",
          "correct": false
        }
      ],
      "hint": "Múltiplos de 4: 4, 8, 12... Múltiplos de 6: 6, 12... El primero en coincidir es 12."
    },
    {
      "type": "mc",
      "tag": "Reto 3 · Calcular el MCD",
      "prompt": "¿Cuál es el MCD de 18 y 24?",
      "options": [
        {
          "label": "2",
          "correct": false
        },
        {
          "label": "3",
          "correct": false
        },
        {
          "label": "6",
          "correct": true
        },
        {
          "label": "12",
          "correct": false
        }
      ],
      "hint": "Divisores de 18: 1,2,3,6,9,18. Divisores de 24: 1,2,3,4,6,8,12,24. El mayor en común es 6."
    },
    {
      "type": "vf",
      "tag": "Reto 4 · Propiedad del MCM",
      "prompt": "El MCM de dos números siempre es mayor o igual que cualquiera de los dos números.",
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
      "hint": "El MCM debe ser múltiplo de ambos, así que nunca puede ser menor que ninguno. MCM(4,6)=12 ≥ 6. ✓"
    },
    {
      "type": "mc",
      "tag": "Reto 5 · Problema aplicado <i class='fa-solid fa-trophy' style='color:#eab308;'></i>",
      "prompt": "Tres semáforos cambian cada 20, 30 y 60 segundos. ¿En cuántos segundos coincidirán los tres a la vez?",
      "options": [
        {
          "label": "30 s",
          "correct": false
        },
        {
          "label": "60 s",
          "correct": true
        },
        {
          "label": "90 s",
          "correct": false
        },
        {
          "label": "120 s",
          "correct": false
        }
      ],
      "hint": "Calcula MCM(20, 30, 60). 20=4×5, 30=2×3×5, 60=4×3×5. MCM=4×3×5=60 segundos."
    }
  ]
];