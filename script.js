// Definición de los segmentos de la ruleta
const segmentos = [
  { nombre: '0X', inicio: 337.5, fin: 22.5 },
  { nombre: '1X', inicio: 22.5, fin: 67.5 },
  { nombre: '6X', inicio: 67.5, fin: 135 },
  { nombre: '0.02X', inicio: 135, fin: 145 },
  { nombre: '0.1X', inicio: 145, fin: 190 },
  { nombre: '4X', inicio: 190, fin: 270 },
  { nombre: '0.5X', inicio: 270, fin: 315 },
  { nombre: '2X', inicio: 315, fin: 337.5 }
];

// Función para calcular el segmento ganador basado en el ángulo
function calcularSegmentoGanador(angulo) {
  const anguloNormalizado = (angulo + 360) % 360;
  return segmentos.find(segmento => {
    const inicio = segmento.inicio;
    const fin = segmento.fin;
    if (inicio > fin) {
      // Ajuste para los segmentos que cruzan el ángulo 0/360
      return anguloNormalizado >= inicio || anguloNormalizado < fin;
    }
    return anguloNormalizado >= inicio && anguloNormalizado < fin;
  }) || segmentos[0]; // Fallback al primer segmento
}

// Función para girar la ruleta
function girarRuleta() {
  const vueltas = Math.floor(Math.random() * 3) + 2; // Entre 2 y 4 vueltas completas
  const anguloFinal = Math.floor(Math.random() * 360); // Ángulo final al azar
  const gradosTotales = 360 * vueltas + anguloFinal; // Total de grados a girar

  const ruleta = document.getElementById('imgRuleta');
  ruleta.style.transition = 'transform 4s ease-out';
  ruleta.style.transform = `rotate(${gradosTotales}deg)`;

  // Mostrar el resultado después de que la ruleta se detenga
  setTimeout(() => {
    const segmentoGanador = calcularSegmentoGanador(anguloFinal);
    const resultado = document.getElementById('resultado');
    resultado.textContent = `¡Haz ganado ${segmentoGanador.nombre}!`;
    resultado.style.display = 'block';
    if (segmentoGanador.nombre !== '0X') {
      document.body.classList.add('ganador');
      lanzarConfeti();
      mostrarDineroCayendo();
    }
  }, 4000); // Esperar 4 segundos para que la animación termine
}

document.getElementById('girar').addEventListener('click', girarRuleta);
