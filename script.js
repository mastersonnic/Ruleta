document.addEventListener('DOMContentLoaded', (event) => {
    const canvas = document.getElementById('ruleta');
    const ctx = canvas.getContext('2d');
    const btnGirar = document.getElementById('girar');
    const radio = canvas.width / 2;
    let anguloActual = Math.random() * Math.PI * 2; // Posición inicial aleatoria
    let velocidad = Math.PI * 2 / 150; // Velocidad inicial
    const desaceleracion = 0.95; // Desaceleración más suave
    let tiempoInicioGiro;
    const duracionGiro = 5000 + Math.random() * 5000; // Duración del giro entre 5 y 10 segundos
    let centelleo = true; // Estado inicial del centelleo para el signo de dinero
    const segmentos = [
        { inicioColor: '#FF0000', finColor: '#FF4500', label: '1x' },
        { inicioColor: '#00FF00', finColor: '#32CD32', label: '0.5x' },
        { inicioColor: '#0000FF', finColor: '#1E90FF', label: '0X' },
        { inicioColor: '#FFFF00', finColor: '#FFD700', label: '3x' },
        { inicioColor: '#FF00FF', finColor: '#BA55D3', label: '2x' },
        { inicioColor: '#00FFFF', finColor: '#E0FFFF', label: '5x' }
    ];

    function dibujarSegmento(segmento, inicioAngulo, finAngulo) {
        const gradiente = ctx.createLinearGradient(radio, radio, radio * Math.cos(inicioAngulo), radio * Math.sin(inicioAngulo));
        gradiente.addColorStop(0, segmento.inicioColor);
        gradiente.addColorStop(1, segmento.finColor);

        ctx.beginPath();
        ctx.fillStyle = gradiente;
        ctx.moveTo(radio, radio);
        ctx.arc(radio, radio, radio, inicioAngulo, finAngulo);
        ctx.lineTo(radio, radio);
        ctx.lineWidth = 5; // Bordes más gruesos
        ctx.shadowBlur = 10; // Sombra
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'; // Color de la sombra
        ctx.stroke();
        ctx.fill();

        // Dibujar el texto más grande y grueso
        ctx.save();
        ctx.translate(radio, radio);
        ctx.rotate((inicioAngulo + finAngulo) / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = 'black'; // Letras negras
        ctx.font = 'bold 40px Arial'; // Tamaño y grosor de fuente aumentados
        ctx.fillText(segmento.label, radio - 10, 10);
        ctx.restore();
    }

    function dibujarCentroCentelleante() {
        ctx.font = 'bold 75px Arial'; // Tamaño de fuente aumentado
        ctx.textAlign = 'center';
        ctx.fillStyle = centelleo ? 'gold' : 'transparent'; // Parpadeo
        ctx.fillText('$', radio, radio + 25);
        centelleo = !centelleo; // Cambiar el estado del centelleo
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
        if (!tiempoInicioGiro) {
            tiempoInicioGiro = Date.now();
        }
        const tiempoTranscurrido = Date.now() - tiempoInicioGiro;
        if (tiempoTranscurrido < duracionGiro) {
            velocidad *= desaceleracion; // Desaceleración gradual
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
