// Definición de los segmentos de la ruleta
const segmentos = [
  { nombre: '0X', inicio: 337.5, fin: 22.5 },
  { nombre: '1X', inicio: 22.5, fin: 67.5 },
  { nombre: '6X', inicio: 67.5, fin: 112.5 },
  { nombre: '0.02X', inicio: 112.5, fin: 157.5 },
  { nombre: '0.1X', inicio: 157.5, fin: 202.5 },
  { nombre: '4X', inicio: 202.5, fin: 247.5 },
  { nombre: '0.5X', inicio: 247.5, fin: 292.5 },
  { nombre: '2X', inicio: 292.5, fin: 337.5 }
];

// Función para calcular el segmento ganador basado en el ángulo
function calcularSegmentoGanador(angulo) {
  const anguloNormalizado = (angulo + 360) % 360;
  return segmentos.find(segmento => {
    const inicio = segmento.inicio;
    const fin = segmento.fin > segmento.inicio ? segmento.fin : segmento.fin + 360;
    return anguloNormalizado >= inicio && anguloNormalizado < fin;
  }) || segmentos[0]; // Fallback al primer segmento
}

// Función para girar la ruleta
function girarRuleta() {
  const anguloAlAzar = Math.floor(Math.random() * 360); // Ángulo al azar para el segmento ganador
  const vueltas = Math.floor(Math.random() * 3) + 2; // Entre 2 y 4 vueltas completas
  const gradosTotales = 360 * vueltas + anguloAlAzar; // Total de grados a girar

  const ruleta = document.getElementById('imgRuleta');
  ruleta.style.transition = 'transform 2s ease-out';
  ruleta.style.transform = `rotate(${gradosTotales}deg)`;

  // Mostrar el resultado después de que la ruleta se detenga
  setTimeout(() => {
    const segmentoGanador = calcularSegmentoGanador(gradosTotales);
    const resultado = document.getElementById('resultado');
    resultado.textContent = `¡Haz ganado ${segmentoGanador.nombre}!`;
    resultado.style.display = 'block';
    if (segmentoGanador.nombre !== '0X') {
      document.body.classList.add('ganador');
      lanzarConfeti();
      mostrarDineroCayendo();
    }
  }, 2000); // Esperar 2 segundos para que la animación termine
}

document.getElementById('girar').addEventListener('click', girarRuleta);
