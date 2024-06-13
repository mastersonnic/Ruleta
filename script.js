document.getElementById('girar').addEventListener('click', girarRuleta);

function girarRuleta() {
  // Eliminar cualquier transformación previa aplicada a la ruleta
  document.getElementById('imgRuleta').style.transform = 'none';

  let segmentos = ['0X', '1X', '6X', '0.02X', '0.1X', '4X', '0.5X', '2X'];
  let vueltas = parseInt(getComputedStyle(document.documentElement)
                  .getPropertyValue('--vueltas'));
  let velocidad = getComputedStyle(document.documentElement)
                  .getPropertyValue('--velocidad');
  let ajusteAngulo = parseInt(getComputedStyle(document.documentElement)
                  .getPropertyValue('--ajuste-angulo'));

  // Generar un ángulo aleatorio para cada giro
  let anguloInicial = Math.floor(Math.random() * 360);
  let anguloTotal = vueltas * 360 + anguloInicial;
  let anguloFinal = (anguloTotal + ajusteAngulo) % 360;
  let indiceSegmentoGanador = Math.floor(anguloFinal / 45) % segmentos.length;

  document.getElementById('imgRuleta').style.transition = `transform ${velocidad} ease-out`;
  document.getElementById('imgRuleta').style.transform = `rotate(${anguloTotal}deg)`;

  setTimeout(() => {
    document.getElementById('resultado').style.display = 'block';
    document.getElementById('resultado').textContent = `¡Haz ganado ${segmentos[indiceSegmentoGanador]}!`;
    // Restablecer la transformación para permitir más giros
    document.getElementById('imgRuleta').style.transition = 'none';
    document.getElementById('imgRuleta').style.transform = 'none';
  }, parseFloat(velocidad) * 1000);
}
