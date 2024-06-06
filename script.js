document.addEventListener('DOMContentLoaded', function() {
  var ruleta = document.getElementById('ruleta');
  var botonGirar = document.getElementById('girar'); // Obtiene el botón que hemos añadido
  var grados = 0;

  function girarRuleta() {
    // Calcula un ángulo aleatorio para la rotación
    var anguloFinal = Math.floor(Math.random() * 360) + 1440; // 1440 es 4 vueltas completas
    grados = anguloFinal;
    ruleta.style.transform = 'rotate(' + grados + 'deg)';
  }

  // Evento de clic para el botón
  botonGirar.addEventListener('click', function() {
    girarRuleta();
  });
});
