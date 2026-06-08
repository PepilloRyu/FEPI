/**
 * MathGo API Service v2.0
 * Capa centralizada de comunicacion con el backend C#.
 * Obtiene el token JWT de Firebase automaticamente.
 */

import { auth } from '../firebaseConfig.js';

const BASE_URL = 'http://localhost:5000/api';

// ──────────────────────────────────────────────────────
// NUCLEO HTTP
// ──────────────────────────────────────────────────────

/**
 * Obtiene el token JWT del usuario actual de Firebase.
 * @returns {Promise<string|null>}
 */
async function getToken() {
  const user = auth.currentUser;
  if (!user) return null;
  try {
    return await user.getIdToken(/* forceRefresh */ false);
  } catch {
    return null;
  }
}

/**
 * Wrapper principal para todas las llamadas al backend.
 * @param {string} path - Ruta relativa ej: '/users/me'
 * @param {object} options - Opciones fetch (method, body, etc.)
 * @returns {Promise<{data: any, error: string|null}>}
 */
async function request(path, options = {}) {
  const token = await getToken();

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers,
    });

    if (response.status === 204) return { data: null, error: null };

    const text = await response.text();
    let data = null;
    try { data = JSON.parse(text); } catch { data = text; }

    if (!response.ok) {
      const msg = data?.message || data?.Message || data || `Error ${response.status}`;
      return { data: null, error: msg };
    }

    return { data, error: null };
  } catch (err) {
    console.error(`[API] Error en ${path}:`, err);
    return { data: null, error: 'Sin conexion con el servidor. Verifica que el backend este corriendo.' };
  }
}

// ──────────────────────────────────────────────────────
// ENDPOINTS
// ──────────────────────────────────────────────────────

/** Obtiene el perfil completo del usuario autenticado. */
export async function getProfile() {
  return request('/Users/me');
}

/** Obtiene el dashboard academico del usuario. */
export async function getDashboard() {
  return request('/Users/dashboard');
}

/** Actualiza el perfil del usuario. */
export async function updateProfile(data) {
  return request('/Users/me', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/** Obtiene el leaderboard. */
export async function getLeaderboard(top = 20) {
  return request(`/Users/leaderboard?top=${top}`);
}

/** Obtiene el progreso de mundos del usuario. */
export async function getProgress() {
  return request('/Progress');
}

/** Obtiene las misiones activas del usuario. */
export async function getMissions() {
  return request('/Missions');
}

/** Marca una mision como completada. */
export async function completeMission(missionId) {
  return request(`/Missions/${missionId}/complete`, { method: 'POST' });
}

/** Obtiene los logros del usuario. */
export async function getAchievements() {
  return request('/Achievements');
}

/** Obtiene las analiticas personales del usuario. */
export async function getAnalytics() {
  return request('/Analytics/me');
}

/** Registra un nuevo usuario en el backend. */
export async function registerUser(name, email, password) {
  return request('/Auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
}

/** Cierra sesion en el backend (revoca refresh tokens). */
export async function logoutBackend() {
  return request('/Auth/logout', { method: 'POST' });
}

/** Envía una solicitud para recuperar la contraseña de un usuario. */
export async function forgotPassword(email) {
  return request('/Auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

// Exportar el base URL por si alguna pagina lo necesita
export { BASE_URL };
