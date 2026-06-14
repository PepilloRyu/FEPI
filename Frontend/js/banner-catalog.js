export const BANNER_CATALOG = [
  // Clásicos
  { id: 'ocean',  name: 'Océano',    cost: 50, category: 'clasicos', gradient: 'linear-gradient(135deg, #0ea5e9, #22d3ee)' },
  { id: 'sunset', name: 'Atardecer', cost: 50, category: 'clasicos', gradient: 'linear-gradient(135deg, #f97316, #ec4899)' },
  { id: 'gold',   name: 'Dorado',    cost: 80, category: 'clasicos', gradient: 'linear-gradient(135deg, #f59e0b, #d97706)' },

  // Elementales
  { id: 'aurora-boreal',    name: 'Aurora Boreal',    cost: 60, category: 'elementales', gradient: 'linear-gradient(135deg, #6d28d9 0%, #10b981 100%)' },
  { id: 'bosque-esmeralda', name: 'Bosque Esmeralda', cost: 40, category: 'elementales', gradient: 'linear-gradient(135deg, #065f46 0%, #34d399 100%)' },
  { id: 'fuego-volcanico',  name: 'Fuego Volcánico',  cost: 45, category: 'elementales', gradient: 'linear-gradient(135deg, #991b1b 0%, #f97316 100%)' },
  { id: 'noche-cosmica',    name: 'Noche Cósmica',    cost: 70, category: 'elementales', gradient: 'linear-gradient(135deg, #0b132b 0%, #1c2541 50%, #3a506b 100%)' },

  // Académicos
  { id: 'pizarron-escolar', name: 'Pizarrón Escolar', cost:  30, category: 'academicos', gradient: 'linear-gradient(135deg, #1e3f20 0%, #0f2d11 100%)' },
  { id: 'fusion-cuantica',  name: 'Fusión Cuántica',  cost: 120, category: 'academicos', gradient: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)' },
  { id: 'grafica-neon',     name: 'Gráfica de Neón',  cost: 130, category: 'academicos', gradient: 'linear-gradient(135deg, #ec4899 0%, #0f172a 100%)' },

  // Prestigio
  { id: 'amatista-real', name: 'Amatista Real',   cost: 100, category: 'prestigio', gradient: 'linear-gradient(135deg, #4c1d95 0%, #c084fc 100%)' },
  { id: 'platino-hielo', name: 'Platino e Hielo', cost: 200, category: 'prestigio', gradient: 'linear-gradient(135deg, #cbd5e1 0%, #94a3b8 50%, #e2e8f0 100%)' },
  { id: 'super-nova',    name: 'Súper Nova',       cost: 250, category: 'prestigio', gradient: 'linear-gradient(135deg, #1e1b4b 0%, #f59e0b 100%)' },

  // Especiales
  {
    id: 'cuadricula-matematica', name: 'Cuadrícula Matemática', cost: 90, category: 'especiales',
    backgroundStyle: {
      backgroundColor: '#0f172a',
      backgroundImage: [
        'linear-gradient(135deg, rgba(30,41,59,0.8), rgba(15,23,42,0.8))',
        'repeating-linear-gradient(rgba(255,255,255,0.20) 0px, rgba(255,255,255,0.20) 1px, transparent 1px, transparent 20px)',
        'repeating-linear-gradient(90deg, rgba(255,255,255,0.20) 0px, rgba(255,255,255,0.20) 1px, transparent 1px, transparent 20px)',
      ].join(', '),
      backgroundSize: '100% 100%, 20px 20px, 20px 20px',
    },
  },
  {
    id: 'onda-senoidal', name: 'Onda Senoidal', cost: 150, category: 'especiales',
    backgroundStyle: {
      backgroundColor: '#0f172a',
      backgroundImage: [
        'repeating-linear-gradient(60deg, rgba(6,182,212,0.28) 0px, rgba(6,182,212,0.28) 1px, transparent 1px, transparent 20px)',
        'repeating-linear-gradient(120deg, rgba(139,92,246,0.28) 0px, rgba(139,92,246,0.28) 1px, transparent 1px, transparent 20px)',
        'linear-gradient(135deg, #1e1b4b, #0f172a)',
      ].join(', '),
    },
  },
];

export function getBannerStyle(banner) {
  if (banner.backgroundStyle) {
    return Object.entries(banner.backgroundStyle)
      .map(([k, v]) => `${k.replace(/([A-Z])/g, c => '-' + c.toLowerCase())}:${v}`)
      .join(';');
  }
  return `background:${banner.gradient}`;
}
