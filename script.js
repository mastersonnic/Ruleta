const segmentos = ['0X', '1X', '6X', '0.02X', '0.1X', '4X', '0.5X', '2X'];
let anguloActual = 0;

document.getElementById('girar').addEventListener('click', () => {
  const gradosExtra = Math.floor(Math.random() * 360);
  const vueltas = 3;
  const totalGrados = vueltas * 360 + gradosExtra;
  anguloActual += totalGrados;
  document.getElementById('imgRuleta').style.transform = `rotate(${anguloActual}deg)`;

  const segmentoGanador = segmentos[Math.floor((anguloActual % 360) / 45)];
  setTimeout(() => {
    document.getElementById('resultado').style.display = 'block';
    document.getElementById('resultado').textContent = `¡Haz ganado ${segmentoGanador}!`;
  }, 4000); // Espera a que termine la animación
});
