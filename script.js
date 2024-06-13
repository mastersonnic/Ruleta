// script.js
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

  // Aplicar animación de giro solo a la imagen de la ruleta
  let ruleta = document.getElementById('imgRuleta');
  ruleta.style.transition = `transform ${velocidad} ease-out`;
  ruleta.style.transform = `rotate(${anguloTotal}deg)`;

  // Mostrar mensaje ganador después de la animación
  setTimeout(() => {
    let resultado = document.getElementById('resultado');
    resultado.style.display = 'block';
    resultado.textContent = `¡Haz ganado ${segmentos[indiceSegmentoGanador]}!`;
  }, parseFloat(velocidad) * 1000);
}
