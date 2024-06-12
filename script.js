const segmentos = ['0X', '1X', '6X', '0.02X', '0.1X', '4X', '0.5X', '2X'];
let anguloActual = 0;

document.getElementById('girar').addEventListener('click', () => {
  const gradosPorSegmento = 360 / segmentos.length;
  const gradosRandom = Math.floor(Math.random() * gradosPorSegmento);
  const vueltas = 3;
  const totalGrados = vueltas * 360 + gradosRandom;
  anguloActual += totalGrados;
  document.getElementById('imgRuleta').style.transform = `rotate(${anguloActual}deg)`;

  // Ajuste para alinear el segmento ganador con la flecha
  const ajuste = gradosPorSegmento / 2;
  const indiceGanador = Math.floor(((anguloActual + ajuste) % 360) / gradosPorSegmento);
  const segmentoGanador = segmentos[indiceGanador];
  
  setTimeout(() => {
    document.getElementById('resultado').style.display = 'block';
    document.getElementById('resultado').textContent = `¡Haz ganado ${segmentoGanador}!`;
  }, 4000); // Espera a que termine la animación
});
