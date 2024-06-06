document.addEventListener('DOMContentLoaded', (event) => {
    const canvas = document.getElementById('ruleta');
    const ctx = canvas.getContext('2d');
    const btnGirar = document.getElementById('girar');
    const radio = canvas.width / 2;
    let anguloActual = 0;
    let velocidad = 0;
    let frameId;
    let centelleo = true;
    let ultimoTiempoCentelleo = Date.now();
    const segmentos = [
        { inicioColor: '#FF4500', finColor: '#FF0000', label: '1x' },
        { inicioColor: '#32CD32', finColor: '#00FF00', label: '0.5x' },
        { inicioColor: '#1E90FF', finColor: '#0000FF', label: '0X' },
        { inicioColor: '#FFD700', finColor: '#FFFF00', label: '3x' },
        { inicioColor: '#BA55D3', finColor: '#FF00FF', label: '2x' },
        { inicioColor: '#E0FFFF', finColor: '#00FFFF', label: '5x' }
    ];

    function dibujarSegmento(segmento, inicioAngulo, finAngulo) {
        const gradiente = ctx.createLinearGradient(
            radio * Math.cos(inicioAngulo), radio * Math.sin(inicioAngulo),
            radio * Math.cos(finAngulo), radio * Math.sin(finAngulo)
        );
        gradiente.addColorStop(0, segmento.inicioColor);
        gradiente.addColorStop(1, segmento.finColor);

        ctx.beginPath();
        ctx.fillStyle = gradiente;
        ctx.moveTo(radio, radio);
        ctx.arc(radio, radio, radio, inicioAngulo, finAngulo);
        ctx.closePath();
        ctx.fill();

        ctx.save();
        ctx.translate(radio, radio);
        ctx.rotate((inicioAngulo + finAngulo) / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = 'black';
        ctx.font = 'bold 40px Arial';
        ctx.fillText(segmento.label, radio - 10, 10);
        ctx.restore();
    }

    function dibujarFlecha() {
        ctx.save();
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(radio, 10);
        ctx.lineTo(radio - 10, 30);
        ctx.lineTo(radio + 10, 30);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    function girarRuleta() {
        if (!velocidad) {
            velocidad = Math.PI * 2 / (100 + Math.random() * 100);
            anguloActual = Math.random() * Math.PI * 2;
        }
        if (velocidad > 0.002) {
            velocidad *= 0.99; // Desaceleración
            anguloActual += velocidad;
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            dibujarRuleta();
            ctx.translate(radio, radio);
            ctx.rotate(anguloActual);
            ctx.translate(-radio, -radio);
            frameId = requestAnimationFrame(girarRuleta);
        } else {
            cancelAnimationFrame(frameId);
            velocidad = 0;
            const segmentoGanador = segmentos[Math.floor((anguloActual / (Math.PI * 2)) * segmentos.length) % segmentos.length];
            console.log('El segmento ganador es:', segmentoGanador.label);
        }
    }

    function dibujarCentroCentelleante() {
        const tiempoActual = Date.now();
        if (tiempoActual - ultimoTiempoCentelleo >= 1000) {
            centelleo = !centelleo;
            ultimoTiempoCentelleo = tiempoActual;
        }
        ctx.font = 'bold 75px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = centelleo ? 'gold' : '#ffd700'; // No completamente transparente
        ctx.fillText('$', radio, radio + 28);
    }

    function dibujarRuleta() {
        const anguloPorSegmento = Math.PI * 2 / segmentos.length;
        let inicioAngulo = 0;

        segmentos.forEach(segmento => {
            const finAngulo = inicioAngulo + anguloPorSegmento;
            dibujarSegmento(segmento, inicioAngulo, finAngulo);
            inicioAngulo = finAngulo;
        });

        dibujarFlecha();
        dibujarCentroCentelleante();
    }

    btnGirar.addEventListener('click', () => {
        if (frameId) {
            cancelAnimationFrame(frameId);
        }
        velocidad = Math.PI * 2 / (100 + Math.random() * 100); // Reiniciar la velocidad
        girarRuleta();
    });

    function actualizar() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        dibujarRuleta();
        frameId = requestAnimationFrame(actualizar);
    }

    actualizar(); // Inicia la animación de actualización
});
