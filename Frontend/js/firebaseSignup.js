/**
 * firebaseSignup.js - DEPRECATED
 * La logica de registro fue migrada a:
 *   - Frontend/js/services/api.js  (registerUser)
 *   - Frontend/html/signup.html    (UI y formulario)
 *
 * Este archivo se mantiene temporalmente para no romper
 * posibles referencias existentes. No contiene logica activa.
 */

// Re-exportar desde el servicio centralizado para compatibilidad
export { registerUser as signUpUser } from './services/api.js';