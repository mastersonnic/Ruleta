document.addEventListener('DOMContentLoaded', (event) => {
    const canvas = document.getElementById('ruleta');
    const ctx = canvas.getContext('2d');
    const btnGirar = document.getElementById('girar');
    const radio = canvas.width / 2;
    let anguloActual = 0;
    let velocidad = Math.PI * 2 / 150; // Velocidad constante para completar un giro en 2 segundos
    const desaceleracion = 0.99; // Factor de desaceleración
    const duracionTotalGiro = 5000; // Duración total del giro en milisegundos
    const duracionDesaceleracion = 3000; // Duración de la desaceleración en milisegundos
    const tiempoInicioGiro = Date.now();
    const segmentos = [
        { color: '#FF0000', label: '1x' },
        { color: '#00FF00', label: '0.5x' },
        { color: '#0000FF', label: '0X' },
        { color: '#FFFF00', label: '3x' },
        { color: '#FF00FF', label: '2x' },
        { color: '#00FFFF', label: '5x' }
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

    function girarRuleta() {
        const tiempoTranscurrido = Date.now() - tiempoInicioGiro;
        if (tiempoTranscurrido < duracionTotalGiro) {
            if (tiempoTranscurrido > duracionTotalGiro - duracionDesaceleracion) {
                velocidad *= desaceleracion; // Comenzar a desacelerar
            }
            anguloActual += velocidad;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.translate(radio, radio);
            ctx.rotate(anguloActual);
            ctx.translate(-radio, -radio);
            dibujarRuleta();
            requestAnimationFrame(girarRuleta);
        } else {
            // Determinar el segmento ganador
            const segmentoGanador = segmentos[Math.floor((anguloActual / (Math.PI * 2)) * segmentos.length) % segmentos.length];
            console.log('El segmento ganador es:', segmentoGanador.label);
        }
    }

    btnGirar.addEventListener('click', girarRuleta);
    dibujarRuleta();
});
