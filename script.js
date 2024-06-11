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
  var dinero = document.getElementById('dinero');
  var botonGirar = document.getElementById('girar');
  var girando = false;

  botonGirar.addEventListener('click', function () {
    if (girando) return;
    girando = true;
    resultado.style.display = 'none';
    dinero.style.display = 'none';
    var duracionGiro = 3; // Duración del giro en segundos
    var anguloFinal = Math.floor(Math.random() * 360) + 360 * 10; // Gira la ruleta al menos 10 veces

    imgRuleta.style.transition = 'transform ' + duracionGiro + 's ease-out';
    imgRuleta.style.transform = 'rotate(' + anguloFinal + 'deg)';

    setTimeout(function () {
      imgRuleta.style.transition = '';
      imgRuleta.style.transform = 'rotate(' + (anguloFinal % 360) + 'deg)';
      var anguloDesplazado = anguloFinal % 360;
      var segmentoGanadorIndex = segmentos.findIndex(function(segmento) {
        return anguloDesplazado >= segmento.inicio && anguloDesplazado < segmento.fin;
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
