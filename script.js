document.addEventListener('DOMContentLoaded', (event) => {
    const canvas = document.getElementById('ruleta');
    const ctx = canvas.getContext('2d');
    const btnGirar = document.getElementById('girar');
    const radio = canvas.width / 2;
    let anguloActual = 0;
    const segmentos = [
        { color: 'gold', label: 'Premio 1', pattern: 'img/metal1.png' },
        { color: 'silver', label: 'Premio 2', pattern: 'img/metal2.png' },
        { color: 'bronze', label: 'Premio 3', pattern: 'img/metal3.png' },
        { color: 'platinum', label: 'Premio 4', pattern: 'img/metal4.png' }
    ];

    // Cargar las imágenes para las texturas
    const texturas = segmentos.map(seg => {
        const img = new Image();
        img.src = seg.pattern;
        return img;
    });

    function dibujarSegmento(segmento, inicioAngulo, finAngulo, index) {
        ctx.beginPath();
        ctx.fillStyle = segmento.color;

        // Esperar a que la imagen de la textura esté cargada
        texturas[index].onload = () => {
            const pattern = ctx.createPattern(texturas[index], 'repeat');
            ctx.fillStyle = pattern;
        };

        ctx.moveTo(radio, radio);
        ctx.arc(radio, radio, radio, inicioAngulo, finAngulo);
        ctx.lineTo(radio, radio);
        ctx.stroke();
        ctx.fill();

        // Dibujar el texto
        ctx.save();
        ctx.translate(radio, radio);
        ctx.rotate((inicioAngulo + finAngulo) / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 20px Arial';
        ctx.fillText(segmento.label, radio - 10, 10);
        ctx.restore();
    }

    function dibujarRuleta() {
        const anguloPorSegmento = Math.PI * 2 / segmentos.length;
        let inicioAngulo = 0;

        segmentos.forEach((segmento, index) => {
            const finAngulo = inicioAngulo + anguloPorSegmento;
            dibujarSegmento(segmento, inicioAngulo, finAngulo, index);
            inicioAngulo = finAngulo;
        });

        // Dibujar el círculo del centro con un diseño de palacio real
        ctx.beginPath();
        ctx.arc(radio, radio, 20, 0, Math.PI * 2);
        ctx.fillStyle = ctx.createPattern(texturas[0], 'repeat'); // Usar la primera textura como ejemplo
        ctx.fill();
        ctx.strokeStyle = 'gold';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Agregar detalles adicionales al diseño central
        ctx.beginPath();
        ctx.arc(radio, radio, 15, 0, Math.PI * 2);
        ctx.strokeStyle = 'silver';
        ctx.stroke();
    }

    // ... (el resto del código para girarRuleta y animarGiro permanece igual)

    btnGirar.addEventListener('click', girarRuleta);
    dibujarRuleta();
});
