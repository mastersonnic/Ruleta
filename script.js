document.addEventListener('DOMContentLoaded', function () {
  var segmentos = ['0X', '2X', '0.5X', '4X', '0.1X', '0.02X', '6X', '1X'];
  var imgRuleta = document.getElementById('imgRuleta');
  var resultado = document.getElementById('resultado');
  var botonGirar = document.getElementById('girar');

  botonGirar.addEventListener('click', function () {
    var duracionGiro = 2; // Duración del giro en segundos
    var gradosPorSegmento = 360 / segmentos.length;
    var anguloInicio = 337.5; // Ángulo de inicio del primer segmento
    var anguloAleatorio = Math.random() * gradosPorSegmento;
    var segmentoAleatorio = Math.floor(Math.random() * segmentos.length);
    var anguloFinal = 360 * 5 + anguloInicio + segmentoAleatorio * gradosPorSegmento + anguloAleatorio;

    imgRuleta.style.transition = 'transform ' + duracionGiro + 's linear';
    imgRuleta.style.transform = 'rotate(' + anguloFinal + 'deg)';

    setTimeout(function () {
      var segmentoGanadorIndex = Math.floor(((anguloFinal - anguloInicio) % 360) / gradosPorSegmento);
      var segmentoGanador = segmentos[segmentoGanadorIndex];
      resultado.textContent = 'Segmento ganador: ' + segmentoGanador;
    }, duracionGiro * 1000);
  });
});
