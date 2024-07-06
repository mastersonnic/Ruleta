document.addEventListener('DOMContentLoaded', () => {
    const girarBtn = document.getElementById('girarBtn');
    const ruletaVideo = document.getElementById('ruletaVideo');

    // Definir las probabilidades de cada segmento (en números enteros)
    const probabilidades = {
        "0X": 15,
        "1X": 20,
        "6X": 5,
        "0.02X": 10,
        "0.1X": 12,
        "4X": 8,
        "0.5X": 18,
        "2X": 12,
        // Agrega las demás probabilidades aquí
    };

    // Definir las rutas de los videos en GitHub
    const rutasVideos = {
        "0X": "https://raw.githubusercontent.com/mastersonnic/Ruleta/main/0X%20derecha%20m%C3%A1s%20len.mp4",
         "0X": "https://raw.githubusercontent.com/mastersonnic/Ruleta/main/0X%20derecha%20m%C3%A1s%20len.mp4",
        "1X": "https://raw.githubusercontent.com/mastersonnic/Ruleta/main/1X%20centro%20lento.mp4",
        "6X": "https://raw.githubusercontent.com/mastersonnic/Ruleta/main/6X%20izq%20lento.mp4",
        "0.02X": "https://raw.githubusercontent.com/mastersonnic/Ruleta/main/0.02%20X%20derecha%20mejorado.mp4",
        "0.02X": https://github.com/mastersonnic/Ruleta/raw/main/0.02X%20centro%20lento.mp4
        "0.02X": "https://raw.githubusercontent.com/mastersonnic/Ruleta/main/0.02X%20izqu%20m%C3%A1s%20le.mp4",
        "0.1X": "https://raw.githubusercontent.com/mastersonnic/Ruleta/main/0.1%20izq%20mejorado.mp4",
        "0.1X": "https://raw.githubusercontent.com/mastersonnic/Ruleta/main/0.1X%20derec%20m%C3%A1s%20lent.mp4",
        "0.1X": "https://raw.githubusercontent.com/mastersonnic/Ruleta/main/0.1x%20centro%20mejorad.mp4",
        "0.5X": "https://raw.githubusercontent.com/mastersonnic/Ruleta/main/0.5X%20izq.%20m%C3%A1s%20lento.mp4",
        "0.5X": "https://raw.githubusercontent.com/mastersonnic/Ruleta/main/0.5x%20derecha%20mejorad.mp4",
        "https://raw.githubusercontent.com/mastersonnic/Ruleta/main/0x%20izq%20lento.mp4",
          "1X":
        "https://raw.githubusercontent.com/mastersonnic/Ruleta/main/1X%20derec%20m%C3%A1s%20lent.mp4",
          "1X":
"https://raw.githubusercontent.com/mastersonnic/Ruleta/main/1x%20izquierda%20mejor.mp4",
          "2X":
"https://raw.githubusercontent.com/mastersonnic/Ruleta/main/2X%20centr%20m%C3%A1s%20lento.mp4"'
          "2X":
"https://raw.githubusercontent.com/mastersonnic/Ruleta/main/2X%20der%20lento.mp4",
          "2X":
"https://raw.githubusercontent.com/mastersonnic/Ruleta/main/2x%20izquierda%20mejorado.mp4",
          "4X":
"https://raw.githubusercontent.com/mastersonnic/Ruleta/main/4x%20derecha%20mejo.mp4",
          "4X":
"https://raw.githubusercontent.com/mastersonnic/Ruleta/main/4x%20izq%20mejprado.mp4",
          "6X":
"https://raw.githubusercontent.com/mastersonnic/Ruleta/main/6X%20centr%20lento.mp4",
          "6X":
"https://raw.githubusercontent.com/mastersonnic/Ruleta/main/1X%20derec%20m%C3%A1s%20lent.mp4",
 "Solo giros":
"https://raw.githubusercontent.com/mastersonnic/Ruleta/main/Solo%20giros.mp4",
    };

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
        ruletaVideo.play();
    });
});
