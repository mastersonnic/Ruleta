document.addEventListener('DOMContentLoaded', function () {
  var segmentos = [
    { nombre: '0X', inicio: 337.5, fin: 22.5 },
    { nombre: '1X', inicio: 22.5, fin: 67.5 },
    { nombre: '6X', inicio: 67.5, fin: 112.5 },
    { nombre: '0.02X', inicio: 112.5, fin: 157.5 },
    { nombre: '0.1X', inicio: 157.5, fin: 202.5 },
    { nombre: '4X', inicio: 202.5, fin: 247.5 },
    { nombre: '0.5X', inicio: 247.5, fin: 292.5 },
    { nombre: '2X', inicio: 292.5, fin: 337.5 }
  ];
  var imgRuleta = document.getElementById('imgRuleta');
  var resultado = document.getElementById('resultado');
  var botonGirar = document.getElementById('girar');
  var girando = false;

  botonGirar.addEventListener('click', function () {
    if (girando) return;
    girando = true;
    var duracionGiro = Math.random() * 0.5 + 1.5; // Duración del giro entre 1.5 y 2 segundos
    var gradosPorVuelta = 360 / segmentos.length;
    var anguloAleatorio = Math.random() * gradosPorVuelta; // Variación aleatoria dentro del segmento
    var anguloFinal = (360 * 5) + anguloAleatorio; // Asegura que la ruleta gire varias veces

    imgRuleta.style.transition = 'transform ' + duracionGiro + 's ease-out';
    imgRuleta.style.transform = 'rotate(' + anguloFinal + 'deg)';

    setTimeout(function () {
      var anguloDesplazado = anguloFinal % 360;
      var segmentoGanadorIndex = segmentos.findIndex(function(segmento) {
        var inicio = segmento.inicio < segmento.fin ? segmento.inicio : segmento.inicio - 360;
        return inicio <= anguloDesplazado && anguloDesplazado < segmento.fin;
      });
      var segmentoGanador = segmentos[segmentoGanadorIndex].nombre;
      resultado.textContent = '¡Haz ganado ' + segmentoGanador + '!';
      resultado.style.display = 'block';
      girando = false;
    }, duracionGiro * 1000);
  });
});
