const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("./serviceAccountKey.json");

initializeApp({ credential: cert(serviceAccount) });

const db = getFirestore();

const missions = [
  {
    id: "daily-complete-1-level",
    name: "Primer paso del día",
    description: "Completa 1 nivel hoy",
    type: "daily",
    objective: { metric: "levels_completed", target: 1 },
    xpReward: 50,
    isActive: true,
  },
  {
    id: "daily-earn-200-xp",
    name: "Cosecha de XP",
    description: "Gana 200 XP hoy",
    type: "daily",
    objective: { metric: "xp_earned", target: 200 },
    xpReward: 30,
    isActive: true,
  },
  {
    id: "daily-complete-3-levels",
    name: "Triatleta algebraico",
    description: "Completa 3 niveles hoy",
    type: "daily",
    objective: { metric: "levels_completed", target: 3 },
    xpReward: 100,
    isActive: true,
  },
  {
    id: "weekly-complete-5-levels",
    name: "Maratonista de mundos",
    description: "Completa 5 niveles esta semana",
    type: "weekly",
    objective: { metric: "levels_completed", target: 5 },
    xpReward: 200,
    isActive: true,
  },
  {
    id: "weekly-earn-1000-xp",
    name: "Acumulador de XP",
    description: "Gana 1000 XP esta semana",
    type: "weekly",
    objective: { metric: "xp_earned", target: 1000 },
    xpReward: 150,
    isActive: true,
  },
];

async function seed() {
  const col = db.collection("missions");
  for (const m of missions) {
    const { id, ...data } = m;
    await col.doc(id).set(data);
    console.log(`✓ ${id}`);
  }
  console.log(`\nListo: ${missions.length} misiones escritas en Firestore.`);
}

seed().catch(console.error);
