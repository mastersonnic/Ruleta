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

function girarRuleta() {
  const grados = 360 * 3 + Math.floor(Math.random() * 360);
  const duracion = 5;
  const ruleta = document.getElementById('imgRuleta');
  ruleta.style.transition = `transform ${duracion}s ease-out`;
  ruleta.style.transform = `rotate(${grados}deg)`;

  setTimeout(() => {
    const gradosReales = grados % 360;
    const segmentoGanador = segmentos.find(segmento => {
      const inicio = segmento.inicio > segmento.fin ? segmento.inicio - 360 : segmento.inicio;
      return gradosReales >= inicio && gradosReales < segmento.fin;
    });

    const resultado = document.getElementById('resultado');
    resultado.textContent = `¡Haz ganado ${segmentoGanador.nombre}!`;
    resultado.style.display = 'block';
    if (segmentoGanador.nombre !== '0X') {
      document.body.classList.add('ganador');
      lanzarConfeti();
      mostrarDineroCayendo();
    }
  }, duracion * 1000);
}

document.getElementById('girar').addEventListener('click', girarRuleta);

function lanzarConfeti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
}

function mostrarDineroCayendo() {
  const imgDineroCayendo = document.createElement('img');
  imgDineroCayendo.src = 'https://github.com/mastersonnic/Ruleta/blob/main/raining-money-38.gif.webp';
  imgDineroCayendo.style.position = 'absolute';
  imgDineroCayendo.style.top = '50%';
  imgDineroCayendo.style.left = '50%';
  imgDineroCayendo.style.transform = 'translate(-50%, -50%)';
  imgDineroCayendo.style.zIndex = '1000';
  document.body.appendChild(imgDineroCayendo);

  setTimeout(() => {
    document.body.removeChild(imgDineroCayendo);
  }, 5000); // El GIF de dinero cayendo se mostrará por 5 segundos
}

document.body.onanimationend = function(e) {
  if (e.animationName === 'aparecer') {
    document.body.classList.remove('ganador');
  }
};
