document.addEventListener('DOMContentLoaded', function () {
  // Definimos los ángulos de inicio de cada segmento en sentido horario y comenzando desde el ángulo 0 en la parte superior
  var angulos = [0, 45, 90, 135, 180, 225, 270, 315];
  var segmentos = ['0X', '2X', '0.5X', '4X', '0.1X', '0.02X', '6X', '1X'];
  var imgRuleta = document.getElementById('imgRuleta');
  var resultado = document.getElementById('resultado');
  var botonGirar = document.getElementById('girar');

  botonGirar.addEventListener('click', function () {
    var tiempoInicial = 3; // Tiempo en segundos que la ruleta gira a velocidad constante
    var duracionGiro = tiempoInicial + Math.random() * 2; // Duración total del giro
    var vueltas = 10; // Número de vueltas completas que da la ruleta antes de detenerse

    // Calculamos un ángulo aleatorio entre 0 y 360 grados que corresponde al ángulo de inicio del segmento ganador
    var anguloGanador = Math.floor(Math.random() * 8) * 45;
    var anguloFinal = 360 * vueltas + anguloGanador;

    // Actualizamos la transformación de la imagen de la ruleta para que gire
    imgRuleta.style.transition = 'transform ' + duracionGiro + 's ease-out';
    imgRuleta.style.transform = 'rotate(' + anguloFinal + 'deg)';

    // Mostramos el resultado una vez que la ruleta se detenga
    setTimeout(function () {
      var segmentoGanador = segmentos[anguloGanador / 45];
      resultado.textContent = 'Segmento ganador: ' + segmentoGanador;
    }, duracionGiro * 1000);
  });
});
