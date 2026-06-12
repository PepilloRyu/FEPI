// ==================== MATHGO FAQ - ÁLGEBRA ====================
// Sistema de FAQs homologado y sin emojis

const faqData = [
    {
        category: "Aprendizaje de Álgebra",
        icon: "fa-solid fa-graduation-cap",
        questions: [
            { question: "¿Qué temas de álgebra ofrece MathGo?", answer: "Fundamentos de Álgebra, Ecuaciones Lineales, Sistemas de Ecuaciones, Polinomios, Factorización, Ecuaciones Cuadráticas y Funciones." },
            { question: "¿Cómo empiezo a aprender álgebra?", answer: "Regístrate y comienza con los fundamentos. Las lecciones están pensadas para principiantes y avanzan de manera progresiva." },
            { question: "¿Necesito conocimientos previos?", answer: "No, MathGo está diseñado para todos los niveles. Comenzamos desde la aritmética básica hasta llegar a conceptos algebraicos complejos." }
        ]
    },
    {
        category: "Sistema de Puntos y Progreso",
        icon: "fa-solid fa-star",
        questions: [
            { question: "¿Cómo gano XP?", answer: "Completando lecciones en los distintos mundos, respondiendo correctamente los ejercicios de los cuestionarios y manteniendo tu racha de días activos." },
            { question: "¿Para qué sirven las gemas?", answer: "Las gemas representan tu dedicación y te permiten medir tu avance en la resolución de problemas en la plataforma." },
            { question: "¿Qué es la racha (streak)?", answer: "La racha cuenta los días consecutivos que has practicado en MathGo. Debes completar al menos una lección al día para mantenerla activa." }
        ]
    },
    {
        category: "Ligas y Competencias",
        icon: "fa-solid fa-trophy",
        questions: [
            { question: "¿Qué son las ligas?", answer: "Es una tabla de clasificación donde compites con otros estudiantes. Subes o bajas de liga al final de cada semana según los puntos de XP que consigas." },
            { question: "¿Cuáles son las ligas disponibles?", answer: "Actualmente compites en ligas basadas en tu nivel de experiencia: Bronce, Plata, Oro, Diamante y Maestro." },
            { question: "¿Cómo se calcula mi posición en la liga?", answer: "Se obtiene directamente del XP total acumulado durante la semana. Los mejores posicionados ascienden al siguiente nivel de liga." }
        ]
    },
    {
        category: "Cuenta y Configuración",
        icon: "fa-solid fa-user-gear",
        questions: [
            { question: "¿Puedo usar MathGo en mi teléfono?", answer: "¡Sí! MathGo es totalmente adaptativo (responsivo) y funciona de manera óptima en computadoras, tabletas y teléfonos inteligentes." },
            { question: "¿Cómo cambio mi contraseña?", answer: "En la pantalla de inicio de sesión, puedes solicitar un enlace de restablecimiento de contraseña seleccionando '¿Olvidaste tu contraseña?'." }
        ]
    }
];

function expandToAnswers(event) {
    const item = event.currentTarget.closest('.faq-item');
    if (!item) return;

    const answer = item.querySelector('.faq-answer');
    const isActive = item.classList.contains('active');

    // Cerrar todas las preguntas abiertas de este grupo para un acordeón limpio
    const parentGroup = item.closest('.faq-category-card');
    parentGroup.querySelectorAll('.faq-item').forEach(el => {
        el.classList.remove('active');
        const ans = el.querySelector('.faq-answer');
        if (ans) ans.style.maxHeight = null;
    });

    if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + "px";
    }
}

function loadFAQ() {
    const container = document.getElementById('faq-content-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    faqData.forEach(cat => {
        const categoryCard = document.createElement('div');
        categoryCard.className = 'mg-card faq-category-card';

        const title = document.createElement('h2');
        title.className = 'faq-category-title';
        title.innerHTML = `<i class="${cat.icon}"></i> ${cat.category}`;
        categoryCard.appendChild(title);

        cat.questions.forEach(q => {
            const item = document.createElement('div');
            item.className = 'faq-item';
            
            const btn = document.createElement('button');
            btn.className = 'faq-question-btn';
            btn.innerHTML = `<span>${q.question}</span><i class="fa-solid fa-chevron-down"></i>`;
            btn.addEventListener('click', expandToAnswers);
            item.appendChild(btn);

            const ans = document.createElement('div');
            ans.className = 'faq-answer';
            ans.innerHTML = `<div class="faq-answer-inner">${q.answer}</div>`;
            item.appendChild(ans);

            categoryCard.appendChild(item);
        });

        container.appendChild(categoryCard);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadFAQ);
} else {
    loadFAQ();
}