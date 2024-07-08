document.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelector(".board");
    const apuestaInput = document.getElementById("apuesta");

    // Valores ocultos en las minas
    const valoresMinas = [0, 0.02, 0.1, 0.5, 1, 2, 4, 6];
    const probabilidades = [10, 15, 20, 10, 20, 10, 10, 5]; // Porcentajes

    // Genera el tablero con celdas
    for (let i = 0; i < 100; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        board.appendChild(cell);
    }

    // Función para iniciar el juego
    function iniciarJuego() {
        const apuesta = parseFloat(apuestaInput.value);
        if (isNaN(apuesta) || apuesta <= 0) {
            alert("Ingresa una apuesta válida.");
            return;
        }

        // Lógica para asignar valores y probabilidades a las celdas
        const cells = document.querySelectorAll(".cell");
        cells.forEach((cell, index) => {
            const randomIndex = obtenerIndiceSegunProbabilidad(probabilidades);
            const valorMina = valoresMinas[randomIndex];
            cell.dataset.valor = valorMina;
        });

        // Escucha el clic en las celdas
        cells.forEach((cell) => {
            cell.addEventListener("click", () => {
                const valor = parseFloat(cell.dataset.valor);
                const ganancia = apuesta * valor;
                alert(`Ganancia: ${ganancia}`);
            });
        });
    }

    // Función para obtener índice según probabilidad
    function obtenerIndiceSegunProbabilidad(probabilidades) {
        const totalProbabilidad = probabilidades.reduce((acc, val) => acc + val, 0);
        const random = Math.random() * totalProbabilidad;
        let acumulado = 0;
        for (let i = 0; i < probabilidades.length; i++) {
            acumulado += probabilidades[i];
            if (random < acumulado) {
                return i;
            }
        }
        return probabilidades.length - 1;
    }
});
