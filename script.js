document.addEventListener('DOMContentLoaded', (event) => {
    const canvas = document.getElementById('ruleta');
    const ctx = canvas.getContext('2d');
    const btnGirar = document.getElementById('girar');
    const radio = canvas.width / 2;
    let anguloActual = 0;
    const segmentos = [
        { color: '#FF0000', label: 'Premio 1' },
        { color: '#00FF00', label: 'Premio 2' },
        { color: '#0000FF', label: 'Premio 3' },
        { color: '#FFFF00', label: 'Premio 4' }
    ];

    function dibujarSegmento(segmento, inicioAngulo, finAngulo) {
        ctx.beginPath();
        ctx.fillStyle = segmento.color;
        ctx.moveTo(radio, radio);
        ctx.arc(radio, radio, radio, inicioAngulo, finAngulo);
        ctx.lineTo(radio, radio);
        ctx.stroke();
        ctx.fill();

        // Dibujar el texto
        ctx.save();
        ctx.translate(radio, radio);
        ctx.rotate((inicioAngulo + finAngulo) / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 20px Arial';
        ctx.fillText(segmento.label, radio - 10, 10);
        ctx.restore();
    }

    function dibujarRuleta() {
        const anguloPorSegmento = Math.PI * 2 / segmentos.length;
        let inicioAngulo = 0;

        segmentos.forEach(segmento => {
            const finAngulo = inicioAngulo + anguloPorSegmento;
            dibujarSegmento(segmento, inicioAngulo, finAngulo);
            inicioAngulo = finAngulo;
        });

        // Dibujar el círculo del centro
        ctx.beginPath();
        ctx.arc(radio, radio, 20, 0, Math.PI * 2);
        ctx.fillStyle = 'black';
        ctx.fill();
    }

    // Nueva función girarRuleta con regulador de velocidad y desaceleración
    function girarRuleta() {
        let velocidad = 0.2; // Velocidad inicial de giro
        const desaceleracion = 0.99; // Factor de desaceleración (debe ser menor que 1)

        function animarGiro() {
            anguloActual += velocidad;
            velocidad *= desaceleracion; // Reducir la velocidad gradualmente

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.translate(radio, radio);
            ctx.rotate(anguloActual);
            ctx.translate(-radio, -radio);
            dibujarRuleta();

            // Continuar girando si la velocidad es suficiente
            if (velocidad > 0.001) {
                requestAnimationFrame(animarGiro);
            } else {
                // La ruleta se ha detenido, determinar el segmento ganador
                const segmentoGanador = segmentos[Math.floor(anguloActual / (Math.PI * 2) * segmentos.length) % segmentos.length];
                console.log('El segmento ganador es:', segmentoGanador.label);
            }
        }

        animarGiro();
    }

    btnGirar.addEventListener('click', girarRuleta);
    dibujarRuleta();
});
