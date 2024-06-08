// script.js
document.addEventListener('DOMContentLoaded', function() {
  var ruleta = document.getElementById('ruleta');
  var botonGirar = document.getElementById('girar');
  var angulo = 0;

  botonGirar.addEventListener('click', function() {
    var duracion = 3; // Duración de la rotación en segundos
    var desaceleracion = 'cubic-bezier(0.17, 0.67, 0.83, 0.67)'; // Efecto de desaceleración

    angulo += Math.floor(360 + Math.random() * 1440); // Gira al menos una vuelta completa y hasta cuatro
    ruleta.style.transition = 'transform ' + duracion + 's ' + desaceleracion;
    ruleta.style.transform = 'rotate(' + angulo + 'deg)';
  });
});
