/*
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { app } from "./firebaseConfig.js";

const auth = getAuth(app);
const logoutButton = document.getElementById('logout-button');
const logoutButtonMobile = document.getElementById('logout-button-mobile');

const logoutUser = async () => {
    try {
        await signOut(auth);
        window.location.href = "../index.html";
        sessionStorage.clear();
    } catch (error) {
        console.error('Error signing out:', error.message);
    }
};

if (logoutButton || logoutButtonMobile) {
    logoutButton.addEventListener('click', logoutUser);
    logoutButtonMobile.addEventListener('click', logoutUser);
}
*/

// js/firebaseLogout.js
import { auth } from './firebaseConfig.js';
import { signOut } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

async function logoutUser() {
    try {
        await signOut(auth);
        localStorage.removeItem('mathgo_user');
        return { success: true };
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
        return { success: false, error: error.message };
    }
}

// Función para botón de logout
window.logoutButtonAnimation = async function() {
    const result = await logoutUser();
    if (result.success) {
        window.location.href = '../index.html';
    } else {
        alert('Error al cerrar sesión: ' + result.error);
    }
};

export { logoutUser };