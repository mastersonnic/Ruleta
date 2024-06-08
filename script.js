// script.js
document.addEventListener('DOMContentLoaded', function() {
  var ruleta = document.getElementById('ruleta');
  var lienzo = document.getElementById('lienzo');
  var ctx = lienzo.getContext('2d');
  var botonGirar = document.getElementById('girar');
  var angulo = 0;
  var segmentos = ['0X', '0.02X', '0.1X', '0.5X', '1X', '2X', '4X', '6X'];

  // Dibuja las líneas de referencia
  function dibujarLineas() {
    ctx.clearRect(0, 0, lienzo.width, lienzo.height);
    ctx.beginPath();
    var anguloSegmento = 360 / segmentos.length;
    for (var i = 0; i < segmentos.length; i++) {
      ctx.moveTo(lienzo.width / 2, lienzo.height / 2);
      ctx.lineTo(lienzo.width / 2 + Math.cos((anguloSegmento * i - 90) * Math.PI / 180) * 500,
                 lienzo.height / 2 + Math.sin((anguloSegmento * i - 90) * Math.PI / 180) * 500);
    }
    ctx.stroke();
  }

  dibujarLineas();

  botonGirar.addEventListener('click', function() {
    var duracion = 3; // Duración de la rotación en segundos
    var desaceleracion = 'cubic-bezier(0.17, 0.67, 0.83, 0.67)'; // Efecto de desaceleración

    angulo += Math.floor(360 + Math.random() * 1440); // Gira al menos una vuelta completa y hasta cuatro
    ruleta.style.transition = 'transform ' + duracion + 's ' + desaceleracion;
    ruleta.style.transform = 'rotate(' + angulo + 'deg)';

    // Esperar a que termine la animación para determinar el segmento ganador
    setTimeout(function() {
      var anguloFinal = angulo % 360; // Ángulo normalizado entre 0 y 359
      var indiceSegmento = Math.floor(anguloFinal / (360 / segmentos.length));
      var segmentoGanador = segmentos[indiceSegmento];
      alert('El segmento ganador es: ' + segmentoGanador);
      dibujarLineas(); // Redibuja las líneas después de cada giro
    }, duracion * 1000);
  });
});
