document.addEventListener('DOMContentLoaded', function () {
  var segmentos = ['0X', '2X', '0.5X', '4X', '0.1X', '0.02X', '6X', '1X'];
  var imgRuleta = document.getElementById('imgRuleta');
  var resultado = document.getElementById('resultado');
  var botonGirar = document.getElementById('girar');
  var girando = false;

  botonGirar.addEventListener('click', function () {
    if (girando) return;
    girando = true;
    var duracionGiro = Math.random() * 0.5 + 1.5; // Duración del giro entre 1.5 y 2 segundos
    var vueltasPorClick = 20; // Vueltas por segundo
    var gradosPorVuelta = 360;
    var anguloFinal = vueltasPorClick * gradosPorVuelta * duracionGiro;

    imgRuleta.style.transition = 'transform ' + duracionGiro + 's ease-out';
    imgRuleta.style.transform = 'rotate(' + anguloFinal + 'deg)';

    setTimeout(function () {
      var segmentoGanadorIndex = Math.floor((anguloFinal / gradosPorVuelta) % segmentos.length);
      var segmentoGanador = segmentos[segmentoGanadorIndex];
      resultado.textContent = '¡Haz ganado ' + segmentoGanador + '!';
      resultado.style.display = 'block';
      girando = false;
    }, duracionGiro * 1000);
  });
});
