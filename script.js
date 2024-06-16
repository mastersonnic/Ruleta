document.addEventListener('DOMContentLoaded', (event) => {
  const girar = document.getElementById('girar');
  const imgRuleta = document.getElementById('imgRuleta');
  const resultado = document.getElementById('resultado');
  let anguloInicial = Math.random() * 360; // Variable 1: Ángulo inicial al azar

  girar.addEventListener('click', () => {
    let vueltas = Math.floor(Math.random() * (25 - 20 + 1)) + 20; // Variable 2: Vueltas al azar entre 20 y 40
    let numerador = Math.floor(Math.random() * 9) + 1;
    let denominador = Math.floor(Math.random() * 9) + 1;
    let fraccionGiro = (numerador / denominador) * 360; // Variable 1/2: Fracción de giro al azar
    let velocidad = getComputedStyle(document.documentElement).getPropertyValue('--velocidad');

    // Calcular el ángulo total de rotación
    anguloInicial += (vueltas * 360) + fraccionGiro;
    let anguloFinal = anguloInicial % 360;

    // Rotar la imagen de la ruleta
    imgRuleta.style.transition = `transform ${velocidad} ease-out`;
    imgRuleta.style.transform = `rotate(${anguloInicial}deg)`;

    // Mostrar el resultado después de que la ruleta se detenga
    setTimeout(() => {
      resultado.style.display = 'block';
      // Determinar el segmento ganador basado en el ángulo final
      let segmentoGanador = calcularSegmentoGanador(anguloFinal);
      resultado.textContent = `El segmento ganador es: ${segmentoGanador}X`;
    }, parseFloat(velocidad) * 1000); // Convertir la velocidad a milisegundos
  });

  function calcularSegmentoGanador(angulo) {
    // Asumiendo que 'angulo' es el ángulo final después de todos los giros
    if (angulo >= 337.5 || angulo < 22.5) {
      return '0';
    } else if (angulo >= 22.5 && angulo < 67.5) {
      return '1';
    } else if (angulo >= 67.5 && angulo < 135) {
      return '6';
    } else if (angulo >= 135 && angulo < 145) {
      return '0.02';
    } else if (angulo >= 145 && angulo < 190) {
      return '0.1';
    } else if (angulo >= 190 && angulo < 270) {
      return '4';
    } else if (angulo >= 270 && angulo < 315) {
      return '0.5';
    } else if (angulo >= 315 && angulo < 337.5) {
      return '2';
    } else {
      return 'Error en el cálculo del segmento ganador';
    }
  }
});
