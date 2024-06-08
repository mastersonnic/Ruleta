document.addEventListener('DOMContentLoaded', function () {
  var angulos = [0, 45, 90, 135, 180, 225, 270, 315];
  var segmentos = ['0X', '1X', '6X', '0.02X', '0.1X', '4X', '0.5X', '2X'];
  var imgRuleta = document.getElementById('imgRuleta');
  var resultado = document.getElementById('resultado');
  var botonGirar = document.getElementById('girar');

  botonGirar.addEventListener('click', function () {
    var tiempoInicial = 3; // Tiempo en segundos que la ruleta gira a velocidad constante
    var duracionGiro = tiempoInicial + Math.random() * 2; // Duración total del giro
    var anguloFinal = angulos[Math.floor(Math.random() * angulos.length)];
    var segmentoGanador = segmentos[angulos.indexOf(anguloFinal)];

    imgRuleta.style.transition = 'transform ' + duracionGiro + 's ease-out';
    imgRuleta.style.transform = 'rotate(' + (3600 + anguloFinal) + 'deg)';

    setTimeout(function () {
      resultado.textContent = 'Segmento ganador: ' + segmentoGanador;
    }, duracionGiro * 1000);
  });
});
