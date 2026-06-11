/*
import {getFirestore, doc, getDoc} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {getAuth, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { app } from "./firebaseConfig.js";

const db = getFirestore(app);
const auth = getAuth(app);

let emailInput = document.getElementById("email-input");
let passwordInput = document.getElementById("password-input");
let mainForm = document.getElementById("main-form");

let emailErrorMessage = document.getElementById('email-error-message');
let passwordErrorMessage = document.getElementById('password-error-message');

let signInUser = (event) => {
  event.preventDefault();

  if(!validateEntry(event))
  {
    return;
  }

  signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value).then((credentials) => {
      const dbref = doc(db, "UsersAuthList", credentials.user.uid);

      getDoc(dbref).then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          sessionStorage.setItem("user-info", JSON.stringify(userData));
          
          window.location.href = "./learn.html";
        }
      });
    })
    .catch((error) => {
      document.getElementById('login-span').classList.toggle('hidden');
      document.getElementById('loading-balls-container').classList.toggle('hidden');

      switch (error.code) {
        case "wrong-password":
          passwordErrorMessage.innerHTML =
            '<img src="../assets/svg/error-message-icon.svg" alt=""> <span>Wrong Password.</span>';
          passwordInput.style.border = "2px solid #ff0000";
          break;
        case "user-not-found":
          emailErrorMessage.innerHTML =
            '<img src="../assets/svg/error-message-icon.svg" alt=""> <span>User Not Found.</span>';
          emailInput.style.border = "2px solid #ff0000";
          break;
        case "auth/invalid-email":
          emailErrorMessage.innerHTML =
            '<img src="../assets/svg/error-message-icon.svg" alt=""> <span>Invalid Email</span>';
          emailInput.style.border = "2px solid #ff0000";
          break;
        case "auth/invalid-credential":
          emailErrorMessage.innerHTML =
            '<img src="../assets/svg/error-message-icon.svg" alt=""> <span>Invalid Credentials</span>';
          passwordErrorMessage.innerHTML =
            '<img src="../assets/svg/error-message-icon.svg" alt=""> <span>Invalid Credentials</span>';
          emailInput.style.border = "2px solid #ff0000";
          passwordInput.style.border = "2px solid #ff0000";
          break;
      }
    });
};

const validateEntry = (event) =>{
    event.preventDefault();

    let isValid = true;
    if (!emailInput.value) {
        emailErrorMessage.innerHTML = '<img src="../assets/svg/error-message-icon.svg" alt=""> <span>Enter an Email</span>';
        emailInput.style.border = '2px solid #ff0000';
        isValid = false;
    }
    else{
        emailErrorMessage.innerHTML = '';
        emailInput.style.border = '';
    }

    if (!passwordInput.value) {
        passwordErrorMessage.innerHTML = '<img src="../assets/svg/error-message-icon.svg" alt=""> <span>Enter a Password.</span>';
        passwordInput.style.border = '2px solid #ff0000';
        isValid = false;
    }
    else{
        passwordErrorMessage.innerHTML = '';
        passwordInput.style.border = '';
    }
    return isValid;
}

mainForm.addEventListener("submit", signInUser);
*/

// js/firebaseLogin.js
import { auth } from './firebaseConfig.js';
import { signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";
import { BASE_URL } from './services/api.js';

// Función para iniciar sesión
async function loginUser(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Obtener el token JWT seguro de Firebase
        const token = await user.getIdToken();
        
        // Obtener datos del perfil desde nuestro Backend
        const response = await fetch(`${BASE_URL}/Users/me`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        
        if (response.ok) {
            const userData = await response.json();
            localStorage.setItem('mathgo_user', JSON.stringify({
                uid: user.uid,
                name: userData.displayName,
                email: userData.email,
                globalScore: userData.globalScore
            }));
        }
        
        return { success: true, user };
    } catch (error) {
        console.error("Error en login:", error);
        return { success: false, error: error.message, code: error.code };
    }
}

// Manejar el formulario de login
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('main-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email-input')?.value;
            const password = document.getElementById('password-input')?.value;
            
            const result = await loginUser(email, password);
            
            if (result.success) {
                window.location.href = '../html/learn.html';
            } else {
                let errorMessage = 'Error al iniciar sesión';
                switch (result.code) {
                    case 'auth/invalid-email':
                        errorMessage = 'El formato del email no es válido';
                        break;
                    case 'auth/user-not-found':
                        errorMessage = 'No existe una cuenta con este email';
                        break;
                    case 'auth/wrong-password':
                        errorMessage = 'Contraseña incorrecta';
                        break;
                    case 'auth/too-many-requests':
                        errorMessage = 'Demasiados intentos. Intenta más tarde';
                        break;
                }
                alert(errorMessage);
            }
        });
    }
    
    // Verificar si el usuario ya está logueado
    onAuthStateChanged(auth, (user) => {
        if (user && window.location.pathname.includes('loginpage.html')) {
            window.location.href = '../html/learn.html';
        }
    });
});

export { loginUser };