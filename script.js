document.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelector(".board");
    const apuestaInput = document.getElementById("apuesta");
    const saldoElement = document.getElementById("saldo");
    const cantidadCerosSelect = document.getElementById("cantidadCeros");
    let saldoTotal = 100; // Saldo inicial en USD

    const valoresMinas = [0, 0.02, 0.1, 0.5, 1, 2, 4, 6];

    for (let i = 0; i < 20; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        const randomIndex = Math.floor(Math.random() * valoresMinas.length);
        const valorMina = valoresMinas[randomIndex];
        cell.dataset.valor = valorMina;
        board.appendChild(cell);
    }

    board.addEventListener("click", (event) => {
        const cell = event.target;
        if (cell.classList.contains("cell")) {
            const valor = parseFloat(cell.dataset.valor);
            const apuesta = parseFloat(apuestaInput.value);
            const cantidadCeros = parseInt(cantidadCerosSelect.value);
            if (!isNaN(apuesta) && apuesta > 0) {
                const ganancia = apuesta * valor;
                if (valor === 0) {
                    saldoTotal = 0;
                } else {
                    saldoTotal -= apuesta;
                    saldoTotal += ganancia;
                }
                saldoElement.textContent = saldoTotal.toFixed(2) + " USD";
                cell.textContent = (valor * apuesta).toFixed(2);
                setTimeout(() => {
                    cell.textContent = "";
                    cell.classList.add("flipped");
                    setTimeout(() => {
                        cell.classList.remove("flipped");
                        if (valor === 0) {
                            cell.classList.add("mine");
                            boom(cell);
                        }
                    }, 1000);
                }, 2000);
            }
        }
    });

    // Función para manejar la explosión de la mina
    function boom(cell) {
        // Implementa aquí la lógica de la explosión
        // Por ejemplo, puedes cambiar el color de fondo o mostrar un mensaje
        // cuando se hace clic en una mina.
    }

    // Estilos adicionales para las celdas
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
        cell.style.backgroundColor = "#f0f8ff"; // Azul casi blanco
        cell.style.transition = "transform 0.5s ease"; // Pequeño movimiento
        cell.style.transform = "scale(1.05)"; // Efecto de aumento inicial
        cell.addEventListener("click", () => {
            cell.style.transform = "scale(1)"; // Volver al tamaño original al hacer clic
        });
    });

    // Resto de tu lógica del juego aquí...
});
