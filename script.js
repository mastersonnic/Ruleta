document.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelector(".board");
    const apuestaInput = document.getElementById("apuesta");
    const saldoElement = document.getElementById("saldo");
    const cantidadCerosInput = document.getElementById("cantidadCeros");
    let saldoTotal = 0;

    // Valores ocultos en las minas
    const valoresMinas = [0, 0.02, 0.1, 0.5, 1, 2, 4, 6];

    // Genera el tablero con celdas y asigna valores
    for (let i = 0; i < 100; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        const randomIndex = Math.floor(Math.random() * valoresMinas.length);
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
            const cantidadCeros = parseInt(cantidadCerosInput.value);
            if (!isNaN(apuesta) && apuesta > 0) {
                const ganancia = apuesta * valor;
                saldoTotal += ganancia;
                saldoElement.textContent = saldoTotal.toFixed(2);
                cell.textContent = (valor * apuesta).toFixed(2);
                setTimeout(() => {
                    cell.textContent = "";
                }, 2000);
            } else {
                alert("Ingresa una apuesta válida.");
            }
        }
    });
});
