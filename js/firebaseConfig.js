/*import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyDjnf2lpJBhCS8f4SXiDxxoJbcUMVguQ4s",
  authDomain: "duolingo-project-e5ef7.firebaseapp.com",
  projectId: "duolingo-project-e5ef7",
  storageBucket: "duolingo-project-e5ef7.appspot.com",
  messagingSenderId: "965532549154",
  appId: "1:965532549154:web:a36cf358c57a675e820a7b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export{app};

*/

// js/firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAefN88D1joXfTfIZpH7u7fshv3BUuUpyA",
  authDomain: "mathgo-8b535.firebaseapp.com",
  projectId: "mathgo-8b535",
  storageBucket: "mathgo-8b535.firebasestorage.app",
  messagingSenderId: "676372135966",
  appId: "1:676372135966:web:c27f1c619a0d8beb1c2e0f",
  measurementId: "G-55LZKY4TBF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };