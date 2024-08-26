window.onload = function() {
    // Aquí deberías tener el HTML necesario en tu archivo index.html
    // Este ejemplo asume que el HTML está cargado localmente en el archivo index.html

    // Usamos querySelector para encontrar el elemento que contiene la tasa de intercambio
    const exchangeRateElement = document.querySelector('.ng-tns-c3154908617-11.ng-star-inserted');

    if (exchangeRateElement) {
        // Extraemos el texto del elemento
        const exchangeRate = exchangeRateElement.textContent.trim();
        // Mostramos la tasa de intercambio en el elemento #exchange-rate
        document.getElementById('exchange-rate').textContent = `Exchange rate: ${exchangeRate}`;
    } else {
        // Si no se encuentra el elemento, mostramos un mensaje de error
        document.getElementById('exchange-rate').textContent = 'Exchange rate element not found.';
    }
};
