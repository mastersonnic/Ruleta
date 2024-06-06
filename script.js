document.addEventListener('DOMContentLoaded', (event) => {
    const canvas = document.getElementById('ruleta');
    const ctx = canvas.getContext('2d');
    const btnGirar = document.getElementById('girar');
    const radio = canvas.width / 2;
    let anguloActual = 0;
    let velocidad = 0;
    let frameId;
    let centelleo = true; // Estado inicial del centelleo para el signo de dinero
    const segmentos = [
        // ... definición de los segmentos con colores en gradiente
    ];

    function dibujarSegmento(segmento, inicioAngulo, finAngulo) {
        // ... función para dibujar los segmentos con gradiente
    }

    function dibujarFlecha() {
        // ... función para dibujar la flecha indicadora
    }

    function girarRuleta() {
        // ... función para iniciar el giro de la ruleta
    }

    function dibujarCentroCentelleante() {
        ctx.font = 'bold 75px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = centelleo ? 'gold' : 'transparent';
        ctx.fillText('$', radio, radio + 25);
        centelleo = !centelleo;
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
            velocidad = 0;
        }
        girarRuleta();
    });

    function actualizar() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        dibujarRuleta();
        frameId = requestAnimationFrame(actualizar);
    }

    actualizar(); // Inicia la animación de actualización
});
