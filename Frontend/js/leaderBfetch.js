import { db } from './firebaseConfig.js';
import { getDocs, collection } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

const leaderboardContainer = document.getElementById('leaderboard-container');
const querySnapshot = await getDocs(collection(db, "users"));
let arrayForProfiles=[];
querySnapshot.forEach((doc) => {
    const data = doc.data();
    // console.log(data);
    // console.log(data.name);
    arrayForProfiles.push(data);
});
export default arrayForProfiles;
