// Auto-generated from git c38e36c~1 — admin preview only, NOT used in gameplay
export const ANSWERS_W6 = [
  [
    {
      "type": "mc",
      "tag": "Reto 1 · Potencias de i",
      "prompt": "¿Cuál es el valor de i²⁵?",
      "options": [
        {
          "label": "1",
          "correct": false
        },
        {
          "label": "−1",
          "correct": false
        },
        {
          "label": "i",
          "correct": true
        },
        {
          "label": "−i",
          "correct": false
        }
      ],
      "hint": "25 ÷ 4 = 6 con residuo 1. i²⁵ = i¹ = i. Ciclo: i, −1, −i, 1, i, −1, −i, 1, …"
    },
    {
      "type": "vf",
      "tag": "Reto 2 · Conjugado",
      "prompt": "El conjugado de z = 5 − 3i es z̄ = −5 + 3i.",
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
      "hint": "El conjugado solo cambia el signo de la parte imaginaria, no de la real. El conjugado de 5−3i es z̄ = 5+3i."
    },
    {
      "type": "mc",
      "tag": "Reto 3 · Producto de complejos",
      "prompt": "Calcula (3 + 2i)(1 − i).",
      "options": [
        {
          "label": "3 − 2i²  (sin simplificar)",
          "correct": false
        },
        {
          "label": "5 − i",
          "correct": true
        },
        {
          "label": "1 + 5i",
          "correct": false
        },
        {
          "label": "3 + 2",
          "correct": false
        }
      ],
      "hint": "(3+2i)(1−i) = 3−3i+2i−2i² = 3−i−2(−1) = 3−i+2 = 5−i."
    },
    {
      "type": "mc",
      "tag": "Reto 4 · Propiedades de z = 4 − 3i",
      "prompt": "Para z = 4 − 3i, ¿cuáles son Re(z), Im(z), el conjugado z̄ y el módulo |z|?",
      "options": [
        {
          "label": "Re=4, Im=−3, z̄=4+3i, |z|=5",
          "correct": true
        },
        {
          "label": "Re=4, Im=3, z̄=4−3i, |z|=5",
          "correct": false
        },
        {
          "label": "Re=−3, Im=4, z̄=−4+3i, |z|=5",
          "correct": false
        },
        {
          "label": "Re=4, Im=−3, z̄=4+3i, |z|=7",
          "correct": false
        }
      ],
      "hint": "Im(z) es el coeficiente de i (sin el i): Im=−3. El conjugado cambia el signo de Im: z̄=4+3i. |z|=√(16+9)=5."
    },
    {
      "type": "buildSeq",
      "tag": "Reto 5 · División de complejos",
      "prompt": "Toca los pasos en orden para calcular (2+i)/(3−2i).",
      "bank": [
        "Multiplicar numerador y denominador por el conjugado (3+2i)",
        "(2+i)(3+2i) = 6+4i+3i+2i² = 4+7i",
        "(3−2i)(3+2i) = 9−4i² = 9+4 = 13",
        "Resultado: (4+7i)/13 = 4/13 + 7i/13"
      ],
      "answers": [
        [
          "Multiplicar numerador y denominador por el conjugado (3+2i)",
          "(2+i)(3+2i) = 6+4i+3i+2i² = 4+7i",
          "(3−2i)(3+2i) = 9−4i² = 9+4 = 13",
          "Resultado: (4+7i)/13 = 4/13 + 7i/13"
        ]
      ],
      "hint": "La división de complejos siempre: multiplicar por el conjugado del denominador → el denominador se vuelve real (c²+d²)."
    },
    {
      "type": "mc",
      "tag": "Reto 6 · Módulo <i class='fa-solid fa-trophy' style='color:#eab308;'></i>",
      "prompt": "¿Cuál de estos complejos tiene módulo diferente de 5?",
      "options": [
        {
          "label": "z = 1 + i",
          "correct": true
        },
        {
          "label": "z = 3 + 4i",
          "correct": false
        },
        {
          "label": "z = −5i",
          "correct": false
        },
        {
          "label": "z = −3 − 4i",
          "correct": false
        }
      ],
      "hint": "|z|=√(a²+b²). Para 3+4i: √(9+16)=5. Para −5i: √(0+25)=5. Para 1+i: √(1+1)=√2 ≠ 5."
    }
  ],
  [
    {
      "type": "mc",
      "tag": "Reto 1 · A forma polar",
      "prompt": "¿Cuál es la forma polar de z = −1 + i?",
      "options": [
        {
          "label": "√2·cis 45°",
          "correct": false
        },
        {
          "label": "√2·cis 135°",
          "correct": true
        },
        {
          "label": "2·cis 135°",
          "correct": false
        },
        {
          "label": "√2·cis(−45°)",
          "correct": false
        }
      ],
      "hint": "r=√(1+1)=√2. El punto (−1,1) está en el 2do cuadrante: θ = 180°−45° = 135°. Forma polar: √2·cis 135°."
    },
    {
      "type": "vf",
      "tag": "Reto 2 · Multiplicación polar",
      "prompt": "En la forma polar, al multiplicar dos complejos los módulos se suman y los ángulos se multiplican.",
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
      "hint": "Es al revés: los módulos se MULTIPLICAN y los ángulos se SUMAN. z₁·z₂ = r₁r₂·cis(θ₁+θ₂)."
    },
    {
      "type": "mc",
      "tag": "Reto 3 · A forma cartesiana",
      "prompt": "Convierte z = 3·cis 90° a forma cartesiana.",
      "options": [
        {
          "label": "3 + 0i",
          "correct": false
        },
        {
          "label": "0 + 3i",
          "correct": true
        },
        {
          "label": "3 + 3i",
          "correct": false
        },
        {
          "label": "0 − 3i",
          "correct": false
        }
      ],
      "hint": "a = 3·cos 90° = 0; b = 3·sin 90° = 3. Resultado: z = 3i. θ=90° corresponde al eje imaginario positivo."
    },
    {
      "type": "mc",
      "tag": "Reto 4 · Cociente en polar",
      "prompt": "Para z₁=2·cis 40° y z₂=5·cis 20°, ¿cuáles son el módulo y argumento del cociente z₁/z₂?",
      "options": [
        {
          "label": "módulo = 2/5, argumento = 20°",
          "correct": true
        },
        {
          "label": "módulo = 10, argumento = 20°",
          "correct": false
        },
        {
          "label": "módulo = 2/5, argumento = 60°",
          "correct": false
        },
        {
          "label": "módulo = 3, argumento = 20°",
          "correct": false
        }
      ],
      "hint": "División: módulos se dividen (2/5), ángulos se restan (40°−20°=20°). El módulo 10 y ángulo 60° corresponden al PRODUCTO."
    },
    {
      "type": "buildSeq",
      "tag": "Reto 5 · A forma polar paso a paso",
      "prompt": "Toca los pasos en orden para convertir z = −√3 + i a forma polar.",
      "bank": [
        "Calcular r = √((−√3)² + 1²) = √(3+1) = 2",
        "Ángulo de referencia: arctan(1/√3) = 30°",
        "Determinar cuadrante: a<0, b>0 → 2do cuadrante",
        "θ = 180° − 30° = 150°",
        "Forma polar: z = 2·cis 150°"
      ],
      "answers": [
        [
          "Calcular r = √((−√3)² + 1²) = √(3+1) = 2",
          "Ángulo de referencia: arctan(1/√3) = 30°",
          "Determinar cuadrante: a<0, b>0 → 2do cuadrante",
          "θ = 180° − 30° = 150°",
          "Forma polar: z = 2·cis 150°"
        ]
      ],
      "hint": "El ángulo de referencia (arctan|b/a|) es siempre positivo. El cuadrante determina el ajuste: Q1→ref, Q2→180°−ref, Q3→180°+ref, Q4→360°−ref."
    },
    {
      "type": "match",
      "tag": "Reto 6 · Euler (arrastra) <i class='fa-solid fa-trophy' style='color:#eab308;'></i>",
      "prompt": "Arrastra el equivalente cartesiano de cada expresión exponencial.",
      "pairs": [
        {
          "desc": "e^(iπ)",
          "sym": "−1"
        },
        {
          "desc": "e^(i·π/2)",
          "sym": "i"
        },
        {
          "desc": "2·e^(i·π/3)",
          "sym": "1 + i√3"
        },
        {
          "desc": "e^(i·0)",
          "sym": "1"
        }
      ],
      "symOrder": [
        "i",
        "−1",
        "1",
        "1 + i√3"
      ],
      "hint": "Usa e^(iθ)=cosθ+i·sinθ. e^(iπ)=cos π+i·sin π=−1. e^(iπ/2)=cos90°+i·sin90°=i. e^(0)=1. 2·e^(iπ/3)=2(1/2+i√3/2)=1+i√3."
    }
  ],
  [
    {
      "type": "mc",
      "tag": "Reto 1 · De Moivre",
      "prompt": "Usando De Moivre, calcula (√3 + i)⁴. Dato: √3+i = 2·cis 30°.",
      "options": [
        {
          "label": "16·cis 120°",
          "correct": true
        },
        {
          "label": "8·cis 120°",
          "correct": false
        },
        {
          "label": "16·cis 60°",
          "correct": false
        },
        {
          "label": "4·cis 120°",
          "correct": false
        }
      ],
      "hint": "[2·cis 30°]⁴ = 2⁴·cis(4·30°) = 16·cis 120°. Módulo: 2⁴=16. Ángulo: 30°×4=120°."
    },
    {
      "type": "vf",
      "tag": "Reto 2 · Raíces de la unidad",
      "prompt": "La ecuación z⁵ = 1 tiene exactamente 5 soluciones en los números complejos.",
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
      "hint": "Toda ecuación zⁿ=w tiene exactamente n raíces complejas distintas. Las 5 raíces quintas de 1 están equidistantes 72° sobre el círculo unitario."
    },
    {
      "type": "mc",
      "tag": "Reto 3 · Potencia a cartesiana",
      "prompt": "¿Cuánto vale (2·cis 30°)³ en forma cartesiana?",
      "options": [
        {
          "label": "8i",
          "correct": true
        },
        {
          "label": "−8i",
          "correct": false
        },
        {
          "label": "8",
          "correct": false
        },
        {
          "label": "4+4i",
          "correct": false
        }
      ],
      "hint": "(2·cis 30°)³ = 2³·cis(3·30°) = 8·cis 90°. Luego: 8(cos 90°+i·sin 90°) = 8(0+i) = 8i."
    },
    {
      "type": "buildSeq",
      "tag": "Reto 4 · Raíces cuadradas",
      "prompt": "Toca los pasos en orden para hallar las raíces cuadradas de z = 4·cis 60°.",
      "bank": [
        "Identificar: r=4, θ=60°, n=2",
        "Módulo de cada raíz: 4^(1/2) = 2",
        "k=0: 2·cis((60°+0°)/2) = 2·cis 30°",
        "k=1: 2·cis((60°+360°)/2) = 2·cis 210°",
        "Las raíces están separadas 360°/2 = 180° entre sí"
      ],
      "answers": [
        [
          "Identificar: r=4, θ=60°, n=2",
          "Módulo de cada raíz: 4^(1/2) = 2",
          "k=0: 2·cis((60°+0°)/2) = 2·cis 30°",
          "k=1: 2·cis((60°+360°)/2) = 2·cis 210°",
          "Las raíces están separadas 360°/2 = 180° entre sí"
        ]
      ],
      "hint": "Fórmula: zₖ = r^(1/n)·cis((θ+360°k)/n) para k=0,1,…,n−1. Siempre verifica que las raíces estén equidistantes."
    },
    {
      "type": "mc",
      "tag": "Reto 5 · (1+i)⁶",
      "prompt": "(1+i)⁶ = (√2·cis 45°)⁶. ¿Cuál es el resultado en forma cartesiana?",
      "options": [
        {
          "label": "−8i",
          "correct": true
        },
        {
          "label": "8i",
          "correct": false
        },
        {
          "label": "8",
          "correct": false
        },
        {
          "label": "−8",
          "correct": false
        }
      ],
      "hint": "(√2)⁶=2³=8. Ángulo: 6×45°=270°. 8·cis 270° = 8(cos 270°+i·sin 270°) = 8(0+(−1)i) = −8i."
    },
    {
      "type": "mc",
      "tag": "Reto 6 · Potencias <i class='fa-solid fa-trophy' style='color:#eab308;'></i>",
      "prompt": "¿Cuánto vale (cis 120°)³?",
      "options": [
        {
          "label": "1",
          "correct": true
        },
        {
          "label": "−1",
          "correct": false
        },
        {
          "label": "i",
          "correct": false
        },
        {
          "label": "−i",
          "correct": false
        }
      ],
      "hint": "(cis 120°)³ = cis(3×120°) = cis 360° = cos 360°+i·sin 360° = 1+0i = 1."
    }
  ],
  [
    {
      "type": "mc",
      "tag": "Reto 1 · Operaciones con vectores",
      "prompt": "Si u = (5, −2) y v = (1, 3), ¿cuánto vale u + 2v?",
      "options": [
        {
          "label": "(7, 4)",
          "correct": true
        },
        {
          "label": "(6, 1)",
          "correct": false
        },
        {
          "label": "(3, −8)",
          "correct": false
        },
        {
          "label": "(7, −8)",
          "correct": false
        }
      ],
      "hint": "Primero calcula 2v = (2, 6). Luego u + 2v = (5+2, −2+6) = (7, 4)."
    },
    {
      "type": "vf",
      "tag": "Reto 2 · Producto escalar",
      "prompt": "El producto escalar u·v es un vector con la misma dirección que u.",
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
      "hint": "El producto escalar u·v = u₁v₁+u₂v₂ es un número real (escalar), no un vector. No tiene dirección."
    },
    {
      "type": "mc",
      "tag": "Reto 3 · Norma de un vector",
      "prompt": "¿Cuál es la norma del vector v = (−6, 8)?",
      "options": [
        {
          "label": "2",
          "correct": false
        },
        {
          "label": "14",
          "correct": false
        },
        {
          "label": "10",
          "correct": true
        },
        {
          "label": "√28",
          "correct": false
        }
      ],
      "hint": "‖v‖ = √((−6)²+8²) = √(36+64) = √100 = 10."
    },
    {
      "type": "mc",
      "tag": "Reto 4 · Ortogonalidad",
      "prompt": "Para u=(1,2) y v=(4,−2), ¿cuánto vale u·v y son ortogonales?",
      "options": [
        {
          "label": "u·v=0, sí son ortogonales",
          "correct": true
        },
        {
          "label": "u·v=4, no son ortogonales",
          "correct": false
        },
        {
          "label": "u·v=10, no son ortogonales",
          "correct": false
        },
        {
          "label": "u·v=0, no son ortogonales",
          "correct": false
        }
      ],
      "hint": "u·v = 1·4+2·(−2) = 4−4 = 0. Producto escalar = 0 → vectores ortogonales (perpendiculares). ‖u‖=√(1+4)=√5."
    },
    {
      "type": "buildSeq",
      "tag": "Reto 5 · Ángulo entre vectores",
      "prompt": "Toca los pasos en orden para hallar el ángulo entre u=(1,0) y v=(1,1).",
      "bank": [
        "Calcular u·v = 1·1 + 0·1 = 1",
        "Calcular ‖u‖ = √(1+0) = 1",
        "Calcular ‖v‖ = √(1+1) = √2",
        "cos θ = (u·v)/(‖u‖·‖v‖) = 1/(1·√2) = 1/√2",
        "θ = arccos(1/√2) = 45°"
      ],
      "answers": [
        [
          "Calcular u·v = 1·1 + 0·1 = 1",
          "Calcular ‖u‖ = √(1+0) = 1",
          "Calcular ‖v‖ = √(1+1) = √2",
          "cos θ = (u·v)/(‖u‖·‖v‖) = 1/(1·√2) = 1/√2",
          "θ = arccos(1/√2) = 45°"
        ]
      ],
      "hint": "El flujo: producto escalar → normas → fórmula del coseno → arccos. î=(1,0) apunta a la derecha y (1,1) apunta a 45°: tiene sentido geométrico."
    },
    {
      "type": "mc",
      "tag": "Reto 6 · Par NO ortogonal <i class='fa-solid fa-trophy' style='color:#eab308;'></i>",
      "prompt": "¿Cuál par de vectores NO es ortogonal?",
      "options": [
        {
          "label": "u=(2,1) y v=(3,4)",
          "correct": true
        },
        {
          "label": "u=(2,3) y v=(−3,2)",
          "correct": false
        },
        {
          "label": "u=(1,0) y v=(0,5)",
          "correct": false
        },
        {
          "label": "u=(3,1) y v=(−1,3)",
          "correct": false
        }
      ],
      "hint": "u·v=0 → ortogonales. (2)(3)+(1)(4)=6+4=10≠0 → no ortogonales. Para los demás: (2)(−3)+(3)(2)=0, (1)(0)+(0)(5)=0, (3)(−1)+(1)(3)=0."
    }
  ]
];