import { db } from './firebaseConfig.js';
import { getDocs, collection } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

let arrayForProfiles = [];

try {
  const querySnapshot = await getDocs(collection(db, 'users'));
  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data() || {};
    arrayForProfiles.push({ ...data, userId: data.userId || docSnap.id });
  });
} catch (error) {
  console.warn('No se pudo cargar el leaderboard desde Firebase. Se mostrará contenido de respaldo.', error);
}

export default arrayForProfiles;
