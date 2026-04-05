// ==================== MATHGO FAQ - ÁLGEBRA ====================
// NO hay rastro de Duolingo

window.expandToAnswers = function(event) {
    const target = event.currentTarget;
    const answer = target.querySelector('.answer');
    const img = target.querySelector('img');
    
    if (answer) answer.classList.toggle('hidden');
    if (img) img.classList.toggle('rotate');
    target.classList.toggle('bold');
};

const faqData = {
    "📚 Aprendizaje de Álgebra": [
        { question: "¿Qué temas de álgebra ofrece MathGo?", answer: "Fundamentos de Álgebra, Ecuaciones Lineales, Sistemas de Ecuaciones, Polinomios, Factorización, Ecuaciones Cuadráticas y Funciones." },
        { question: "¿Cómo empiezo a aprender álgebra?", answer: "Regístrate y comienza con los fundamentos. Las lecciones son para principiantes y avanzan gradualmente." },
        { question: "¿Necesito conocimientos previos?", answer: "No, MathGo está diseñado para todos los niveles. Comenzamos desde lo más básico hasta temas avanzados." }
    ],
    "⭐ Sistema de Puntos y Progreso": [
        { question: "¿Cómo gano XP?", answer: "Completando lecciones, manteniendo tu racha diaria, respondiendo correctamente los ejercicios y participando en desafíos." },
        { question: "¿Para qué sirven las gemas?", answer: "Para comprar boosts de XP (doble experiencia), lecciones especiales, protectores de racha y temas personalizados." },
        { question: "¿Qué es la racha (streak)?", answer: "La racha cuenta los días consecutivos que practicas. Debes completar al menos una lección por día para mantenerla. Cada día suma y desbloqueas recompensas." }
    ],
    "🏆 Ligas y Competencias": [
        { question: "¿Qué son las ligas?", answer: "Sistema de clasificación para competir con otros estudiantes. Subes de liga ganando XP semanalmente." },
        { question: "¿Cuáles son las ligas disponibles?", answer: "Bronce, Plata, Oro, Zafiro, Rubí, Esmeralda y Diamante. Cada semana los mejores ascienden." },
        { question: "¿Qué beneficios tienen las ligas altas?", answer: "Más recompensas de XP, gemas adicionales, insignias exclusivas y reconocimiento en la tabla de líderes." }
    ],
    "📱 Cuenta y Configuración": [
        { question: "¿Puedo usar MathGo en mi teléfono?", answer: "¡Sí! MathGo es completamente responsivo y funciona perfectamente en computadoras, tablets y teléfonos móviles." },
        { question: "¿Cómo cambio mi contraseña?", answer: "Ve a tu perfil > Configuración > Cambiar contraseña. Recibirás un correo para restablecerla de forma segura." },
        { question: "¿Puedo eliminar mi cuenta?", answer: "Sí, desde Configuración > Eliminar cuenta. Ten en cuenta que esta acción es irreversible y perderás todo tu progreso." }
    ]
};

function loadFAQ() {
    const container = document.querySelector('.faq-container');
    if (!container) return;
    
    // Limpiar completamente cualquier contenido previo (importante)
    container.innerHTML = '';
    
    // Títulos
    const title = document.createElement('div');
    title.className = 'faq-heading';
    title.innerHTML = '❓ Preguntas Frecuentes';
    container.appendChild(title);
    
    const subtitle = document.createElement('div');
    subtitle.className = 'faq-subheading';
    subtitle.innerHTML = 'Todo lo que necesitas saber sobre MathGo y álgebra';
    container.appendChild(subtitle);
    
    // Generar categorías y preguntas
    for (const [category, questions] of Object.entries(faqData)) {
        const group = document.createElement('div');
        group.className = 'faq-group';
        
        const categoryHeader = document.createElement('div');
        categoryHeader.className = 'item heading';
        categoryHeader.innerHTML = `<div class="flex">${category}</div>`;
        group.appendChild(categoryHeader);
        
        for (const q of questions) {
            const item = document.createElement('div');
            item.className = 'item';
            item.setAttribute('onclick', 'expandToAnswers(event)');
            item.innerHTML = `
                <div class="flex">
                    ${q.question}
                    <img src="../assets/svg/down-arrow-faq.svg" alt="arrow" />
                </div>
                <div class="answer hidden">${q.answer}</div>
            `;
            group.appendChild(item);
        }
        container.appendChild(group);
    }
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', loadFAQ);