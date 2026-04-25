/*import { getFirestore, setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { app } from "./firebaseConfig.js";

const db = getFirestore();
const auth = getAuth(app);

let ageInp = document.getElementById('age-input');
let nameInp = document.getElementById('name-input');
let emailInp = document.getElementById('email-input');
let passwordInp = document.getElementById('password-input');
let mainForm = document.getElementById('main-form');

let ageErrorMessage = document.getElementById('age-error-message');
let nameErrorMessage = document.getElementById('name-error-message');
let emailErrorMessage = document.getElementById('email-error-message');
let passwordErrorMessage = document.getElementById('password-error-message');

let RegisterUser = async (event) => {
    event.preventDefault();

    if (!validate(event)) {
        return;
    }

    try {
        const credentials = await createUserWithEmailAndPassword(auth, emailInp.value, passwordInp.value);

        console.log("Account created successfully");

        const currentDate = new Date();

        const userDocRef = doc(db, 'UsersAuthList', credentials.user.uid);
        console.log(credentials.user);

        await setDoc(userDocRef, {
            userId: credentials.user.uid,
            age: ageInp.value,
            name: nameInp.value,
            email: emailInp.value,
            gems: 500,
            xp: 0,
            hearts: 5,
            creationDate: currentDate,
            learnLang: localStorage.getItem('selectedLang'),
            sectionNumber: 1,
            completedUnits: 0,
            completedChapters: 0,
            currentLesson: 1,
            profileImage: "../assets/svg/profile-image-temp.svg"
        });

        const dbref = doc(db, 'UsersAuthList', credentials.user.uid);

        getDoc(dbref).then((docSnapshot) => {
            if (docSnapshot.exists()) {
                const userData = docSnapshot.data();

                sessionStorage.setItem("user-info", JSON.stringify(userData));

                console.log("User Data: ", userData);
                // sessionStorage.setItem("user-creds", JSON.stringify(credentials.user));
                window.location.href = "./learn.html";
            }
        });

    } catch (error) {

        document.getElementById('create-account-span').classList.toggle('hidden');
        document.getElementById('loading-balls-container').classList.toggle('hidden');

        switch (error.code) {
            case "auth/email-already-in-use":
                emailErrorMessage.innerHTML = '<img src="../assets/svg/error-message-icon.svg" alt=""> <span>Email Already In Use.</span>';
                emailInp.style.border = '2px solid #ff0000'; // Change border color to red
                break;
            case "auth/invalid-email":
                emailErrorMessage.innerHTML = '<img src="../assets/svg/error-message-icon.svg" alt=""> <span>Invalid Email Id</span>';
                emailInp.style.border = '2px solid #ff0000'; // Change border color to red
                break;
            case "auth/weak-password":
                passwordErrorMessage.innerHTML = '<img src="../assets/svg/error-message-icon.svg" alt=""> <span>Weak Password</span>';
                passwordInp.style.border = '2px solid #ff0000'; // Change border color to red

        }

        // alert(error.message);
        console.log(error.code);
        console.log(error.message);
    }
};

const validate = (event) => {
    event.preventDefault()

    let isValid = true;

    ageErrorMessage.textContent = '';
    nameErrorMessage.textContent = '';
    emailErrorMessage.textContent = '';
    passwordErrorMessage.textContent = '';

    if (!ageInp.value) {
        ageErrorMessage.innerHTML = '<img src="../assets/svg/error-message-icon.svg" alt=""> <span>Please enter your age.</span>';
        ageInp.style.border = '2px solid #ff0000'; // Change border color to red
        document.getElementById('age-privacy-div').innerHTML = '';
        isValid = false;
    }
    else {
        ageErrorMessage.innerHTML = '';
        ageInp.style.border = ''; // Reset to the default border color
    }

    if (!nameInp.value) {
        console.log("Entering Name if Block"); // Add this line
        nameErrorMessage.innerHTML = '<img src="../assets/svg/error-message-icon.svg" alt=""> <span>Please enter your Name.</span>';
        nameInp.style.border = '2px solid #ff0000'; // Change border color to red  
        isValid = false;
    }
    else {
        console.log("Name Input is not empty"); // Add this line
        nameErrorMessage.innerHTML = '';
        nameInp.style.border = ''; // Reset to the default border color
    }

    if (!emailInp.value) {
        emailErrorMessage.innerHTML = '<img src="../assets/svg/error-message-icon.svg" alt=""> <span>Please enter your Email.</span>';
        emailInp.style.border = '2px solid #ff0000'; // Change border color to red
        isValid = false;
    }
    else {
        emailErrorMessage.innerHTML = '';
        emailInp.style.border = ''; // Reset to the default border color
    }

    if (!passwordInp.value) {
        passwordErrorMessage.innerHTML = '<img src="../assets/svg/error-message-icon.svg" alt=""> <span>Please enter your Password.</span>';
        passwordInp.style.border = '2px solid #ff0000'; // Change border color to red
        isValid = false;
    }
    else {
        passwordErrorMessage.innerHTML = '';
        passwordInp.style.border = ''; // Reset to the default border color
    }

    return isValid;
}

mainForm.addEventListener('submit', RegisterUser);


*/


// js/firebaseSignup.js
import { auth, db } from './firebaseConfig.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

// Función para registrar usuario
async function signUpUser(email, password, name) {
    try {
        // Crear usuario en Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Obtener el token JWT seguro de Firebase
        const token = await user.getIdToken();

        // Llamar a nuestro Backend para registrar al usuario en Firestore (Arquitectura Limpia)
        const response = await fetch("http://localhost:5000/api/Users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ name: name })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error del servidor al registrar: ${errorText}`);
        }
        
        return { success: true, user };
    } catch (error) {
        console.error("Error en registro:", error);
        return { success: false, error: error.message };
    }
}

// Manejar el formulario de registro
document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('main-form');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name-input')?.value;
            const email = document.getElementById('email-input')?.value;
            const password = document.getElementById('password-input')?.value;
            
            const result = await signUpUser(email, password, name);
            
            if (result.success) {
                // Guardar datos en localStorage
                localStorage.setItem('mathgo_user', JSON.stringify({
                    uid: result.user.uid,
                    name: name,
                    email: email,
                    level: 'beginner'
                }));
                // Redirigir a la página de aprendizaje
                window.location.href = '../html/learn.html';
            } else {
                alert('Error al registrarse: ' + result.error);
            }
        });
    }
});

export { signUpUser };