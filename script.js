document.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelector(".board");
    const apuestaInput = document.getElementById("apuesta");
    const saldoElement = document.getElementById("saldo");
    let saldoTotal = 0;

    // Valores ocultos en las minas
    const valoresMinas = [0, 0.02, 0.1, 0.5, 1, 2, 4, 6];
    const probabilidades = [10, 15, 20, 10, 20, 10, 10, 5]; // Porcentajes

    // Genera el tablero con celdas y asigna valores
    for (let i = 0; i < 100; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        const randomIndex = obtenerIndiceSegunProbabilidad(probabilidades);
        const valorMina = valoresMinas[randomIndex];
        cell.dataset.valor = valorMina;
        board.appendChild(cell);
    }

    // Escucha el clic en las celdas
    board.addEventListener("click", (event) => {
        const cell = event.target;
        if (cell.classList.contains("cell")) {
            const valor = parseFloat(cell.dataset.valor);
            const apuesta = parseFloat(apuestaInput.value);
            if (!isNaN(apuesta) && apuesta > 0) {
                const ganancia = apuesta * valor;
                saldoTotal += ganancia;
                saldoElement.textContent = `Saldo total: ${saldoTotal.toFixed(2)}`;
            } else {
                alert("Ingresa una apuesta válida.");
            }
        }
    });

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
