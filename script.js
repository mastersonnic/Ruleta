document.addEventListener('DOMContentLoaded', (event) => {
    const canvas = document.getElementById('ruleta');
    const ctx = canvas.getContext('2d');
    const btnGirar = document.getElementById('girar');
    const radio = canvas.width / 2;
    let anguloActual = 0;
    const segmentos = [
        { color: '#DAA520', label: '0X' }, // Dorado
        { color: '#C0C0C0', label: '0.02X' }, // Plateado
        { color: '#B87333', label: '0.05X' }, // Cobre
        { color: '#808080', label: '1X' }, // Gris
        { color: '#FFD700', label: '2X' }, // Oro
        { color: '#4B0082', label: '4X' }, // Indigo
        { color: '#8A2BE2', label: '6X' }  // Azul violeta
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
        ctx.fillStyle = 'black';
        ctx.font = 'bold 30px Arial'; // Tamaño de letra aumentado
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

        // Omitir el dibujo del círculo central
    }

    function girarRuleta() {
        let velocidad = 0.2; // Velocidad inicial de giro
        const desaceleracion = 0.99; // Factor de desaceleración

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
                const segmentoGanador = segmentos[Math.floor((anguloActual % (Math.PI * 2)) / (Math.PI * 2 / segmentos.length))];
                console.log('El segmento ganador es:', segmentoGanador.label);
            }
        }

        animarGiro();
    }

    btnGirar.addEventListener('click', girarRuleta);
    dibujarRuleta();
});
