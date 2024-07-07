document.addEventListener('DOMContentLoaded', () => {
    const girarBtn = document.getElementById('girarBtn');
    const ruletaVideo = document.getElementById('ruletaVideo');

    // Definir las probabilidades de cada segmento (en números enteros)
    const probabilidades = {
        "0X": 15,
        "1X": 20,
        "6X": 5,
        // Agrega las demás probabilidades aquí
    };

    // Definir las rutas de los videos en GitHub
    const rutasVideos = {
        "0X": "https://raw.githubusercontent.com/mastersonnic/Ruleta/main/0X%20derecha%20m%C3%A1s%20len.mp4",
        "1X": "https://raw.githubusercontent.com/mastersonnic/Ruleta/main/1X%20centro%20lento.mp4",
        "6X": "https://raw.githubusercontent.com/mastersonnic/Ruleta/main/6X%20izq%20lento.mp4",
        // Agrega las demás rutas aquí
    };

    let tiempoReproduccion = 1500; // 1.5 segundos

    girarBtn.addEventListener('click', () => {
        // Detener el video actual
        ruletaVideo.pause();

        // Seleccionar un resultado basado en las probabilidades
        const resultados = Object.keys(probabilidades);
        const resultadoSeleccionado = resultados[Math.floor(Math.random() * resultados.length)];

        // Obtener la ruta del video correspondiente al resultado
        const rutaVideo = rutasVideos[resultadoSeleccionado];

        // Cargar el nuevo video
        ruletaVideo.src = rutaVideo;
        ruletaVideo.currentTime = 0; // Reiniciar el video al principio
        ruletaVideo.play();

        // Establecer el tiempo de reproducción antes de cambiar al siguiente video
        setTimeout(() => {
            ruletaVideo.pause();
        }, tiempoReproduccion);
    });
});
