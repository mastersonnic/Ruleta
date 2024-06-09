document.addEventListener('DOMContentLoaded', function () {
  var segmentos = ['0X', '2X', '0.5X', '4X', '0.1X', '0.02X', '6X', '1X'];
  var imgRuleta = document.getElementById('imgRuleta');
  var mensajeGanador = document.getElementById('mensajeGanador');
  var botonGirar = document.getElementById('girar');

  botonGirar.addEventListener('click', function () {
    var duracionGiro = 2; // Duración del giro en segundos
    var gradosPorSegmento = 360 / segmentos.length;
    var anguloInicio = 337.5; // Ángulo de inicio del primer segmento
    var anguloFinal = -360 * 5 - anguloInicio; // Asegura que la ruleta gire hacia la izquierda

    imgRuleta.style.transition = 'transform ' + duracionGiro + 's linear';
    imgRuleta.style.transform = 'rotate(' + anguloFinal + 'deg)';

    setTimeout(function () {
      var segmentoGanadorIndex = Math.floor(((anguloFinal + anguloInicio) % 360) / gradosPorSegmento);
      var segmentoGanador = segmentos[segmentoGanadorIndex];
      mensajeGanador.textContent = '¡Haz ganado ' + segmentoGanador + '!';
      mensajeGanador.style.display = 'block';
      mensajeGanador.style.animation = 'aparecer 1s forwards';
    }, duracionGiro * 1000);
  });
});
