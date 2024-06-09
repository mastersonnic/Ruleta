document.addEventListener('DOMContentLoaded', function () {
  var segmentos = ['0X', '2X', '0.5X', '4X', '0.1X', '0.02X', '6X', '1X'];
  var imgRuleta = document.getElementById('imgRuleta');
  var resultado = document.getElementById('resultado');
  var botonGirar = document.getElementById('girar');
  var girando = false;

  botonGirar.addEventListener('click', function () {
    if (girando) return;
    girando = true;
    var duracionGiro = Math.floor(Math.random() * 3) + 2; // Duración del giro entre 2 y 4 segundos
    var gradosPorSegmento = 360 / segmentos.length;
    var anguloInicio = 0; // Ángulo de inicio ajustado para girar siempre hacia la derecha
    var segmentoAleatorio = Math.floor(Math.random() * segmentos.length);
    var anguloFinal = 360 * 10 + segmentoAleatorio * gradosPorSegmento;

    imgRuleta.style.transition = 'transform ' + duracionGiro + 's cubic-bezier(0.33, 1, 0.68, 1)';
    imgRuleta.style.transform = 'rotate(' + anguloFinal + 'deg)';

    setTimeout(function () {
      var segmentoGanadorIndex = Math.floor((anguloFinal / gradosPorSegmento) % segmentos.length);
      var segmentoGanador = segmentos[segmentoGanadorIndex];
      resultado.textContent = '¡Haz ganado ' + segmentoGanador + '!';
      resultado.style.display = 'block';
      girando = false;
    }, duracionGiro * 1000);
  });
});
