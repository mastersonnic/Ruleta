document.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelector(".board");
    const apuestaInput = document.getElementById("apuesta");
    const saldoElement = document.getElementById("saldo");
    const cantidadCerosSelect = document.getElementById("cantidadCeros");
    let saldoTotal = 0;

    // Valores ocultos en las minas
    const valoresMinas = [0, 0.02, 0.1, 0.5, 1, 2, 4, 6];

    // Genera el tablero con celdas y asigna valores
    for (let i = 0; i < 20; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        const randomIndex = Math.floor(Math.random() * valoresMinas.length);
        const valorMina = valoresMinas[randomIndex];
        cell.dataset.valor = valorMina;
        board.appendChild
