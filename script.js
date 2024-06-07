document.addEventListener('DOMContentLoaded', () => {
    const roulette = document.getElementById('roulette');
    const spinButton = document.getElementById('spinButton');
    let isSpinning = false;
    let lastAngle = 0; // Almacena el último ángulo para asegurar que siempre gire hacia la derecha

    spinButton.addEventListener('click', () => {
        if (!isSpinning) {
            isSpinning = true;
            // Calcula un ángulo aleatorio entre 1800 y 2880 grados para la rotación
            let newAngle = lastAngle + 1800 + Math.floor(Math.random() * 1080);
            lastAngle = newAngle; // Actualiza el último ángulo
            // Establece una duración de giro total entre 5 y 8 segundos
            let spinDuration = Math.floor(Math.random() * 3000) + 5000;
            // Establece una duración de desaceleración entre 3 y 4 segundos
            let decelerationDuration = Math.floor(Math.random() * 1000) + 3000;
            roulette.style.transition = `transform ${spinDuration + decelerationDuration}ms ease-out`;
            // Gira la ruleta al nuevo ángulo
            roulette.style.transform = `rotate(${newAngle}deg)`;

            setTimeout(() => {
                isSpinning = false;
            }, spinDuration + decelerationDuration);
        }
    });
});
