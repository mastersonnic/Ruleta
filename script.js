document.addEventListener('DOMContentLoaded', function () {
  var segmentos = ['0X', '2X', '0.5X', '4X', '0.1X', '0.02X', '6X', '1X'];
  var imgRuleta = document.getElementById('imgRuleta');
  var mensajeGanador = document.getElementById('mensajeGanador');
  var botonGirar = document.getElementById('girar');
  var anguloActual = 0;

  botonGirar.addEventListener('click', function () {
    var duracionGiro = 2;
    var gradosPorSegmento = 360 / segmentos.length;
    var anguloInicio = 337.5;
    var anguloFinal = anguloActual - (360 * 5 + anguloInicio);

    imgRuleta.style.transition = 'transform ' + duracionGiro + 's linear';
    imgRuleta.style.transform = 'rotate(' + anguloFinal + 'deg)';
    anguloActual = anguloFinal;

    setTimeout(function () {
      var segmentoGanadorIndex = Math.floor(((360 - (anguloActual % 360)) + anguloInicio) / gradosPorSegmento) % segmentos.length;
      var segmentoGanador = segmentos[segmentoGanadorIndex];
      mensajeGanador.textContent = '¡Haz ganado ' + segmentoGanador + '!';
      mensajeGanador.style.display = 'block';
      mensajeGanador.style.animation = 'aparecer 1s forwards';
    }, duracionGiro * 1000);
  });
});
