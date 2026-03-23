import { db } from './firebaseConfig.js';
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

const setupMathGoDatabase = async () => {
    try {
        console.log("Iniciando carga de base de datos...");
        
        // Creamos el documento principal del curso de Álgebra
        const algebraRef = doc(db, "courses", "algebra");
        await setDoc(algebraRef, {
            section: {
                totalChaptersInUnit: 2,
                totalUnitsInSection: 3,
                units: [
                    {
                        name: "Unidad 1",
                        description: "Conceptos Básicos de Álgebra",
                        chapters: ["Intro al Álgebra", "Variables y Expresiones"]
                    },
                    {
                        name: "Unidad 2",
                        description: "Ecuaciones Lineales",
                        chapters: ["Ecuaciones de 1 Paso", "Ecuaciones de 2 Pasos"]
                    },
                    {
                        name: "Unidad 3",
                        description: "Ecuaciones Cuadráticas",
                        chapters: ["Factorización", "Fórmula General"]
                    }
                ]
            }
        });
        
        console.log("¡Base de datos inicializada correctamente!");
        alert("¡Base de datos inicializada correctamente con el curso de Álgebra! Ya puedes ir a aprender.");
        
    } catch (e) {
        console.error("Error al escribir el documento: ", e);
        alert("Error: " + e.message);
    }
};

setupMathGoDatabase();
