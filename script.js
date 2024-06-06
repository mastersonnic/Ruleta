// script.js
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('ruleta');
    const ctx = canvas.getContext('2d');
    const btnGirar = document.getElementById('girar');
    let angulo = 0;
    let raf;

    // Dibuja la ruleta
    function dibujarRuleta() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;

        // Dibuja los segmentos de la ruleta
        const segmentos = ['Rojo', 'Verde', 'Azul', 'Amarillo', 'Morado', 'Naranja'];
        const segmentoAngulo = 2 * Math.PI / segmentos.length;
        for (let i = 0; i < segmentos.length; i++) {
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2, canvas.height / 2);
            ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, segmentoAngulo * i, segmentoAngulo * (i + 1), false);
            ctx.closePath();
            ctx.fillStyle = segmentos[i];
            ctx.fill();
            ctx.stroke();
        }

        // Dibuja el puntero
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2 - 10, 30);
        ctx.lineTo(canvas.width / 2 + 10, 30);
        ctx.fill();

        // Rota la ruleta
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(angulo);
        ctx.translate(-canvas.width / 2, -canvas.height / 2);
    }

    // Anima la ruleta
    function animarRuleta() {
        angulo += 0.1; // Velocidad de rotación
        dibujarRuleta();
        raf = requestAnimationFrame(animarRuleta);
    }

    // Evento para el botón Girar
    btnGirar.addEventListener('click', () => {
        if (!raf) {
            animarRuleta();
        } else {
            cancelAnimationFrame(raf);
            raf = null;
        }
    });

    // Inicializa la ruleta
    dibujarRuleta();
});
