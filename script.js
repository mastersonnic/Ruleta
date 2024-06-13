document.addEventListener('DOMContentLoaded', (event) => {
  const girar = document.getElementById('girar');
  const imgRuleta = document.getElementById('imgRuleta');
  const resultado = document.getElementById('resultado');
  let anguloInicial = Math.random() * 360; // Variable 1: Ángulo inicial al azar

  girar.addEventListener('click', () => {
    let vueltas = Math.floor(Math.random() * (40 - 20 + 1)) + 20; // Variable 2: Vueltas al azar entre 20 y 40
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
    }, velocidad.slice(0, -1) * 1000); // Convertir la velocidad a milisegundos
  });

  function calcularSegmentoGanador(angulo) {
    // Definir los rangos de ángulos para cada segmento
    const segmentos = [
      { nombre: '0', min: 337.5, max: 22.5 },
      { nombre: '1', min: 22.5, max: 67.5 },
      { nombre: '6', min: 67.5, max: 135 },
      { nombre: '0.02', min: 135, max: 145 },
      { nombre: '0.1', min: 145, max: 190 },
      { nombre: '4', min: 190, max: 270 },
      { nombre: '0.5', min: 270, max: 315 },
      { nombre: '2', min: 315, max: 337.5 }
    ];

    // Encontrar el segmento correspondiente al ángulo final
    for (let i = 0; i < segmentos.length; i++) {
      let seg = segmentos[i];
      if (angulo >= seg.min && angulo < seg.max) {
        return seg.nombre;
      }
      if (seg.min > seg.max && (angulo >= seg.min || angulo < seg.max)) {
        return seg.nombre;
      }
    }
    return '0'; // Por defecto, si no se encuentra en ningún rango
  }
});
