document.addEventListener('DOMContentLoaded', function() {
    // URL de la página que deseas consultar
    const url = 'https://crypto-store.cc/?locale=en&cur_from=LTC&cur_to=BCH';

    // Seleccionar el contenedor donde se mostrará el valor de intercambio
    const exchangeRateDiv = document.getElementById('exchange-rate');

    // Función para obtener el valor de intercambio
    function fetchExchangeRate() {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                // Crear un DOMParser para analizar el contenido HTML
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, 'text/html');

                // Buscar el div que contiene la tasa de intercambio
                const rateDiv = doc.querySelector('div.ng-tns-c3154908617-11.ng-star-inserted');
                if (rateDiv) {
                    const rateText = rateDiv.textContent.trim();
                    // Extraer y mostrar el valor numérico
                    const match = rateText.match(/1 BCH = ([0-9.]+) LTC/);
                    if (match) {
                        exchangeRateDiv.innerHTML = `<p>1 BCH = ${match[1]} LTC</p>`;
                    } else {
                        exchangeRateDiv.innerHTML = '<p>No se encontró el valor de intercambio.</p>';
                    }
                } else {
                    exchangeRateDiv.innerHTML = '<p>No se encontró el div con el valor de intercambio.</p>';
                }
            })
            .catch(error => {
                console.error('Error al obtener la tasa de intercambio:', error);
                exchangeRateDiv.innerHTML = '<p>Error al obtener la tasa de intercambio.</p>';
            });
    }

    // Llamar a la función para obtener el valor de intercambio
    fetchExchangeRate();
});
