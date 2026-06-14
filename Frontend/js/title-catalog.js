export const TITLE_CATALOG = [
  // COMÚN
  { id: 'novato-numerico',        name: 'Novato Numérico',           rank: 'common',    cost: 30  },
  { id: 'buscador-incognitas',    name: 'Buscador de Incógnitas',    rank: 'common',    cost: 30  },
  { id: 'estudiante-guardia',     name: 'Estudiante de Guardia',     rank: 'common',    cost: 35  },
  { id: 'pensador-logico',        name: 'Pensador Lógico',           rank: 'common',    cost: 40  },
  { id: 'defensor-racha',         name: 'Defensor de la Racha',      rank: 'common',    cost: 40  },
  // RARO
  { id: 'equilibrador-balanzas',  name: 'Equilibrador de Balanzas',  rank: 'rare',      cost: 60  },
  { id: 'domador-parabolas',      name: 'Domador de Parábolas',      rank: 'rare',      cost: 65  },
  { id: 'despejador-serial',      name: 'Despejador Serial',         rank: 'rare',      cost: 70  },
  { id: 'fraccionador-problemas', name: 'Fraccionador de Problemas', rank: 'rare',      cost: 70  },
  { id: 'cazador-variables',      name: 'Cazador de Variables',      rank: 'rare',      cost: 75  },
  { id: 'explorador-dimensiones', name: 'Explorador de Dimensiones', rank: 'rare',      cost: 80  },
  // ÉPICO
  { id: 'mago-ecuaciones',        name: 'Mago de las Ecuaciones',    rank: 'epic',      cost: 100 },
  { id: 'maestro-matricial',      name: 'Maestro Matricial',         rank: 'epic',      cost: 110 },
  { id: 'dimensionador-complejo', name: 'Dimensionador Complejo',    rank: 'epic',      cost: 120 },
  { id: 'senor-plano',            name: 'Señor del Plano',           rank: 'epic',      cost: 130 },
  { id: 'sabio-teorema',          name: 'Sabio del Teorema',         rank: 'epic',      cost: 140 },
  { id: 'calculadora-humana',     name: 'Calculadora Humana',        rank: 'epic',      cost: 150 },
  // LEGENDARIO
  { id: 'rey-despeje',            name: 'Rey del Despeje',           rank: 'legendary', cost: 200 },
  { id: 'algebrista-elite',       name: 'Algebrista de Élite',       rank: 'legendary', cost: 250 },
  { id: 'senor-multiverso',       name: 'Señor del Multiverso',      rank: 'legendary', cost: 300 },
];

export function getTitleById(id) {
  return TITLE_CATALOG.find(t => t.id === id) ?? null;
}
