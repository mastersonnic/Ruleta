document.addEventListener('DOMContentLoaded', (event) => {
    const canvas = document.getElementById('ruleta');
    const ctx = canvas.getContext('2d');
    const btnGirar = document.getElementById('girar');
    const radio = canvas.width / 2;
    let anguloActual = Math.random() * Math.PI * 2; // Posición inicial aleatoria
    let velocidad = Math.PI * 2 / 75; // Velocidad para completar un giro en 5 segundos
    const desaceleracionInicial = 0.95; // Desaceleración más obvia
    let desaceleracion = desaceleracionInicial;
    const duracionGiroMin = 5000; // Duración mínima del giro en milisegundos
    const duracionGiroMax = 10000; // Duración máxima del giro en milisegundos
    let duracionGiro = Math.random() * (duracionGiroMax - duracionGiroMin) + duracionGiroMin; // Duración aleatoria del giro
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

        // Dibujar el texto más grande
        ctx.save();
        ctx.translate(radio, radio);
        ctx.rotate((inicioAngulo + finAngulo) / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 30px Arial'; // Tamaño de fuente aumentado
        ctx.fillText(segmento.label, radio - 10, 10);
        ctx.restore();
    }

    function dibujarCentroCentelleante() {
        ctx.beginPath();
        ctx.arc(radio, radio, 20, 0, Math.PI * 2);
        ctx.fillStyle = 'gold';
        ctx.fill();
        ctx.font = 'bold 25px Arial';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.fillText('$', radio, radio + 10);
    }

    function dibujarRuleta() {
        const anguloPorSegmento = Math.PI * 2 / segmentos.length;
        let inicioAngulo = anguloActual;

        segmentos.forEach(segmento => {
            const finAngulo = inicioAngulo + anguloPorSegmento;
            dibujarSegmento(segmento, inicioAngulo, finAngulo);
            inicioAngulo = finAngulo;
        });

        dibujarCentroCentelleante();
    }

    function girarRuleta() {
        const tiempoTranscurrido = Date.now() - tiempoInicioGiro;
        if (tiempoTranscurrido < duracionGiro) {
            if (tiempoTranscurrido > duracionGiro - 3000) { // Comenzar a desacelerar en los últimos 3 segundos
                desaceleracion = desaceleracionInicial - ((tiempoTranscurrido - (duracionGiro - 3000)) / 3000) * (desaceleracionInicial - 0.5);
                velocidad *= desaceleracion;
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
