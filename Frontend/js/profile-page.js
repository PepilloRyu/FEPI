import { db } from './firebaseConfig.js';
import { doc, onSnapshot } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

const FALLBACK_AVATAR = '../assets/svg/profile-image-temp.svg';

const readStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem('mathgo_user')) || JSON.parse(sessionStorage.getItem('user-info')) || {};
  } catch (error) {
    return {};
  }
};

let userInfo = readStoredUser();
const userId = userInfo.uid || userInfo.userId || 'temp';
const userDocRef = doc(db, 'users', userId);

const setText = (id, value) => {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
};

const setImage = (id, value) => {
  const element = document.getElementById(id);
  if (element) {
    element.src = value || FALLBACK_AVATAR;
    element.onerror = () => { element.src = FALLBACK_AVATAR; };
  }
};

const displayName = (data = {}) => data.name || data.displayName || data.username || (data.email ? data.email.split('@')[0] : 'Usuario MathGo');
const displayEmail = (data = {}) => data.email || 'Sin correo registrado';
const displayXp = (data = {}) => data.totalXp ?? data.xp ?? 0;
const displayGems = (data = {}) => data.gems ?? 0;
const displayStreak = (data = {}) => data.dailyStreak ?? 0;

const formatJoinDate = (creationDate) => {
  if (!creationDate) return 'Recién llegado';
  if (typeof creationDate === 'string') return creationDate;
  if (creationDate.seconds) {
    return new Date(creationDate.seconds * 1000).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  return 'Recién llegado';
};

function hydrateProfile(data = {}) {
  const merged = { ...userInfo, ...data };
  setText('first-and-last-name', displayName(merged));
  setText('email', displayEmail(merged));
  setText('xp-value', displayXp(merged));
  setText('gems-value', displayGems(merged));
  setText('streak-value', displayStreak(merged));
  setText('league-value', merged.league || 'Principiante');
  setText('join-date', merged.joinDate || formatJoinDate(merged.creationDate));
  setImage('profile-image', merged.profileImage || merged.photoURL);
  setImage('profile-bottom', merged.profileImage || merged.photoURL);
  setImage('profile-image-bottom', merged.profileImage || merged.photoURL);
  setImage('left-profile-image', merged.profileImage || merged.photoURL);
}

document.addEventListener('DOMContentLoaded', () => {
  hydrateProfile(userInfo);
});

try {
  onSnapshot(userDocRef, (snapshot) => {
    if (snapshot.exists()) hydrateProfile(snapshot.data());
  });
} catch (error) {
  console.warn('Perfil usando datos locales de respaldo.', error);
}
