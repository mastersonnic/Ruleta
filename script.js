document.addEventListener('DOMContentLoaded', () => {
    const roulette = document.getElementById('roulette');
    const spinButton = document.getElementById('spinButton');
    const confettiCanvas = document.getElementById('confetti-canvas');
    const confetti = window.confetti.create(confettiCanvas, { resize: true });
    let isSpinning = false;

    spinButton.addEventListener('click', () => {
        if (!isSpinning) {
            isSpinning = true;
            // Calcula un ángulo aleatorio entre 360 y 720 grados para la rotación
            let newAngle = Math.floor(360 + Math.random() * 360);
            // Establece una duración de transición aleatoria entre 3 y 4 segundos
            let duration = Math.floor(Math.random() * 1000) + 3000;
            roulette.style.transition = `transform ${duration}ms ease-out`;
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
            }, duration);
        }
    });
});
