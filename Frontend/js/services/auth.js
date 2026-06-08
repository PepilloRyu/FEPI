/**
 * MathGo Auth Service v2.0
 * Centraliza autenticacion, guards de ruta y verificacion de email.
 */

import { auth } from '../firebaseConfig.js';
import {
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
} from 'https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js';
import { logoutBackend } from './api.js';

// ──────────────────────────────────────────────────────
// GUARDS DE RUTA
// ──────────────────────────────────────────────────────

/**
 * Guard para paginas protegidas.
 * - Si no hay sesion → redirige a /index.html
 * - Si hay sesion pero email no verificado → redirige a la pagina de verificacion
 * @param {boolean} requireVerified - Si true, bloquea usuarios no verificados
 * @returns {Promise<import('firebase/auth').User>} El usuario autenticado
 */
export function requireAuth(requireVerified = true) {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      if (!user) {
        window.location.replace(getRoot() + 'index.html');
        return;
      }
      if (requireVerified && !user.emailVerified) {
        window.location.replace(getRoot() + 'html/verify-email.html');
        return;
      }
      resolve(user);
    });
  });
}

/**
 * Guard para paginas de autenticacion (login/signup).
 * Si el usuario ya tiene sesion, redirige al dashboard.
 */
export function requireGuest() {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      if (user && user.emailVerified) {
        window.location.replace(getRoot() + 'html/learn.html');
        return;
      }
      resolve(user);
    });
  });
}

// ──────────────────────────────────────────────────────
// ACCIONES DE AUTENTICACION
// ──────────────────────────────────────────────────────

/**
 * Cierra la sesion del usuario en Firebase y en el backend.
 */
export async function logout() {
  try {
    await logoutBackend();
  } catch { /* Continuar aunque falle el backend */ }
  
  localStorage.removeItem('mathgo_user');
  sessionStorage.clear();
  
  await signOut(auth);
  window.location.replace(getRoot() + 'index.html');
}

/**
 * Reenvía el correo de verificación al usuario actual.
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function resendVerificationEmail() {
  const user = auth.currentUser;
  if (!user) return { success: false, error: 'No hay sesion activa.' };
  
  try {
    await sendEmailVerification(user);
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Obtiene las iniciales del nombre del usuario para el avatar.
 * @param {string} name 
 * @returns {string}
 */
export function getInitials(name) {
  if (!name) return '?';
  return name
    .split(' ')
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase();
}

/**
 * Obtiene la ruta raiz relativa segun la pagina actual.
 * @returns {string}
 */
function getRoot() {
  const path = window.location.pathname;
  return path.includes('/html/') ? '../' : './';
}

// ──────────────────────────────────────────────────────
// UI HELPERS
// ──────────────────────────────────────────────────────

/**
 * Muestra un toast de notificacion.
 * @param {string} message
 * @param {'success'|'error'|'xp'|''} type
 * @param {number} duration ms
 */
export function showToast(message, type = '', duration = 3500) {
  let container = document.getElementById('mg-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'mg-toast-container';
    container.className = 'mg-toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `mg-toast${type ? ' ' + type : ''}`;
  
  const icons = { success: '✅', error: '❌', xp: '⚡', '': '💬' };
  toast.innerHTML = `<span>${icons[type] || icons['']}</span><span>${message}</span>`;
  
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'mgToastOut 250ms ease forwards';
    setTimeout(() => toast.remove(), 250);
  }, duration);
}

/**
 * Anima una barra de progreso al valor dado.
 * @param {HTMLElement} barEl - Elemento con clase mg-progress-bar
 * @param {number} pct - Porcentaje 0-100
 */
export function animateProgress(barEl, pct) {
  if (!barEl) return;
  requestAnimationFrame(() => {
    barEl.style.width = `${Math.min(100, Math.max(0, pct))}%`;
  });
}

// Exportar para uso directo
export { onAuthStateChanged, auth };
