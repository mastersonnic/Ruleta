let ultimoAngulo = 0; // Variable para guardar el último ángulo

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

function girarRuleta() {
  const duracion = Math.floor(Math.random() * 2) + 5; // Duración aleatoria entre 5 y 7 segundos
  const anguloAlAzar = Math.floor(Math.random() * 360); // Ángulo al azar para el segmento ganador
  const vueltasPorSegundo = 20;
  const gradosPorVuelta = 360;
  const gradosTotales = vueltasPorSegundo * gradosPorVuelta * duracion + anguloAlAzar - ultimoAngulo;
  ultimoAngulo = (ultimoAngulo + gradosTotales) % 360; // Actualizar el último ángulo

  const ruleta = document.getElementById('imgRuleta');
  ruleta.style.transition = `transform ${duracion}s cubic-bezier(0.33, 1, 0.68, 1)`;
  ruleta.style.transform = `rotate(${gradosTotales}deg)`;

  // Asegurarse de que la ruleta haya terminado de girar antes de calcular el segmento ganador
  setTimeout(() => {
    const anguloFinal = (ultimoAngulo + 360 - anguloAlAzar) % 360;
    const segmentoGanador = segmentos.find(segmento => {
      let inicio = segmento.inicio;
      let fin = segmento.fin;
      if (inicio > fin) { // Ajuste para los segmentos que cruzan el ángulo 0/360
        fin += 360;
      }
      if (anguloFinal >= inicio && anguloFinal < fin) {
        return true;
      }
      return false;
    }) || segmentos[0]; // Fallback al primer segmento por si acaso

    const resultado = document.getElementById('resultado');
    resultado.textContent = `¡Haz ganado ${segmentoGanador.nombre}!`;
    resultado.style.display = 'block';
    if (segmentoGanador.nombre !== '0X') {
      document.body.classList.add('ganador');
      lanzarConfeti();
      mostrarDineroCayendo();
    }
  }, duracion * 1000 + 100); // Pequeño retraso para asegurar que la animación haya terminado
}

document.getElementById('girar').addEventListener('click', girarRuleta);
