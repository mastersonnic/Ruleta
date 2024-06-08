// script.js
document.addEventListener('DOMContentLoaded', function() {
    var botonGirar = document.getElementById('boton-girar');
    var contadorGiros = document.getElementById('contador-giros');
    var imagenRuleta = document.querySelector('.imagen-ruleta');
    var anguloActual = 0; // Inicializa el ángulo de la ruleta

    botonGirar.addEventListener('click', function() {
        var girosRestantes = parseInt(contadorGiros.textContent);
        if (girosRestantes > 0) {
            contadorGiros.textContent = girosRestantes - 1;
            // Calcula un nuevo ángulo para la ruleta basado en un giro aleatorio
            var anguloGiro = Math.random() * 5000 + 360;
            anguloActual += anguloGiro;
            // Inicia la animación de la ruleta
            imagenRuleta.style.transition = 'transform 4s ease-out';
            imagenRuleta.style.transform = 'rotate(' + anguloActual + 'deg)';
            // Espera a que termine la animación para determinar el segmento ganador
            setTimeout(function() {
                // Determina el segmento ganador basado en el ángulo actual
                var segmentoGanador = determinarSegmentoGanador(anguloActual);
                // Si el segmento ganador no contiene "0.", lanza confeti
                if (!segmentoGanador.includes('0.')) {
                    lanzarConfeti();
                }
            }, 4000); // Ajusta al tiempo de la animación
        }
    });

    // Función para determinar el segmento ganador
    function determinarSegmentoGanador(angulo) {
        var segmentos = ['0X', '0.02X', '0.1X', '0.5X', '1X', '2X', '4X', '6X'];
        // Ajusta el ángulo para que esté dentro de 360 grados
        var anguloNormalizado = angulo % 360;
        // Calcula el índice del segmento ganador
        var indiceSegmento = Math.floor(anguloNormalizado / (360 / segmentos.length));
        return segmentos[indiceSegmento];
    }

    // Función para lanzar confeti
    function lanzarConfeti() {
        // Aquí deberías invocar la función de la biblioteca confetti-js
        // Por ejemplo: confetti.start();
        // Asegúrate de incluir la biblioteca en tu proyecto
    }
});
