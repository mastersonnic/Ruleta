// script.js
document.addEventListener('DOMContentLoaded', function () {
    const ruletaVideo = document.getElementById('ruleta-video');
    const girarBtn = document.getElementById('girar-btn');

    // Cambiar al nuevo video después de 1.5 segundos al hacer clic en el botón
    girarBtn.addEventListener('click', function () {
        // Detener el video actual
        ruletaVideo.pause();
        ruletaVideo.currentTime = 0;

        // Cambiar al segundo video después de 1.5 segundos
        setTimeout(() => {
            ruletaVideo.src = 'https://raw.githubusercontent.com/mastersonnic/Ruleta/main/6X%20izq%20lento.mp4';
            ruletaVideo.play();
        }, 1500);
    });
});
k
