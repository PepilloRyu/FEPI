const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("./serviceAccountKey.json");

initializeApp({ credential: cert(serviceAccount) });

const db = getFirestore();

const updates = [
  {
    id: "1_0_1",
    prompt:
      "Traduce al lenguaje algebraico: la suma de <i>a</i>, <i>b</i> y <i>m</i>.",
  },
  {
    id: "1_0_3",
    prompt:
      "Arrastra los bloques a los huecos para escribir: el cuadrado de <i>a</i> más el cubo de <i>b</i>.",
  },
  {
    id: "1_0_4",
    prompt:
      "Si <i>a</i> es un número entero, ¿cuáles son los dos enteros consecutivos que vienen después de <i>a</i>?",
  },
  {
    id: "1_0_5",
    prompt:
      "El precio de un libro es <i>a</i> pesos, el de un cuaderno es <i>b</i> pesos y el de una mochila es <i>x</i> pesos. Si compraste 3 libros, 6 cuadernos y <i>m</i> mochilas, ¿cuál expresión representa el total gastado?",
  },
  {
    id: "1_1_1",
    prompt:
      'La expresión <i>a</i> < <i>b</i> + <i>c</i> se lee "<i>a</i> es mayor que <i>b</i> + <i>c</i>".',
  },
  {
    id: "1_1_3",
    prompt:
      'Traduce usando signos de relación: "La suma de <i>x</i> y <i>y</i> es mayor que <i>m</i>".',
  },
  {
    id: "1_1_4",
    prompt:
      "El área de un rectángulo es A = b × h. Si la base <i>b</i> = 3 y la altura <i>h</i> = 2, ¿cuánto vale <i>A</i>?",
  },
  {
    id: "1_2_1",
    prompt:
      "El término <i>x</i> no tiene coeficiente ni signo, por lo tanto equivale a 0<i>x</i>.",
  },
  {
    id: "1_2_4",
    prompt:
      "Observa el polinomio <i>a</i> + <i>x</i> − <i>y</i>. ¿Cuántos términos tiene y de qué grado absoluto es cada uno?",
  },
  {
    id: "4_3_1",
    prompt:
      "Un rectángulo tiene ancho <i>x</i> y largo (<i>x</i> + 5). Si su área es 84 cm², ¿cuánto mide el ancho?",
  },
];

function parseId(compositeId) {
  const parts = compositeId.split("_");
  return { worldId: parts[0], levelId: parts[1], exId: parts[2] };
}

async function main() {
  let successCount = 0;
  let failCount = 0;

  for (const { id, prompt } of updates) {
    const { worldId, levelId, exId } = parseId(id);
    const docRef = db
      .collection("subjects")
      .doc("algebra")
      .collection("units")
      .doc(worldId)
      .collection("levels")
      .doc(levelId)
      .collection("exercises")
      .doc(exId);

    try {
      await docRef.update({ prompt });
      console.log(`[OK] ${id}`);
      successCount++;
    } catch (err) {
      console.error(`[FAIL] ${id}: ${err.message}`);
      failCount++;
    }
  }

  console.log(`\nResultado: ${successCount} actualizados, ${failCount} fallidos.`);
  process.exit(0);
}

main();
