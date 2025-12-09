// --- FUNCIONALIDAD DEL BOTÓN ---
const actionBtn = document.getElementById('actionBtn');
const btnText = actionBtn.querySelector('span');

actionBtn.addEventListener('click', () => {
    // Guardar estado original
    const originalText = btnText.innerText;
    
    // Cambiar a estado de carga
    btnText.innerText = "Inicializando...";
    actionBtn.classList.add('loading-state');
    
    // Simular proceso
    setTimeout(() => {
        btnText.innerText = "¡Completado! 🚀";
        actionBtn.style.background = "linear-gradient(90deg, #10b981, #059669)"; // Verde éxito
        
        // Volver al estado original después de 2 segundos
        setTimeout(() => {
            btnText.innerText = originalText;
            actionBtn.classList.remove('loading-state');
            actionBtn.style.background = ""; // Resetea al gradiente CSS original
        }, 2000);
    }, 1500);
});

// --- EFECTO TILT 3D (INCLINACIÓN) ---
const cards = document.querySelectorAll('.tilt-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // Posición X del mouse dentro de la carta
        const y = e.clientY - rect.top;  // Posición Y del mouse dentro de la carta
        
        // Calcular rotación (mientras más lejos del centro, más rota)
        const xCenter = rect.width / 2;
        const yCenter = rect.height / 2;
        
        const rotateX = ((y - yCenter) / yCenter) * -10; // Invertir eje Y para efecto natural
        const rotateY = ((x - xCenter) / xCenter) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    // Resetear posición al salir el mouse
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});