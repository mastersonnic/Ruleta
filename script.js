document.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelector(".board");
    const apuestaInput = document.getElementById("apuesta");
    const saldoElement = document.getElementById("saldo");
    const cantidadCerosSelect = document.getElementById("cantidadCeros");
    let saldoTotal = 100; // Saldo inicial en USD

    const valoresMinas = [0, 0.02, 0.1, 0.5, 1, 2, 4, 6];

    function generarDistribucion(cantidadCeros) {
        const distribucion = [];
        const distribuciones = {
            2: [2, 6, 5, 4, 3, 2, 0, 0],
            3: [3, 5, 4, 3, 2, 2, 1, 0],
            4: [4, 4, 3, 3, 2, 2, 1, 1],
            5: [5, 3, 3, 2, 2, 2, 2, 1],
            6: [6, 2, 2, 2, 2, 2, 2, 2],
            7: [7, 1, 1, 2, 2, 2, 2, 3],
            8: [8, 1, 1, 1, 2, 2, 2, 3],
            9: [9, 1, 1, 1, 1, 2, 2, 3],
            10: [10, 1, 1, 1, 1, 2, 2, 2]
        };
        return distribuciones[cantidadCeros];
    }

    function iniciarJuego() {
        board.innerHTML = "";
        const cantidadCeros = parseInt(cantidadCerosSelect.value);
        const distribucion = generarDistribucion(cantidadCeros);

        for (let i = 0; i < 20; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            let valorMina;
            do {
                const randomIndex = Math.floor(Math.random() * valoresMinas.length);
                valorMina = valoresMinas[randomIndex];
            } while (distribucion[valoresMinas.indexOf(valorMina)] <= 0);

            distribucion[valoresMinas.indexOf(valorMina)]--;
            cell.dataset.valor = valorMina;
            board.appendChild(cell);
        }

        actualizarTabla(distribucion);
    }

    function actualizarTabla(distribucion) {
        const tbody = document.querySelector(".results tbody");
        tbody.innerHTML = "";
        const row = document.createElement("tr");
        distribucion.forEach((cantidad, index) => {
            const cell = document.createElement("td");
            cell.textContent = `${valoresMinas[index]}X (${cantidad})`;
            row.appendChild(cell);
        });
        tbody.appendChild(row);
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
        cell.style.backgroundColor = "#ff0000";
        cell.textContent = "💥";
    }

    document.querySelector(".start-button").addEventListener("click", iniciarJuego);
});
