// script.js
document.addEventListener('DOMContentLoaded', function () {
    const ruletaVideo = document.getElementById('ruleta-video');
    const girarBtn = document.getElementById('girar-btn');

    // Cambiar el video después de 1.5 segundos
    setTimeout(() => {
        ruletaVideo.src = 'https://raw.githubusercontent.com/mastersonnic/Ruleta/main/6X%20izq%20lento.mp4';
    }, 1500);
});
