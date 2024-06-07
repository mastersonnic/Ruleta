document.addEventListener('DOMContentLoaded', () => {
    const roulette = document.getElementById('roulette');
    const spinButton = document.getElementById('spinButton');
    const confettiCanvas = document.getElementById('confetti-canvas');
    const confetti = window.confetti.create(confettiCanvas, { resize: true });
    let isSpinning = false;

    spinButton.addEventListener('click', () => {
        if (!isSpinning) {
            isSpinning = true;
            let previousAngle = parseInt(roulette.style.transform.replace(/[^0-9]/g, '')) || 0;
            let newAngle = previousAngle + Math.floor(360 + Math.random() * 360);
            roulette.style.transition = 'transform 4s ease-out';
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
            }, 4000);
        }
    });
});
