document.addEventListener('DOMContentLoaded', function () {
  var segmentos = ['0X', '1X', '6X', '0.02X', '0.1X', '4X', '0.5X', '2X'];
  var imgRuleta = document.getElementById('imgRuleta');
  var resultado = document.getElementById('resultado');
  var botonGirar = document.getElementById('girar');

  botonGirar.addEventListener('click', function () {
    var duracionGiro = 2; // Duración del giro en segundos
    var gradosPorSegmento = 360 / segmentos.length;
    var anguloAleatorio = Math.random() * gradosPorSegmento;
    var segmentoAleatorio = Math.floor(Math.random() * segmentos.length);
    var anguloFinal = 360 * 5 + segmentoAleatorio * gradosPorSegmento + anguloAleatorio;

    imgRuleta.style.transition = 'transform ' + duracionGiro + 's linear';
    imgRuleta.style.transform = 'rotate(' + anguloFinal + 'deg)';

    setTimeout(function () {
      var segmentoGanador = segmentos[segmentoAleatorio];
      resultado.textContent = 'Segmento ganador: ' + segmentoGanador;
    }, duracionGiro * 1000);
  });
});
