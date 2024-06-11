document.addEventListener('DOMContentLoaded', function () {
  var segmentos = [
    { nombre: '0X', inicio: 337.5, fin: 22.5 },
    { nombre: '1X', inicio: 22.5, fin: 67.5 },
    { nombre: '6X', inicio: 67.5, fin: 135 },
    { nombre: '0.02X', inicio: 135, fin: 145 },
    { nombre: '0.1X', inicio: 145, fin: 190 },
    { nombre: '4X', inicio: 190, fin: 270 },
    { nombre: '0.5X', inicio: 270, fin: 315 },
    { nombre: '2X', inicio: 315, fin: 337.5 }
  ];
  var imgRuleta = document.getElementById('imgRuleta');
  var resultado = document.getElementById('resultado');
  var dinero = document.getElementById('dinero');
  var botonGirar = document.getElementById('girar');
  var girando = false;

  botonGirar.addEventListener('click', function () {
    if (girando) return;
    girando = true;
    resultado.style.display = 'none';
    dinero.style.display = 'none';
    var vueltasPorSegundo = 20;
    var duracionGiro = 3; // Duración del giro en segundos
    var anguloFinal = vueltasPorSegundo * 360 * duracionGiro + Math.floor(Math.random() * 360);

    imgRuleta.style.transition = 'transform ' + duracionGiro + 's ease-out';
    imgRuleta.style.transform = 'rotate(' + anguloFinal + 'deg)';

    setTimeout(function () {
      imgRuleta.style.transition = 'none';
      var anguloDesplazado = anguloFinal % 360;
      var segmentoGanadorIndex = segmentos.findIndex(function(segmento) {
        var inicio = segmento.inicio < segmento.fin ? segmento.inicio : segmento.inicio - 360;
        return inicio <= anguloDesplazado && anguloDesplazado < segmento.fin;
      });
      var segmentoGanador = segmentos[segmentoGanadorIndex].nombre;
      resultado.textContent = '¡Haz ganado ' + segmentoGanador + '!';
      resultado.style.display = 'block';
      if (!segmentoGanador.includes('0.')) {
        dinero.style.display = 'block';
        setTimeout(function () {
          dinero.style.display = 'none';
        }, 7000); // Gif de dinero visible durante 7 segundos
      }
      girando = false;
    }, duracionGiro * 1000);
  });
});
