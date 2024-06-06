document.addEventListener('DOMContentLoaded', () => {
    const roulette = document.getElementById('roulette');
    const spinButton = document.getElementById('spinButton');
    const confettiCanvas = document.getElementById('confetti-canvas');
    const confetti = window.confetti.create(confettiCanvas, { resize: true });

    spinButton.addEventListener('click', () => {
        let newAngle = Math.floor(3600 + Math.random() * 360);
        roulette.style.transition = 'transform 4s ease-out';
        roulette.style.transform = `translate(-50%, -50%) rotate(${newAngle}deg)`;

        setTimeout(() => {
            confettiCanvas.style.display = 'block';
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }, 4000); // Se activa el confeti después de que la ruleta termine de girar
    });
});
