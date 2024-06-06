document.addEventListener('DOMContentLoaded', function() {
  var ruleta = document.getElementById('ruleta');
  var grados = 0;

  function girarRuleta() {
    // Calcula un ángulo aleatorio para la rotación
    var anguloFinal = Math.floor(Math.random() * 360) + 1440; // 1440 es 4 vueltas completas
    grados = anguloFinal;
    ruleta.style.transform = 'rotate(' + grados + 'deg)';
  }

  // Espera 5 segundos para iniciar la desaceleración
  setTimeout(function() {
    girarRuleta();
  }, 5000);
});
