document.getElementById('girar').addEventListener('click', girarRuleta);

function girarRuleta() {
  let segmentos = ['0X', '1X', '6X', '0.02X', '0.1X', '4X', '0.5X', '2X'];
  let vueltas = getComputedStyle(document.documentElement)
                  .getPropertyValue('--vueltas');
  let velocidad = getComputedStyle(document.documentElement)
                  .getPropertyValue('--velocidad');
  let ajusteAngulo = parseInt(getComputedStyle(document.documentElement)
                  .getPropertyValue('--ajuste-angulo'));

  let anguloPorSegmento = 360 / segmentos.length;
  let anguloGanador = Math.floor(Math.random() * 360);
  let indiceSegmentoGanador = Math.floor((anguloGanador + ajusteAngulo) / anguloPorSegmento) % segmentos.length;
  let anguloTotal = vueltas * 360 + anguloGanador;

  document.getElementById('ruleta').style.transition = `transform ${velocidad} ease-out`;
  document.getElementById('ruleta').style.transform = `rotate(${anguloTotal}deg)`;

  setTimeout(() => {
    document.getElementById('resultado').style.display = 'block';
    document.getElementById('resultado').textContent = `¡Haz ganado ${segmentos[indiceSegmentoGanador]}!`;
  }, parseFloat(velocidad) * 1000);
}
