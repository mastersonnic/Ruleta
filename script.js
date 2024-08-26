window.onload = function() {
    // Encuentra el elemento que contiene la tasa de intercambio en el HTML simulado
    const exchangeRateElement = document.querySelector('.ng-tns-c3154908617-11.ng-star-inserted');

    if (exchangeRateElement) {
        // Extrae el texto del elemento
        const exchangeRate = exchangeRateElement.textContent.trim();
        // Muestra la tasa de intercambio en el elemento #exchange-rate
        document.getElementById('exchange-rate').textContent = exchangeRate;
    } else {
        // Si no se encuentra el elemento, muestra un mensaje de error
        document.getElementById('exchange-rate').textContent = 'Exchange rate element not found.';
    }
};
