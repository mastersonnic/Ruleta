document.addEventListener('DOMContentLoaded', function () {
  var segmentos = [
    { nombre: '0X', inicio: 337.5, fin: 22.5, centro: 0 },
    { nombre: '1X', inicio: 22.5, fin: 67.5, centro: 45 },
    { nombre: '6X', inicio: 67.5, fin: 135, centro: 101.25 },
    { nombre: '0.02X', inicio: 135, fin: 145, centro: 140 },
    { nombre: '0.1X', inicio: 145, fin: 190, centro: 167.5 },
    { nombre: '4X', inicio: 190, fin: 270, centro: 230 },
    { nombre: '0.5X', inicio: 270, fin: 315, centro: 292.5 },
    { nombre: '2X', inicio: 315, fin: 337.5, centro: 326.25 }
  ];
  var imgRuleta = document.getElementById('imgRuleta');
  var resultado = document.getElementById('resultado');
  var dinero = document.getElementById('dinero');
  var botonGirar = document.getElementById('girar');
  var girando = false;
  var anguloActual = 0;

  botonGirar.addEventListener('click', function () {
    if (girando) return;
    girando = true;
    resultado.style.display = 'none';
    dinero.style.display = 'none';
    var duracionGiro = 5; // Duración del giro en segundos
    var vueltasPorSegundo = 20;
    var anguloFinal = 360 * vueltasPorSegundo * duracionGiro; // Gira la ruleta 20 veces por segundo durante 5 segundos

    anguloActual += anguloFinal;
    imgRuleta.style.transition = 'transform ' + duracionGiro + 's ease-out';
    imgRuleta.style.transform = 'rotate(' + anguloActual + 'deg)';

    setTimeout(function () {
      var anguloDesplazado = anguloActual % 360;
      var segmentoGanadorIndex = segmentos.findIndex(function(segmento) {
        var inicio = segmento.inicio < segmento.fin ? segmento.inicio : segmento.inicio - 360;
        var fin = segmento.fin;
        return (inicio <= anguloDesplazado && anguloDesplazado < fin) || (inicio <= anguloDesplazado + 360 && anguloDesplazado + 360 < fin);
      });
      var segmentoGanador = segmentos[segmentoGanadorIndex].nombre;
      resultado.textContent = '¡Haz ganado ' + segmentoGanador + '!';
      resultado.style.display = 'block';
      dinero.style.zIndex = '1000'; // Asegura que el gif de dinero esté al frente
      if (!segmentoGanador.includes('0.')) {
        dinero.style.display = 'block';
        setTimeout(function () {
          dinero.style.display = 'none';
        }, 7000); // Gif de dinero visible durante 7 segundos
      }
      girando = false;
    }, duracionGiro * 1000 + 100); // Pequeño retraso para asegurar que la transición haya terminado
  });
});
