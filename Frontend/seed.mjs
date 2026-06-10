import { WORLD as w1 } from './js/worlds/world-1-meta.js';
import { WORLD as w2 } from './js/worlds/world-2-meta.js';
import { WORLD as w3 } from './js/worlds/world-3-meta.js';
import { WORLD as w4 } from './js/worlds/world-4-meta.js';
import { WORLD as w5 } from './js/worlds/world-5-meta.js';
import { WORLD as w6 } from './js/worlds/world-6-meta.js';

const worlds = [w1, w2, w3, w4, w5, w6];

// The C# World entity expects WorldId instead of id at the root
const formattedWorlds = worlds.map(w => ({
  worldId: w.id,
  title: w.title,
  subtitle: w.subtitle,
  levels: w.levels.map(l => ({
    id: l.id,
    icon: l.icon,
    node: l.node,
    title: l.title,
    subtitle: l.subtitle,
    theory: l.theory,
    challenges: l.challenges
  }))
}));

async function seed() {
  console.log('Iniciando Seeding de', formattedWorlds.length, 'mundos...');
  
  try {
    const response = await fetch('http://localhost:5000/api/admin/seed-worlds', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formattedWorlds)
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('Seeding Exitoso:', data);
    } else {
      const err = await response.text();
      console.error('Error en Seeding:', response.status, err);
    }
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

seed();
