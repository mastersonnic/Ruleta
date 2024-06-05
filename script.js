document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('ruleta');
  const ctx = canvas.getContext('2d');
  let anguloActual = 0;
  const segmentos = [
    { color: '#FF5959', label: 'Premio 1', porcentaje: 0.1 },
    { color: '#FFAC59', label: 'Premio 2', porcentaje: 0.2 },
    // Añade más segmentos según sea necesario
  ];

  function dibujarSegmento(segmento, inicioAngulo, finAngulo) {
    ctx.beginPath();
    ctx.arc(250, 250, 200, inicioAngulo, finAngulo);
    ctx.lineTo(250, 250);
    ctx.fillStyle = segmento.color;
    ctx.fill();
    ctx.stroke();
  }

  function dibujarRuleta() {
    let inicioAngulo = 0;
    segmentos.forEach(segmento => {
      const finAngulo = inicioAngulo + (2 * Math.PI * segmento.porcentaje);
      dibujarSegmento(segmento, inicioAngulo, finAngulo);
      inicioAngulo = finAngulo;
    });
  }

  function girarRuleta() {
    const velocidadInicial = Math.random() * 10 + 10; // Velocidad inicial aleatoria entre 10 y 20
    let velocidad = velocidadInicial;
    const desaceleracion = 0.98; // Factor de desaceleración

    function rotar() {
      anguloActual += velocidad;
      velocidad *= desaceleracion;
      if (velocidad < 0.5) {
        // Detener la animación cuando la velocidad sea baja
        console.log('La ruleta se ha detenido.');
        return;
      }
      dibujarRuleta();
      requestAnimationFrame(rotar);
    }

    rotar();
  }

  // Evento para el botón de girar
  document.getElementById('girar').addEventListener('click', girarRuleta);

  // Inicializar la ruleta
  dibujarRuleta();
});
