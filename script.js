document.addEventListener('DOMContentLoaded', () => {
    const roulette = document.getElementById('roulette');
    const spinButton = document.getElementById('spinButton');
    const confettiCanvas = document.getElementById('confetti-canvas');
    const confetti = window.confetti.create(confettiCanvas, { resize: true });
    let isSpinning = false;
    let lastAngle = 0; // Almacena el último ángulo para asegurar que siempre gire hacia la derecha

    spinButton.addEventListener('click', () => {
        if (!isSpinning) {
            isSpinning = true;
            // Calcula un ángulo aleatorio entre 1980 y 3600 grados para la rotación
            let newAngle = lastAngle + Math.floor(1980 + Math.random() * 1620);
            lastAngle = newAngle; // Actualiza el último ángulo
            // Establece una duración de transición total entre 8 y 12 segundos
            let totalDuration = Math.floor(Math.random() * 3000) + 8000;
            // Establece una duración de desaceleración entre 3 y 4 segundos
            let decelerationDuration = Math.floor(Math.random() * 1000) + 3000;
            // Establece la duración de giro constante antes de desacelerar
            let spinDuration = totalDuration - decelerationDuration;
            roulette.style.transition = `transform ${spinDuration}ms linear, transform ${decelerationDuration}ms ease-out`;
            // Gira la ruleta al nuevo ángulo
            roulette.style.transform = `translate(-50%, -50%) rotate(${newAngle}deg)`;

            setTimeout(() => {
                confettiCanvas.style.display = 'block';
                confetti({
                    particleCount: 200,
                    spread: 120,
                    origin: { y: 0.6 }
                });
                setTimeout(() => {
                    confettiCanvas.style.display = 'none';
                }, 2000);
                isSpinning = false;
            }, totalDuration);
        }
    });
});
